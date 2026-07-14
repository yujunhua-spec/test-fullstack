"use client";

import { useActionState } from "react";
import { deleteNote, NoteFormState } from "./actions";

const initialState: NoteFormState = {}
export function NoteDeleteButton({ id }: { id: number}) {
    const [state, formAction, pending] = useActionState(deleteNote, initialState)
    return(
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <button
                type="submit"
                disabled={pending}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                >
            { pending ? "留言删除中" : "删除留言" }
            </button>
            {/* 校验失败时，把 Server Action 返回的错误信息显示出来 */}
            {state.error && <p className="text-sm text-red-500">{state.error}</p>}
        </form>

    )
}