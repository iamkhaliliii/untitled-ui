import { WizardFormData } from "../types";
import { SPACE_OPTIONS } from "../constants";
import { MessageChatCircle, File01, Users01, HelpCircle, Calendar, Lightbulb01, Rocket01, Folder, AlertCircle, AlertTriangle } from "@untitledui/icons";

interface CommunityPreviewProps {
  formData: WizardFormData;
  currentStep: number;
  selectedLogoUrl?: string | null;
}

export const CommunityPreview = ({ formData, currentStep, selectedLogoUrl }: CommunityPreviewProps) => {
  const selectedSpaceOptions = SPACE_OPTIONS.filter(space => 
    formData.selectedSpaces.includes(space.id)
  );

  const getSpaceIcon = (spaceId: string) => {
    const iconMap: Record<string, any> = {
      "general-discussion": MessageChatCircle,
      "qa": HelpCircle,
      "feedback": Lightbulb01,
      "announcements": AlertCircle,
      "blog": File01,
      "events": Calendar,
      "projects": Rocket01,
      "resources": Folder,
      "help-support": HelpCircle,
      "bug-reports": AlertTriangle
    };
    return iconMap[spaceId] || MessageChatCircle;
  };

  return (
    <div className="w-full h-full flex items-stretch justify-center p-2 sm:p-4 lg:p-6">
      
      {/* Browser Mockup */}
      <div className="bg-white border border-secondary rounded-xl shadow-lg overflow-hidden w-full h-full min-h-[400px] flex flex-col">
        
        {/* Browser Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-2 sm:px-4 py-2 sm:py-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="bg-white border border-gray-200 rounded-md px-2 sm:px-3 py-1 text-xs text-gray-500 truncate">
            {formData.communityName ? 
              `${formData.communityName.toLowerCase().replace(/\s+/g, '')}.community` : 
              "yourcommunity.community"
            }
          </div>
        </div>

        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-3 sm:gap-4 flex-shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentStep >= 2 && (formData.logo || selectedLogoUrl) ? (
              <img 
                src={formData.logo ? URL.createObjectURL(formData.logo) : selectedLogoUrl!} 
                alt="Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded-lg flex-shrink-0"
              />
            ) : (
              <div 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0"
                style={{ 
                  backgroundColor: currentStep >= 2 && formData.primaryColor ? formData.primaryColor : '#6b7280'
                }}
              >
                <span>
                  {currentStep >= 1 && formData.communityName ? 
                    formData.communityName.charAt(0).toUpperCase() : 
                    "C"
                  }
                </span>
              </div>
            )}
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {currentStep >= 1 && formData.communityName ? 
                  formData.communityName : 
                  "Community"
                }
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-md bg-gray-50 text-xs placeholder-gray-400 focus:outline-none"
                placeholder="Search..."
                disabled
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Action 1 */}
            <div className="w-7 h-7 bg-gray-100 rounded-md"></div>
            {/* Action 2 */}
            <div className="w-7 h-7 bg-gray-100 rounded-md"></div>
            {/* Action 3 */}
            <div className="w-7 h-7 bg-gray-100 rounded-md"></div>
            {/* Action 4 */}
            <div className="w-7 h-7 bg-gray-100 rounded-md"></div>
            {/* Avatar */}
            <div className="w-7 h-7 bg-gray-300 rounded-full ml-1"></div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-1 bg-white min-h-0">
          
          {/* Sidebar */}
          <div className="w-48 sm:w-56 lg:w-64 bg-gray-50 border-r border-gray-200 p-2 sm:p-3 lg:p-4 flex flex-col flex-shrink-0">
            {/* Navigation/Spaces */}
            <div className="space-y-1 flex-1 overflow-y-auto">
              
              {/* Default Feed space - Selected */}
              <div 
                className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm rounded-md flex-shrink-0 cursor-pointer transition-colors"
                style={{
                  backgroundColor: currentStep >= 2 && formData.primaryColor 
                    ? `${formData.primaryColor}15` 
                    : '#f3f4f6',
                  borderColor: currentStep >= 2 && formData.primaryColor 
                    ? `${formData.primaryColor}30` 
                    : '#e5e7eb'
                }}
              >
                <svg 
                  className="w-4 h-4 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{
                    color: currentStep >= 2 && formData.primaryColor 
                      ? formData.primaryColor 
                      : '#6b7280'
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="truncate font-medium text-gray-700">Feed</span>
              </div>
              
              {/* Selected spaces grouped by category */}
              {currentStep >= 3 && (() => {
                const categoryTitles = {
                  discussion: "Discussion",
                  content: "Content", 
                  collaboration: "Collaboration",
                  support: "Support"
                };
                
                const groupedSelectedSpaces = selectedSpaceOptions.reduce((groups, space) => {
                  const category = space.category;
                  if (!groups[category]) {
                    groups[category] = [];
                  }
                  groups[category].push(space);
                  return groups;
                }, {} as Record<string, typeof selectedSpaceOptions>);

                return Object.entries(groupedSelectedSpaces).map(([category, spaces]) => (
                  <div key={category} className="mt-3">
                    <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1 flex-shrink-0">
                      {categoryTitles[category as keyof typeof categoryTitles]}
                    </div>
                    {spaces.map((space) => {
                      const IconComponent = getSpaceIcon(space.id);
                      
                      return (
                        <div 
                          key={space.id}
                          className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm rounded-md transition-colors flex-shrink-0 cursor-pointer hover:bg-gray-50"
                        >
                          <IconComponent 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{
                              color: currentStep >= 2 && formData.primaryColor 
                                ? formData.primaryColor 
                                : '#6b7280'
                            }}
                          />
                          <span className="truncate font-medium text-gray-700">{space.name}</span>
                        </div>
                      );
                    })}
                  </div>
                ));
              })()}
              
              {/* Placeholder spaces if none selected */}
              {(currentStep < 3 || selectedSpaceOptions.length === 0) && (
                <>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm text-gray-400 rounded-md flex-shrink-0">
                    <div className="w-4 h-4 bg-gray-100 rounded flex-shrink-0"></div>
                    <div className="w-16 h-3 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm text-gray-400 rounded-md flex-shrink-0">
                    <div className="w-4 h-4 bg-gray-100 rounded flex-shrink-0"></div>
                    <div className="w-20 h-3 bg-gray-100 rounded"></div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto min-w-0">
            
            {/* Hero Banner */}
            <div 
              className="mb-4 sm:mb-6 rounded-lg p-4 sm:p-5 relative overflow-hidden"
              style={{
                background: currentStep >= 2 && formData.primaryColor 
                  ? `linear-gradient(135deg, ${formData.primaryColor}15 0%, ${formData.primaryColor}08 100%)`
                  : 'linear-gradient(135deg, #6b728015 0%, #6b728008 100%)'
              }}
            >
              {/* Background Pattern */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, ${currentStep >= 2 && formData.primaryColor ? formData.primaryColor : '#6b7280'} 2px, transparent 0), radial-gradient(circle at 75px 75px, ${currentStep >= 2 && formData.primaryColor ? formData.primaryColor : '#6b7280'} 2px, transparent 0)`,
                  backgroundSize: '100px 100px'
                }}
              ></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ 
                      backgroundColor: currentStep >= 2 && formData.primaryColor ? formData.primaryColor : '#6b7280'
                    }}
                  ></div>
                  <div 
                    className="w-16 h-2 rounded"
                    style={{
                      backgroundColor: currentStep >= 2 && formData.primaryColor 
                        ? `${formData.primaryColor}15` 
                        : '#f3f4f6'
                    }}
                  ></div>
                </div>
                
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {currentStep >= 1 && formData.communityName ? (
                    <>
                      Welcome to{" "}
                      <span 
                        className="bg-gradient-to-r bg-clip-text text-transparent font-extrabold"
                        style={{
                          backgroundImage: currentStep >= 2 && formData.primaryColor 
                            ? `linear-gradient(135deg, ${formData.primaryColor} 0%, ${formData.primaryColor}CC 100%)`
                            : 'linear-gradient(135deg, #6b7280 0%, #6b7280CC 100%)'
                        }}
                      >
                        {formData.communityName}
                      </span>
                    </>
                  ) : (
                    "Build Something Amazing Together"
                  )}
                </h1>
                
                <div className="space-y-2 max-w-xl">
                  <div 
                    className="w-full h-3 rounded"
                    style={{
                      backgroundColor: currentStep >= 2 && formData.primaryColor 
                        ? `${formData.primaryColor}15` 
                        : '#f3f4f6'
                    }}
                  ></div>
                  <div 
                    className="w-4/5 h-3 rounded"
                    style={{
                      backgroundColor: currentStep >= 2 && formData.primaryColor 
                        ? `${formData.primaryColor}15` 
                        : '#f3f4f6'
                    }}
                  ></div>
                  <div 
                    className="w-3/5 h-3 rounded"
                    style={{
                      backgroundColor: currentStep >= 2 && formData.primaryColor 
                        ? `${formData.primaryColor}15` 
                        : '#f3f4f6'
                    }}
                  ></div>
                </div>
                
                {/* CTA Button */}
                <div className="mt-4">
                  <div 
                    className="w-20 h-7 rounded-md shadow-sm"
                    style={{
                      backgroundColor: currentStep >= 2 && formData.primaryColor ? formData.primaryColor : '#6b7280'
                    }}
                  >
                  </div>
                </div>
              </div>
            </div>

            {/* Feed Posts */}
            <div className="space-y-4">
              {/* Post 1 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: currentStep >= 2 && formData.primaryColor 
                        ? `${formData.primaryColor}15` 
                        : '#d1d5db'
                    }}
                  ></div>
                  <div className="flex-1">
                    <div 
                      className="w-28 h-3 rounded mb-1"
                      style={{
                        backgroundColor: currentStep >= 2 && formData.primaryColor 
                          ? `${formData.primaryColor}20` 
                          : '#d1d5db'
                      }}
                    ></div>
                    <div className="w-16 h-2 bg-gray-100 rounded"></div>
                  </div>
                  <div className="w-5 h-5 bg-gray-100 rounded"></div>
                </div>
                
                {/* Post Content */}
                <div className="mb-3">
                  <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                  <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
                </div>
                
                {/* Post Image/Media */}
                <div 
                  className="w-full h-24 rounded-lg mb-3"
                  style={{
                    backgroundColor: currentStep >= 2 && formData.primaryColor 
                      ? `${formData.primaryColor}20` 
                      : '#e5e7eb'
                  }}
                ></div>
                
                {/* Post Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-100 rounded"></div>
                      <div className="w-6 h-2 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-100 rounded"></div>
                      <div className="w-6 h-2 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-100 rounded"></div>
                      <div className="w-8 h-2 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                </div>
              </div>
              
              {/* Post 2 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: currentStep >= 2 && formData.primaryColor 
                        ? `${formData.primaryColor}15` 
                        : '#d1d5db'
                    }}
                  ></div>
                  <div className="flex-1">
                    <div 
                      className="w-32 h-3 rounded mb-1"
                      style={{
                        backgroundColor: currentStep >= 2 && formData.primaryColor 
                          ? `${formData.primaryColor}20` 
                          : '#d1d5db'
                      }}
                    ></div>
                    <div className="w-20 h-2 bg-gray-100 rounded"></div>
                  </div>
                  <div className="w-5 h-5 bg-gray-100 rounded"></div>
                </div>
                
                {/* Post Content */}
                <div className="mb-3">
                  <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                  <div className="w-3/4 h-3 bg-gray-100 rounded mb-2"></div>
                </div>
                
                {/* Post Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{
                          backgroundColor: currentStep >= 2 && formData.primaryColor 
                            ? `${formData.primaryColor}15` 
                            : '#e5e7eb'
                        }}
                      ></div>
                      <div className="w-8 h-2 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-100 rounded"></div>
                      <div className="w-6 h-2 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-100 rounded"></div>
                      <div className="w-10 h-2 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};
