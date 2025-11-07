import { getQueryClient, HydrateClient, prefetch, trpc } from "@/trpc/server";
import Client from "./client";

export default async function Home() {
  prefetch(trpc.getUsers.queryOptions());

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HydrateClient>
        <Client />
      </HydrateClient>
    </div>
  );
}
