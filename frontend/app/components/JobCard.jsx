import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <div className="relative bg-neutral-300 rounded-3xl flex flex-row p-3 w-3xl">
      <button className="absolute top-3 right-3 bg-white font-semibold px-3 py-2 rounded-3xl">
        ★ Favoritar
      </button>

      <img
        className="rounded-3xl bg-white mr-6 w-28 h-28"
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