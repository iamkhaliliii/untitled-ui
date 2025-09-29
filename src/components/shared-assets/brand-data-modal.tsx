import { X, Building02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { BrandData } from "@/utils/brandfetch";
import { cx } from "@/utils/cx";
import { getAllIndustries } from "@/utils/industry-mapping";

interface BrandDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandData: BrandData | null;
  isLoading: boolean;
}

export const BrandDataModal = ({ isOpen, onClose, brandData, isLoading }: BrandDataModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-primary rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden border border-secondary">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary bg-tertiary/30">
          <div>
            <h2 className="text-xl font-semibold text-primary">Company Information</h2>
            <p className="text-sm text-tertiary mt-1">Powered by Brandfetch</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors group"
          >
            <X className="w-5 h-5 text-tertiary group-hover:text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-140px)]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-secondary border-t-transparent"></div>
              <span className="mt-4 text-tertiary font-medium">Loading company information...</span>
            </div>
          ) : brandData ? (
            <div className="p-6 space-y-8">
              {/* Brand Header */}
              <div className="text-center">
                {brandData.logos && brandData.logos[0]?.formats?.[0]?.src && (
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center p-3">
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
                  </div>
                )}
                <h3 className="text-2xl font-bold text-primary mb-2">{brandData.name}</h3>
                <p className="text-brand-secondary font-medium">{brandData.domain}</p>
                {brandData.description && (
                  <p className="text-tertiary mt-3 max-w-2xl mx-auto leading-relaxed">{brandData.description}</p>
                )}
              </div>

              {/* Brand Assets Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Colors */}
                {brandData.colors && brandData.colors.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
                      Brand Colors
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {brandData.colors.slice(0, 6).map((color, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                          <div
                            className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div>
                            <span className="text-sm font-mono text-primary">{color.hex}</span>
                            <p className="text-xs text-tertiary capitalize">{color.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Company Info */}
                {brandData.company && (
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
                      Company Details
                    </h4>
                    <div className="space-y-3">
                      {brandData.company.employees && (
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <span className="text-tertiary font-medium">Team Size</span>
                          <span className="font-semibold text-primary">{brandData.company.employees} employees</span>
                        </div>
                      )}
                      {brandData.company.foundedYear && (
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <span className="text-tertiary font-medium">Founded</span>
                          <span className="font-semibold text-primary">{brandData.company.foundedYear}</span>
                        </div>
                      )}
                      {brandData.company.location && (
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <span className="text-tertiary font-medium">Location</span>
                          <span className="font-semibold text-primary">
                            {[brandData.company.location.city, brandData.company.location.state, brandData.company.location.country]
                              .filter(Boolean)
                              .join(', ')}
                          </span>
                        </div>
                      )}
                      {brandData.company.industries && brandData.company.industries.length > 0 && (
                        <div className="p-3 bg-secondary rounded-lg">
                          <span className="text-tertiary font-medium block mb-2">Industries</span>
                          <div className="flex flex-wrap gap-2">
                            {brandData.company.industries.slice(0, 3).map((industry, index) => {
                              // Find the emoji from our industries data
                              const allIndustries = getAllIndustries();
                              const industryData = allIndustries.find(ind => 
                                ind.name.toLowerCase() === industry.name.toLowerCase() ||
                                ind.id.toString() === industry.id
                              );
                              
                              return (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-brand-secondary/10 text-brand-secondary rounded-md text-sm font-medium"
                                >
                                  {industryData?.emoji && <span>{industryData.emoji}</span>}
                                  {industry.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Industries Section */}
              {brandData.company?.industries && brandData.company.industries.length > 3 && (
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
                    Industry Focus
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brandData.company.industries.map((industry, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-brand-secondary/5 transition-colors"
                      >
                        {(() => {
                          // Find the emoji from our industries data
                          const allIndustries = getAllIndustries();
                          const industryData = allIndustries.find(ind => 
                            ind.name.toLowerCase() === industry.name.toLowerCase() ||
                            ind.id.toString() === industry.id
                          );
                          return industryData?.emoji && (
                            <span className="text-xl">{industryData.emoji}</span>
                          );
                        })()}
                        <div className="flex-1">
                          <span className="font-medium text-primary">{industry.name}</span>
                          {industry.score && (
                            <div className="w-full bg-tertiary rounded-full h-1.5 mt-1">
                              <div
                                className="bg-brand-secondary h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${industry.score * 100}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Assets */}
              {(brandData.fonts && brandData.fonts.length > 0) || (brandData.images && brandData.images.length > 0) ? (
                <div className="grid grid-cols-1 gap-8">
                  {/* Fonts */}
                  {brandData.fonts && brandData.fonts.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
                        Typography
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {brandData.fonts.slice(0, 4).map((font, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                            <span className="font-semibold text-primary">{font.name}</span>
                            <span className="text-sm text-tertiary capitalize px-2 py-1 bg-tertiary rounded">{font.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Brand Images */}
                  {brandData.images && brandData.images.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
                        Brand Assets
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {brandData.images.slice(0, 4).map((image, index) => {
                          const imageUrl = image.formats?.[0]?.src;
                          if (!imageUrl) return null;
                          
                          return (
                            <div key={index} className="aspect-video bg-secondary rounded-lg overflow-hidden border border-primary">
                              <img
                                src={imageUrl}
                                alt={`${brandData.name} ${image.type}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Social Links */}
              {brandData.links && brandData.links.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
                    Connect
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {brandData.links.slice(0, 4).map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-secondary rounded-lg hover:bg-brand-secondary/10 hover:border-brand-secondary border border-transparent transition-all duration-200 text-center group"
                      >
                        <span className="font-semibold text-primary capitalize group-hover:text-brand-secondary transition-colors">
                          {link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-4">
                <Building02 className="w-8 h-8 text-tertiary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">No Brand Data Found</h3>
              <p className="text-tertiary text-center max-w-sm">We couldn't find brand information for this domain. It might be a new company or not in our database.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-secondary bg-tertiary/20">
          <Button
            onClick={onClose}
            className="w-full"
            size="md"
            color="secondary"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
