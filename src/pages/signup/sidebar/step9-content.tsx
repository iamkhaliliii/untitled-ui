import { Star01 } from "@untitledui/icons";

export const Step9Content = () => {
  return (
    <div className="flex flex-col gap-4 px-8">
      <div className="text-left">
        {/* Main Content */}
        <div className="text-left flex flex-col gap-3">
          <h2 className="text-2xl font-base text-primary">
            <span className="font-bold">Integrate With Your Entire Ecosystem and Tool in Your Stack</span>
          </h2>
          <p className="text-sm text-tertiary mb-4 leading-relaxed">
            +20 Pre-built connections for the tools you already use, plus robust APIs for custom integrations. Whether native or custom - we've got you covered.
          </p>
          <p className="text-sm text-tertiary mb-3 leading-relaxed">
            This approach emphasizes the <strong>flexibility and choice</strong> rather than focusing on limitations or technical complexity - perfect for SaaS buyers who want options.
          </p>
        </div>
        
        {/* Testimonial Card */}
        <div className="border-l-2 border-secondary pl-4 mt-6 mb-4">
          {/* Company Logo at the top */}
          <div className="flex justify-start mb-3">
            <img 
              src="/logos/l_backup/CoachHub.svg" 
              alt="CoachHub" 
              className="h-5 w-auto"
            />
          </div>
          
          {/* Quote */}
          <blockquote className="text-base text-primary mb-4 leading-relaxed italic">
            "Selected for ease of use and comprehensive capabilities. Perfect fit for all our requirements."
          </blockquote>
          
          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://randomuser.me/api/portraits/men/4.jpg"
                alt="Alex Johnson"
                className="w-10 h-10 rounded-full border-2 border-secondary"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Alex Johnson")}&background=6366f1&color=fff`;
                }}
              />
              <div>
                <p className="font-semibold text-primary text-sm">Alex Johnson</p>
                <p className="text-xs text-tertiary">Product Manager</p>
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
