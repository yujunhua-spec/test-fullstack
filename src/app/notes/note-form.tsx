"use client";

import { useActionState } from "react";
import { createNote, NoteFormState } from "./actions";

const initialState: NoteFormState = {}
export function NoteForm() {
    const [state,  formAction, pending] = useActionState(createNote, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-2">
        <div className="flex gap-2">
            <input
            name="text"
            placeholder="写点什么…"
            disabled={pending}
            className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-blue-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
            <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
            {pending ? "发布中…" : "发布"}
            </button>
        </div>

        {/* 校验失败时，把 Server Action 返回的错误信息显示出来 */}
        {state.error && <p className="text-sm text-red-500">{state.error}</p>}
        </form>
    )
}