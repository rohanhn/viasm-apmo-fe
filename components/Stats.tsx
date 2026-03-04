export default function Stats() {
  const stats = [
    {
      number: "35+",
      label: "Years of Excellence",
      description: "Since 1989"
    },
    {
      number: "20+", 
      label: "Participating Countries",
      description: "Across Asia-Pacific"
    },
    {
      number: "1000+",
      label: "Problems Created",
      description: "Mathematical challenges"
    },
    {
      number: "10K+",
      label: "Students Participated",
      description: "Over the years"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-textPrimary mb-4">
            APMO by the Numbers
          </h2>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto">
            Discover the impact and reach of the Asian Pacific Mathematics Olympiad across the region
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-xl2 bg-gradient-to-b from-primary-100 to-white border border-primary-200/30"
            >
              <div className="text-4xl font-bold text-primary-500 mb-2">
                {stat.number}
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-1">
                {stat.label}
              </h3>
              <p className="text-sm text-textSecondary">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}