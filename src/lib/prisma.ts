import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Prisma 7 requires using a driver adapter for PostgreSQL
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Singleton pattern to avoid multiple connections in development (Next.js hot reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// Cache in development only
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
