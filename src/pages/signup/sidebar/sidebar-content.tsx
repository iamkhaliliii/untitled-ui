import { SignupFormData } from "../types";
import { BrandShowcase } from "./brand-showcase";
import { Step2Content } from "./step2-content";
import { Step3Content } from "./step3-content";
import { Step4Content } from "./step4-content";
import { Step5Content } from "./step5-content";
import { Step9Content } from "./step9-content";
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
      return <Step2Content />;
    case 3:
      return <Step3Content />;
    case 4:
      return <Step4Content />;
    case 5:
      return <Step5Content />;
    case 6:
    case 7:
    case 8:
      return <Step3Content />; // These steps are skipped, but fallback to step 3 content
    case 9:
      return <Step9Content />;
    case 10:
      return <SecurityShowcase />;
    case 11:
      return <PlanRecommendation formData={formData} />;
    default:
      return <Step2Content />;
  }
};
