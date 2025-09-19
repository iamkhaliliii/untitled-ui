import { useEffect } from "react";
import { useNavigate } from "react-router";
import { WizardFormData } from "../types";

interface SuccessScreenProps {
  formData: WizardFormData;
}

export const SuccessScreen = ({ formData }: SuccessScreenProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/admin2/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const brandColor = formData.primaryColor || '#6366f1';

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(135deg, ${brandColor}15 0%, ${brandColor}25 50%, ${brandColor}15 100%)`
      }}
    >
      {/* Success Content */}
      <div className="text-center max-w-2xl">
        
        {/* Success Message */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          {formData.communityName} is ready!
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
          We're setting up your community and preparing everything for launch.
        </p>

        {/* Loading Text */}
        <div className="text-lg text-gray-500">
          <span>Redirecting to onboarding...</span>
        </div>
        
      </div>
    </div>
  );
};
