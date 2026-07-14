import "server-only"; // 误在客户端组件里 import 这个文件会直接报错——防止泄露密钥
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// 从 .env 读会话密钥，用它给 JWT 签名（别人没有密钥就伪造不了登录状态）。
const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

// 存进会话的最小信息：只放 userId，绝不放密码、邮箱等敏感信息。
type SessionPayload = { userId: number; expiresAt: Date };

// 加密：把 payload 签成一个 JWT 字符串。
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// 解密：验证 JWT 签名并取出 payload；无效/过期就返回 undefined。
export async function decrypt(
  session?: string,
): Promise<{ userId: number } | undefined> {
  if (!session) return undefined;
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return { userId: payload.userId as number };
  } catch {
    return undefined; // 签名不对或已过期
  }
}

// 登录成功后调用：把加密后的会话写进 httpOnly cookie。
export async function createSession(userId: number): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 天后过期
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true, // JS 读不到，防 XSS 窃取
    secure: process.env.NODE_ENV === "production", // 生产才要求 https；本地 http 也能用
    expires: expiresAt,
    sameSite: "lax", // 防 CSRF 的基本设置
    path: "/",
  });
}

// 登出时调用：删除 cookie。
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
