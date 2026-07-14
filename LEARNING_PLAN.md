# React + Next.js 分周学习计划

以本项目（Next.js 16 · App Router · TypeScript · Tailwind）为主线的 8 周计划。
每周建议投入 6–10 小时。**原则：少看多写，每周都有可运行的产出。**

> 基础自评：如果 JavaScript（ES6+、数组方法、async/await）已经熟练，可直接跳过第 0 周。

---

## 第 0 周（可选）· JavaScript 补齐

**目标**：扫清后面学 React 的语言障碍。

- [ ] 箭头函数、解构、展开运算符、模板字符串
- [ ] 数组方法：`map` / `filter` / `reduce` / `find`
- [ ] `import` / `export` 模块
- [ ] 异步：`Promise`、`async/await`、`fetch`
- [ ] 简单理解闭包和 `this`

**产出**：用纯 JS 写一个从公开 API 取数据并打印到控制台的小脚本。

---

## 第 1 周 · React 核心：组件与状态

**目标**：理解"状态驱动 UI"，能写交互组件。

- [ ] JSX 语法、函数组件、props
- [ ] `useState`，事件处理
- [ ] 受控表单（input 绑定 state）
- [ ] 列表渲染与 `key`
- [ ] 条件渲染

**在本项目动手**：把 `src/app/page.tsx` 改成一个**计数器 + Todo 列表**（增删、标记完成）。

**产出**：一个能用的 Todo 页面。

---

## 第 2 周 · React 进阶：副作用与复用

**目标**：掌握 Hooks，理解数据获取的时机。

- [ ] `useEffect`（依赖数组、清理函数——重点踩坑区）
- [ ] `useRef`、`useMemo`、`useCallback` 各自的用途
- [ ] `useContext`（跨组件共享状态）
- [ ] 自定义 Hook（把逻辑抽出来复用）

**在本项目动手**：新建组件目录 `src/components/`，写一个自定义 Hook `useLocalStorage`，让 Todo 数据刷新后不丢失。

**产出**：数据可持久化的 Todo。

---

## 第 3 周 · Next.js 路由与渲染基础

**目标**：吃透 App Router 的文件约定。

- [ ] `page.tsx` / `layout.tsx` / 嵌套布局
- [ ] 动态路由 `[id]`、`[slug]`
- [ ] 链接跳转 `<Link>`、编程式导航 `useRouter`
- [ ] `loading.tsx`、`error.tsx`、`not-found.tsx`
- [ ] **服务端组件 vs 客户端组件**（`"use client"` 何时用）← 本周最核心

**在本项目动手**：加 `/blog` 列表页 + `/blog/[slug]` 详情页（数据先用本地数组）。

**产出**：一个多页面、可点击进详情的博客骨架。

---

## 第 4 周 · 数据获取与 Server Actions

**目标**：学会 Next.js 的全栈数据流。

- [ ] 在服务端组件里 `async/await` 直接取数据
- [ ] `fetch` 缓存策略（`cache` / `revalidate`）
- [ ] Route Handlers：`app/api/.../route.ts` 写 API
- [ ] Server Actions（`"use server"`）处理表单提交
- [ ] 表单校验：引入 `Zod`

**在本项目动手**：博客改成从一个 Route Handler 读数据；加一个"新建文章"表单，用 Server Action 提交。

**产出**：能新增内容的博客（数据暂存内存/文件均可）。

---

## 第 5 周 · 数据库接入（真·全栈）

**目标**：把数据落到真实数据库。

- [ ] 选 ORM：**Prisma**（推荐入门）或 Drizzle
- [ ] 用 SQLite 起步，定义 schema、迁移
- [ ] 在 Server Component / Server Action 里读写数据库
- [ ] 完整跑通 CRUD（增删改查）

**在本项目动手**：把博客数据迁到 Prisma + SQLite，文章的增删改查全部走数据库。

**产出**：数据持久化的全栈博客。

---

## 第 6 周 · 认证与用户体系

**目标**：加上登录，区分用户。

- [ ] `Auth.js`（NextAuth）接入，先用 GitHub/邮箱登录
- [ ] session 的读取与保护路由
- [ ] "只有作者能编辑/删除自己的文章"

**在本项目动手**：加登录，文章关联作者，做权限控制。

**产出**：带登录和权限的博客。

---

## 第 7 周 · 打磨与生产实践

**目标**：让项目"像个真项目"。

