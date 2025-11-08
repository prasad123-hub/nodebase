import { SignupForm } from "@/features/auth/signup-form";
import { requireGuest } from "@/lib/auth-utils";

export default async function Page() {
  await requireGuest();
  return <SignupForm />;
}
