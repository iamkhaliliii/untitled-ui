import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
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
  // Determine which view to show based on migration preference
  const showInitialQuestion = formData.hasMigrationPreference === null;
  const showMigrationNameField = formData.hasMigrationPreference === true;
  const showNewCommunityNameField = formData.hasMigrationPreference === false;

  return (
    <div className="flex flex-col gap-6">
      {/* Initial Question */}
      {showInitialQuestion && (
        <div className="flex justify-end items-center gap-6">
          <button
            onClick={() => onInputChange('hasMigrationPreference')(true)}
            className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
          >
            I want to migrate my existing community
          </button>
          
          <Button
            iconTrailing={ArrowRight}
            onClick={() => onInputChange('hasMigrationPreference')(false)}
            size="sm"
          >
            Create a new community
          </Button>
        </div>
      )}

      {/* Community URL Field for Migration */}
      {showMigrationNameField && (
        <div className="flex flex-col gap-6">
          <div>
            <Input
              label="Current community URL"
              type="url"
              placeholder="e.g., https://mycommunity.com"
              value={formData.existingCommunityName || ""}
              onChange={onInputChange('existingCommunityName')}
              isInvalid={!!errors.existingCommunityName}
              hint={errors.existingCommunityName || "Enter the URL of your existing community that you want to migrate."}
              isRequired
            />
          </div>

          <div className="flex justify-end items-center gap-6">
            <button
              onClick={() => onInputChange('hasMigrationPreference')(false)}
              className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
            >
              Create new community instead
            </button>
            
            <Button
              iconTrailing={ArrowRight}
              onClick={onNext}
              size="sm"
              disabled={!formData.existingCommunityName?.trim()}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Community Name Field for New Community */}
      {showNewCommunityNameField && (
        <div className="flex flex-col gap-6">
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

          <div className="flex justify-end items-center gap-6">
            <button
              onClick={() => onInputChange('hasMigrationPreference')(true)}
              className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
            >
              I have an existing community
            </button>
            
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
      )}
    </div>
  );
};
