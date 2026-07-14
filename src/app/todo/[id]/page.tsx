"use client";

import { use, useState, useSyncExternalStore } from "react";
import Link from "next/link";

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export default function TodoDetailPage({
  params,
} : { params: Promise<{id: string}>}) {
  const { id } = use(params);
  const hydrated = useHydrated();
  const [todos] = useState<Todo[]>(
    () => {
      if (typeof window === "undefined") return [];
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : []
  });

  const todo = hydrated ? todos.find((todo) => todo.id === Number(id)) : undefined;

  return(
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-16">
      <Link href="/todo" className="text-sm text-blue-600 hover:underline">
        ← 返回列表
      </Link>
      {
        !hydrated ? 
        (
          // 服务器 & 浏览器首帧都渲染这个 → 一致，不报 hydration 错误
          <p className="text-zinc-400">加载中…</p>
        ) : todo ? (
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {todo.text}
            </h1>
            <p className="text-zinc-500">
              状态：{todo.done ? "✅ 已完成" : "⬜ 未完成"}
            </p>
            <p className="text-sm text-zinc-400">ID：{todo.id}</p>
          </div>
        ) : (
          <p className="text-zinc-500">找不到这条待办（ID：{id}）</p>
        )
      }
    </div>
  )
}