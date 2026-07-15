// Week 7 改进：使用 AlertDialog 确认删除
// 主要改进点：
// 1. AlertDialog 组件 - 防止误删除，提供二次确认
// 2. 使用图标按钮 - 更简洁的界面
// 3. 状态管理 - 控制对话框的开关
// 4. 更好的用户反馈 - 删除中状态显示
// 5. 错误处理 - 显示删除失败的原因

"use client";

import { useActionState, useState, useTransition } from "react";
import { deleteNote, NoteFormState } from "./actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const initialState: NoteFormState = {};

export function NoteDeleteButton({ id }: { id: number }) {
  const [state, formAction, pending] = useActionState(deleteNote, initialState);
  const [open, setOpen] = useState(false);
  // 使用 useTransition 来包裹异步操作，避免警告
  const [isPending, startTransition] = useTransition();

  return (
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
              onClick={(e) => {
                e.preventDefault();
                // 使用 startTransition 包裹异步操作
                startTransition(() => {
                  const form = document.getElementById(
                    `delete-form-${id}`
                  ) as HTMLFormElement;
                  if (form) {
                    const formData = new FormData(form);
                    formAction(formData);
                  }
                });
                setOpen(false);
              }}
              disabled={pending || isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {pending || isPending ? "删除中..." : "确认删除"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 隐藏的表单用于提交删除请求 */}
      <form id={`delete-form-${id}`} action={formAction} className="hidden">
        <input type="hidden" name="id" value={id} />
      </form>

      {/* 错误提示：如果删除失败，显示错误信息 */}
      {state.error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
    </>
  );
}