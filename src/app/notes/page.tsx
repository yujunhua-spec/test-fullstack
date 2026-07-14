import Link from "next/link";
import { getNotes } from "./data";
import { NoteForm } from "./note-form";
import { NoteDeleteButton } from "./note-delete-button";
import { getCurrentUser } from "@/lib/dal";

export default async function NotesPage() {
  // 并行取数据：留言列表 + 当前登录用户（没登录则为 null）。
  const [notes, user] = await Promise.all([getNotes(), getCurrentUser()]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        留言板
      </h1>

      {/* 登录了才显示留言框；否则提示去登录 */}
      {user ? (
        <NoteForm />
      ) : (
        <p className="text-sm text-zinc-500">
          请先{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            登录
          </Link>{" "}
          后再留言。
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {notes.map((note) => (
          <li
            key={note.id}
            className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800"
          >
            <p className="text-zinc-800 dark:text-zinc-100">{note.text}</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-zinc-400">
                {note.author.email} · {note.createdAt.toISOString().slice(0, 10)}
              </p>
              {/* 删除按钮只出现在"自己的"留言上（这只是界面友好；真正的拦截在 Server Action 里） */}
              {user?.id === note.authorId && <NoteDeleteButton id={note.id} />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