- [ ] 客户端数据请求：`TanStack Query`
- [ ] 全局状态（如需）：`Zustand`
- [ ] 表单库：`React Hook Form` + Zod
- [ ] UI 组件库：`shadcn/ui`
- [ ] 加载/错误/空状态、响应式布局、暗色模式
- [ ] 基本可访问性（语义标签、alt、键盘可用）

**在本项目动手**：用 shadcn/ui 重做界面，补齐各种边界状态。

**产出**：交互与视觉完整的应用。

---

## 第 8 周 · 部署与收尾

**目标**：上线，形成闭环。

- [ ] 环境变量管理（`.env`，区分本地/生产）
- [ ] 生产数据库（如 Vercel Postgres / Neon）
- [ ] 部署到 **Vercel**
- [ ] 基础性能与 SEO：`metadata`、`<Image>`、`next/font`
- [ ] 写好 README，整理成作品集项目

**产出**：一个公网可访问、可写进简历的全栈应用。

---

## 每周固定动作

| 动作 | 说明 |
|------|------|
| 先读官方文档对应章节 | react.dev / nextjs.org/learn |
| 立刻在本项目里写代码验证 | 看懂 ≠ 会写 |
| 每周结束前 `npm run build` | 确保没坏、能构建 |
| 用 git 提交每周成果 | 记录进度、可回滚 |
| 记录卡住的问题 | 认真读报错，是提升最快的途径 |

## 避坑笔记：SSR / Hydration（水合）

在第 2 周做 localStorage 持久化时踩到的坑，结论值得记住：

**铁律：服务器渲染的 HTML，必须和浏览器"第一帧"渲染的结果完全一致，否则报 hydration 错误。**

- 浏览器专属的数据（`localStorage`、`window`、`document`）**在服务器上根本读不到**，所以服务器只能渲染"默认/空"状态。
- 正确思路不是"想办法让服务器也拿到数据"（做不到），而是 **"让浏览器第一帧也渲染成和服务器一致，水合完成后再更新成真实数据"**。
- `useState(() => ...)` 惰性初始化器：读初始值的正确位置，比在 `useEffect` 里 `setState` 好（后者 React 19 会警告级联渲染）。
- `useEffect` 的正确用途：把 state **同步到外部系统**（如写入 localStorage），不是用来初始化 state。
- 水合门闸 `useHydrated()`：用 `useSyncExternalStore` 实现，服务器/首帧返回 `false`、水合后返回 `true`，不触发级联渲染警告。
- `suppressHydrationWarning` 只对元素**自己那一层**生效，**修不了列表这种结构性不匹配**，别拿它当万能补丁。

代码见 `src/app/todo/page.tsx`。

## 要点笔记：Server Actions（第 4 周）

- **Server Action = POST 到当前页面网址**，没有独立的 API URL；只有 POST 能触发。
- `"use server"`：放在文件顶部 → 整个文件的导出都是服务端函数；放在函数体顶部 → 单个函数。客户端组件**不能定义** Server Action，只能从 `"use server"` 文件 import。
- `useActionState(action, initialState)` 返回 `[state, formAction, pending]`；被包裹的 action 签名是 **`(prevState, formData) => newState`**。
- **`FormData` 在 dev 日志里显示成 `{}`，但不是空的**（它不是普通对象、无法序列化）。传固定参数两种方式：隐藏 input `<input type="hidden" name="id" value={id}>`（直观、支持无 JS），或 `action.bind(null, id)`（少模板代码）。
- `revalidatePath("/xxx")`：Server Action 改完数据后调用，让页面重新渲染出最新数据。
- **校验的意义是防"不可信的用户输入"**（用 Zod `safeParse`）；内部可信数据不必严格校验。
- ⚠️ **安全**：Server Action 可被直接 POST 调用，不只通过界面。凡是涉及"谁能做什么"的操作（删除、修改），**权限检查必须写在 Server Action 内部**（第 6 周加认证后落实）。
- 推荐架构：**服务端组件读数据 + 把交互收敛到最小的客户端"孤岛"组件 + Server Action 改数据**。

代码见 `src/app/notes/`（`page.tsx` 服务端组件、`note-form.tsx` / `note-delete-button.tsx` 客户端孤岛、`actions.ts` 服务端函数、`data.ts` 临时内存存储）。

## 参考资源

- React 官方文档：https://react.dev
- Next.js 文档：https://nextjs.org/docs
- Next.js 交互式教程：https://nextjs.org/learn
- 防止水合闪烁（本地文档）：`node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`
- Prisma：https://www.prisma.io/docs
- Auth.js：https://authjs.dev
- shadcn/ui：https://ui.shadcn.com
