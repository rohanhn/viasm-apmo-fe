import './globals.css';

import type { Metadata, Viewport } from 'next';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { getAppMetadata, manifestConfig } from '@/src/utils/favicon';

export const metadata: Metadata = getAppMetadata();

export const viewport: Viewport = {
  themeColor: manifestConfig.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
