import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Prisma 7 requires using a driver adapter for PostgreSQL
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_V3mfAJg0GvhE@ep-nameless-union-atzfoieb.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Singleton pattern to avoid multiple connections in development (Next.js hot reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// Cache in development only
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
