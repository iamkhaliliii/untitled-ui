import { Star01 } from "@untitledui/icons";
import { TESTIMONIALS } from "../constants";

interface TestimonialContentProps {
  company: string;
  testimonialIndex: number;
}

export const TestimonialContent = ({ company, testimonialIndex }: TestimonialContentProps) => {
  const testimonial = TESTIMONIALS[testimonialIndex];
  
  const getCompanyLogo = (companyName: string) => {
    switch (companyName.toLowerCase()) {
      case 'hubspot':
        return "/logos/hubspot.svg";
      case 'xano':
        return "/logos/l_backup/xano.svg";
      case 'coachhub':
        return "/logos/l_backup/CoachHub.svg";
      default:
        return "/logos/hubspot.svg";
    }
  };

  const getTestimonialQuote = (companyName: string, index: number) => {
    if (companyName.toLowerCase() === 'xano') {
      return "Our experience with Bettermode has been fantastic—it's become an essential part of how we support and engage our users, and we're excited to see it evolve further with our community.";
    } else if (companyName.toLowerCase() === 'coachhub') {
      return "Bettermode was selected for its ease of use and for filling in almost all of our coaches' wishlist.";
    }
    return testimonial?.quote || "Using Bettermode has been a game-changer for us. Its powerful capabilities and features have revolutionized the way we engage with our community, leading to more effective connections and experiences.";
  };

  return (
    <div className="flex flex-col gap-8 px-8">
      <div className="text-left">
        {/* Company Logo at the top */}
        <div className="mb-6">
          <img 
            src={getCompanyLogo(company)} 
            alt={company} 
            className="h-8 w-auto"
          />
        </div>
        
        {/* Testimonial Quote */}
        <div className="text-left flex flex-col gap-4">
          <h2 className="text-2xl font-base text-primary mb-8">
            {getTestimonialQuote(company, testimonialIndex)}
          </h2>
        </div>
        
        {/* Author Info */}
        <div className="flex items-start gap-3 mb-6">
          <img 
            src={testimonial?.avatar}
            alt={testimonial?.author}
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial?.author || "User")}&background=6366f1&color=fff`;
            }}
          />
          <div className="flex-1">
            <p className="font-semibold text-primary text-sm">{testimonial?.author}</p>
            <cite className="text-sm text-tertiary not-italic">{testimonial?.title}</cite>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
