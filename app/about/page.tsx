/* eslint-disable react/button-has-type */
/* eslint-disable import/extensions */
import { FaStar } from 'react-icons/fa6';
import { LuUser } from 'react-icons/lu';
import { RxFileText } from 'react-icons/rx';
import { TfiCup } from 'react-icons/tfi';

const aims = [
  {
    id: 1,
    icon: FaStar,
    title: 'Discover & Encourage Talent',
    description:
      'Discovering, encouraging and challenging mathematically gifted high-school students.',
  },
  {
    id: 2,
    icon: LuUser,
    title: 'International Cooperation',
    description:
      'Fostering friendly international relations and cooperation between students and teachers throughout the region.',
  },
  {
    id: 3,
    icon: RxFileText,
    title: 'Exchange of Knowledge',
    description:
      'Creating opportunities for the exchange of information on school syllabi and practice.',
  },
  {
    id: 4,
    icon: TfiCup,
    title: 'Olympiad Development',
    description:
      'Encouraging and supporting mathematical involvement with Olympiad-type activities in participating countries and throughout the region.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 mb-[-130px] sm:mb-[-100px]">
        <div className="relative w-full h-[350px] overflow-hidden bg-[url('/assets/images/apmo/01_hero_world_map.png')] bg-contain bg-no-repeat bg-[102%_-100px]">
          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-center items-start h-full">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-textPrimary">
                About APMO
              </h1>

              <p className="text-md md:text-xl mb-8 font-medium text-textSecondary">
                The Asian Pacific Mathematics Olympiad (APMO) is a mathematical
                competition for countries in the Pacific-Rim Region.
              </p>
            </div>
          </div>

          {/* Mathematical Elements */}
          {/* iii */}
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white sm:py-10 py-4">
        <div className="max-w-6xl mx-auto sm:px-6 px-4 space-y-4">
          {/* Description */}
          <div className=" text-textSecondary text-sm sm:text-lg leading-relaxed">
            <p>
              The APMO is held annually. Each participating country has a
              representative in charge of organizing the APMO locally.
            </p>

            <p>
              A central committee selects a paper with five questions to be
              solved in four hours, sends marking schemes and determines award
              winners.
            </p>
          </div>

          {/* Timeline */}
          <div className="bg-primary-100 rounded-2xl p-2 sm:p-10">
            <div className="flex gap-x-4 items-center">
              <h2 className="text-md sm:text-2xl font-semibold text-primary-500">
                Since 1989
              </h2>

              <p className="text-textSecondary leading-relaxed max-[767px]:text-sm">
                The APMO started in 1989 and has grown into one of the most
                respected mathematical competitions in the Pacific region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aims Section */}
      <section className="bg-[#F7F9FC] sm:py-10 py-4">
        <div className="max-w-6xl mx-auto sm:px-6 px-4">
          <div className="text-center sm:mb-8 mb-4">
            <h2 className="text-3xl font-semibold text-textPrimary">
              Our Aims
            </h2>
            <p className="mt-2 text-textSecondary">
              The core objectives that guide APMO each year.
            </p>
          </div>

          <div className="grid md:grid-cols-2 sm:gap-8 gap-4">
            {aims.map((aim) => {
              const IconComponent = aim.icon;
              return (
                <div
                  key={aim.id}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="grid grid-cols-[auto_1fr] gap-x-4">
                    <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary-100">
                      <IconComponent className="text-primary-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-primary-500">
                        {aim.title}
                      </h3>
                      <p className="mt-2 text-textSecondary leading-relaxed max-[767px]:text-sm">
                        {aim.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-white sm:py-10 py-4">
        <div className="max-w-3xl mx-auto sm:px-6 px-4 text-center">
          <h2 className="sm:text-3xl text-2xl font-semibold text-textPrimary">
            Inspiring Mathematical Excellence
          </h2>

          <p className="sm:mt-6 mt-2 text-textSecondary leading-relaxed">
            For over three decades, APMO has connected young mathematicians
            across the Pacific region through challenge, collaboration, and
            academic excellence.
          </p>

          <button className="sm:mt-8 mt-2 bg-primary-500 text-white sm:px-8 sm:py-3 px-4 py-2 rounded-xl shadow-md hover:-translate-y-1 transition">
            View Latest Results
          </button>
        </div>
      </section>
    </>
  );
}
