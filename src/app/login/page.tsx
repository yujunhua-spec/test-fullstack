// Week 7 改进：改进登录页面布局
// 主要改进点：
// 1. 居中布局 - 更好的视觉效果
// 2. 响应式设计 - max-w-md 限制最大宽度
// 3. 更好的标题和描述
// 4. 使用 shadcn/ui 组件

import { AuthForms } from "./auth-forms";

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* 页面标题 */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">欢迎回来</h1>
          <p className="text-muted-foreground">
            登录或注册以继续使用
          </p>
        </div>
        {/* 登录/注册表单 */}
        <AuthForms />
      </div>
    </div>
  );
}