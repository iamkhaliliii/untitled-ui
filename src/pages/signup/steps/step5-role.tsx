import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { SignupFormData } from "../types";

interface Step5RoleProps {
  formData: SignupFormData;
  errors: Record<string, string>;
  showRoleSearch: boolean;
  customRole: string;
  onInputChange: (field: keyof SignupFormData) => (value: string) => void;
  onNext: (skipValidation?: boolean) => void;
  onShowRoleSearch: (show: boolean) => void;
  onSetCustomRole: (role: string) => void;
}

export const Step5Role = ({ 
  formData, 
  errors, 
  showRoleSearch,
  customRole,
  onInputChange, 
  onNext,
  onShowRoleSearch,
  onSetCustomRole
}: Step5RoleProps) => {
  const roles = [
    { id: "community-manager", name: "Community Manager" },
    { id: "customer-success", name: "Customer Success" },
    { id: "product-marketing", name: "Product Marketing" },
    { id: "customer-marketing", name: "Customer Marketing" },
    { id: "growth-marketing", name: "Growth Marketing" },
    { id: "revops", name: "RevOps" },
    { id: "other", name: "Other" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {roles.map(role => (
          <button
            key={role.id}
            onClick={() => {
              onInputChange('role')(role.id);
              // If "Other" is selected, immediately show search input
              if (role.id === 'other') {
                onShowRoleSearch(true);
              } else {
                // Auto-advance to next step after selection
                setTimeout(() => {
                  onNext(true);
                }, 300);
              }
            }}
            className={cx(
              "p-3 sm:p-4 rounded-lg border text-center transition-all hover:shadow-sm h-14 sm:h-16 flex items-center justify-center",
              formData.role === role.id
                ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                : "border-secondary hover:border-primary"
            )}
          >
            <span className="text-xs sm:text-sm font-medium text-primary">{role.name}</span>
          </button>
        ))}
      </div>

      {showRoleSearch ? (
        <div className="flex flex-col gap-4">
          <Input
            label="Describe your role"
            placeholder="Type your role..."
            value={customRole}
            onChange={onSetCustomRole}
            autoFocus
          />
          
          <div className="flex justify-end items-center gap-6">
            <button
              onClick={() => onNext(true)}
              className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
            >
              Skip, and Continue →
            </button>
            
            {customRole.trim() && (
              <Button
                iconTrailing={ArrowRight}
                onClick={() => {
                  onInputChange('role')(customRole);
                  setTimeout(() => {
                    onNext(true);
                  }, 300);
                }}
                size="sm"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      ) : null}

      {errors.role && (
        <p className="text-sm text-error-primary text-center">{errors.role}</p>
      )}
    </div>
  );
};
