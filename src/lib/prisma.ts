import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Prisma 7 去掉了内置查询引擎，必须通过"驱动适配器"连接数据库。
// SQLite 用 PrismaBetterSqlite3，url 从 .env 的 DATABASE_URL 读（Next.js 会自动加载 .env）。
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

// 为什么要搞这么一个"单例"？
// Next.js 开发模式会频繁热重载，每次都 new 一个 PrismaClient 会累积连接、耗尽资源。
// 把实例挂在全局对象上，热重载时复用同一个。
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// 只在开发环境缓存到全局；生产环境不需要（不会热重载）。
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
