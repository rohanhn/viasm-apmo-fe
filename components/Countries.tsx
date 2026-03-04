/* eslint-disable react/no-array-index-key */
export default function Countries() {
  const countries = [
    { name: 'Australia', flag: '🇦🇺', joined: '1989' },
    { name: 'China', flag: '🇨🇳', joined: '1989' },
    { name: 'Hong Kong', flag: '🇭🇰', joined: '1989' },
    { name: 'Japan', flag: '🇯🇵', joined: '1989' },
    { name: 'South Korea', flag: '🇰🇷', joined: '1989' },
    { name: 'New Zealand', flag: '🇳🇿', joined: '1989' },
    { name: 'Singapore', flag: '🇸🇬', joined: '1990' },
    { name: 'Taiwan', flag: '🇹🇼', joined: '1992' },
    { name: 'Thailand', flag: '🇹🇭', joined: '1993' },
    { name: 'Philippines', flag: '🇵🇭', joined: '1994' },
    { name: 'Indonesia', flag: '🇮🇩', joined: '1995' },
    { name: 'Malaysia', flag: '🇲🇾', joined: '1998' },
    { name: 'Mongolia', flag: '🇲🇳', joined: '2005' },
    { name: 'India', flag: '🇮🇳', joined: '2002' },
    { name: 'Kazakhstan', flag: '🇰🇿', joined: '2010' },
    { name: 'Kyrgyzstan', flag: '🇰🇬', joined: '2012' },
  ];

  return (
    <section className="bg-[#F7F9FC] min-h-screen">
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: 'url(/assets/images/apmo/03_country_map.png)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl font-semibold">Participating Countries</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Mathematics enthusiasts from across the Asia-Pacific region come
            together to compete and collaborate
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((country, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-300/50 transition-all duration-200 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {country.flag}
              </span>
              <div>
                <h3 className="font-medium text-textPrimary text-sm">
                  {country.name}
                </h3>
                <p className="text-xs text-textSecondary">
                  Since {country.joined}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-textSecondary text-sm">
            Interested in joining APMO?{' '}
            <span className="text-primary-500 font-medium">Contact us</span> to
            learn about participation requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
