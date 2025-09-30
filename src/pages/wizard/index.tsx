import { useState } from "react";
import { useNavigate } from "react-router";
import { WizardLayout } from "./components/wizard-layout";
import { Step1NameCommunity } from "./steps/step1-name-community";
import { Step2Branding } from "./steps/step2-branding";
import { Step3InitialSpaces } from "./steps/step3-initial-spaces";
import { SuccessScreen } from "./components/success-screen";
import { WizardFormData } from "./types";

const TOTAL_STEPS = 3;

const initialFormData: WizardFormData = {
  hasMigrationPreference: null,
  existingCommunityName: "",
  communityName: "",
  description: "",
  websiteUrl: "",
  logo: null,
  primaryColor: "#6366f1",
  isManualBranding: false,
  selectedSpaces: []
};

export const WizardPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(() => {
    // Initialize with brand data from signup if available
    const savedBrandData = sessionStorage.getItem('signup-brand-data');
    const savedFormData = sessionStorage.getItem('signup-form-data');
    
    let brandName = "";
    let websiteUrl = "";
    
    if (savedBrandData) {
      try {
        const brandData = JSON.parse(savedBrandData);
        brandName = brandData?.name || "";
        websiteUrl = brandData?.domain || "";
      } catch (error) {
        console.error('Error parsing brand data:', error);
      }
    }
    
    if (savedFormData) {
      try {
        const signupData = JSON.parse(savedFormData);
        if (signupData.companyName) {
          brandName = signupData.companyName;
        }
      } catch (error) {
        console.error('Error parsing signup data:', error);
      }
    }
    
    return {
      ...initialFormData,
      communityName: brandName,
      websiteUrl: websiteUrl
    };
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedLogoUrl, setSelectedLogoUrl] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = (field: keyof WizardFormData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.communityName.trim()) {
          newErrors.communityName = "Community name is required";
        }
        break;
      case 2:
        // Branding is optional, no validation needed
        break;
      case 3:
        if (formData.selectedSpaces.length === 0) {
          newErrors.selectedSpaces = "Please select at least one space";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      // Special handling for step 1 migration check
      if (currentStep === 1 && formData.hasMigrationPreference === true) {
        // If user wants migration, redirect to pricing with migration data
        sessionStorage.setItem('wizard-form-data', JSON.stringify({
          ...formData,
          communityName: formData.existingCommunityName || ""
        }));
        navigate('/signup', { state: { step: 11 } });
        return;
      }
      
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Final submission
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };


  const handleSubmit = () => {
    console.log("Final form data:", formData);
    // Store wizard data before redirecting to pricing
    sessionStorage.setItem('wizard-form-data', JSON.stringify(formData));
    // Redirect to pricing instead of showing success screen
    navigate('/signup', { state: { step: 11 } });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1NameCommunity
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2Branding
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
            onLogoSelect={setSelectedLogoUrl}
          />
        );
      case 3:
        return (
          <Step3InitialSpaces
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  // Show success screen after completion
  if (isCompleted) {
    return <SuccessScreen formData={formData} />;
  }

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      formData={formData}
      selectedLogoUrl={selectedLogoUrl}
      onBack={handleBack}
    >
      {renderCurrentStep()}
    </WizardLayout>
  );
};
