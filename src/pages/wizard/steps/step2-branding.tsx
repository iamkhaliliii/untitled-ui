import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Upload01, Download01, Loading01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { WizardFormData } from "../types";
import { detectBrandFromUrl, BrandInfo } from "../utils/brand-detection";
import { fetchBrandData, extractDomainFromEmail, shouldFetchBrandData } from "@/utils/brandfetch";
import { cx } from "@/utils/cx";

interface Step2BrandingProps {
  formData: WizardFormData;
  errors: Partial<WizardFormData>;
  onInputChange: (field: keyof WizardFormData) => (value: any) => void;
  onNext: () => void;
  onBack: () => void;
  onLogoSelect: (logoUrl: string | null) => void;
}

const PRESET_COLORS = [
  "#6366f1", // Indigo
  "#8b5cf6", // Violet  
  "#ec4899", // Pink
  "#ef4444", // Red
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#6b7280"  // Gray
];

export const Step2Branding = ({
  formData,
  errors,
  onInputChange,
  onNext,
  onBack,
  onLogoSelect
}: Step2BrandingProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [detectedBrand, setDetectedBrand] = useState<BrandInfo | null>(() => {
    // Initialize with saved brand data if available
    const savedBrandData = sessionStorage.getItem('signup-brand-data');
    if (savedBrandData) {
      try {
        const brandData = JSON.parse(savedBrandData);
        if (brandData?.name && brandData?.domain) {
          return {
            name: brandData.name,
            logo: brandData.icon || brandData.logo || '',
            primaryColor: brandData.colors?.[0] || '#6366f1',
            domain: brandData.domain
          };
        }
      } catch (error) {
        console.error('Error parsing saved brand data:', error);
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedColors, setSuggestedColors] = useState<string[]>(() => {
    // Initialize with brand colors if available
    const savedBrandData = sessionStorage.getItem('signup-brand-data');
    if (savedBrandData) {
      try {
        const brandData = JSON.parse(savedBrandData);
        if (brandData?.colors && Array.isArray(brandData.colors)) {
          const colorHexes = brandData.colors.map((color: any) => {
            if (typeof color === 'object' && color.hex) {
              return color.hex;
            } else if (typeof color === 'string') {
              return color;
            }
            return null;
          }).filter(Boolean);
          return colorHexes.slice(0, 6);
        }
      } catch (error) {
        console.error('Error parsing saved brand colors:', error);
      }
    }
    return [];
  });
  const [suggestedLogos, setSuggestedLogos] = useState<string[]>(() => {
    // Initialize with brand logo if available
    const savedBrandData = sessionStorage.getItem('signup-brand-data');
    if (savedBrandData) {
      try {
        const brandData = JSON.parse(savedBrandData);
        if (brandData.logos && Array.isArray(brandData.logos)) {
          const logoUrls: string[] = [];
          brandData.logos.forEach((logoGroup: any) => {
            if (logoGroup.formats && Array.isArray(logoGroup.formats)) {
              const svgFormat = logoGroup.formats.find((f: any) => f.format === 'svg');
              const pngFormat = logoGroup.formats.find((f: any) => f.format === 'png');
              const bestFormat = svgFormat || pngFormat || logoGroup.formats[0];
              if (bestFormat && bestFormat.src) {
                logoUrls.push(bestFormat.src);
              }
            }
          });
          return logoUrls.slice(0, 8);
        } else {
          const logo = brandData?.icon || brandData?.logo;
          if (logo) {
            return [logo];
          }
        }
      } catch (error) {
        console.error('Error parsing saved brand logo:', error);
      }
    }
    return [];
  });

  // Store full logo metadata for display
  const [logoMetadata, setLogoMetadata] = useState<any[]>(() => {
    const savedBrandData = sessionStorage.getItem('signup-brand-data');
    if (savedBrandData) {
      try {
        const brandData = JSON.parse(savedBrandData);
        return brandData.logos || [];
      } catch (error) {
        console.error('Error parsing saved logo metadata:', error);
      }
    }
    return [];
  });
  const [selectedLogoUrl, setSelectedLogoUrl] = useState<string | null>(() => {
    // Initialize with brand logo if available
    const savedBrandData = sessionStorage.getItem('signup-brand-data');
    if (savedBrandData) {
      try {
        const brandData = JSON.parse(savedBrandData);
        const logo = brandData?.icon || brandData?.logo;
        if (logo) {
          // Also set the logo in the parent component
          setTimeout(() => onLogoSelect(logo), 0);
          return logo;
        }
      } catch (error) {
        console.error('Error parsing saved brand logo:', error);
      }
    }
    return null;
  });

  // State to track if user is editing URL (to show cancel option)
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  // Check if we have existing brand data (to conditionally show/hide website input)
  const hasBrandData = detectedBrand !== null || suggestedColors.length > 0 || suggestedLogos.length > 0;

  // Initialize primary color from brand data on mount
  useEffect(() => {
    if (detectedBrand && detectedBrand.primaryColor && formData.primaryColor === '#6366f1') {
      onInputChange('primaryColor')(detectedBrand.primaryColor);
    }
  }, [detectedBrand, formData.primaryColor, onInputChange]);

  const handleUrlChange = (value: any) => {
    // Handle both string values and React events
    let stringValue = '';
    
    if (typeof value === 'string') {
      stringValue = value;
    } else if (value && typeof value === 'object' && 'target' in value) {
      stringValue = value.target?.value || '';
    } else if (value === null || value === undefined) {
      stringValue = '';
    } else {
      stringValue = String(value);
    }
    
    onInputChange('websiteUrl')(stringValue);
  };

  const handleFetchBranding = async () => {
    const url = String(formData.websiteUrl || '').trim();
    if (!url) return;
    
    setIsLoading(true);
    
    try {
      // Use real brandfetch API
      const domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
      const brandData = await fetchBrandData(domain);
      
      if (brandData) {
        // Create BrandInfo object from fetched data
        const primaryColor = brandData.colors?.[0];
        const firstLogo = brandData.logos?.[0]?.formats?.[0]?.src || '';
        const brand: BrandInfo = {
          name: brandData.name || domain,
          logo: firstLogo,
          primaryColor: (typeof primaryColor === 'object' && primaryColor.hex) ? primaryColor.hex : (typeof primaryColor === 'string' ? primaryColor : '#6366f1'),
          domain: domain
        };
        
        setDetectedBrand(brand);
        
        // Set color suggestions from fetched data
        if (brandData.colors && Array.isArray(brandData.colors)) {
          const colorHexes = brandData.colors.map((color: any) => {
            // Handle both object format {hex: "#color"} and string format "#color"
            if (typeof color === 'object' && color.hex) {
              return color.hex;
            } else if (typeof color === 'string') {
              return color;
            }
            return '#6366f1'; // fallback color
          }).filter(Boolean);
          setSuggestedColors(colorHexes.slice(0, 6)); // Show more colors
        } else {
          setSuggestedColors([brand.primaryColor]);
        }
        
        // Set logo suggestions from all available logos
        if (brandData.logos && Array.isArray(brandData.logos)) {
          const logoUrls: string[] = [];
          
          // Process all logos and get the best format for each
          brandData.logos.forEach((logoGroup: any) => {
            if (logoGroup.formats && Array.isArray(logoGroup.formats)) {
              // Prefer SVG, then PNG, then other formats
              const svgFormat = logoGroup.formats.find((f: any) => f.format === 'svg');
              const pngFormat = logoGroup.formats.find((f: any) => f.format === 'png');
              const bestFormat = svgFormat || pngFormat || logoGroup.formats[0];
              
              if (bestFormat && bestFormat.src) {
                logoUrls.push(bestFormat.src);
              }
            }
          });
          
          setSuggestedLogos(logoUrls.slice(0, 8)); // Show up to 8 logos
          setLogoMetadata(brandData.logos); // Store full metadata
          
          // Set the first logo as selected by default
          if (logoUrls.length > 0) {
            setSelectedLogoUrl(logoUrls[0]);
            onLogoSelect(logoUrls[0]);
          }
        } else {
          // Fallback to old method - use safe type assertion
          const logos = (brandData.logos as unknown) as any[];
          if (logos && Array.isArray(logos) && logos.length > 0) {
            const firstLogoGroup = logos[0];
            if (firstLogoGroup && firstLogoGroup.formats && Array.isArray(firstLogoGroup.formats) && firstLogoGroup.formats.length > 0) {
              const logo = firstLogoGroup.formats[0]?.src;
              if (logo) {
                setSuggestedLogos([logo]);
                setSelectedLogoUrl(logo);
                onLogoSelect(logo);
              }
            }
          }
        }
        
        // Set primary color
        onInputChange('primaryColor')(brand.primaryColor);
      } else {
        // Fallback to mock detection if API fails
        const brand = detectBrandFromUrl(url);
        setDetectedBrand(brand);
        
        if (brand) {
          const baseColor = brand.primaryColor;
          setSuggestedColors([
            baseColor,
            adjustColorBrightness(baseColor, 20),
            adjustColorBrightness(baseColor, -20)
          ]);
          setSuggestedLogos([brand.logo]);
          setSelectedLogoUrl(brand.logo);
          onLogoSelect(brand.logo);
          onInputChange('primaryColor')(baseColor);
        }
      }
    } catch (error) {
      console.error('Error fetching brand data:', error);
      
      // Fallback to mock detection on error
      const brand = detectBrandFromUrl(url);
      setDetectedBrand(brand);
      
      if (brand) {
        const baseColor = brand.primaryColor;
        setSuggestedColors([
          baseColor,
          adjustColorBrightness(baseColor, 20),
          adjustColorBrightness(baseColor, -20)
        ]);
        setSuggestedLogos([brand.logo]);
        setSelectedLogoUrl(brand.logo);
        onLogoSelect(brand.logo);
        onInputChange('primaryColor')(baseColor);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to adjust color brightness
  const adjustColorBrightness = (hex: string, percent: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onInputChange('logo')(file);
      onInputChange('isManualBranding')(true);
    }
  };

  const handleManualToggle = () => {
    const newManualState = !formData.isManualBranding;
    onInputChange('isManualBranding')(newManualState);
    
    if (!newManualState && detectedBrand) {
      // Switch back to auto-detected branding
      onInputChange('primaryColor')(detectedBrand.primaryColor);
      onInputChange('logo')(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Auto-detection Section */}
      {!formData.isManualBranding && (
        <div className="bg-secondary border border-tertiary rounded-lg p-4 transition-all duration-200">
          {isLoading ? (
            /* Loading State - Organized */
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Loading01 className="w-5 h-5 text-brand-secondary animate-spin" />
                <span className="text-sm font-medium text-primary">Detecting branding...</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-tertiary rounded animate-pulse"></div>
                <div className="h-2 bg-quaternary rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          ) : hasBrandData && detectedBrand && !isEditingUrl ? (
            /* Detected Brand - Clean Layout */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">Detected branding</span>
                <button
                  onClick={() => setIsEditingUrl(true)}
                  className="text-xs text-brand-secondary hover:text-brand-secondary_hover underline underline-offset-1"
                >
                  Change URL
                </button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary rounded-lg border border-tertiary">
                {detectedBrand.logo && (
                  <img 
                    src={detectedBrand.logo} 
                    alt={detectedBrand.name}
                    className="w-8 h-8 object-contain"
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-primary">{detectedBrand.name}</div>
                  <div className="text-xs text-tertiary">{detectedBrand.domain}</div>
                </div>
              </div>
            </div>
          ) : (
            /* URL Input - Clean Layout */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">Auto-detect branding</span>
                {isEditingUrl && hasBrandData && detectedBrand && (
                  <button
                    onClick={() => setIsEditingUrl(false)}
                    className="text-xs text-tertiary hover:text-tertiary_hover underline underline-offset-1"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <InputGroup className="flex-1">
                  <InputGroup.Prefix>https://</InputGroup.Prefix>
                  <InputBase 
                    placeholder="acme.com"
                    value={String(formData.websiteUrl || '')}
                    onChange={handleUrlChange}
                    className="text-sm"
                  />
                </InputGroup>
                <Button
                  size="sm"
                  color="secondary"
                  onClick={() => {
                    handleFetchBranding();
                    setIsEditingUrl(false);
                  }}
                  disabled={!String(formData.websiteUrl || '').trim()}
                  iconLeading={Download01}
                  className="whitespace-nowrap"
                >
                  Fetch branding
                </Button>
              </div>
              <p className="text-xs text-tertiary">We'll automatically detect your logo and brand colors</p>
            </div>
          )}
        </div>
      )}
      
      {/* Unified Branding Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Brand Logo Card */}
        <div className="bg-primary border border-secondary rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-primary">Brand logo</h3>
          </div>

          {/* Logo Options */}
          <div>
              {/* Suggested Logos */}
              {suggestedLogos.length > 0 && !formData.isManualBranding && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {suggestedLogos.slice(0, 6).map((logoUrl, index) => {
                    const logoMeta = logoMetadata[index];
                    const logoType = logoMeta?.type || 'logo';
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedLogoUrl(logoUrl);
                          onLogoSelect(logoUrl);
                          onInputChange('logo')(null);
                        }}
                        className={cx(
                          "relative border-2 rounded-lg p-2 transition-all aspect-square flex items-center justify-center",
                          selectedLogoUrl === logoUrl
                            ? "border-brand-solid bg-brand-primary/5"
                            : "border-secondary hover:border-tertiary"
                        )}
                      >
                        <img 
                          src={logoUrl} 
                          alt={`${logoType} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                        {selectedLogoUrl === logoUrl && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-solid rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Manual Logo Upload */}
              {formData.isManualBranding && (
                <div
                  className={cx(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                    dragActive
                      ? "border-brand-solid bg-brand-primary/5"
                      : "border-tertiary hover:border-secondary"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {formData.logo ? (
                    <div className="space-y-2">
                      <img
                        src={URL.createObjectURL(formData.logo)}
                        alt="Logo preview"
                        className="w-16 h-16 object-contain rounded-lg mx-auto"
                      />
                      <button
                        onClick={() => onInputChange('logo')(null)}
                        className="text-xs text-brand-secondary hover:text-brand-secondary_hover"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload01 className="w-8 h-8 text-quaternary mx-auto" />
                      <p className="text-xs text-tertiary">Drop logo here or</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-brand-secondary hover:text-brand-secondary_hover font-medium"
                      >
                        Browse files
                      </button>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
        </div>

        {/* Brand Colors Card */}
        <div className="bg-primary border border-secondary rounded-lg p-4">
          <h3 className="text-sm font-medium text-primary mb-3">Brand colors</h3>
          
          {/* Suggested Colors */}
          {suggestedColors.length > 0 && !formData.isManualBranding && !isLoading && (
            <div className="mb-4">
              <p className="text-xs text-tertiary mb-2">Detected colors</p>
              <div className="flex gap-2 flex-wrap">
                {suggestedColors.slice(0, 6).map((color, index) => (
                  <button
                    key={color}
                    onClick={() => onInputChange('primaryColor')(color)}
                    className={cx(
                      "w-10 h-10 rounded-lg border-2 transition-all",
                      formData.primaryColor === color
                        ? "border-brand-solid scale-105"
                        : "border-secondary hover:border-tertiary"
                    )}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Manual Color Selection */}
          {(formData.isManualBranding || suggestedColors.length === 0) && !isLoading && (
            <div>
              <p className="text-xs text-tertiary mb-2">Choose primary color</p>
              
              {/* Preset Colors */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => onInputChange('primaryColor')(color)}
                    className={cx(
                      "w-10 h-10 rounded-lg border-2 transition-all",
                      formData.primaryColor === color
                        ? "border-brand-solid scale-105"
                        : "border-secondary hover:border-tertiary"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              {/* Custom Color Input */}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={String(formData.primaryColor)}
                  onChange={(e) => onInputChange('primaryColor')(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-secondary cursor-pointer"
                />
                <input
                  type="text"
                  value={String(formData.primaryColor)}
                  onChange={(e) => onInputChange('primaryColor')(e.target.value)}
                  className="flex-1 px-3 py-2 border border-secondary rounded-lg bg-primary text-primary text-sm"
                  placeholder="#6366f1"
                />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Helper Text */}
      <div className="text-center">
        <p className="text-xs text-tertiary">
          You can fine-tune colors and logo anytime in Settings.
        </p>
      </div>

      {/* Mode Toggle and Navigation */}
      <div className="flex justify-end items-center gap-6 pt-4">
        {/* Mode Toggle */}
        <button
          onClick={handleManualToggle}
          className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
        >
          {!formData.isManualBranding 
            ? "I want to set the brand manually" 
            : (hasBrandData ? "Use auto-detected" : "Auto-detect from URL")
          }
        </button>
        
        {/* Continue Button */}
        <Button
          iconTrailing={ArrowRight}
          onClick={onNext}
          size="sm"
        >
          Continue
        </Button>
      </div>
      
    </div>
  );
};