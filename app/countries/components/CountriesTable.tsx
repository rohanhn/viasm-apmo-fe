/* eslint-disable react/button-has-type */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import type { Country } from '@/src/types';

interface CountriesTableProps {
  countries: Country[];
  searchTerm: string;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  currentPage: number;
}

export default function CountriesTable({
  countries,
  searchTerm: initialSearchTerm,
  pagination,
  currentPage,
}: CountriesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);

  const handleSearch = (value: string) => {
    setLocalSearchTerm(value);
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    // Reset to page 1 when searching
    params.delete('page');

    router.push(`/countries?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/countries?${params.toString()}`);
  };

  // Filter countries based on local search term for immediate feedback
  const filteredCountries = localSearchTerm
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
          country.code.toLowerCase().includes(localSearchTerm.toLowerCase())
      )
    : countries;

  return (
    <>
      {/* Search */}
      <div className="mb-4 relative w-[300px]">
        <input
          placeholder="Search country..."
          value={localSearchTerm}
          onChange={(e) => {
            const { value } = e.target;
            setLocalSearchTerm(value);

            // Automatically call API when input is cleared
            if (value === '') {
              handleSearch('');
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(localSearchTerm);
            }
          }}
          className="px-3 py-2 pr-8 w-full text-sm border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />
        <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Code</th>
              <th className="p-4">Country</th>
              <th className="p-4">Status</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Results</th>
            </tr>
          </thead>

          <tbody>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <tr
                  key={country.documentId}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="p-4 font-medium">{country.code}</td>
                  <td className="p-4">{country.name}</td>
                  <td className="p-4">
                    <span
                      className={
                        country.active ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      {country.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4">
                    {country.contact ? (
                      <button className="text-blue-600 hover:underline">
                        Contact
                      </button>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  {localSearchTerm || initialSearchTerm
                    ? 'No countries found matching your search.'
                    : 'No countries available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!initialSearchTerm && pagination.pageCount > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-2 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 border rounded-md text-sm ${
                    page === currentPage
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-blue-50'
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pagination.pageCount}
            className="px-3 py-2 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Pagination Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {filteredCountries.length} of {pagination.total} countries
        {!initialSearchTerm &&
          ` (Page ${currentPage} of ${pagination.pageCount})`}
      </div>
    </>
  );
}
