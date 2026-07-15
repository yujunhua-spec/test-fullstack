"use client";

import { useState } from "react";
import { createNote } from "./actions";
import { noteFormSchema, type NoteFormValues } from "@/lib/validations";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


export function NoteForm() {
    const [pending, setPending] = useState(false);
    const form = useForm<NoteFormValues>({
        resolver: zodResolver(noteFormSchema),
        mode: "onChange", // 关键：启用实时验证
        defaultValues: {
            text: ""
        }
    });

    const onSubmint = async (formData: NoteFormValues) => {
        try {
            setPending(true);
            await createNote(formData);
            form.reset();
            toast.success("发布成功")
        } catch {
            toast.error("发布失败")
        } finally {
            setPending(false);
        }
    }

    const textValue = useWatch({
        control: form.control,
        name: "text",
        defaultValue: ""
    })


    return (
        <div className="space-y-4">
            <form 
                onSubmit={form.handleSubmit(onSubmint)}
                className="space-y-4"
            >

                <div className="space-y-2">
                    <Label htmlFor="text">留言内容</Label>
                    <Textarea 
                        id="text"
                        placeholder="写点什么…"
                        disabled={pending}
                        className="min-h-25 resize-none"
                        {...form.register("text")}
                    />
                    <div className="flex items-center justify-between">
                        {form.formState.errors.text && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.text.message}
                        </p>
                        )}
                        <span className="ml-auto text-xs text-muted-foreground">
                        {textValue.length}/200
                        </span>
                    </div>
                </div>

                <button
                type="submit"
                disabled={pending || !form.formState.isValid}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                {(pending) ? "发布中…" : "发布"}
                </button>
            </form>
        </div>
    )
}