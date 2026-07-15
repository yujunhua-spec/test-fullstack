"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";


// 用 useSyncExternalStore 实现，不需要 effect + setState，所以没有级联渲染警告。
function useHydrated() {
  return useSyncExternalStore(
    () => () => {}, // 订阅函数：我们不关心变化，返回一个空的取消订阅函数
    () => true,     // 浏览器端读到的值
    () => false,    // 服务器端读到的值
  );
}

export function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    const hydrated = useHydrated();
    if (!hydrated) {
        return(
            <Button variant="ghost" size="icon" disabled>
                <Sun className="h-5 w-5" />
            </Button>
        )
    }
    return(
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
    )
}