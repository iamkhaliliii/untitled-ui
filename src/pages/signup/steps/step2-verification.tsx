import { ArrowRight, Building02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { SignupFormData } from "../types";
import { BrandData } from "@/utils/brandfetch";

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
  const handleCodeChange = (value: string) => {
    // Only allow alphanumeric characters and limit to 6
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
      {/* Brand Data Section */}
      {(brandData || isFetchingBrand) && (
        <div className="p-4 bg-gradient-to-r from-brand-secondary/5 to-brand-secondary/10 rounded-xl border border-brand-secondary/20">
          {isFetchingBrand ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-brand-secondary border-t-transparent"></div>
              <span className="text-sm text-tertiary font-medium">Fetching your company information...</span>
            </div>
          ) : brandData ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {brandData.logos && brandData.logos[0]?.formats?.[0]?.src && (
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                    <img
                      src={brandData.logos[0].formats[0].src}
                      alt={brandData.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-primary">{brandData.name}</p>
                  <p className="text-sm text-brand-secondary font-medium">{brandData.domain}</p>
                </div>
              </div>
              <Button
                size="sm"
                color="secondary"
                iconLeading={Building02}
                onClick={onShowBrandModal}
                className="hover:bg-brand-secondary/10 hover:border-brand-secondary/30"
              >
                View Details
              </Button>
            </div>
          ) : null}
        </div>
      )}
      
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
