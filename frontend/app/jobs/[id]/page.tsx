"use client"

import { useParams } from "next/navigation";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Detalhes da vaga</h1>
      <p>ID da vaga: {jobId}</p>
    </main>
  );
}