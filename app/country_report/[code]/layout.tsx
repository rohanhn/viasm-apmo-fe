import type { Metadata } from 'next';

interface CountryReportLayoutProps {
  children: React.ReactNode;
  params: {
    code: string;
  };
}

export async function generateMetadata({
  params,
}: CountryReportLayoutProps): Promise<Metadata> {
  const countryCode = params.code.toUpperCase();

  return {
    title: `${countryCode} Results - APMO Country Rankings`,
    description: `View detailed APMO performance results and rankings for ${countryCode} across all years.`,
    keywords: `APMO, ${countryCode}, mathematics olympiad, country rankings, results`,
  };
}

export default function CountryReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
