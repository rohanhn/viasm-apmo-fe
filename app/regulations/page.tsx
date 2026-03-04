/* eslint-disable react/button-has-type */
export default function RegulationsPage() {
  const years = [
    2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
  ];

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-semibold text-gray-800">
            APMO Regulations
          </h1>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
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
              {years.map((year) => (
                <button
                  key={year}
                  className="bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Download Latest */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">⬇️</div>

              <div>
                <p className="font-medium text-gray-700">
                  Download current regulations
                </p>

                <button className="text-blue-600 text-sm hover:underline">
                  Download PDF
                </button>
              </div>
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
              be <b>(n+1)/2</b>, unless ties in the limiting cut-off happen.
            </p>
            {/* Award Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-3">Awards</h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  A Gold Award if the obtained score is at least
                  <b> m + σ </b> and r = 1.
                </li>

                <li>
                  A Silver Award if the obtained score is at least
                  <b> m + σ/2 </b>.
                </li>

                <li>
                  A Bronze Award if the obtained score is at least
                  <b> m − σ/2 </b>.
                </li>

                <li>
                  Honourable Mention for outstanding performance on individual
                  questions.
                </li>
              </ul>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
