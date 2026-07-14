import { prisma } from "@/lib/prisma";
import type { NoteModel } from "@/generated/prisma/models";
import type { Prisma } from "@/generated/prisma/client";

// 复用 Prisma 生成的行类型（和数据库表结构完全对应），起个干净的别名 Note 对外暴露。
export type Note = NoteModel;

// 带作者信息的留言类型：用 Prisma 的 NoteGetPayload 根据"查询形状"自动推出类型。
export type NoteWithAuthor = Prisma.NoteGetPayload<{
  include: { author: { select: { id: true; email: true } } };
}>;

// 读取全部留言（带作者），按创建时间倒序。
// include 会顺带把关联的 author 一起查出来（Prisma 帮你做了"联表"）。
export function getNotes(): Promise<NoteWithAuthor[]> {
  return prisma.note.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { id: true, email: true } } },
  });
}

// 按 id 查单条留言（删除鉴权时用来确认作者）。
export function getNote(id: number): Promise<Note | null> {
  return prisma.note.findUnique({ where: { id } });
}

// 新增一条留言，必须指定作者（authorId）。id 和 createdAt 有默认值，不用传。
export function addNote(text: string, authorId: number): Promise<Note> {
  return prisma.note.create({
    data: { text, authorId },
  });
}

// 按 id 删除一条留言（Prisma 的 delete 会返回被删掉的那条记录）。
export function delNote(id: number): Promise<Note> {
  return prisma.note.delete({
    where: { id },
  });
}
