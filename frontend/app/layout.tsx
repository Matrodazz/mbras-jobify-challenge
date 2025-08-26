import './globals.css';

export const metadata = {
  title: 'Jobify',
  description: 'App de listagem de vagas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4 flex gap-4">
          <a href="/jobs" className="hover:text-teal-400">Vagas</a>
          <a href="/favorites" className="hover:text-teal-400">Favoritos</a>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}