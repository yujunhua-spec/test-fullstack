import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";
import { logout } from "@/app/login/actions";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const meta: Metadata = {
  title: {
    default: "全栈留言板",
    template: "%s | 全栈留言板"
  },
  description: "一个使用 Next.js 15、React 19、Prisma 和 shadcn/ui 构建的现代全栈应用，支持用户认证、实时留言和暗色模式",
  keywords: ["Next.js", "React", "TypeScript", "Prisma", "shadcn/ui", "全栈", "留言板"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    title: "全栈留言板",
    description: "一个现代全栈应用示例",
    siteName: "全栈留言板",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 根布局是服务端组件，可以直接读当前登录用户。
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <nav className="flex items-center gap-6 border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
            <Link href="/" className="font-medium hover:text-blue-600">
              首页
            </Link>
            <Link href="/todo" className="font-medium hover:text-blue-600">
              待办清单
            </Link>
            <Link href="/notes" className="font-medium hover:text-blue-600">
              留言板
            </Link>

            {/* 右侧：登录状态。ml-auto 把它推到最右边 */}
            <div className="ml-auto flex items-center gap-3 text-sm">
              <ThemeToggle />
              {user ? (
                <>
                  <span className="text-zinc-500">{user.email}</span>
                  {/* 登出是个 Server Action，用一个只有按钮的表单触发 */}
                  <form action={logout}>
                    <button
                      type="submit"
                      className="rounded-lg border border-zinc-300 px-3 py-1 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                      登出
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="font-medium hover:text-blue-600">
                  登录
                </Link>
              )}
            </div>
          </nav>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
