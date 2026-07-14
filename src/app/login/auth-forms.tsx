"use client";

import { useActionState } from "react";
import { AuthState, login, signup } from "./actions";

const initialState: AuthState = {}

function AuthForm({
    action,
    submitLabel,
    pendingLabel
}: {
    action: (prev: AuthState, formData: FormData) => Promise<AuthState> ;
    submitLabel: string;
    pendingLabel: string
}) {
    const [state, formAction, pending] = useActionState(action, initialState)
    return (
        <form action={formAction} className="flex flex-col gap-3">
        <input
            name="email"
            type="email"
            placeholder="邮箱"
            disabled={pending}
            className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-blue-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <input
            name="password"
            type="password"
            placeholder="密码（至少 6 位）"
            disabled={pending}
            className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-blue-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
            {pending ? pendingLabel : submitLabel}
        </button>
        {state.error && <p className="text-sm text-red-500">{state.error}</p>}
        </form>
    )
}

export function AuthForms() {
    return(
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">登录</h2>
        <AuthForm action={login} submitLabel="登录" pendingLabel="登录中…" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
          还没有账号？注册一个
        </h2>
        <AuthForm action={signup} submitLabel="注册" pendingLabel="注册中…" />
      </section>
    </div>
    )
}