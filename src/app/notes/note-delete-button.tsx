"use client";

import { useState } from "react";
import { deleteNote } from "./actions";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

export function NoteDeleteButton({ id }: { id: number}) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const onsubmit =  async ({id} : {id: number}) => {
        try {
            setPending(true);
            await deleteNote({id});
            toast.success("删除成功")
        } catch {
            toast.error("删除失败")
        } finally {
            setPending(false);
        }
    }
    return(
        <>
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
                        
                        await onsubmit({id});
                        setOpen(false);
                    }}
                    disabled={pending}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                    {pending ? "删除中..." : "确认删除"}
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}