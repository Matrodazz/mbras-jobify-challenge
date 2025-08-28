import './globals.css';

export const metadata = {
  title: 'Jobify',
  description: 'App de listagem de vagas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-white">
        
        <div>{children}</div>
      </body>
    </html>
  );
}