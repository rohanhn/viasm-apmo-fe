/* eslint-disable import/no-extraneous-dependencies */
import 'flag-icons/css/flag-icons.min.css';

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getCountryByCode } from '@/src/utils/countriesUtils';

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

interface Student {
  id: number;
  documentId: string;
  rank: number;
  last_name: string;
  first_name: string;
  P1: number;
  P2: number;
  P3: number;
  P4: number;
  P5: number;
  total: number;
  award: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  country: Country;
  year: Year;
  localizations: any[];
}

interface ApiResponse {
  data: Student[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface PageProps {
  params: {
    code: string;
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
  };
  const twoLetterCode = countryCodeMap[countryCode];
  return twoLetterCode ? `fi fi-${twoLetterCode}` : 'fi fi-xx';
};

// Function to get award badge color
const getAwardBadgeColor = (award: string): string => {
  switch (award.toLowerCase()) {
    case 'gold':
      return 'bg-yellow-400 text-yellow-900';
    case 'silver':
      return 'bg-gray-300 text-gray-800';
    case 'bronze':
      return 'bg-orange-400 text-orange-900';
    case 'honorable mention':
    case 'honourable mention':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Fetch students data from API
async function fetchStudents(
  countryCode: string,
  year: string
): Promise<Student[]> {
  // Build filter query
  const filters = [
    `filters[country][code][$eq]=${countryCode}`,
    `filters[country][slug][$eq]=${countryCode}`,
    `filters[year][name][$eq]=${year}`,
    `filters[year][slug][$eq]=${year}`,
  ];
  const baseUrl = process.env.NEXT_API_URL;
  // Lần 1: lấy meta.pagination.total
  const url1 = `${baseUrl}/api/students?populate=*&${filters.join('&')}`;
  console.log('url1:', url1);
  const res1 = await fetch(url1, { cache: 'no-store' });
  if (!res1.ok) throw new Error(`API request failed: ${res1.status}`);
  const data1: ApiResponse = await res1.json();
  const total = data1.meta?.pagination?.total || 0;

  // Lần 2: lấy toàn bộ dữ liệu nếu total > 0
  if (total > 0) {
    const url2 = `${baseUrl}/api/students?populate=*&${filters.join(
      '&'
    )}&pagination[page]=1&pagination[pageSize]=${total}`;
    console.log('url2:', url2);
    const res2 = await fetch(url2, { cache: 'no-store' });
    if (!res2.ok) throw new Error(`API request failed: ${res2.status}`);
    const data2: ApiResponse = await res2.json();
    return data2.data || [];
  }
  return data1.data || [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const country = getCountryByCode(params.code);
  const countryName = country?.name || params.code;

  return {
    title: `${countryName} - APMO ${params.year} Results`,
    description: `View ${countryName}'s student results and rankings for APMO ${params.year}`,
    keywords: `APMO, ${countryName}, ${params.year}, results, mathematics olympiad, student results`,
  };
}

export default async function CountryYearResultsPage({ params }: PageProps) {
  const { code, year } = params;

  // Get country information
  const country = getCountryByCode(code);

  if (!country) {
    notFound();
  }

  // Fetch student data
  const students = await fetchStudents(code, year);

  // Sort students by rank
  const sortedStudents = students.sort((a, b) => a.rank - b.rank);

  return (
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className={`${getFlagClass(country.code)} text-2xl`} />
            <h1 className="sm:text-4xl text-3xl font-semibold">
              {country.name}
            </h1>
          </div>
          <p className="sm:mt-2 mt-1 text-md sm:text-lg">APMO {year} Results</p>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link
            href="/results"
            className="hover:text-primary-500 transition-colors"
          >
            Results
          </Link>
          <span>›</span>
          <Link
            href={`/country_report/${code}/all`}
            className="hover:text-primary-500 transition-colors"
          >
            {country.name}
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{year}</span>
        </nav>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Student Results - {year}
                </h2>
                <p className="text-gray-600 mt-1">
                  {sortedStudents.length} student
                  {sortedStudents.length !== 1 ? 's' : ''} participated
                </p>
              </div>
              <Link
                href={`/country_report/${code}/all`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                ← Back to All Years
              </Link>
            </div>
          </div>

          {/* Table */}
          {sortedStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-blue-50 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Last Name</th>
                    <th className="p-4">First Name</th>
                    <th className="p-4">P1</th>
                    <th className="p-4">P2</th>
                    <th className="p-4">P3</th>
                    <th className="p-4">P4</th>
                    <th className="p-4">P5</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Award</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-t hover:bg-blue-50 transition"
                    >
                      <td className="p-4 font-medium">{student.rank}</td>
                      <td className="p-4">{student.last_name}</td>
                      <td className="p-4">{student.first_name}</td>
                      <td className="p-4">{student.P1}</td>
                      <td className="p-4">{student.P2}</td>
                      <td className="p-4">{student.P3}</td>
                      <td className="p-4">{student.P4}</td>
                      <td className="p-4">{student.P5}</td>
                      <td className="p-4 font-medium">{student.total}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getAwardBadgeColor(
                            student.award
                          )}`}
                        >
                          {student.award}
                        </span>
                      </td>
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
                No Results Found
              </h3>
              <p className="text-gray-600">
                No student results available for {country.name} in {year}.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
