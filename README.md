# fullstack

一个用于学习 **React + Next.js** 全栈开发的练习项目。

技术栈：**Next.js 16（App Router）· TypeScript · Tailwind CSS · ESLint**

## 快速开始

```bash
npm run dev     # 启动开发服务器（默认 http://localhost:3000）
npm run build   # 生产构建
npm run start   # 运行生产构建
npm run lint    # 代码检查
```

启动后打开 http://localhost:3000 ，修改 `src/app/page.tsx` 页面会自动热更新。

## 目录结构

```
src/
  app/
    layout.tsx     # 根布局（所有页面共享的外壳）
    page.tsx       # 首页（路由 "/"）
    globals.css    # 全局样式 + Tailwind 指令
public/            # 静态资源（图片等）
next.config.ts     # Next.js 配置
tsconfig.json      # TypeScript 配置
```

App Router 的核心约定：`app/` 下的文件夹即路由，文件夹里的 `page.tsx` 就是该路由的页面。

## 学习路线（边做边学）

1. **改首页**：编辑 `src/app/page.tsx`，用 Tailwind class 调样式
2. **加路由**：新建 `src/app/about/page.tsx`，访问 `/about`
3. **动态路由**：`src/app/blog/[slug]/page.tsx`，用 `params` 取参数
4. **服务端组件取数据**：在 `page.tsx` 里直接 `async` + `await fetch(...)`
5. **客户端交互**：需要 `useState`/事件的组件顶部加 `"use client"`
6. **Server Actions**：用 `"use server"` 处理表单提交与数据变更

## 官方文档

- Next.js 文档：https://nextjs.org/docs
- 交互式教程：https://nextjs.org/learn
- React 文档：https://react.dev

## 部署

推荐一键部署到 [Vercel](https://vercel.com/new)（Next.js 官方平台）。
