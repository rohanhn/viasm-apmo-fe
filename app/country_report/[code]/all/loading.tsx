/* eslint-disable react/no-array-index-key */
export default function CountryReportLoading() {
  return (
    <div className="bg-[#F7F9FC]">
      {/* Hero Section Skeleton */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: 'url(/assets/images/apmo/03_country_map.png)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <div className="animate-pulse">
            <div className="h-4 bg-white/20 rounded w-32 mx-auto mb-4" />
            <div className="h-10 bg-white/20 rounded w-96 mx-auto mb-4" />
            <div className="h-6 bg-white/20 rounded w-72 mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:pt-8 pt-4">
        <div className="grid md:grid-cols-4 sm:gap-6 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white sm:p-6 p-4 rounded-xl shadow-sm border"
            >
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                <div className="h-8 bg-gray-200 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Table Section Skeleton */}
      <section className="max-w-6xl mx-auto sm:px-6 px-4 sm:py-8 py-4 sm:pb-20 pb-10">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-64" />
            </div>
          </div>

          <div className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
