"use client";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import FilterButton from "./FilterButton";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const limit = 10;

  const categories = [
    "Software Development",
    "Customer Service",
    "Design",
    "Marketing",
    "Sales / Business",
    "Product",
    "Project Management",
    "Data Analysis",
    "DevOps / Sysadmin",
    "Finance / Legal",
    "Human Resources",
    "QA",
    "Writing",
    "All others"
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let url = `http://localhost:4000/api/jobs?page=${page}&limit=${limit}`;

        if (category.trim() !== "") {
          url = `http://localhost:4000/api/jobs/filter?category=${encodeURIComponent(
            category.trim()
          )}&page=${page}&limit=${limit}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };

    fetchJobs();
  }, [page, category]);

  return (
  <div className="flex flex-col items-center px-4">
      
      <div className="w-full max-w-8xl mb-6 mx-auto">
        <h2 className="text-lg font-bold mb-2">Filtrar</h2>
        <div className="flex flex-wrap ">
          <FilterButton
            label="Todos"
            isActive={category === ""}
            onClick={() => {
              setCategory("");
              setPage(1);
            }}
          />

          {categories.map((cat) => (
            <FilterButton
              key={cat}
              label={cat}
              isActive={category === cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
            />
          ))}
        </div>
      </div>

     
      <div className="space-y-4 w-full max-w-3xl ">
        {jobs.length === 0 && <p>Nenhuma vaga encontrada.</p>}
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onToggleFavorite={() => {}}
            isFavorite={false}
          />
        ))}
      </div>

      {jobs.length > 0 && (
        <div className="mt-8 flex items-center">
          <button
            onClick={() => {
              setPage((p) => Math.max(p - 1, 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === 1}
            className="mr-2 px-4 py-2 bg-cyan-600 cursor-pointer font-semibold text-white rounded-3xl disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <span className="mx-2">
            Página {page} de {totalPages}
          </span>

          <button
            onClick={() => {
              setPage((p) => Math.min(p + 1, totalPages));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === totalPages}
            className="ml-2 px-4 py-2 bg-cyan-600 cursor-pointer font-semibold text-white rounded-3xl disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      )}
  </div>
);
}