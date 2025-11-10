import { requireAuth } from "@/lib/auth-utils";

interface CredentialPageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

export default async function CredentialPage({ params }: CredentialPageProps) {
  const { credentialId } = await params;
  await requireAuth();
  return <div>Credential: {credentialId}</div>;
}
