/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */

'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import Pagination from '@/components/Pagination';
import { serviceAPI } from '@/src/services/serviceAPI';

interface TimelineData {
  id: number;
  num_countries: string;
  num_contestants: string;
  gold_cut: number;
  silver_cut: number;
  bronze_cut: number;
  SCC: string; // Senior Coordinating Country
  ACC: string; // Assistant Coordinating Country
  MC: string; // Member Countries
  year: {
    name: string;
  };
}

interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

function TimelineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [filteredData, setFilteredData] = useState<TimelineData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    pageSize: 25,
    pageCount: 1,
    total: 0,
  });

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';

  // Stats data array
  const statsData = [
    {
      id: 1,
      label: 'Total Records',
      value: pagination.total,
      className: 'sm:p-6 p-4',
    },
    {
      id: 2,
      label: 'First APMO',
      value: 1989,
      className: 'p-6',
    },
    {
      id: 3,
      label: 'Latest Year',
      value:
        timelineData.length > 0
          ? Math.max(...timelineData.map((d) => parseInt(d.year.name)))
          : 2026,
      className: 'p-6',
    },
  ];

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const fetchTimelines = async () => {
      try {
        setLoading(true);
        const response = await serviceAPI.getTimelines(currentPage, 25);
        const data = response.data || [];
        setTimelineData(data);
        setPagination(
          response.meta?.pagination || {
            page: 1,
            pageSize: 25,
            pageCount: 1,
            total: 0,
          }
        );
        setError(null);
      } catch (err) {
        setError('Failed to load timeline data');
      } finally {
        setLoading(false);
      }
    };

    fetchTimelines();
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = timelineData.filter((item) =>
        item.year.name.includes(searchTerm)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(timelineData);
    }
  }, [searchTerm, timelineData]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    // Reset to page 1 when searching
    params.delete('page');

    router.push(`/timeline?${params.toString()}`);
  };

  return (
    <div className="bg-[#F7F9FC]">
      {/* Banner with Image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: 'url(/assets/images/apmo/03_country_map.png)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="sm:text-4xl text-3xl font-semibold">Timeline APMO</h1>
          <p className="sm:mt-4 mt-2 text-md sm:text-lg max-w-2xl mx-auto">
            Yearly participation and awards data for the Asian Pacific
            Mathematics Olympiad.
          </p>
        </div>
      </section>

      {/* Notification Banner */}
      <section className="max-w-6xl mx-auto sm:px-6 sm:pt-8 px-4 pt-4">
        <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-center gap-3 text-blue-800">
            <span className="font-medium">
              The results for APMO 2025 are now official!
            </span>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="max-w-6xl mx-auto sm:px-6 sm:pt-8 px-4 pt-4 grid md:grid-cols-3 sm:gap-6 gap-4 mb-4">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className={`bg-white ${stat.className} rounded-xl shadow-sm border`}
          >
            <p className="text-gray-500">{stat.label}</p>
            <h3 className="text-3xl font-semibold text-blue-600">
              {stat.value}
            </h3>
          </div>
        ))}
      </section>

      {/* Timeline Table */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:pb-20 pb-10">
        {/* Search */}
        <div className="mb-4 relative w-[300px]">
          <input
            placeholder="Search by year..."
            value={searchTerm}
            onChange={(e) => {
              const { value } = e.target;
              setSearchTerm(value);

              // Automatically call API when input is cleared
              if (value === '') {
                handleSearch('');
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchTerm);
              }
            }}
            className="px-3 py-2 pr-8 w-full text-sm border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
          <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {loading ? (
            <div className="p-8">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-blue-50 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4">Year</th>
                    <th className="p-4">Num. Countries</th>
                    <th className="p-4">Num. Contestants</th>
                    <th className="p-4">Gold cut</th>
                    <th className="p-4">Silver cut</th>
                    <th className="p-4">Bronze cut</th>
                    <th className="p-4">SCC *</th>
                    <th className="p-4">ACC *</th>
                    <th className="p-4">MC *</th>
                    <th className="p-4">Results</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="p-8 text-center text-gray-500"
                      >
                        {searchTerm
                          ? 'No timeline data found matching your search.'
                          : 'No timeline data found'}
                      </td>
                    </tr>
                  ) : (
                    filteredData
                      .sort(
                        (a, b) => parseInt(b.year.name) - parseInt(a.year.name)
                      )
                      .map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-semibold text-blue-600">
                            {item.year.name}
                          </td>
                          <td className="p-4">{item.num_countries}</td>
                          <td className="p-4">{item.num_contestants}</td>
                          <td className="p-4">{item.gold_cut}</td>
                          <td className="p-4">{item.silver_cut}</td>
                          <td className="p-4">{item.bronze_cut}</td>
                          <td className="p-4">{item.SCC}</td>
                          <td className="p-4">{item.ACC}</td>
                          <td className="p-4">{item.MC}</td>
                          <td className="p-4">
                            <Link
                              href={`/year_report/${item.year.name}`}
                              className="text-blue-600 hover:text-blue-800 text-sm hover:underline"
                            >
                              View Results
                            </Link>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.pageCount}
          totalItems={pagination.total}
          itemsPerPage={pagination.pageSize}
          loading={loading}
          searchQuery={searchQuery}
          basePath="/timeline"
          itemName="timeline records"
        />

        {/* Legend */}
        <div className="mt-4 text-sm text-gray-600">
          <p>
            * SCC: Senior Coordinating Country, ACC: Assistant Coordinating
            Country, MC: Member Countries
          </p>
        </div>
      </section>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <TimelineContent />
    </Suspense>
  );
}
