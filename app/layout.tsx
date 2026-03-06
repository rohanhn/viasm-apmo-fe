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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
          crossOrigin="anonymous"
        />
      </head>
      <body className="">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
