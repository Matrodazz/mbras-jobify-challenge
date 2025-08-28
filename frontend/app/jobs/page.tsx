import JobList from "../components/JobList";

export default function JobsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl text-cyan-600 font-bold mb-4">Vagas disponíveis</h1>
      
      <div className="">
        <JobList/>
      </div>
    </main>
  );
}