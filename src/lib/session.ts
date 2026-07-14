import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import "server-only";

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

type SessionPayload = { userId: number; expiresAt: Date };

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

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
    return undefined;
  }
}

export async function createSession(userId: number): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
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

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
