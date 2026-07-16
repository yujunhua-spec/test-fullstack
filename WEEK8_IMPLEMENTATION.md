# Week 8 实施计划 - 部署与收尾

## 📅 时间安排
开始时间：2026-07-16

---

## 🎯 Week 8 学习目标

根据 `LEARNING_PLAN.md`，Week 8 的目标是"上线，形成闭环"：

- [ ] 环境变量管理（`.env`，区分本地/生产）
- [ ] 生产数据库（如 Vercel Postgres / Neon）
- [ ] 部署到 **Vercel**
- [ ] 基础性能与 SEO：`metadata`、`<Image>`、`next/font`
- [ ] 写好 README，整理成作品集项目

**产出**：一个公网可访问、可写进简历的全栈应用。

---

## 📋 实施步骤

### 第一步：环境变量管理 🔐

#### 1.1 创建环境变量文件

**目标**：规范化环境变量管理，区分开发和生产环境。

**当前状态检查**：
```bash
# 检查是否已有 .env 文件
ls -la | grep .env
```

**需要创建的文件**：

**`.env.example`** - 环境变量模板（提交到 Git）
```env
# 数据库
DATABASE_URL="file:./dev.db"

# Session 密钥（生产环境必须更换！）
SESSION_SECRET="your-secret-key-at-least-32-characters-long"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# 生产数据库（Vercel Postgres / Neon）
# POSTGRES_URL=""
# POSTGRES_PRISMA_URL=""
# POSTGRES_URL_NON_POOLING=""
```

**`.env.local`** - 本地开发环境变量（不提交到 Git）
```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="development-secret-key-change-in-production-min-32-chars"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**`.env.production`** - 生产环境变量（Vercel 会自动使用）
```env
# 这些变量将在 Vercel Dashboard 中配置
# DATABASE_URL=
# SESSION_SECRET=
# NEXT_PUBLIC_APP_URL=
```

#### 1.2 更新 .gitignore

确保敏感信息不被提交：

```gitignore
# 添加到 .gitignore
.env
.env.local
.env.production
.env.*.local
dev.db
dev.db-journal
```

#### 1.3 生成安全的 SESSION_SECRET

```bash
# 使用 Node.js 生成随机密钥
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 第二步：生产数据库准备 🗄️

#### 2.1 选择数据库方案

**推荐方案**：

1. **Vercel Postgres**（推荐）
   - 优点：与 Vercel 无缝集成
   - 缺点：需要信用卡（有免费额度）

2. **Neon**（推荐）
   - 优点：免费额度慷慨，无需信用卡
   - 缺点：需要单独注册

3. **继续使用 SQLite**（简单方案）
   - 优点：无需额外配置
   - 缺点：不适合高并发，数据会在每次部署时重置

#### 2.2 迁移到 PostgreSQL（推荐）

**修改 `prisma/schema.prisma`**：

```prisma
datasource db {
  provider = "postgresql"  // 从 sqlite 改为 postgresql
  url      = env("DATABASE_URL")
}

// 保持 models 不变
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  password String
  notes    Note[]
}

model Note {
  id        Int      @id @default(autoincrement())
  text      String
  createdAt DateTime @default(now())
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

**更新 `src/lib/prisma.ts`**：

```typescript
import { PrismaClient } from "@/generated/prisma/client";

// PostgreSQL 不需要适配器
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**安装 PostgreSQL 依赖**：

```bash
npm install @prisma/client
npm install -D prisma
```

**创建迁移**：

```bash
# 生成迁移文件
npx prisma migrate dev --name init_postgresql

# 生成 Prisma Client
npx prisma generate
```

#### 2.3 设置 Neon 数据库（免费方案）

1. 访问 https://neon.tech
2. 注册账号
3. 创建新项目
4. 复制连接字符串
5. 添加到 Vercel 环境变量

---

### 第三步：性能优化 ⚡

#### 3.1 使用 Next.js Image 组件

**当前问题**：如果使用了 `<img>` 标签

**优化方案**：

