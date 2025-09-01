import './globals.css';

export const metadata = {
  title: 'Jobify',
  description: 'App de listagem de vagas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-white">
        <header className='bg-cyan-600'>
          <a className='font-bold inline-block text-white text-xl py-4 ml-10' href='/jobs'>JOBIFY</a>
        </header>
        <div>{children}</div>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="">Jobify - 2025</p>
      </footer>
      </body>
    </html>
  );
}