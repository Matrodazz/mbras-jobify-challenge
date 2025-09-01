"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import FilterButton from "./FilterButton";

const USER_ID = "6c366c78-badf-4c60-828a-db58f2467797";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [favoritesMap, setFavoritesMap] = useState({});
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const limit = 25;

  const categories = [
    "Favoritos",
    "Todos",
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
    "All others",
  ];

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

 
  useEffect(() => {
    const fetchJobsAndFavorites = async () => {
      setLoading(true);
      try {
        let jobsUrl = `http://localhost:4000/api/jobs?page=${page}&limit=${limit}`;

        if (debouncedQuery) {
          jobsUrl = `http://localhost:4000/api/jobs/search?query=${encodeURIComponent(
            debouncedQuery
          )}&page=${page}&limit=${limit}`;
        } else if (category && category !== "Favoritos" && category !== "Todos") {
          jobsUrl = `http://localhost:4000/api/jobs/filter?category=${encodeURIComponent(
            category.trim()
          )}&page=${page}&limit=${limit}`;
        }

        const jobsRes = await axios.get(jobsUrl);
        const jobsData = Array.isArray(jobsRes.data.jobs) ? jobsRes.data.jobs : [];
        setJobs(jobsData);
        setTotalPages(jobsRes.data.totalPages || 1);

        const favRes = await axios.get(
          `http://localhost:4000/api/favorites/user/${USER_ID}`
        );
        const map = {};
        if (Array.isArray(favRes.data)) {
          favRes.data.forEach((f) => (map[f.job_id] = true));
        }
        setFavoritesMap(map);
      } catch (err) {
        console.error("Erro ao buscar jobs ou favoritos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndFavorites();
  }, [page, category, debouncedQuery]);

  const displayedJobs =
    category === "Favoritos"
      ? jobs.filter((job) => favoritesMap[job.id])
      : jobs;

  const effectiveTotalPages =
    category === "Favoritos"
      ? Math.ceil(displayedJobs.length / limit) || 1
      : totalPages;

  const paginatedJobs =
    category === "Favoritos"
      ? displayedJobs.slice((page - 1) * limit, page * limit)
      : displayedJobs;

  return (
    <div className="flex flex-col items-center px-4">

      <div className="w-full max-w-3xl mb-4">
        <input
          type="text"
          placeholder="Buscar por título ou empresa..."
          className="w-full p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full max-w-8xl mb-6 mx-auto">
        <h2 className="text-lg font-bold mb-2">Filtrar</h2>
        <div className="flex flex-wrap">
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              label={cat}
              isActive={category === cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
                setSearchQuery(""); 
              }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4 w-full max-w-3xl">
        {loading ? (
          <div className="flex justify-center py-10 mb-100">
            <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin "></div>
          </div>
        ) : paginatedJobs.length === 0 ? (
          <p>Nenhuma vaga encontrada.</p>
        ) : (
          paginatedJobs.map((job) => (
            <JobCard key={job.id} job={job} favoritesMap={favoritesMap} />
          ))
        )}
      </div>

      {paginatedJobs.length > 0 && !loading && category !== "Favoritos" && (
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
            Página {page} de {effectiveTotalPages}
          </span>

          <button
            onClick={() => {
              setPage((p) => Math.min(p + 1, effectiveTotalPages));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === effectiveTotalPages}
            className="ml-2 px-4 py-2 bg-cyan-600 cursor-pointer font-semibold text-white rounded-3xl disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
