"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

const AuthSchema = z.object({
  email: z.string().trim().email("邮箱格式不正确"),
  password: z.string().min(6, "密码至少 6 位"),
});

export type AuthState = { error?: string };

// 注册：校验 → 查重 → 哈希密码存库 → 建会话 → 跳转。
export async function signup(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = AuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "该邮箱已注册" };

  // 关键：绝不存明文密码，存 bcrypt 哈希（10 是加盐轮数）。
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed } });

  await createSession(user.id);
  redirect("/notes"); // redirect 会抛出控制流异常，后面的代码不会执行
}

// 登录：校验 → 查用户 → 比对密码哈希 → 建会话 → 跳转。
export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = AuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  // bcrypt.compare 把明文和哈希比对。注意：用户不存在和密码错，返回同样的模糊提示，
  // 避免泄露"这个邮箱是否注册过"。
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "邮箱或密码不正确" };
  }

  await createSession(user.id);
  redirect("/notes");
}

// 登出：删会话 → 回登录页。
export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
