export default function JobCard({ job }) {
  return (
    <div className=" bg-neutral-300 rounded-3xl">
      <h3>{job.title}</h3>
      <p>{job.company_name}</p>


      <button>
        ★ Favoritar
      </button>
    </div>
  );
}