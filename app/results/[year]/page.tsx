/* eslint-disable no-restricted-globals */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface YearResultsPageProps {
  params: {
    year: string;
  };
}

export async function generateMetadata({
  params,
}: YearResultsPageProps): Promise<Metadata> {
  const { year } = params;

  return {
    title: `APMO ${year} Results - Rankings and Awards`,
    description: `View detailed APMO ${year} results, country rankings, and award distributions.`,
    keywords: `APMO, ${year}, results, rankings, awards, mathematics olympiad`,
  };
}

export default function YearResultsPage({ params }: YearResultsPageProps) {
  const year = parseInt(params.year, 10);

  // Validate year range
  if (isNaN(year) || year < 1989 || year > 2025) {
    notFound();
  }

  // Determine result type based on year
  let resultType = 'Full Report';
  let bgColor = 'bg-green-600';

  if (year >= 2003 && year <= 2015) {
    resultType = 'Country Rankings & Awards Only';
    bgColor = 'bg-blue-600';
  } else if (year >= 2000 && year <= 2009) {
    resultType = 'Awards Only';
    bgColor = 'bg-gray-500';
  }

  return (
    <div className="bg-[#F7F9FC]">
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: 'url(/assets/images/apmo/03_country_map.png)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <div className="mb-4">
            <Link
              href="/results"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Results
            </Link>
          </div>
          <h1 className="sm:text-4xl text-3xl font-semibold">
            APMO {year} Results
          </h1>
          <p className="sm:mt-4 mt-2 text-md sm:text-lg max-w-2xl mx-auto">
            {resultType}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:py-12 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="mb-8">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-white font-medium ${bgColor} mb-4`}
            >
              {resultType}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              APMO {year}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This page will contain the detailed results, rankings, and awards
              for APMO {year}. The data structure and display format will be
              implemented based on the available information for this year.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Country Rankings
              </h3>
              <p className="text-gray-600 text-sm">
                Complete ranking of all participating countries
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Award Distribution
              </h3>
              <p className="text-gray-600 text-sm">
                Gold, Silver, Bronze medals and Honorable Mentions
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Statistics</h3>
              <p className="text-gray-600 text-sm">
                Participation statistics and performance metrics
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              This results page is currently under development. The specific
              data format and display will be implemented once the API structure
              and available data for {year} is confirmed.
            </p>

            <div className="flex justify-center space-x-4">
              <Link
                href="/results"
                className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to All Results
              </Link>

              <Link
                href="/timeline"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Timeline Data
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
