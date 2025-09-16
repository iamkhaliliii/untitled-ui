import { ArrowRight, Lock01, Shield01, Globe01, Target01, Database01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { cx } from "@/utils/cx";
import { SignupFormData } from "../types";

interface Step10EnterpriseProps {
  formData: SignupFormData;
  selectedSecurityLevel: 'basic' | 'enterprise' | null;
  onSecuritySelection: (level: 'basic' | 'enterprise') => void;
  onNext: (skipValidation?: boolean) => void;
  onArrayToggle: (field: 'currentTools' | 'enterpriseFeatures') => (value: string) => void;
}

export const Step10Enterprise = ({ 
  formData, 
  selectedSecurityLevel,
  onSecuritySelection,
  onNext,
  onArrayToggle
}: Step10EnterpriseProps) => {
  const enterpriseFeatures = [
    { id: "saml-sso", name: "SAML single sign-on", description: "Seamlessly enable enterprise-grade authentication and secure access.", icon: Lock01 },
    { id: "data-residency", name: "Data residency", description: "Control where your data resides, ensuring compliance with regional regulations.", icon: Globe01 },
    { id: "soc2", name: "SOC 2 (Type 2)", description: "Certifies our security policies and controls meet the highest industry standards.", icon: Shield01 },
    { id: "gdpr-ccpa", name: "GDPR & CCPA", description: "Your data privacy is safeguarded with full compliance with EU regulations.", icon: Lock01 },
    { id: "uptime-sla", name: "Uptime SLA", description: "We guarantee exceptional service reliability with a robust uptime commitment.", icon: Target01 },
    { id: "data-encryption", name: "Data Encryption", description: "Your data is always protected with industry-leading encryption in transit and at rest.", icon: Lock01 },
    { id: "jwt", name: "JWT", description: "Leverage secure, stateless authentication tokens for fast and reliable access control.", icon: Shield01 },
    { id: "audit-log", name: "Audit Log", description: "Monitor a detailed trail of user actions, ensuring transparency and security.", icon: Database01 }
  ];

  const handleSelectAll = () => {
    const allFeatureIds = enterpriseFeatures.map(feature => feature.id);
    const allSelected = allFeatureIds.every(id => formData.enterpriseFeatures.includes(id));
    
    if (allSelected) {
      // Unselect all
      allFeatureIds.forEach(id => onArrayToggle('enterpriseFeatures')(id));
    } else {
      // Select all
      allFeatureIds.forEach(id => {
        if (!formData.enterpriseFeatures.includes(id)) {
          onArrayToggle('enterpriseFeatures')(id);
        }
      });
    }
  };

  // Determine which view to show based on state
  const showInitialQuestion = selectedSecurityLevel === null || selectedSecurityLevel === 'basic';
  const showEnterpriseFeatures = selectedSecurityLevel === 'enterprise';

  return (
    <div className="flex flex-col gap-6">
      {/* Initial Question */}
      {showInitialQuestion && (
        <div className="flex justify-end items-center gap-6">
          <button
            onClick={() => {
              onSecuritySelection('basic');
              setTimeout(() => {
                onNext(true);
              }, 300);
            }}
            className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
          >
            No, Continue without enterprise features
          </button>
          
          <Button
            iconTrailing={ArrowRight}
            onClick={() => onSecuritySelection('enterprise')}
            size="sm"
          >
            Yes
          </Button>
        </div>
      )}

      {/* Enterprise Features Selection */}
      {showEnterpriseFeatures && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <button
              onClick={handleSelectAll}
              className="text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover underline decoration-transparent hover:decoration-brand-secondary underline-offset-2 transition-all"
            >
              {enterpriseFeatures.every(feature => formData.enterpriseFeatures.includes(feature.id)) ? 'Unselect all' : 'Select all'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {enterpriseFeatures.map(feature => (
              <button
                key={feature.id}
                onClick={() => onArrayToggle('enterpriseFeatures')(feature.id)}
                className={cx(
                  "p-3 sm:p-4 h-20 sm:h-24 rounded-lg border text-left transition-all hover:shadow-sm flex flex-col justify-center",
                  formData.enterpriseFeatures.includes(feature.id)
                    ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                    : "border-secondary hover:border-primary"
                )}
              >
                <div className="flex items-start gap-3">
                  <feature.icon className="w-4 h-4 text-brand-secondary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-primary text-xs sm:text-sm mb-1 truncate">{feature.name}</div>
                    <div className="text-xs text-tertiary line-clamp-2">{feature.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex justify-end items-center gap-6">
            <button
              onClick={() => {
                onSecuritySelection('basic');
                setTimeout(() => {
                  onNext(true);
                }, 300);
              }}
              className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
            >
              Continue without enterprise features
            </button>
            
            <Button
              iconTrailing={ArrowRight}
              onClick={() => onNext(true)}
              size="sm"
              isDisabled={formData.enterpriseFeatures.length === 0}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
