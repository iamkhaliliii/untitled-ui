export const SecurityShowcase = () => {
  return (
    <div className="flex flex-col gap-8 px-8">
      <div className="text-left">
        {/* Title */}
        <div className="text-left flex flex-col gap-4">
          {/* Grow with confidence badge */}
          <div className="inline-flex w-fit">
            <span className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full">
              Grow with confidence
            </span>
          </div>
          
          <h2 className="text-4xl font-base text-primary">
            Enterprise-grade {" "}
            <span className="font-bold">security & compliance</span>
          </h2>
          <p className="text-xl text-tertiary mb-8 leading-relaxed">
            Built from day one with a privacy-focused design and compliant approach to securing your data.
          </p>
        </div>
        
        {/* G2 Awards Logos - 3x2 Grid */}
        <div className="grid grid-cols-3 gap-x-0 gap-y-4 mt-4">
          {[
            { src: "/logos/G2/Ease of use -.svg", alt: "G2 Ease of Use" },
            { src: "/logos/G2/G2 - ease of use bussines.svg", alt: "G2 Ease of Use Business" },
            { src: "/logos/G2/G2 - high performer.svg", alt: "G2 High Performer" },
            { src: "/logos/G2/G2 -leaders.svg", alt: "G2 Leaders" },
            { src: "/logos/G2/G2 -support.svg", alt: "G2 Support" },
            { src: "/logos/G2/G2 momentom leader.svg", alt: "G2 Momentum Leader" }
          ].map((award, index) => (
            <img 
              key={index}
              src={award.src} 
              alt={award.alt} 
              className="h-32 w-32 border-2 border-secondary p-5 rounded-2xl bg-primary object-contain opacity-90 hover:opacity-100 transition-opacity mx-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
