/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { serviceAPI } from '@/src/services/serviceAPI';
import type { CountryResponse } from '@/src/types';

import CountriesTable from './components/CountriesTable';

export const metadata: Metadata = {
  title: 'APMO Countries - Participating Nations',
  description:
    'Explore all participating countries in the Asian Pacific Mathematics Olympiad (APMO). View country details, contacts, and results.',
  keywords:
    'APMO, countries, mathematics olympiad, Asia Pacific, participating nations',
};

interface SearchParams {
  page?: string;
  search?: string;
}

interface CountriesPageProps {
  searchParams: SearchParams;
}

async function getCountriesData(page: number = 1): Promise<CountryResponse> {
  try {
    const response: CountryResponse = await serviceAPI.getCountries(page, 25);
    return response;
  } catch (error) {
    console.error('Error fetching countries:', error);
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

export default async function CountriesPage({
  searchParams,
}: CountriesPageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const searchTerm = searchParams.search || '';

  const countriesData = await getCountriesData(currentPage);
  const { data: countries, meta } = countriesData;

  // Filter countries based on search term (server-side filtering)
  const filteredCountries = searchTerm
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : countries;
  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-semibold text-gray-800">
            Participating Countries
          </h1>

          <p className="text-gray-500 mt-4">
            Explore all APMO participating nations.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 pb-5 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500">Countries</p>
          <h3 className="text-3xl font-semibold text-blue-600">
            {meta.pagination.total}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500">First APMO</p>
          <h3 className="text-3xl font-semibold text-blue-600">1989</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500">Status</p>
          <h3 className="text-3xl font-semibold text-blue-600">Active</h3>
        </div>
      </section>

      {/* Countries Table */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <Suspense fallback={<CountriesTableSkeleton />}>
          <CountriesTable
            countries={filteredCountries}
            searchTerm={searchTerm}
            pagination={meta.pagination}
            currentPage={currentPage}
          />
        </Suspense>
      </section>
    </div>
  );
}

function CountriesTableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
