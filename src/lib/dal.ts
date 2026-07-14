import "server-only";
import { decrypt } from "./session";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) return null;
  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true },
  });
});

export const verifySession = cache(async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
});
