import { Star01 } from "@untitledui/icons";

export const Step2Content = () => {
  return (
    <div className="flex flex-col gap-4 px-8">
      <div className="text-left">
        {/* Main Content */}
        <div className="text-left flex flex-col gap-3">
          <h2 className="text-2xl font-base text-primary">
            <span className="font-bold">Accelerate Implementation With Expert Guidance</span>
          </h2>
          <p className="text-sm text-tertiary mb-4 leading-relaxed">
            Get up and running fast with proven setup frameworks designed for SaaS teams. Professional onboarding that gets you to business results quickly and efficiently.
          </p>
        </div>
        
        {/* Testimonial Card */}
        <div className="border-l-2 border-secondary pl-4 mt-6 mb-4">
          {/* Company Logo at the top */}
          <div className="flex justify-start mb-3">
            <img 
              src="/logos/hubspot.svg" 
              alt="HubSpot" 
              className="h-5 w-auto"
            />
          </div>
          
          {/* Quote */}
          <blockquote className="text-base text-primary mb-4 leading-relaxed italic">
            "Bettermode revolutionized how we engage our community. The implementation was seamless."
          </blockquote>
          
          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Kyle Foster"
                className="w-10 h-10 rounded-full border-2 border-secondary"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Kyle Foster")}&background=6366f1&color=fff`;
                }}
              />
              <div>
                <p className="font-semibold text-primary text-sm">Kyle Foster</p>
                <p className="text-xs text-tertiary">Marketing Manager</p>
              </div>
            </div>
            
            {/* Stars at the bottom right */}
            <div className="flex gap-0.5 flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
