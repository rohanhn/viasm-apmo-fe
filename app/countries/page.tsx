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
  console.log('countriesData', filteredCountries);
  // Stats data array
  const statsData = [
    {
      id: 1,
      label: 'Countries',
      value: meta.pagination.total,
    },
    {
      id: 2,
      label: 'First APMO',
      value: 1989,
    },
    // {
    //   id: 3,
    //   label: 'Status',
    //   value: 'Active',
    // },
  ];

  return (
    <div className="bg-[#F7F9FC]">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: 'url(/assets/images/apmo/03_country_map.png)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="sm:text-4xl text-3xl font-semibold">
            Participating Countries
          </h1>
          <p className="sm:mt-4 mt-2 text-md sm:text-lg max-w-2xl mx-auto">
            Explore all APMO participating nations.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto sm:px-6 sm:pb-5 px-4 pb-5 grid md:grid-cols-3 sm:gap-6 gap-4 sm:mt-10 mt-4">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="bg-white sm:p-6 p-4 rounded-xl shadow-sm border"
          >
            <p className="text-gray-500">{stat.label}</p>
            <h3 className="text-3xl font-semibold text-blue-600">
              {stat.value}
            </h3>
          </div>
        ))}
      </section>

      {/* Countries Table */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:pb-20 pb-10">
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
