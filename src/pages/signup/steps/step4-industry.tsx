import { Select } from "@/components/base/select/select";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { SignupFormData } from "../types";
import { getFlattenedIndustries, industryMappings } from "@/utils/industry-mapping";
import { BrandData } from "@/utils/brandfetch";
import { useEffect, useState } from "react";
import { ArrowRight } from "@untitledui/icons";

interface Step4IndustryProps {
  formData: SignupFormData;
  errors: Record<string, string>;
  showIndustrySearch: boolean;
  brandData: BrandData | null;
  onInputChange: (field: keyof SignupFormData) => (value: string) => void;
  onNext: (skipValidation?: boolean) => void;
  onShowIndustrySearch: (show: boolean) => void;
}

export const Step4Industry = ({ 
  formData, 
  errors, 
  showIndustrySearch,
  brandData,
  onInputChange, 
  onNext,
  onShowIndustrySearch
}: Step4IndustryProps) => {
  const [originalPreselection, setOriginalPreselection] = useState<string | null>(null);
  
  const industries = [
    { id: "B2B SaaS", name: "B2B SaaS" },
    { id: "Computer Software", name: "Computer Software" },
    { id: "Technology and Services", name: "Technology and Services" },
    { id: "AI", name: "AI" },
    { id: "Medical SaaS", name: "Medical SaaS" },
    { id: "MarTech", name: "MarTech" },
    { id: "AdTech", name: "AdTech" },
    { id: "Online Marketplace", name: "Online Marketplace" },
    { id: "EdTech", name: "EdTech" },
    { id: "Dev Tools", name: "Dev Tools" },
    { id: "other", name: "Other" }
  ];

  // Get only parent industries from the JSON file (clean and simple)
  const allIndustries = getFlattenedIndustries()
    .filter(industry => !industry.isSubIndustry) // Only parent industries
    .map(industry => ({
      id: industry.id,
      label: industry.label, // Clean label without emoji
      supportingText: undefined
    }));

  // Pre-select industry based on brand data
  useEffect(() => {
    if (brandData?.company?.industries && brandData.company.industries.length > 0 && !formData.industry) {
      const brandIndustry = brandData.company.industries[0];
      
      // Try to map to our predefined industries first
      const mappedIndustry = findMatchingIndustry(brandIndustry.name);
      if (mappedIndustry) {
        onInputChange('industry')(mappedIndustry);
        setOriginalPreselection(mappedIndustry); // Track the original pre-selection
      }
    }
  }, [brandData, formData.industry, onInputChange]);

  // Helper function to find matching industry
  const findMatchingIndustry = (brandIndustryName: string): string | null => {
    const lowerBrandName = brandIndustryName.toLowerCase();
    
    // Check direct matches with our predefined industries
    const directMatch = industries.find(industry => 
      industry.name.toLowerCase().includes(lowerBrandName) ||
      lowerBrandName.includes(industry.name.toLowerCase())
    );
    
    if (directMatch) {
      return directMatch.id;
    }

    // Check specific mappings
    if (lowerBrandName.includes('programming') || lowerBrandName.includes('developer') || lowerBrandName.includes('software')) {
      return "Computer Software";
    }
    if (lowerBrandName.includes('computer') || lowerBrandName.includes('technology') || lowerBrandName.includes('electronics')) {
      return "Technology and Services";
    }
    if (lowerBrandName.includes('artificial intelligence') || lowerBrandName.includes('machine learning') || lowerBrandName.includes('ai')) {
      return "AI";
    }
    if (lowerBrandName.includes('health') || lowerBrandName.includes('medical') || lowerBrandName.includes('medicine')) {
      return "Medical SaaS";
    }
    if (lowerBrandName.includes('marketing') || lowerBrandName.includes('advertising')) {
      return "MarTech";
    }
    if (lowerBrandName.includes('education') || lowerBrandName.includes('learning')) {
      return "EdTech";
    }
    if (lowerBrandName.includes('marketplace') || lowerBrandName.includes('e-commerce') || lowerBrandName.includes('shopping')) {
      return "Online Marketplace";
    }

    return null;
  };

  // Check if an industry was pre-selected based on brand data
  const isPreselected = (industryId: string): boolean => {
    return formData.industry === industryId && !!(brandData?.company?.industries && brandData.company.industries.length > 0);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Show hint if industry was pre-selected and hasn't been changed */}
      {formData.industry && 
       originalPreselection && 
       formData.industry === originalPreselection && 
       brandData?.company?.industries && 
       brandData.company.industries.length > 0 && (
        <div className="text-left">
          <p className="text-sm text-tertiary">
            Based on your company data, we think your industry is "{industries.find(i => i.id === formData.industry)?.name}". Feel free to select something else if this doesn't look right.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {industries.map(industry => (
          <button
            key={industry.id}
            onClick={() => {
              onInputChange('industry')(industry.id);
              // If "Other" is selected, immediately show search input
              if (industry.id === 'other') {
                onShowIndustrySearch(true);
              } else {
                // For all other selections, auto-advance to next step
                setTimeout(() => {
                  onNext(true);
                }, 300);
              }
            }}
            className={cx(
              "p-3 sm:p-4 h-14 sm:h-16 rounded-lg border text-center transition-all hover:shadow-sm flex items-center justify-center relative",
              formData.industry === industry.id
                ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                : "border-secondary hover:border-primary"
            )}
          >
            <span className="text-xs sm:text-sm font-medium text-primary">{industry.name}</span>
            {isPreselected(industry.id) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-secondary rounded-full border-2 border-primary"></div>
            )}
          </button>
        ))}
      </div>


      {showIndustrySearch ? (
        <div className="flex flex-col gap-4">
          <Select.ComboBox 
            label="Search industries" 
            placeholder="Type to search..." 
            items={allIndustries}
            onSelectionChange={(value) => {
              if (value) {
                onInputChange('industry')(value as string);
                setTimeout(() => {
                  onNext(true);
                }, 300);
              }
            }}
          >
            {(item) => (
              <Select.Item id={item.id} supportingText={item.supportingText}>
                {item.label}
              </Select.Item>
            )}
          </Select.ComboBox>
          
          {/* Skip button for "Other" selection */}
          <div className="flex justify-end">
            <button
              onClick={() => onNext(true)}
              className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
            >
              Skip, and Continue →
            </button>
          </div>
        </div>
      ) : null}

      {errors.industry && (
        <p className="text-sm text-error-primary text-center">{errors.industry}</p>
      )}

      {/* Show Continue button if industry is pre-selected from brand data and hasn't been changed */}
      {formData.industry && 
       originalPreselection && 
       formData.industry === originalPreselection && 
       brandData?.company?.industries && 
       brandData.company.industries.length > 0 && (
        <div className="flex justify-end pt-4">
          <Button
            iconTrailing={ArrowRight}
            onClick={() => onNext(true)}
            size="sm"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};
