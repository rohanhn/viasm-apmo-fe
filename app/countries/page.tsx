/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { serviceAPI } from '@/src/services/serviceAPI';
import type { Country, CountryResponse } from '@/src/types';

import CountriesTable from './components/CountriesTable';

export default function CountriesPage() {
  return (
    <Suspense fallback={<CountriesPageSkeleton />}>
      <CountriesContent />
    </Suspense>
  );
}

function CountriesContent() {
  const searchParams = useSearchParams();
  const [countries, setCountries] = useState<Country[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 25,
    pageCount: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Calling getCountries API with page:', currentPage);
        const response: CountryResponse = await serviceAPI.getCountries(
          currentPage,
          25
        );
        console.log('Countries API response:', response);

        if (response?.data) {
          setCountries(response.data);
          setPagination(response.meta.pagination);
          console.log('Countries loaded:', response.data.length);
        } else {
          setError('No data received from API');
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [currentPage]);

  // Filter countries based on search term (client-side filtering)
  const filteredCountries = searchTerm
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : countries;
  // Stats data array
  const statsData = [
    {
      id: 1,
      label: 'Countries',
      value: loading ? '...' : pagination.total,
    },
    {
      id: 2,
      label: 'First APMO',
      value: 1989,
    },
  ];

  if (error) {
    return (
      <div className="bg-[#F7F9FC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Error Loading Countries
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

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
        {loading ? (
          <CountriesTableSkeleton />
        ) : (
          <CountriesTable
            countries={filteredCountries}
            searchTerm={searchTerm}
            pagination={pagination}
            currentPage={currentPage}
          />
        )}
      </section>
    </div>
  );
}

function CountriesPageSkeleton() {
  return (
    <div className="bg-[#F7F9FC] min-h-screen">
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

      {/* Stats Loading */}
      <section className="max-w-6xl mx-auto sm:px-6 sm:pb-5 px-4 pb-5 grid md:grid-cols-3 sm:gap-6 gap-4 sm:mt-10 mt-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white sm:p-6 p-4 rounded-xl shadow-sm border"
          >
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-12" />
            </div>
          </div>
        ))}
      </section>

      {/* Table Loading */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:pb-20 pb-10">
        <CountriesTableSkeleton />
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
