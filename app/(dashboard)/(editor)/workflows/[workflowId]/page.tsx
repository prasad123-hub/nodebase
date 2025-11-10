import { requireAuth } from "@/lib/auth-utils";

interface WorkflowPageProps {
  params: Promise<{ workflowId: string }>;
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { workflowId } = await params;
  await requireAuth();
  return <div>Workflow: {workflowId}</div>;
}
