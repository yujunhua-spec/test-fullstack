# 🚀 全栈留言板应用

一个使用现代技术栈构建的全栈 Web 应用，包含用户认证、实时留言、暗色模式等功能。

## ✨ 特性

- 🔐 **用户认证** - 完整的注册/登录/登出功能
- 💬 **留言板** - 实时发布和查看留言
- 🗑️ **权限控制** - 只能删除自己的留言
- 🌓 **暗色模式** - 支持亮色/暗色/跟随系统
- 📱 **响应式设计** - 完美适配移动端和桌面端
- ⚡ **性能优化** - 骨架屏、图片优化、字体优化
- 🎨 **现代 UI** - 使用 shadcn/ui 组件库
- 📝 **表单验证** - React Hook Form + Zod 双重验证
- 🍞 **Toast 通知** - 友好的操作反馈

## 🛠️ 技术栈

### 前端
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### 后端
- **Runtime**: Node.js
- **Database**: SQLite (开发) / PostgreSQL (生产)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Jose](https://github.com/panva/jose) (JWT)
- **Password Hashing**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

### 开发工具
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: [ESLint](https://eslint.org/)
- **Package Manager**: npm

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装步骤

1. **克隆仓库**

```bash
git clone <your-repo-url>
cd test-fullstack
```

2. **安装依赖**

```bash
npm install
```

3. **设置环境变量**

复制 `.env.example` 到 `.env`:

```bash
cp .env.example .env
```

生成安全的 SESSION_SECRET:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

将生成的密钥填入 `.env` 文件的 `SESSION_SECRET`。

4. **设置数据库**

```bash
# 生成 Prisma Client
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev

# (可选) 打开 Prisma Studio 查看数据库
npx prisma studio
```

5. **启动开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
test-fullstack/
├── prisma/
│   ├── schema.prisma          # 数据库模型定义
│   └── migrations/            # 数据库迁移文件
├── public/                    # 静态资源
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── notes/             # 留言板功能
│   │   ├── login/             # 登录/注册
│   │   └── todo/              # 待办事项
│   ├── components/            # React 组件
│   │   ├── ui/                # shadcn/ui 组件
│   │   ├── theme-provider.tsx # 主题提供者
│   │   └── theme-toggle.tsx   # 主题切换
│   ├── lib/                   # 工具函数
│   │   ├── prisma.ts          # Prisma 客户端
│   │   ├── session.ts         # Session 管理
│   │   ├── dal.ts             # 数据访问层
│   │   ├── validations.ts     # 表单验证规则
│   │   └── utils.ts           # 通用工具函数
│   └── generated/             # Prisma 生成的类型
├── .env.example               # 环境变量模板
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 📱 使用指南

### 注册账号

1. 访问首页，点击"登录"按钮
2. 在登录页面选择"注册"标签
3. 输入邮箱和密码（密码至少 6 位）
4. 点击"注册"按钮

### 发布留言

1. 登录后，进入"留言板"页面
2. 在输入框中输入留言内容
3. 点击"发布留言"按钮
4. 留言将立即显示在列表中

### 删除留言

- 只能删除自己发布的留言
- 点击留言卡片右上角的删除按钮
- 确认后留言将被删除

### 切换主题

- 点击右上角的主题切换按钮
- 在亮色/暗色/系统模式之间切换

## 🗄️ 数据库管理

### 开发环境

项目使用 SQLite 作为开发数据库，数据存储在 `dev.db` 文件中。

**查看数据库**：

```bash
npx prisma studio
```

**重置数据库**：

```bash
npx prisma migrate reset
```

### 生产环境

推荐使用 PostgreSQL 数据库：

**选项 1: Vercel Postgres**
- 与 Vercel 无缝集成
- 需要信用卡（有免费额度）

**选项 2: Neon**（推荐）
- 免费额度慷慨
- 无需信用卡
- 访问 [neon.tech](https://neon.tech) 注册

**迁移到 PostgreSQL**：

1. 修改 `prisma/schema.prisma`：
```prisma
datasource db {
  provider = "postgresql"  // 从 sqlite 改为 postgresql
  url      = env("DATABASE_URL")
}
```

2. 更新环境变量：
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

3. 运行迁移：
```bash
npx prisma migrate dev --name init_postgresql
npx prisma generate
```

## 🚢 部署到 Vercel

### 准备工作

1. **确保代码已提交到 Git**

```bash
git add .
git commit -m "Ready for deployment"
git push
```

2. **测试构建**

```bash
npm run build
npm start
```

### 部署步骤

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New" → "Project"
4. 选择你的 GitHub 仓库
5. 配置环境变量：
   - `DATABASE_URL`（生产数据库连接字符串）
   - `SESSION_SECRET`（生成新的安全密钥）
   - `NEXT_PUBLIC_APP_URL`（你的 Vercel 域名）
6. 点击 "Deploy"
7. 等待构建完成

### 环境变量配置

在 Vercel Dashboard → Settings → Environment Variables 中添加：

```env
DATABASE_URL=your_production_database_url
SESSION_SECRET=your_secure_session_secret_at_least_32_chars
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 自定义域名（可选）

在 Vercel Dashboard → Settings → Domains 添加自定义域名

## 📊 可用脚本

```bash
# 开发服务器
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# Prisma 相关
npx prisma studio          # 打开数据库管理界面
npx prisma migrate dev     # 创建并应用迁移
npx prisma generate        # 生成 Prisma Client
npx prisma db push         # 快速同步数据库（开发用）
npx prisma migrate reset   # 重置数据库
```

## 🔧 开发指南

### 添加新的 shadcn/ui 组件

```bash
npx shadcn@latest add [component-name]
```

### 修改数据库模型

1. 编辑 `prisma/schema.prisma`
2. 运行迁移：
```bash
npx prisma migrate dev --name your_migration_name
```

### 创建新页面

在 `src/app` 目录下创建新文件夹和 `page.tsx` 文件：

```typescript
// src/app/about/page.tsx
export default function AboutPage() {
  return <div>About Page</div>
}
```

### 添加 Server Action

在相应页面目录下创建 `actions.ts`：

```typescript
'use server'

export async function myAction(formData: FormData) {
  // 处理逻辑
  revalidatePath('/your-path')
}
```

## 🐛 故障排除

### 端口被占用

如果 3000 端口被占用，可以使用其他端口：

```bash
PORT=3001 npm run dev
```

### Prisma Client 错误

如果遇到 Prisma Client 相关错误，尝试重新生成：

```bash
npx prisma generate
```

### 数据库连接失败

检查 `.env.local` 中的 `DATABASE_URL` 是否正确配置。

### 构建失败

1. 清理缓存：
```bash
rm -rf .next
npm run build
```

2. 检查 TypeScript 错误：
```bash
npm run lint
```

### Hydration 错误

如果遇到 hydration 错误，确保：
- 服务端和客户端渲染的 HTML 一致
- 不在服务端组件中使用浏览器专属 API（如 `localStorage`、`window`）
- 使用 `"use client"` 标记需要客户端交互的组件

## 📚 学习资源

这个项目是按照 8 周学习计划构建的，完整文档：

- [LEARNING_PLAN.md](./LEARNING_PLAN.md) - 完整的 8 周学习计划
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - 详细的项目搭建指南
- [WEEK7_SUMMARY.md](./WEEK7_SUMMARY.md) - Week 7 开发总结
- [WEEK8_IMPLEMENTATION.md](./WEEK8_IMPLEMENTATION.md) - Week 8 部署指南

### 推荐学习资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [React 官方文档](https://react.dev/)
- [Prisma 文档](https://www.prisma.io/docs)
- [shadcn/ui 组件库](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

## 🎯 项目特色

### 架构设计

- **服务端优先**：充分利用 React Server Components，减少客户端 JavaScript
- **最小化客户端"孤岛"**：只在需要交互的地方使用 `"use client"`
- **类型安全**：TypeScript + Prisma 提供端到端类型安全
- **数据验证**：Zod schema 在客户端和服务端双重验证

### 性能优化

- ✅ Next.js Image 组件优化图片加载
- ✅ next/font 自动优化字体
- ✅ 骨架屏提升感知性能
- ✅ Server Components 减少客户端 bundle 大小
- ✅ 自动代码分割和懒加载

### SEO 友好

- ✅ 完整的 metadata 配置
- ✅ robots.txt 和 sitemap.xml
- ✅ 语义化 HTML 标签
- ✅ 服务端渲染确保搜索引擎可抓取

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

由学习 Next.js 15 和 React 19 的过程中创建。

---

⭐ 如果这个项目对你有帮助，请给个 Star！
