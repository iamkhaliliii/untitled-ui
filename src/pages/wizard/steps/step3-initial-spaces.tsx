import { ArrowLeft, Check, MessageChatCircle, File01, Users01, HelpCircle, Calendar, Lightbulb01, Rocket01, Folder, AlertCircle, AlertTriangle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { WizardFormData } from "../types";
import { SPACE_OPTIONS } from "../constants";
import { cx } from "@/utils/cx";

interface Step3InitialSpacesProps {
  formData: WizardFormData;
  errors: Partial<WizardFormData>;
  onInputChange: (field: keyof WizardFormData) => (value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3InitialSpaces = ({
  formData,
  errors,
  onInputChange,
  onNext,
  onBack
}: Step3InitialSpacesProps) => {
  const handleSpaceToggle = (spaceId: string) => {
    const currentSpaces = formData.selectedSpaces;
    const isSelected = currentSpaces.includes(spaceId);
    
    if (isSelected) {
      onInputChange('selectedSpaces')(currentSpaces.filter(id => id !== spaceId));
    } else {
      onInputChange('selectedSpaces')([...currentSpaces, spaceId]);
    }
  };

  const groupedSpaces = SPACE_OPTIONS.reduce((groups, space) => {
    const category = space.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(space);
    return groups;
  }, {} as Record<string, typeof SPACE_OPTIONS>);

  const categoryTitles = {
    discussion: "Discussion",
    content: "Content",
    collaboration: "Collaboration", 
    support: "Support"
  };

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
    <div className="space-y-6">
      

      {/* Error Message */}
      {errors.selectedSpaces && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {errors.selectedSpaces}
        </div>
      )}

      {/* Spaces by Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Column 1: Discussion */}
        {groupedSpaces.discussion && (
          <div>
            <h3 className="text-xs font-medium text-tertiary mb-2">
              {categoryTitles.discussion}
            </h3>
            <div className="space-y-2">
              {groupedSpaces.discussion.map((space) => {
                const isSelected = formData.selectedSpaces.includes(space.id);
                const IconComponent = getSpaceIcon(space.id);
                
                return (
                  <button
                    key={space.id}
                    onClick={() => handleSpaceToggle(space.id)}
                    className={cx(
                      "flex items-start gap-2 p-2 rounded-md border text-left transition-all w-full h-14",
                      isSelected
                        ? "bg-brand-primary_alt border-brand-solid"
                        : "bg-primary border-tertiary hover:border-secondary hover:bg-secondary"
                    )}
                  >
                    <IconComponent className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-primary truncate">
                          {space.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-brand-solid flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-tertiary leading-tight line-clamp-2">{space.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Column 2: Content */}
        {groupedSpaces.content && (
          <div>
            <h3 className="text-xs font-medium text-tertiary mb-2">
              {categoryTitles.content}
            </h3>
            <div className="space-y-2">
              {groupedSpaces.content.map((space) => {
                const isSelected = formData.selectedSpaces.includes(space.id);
                const IconComponent = getSpaceIcon(space.id);
                
                return (
                  <button
                    key={space.id}
                    onClick={() => handleSpaceToggle(space.id)}
                    className={cx(
                      "flex items-start gap-2 p-2 rounded-md border text-left transition-all w-full h-14",
                      isSelected
                        ? "bg-brand-primary_alt border-brand-solid"
                        : "bg-primary border-tertiary hover:border-secondary hover:bg-secondary"
                    )}
                  >
                    <IconComponent className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-primary truncate">
                          {space.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-brand-solid flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-tertiary leading-tight line-clamp-2">{space.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Collaboration */}
        {groupedSpaces.collaboration && (
          <div>
            <h3 className="text-xs font-medium text-tertiary mb-2">
              {categoryTitles.collaboration}
            </h3>
            <div className="space-y-2">
              {groupedSpaces.collaboration.map((space) => {
                const isSelected = formData.selectedSpaces.includes(space.id);
                const IconComponent = getSpaceIcon(space.id);
                
                return (
                  <button
                    key={space.id}
                    onClick={() => handleSpaceToggle(space.id)}
                    className={cx(
                      "flex items-start gap-2 p-2 rounded-md border text-left transition-all w-full h-14",
                      isSelected
                        ? "bg-brand-primary_alt border-brand-solid"
                        : "bg-primary border-tertiary hover:border-secondary hover:bg-secondary"
                    )}
                  >
                    <IconComponent className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-primary truncate">
                          {space.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-brand-solid flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-tertiary leading-tight line-clamp-2">{space.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Support */}
        {groupedSpaces.support && (
          <div>
            <h3 className="text-xs font-medium text-tertiary mb-2">
              {categoryTitles.support}
            </h3>
            <div className="space-y-2">
              {groupedSpaces.support.map((space) => {
                const isSelected = formData.selectedSpaces.includes(space.id);
                const IconComponent = getSpaceIcon(space.id);
                
                return (
                  <button
                    key={space.id}
                    onClick={() => handleSpaceToggle(space.id)}
                    className={cx(
                      "flex items-start gap-2 p-2 rounded-md border text-left transition-all w-full h-14",
                      isSelected
                        ? "bg-brand-primary_alt border-brand-solid"
                        : "bg-primary border-tertiary hover:border-secondary hover:bg-secondary"
                    )}
                  >
                    <IconComponent className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-primary truncate">
                          {space.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-brand-solid flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-tertiary leading-tight line-clamp-2">{space.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Selection Hint */}
      <div className="text-center">
        <p className="text-xs text-tertiary">
          2–5 spaces recommended for a clean start.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          size="sm"
          isDisabled={formData.selectedSpaces.length === 0}
        >
          Create my community
        </Button>
      </div>
      
    </div>
  );
};
