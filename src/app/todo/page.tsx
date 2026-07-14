"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

// 一个可复用的小钩子：返回"是否已经水合完成"。
// - 服务器端 & 浏览器首次渲染：都返回 false（两边一致 → 不会 hydration mismatch）
// - 水合完成后：返回 true
// 用 useSyncExternalStore 实现，不需要 effect + setState，所以没有级联渲染警告。
function useHydrated() {
  return useSyncExternalStore(
    () => () => {}, // 订阅函数：我们不关心变化，返回一个空的取消订阅函数
    () => true,     // 浏览器端读到的值
    () => false,    // 服务器端读到的值
  );
}

export default function TodoPage() {
  // 惰性初始化：这个函数只在首次渲染跑一次，用返回值当初始 state。
  // 比在 useEffect 里 setState 更好——不会触发级联渲染，React 19 也不再警告。
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return []; // 服务器端没有 localStorage
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");

  const hydrated = useHydrated();
  // 关键：水合完成前，一律当作空列表来渲染——这样浏览器首次渲染和服务器一致。
  // 水合完成后，才把真实的 todos 显示出来。
  const visibleTodos = hydrated ? todos : [];
  const activeCount = visibleTodos.filter((todo) => !todo.done).length;

  // 保存 effect 保留：把 state 同步到外部系统（localStorage）正是 effect 该做的事。
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    const inputTxt = text.trim();
    if(inputTxt === "") return;

    setTodos(
      [
        ...todos,
        {id: Date.now(), text: inputTxt, done: false}
      ]
    );
    setText("")
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((todo) => todo.id === id? {...todo, done: !todo.done} : todo))
  }

  function clearDoneTodos() {
    setTodos(todos.filter((todo) => todo.done !== true))
  }
  return(
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        待办清单
      </h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();}}
        className="flex gap-2"
      >
        {/* 受控输入：value 绑定 state，onChange 里把最新输入写回 state。
            这两者配合，state 就永远是输入框的"唯一真相"。 */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="要做点什么？"
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          添加
        </button>
        <button
          type="button"
          onClick={clearDoneTodos}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          清除已完成
        </button>
      </form>

      {/* 列表渲染：用 map 把数组的每一项变成一段 JSX。
          key 是 React 的要求——给每一项一个稳定唯一的标识，
          它靠 key 高效地知道哪项变了/加了/删了。这里用 todo.id。 */}
      <ul className="flex flex-col gap-2">
        {
          visibleTodos.map((todo) => (
              <li key={todo.id}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800"
              >
                {/* 勾选框，也用受控写法：checked 绑 state，onChange 切换 */}
                <input
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  type="checkbox"
                  className="h-4 w-4"
                />

                {/* 已完成的加删除线。又是"用 JS 拼 className"的技巧。 */}
                <Link href={`/todo/${todo.id}`}
                  className={
                    `flex-1 ${
                      todo.done ? "text-zinc-400 line-through"
                      : "text-zinc-800 dark:text-zinc-100"
                    } hover:underline`
                  }
                >
                  {todo.text}
                </Link>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  删除
                </button>
              </li>
            )
          )
        }

        {/* 条件渲染：列表为空时给个提示。&& 前面为 true 才渲染后面。 */}
        {visibleTodos.length === 0 && (
          <li className="py-4 text-center text-zinc-400">还没有待办，加一个吧</li>
        )}
        {visibleTodos.length !== 0 && activeCount !== 0
        && (
          <li className="py-4 text-center text-zinc-400">还剩 {activeCount} 项未完成</li>
        )}
      </ul>
    </div>
  )
}