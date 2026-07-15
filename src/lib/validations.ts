import { z } from "zod";

// 用 Zod 定义"合法的留言长什么样"：去掉首尾空格后，1~200 字。
export const noteFormSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "留言不能为空")
    .max(200, "留言不能超过 200 字"),
});

export type NoteFormValues = z.infer<typeof noteFormSchema>;
