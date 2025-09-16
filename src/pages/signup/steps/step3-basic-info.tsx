import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { SignupFormData } from "../types";

interface Step3BasicInfoProps {
  formData: SignupFormData;
  errors: Record<string, string>;
  onInputChange: (field: keyof SignupFormData) => (value: string) => void;
  onNext: () => void;
}

export const Step3BasicInfo = ({ 
  formData, 
  errors, 
  onInputChange, 
  onNext 
}: Step3BasicInfoProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Input
        label="First name"
        placeholder=""
        value={formData.firstName}
        onChange={onInputChange('firstName')}
        isInvalid={!!errors.firstName}
        hint={errors.firstName}
        isRequired
      />
    
      <Input
        label="Last name" 
        placeholder=""
        value={formData.lastName}
        onChange={onInputChange('lastName')}
        isInvalid={!!errors.lastName}
        hint={errors.lastName}
        isRequired
      />

      <div className="flex justify-end">
        <Button
          iconTrailing={ArrowRight}
          onClick={onNext}
          size="sm"
          isDisabled={!formData.firstName.trim() || !formData.lastName.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
