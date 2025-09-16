import { ArrowRight, Asterisk02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { SignupFormData } from "../types";
import { SAAS_TOOLS, GROWTH_ENTERPRISE_TOOLS } from "../constants";

interface Step9IntegrationsProps {
  formData: SignupFormData;
  onArrayToggle: (field: 'currentTools' | 'enterpriseFeatures') => (value: string) => void;
  onNext: () => void;
  onSelectAllTools: () => void;
}

export const Step9Integrations = ({ 
  formData, 
  onArrayToggle, 
  onNext,
  onSelectAllTools
}: Step9IntegrationsProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex justify-end mb-3">
          <button
            onClick={onSelectAllTools}
            className="text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover underline decoration-transparent hover:decoration-brand-secondary underline-offset-2 transition-all"
          >
            {SAAS_TOOLS.every(tool => formData.currentTools.includes(tool.id)) ? 'Unselect all' : 'Select all'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {SAAS_TOOLS.map(tool => (
            <div key={tool.id} className={cx(
              "flex items-center p-2 sm:p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
              formData.currentTools.includes(tool.id)
                ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                : "border-secondary hover:border-primary"
            )}
            onClick={() => onArrayToggle('currentTools')(tool.id)}
            >
              {/* Logo - Left side */}
              {tool.logo && (
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">
                  <img 
                    src={tool.logo} 
                    alt={tool.name}
                    className={cx(
                      "max-w-full max-h-full object-contain",
                      (tool.id === "cookie-consent" || tool.id === "custom-code") && "logo-filter"
                    )}
                  />
                </div>
              )}
              
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-primary text-xs sm:text-sm truncate">{tool.name}</div>
              </div>
              
              {/* Asterisk icon - Right side - Only for Growth/Enterprise tools */}
              {GROWTH_ENTERPRISE_TOOLS.includes(tool.id) && (
                <div className="flex-shrink-0 ml-2">
                  <Asterisk02 className="w-3 h-3 text-purple-500" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Helper note - Only show if Growth/Enterprise tools are selected */}
        {formData.currentTools.some(tool => GROWTH_ENTERPRISE_TOOLS.includes(tool)) && (
          <div className="mt-3 bg-secondary/30 rounded-lg p-3">
            <p className="text-xs text-tertiary text-left">
              <Asterisk02 className="w-3 h-3 inline mr-1 text-purple-500" />
              These integrations are only available in the Enterprise plan.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end items-center gap-6">
        <button
          onClick={onNext}
          className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
        >
          No integrations needed for now
        </button>
        
        <Button
          iconTrailing={ArrowRight}
          onClick={onNext}
          size="sm"
          isDisabled={formData.currentTools.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
