import { LoginForm } from "@/components/login-form";
import { requireGuest } from "@/lib/auth-utils";

export default async function Page() {
  await requireGuest();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
