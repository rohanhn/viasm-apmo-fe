/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import type { Metadata } from 'next';
import Link from 'next/link';

import { serviceAPI } from '@/src/services/serviceAPI';
import type { CountryRanking, CountryRankingsResponse } from '@/src/types';

interface CountryReportPageProps {
  params: {
    code: string;
  };
}

async function getCountryRankingsData(
  countryCode: string
): Promise<CountryRankingsResponse> {
  try {
    const response: CountryRankingsResponse =
      await serviceAPI.getCountryRankings(countryCode);
    return response;
  } catch (error) {
    console.error('Error fetching country rankings:', error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 0,
        },
      },
    };
  }
}

export async function generateMetadata({
  params,
}: CountryReportPageProps): Promise<Metadata> {
  const countryCode = params.code.toUpperCase();

  return {
    title: `${countryCode} Results - APMO Country Rankings`,
    description: `View detailed APMO performance results and rankings for ${countryCode} across all years.`,
    keywords: `APMO, ${countryCode}, mathematics olympiad, country rankings, results`,
  };
}

export default async function CountryReportPage({
  params,
}: CountryReportPageProps) {
  const countryCode = params.code.toUpperCase();

  // Fetch country rankings data
  const rankingsResponse = await getCountryRankingsData(countryCode);
  const { data: rankings } = rankingsResponse;

  // If no data found, show 404
  //   if (!rankings || rankings.length === 0) {
  //     notFound();
  //   }

  // Get country info from first ranking entry
  const countryInfo = rankings[0]?.country;

  return (
    <div className="bg-[#F7F9FC]">
      {/* Hero Section */}
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
              href="/countries"
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
              Back to Countries
            </Link>
          </div>
          <h1 className="sm:text-4xl text-3xl font-semibold">
            {countryInfo?.name} ({countryCode})
          </h1>
          <p className="sm:mt-4 mt-2 text-md sm:text-lg max-w-2xl mx-auto">
            APMO Performance Results and Rankings
          </p>
        </div>
      </section>

      {/* Stats Section */}
      {rankings && rankings.length > 0 && (
        <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:pt-8 pt-4">
          <div className="grid md:grid-cols-4 sm:gap-6 gap-4">
            <div className="bg-white sm:p-6 p-4 rounded-xl shadow-sm border">
              <p className="text-gray-500">Total Years</p>
              <h3 className="text-3xl font-semibold text-blue-600">
                {rankings.length}
              </h3>
            </div>

            <div className="bg-white sm:p-6 p-4 rounded-xl shadow-sm border">
              <p className="text-gray-500">Best Rank</p>
              <h3 className="text-3xl font-semibold text-blue-600">
                #{Math.min(...rankings.map((r) => r.rank))}
              </h3>
            </div>

            <div className="bg-white sm:p-6 p-4 rounded-xl shadow-sm border">
              <p className="text-gray-500">Total Gold</p>
              <h3 className="text-3xl font-semibold text-blue-600">
                {rankings.reduce((sum, r) => sum + r.gold_cut, 0)}
              </h3>
            </div>

            <div className="bg-white sm:p-6 p-4 rounded-xl shadow-sm border">
              <p className="text-gray-500">Status</p>
              <h3 className="text-3xl font-semibold text-blue-600">
                {countryInfo?.active ? 'Active' : 'Inactive'}
              </h3>
            </div>
          </div>
        </section>
      )}

      {/* Rankings Table */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:py-8 py-4 sm:pb-20 pb-10">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Historical Performance
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Complete APMO results for {countryInfo?.name}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-blue-50 text-gray-600 text-sm">
                <tr>
                  <th className="p-4">Year</th>
                  <th className="p-4">Rank</th>
                  <th className="p-4"># of Contestants</th>
                  <th className="p-4">Total Score</th>
                  <th className="p-4">Gold Awards</th>
                  <th className="p-4">Silver Awards</th>
                  <th className="p-4">Bronze Awards</th>
                  <th className="p-4">Honorable Mentions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {rankings.map((ranking: CountryRanking, index: number) => (
                  <tr
                    key={ranking.documentId || index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold">
                      <Link
                        href={`/country_report/${countryCode}/${ranking.year.name}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {ranking.year.name}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ranking.rank <= 3
                            ? 'bg-yellow-100 text-yellow-800'
                            : ranking.rank <= 10
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        #{ranking.rank}
                      </span>
                    </td>
                    <td className="p-4">{ranking.contestants_num}</td>
                    <td className="p-4 font-medium">{ranking.total_score}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        🥇 {ranking.gold_cut}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        🥈 {ranking.silver_cut}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        🥉 {ranking.bronze_cut}
                      </span>
                    </td>
                    <td className="p-4">{ranking.honorable_mentions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {rankings.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No historical data available for this country.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
