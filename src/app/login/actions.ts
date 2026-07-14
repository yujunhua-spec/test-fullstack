"use server";

import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import z from "zod";

const AuthSchema = z.object({
  email: z.string().trim().email("邮箱格式不正确"),
  password: z.string().min(6, "密码至少 6 位"),
});

export type AuthState = { error?: string };

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
  const existing = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existing) return { error: "该邮箱已注册" };
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed } });

  await createSession(user.id);
  redirect("/notes");
}

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
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return { error: "邮箱或密码不正确" };
  await createSession(user.id);
  redirect("/notes");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
