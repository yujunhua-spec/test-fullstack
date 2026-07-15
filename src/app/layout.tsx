// Week 7 改进：添加 shadcn/ui 组件、暗色模式支持、改进的导航栏
// 主要改进点：
// 1. ThemeProvider - 支持暗色模式切换
// 2. 使用 shadcn/ui 的 Button 组件 - 统一的设计语言
// 3. 改进的导航栏 - sticky 定位、毛玻璃效果、更好的布局
// 4. 添加主题切换按钮 - 提升用户体验
// 5. 添加页脚 - 完整的页面结构
// 6. suppressHydrationWarning - 避免主题切换时的水合警告

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";
import { logout } from "@/app/login/actions";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "全栈学习项目",
  description: "Next.js + React 全栈应用学习项目",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    // suppressHydrationWarning: 因为 next-themes 会在客户端修改 class，避免 React 警告
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {/* ThemeProvider: 包裹整个应用，提供主题切换功能 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            {/* 导航栏改进：
                - sticky top-0: 滚动时固定在顶部
                - backdrop-blur: 毛玻璃效果
                - 使用 shadcn/ui 的 Button 组件
                - 添加主题切换按钮
            */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
              <div className="container flex h-14 items-center">
                <nav className="flex flex-1 items-center gap-6">
                  <Link
                    href="/"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    首页
                  </Link>
                  <Link
                    href="/todo"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    待办清单
                  </Link>
                  <Link
                    href="/notes"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    留言板
                  </Link>
                </nav>

                {/* 右侧区域：主题切换 + 用户状态 */}
                <div className="flex items-center gap-2">
                  {/* Week 7 新增：主题切换按钮 */}
                  <ThemeToggle />
                  
                  {user ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                      <form action={logout}>
                        {/* 使用 shadcn/ui Button 组件，统一设计语言 */}
                        <Button type="submit" variant="outline" size="sm">
                          登出
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <Link href="/login">
                      <Button variant="default" size="sm">
                        登录
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </header>

            {/* 主内容区域 */}
            <main className="flex-1">{children}</main>

            {/* Week 7 新增：页脚 */}
            <footer className="border-t py-6">
              <div className="container text-center text-sm text-muted-foreground">
                Week 7: 打磨与生产实践 · 使用 shadcn/ui 构建
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}