// "use client" 告诉 Next.js：这是一个"客户端组件"。
// 只有客户端组件才能使用 useState、事件处理（onClick）等浏览器交互能力。
// 不写这行，用了 useState 就会报错。（默认情况下 Next.js 的组件是"服务端组件"。）
"use client";

// 从 React 导入 useState 这个 Hook，用来给组件添加"状态"。
import { useState } from "react";

// 这是页面组件。App Router 里，src/app/page.tsx 默认导出的函数就是首页（路由 "/"）。
export default function Home() {
  // useState(0) 声明一个状态，初始值是 0。
  // 它返回一个数组：[当前值, 更新这个值的函数]。
  // 这里用解构把它们命名为 count 和 setCount。
  const [count, setCount] = useState(0);

  // 组件必须返回要渲染的 JSX（看起来像 HTML，但其实是 JS）。
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 dark:bg-black">
      {/* 标题 */}
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        我的第一个计数器
      </h1>

      {/* 把 count 显示出来。JSX 里用 {} 包裹的是 JS 表达式。 */}
      <p className={`text-6xl font-mono tabular-nums ${count < 0 ? "text-red-500" : "text-blue-600" } dark:text-blue-400`}>
        {count}
      </p>

      {/* 三个按钮：减一、归零、加一 */}
      <div className="flex gap-4">
        {/* onClick 绑定一个函数：点击时把 count 减 1。
            写成 () => ... 的箭头函数，是为了"点击时才执行"，
            而不是渲染时立刻执行。 */}
        <button
          onClick={() => setCount(count - 5)}
          className="rounded-lg bg-zinc-200 px-5 py-2 text-lg font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          − 5
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="rounded-lg bg-zinc-200 px-5 py-2 text-lg font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          − 1
        </button>

        <button
          onClick={() => setCount(0)}
          className="rounded-lg bg-zinc-200 px-5 py-2 text-lg font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          归零
        </button>

        <button
          onClick={() => setCount(count + 1)}
          className="rounded-lg bg-blue-600 px-5 py-2 text-lg font-medium text-white transition hover:bg-blue-700"
        >
          + 1
        </button>
        <button
          onClick={() => setCount(count + 5)}
          className="rounded-lg bg-blue-600 px-5 py-2 text-lg font-medium text-white transition hover:bg-blue-700"
        >
          + 5
        </button>
      </div>
    </div>
  );
}
