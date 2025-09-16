export const BrandShowcase = () => {
  return (
    <div className="flex flex-col gap-6 text-center max-w-md mx-auto">
      <div>
        {/* Title */}
        <div className="text-left flex flex-col gap-2 mb-6">
          <h2 className="text-4xl font-base text-primary">
            Why Leading Brands Choose{" "}
            <span className="font-bold">Bettermode</span>
          </h2>
          <p className="text-[1.1rem] text-tertiary">
            Empower your enterprise with an all-in-one hub for communities, knowledge sharing, events, and more powered by Bettermode's scalable platform. designed to streamline collaboration, enhance customer engagement, and drive business growth across every touchpoint.
          </p>
          <h2 className="text-xl font-base mt-10 text-primary">
            The Community Platform Behind{" "}
            <span className="font-bold">Top Brands</span> <br />
          </h2>
        </div>
        
        {/* Brand Logos Slider - 3 Horizontal Rows */}
        <div className="space-y-4">
          {/* First Row - Moving Left */}
          <div className="relative overflow-hidden">
            <div className="flex animate-infinite-scroll space-x-3">
              {[
                { src: "/logos/hubspot.svg", alt: "HubSpot" },
                { src: "/logos/l_backup/ibm.svg", alt: "IBM" },
                { src: "/logos/l_backup/xano.svg", alt: "Xano" },
                { src: "/logos/l_backup/CoachHub.svg", alt: "CoachHub" },
                { src: "/logos/l_backup/lenovo.svg", alt: "Lenovo" }
              ].concat([
                { src: "/logos/hubspot.svg", alt: "HubSpot" },
                { src: "/logos/l_backup/ibm.svg", alt: "IBM" },
                { src: "/logos/l_backup/xano.svg", alt: "Xano" },
                { src: "/logos/l_backup/CoachHub.svg", alt: "CoachHub" },
                { src: "/logos/l_backup/lenovo.svg", alt: "Lenovo" }
              ]).map((logo, index) => (
                <div key={index} className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                  <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain logo-filter-dark-only" />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="relative overflow-hidden">
            <div className="flex animate-infinite-scroll-reverse space-x-3">
              {[
                { src: "/logos/intercom-1.svg", alt: "Intercom" },
                { src: "/logos/slack-2.svg", alt: "Slack" },
                { src: "/logos/zendesk-1.svg", alt: "Zendesk" },
                { src: "/logos/l_backup/logitech.svg", alt: "Logitech" },
                { src: "/logos/l_backup/viewsonic.svg", alt: "ViewSonic" }
              ].concat([
                { src: "/logos/intercom-1.svg", alt: "Intercom" },
                { src: "/logos/slack-2.svg", alt: "Slack" },
                { src: "/logos/zendesk-1.svg", alt: "Zendesk" },
                { src: "/logos/l_backup/logitech.svg", alt: "Logitech" },
                { src: "/logos/l_backup/viewsonic.svg", alt: "ViewSonic" }
              ]).map((logo, index) => (
                <div key={index} className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                  <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain logo-filter-dark-only" />
                </div>
              ))}
            </div>
          </div>

          {/* Third Row - Moving Left */}
          <div className="relative overflow-hidden">
            <div className="flex animate-infinite-scroll space-x-3">
              {[
                { src: "/logos/l_backup/yoto.svg", alt: "Yoto" },
                { src: "/logos/l_backup/Ceros.svg", alt: "Ceros" },
                { src: "/logos/l_backup/Flutterflow.svg", alt: "FlutterFlow" },
                { src: "/logos/l_backup/preply.svg", alt: "Preply" },
                { src: "/logos/s/salesforce.svg", alt: "Salesforce" }
              ].concat([
                { src: "/logos/l_backup/yoto.svg", alt: "Yoto" },
                { src: "/logos/l_backup/Ceros.svg", alt: "Ceros" },
                { src: "/logos/l_backup/Flutterflow.svg", alt: "FlutterFlow" },
                { src: "/logos/l_backup/preply.svg", alt: "Preply" },
                { src: "/logos/s/salesforce.svg", alt: "Salesforce" }
              ]).map((logo, index) => (
                <div key={index} className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                  <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain logo-filter-dark-only" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
