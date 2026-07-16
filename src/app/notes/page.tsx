import Link from "next/link";
import { getNotes } from "./data";
import { NoteForm } from "./note-form";
import { NoteDeleteButton } from "./note-delete-button";
import { getCurrentUser } from "@/lib/dal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "留言板",
  description: "分享你的想法，与社区互动",
};


export default async function NotesPage() {
  // 并行取数据：留言列表 + 当前登录用户（没登录则为 null）。
  const [notes, user] = await Promise.all([getNotes(), getCurrentUser()]);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">

      <div className="space-y-8">
        {/* 页面标题区域 */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">留言板</h1>
          <p className="text-muted-foreground">
            分享你的想法，与社区互动
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>发布留言</CardTitle>
            <CardDescription>分享你的想法，最多 200 字</CardDescription>
          </CardHeader>
          <CardContent>
            {/* 登录了才显示留言框；否则提示去登录 */}
            {user ? (
              <NoteForm />
            ) : (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  请先{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    登录
                  </Link>{" "}
                  后再留言。
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 留言列表区域 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            所有留言 <Badge variant="secondary">{notes.length}</Badge>
          </h2>
        </div>
        { notes.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-muted-foreground">
                  还没有留言，成为第一个留言的人吧！
                </p>
              </CardContent>
            </Card>
        ) : (
            // 留言列表：每条留言用 Card 包裹
            <div className="space-y-3">
             {notes.map((note) => (
                <Card key={note.id}>
                  <CardContent className="pt-6">
                    <p className="text-base leading-relaxed">{note.text}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">{note.author.email}</span>
                        <span>·</span>
                        {/* 格式化日期：使用中文格式 */}
                        <time dateTime={note.createdAt.toISOString()}>
                          {new Date(note.createdAt).toLocaleDateString("zh-CN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      {/* 只有作者才能看到删除按钮 */}
                      {user?.id === note.authorId && (
                        <NoteDeleteButton id={note.id} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        ) }
      </div>
    </div>
  );
}
