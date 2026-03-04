import './globals.css';

import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'APMO - Asian Pacific Mathematics Olympiad',
  description:
    'Official website of the Asian Pacific Mathematics Olympiad - promoting excellence in mathematics across the Asia-Pacific region since 1989.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
