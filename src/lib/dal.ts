import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";
import { prisma } from "@/lib/prisma";

// DAL = Data Access Layer（数据访问层）：把"验证会话 + 取用户"集中在这里，
// 应用各处（页面、Server Action）都调它，权限逻辑不散落。

// 读取当前登录用户；没登录返回 null（不跳转）。
// 用 React 的 cache 包起来：同一次渲染里多次调用只查一次库。
export const getCurrentUser = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true }, // 只取需要的字段，绝不返回 password
  });
});

// 要求必须登录：没登录直接重定向到 /login。用于保护页面/操作。
export const verifySession = cache(async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
});
