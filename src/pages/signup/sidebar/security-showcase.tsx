export const SecurityShowcase = () => {
  return (
    <div className="flex flex-col gap-4 px-8">
      <div className="text-left">
        {/* Title */}
        <div className="text-left flex flex-col gap-3">
          <h2 className="text-2xl font-base text-primary">
            <span className="font-bold">Built-In Security & Compliance From Day One</span>
          </h2>
          <p className="text-sm text-tertiary mb-3 leading-relaxed">
            SOC 2 Type II certified, GDPR compliant, enterprise SSO, data residency controls, 99.9% uptime SLA, comprehensive audit logging, and advanced user permissions. Security architecture designed for regulated industries and Fortune 500 requirements.
          </p>
          <p className="text-sm text-tertiary mb-4 leading-relaxed">
            Industry-leading data protection with privacy-focused design ensures your community meets the highest security standards your customers and stakeholders demand.
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
