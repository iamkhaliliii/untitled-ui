import { SignupFormData } from "../types";
import { BrandShowcase } from "./brand-showcase";
import { TestimonialContent } from "./testimonial-content";
import { SecurityShowcase } from "./security-showcase";
import { PlanRecommendation } from "./plan-recommendation";

interface SidebarContentProps {
  currentStep: number;
  formData: SignupFormData;
}

export const SidebarContent = ({ currentStep, formData }: SidebarContentProps) => {
  switch (currentStep) {
    case 1:
      return <BrandShowcase />;
    case 2:
    case 3:
    case 4:
      return <TestimonialContent company="HubSpot" testimonialIndex={0} />;
    case 5:
    case 6:
    case 7:
      return <TestimonialContent company="XANO" testimonialIndex={1} />;
    case 8:
    case 9:
      return <TestimonialContent company="CoachHub" testimonialIndex={3} />;
    case 10:
      return <SecurityShowcase />;
    case 11:
      return <PlanRecommendation formData={formData} />;
    default:
      return <TestimonialContent company="HubSpot" testimonialIndex={0} />;
  }
};
