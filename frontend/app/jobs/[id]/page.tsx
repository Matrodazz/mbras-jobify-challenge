"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import FavoriteButton from "@/app/components/FavoriteButton"; 

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

const USER_ID = "6c366c78-badf-4c60-828a-db58f2467797";

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const [jobRes, favRes] = await Promise.all([
          fetch(`http://localhost:4000/api/jobs/${id}`),
          fetch(`http://localhost:4000/api/favorites/user/${USER_ID}`)
        ]);

        if (!jobRes.ok) {
          setJob(null);
          return;
        }

        const jobData: Job = await jobRes.json();
        setJob(jobData);

        const favData = await favRes.json();
        const favoriteIds = Array.isArray(favData) ? favData.map(f => f.job_id) : [];
        setIsFavorite(favoriteIds.includes(jobData.id));
      } catch (error) {
        console.error("Erro ao buscar vaga ou favoritos:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] mb-100">
        <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) return <p className="text-center mt-8">Vaga não encontrada</p>;

  return (
    <main className="p-8 max-w-3xl mx-auto relative">

      <h1 className="text-4xl text-cyan-600 font-bold mb-8 md:mb-4">{job.title}</h1>
      <FavoriteButton  jobId={job.id} initialIsFavorite={isFavorite} className="relative"/>

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
          Local: <strong>{job.candidate_required_location || "Não informado"}</strong>
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
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
        />
      </section>
    </main>
  );
}
