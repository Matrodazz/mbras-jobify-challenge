"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  company_name: string;
  company_logo?: string;
  job_type?: string;
  candidate_required_location?: string;
  salary?: string;
  description: string;
  category?: string;
  tags?: string[];
}

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`http://localhost:4000/api/jobs/${id}`);
        if (!res.ok) {
          console.warn("Vaga não encontrada ou erro");
          setJob(null);
          return;
        }

        const data: Job = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Erro ao buscar vaga:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!job) return <p>Vaga não encontrada</p>;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      
      <h1 className="text-4xl text-cyan-600 font-bold mb-4">{job.title}</h1>

      <section className="mt-6">
        <div className="flex items-center gap-4">
          {job.company_logo && (
            <img
              src={job.company_logo}
              alt={job.company_name}
              className="w-20 h-20 bg-neutral-300 object-contain rounded-3xl"
            />
          )}
          <p className="text-2xl font-semibold">{job.company_name}</p>
        </div>
      </section>

     
      <section className="mt-6">
        <p>
          Local:{" "}
          <strong>{job.candidate_required_location || "Não informado"}</strong>
        </p>
        <p>
          Tipo: <strong>{job.job_type || "Não informado"}</strong>
        </p>
        {job.salary && (
          <p>
            Salário: <strong>{job.salary}</strong>
          </p>
        )}
        {job.category && (
          <p>
            Categoria: <strong>{job.category}</strong>
          </p>
        )}
        {job.tags && job.tags.length > 0 && (
          <p>
            Tags: <strong>{job.tags.join(", ")}</strong>
          </p>
        )}
      </section>

      <section className="mt-6 bg-neutral-300 rounded-3xl p-4">
        <h2 className="text-xl font-semibold">Descrição da vaga</h2>
        <div
          className="prose p-4"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </section>

      
    </main>
  );
}