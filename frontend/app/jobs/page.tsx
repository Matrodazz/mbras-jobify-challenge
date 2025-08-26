import JobList from "../components/JobList";

export default function JobsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Vagas disponíveis</h1>
      <div>
        <p>Filtrar</p>
      </div>
      
      <JobList/>
    </main>
  );
}