"use client";

import { useState } from "react";
import { deleteNote } from "./actions";
import { NoteDelSchema, NoteDelValues } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export function NoteDeleteButton({ id }: { id: number}) {
    const form = useForm<NoteDelValues>({
        resolver: zodResolver(NoteDelSchema),
        defaultValues: {
            id: id
        }
    })
    const [pending, setPending] = useState(false);
    const onsubmit =  async (formdata: NoteDelValues) => {
        try {
            setPending(true);
            await deleteNote(formdata);
            form.reset();
            toast.success("删除成功")
        } catch {
            toast.error("删除失败")
        } finally {
            setPending(false);
        }
    }
    return(
        <form id={`delete-form-${id}`} onSubmit={form.handleSubmit(onsubmit)}>
            <input type="hidden" id="id" {...form.register("id")} />
            <button
                type="submit"
                disabled={pending || !form.formState.isValid}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
            { pending ? "留言删除中" : "删除留言" }
            </button>
        </form>

    )
}