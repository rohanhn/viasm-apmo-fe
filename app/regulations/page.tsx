/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */

'use client';

import { useEffect, useState } from 'react';

import MathDisplay from '@/components/MathDisplay';
import { serviceAPI } from '@/src/services/serviceAPI';

interface Regulation {
  id: number;
  year_name: {
    name: string;
  };
  file: {
    url: string;
    name: string;
  };
}

export default function RegulationsPage() {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default years list from 2016 to 2026
  const defaultYears = Array.from({ length: 11 }, (_, i) => 2026 - i); // [2026, 2025, 2024, ..., 2016]

  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        setLoading(true);
        const response = await serviceAPI.getRegulations();
        setRegulations(response.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to load regulations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegulations();
  }, []);

  const handleYearClick = (year: number) => {
    const matchingRegulation = regulations.find(
      (reg) => reg.year_name.name === year.toString()
    );

    if (matchingRegulation) {
      const baseUrl = 'https://viasm-dev.trangnguyen.edu.vn';
      const fullUrl = matchingRegulation.file.url.startsWith('http')
        ? matchingRegulation.file.url
        : `${baseUrl}${matchingRegulation.file.url}`;
      window.open(fullUrl, '_blank');
    }
  };

  const getRegulationForYear = (year: number) => {
    return regulations.find((reg) => reg.year_name.name === year.toString());
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      {/* Banner with Image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: 'url(/assets/images/apmo/03_country_map.png)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl font-semibold">APMO Regulations</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Download the full text of the APMO Regulations by year or read the
            outline of the contest regulations.
          </p>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-[320px_1fr] gap-8">
        {/* LEFT SIDEBAR */}
        <aside className="space-y-6">
          {/* Download Years */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-lg text-gray-700">
              Full-text by year
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Download the full text of the APMO Regulations by year.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {loading ? (
                // Skeleton loading for year buttons
                Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 animate-pulse rounded-lg py-2 h-8"
                  />
                ))
              ) : error ? (
                <div className="col-span-3 text-center py-4 text-red-500">
                  {error}
                </div>
              ) : (
                defaultYears.map((year) => {
                  const regulation = getRegulationForYear(year);
                  const hasData = Boolean(regulation);

                  return (
                    <button
                      key={year}
                      onClick={() => hasData && handleYearClick(year)}
                      className={`text-white text-sm py-2 rounded-lg transition ${
                        hasData
                          ? 'bg-primary-500 hover:bg-primary-400 cursor-pointer'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      title={
                        hasData
                          ? `Download ${regulation?.file.name}`
                          : `${year} - Not available`
                      }
                      disabled={!hasData}
                    >
                      {year}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="bg-white rounded-xl border shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Outline of regulations
          </h2>

          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              The APMO contest consists of one four-hour paper consisting of
              five questions of varying difficulty and each having a maximum
              score of 7 points.
            </p>

            <p>
              Country representatives organize the competition locally. Any
              number of students may sit the exam in each country, but the
              results of at most 10 of them per country can be sent for official
              participation.
            </p>

            <p>
              Contestants should not have formally enrolled at a university (or
              equivalent post-secondary institution) and they must be younger
              than 20 years of age on the 1st July of the year of the contest.
            </p>

            <p>
              The APMO is held in the afternoon of the second Monday of March
              for participating countries in the North and South Americas, and
              in the morning of the second Tuesday of March for participating
              countries on the Western Pacific and in Asia.
            </p>

            <p>
              The contest questions are to be collected from the contestants at
              the end of the APMO and are to be kept confidential until the
              Senior Coordinating Country posts them on the official APMO
              website. Each exam paper must contain a written legend, warning
              the students not to discuss the problems over the internet until
              that date.
            </p>
            <p>
              All APMO contestants will receive a Certificate of Award,
              Honourable Mention or Representation.
            </p>
            <p>
              The maximum total number of Award certificates per edition should
              be <MathDisplay latex="\frac{n+1}{2}" />, unless ties in the
              limiting cut-off happen.
            </p>
            <p>
              Let <MathDisplay latex="m" /> and <MathDisplay latex="\sigma" />{' '}
              be the mean and standard deviation of the individual scores for
              each year. Let <MathDisplay latex="r" /> be the rank of a student
              within his/her country. Then the student is awarded:
            </p>
            {/* Award Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-3">Awards</h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  A Gold Award if the obtained score is at least{' '}
                  <MathDisplay latex="m+\sigma" /> and{' '}
                  <MathDisplay latex="r=1" />.
                </li>

                <li>
                  A Silver Award if the obtained score is at least{' '}
                  <MathDisplay latex="m+\frac{\sigma}{3}" /> and{' '}
                  <MathDisplay latex="r\leq 3" />.
                </li>

                <li>
                  A Bronze Award if the obtained score is at least{' '}
                  <MathDisplay latex="m-\frac{\sigma}{3}" /> and{' '}
                  <MathDisplay latex="r\leq 7" />.
                </li>

                <li>
                  An Honourable Mention if the student has not received an
                  Award, but who has performed creditably according to some
                  criteria determined each year; for example, a contestant who
                  has obtained a perfect score of 7 for at least one question or
                  has obtained scores of 5 or 6 for at least two questions.
                </li>
              </ul>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
