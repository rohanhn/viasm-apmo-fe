/* eslint-disable react/self-closing-comp */
import Image from 'next/image';

import Button from './Button';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6">
      <div className="">
        {/* Hero Banner Container */}
        <div className="relative w-full h-[450px] sm:h-[600px] overflow-hidden bg-[url('/assets/images/apmo/01_hero_world_map.png')] bg-contain bg-no-repeat bg-[102%_-60px] sm:bg-[102%_-200px]">
          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-center items-start h-[60%] sm:h-full">
            <div className="max-w-2xl">
              <h1 className="sm:text-5xl text-3xl md:text-6xl font-bold leading-tight mb-4 text-textPrimary">
                Asian Pacific <br />
                Mathematics Olympiad
              </h1>

              <p className="text-md sm:text-xl md:text-2xl sm:mb-8 mb-4 font-medium text-textSecondary">
                Global Mathematics Competition & Excellence
              </p>

              <Button
                variant="primary"
                size="lg"
                className="px-6 py-2 text-sm shadow-sm hover:shadow-md"
              >
                Learn More →
              </Button>
            </div>
          </div>

          {/* Mathematical Elements */}
          {/* iii */}
        </div>
      </div>
      <Image
        src="/assets/images/apmo/hero-banner.png"
        alt="APMO World Map Background"
        width={1170}
        height={300}
        className="mt-[-200px] relative"
      />
    </section>
  );
}
