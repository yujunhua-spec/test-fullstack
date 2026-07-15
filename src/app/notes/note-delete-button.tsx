"use client";

import { useState } from "react";
import { deleteNote } from "./actions";
import { NoteDelSchema, NoteDelValues } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

export function NoteDeleteButton({ id }: { id: number}) {
    const form = useForm<NoteDelValues>({
        resolver: zodResolver(NoteDelSchema),
        defaultValues: {
            id: id
        }
    })
    const [open, setOpen] = useState(false);
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
            {/* AlertDialog: 删除确认对话框，防止误操作 */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                {/* 使用普通按钮作为触发器 */}
                <AlertDialogTrigger className="inline-flex h-8 items-center justify-center rounded-md px-2 text-sm font-medium text-destructive transition-colors hover:bg-accent hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>确认删除</AlertDialogTitle>
                    <AlertDialogDescription>
                    此操作无法撤销。确定要删除这条留言吗？
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction
                    onClick={async (e) => {
                        e.preventDefault();
                        
                        await form.handleSubmit(onsubmit)();
                        setOpen(false);
                    }}
                    disabled={pending || !form.formState.isValid}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                    {pending ? "删除中..." : "确认删除"}
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </form>

    )
}