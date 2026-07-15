// Week 7 改进：使用 Tabs 组件和 shadcn/ui 重构登录表单
// 主要改进点：
// 1. Tabs 组件 - 在登录和注册之间切换，更好的用户体验
// 2. Card 组件 - 更好的视觉层次
// 3. Input 和 Label 组件 - 统一的表单样式
// 4. Alert 组件 - 更美观的错误提示
// 5. 更好的表单布局和间距

"use client";

import { useActionState } from "react";
import { AuthState, login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const initialState: AuthState = {};

// 通用的认证表单组件，用于登录和注册
function AuthForm({
  action,
  submitLabel,
  pendingLabel,
}: {
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
  submitLabel: string;
  pendingLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          disabled={pending}
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          disabled={pending}
          autoComplete="current-password"
          minLength={6}
        />
      </div>

      {/* 错误提示：使用 Alert 组件的 destructive 变体 */}
      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}

export function AuthForms() {
  return (
    // Tabs: 在登录和注册之间切换，避免页面跳转
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">登录</TabsTrigger>
        <TabsTrigger value="signup">注册</TabsTrigger>
      </TabsList>

      {/* 登录表单 */}
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>登录</CardTitle>
            <CardDescription>
              使用你的邮箱和密码登录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm action={login} submitLabel="登录" pendingLabel="登录中…" />
          </CardContent>
        </Card>
      </TabsContent>

      {/* 注册表单 */}
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>注册</CardTitle>
            <CardDescription>
              创建一个新账号开始使用
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm action={signup} submitLabel="注册" pendingLabel="注册中…" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}