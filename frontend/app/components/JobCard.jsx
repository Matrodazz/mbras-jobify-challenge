import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

// Componente que exibe uma vaga individual
// Props:
// - job: objeto contendo as informações da vaga
// - favoritesMap: objeto com o status de favoritos { [jobId]: true/false }

export default function JobCard({ job, favoritesMap }) {
  return (
    <div className="relative bg-neutral-300 rounded-3xl flex flex-row p-3 w-sm md:w-3xl">
      <FavoriteButton
        jobId={job.id}
        initialIsFavorite={favoritesMap[job.id] || false}
      />

      <img
        className="rounded-3xl bg-white mr-2 md:mr-6 w-12 h-12 md:w-28 md:h-28"
        src={job.company_logo}
      />

      <div className="flex flex-col">
        <p className="text-lg font-bold text-cyan-600">{job.title}</p>
        <p className="text-m font-semibold">{job.company_name}</p>
        <p>{job.category}</p>
        <p className="font-semibold mb-3 text-green-800">{job.salary}</p>
        
        <Link href={`/jobs/${job.id}`} className="text-white text-center font-semibold bg-cyan-600 rounded-3xl w-30 px-3 py-2">
          Ver detalhes
        </Link>

      </div>
    </div>
  );
}