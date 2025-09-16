import { cx } from "@/utils/cx";
import { SignupFormData } from "../types";

interface Step7CompanySizeProps {
  formData: SignupFormData;
  errors: Record<string, string>;
  onInputChange: (field: keyof SignupFormData) => (value: string) => void;
  onNext: (skipValidation?: boolean) => void;
}

export const Step7CompanySize = ({ 
  formData, 
  errors, 
  onInputChange, 
  onNext 
}: Step7CompanySizeProps) => {
  const companySizes = [
    { id: "under-50", name: "Under 50" },
    { id: "50-200", name: "50 to 200" },
    { id: "200-500", name: "200 to 500" },
    { id: "over-500", name: "Over 500" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {companySizes.map(size => (
          <button
            key={size.id}
            onClick={() => {
              onInputChange('companySize')(size.id);
              // Auto-advance to next step after selection
              setTimeout(() => {
                onNext(true);
              }, 300);
            }}
            className={cx(
              "p-3 sm:p-4 rounded-lg border text-center transition-all hover:shadow-sm h-14 sm:h-16 flex items-center justify-center",
              formData.companySize === size.id
                ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                : "border-secondary hover:border-primary"
            )}
          >
            <span className="text-xs sm:text-sm font-medium text-primary">{size.name}</span>
          </button>
        ))}
      </div>

      {errors.companySize && (
        <p className="text-sm text-error-primary text-center">{errors.companySize}</p>
      )}
    </div>
  );
};
