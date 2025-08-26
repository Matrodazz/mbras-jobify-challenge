"use client"
import { useEffect, useState } from "react";
import JobCard from "./JobCard";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {jobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          onToggleFavorite={() => {}}
          isFavorite={false}
        />
      ))}
    </div>
  );
}