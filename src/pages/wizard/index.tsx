import { useState } from "react";
import { WizardLayout } from "./components/wizard-layout";
import { Step1NameCommunity } from "./steps/step1-name-community";
import { Step2Branding } from "./steps/step2-branding";
import { Step3InitialSpaces } from "./steps/step3-initial-spaces";
import { SuccessScreen } from "./components/success-screen";
import { WizardFormData } from "./types";

const TOTAL_STEPS = 3;

const initialFormData: WizardFormData = {
  communityName: "",
  description: "",
  websiteUrl: "",
  logo: null,
  primaryColor: "#6366f1",
  isManualBranding: false,
  selectedSpaces: []
};

export const WizardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<WizardFormData>>({});
  const [selectedLogoUrl, setSelectedLogoUrl] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = (field: keyof WizardFormData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Partial<WizardFormData> = {};

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
    // Here you would typically submit to your API
    setIsCompleted(true);
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
