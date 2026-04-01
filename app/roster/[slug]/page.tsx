import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [];
}

export default async function MemberDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  redirect("/roster");
}
