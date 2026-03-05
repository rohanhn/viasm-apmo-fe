/* eslint-disable react/button-has-type */

'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import Pagination from '@/components/Pagination';
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
                    <Link 
                      href={`/country_report/${country.code}/all`}
                      className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                    >
                      View
                    </Link>
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
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.pageCount}
        totalItems={pagination.total}
        itemsPerPage={pagination.pageSize}
        searchQuery={initialSearchTerm}
        basePath="/countries"
        itemName="countries"
      />
    </>
  );
}
