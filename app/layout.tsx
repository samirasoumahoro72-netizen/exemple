import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Lab - Plateforme E-Commerce de Cours et Formations en Ligne',
  description: 'E-Lab est une plateforme d\'apprentissage moderne pour les éducateurs et professionnels. Plus de 50+ cours certifiants en Design, Technologie, Marketing et Data.',
  openGraph: {
    title: 'E-Lab - Platform de Formation & Cours en Ligne',
    description: 'Accédez à des formations de haute qualité avec formateurs certifiés.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
