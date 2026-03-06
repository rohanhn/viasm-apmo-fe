import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'APMO Countries - Participating Nations',
  description:
    'Explore all participating countries in the Asian Pacific Mathematics Olympiad (APMO). View country details, contacts, and results.',
  keywords:
    'APMO, countries, mathematics olympiad, Asia Pacific, participating nations',
};

export default function CountriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
