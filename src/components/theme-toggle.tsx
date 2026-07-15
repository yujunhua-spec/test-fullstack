// Week 7: 主题切换按钮组件
// 为什么需要这个：提供一个用户友好的按钮，让用户可以在亮色和暗色模式之间切换
// 使用 lucide-react 的图标（太阳/月亮）来直观地表示当前主题
// mounted 状态用于避免服务端渲染和客户端首次渲染不一致的问题（hydration mismatch）
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // 只在客户端挂载后才显示真实的主题图标
  // 这样可以避免服务端渲染的内容和客户端不一致
  // 使用 flushSync 确保状态更新是同步的，避免 hydration mismatch
  React.useEffect(() => {
    // 延迟到下一个事件循环，避免在 effect 中同步调用 setState
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    // 服务端和首次渲染时显示占位符，避免闪烁
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">切换主题</span>
    </Button>
  );
}