import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Home() {
  await requireAuth();
  const user = await caller.getUser();
  return <div>{JSON.stringify(user, null, 2)}</div>;
}
