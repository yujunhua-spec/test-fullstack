import { Metadata } from "next";
import { AuthForms } from "./auth-forms";

export const metadata: Metadata = {
  title: "登录",
  description: "登录或注册以继续使用全栈留言板",
};

export default function LoginPage() {
    return(
        <div className="container flex mx-auto items-center min-h-[calc(100vh-8rem)] justify-center px-4">
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
    )
}