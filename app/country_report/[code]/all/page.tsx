/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { serviceAPI } from '@/src/services/serviceAPI';
import type { CountryRanking, CountryRankingsResponse } from '@/src/types';

export default function CountryReportPage() {
  const params = useParams();
  const [rankings, setRankings] = useState<CountryRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryInfo, setCountryInfo] = useState<any>(null);

  const countryCode = (params.code as string).toUpperCase();
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
  useEffect(() => {
    const fetchCountryRankings = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Calling getCountryRankings API for:', countryCode);
        const response: CountryRankingsResponse =
          await serviceAPI.getCountryRankings(countryCode);
        console.log('Country rankings API response:', response);

        if (response?.data) {
          setRankings(response.data);
          setCountryInfo(response.data[0]?.country);
          console.log('Rankings loaded:', response.data.length);
        } else {
          setError('No data received from API');
        }
      } catch (err) {
        console.error('Error fetching country rankings:', err);
        setError('Failed to load country rankings');
      } finally {
        setLoading(false);
      }
    };

    if (countryCode) {
      fetchCountryRankings();
    }
  }, [countryCode]);

  if (loading) {
    return <CountryReportSkeleton countryCode={countryCode} />;
  }

  if (error) {
    return (
      <div className="bg-[#F7F9FC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Error Loading Country Data
          </h2>
          <p className="text-gray-600">{error}</p>
          <Link
            href="/countries"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Countries
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className={`${getFlagClass(countryCode)} text-2xl`} />
            <h1 className="sm:text-4xl text-3xl font-semibold">
              {countryInfo?.name}
            </h1>
          </div>
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

function CountryReportSkeleton({ countryCode }: { countryCode: string }) {
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
            Loading {countryCode} Results...
          </h1>
          <p className="sm:mt-4 mt-2 text-md sm:text-lg max-w-2xl mx-auto">
            Fetching APMO performance data
          </p>
        </div>
      </section>

      {/* Loading Content */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:py-12 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
