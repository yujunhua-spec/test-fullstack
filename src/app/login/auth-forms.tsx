"use client";

import { useActionState } from "react";
import { AuthState, login, signup } from "./actions";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const initialState: AuthState = {}

function AuthForm({
    action,
    submitLabel,
    pendingLabel
}: {
    action: (prev: AuthState, formData: FormData) => Promise<AuthState> ;
    submitLabel: string;
    pendingLabel: string
}) {
    const [state, formAction, pending] = useActionState(action, initialState)
    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    邮箱
                </Label>
                <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    disabled={pending}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    密码
                </Label>
                <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={pending}
                    autoComplete="current-password"
                    minLength={6}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                />
            </div>
            <button
                type="submit"
                disabled={pending}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
                {pending ? pendingLabel : submitLabel}
            </button>

            {/* 错误提示：使用 Alert 组件的 destructive 变体 */}
            {state.error && (
                <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}
        </form>
    )
}

export function AuthForms() {
    return(
        <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="signup">注册</TabsTrigger>
            </TabsList>

            <TabsContent value="login" >
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
            <TabsContent value="signup" >
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


    )
}