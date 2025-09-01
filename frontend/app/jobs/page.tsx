import JobList from "../components/JobList";

export default function JobsPage() {
  return (
    <main className=" md:p-8">
      <h1 className="text-2xl mt-2 md:text-3xl text-cyan-600 font-bold mb-4 ml-2">Vagas disponíveis</h1>
      
      <div>
        <JobList/>
      </div>
    </main>
  );
}