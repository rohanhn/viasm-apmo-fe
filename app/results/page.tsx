/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import 'flag-icons/css/flag-icons.min.css';

import type { Metadata } from 'next';
import Link from 'next/link';

import { getAllCountries } from '@/src/utils/countriesUtils';

export const metadata: Metadata = {
  title: 'APMO Results - Rankings and Awards',
  description:
    'Explore APMO results, country rankings, and awards data. View yearly reports and results by participating countries.',
  keywords:
    'APMO, results, rankings, awards, mathematics olympiad, country results',
};

export default function ResultsPage() {
  // Get all countries for the right column
  const countries = getAllCountries();

  // Define year groups for the left column
  const fullReportsYears = [
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
  ];
  const countryRankingsYears = [2003, 2010, 2011, 2012, 2013, 2014, 2015];
  const awardsOnlyYears = [2000, 2001, 2005, 2006, 2007, 2008, 2009];

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

  return (
    <div className="bg-[#F7F9FC]">
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: 'url(/assets/images/apmo/03_country_map.png)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="sm:text-4xl text-3xl font-semibold">
            Results & Rankings
          </h1>
          <p className="sm:mt-4 mt-2 text-md sm:text-lg max-w-2xl mx-auto">
            Explore APMO results, country rankings, and awards data across all
            years
          </p>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:py-12 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Yearly Reports */}
          <div className="bg-white rounded-xl shadow-sm border sm:p-6 p-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-2">
              Yearly Reports
            </h2>

            {/* Full-reports Section */}
            <div className="mb-4 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Full-reports
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {fullReportsYears.map((year) => (
                  <Link
                    key={year}
                    href={`/year_report/${year}`}
                    className="text-white text-sm py-2 rounded-lg transition bg-primary-500 hover:bg-primary-400 cursor-pointer font-medium text-center block"
                    title={`View ${year} full report`}
                  >
                    {year}
                  </Link>
                ))}
              </div>
            </div>

            {/* Country rankings and awards only Section */}
            <div className="mb-4 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Country rankings and awards only
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {countryRankingsYears.map((year) => (
                  <button
                    key={year}
                    disabled
                    className="text-white text-sm py-2 rounded-lg transition bg-[#b879ff] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-75 font-medium text-center"
                    title={`${year} - Download not available`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Awards only Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Awards only
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {awardsOnlyYears.map((year) => (
                  <button
                    key={year}
                    disabled
                    className="text-white text-sm py-2 rounded-lg transition bg-[#a1a5ff] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-75 font-medium text-center"
                    title={`${year} - Not available`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Results by Country */}
          <div className="bg-white rounded-xl shadow-sm border sm:p-6 p-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-2">
              Results by Country
            </h2>
            <p className="text-gray-600 mb-6">
              Explore the APMO results by country
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {countries.map((country) => (
                <Link
                  key={country.code}
                  href={
                    country.active ? `/country_report/${country.code}/all` : '#'
                  }
                  className={`flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition font-medium text-center justify-center ${
                    country.active
                      ? 'border border-primary-400 text-primary-500 hover:bg-primary-50 cursor-pointer'
                      : 'border border-gray-300 text-gray-400 cursor-not-allowed pointer-events-none'
                  }`}
                  title={
                    country.active ? country.name : `${country.name} (Inactive)`
                  }
                >
                  <span className={`${getFlagClass(country.code)} mr-1`} />
                  <span className="truncate">{country.name}</span>
                </Link>
              ))}
            </div>

            {/* Stats Summary */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-500">
                    {countries.filter((c) => c.active).length}
                  </div>
                  <div className="text-sm text-gray-600">Active Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-600">
                    {countries.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
