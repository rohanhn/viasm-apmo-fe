/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable react/button-has-type */

'use client';

import { useEffect, useState } from 'react';

import { serviceAPI } from '@/src/services/serviceAPI';

interface ProblemData {
  id: number;
  year: {
    name: string;
  };
  file: Array<{
    url: string;
    name: string;
  }>;
}

export default function ProblemsPage() {
  // Generate years from 1989 to 2025 (APMO started in 1989)
  const defaultYears = Array.from(
    { length: 2025 - 1989 + 1 },
    (_, i) => 2025 - i
  ); // [2025, 2024, ..., 1989]

  const [problemStatements, setProblemStatements] = useState<ProblemData[]>([]);
  const [problemSolutions, setProblemSolutions] = useState<ProblemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);

        // First, get the total count for both endpoints
        const [statementsInitial, solutionsInitial] = await Promise.all([
          serviceAPI.getProblemStatements(),
          serviceAPI.getProblemSolutions(),
        ]);

        console.log('Initial statements response:', statementsInitial);
        console.log('Initial solutions response:', solutionsInitial);

        const statementsTotal = statementsInitial?.meta?.pagination?.total || 0;
        const solutionsTotal = solutionsInitial?.meta?.pagination?.total || 0;

        console.log(
          'Statements total:',
          statementsTotal,
          'Solutions total:',
          solutionsTotal
        );

        // Then fetch all data using the total count as pageSize
        const [statementsResponse, solutionsResponse] = await Promise.all([
          serviceAPI.getProblemStatements(statementsTotal || 1000), // fallback to 1000 if no total
          serviceAPI.getProblemSolutions(solutionsTotal || 1000), // fallback to 1000 if no total
        ]);

        console.log('Final statements response:', statementsResponse);
        console.log('Final solutions response:', solutionsResponse);

        setProblemStatements(statementsResponse.data || []);
        setProblemSolutions(solutionsResponse.data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch problems:', err);
        setError('Failed to load problems data');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleDownload = (year: number, type: 'problems' | 'solutions') => {
    const data = type === 'problems' ? problemStatements : problemSolutions;
    const matchingItem = data.find(
      (item) => item.year.name === year.toString()
    );
    if (matchingItem?.file?.[0]?.url) {
      const baseUrl = 'https://viasm-dev.trangnguyen.edu.vn';
      const fileUrl = matchingItem.file[0].url;
      const fullUrl = fileUrl.startsWith('http')
        ? fileUrl
        : `${baseUrl}${fileUrl}`;
      window.open(fullUrl, '_blank');
    }
  };

  const getDataForYear = (year: number, type: 'problems' | 'solutions') => {
    const data = type === 'problems' ? problemStatements : problemSolutions;
    return data.find((item) => item.year.name === year.toString());
  };

  return (
    <div className="bg-[#F7F9FC]">
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-no-repeat py-20"
        style={{
          backgroundImage: 'url(/assets/images/apmo/hero-banner-problem.jpg)',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="sm:text-4xl text-3xl font-semibold">
            Problems & Solutions
          </h1>
          <p className="sm:mt-4 mt-2 text-md sm:text-lg max-w-2xl mx-auto">
            Explore APMO problems and official solutions since 1989
          </p>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:py-12 py-4 grid md:grid-cols-2 sm:gap-8 gap-4">
        {/* Left Column - Problem Statements */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Problem Statements
            </h2>
            <p className="text-gray-600">
              Download the APMO problem statements by year.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 animate-pulse rounded-lg py-2 h-8"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-6 gap-2">
              {defaultYears.map((year) => {
                const hasData = Boolean(getDataForYear(year, 'problems'));
                const problemData = getDataForYear(year, 'problems');

                return (
                  <button
                    key={`problem-${year}`}
                    onClick={() => hasData && handleDownload(year, 'problems')}
                    className={`text-white text-sm py-2 rounded-lg transition ${
                      hasData
                        ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    title={
                      hasData
                        ? `Download ${
                            problemData?.file?.[0]?.name || 'Problem Statement'
                          }`
                        : `${year} - Not available`
                    }
                    disabled={!hasData}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column - Problem Solutions */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Problem Solutions
            </h2>
            <p className="text-gray-600">
              Download the APMO problem solutions by year.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 animate-pulse rounded-lg py-2 h-8"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-6 gap-2">
              {defaultYears.map((year) => {
                const hasData = Boolean(getDataForYear(year, 'solutions'));
                const solutionData = getDataForYear(year, 'solutions');

                return (
                  <button
                    key={`solution-${year}`}
                    onClick={() => hasData && handleDownload(year, 'solutions')}
                    className={`text-white text-sm py-2 rounded-lg transition ${
                      hasData
                        ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    title={
                      hasData
                        ? `Download ${
                            solutionData?.file?.[0]?.name || 'Problem Solution'
                          }`
                        : `${year} - Not available`
                    }
                    disabled={!hasData}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
