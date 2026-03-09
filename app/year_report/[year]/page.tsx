'use client';

/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import 'flag-icons/css/flag-icons.min.css';

import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import { serviceAPI } from '@/src/services/serviceAPI';

// Types for the API response
interface Country {
  id: number;
  documentId: string;
  name: string;
  code: string;
  active: boolean;
  contact: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

interface Year {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

interface CountryRanking {
  id: number;
  documentId: string;
  rank: number;
  contestants_num: number;
  total_score: number;
  gold_cut: number;
  silver_cut: number;
  bronze_cut: number;
  honorable_mentions: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  year: Year;
  country: Country;
  localizations: any[];
}

interface GeneralInfo {
  id: number;
  documentId: string;
  participating_countries: number;
  participating_students: number;
  mean_score: number;
  standard_deviation: number;
  gold_cut_off: number;
  silver_cut_off: number;
  bronze_cut_off: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  year: Year;
  localizations: any[];
}

// interface ApiResponse {
//   data: CountryRanking[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// interface GeneralInfoResponse {
//   data: GeneralInfo[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

interface PageProps {
  params: {
    year: string;
  };
}

// Function to get flag CSS class for country
const getFlagClass = (countryCode: string): string => {
  const countryCodeMap: Record<string, string> = {
    ARG: 'ar',
    AUS: 'au',
    AZE: 'az',
    BGD: 'bd',
    BOL: 'bo',
    BRA: 'br',
    BGR: 'bg',
    KHM: 'kh',
    CAN: 'ca',
    CHL: 'cl',
    COL: 'co',
    CRI: 'cr',
    CIV: 'ci',
    ECU: 'ec',
    SLV: 'sv',
    GTM: 'gt',
    HKG: 'hk',
    IND: 'in',
    IDN: 'id',
    IRN: 'ir',
    JPN: 'jp',
    KAZ: 'kz',
    KGZ: 'kg',
    MAC: 'mo',
    MKD: 'mk',
    MYS: 'my',
    MEX: 'mx',
    MAR: 'ma',
    NZL: 'nz',
    NIC: 'ni',
    PAK: 'pk',
    PAN: 'pa',
    PER: 'pe',
    PHL: 'ph',
    QAT: 'qa',
    KOR: 'kr',
    RUS: 'ru',
    RWA: 'rw',
    SAU: 'sa',
    SGP: 'sg',
    LKA: 'lk',
    SYR: 'sy',
    TWN: 'tw',
    TJK: 'tj',
    THA: 'th',
    TTO: 'tt',
    TKM: 'tm',
    ARE: 'ae',
    USA: 'us',
    URY: 'uy',
    UZB: 'uz',
    UKR: 'ua',
    SV: 'sv',
    EC: 'ec',
    CO: 'co',
    MONGOL: 'mn',
    GT: 'gt',
  };
  const twoLetterCode = countryCodeMap[countryCode];
  return twoLetterCode ? `fi fi-${twoLetterCode}` : 'fi fi-xx';
};

export default function YearReportPage({ params }: PageProps) {
  const { year } = params;

  const [rankings, setRankings] = useState<CountryRanking[]>([]);
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: Get initial count for country rankings
        const [rankingsInitial, generalInfoResponse] = await Promise.all([
          serviceAPI.getCountryRankingsByYear(year),
          serviceAPI.getGeneralInfoByYear(year),
        ]);

        console.log('Initial rankings response:', rankingsInitial);

        const rankingsTotal = rankingsInitial?.meta?.pagination?.total || 0;
        console.log('Rankings total:', rankingsTotal);

        // Step 2: Fetch all country rankings data using total count as pageSize
        const rankingsResponse =
          rankingsTotal > 0
            ? await serviceAPI.getCountryRankingsByYear(year, rankingsTotal)
            : rankingsInitial;

        console.log('Final rankings response:', rankingsResponse);

        setRankings(rankingsResponse?.data || []);
        setGeneralInfo(generalInfoResponse?.data?.[0] || null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  // Sort rankings by rank
  const sortedRankings = rankings.sort((a, b) => a.rank - b.rank);

  // Calculate totals for display
  // const totalCountries = sortedRankings.length;
  // const totalContestants = sortedRankings.reduce(
  //   (sum, r) => sum + r.contestants_num,
  //   0
  // );
  // const totalGold = sortedRankings.reduce((sum, r) => sum + r.gold_cut, 0);
  // const totalSilver = sortedRankings.reduce((sum, r) => sum + r.silver_cut, 0);
  // const totalBronze = sortedRankings.reduce((sum, r) => sum + r.bronze_cut, 0);
  // const totalHonorableMentions = sortedRankings.reduce(
  //   (sum, r) => sum + r.honorable_mentions,
  //   0
  // );

  if (loading) {
    return (
      <div className="bg-[#F7F9FC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading APMO {year} results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F7F9FC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NextSeo
        title={`APMO ${year} - Country Rankings`}
        description={`View country rankings and results for APMO ${year}. See how each participating country performed.`}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `APMO, ${year}, country rankings, mathematics olympiad, results`,
          },
        ]}
      />
      <div className="bg-[#F7F9FC]">
        {/* Hero Banner */}
        <section
          className="relative bg-cover bg-center bg-no-repeat py-16"
          style={{
            backgroundImage: 'url(/assets/images/apmo/03_country_map.png)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
            <h1 className="sm:text-4xl text-3xl font-semibold">
              APMO {year} Results
            </h1>
            <p className="sm:mt-4 mt-2 text-md sm:text-lg max-w-2xl mx-auto">
              Country rankings and performance statistics
            </p>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <section className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/timeline"
              className="hover:text-primary-500 transition-colors"
            >
              Timeline
            </Link>
            <span>›</span>
            <span className="text-gray-800 font-medium">{year} Results</span>
          </nav>
        </section>

        {/* Summary Stats */}
        {generalInfo && (
          <section className="max-w-6xl mx-auto px-6 py-4">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                General Information
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center items-center">
                <div className="p-3">
                  <p className="text-gray-500 text-sm">
                    Participating Countries
                  </p>
                  <h3 className="text-xl font-semibold text-primary-500">
                    {generalInfo.participating_countries}
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-gray-500 text-sm">
                    Participating Students
                  </p>
                  <h3 className="text-xl font-semibold text-primary-500">
                    {generalInfo.participating_students}
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-gray-500 text-sm">Mean Score</p>
                  <h3 className="text-xl font-semibold text-blue-600">
                    μ = {generalInfo.mean_score}
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-gray-500 text-sm">Standard Deviation</p>
                  <h3 className="text-xl font-semibold text-blue-600">
                    σ = {generalInfo.standard_deviation}
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-gray-500 text-sm">Gold Cut-off</p>
                  <h3 className="text-xl font-semibold text-yellow-600">
                    {generalInfo.gold_cut_off}
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-gray-500 text-sm">Silver Cut-off</p>
                  <h3 className="text-xl font-semibold text-gray-600">
                    {generalInfo.silver_cut_off}
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-gray-500 text-sm">Bronze Cut-off</p>
                  <h3 className="text-xl font-semibold text-orange-600">
                    {generalInfo.bronze_cut_off}
                  </h3>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Country Rankings
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Click on a country name to see detailed results
              </p>
            </div>

            {/* Table */}
            {sortedRankings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-blue-50 text-gray-600 text-sm">
                    <tr>
                      <th className="p-4">Rank</th>
                      <th className="p-4">Country</th>
                      <th className="p-4"># of Contestants</th>
                      <th className="p-4">Total Score</th>
                      <th className="p-4">Gold Awards</th>
                      <th className="p-4">Silver Awards</th>
                      <th className="p-4">Bronze Awards</th>
                      <th className="p-4">
                        Honorable <br />
                        Mentions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700">
                    {sortedRankings.map((ranking) => (
                      <tr
                        key={ranking.id}
                        className="border-b hover:bg-gray-50"
                      >
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
                        <td className="p-4">
                          <Link
                            href={`/country_report/${ranking.country.code}/${year}`}
                            className="flex items-center gap-3 text-blue-600 hover:text-blue-800  transition-colors"
                          >
                            <span
                              className={`${getFlagClass(
                                ranking.country.code
                              )} text-lg`}
                            />
                            <span className="font-medium">
                              {ranking.country.name}
                            </span>
                          </Link>
                        </td>
                        <td className="p-4">{ranking.contestants_num}</td>
                        <td className="p-4 font-medium">
                          {ranking.total_score}
                        </td>
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
            ) : (
              <div className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Rankings Found
                </h3>
                <p className="text-gray-600">
                  No country ranking data available for {year}.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