```typescript
// ❌ 不推荐
<img src="/logo.png" alt="Logo" />

// ✅ 推荐
import Image from "next/image";

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={200} 
  height={50}
  priority // 首屏图片
/>
```

#### 3.2 字体优化

**已完成** ✅ - 项目已使用 `next/font/google`：

```typescript
// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

#### 3.3 添加 loading.tsx

**创建 `src/app/notes/loading.tsx`**：

```typescript
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotesLoading() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-8">
        {/* 标题骨架 */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* 表单骨架 */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>

        {/* 列表骨架 */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**安装 Skeleton 组件**：

```bash
npx shadcn@latest add skeleton
```

---

### 第四步：SEO 优化 🔍

#### 4.1 更新 Metadata

**修改 `src/app/layout.tsx`**：

```typescript
export const meta Metadata = {
  title: {
    default: "全栈留言板",
    template: "%s | 全栈留言板"
  },
  description: "一个使用 Next.js 15、React 19、Prisma 和 shadcn/ui 构建的现代全栈应用",
  keywords: ["Next.js", "React", "TypeScript", "Prisma", "shadcn/ui", "全栈"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://your-domain.vercel.app",
    title: "全栈留言板",
    description: "一个现代全栈应用示例",
    siteName: "全栈留言板",
  },
  twitter: {
    card: "summary_large_image",
    title: "全栈留言板",
    description: "一个现代全栈应用示例",
  },
};
```

#### 4.2 添加页面级 Metadata

**`src/app/notes/page.tsx`**：

```typescript
import { Metadata } from "next";

export const meta Metadata = {
  title: "留言板",
  description: "分享你的想法，与社区互动",
};

export default async function NotesPage() {
  // ...
}
```

**`src/app/login/page.tsx`**：

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "登录",
  description: "登录或注册以继续使用",
};

export default function LoginPage() {
  // ...
}
```

#### 4.3 添加 robots.txt

**创建 `public/robots.txt`**：

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin pages (if any)
Disallow: /api/

# Sitemap
Sitemap: https://your-domain.vercel.app/sitemap.xml
```

#### 4.4 添加 sitemap.xml（可选）

**创建 `src/app/sitemap.ts`**：

```typescript
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://your-domain.vercel.app/notes',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://your-domain.vercel.app/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
```

---

### 第五步：Vercel 部署 🚀

#### 5.1 准备部署

**检查清单**：

- [ ] `.env.example` 已创建
- [ ] `.gitignore` 已更新
- [ ] `package.json` scripts 完整
- [ ] 代码已提交到 Git
- [ ] 构建测试通过：`npm run build`

**测试构建**：

```bash
npm run build
npm start
```

#### 5.2 部署步骤

1. **访问 Vercel**
   - https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New" → "Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置环境变量**
   - 在 "Environment Variables" 部分添加：
     - `DATABASE_URL`
     - `SESSION_SECRET`
     - `NEXT_PUBLIC_APP_URL`

4. **部署**
   - 点击 "Deploy"
   - 等待构建完成

5. **验证**
   - 访问 Vercel 提供的 URL
   - 测试所有功能

#### 5.3 自定义域名（可选）

1. 在 Vercel Dashboard → Settings → Domains
2. 添加你的域名
3. 按照提示配置 DNS

---

### 第六步：完善 README 📝

**创建专业的 README.md**：

```markdown
# 全栈留言板应用

一个使用现代技术栈构建的全栈 Web 应用，包含用户认证、实时留言、暗色模式等功能。

## ✨ 特性

- 🔐 用户认证（注册/登录/登出）
- 💬 实时留言板
- 🌓 暗色模式切换
- 📱 响应式设计
- ⚡ 性能优化
- 🎨 现代 UI 设计

## 🛠️ 技术栈

### 前端
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Theme**: next-themes

### 后端
- **Runtime**: Node.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: Jose (JWT)
- **Password Hashing**: bcryptjs

### 开发工具
- **Language**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm

## 🚀 快速开始

### 前