// Week 7 改进：使用 React Hook Form + shadcn/ui 组件
// 主要改进点：
// 1. React Hook Form - 更强大的表单状态管理
// 2. zodResolver - 集成 Zod 验证，客户端和服务端双重验证
// 3. 实时字符计数 - 更好的用户反馈
// 4. Textarea 组件 - 替代原生 input，支持多行文本
// 5. Alert 组件 - 更美观的成功/错误提示
// 6. 提交成功后自动重置表单 - 更好的用户体验

"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createNote } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// 表单验证 schema - 和服务端的 NoteSchema 保持一致
const noteFormSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "留言不能为空")
    .max(200, "留言不能超过 200 字"),
});

type NoteFormValues = z.infer<typeof noteFormSchema>;

export function NoteForm() {
  const [state, formAction, pending] = useActionState(createNote, {});

  // React Hook Form: 提供更强大的表单状态管理
  // zodResolver: 使用 Zod schema 进行客户端验证
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      text: "",
    },
  });

  // 监听 Server Action 的成功状态，成功后重置表单
  // 这样用户可以立即输入下一条留言，无需手动清空
  useEffect(() => {
    if (state.success) {
      form.reset();
    }
  }, [state.success, form]);

  // 使用 useWatch 替代 form.watch() 以避免 React Compiler 警告
  // useWatch 是专门为在组件中订阅表单值而设计的
  const textValue = useWatch({
    control: form.control,
    name: "text",
    defaultValue: "",
  });

  return (
    <div className="space-y-4">
      {/* 使用 action 属性让表单直接提交到 Server Action
          React Hook Form 只用于客户端验证和 UI 状态管理 */}
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">留言内容</Label>
          <Textarea
            id="text"
            placeholder="写点什么..."
            className="min-h-25 resize-none"
            disabled={pending}
            {...form.register("text")}
          />
          {/* 显示验证错误或字符计数 */}
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

        <Button 
          type="submit" 
          disabled={pending || !form.formState.isValid} 
          className="w-full"
        >
          {pending ? "发布中..." : "发布留言"}
        </Button>
      </form>

      {/* 成功提示：使用 Alert 组件，绿色主题 */}
      {state.success && (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            留言发布成功！
          </AlertDescription>
        </Alert>
      )}

      {/* 错误提示：使用 Alert 组件的 destructive 变体 */}
      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}