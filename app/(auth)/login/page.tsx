import { LoginForm } from '@/features/auth/login-form';
import { requireGuest } from '@/lib/auth-utils';

export default async function Page() {
  await requireGuest();
  return <LoginForm />;
}
