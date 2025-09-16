import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { SignupFormData } from "../types";

interface Step8WebsiteProps {
  formData: SignupFormData;
  onInputChange: (field: keyof SignupFormData) => (value: string) => void;
  onNext: () => void;
}

export const Step8Website = ({ 
  formData, 
  onInputChange, 
  onNext 
}: Step8WebsiteProps) => {
  return (
    <div className="flex flex-col gap-6">
      <InputGroup 
        label={`${formData.companyName || 'Company'} website URL`}
        leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
      >
        <Input 
          placeholder="www.company-website.com" 
          value={formData.website}
          onChange={onInputChange('website')}
        />
      </InputGroup>

      <div className="flex justify-end items-center gap-6">
        <button
          onClick={onNext}
          className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
        >
          Skip
        </button>
        
        <Button
          iconTrailing={ArrowRight}
          onClick={onNext}
          size="sm"
          isDisabled={!formData.website.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
