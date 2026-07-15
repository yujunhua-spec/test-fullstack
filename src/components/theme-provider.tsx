// Week 7: 主题提供者组件
// 为什么需要这个：next-themes 需要一个 Provider 包裹应用，才能在整个应用中使用主题切换功能
// 这个组件会在 layout.tsx 中使用，为整个应用提供暗色模式支持
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}