import { ArrowRight, Building02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { SignupFormData } from "../types";
import { BrandData } from "@/utils/brandfetch";
import { useEffect } from "react";

interface Step2VerificationProps {
  formData: SignupFormData;
  errors: Record<string, string>;
  resendCooldown: number;
  onInputChange: (field: keyof SignupFormData) => (value: string) => void;
  onNext: () => void;
  onResendCode: () => void;
  onEditEmail: () => void;
  brandData: BrandData | null;
  isFetchingBrand: boolean;
  onShowBrandModal: () => void;
}

export const Step2Verification = ({ 
  formData, 
  errors, 
  resendCooldown,
  onInputChange, 
  onNext, 
  onResendCode,
  onEditEmail,
  brandData,
  isFetchingBrand,
  onShowBrandModal
}: Step2VerificationProps) => {
  // Note: Google auth now skips this step entirely

  // Add keyboard listener for 'B' key
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'b' && brandData && !isFetchingBrand) {
        onShowBrandModal();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [brandData, isFetchingBrand, onShowBrandModal]);

  const handleCodeChange = (value: string) => {
    // Only allow alpranumeric characters and limit to 6
    const cleanValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    onInputChange('verificationCode')(cleanValue);
  };

  const renderCodeInputs = () => {
    const code = formData.verificationCode;
    const inputs = [];
    
    for (let i = 0; i < 6; i++) {
      inputs.push(
        <div key={i} className="relative">
          <input
            type="text"
            maxLength={1}
            value={code[i] || ''}
            onChange={(e) => {
              const newCode = code.split('');
              newCode[i] = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
              const updatedCode = newCode.join('').slice(0, 6);
              onInputChange('verificationCode')(updatedCode);
              
              // Auto-focus next input
              if (e.target.value && i < 5) {
                const target = e.target as HTMLInputElement;
                // Find all code inputs in the document
                const allInputs = document.querySelectorAll('input[type="text"][maxlength="1"]');
                const nextInput = allInputs[i + 1] as HTMLInputElement;
                nextInput?.focus();
              }
            }}
            onKeyDown={(e) => {
              // Handle backspace
              if (e.key === 'Backspace' && !code[i] && i > 0) {
                const target = e.target as HTMLInputElement;
                // Find all code inputs in the document
                const allInputs = document.querySelectorAll('input[type="text"][maxlength="1"]');
                const prevInput = allInputs[i - 1] as HTMLInputElement;
                prevInput?.focus();
              }
            }}
            className={cx(
              "w-12 h-12 sm:w-14 sm:h-14 text-center text-base sm:text-lg font-semibold border rounded-lg bg-primary text-primary",
              "focus:outline-none focus:ring-2 focus:ring-brand-solid focus:border-brand-solid",
              "placeholder:text-placeholder",
              errors.verificationCode ? "border-error-primary" : "border-primary"
            )}
          />
        </div>
      );
    }
    
    return inputs;
  };

  return (
    <div className="flex flex-col gap-6">

      
      <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
        <div className="flex gap-2 sm:gap-3">
          {renderCodeInputs().slice(0, 3)}
        </div>
        <span className="text-quaternary text-base sm:text-lg mx-1 sm:mx-2">-</span>
        <div className="flex gap-2 sm:gap-3">
          {renderCodeInputs().slice(3, 6)}
        </div>
      </div>
      
      {errors.verificationCode && (
        <p className="text-sm text-error-primary text-center">{errors.verificationCode}</p>
      )}

      <Button
        className="w-full"
        iconTrailing={ArrowRight}
        onClick={onNext}
        size="md"
        isDisabled={formData.verificationCode.length !== 6}
      >
        Next
      </Button>

      <div className="text-center space-y-3">
        <div className="text-sm text-tertiary">
          Didn't get the email?{" "}
          {resendCooldown > 0 ? (
            <span className="text-quaternary">Resend in {resendCooldown}s</span>
          ) : (
            <button 
              onClick={onResendCode}
              className="text-brand-secondary hover:text-brand-secondary_hover font-medium"
            >
              Resend
            </button>
          )}
          {" "}or{" "}
          <button 
            onClick={onEditEmail}
            className="text-brand-secondary hover:text-brand-secondary_hover font-medium"
          >
            edit your email address
          </button>
        </div>
        
        <p className="text-sm text-tertiary">
          Can't find your code? Check your spam folder!
        </p>
      </div>
    </div>
  );
};
