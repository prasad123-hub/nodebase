import { requireAuth } from "@/lib/auth-utils";

interface ExecutionPageProps {
  params: Promise<{ executionId: string }>;
}

export default async function ExecutionPage({ params }: ExecutionPageProps) {
  const { executionId } = await params;
  await requireAuth();
  return <div>Execution: {executionId}</div>;
}
