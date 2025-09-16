import { InfoCircle, Lock01, Shield01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { SignupFormData } from "../types";
import { ENTERPRISE_FEATURES } from "../constants";

interface Step10EnterpriseProps {
  formData: SignupFormData;
  selectedSecurityLevel: 'basic' | 'enterprise' | null;
  onSecuritySelection: (level: 'basic' | 'enterprise') => void;
  onNext: (skipValidation?: boolean) => void;
}

export const Step10Enterprise = ({ 
  formData, 
  selectedSecurityLevel,
  onSecuritySelection,
  onNext
}: Step10EnterpriseProps) => {
  const handleSecuritySelection = (level: 'basic' | 'enterprise') => {
    onSecuritySelection(level);
    
    // Auto-advance to next step after selection
    setTimeout(() => {
      onNext(true);
    }, 300);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card - Basic Security (No Title) */}
        <div 
          className={cx(
            "p-6 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
            selectedSecurityLevel === 'basic'
              ? "border-brand-solid bg-brand-primary/50 shadow-sm"
              : "border-secondary bg-secondary/10 hover:border-primary"
          )}
          onClick={() => handleSecuritySelection('basic')}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Lock01 className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-primary text-sm mb-1">Data encryption</div>
                <div className="text-xs text-tertiary">Your data is always protected with industry-leading encryption in transit and at rest.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield01 className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-primary text-sm mb-1">Data residency</div>
                <div className="text-xs text-tertiary">Control where your data resides, ensuring compliance with regional regulations.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield01 className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-primary text-sm mb-1">Standard security measures</div>
                <div className="text-xs text-tertiary">Essential security features to protect your community and data.</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Card - Enterprise Features (No Title) */}
        <div 
          className={cx(
            "p-6 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
            selectedSecurityLevel === 'enterprise'
              ? "border-brand-solid bg-brand-primary/50 shadow-sm"
              : "border-secondary bg-secondary/10 hover:border-primary"
          )}
          onClick={() => handleSecuritySelection('enterprise')}
        >
          <div className="space-y-3">
            {ENTERPRISE_FEATURES.map(feature => (
              <div key={feature.id} className="flex items-start gap-3">
                <feature.icon className="w-4 h-4 text-brand-secondary mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-primary text-sm mb-1">{feature.name}</div>
                  <div className="text-xs text-tertiary">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Plan Note */}
          <div className="mt-4 pt-4 border-t border-secondary/50">
            <p className="text-xs text-tertiary">
              <InfoCircle className="w-3 h-3 inline mr-1 text-orange-500" />
              These requirements are available on the Enterprise plan. Selecting them helps us route you to the right plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
