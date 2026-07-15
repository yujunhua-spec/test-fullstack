"use server";
import { z } from "zod";
import { addNote, delNote, getNote } from "./data";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { noteFormSchema, NoteFormValues } from "@/lib/validations";

// 这个类型描述 Server Action 每次返回的"状态"：可能有错误，或成功。
export type NoteFormState = {
  error?: string;
  success?: boolean;
};

const NoteDelSchema = z.object({
  id: z.number().gt(0, "id 必须大于 0"),
});

export async function createNote(
  formData: NoteFormValues,
): Promise<NoteFormState> {
  // 必须登录：没登录 verifySession 会直接重定向到 /login。
  const user = await verifySession();

  const result = noteFormSchema.safeParse(formData);
  if (!result.success) throw new Error(result.error.issues[0].message);

  // 用当前登录用户作为作者——作者身份来自服务端会话，不信任前端传来的值。
  await addNote(result.data.text, user.id);
  revalidatePath("/notes");
  return { success: true };
}

export async function deleteNote(
  _prevState: NoteFormState,
  formData: FormData,
): Promise<NoteFormState> {
  const user = await verifySession();

  const result = NoteDelSchema.safeParse({ id: Number(formData.get("id")) });
  if (!result.success) return { error: result.error.issues[0].message };

  // 鉴权：只能删自己的留言。这个检查必须在服务端做——
  // 因为 Server Action 可被直接 POST 调用，前端隐藏/不显示删除按钮拦不住恶意请求。
  const note = await getNote(result.data.id);
  if (!note || note.authorId !== user.id) {
    return { error: "无权删除这条留言" };
  }

  await delNote(result.data.id);
  revalidatePath("/notes");
  return { success: true };
}
