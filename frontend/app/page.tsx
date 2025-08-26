import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center ">
        <h1 className="text-cyan-600 text-center font-bold text-6xl">JOBIFY</h1>
        <h2 className="text-xl font-semibold">Sua nova oportunidade está aqui!</h2>
        
        <div className="items-center flex space-x-4">
          <a href="/jobs" className="text-white font-semibold bg-cyan-600 rounded-3xl p-3">Ver vagas disponíveis</a>
          <a href="/favorites" className="text-white font-semibold bg-amber-600 rounded-3xl p-3">Favoritos</a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="">Jobify - 2025</p>
      </footer>
    </div>
  );
}
