import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { SignupFormData } from "../types";

interface Step6CompanyProps {
  formData: SignupFormData;
  errors: Record<string, string>;
  onInputChange: (field: keyof SignupFormData) => (value: string) => void;
  onNext: () => void;
}

export const Step6Company = ({ 
  formData, 
  errors, 
  onInputChange, 
  onNext 
}: Step6CompanyProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Company name"
        placeholder=""
        value={formData.companyName}
        onChange={onInputChange('companyName')}
        isInvalid={!!errors.companyName}
        hint={errors.companyName}
        isRequired
      />

      <div className="flex justify-end">
        <Button
          iconTrailing={ArrowRight}
          onClick={onNext}
          size="sm"
          isDisabled={!formData.companyName.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
