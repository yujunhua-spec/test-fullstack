import { AuthForms } from "./auth-forms";

export default function LoginPage() {
    return(
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-4 py-16">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                登录 / 注册
            </h1>
            <AuthForms />
        </div>
    )
}