import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { WizardFormData } from "../types";

interface Step1NameCommunityProps {
  formData: WizardFormData;
  errors: Partial<WizardFormData>;
  onInputChange: (field: keyof WizardFormData) => (value: any) => void;
  onNext: () => void;
}

export const Step1NameCommunity = ({
  formData,
  errors,
  onInputChange,
  onNext
}: Step1NameCommunityProps) => {
  return (
    <div className="space-y-6">
      
      {/* Community Name */}
      <div>
        <Input
          label="Community name"
          type="text"
          placeholder="e.g., Acme Community"
          value={formData.communityName}
          onChange={onInputChange('communityName')}
          isInvalid={!!errors.communityName}
          hint={errors.communityName || "We'll use this name across your workspace and emails."}
          isRequired
        />
      </div>


      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <Button
          iconTrailing={ArrowRight}
          onClick={onNext}
          size="sm"
          disabled={!formData.communityName.trim()}
        >
          Continue
        </Button>
      </div>
      
    </div>
  );
};
