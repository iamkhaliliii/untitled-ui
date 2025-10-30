import React, { useState } from 'react';
import { Settings01, Users01, Grid01, List, ImageIndentLeft, ArrowUp, ArrowDown, User01, Award01, MessageSquare01, InfoCircle } from '@untitledui/icons';
import { Toggle } from '@/components/base/toggle/toggle';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';

export const MembersConfig: React.FC = () => {
  const { membersConfig, updateMembersConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  const { hideAdmins, sort, layout, showAvatar, showBadges, showMessageButton, showDetails } = membersConfig;

  // Section collapse/expand states
  const [sortExpanded, setSortExpanded] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);

  const sortOptions = [
    { id: 'alphabetic', label: 'Alphabetic', icon: Settings01 },
    { id: 'oldest', label: 'Oldest First', icon: ArrowDown },
    { id: 'newest', label: 'Newest First', icon: ArrowUp }
  ];

  const layoutOptions = [
    { id: 'list', label: 'List', icon: List },
    { id: 'card', label: 'Card', icon: Grid01 },
    { id: 'carousel', label: 'Carousel', icon: ImageIndentLeft }
  ];

  const PropertyToggle = ({ icon: Icon, label, isSelected, onChange, id }: {
    icon: React.ComponentType<any>;
    label: string;
    isSelected: boolean;
    onChange: (value: boolean) => void;
    id: string;
  }) => (
    <div className={cx(
      "flex items-center py-2 px-2 border rounded-md transition-all duration-300 ease-in-out",
      theme === 'dark' 
        ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
        : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
    )}>
      <div className="flex items-center space-x-2">
        <Icon className={cx(
          "h-4 w-4",
          theme === 'dark' ? "text-gray-400" : "text-gray-500"
        )} />
        <span className={cx(
          "text-sm font-medium",
          theme === 'dark' ? "text-gray-100" : "text-gray-900"
        )}>{label}</span>
      </div>
      <div className="ml-auto">
        <Toggle
          id={id}
          isSelected={isSelected}
          onChange={onChange}
          size="sm"
          slim
        />
      </div>
    </div>
  );

  const StyleTile = ({ option, isSelected, onClick }: {
    option: { id: string; label: string; icon: React.ComponentType<any> };
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const IconComponent = option.icon;
    return (
      <button
        onClick={onClick}
        className={cx(
          "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
          isSelected
            ? theme === 'dark'
              ? "border-brand-solid bg-brand-solid/20 text-brand-primary"
              : "border-brand-solid bg-brand-50 text-brand-secondary"
            : theme === 'dark'
              ? "border-gray-700 bg-gray-800/50 text-gray-200 hover:border-gray-600 hover:bg-gray-700/60"
              : "border-secondary bg-primary text-secondary hover:border-brand-200 hover:bg-brand-25"
        )}
      >
        <div className={cx(
          "p-2 rounded-md",
          isSelected 
            ? theme === 'dark' 
              ? "bg-brand-solid/30" 
              : "bg-brand-100"
            : theme === 'dark'
              ? "bg-gray-700/60"
              : "bg-secondary/60"
        )}>
          <IconComponent className="size-4" />
        </div>
        <span className="text-xs font-medium">{option.label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-2">
      {/* Layout Section */}
      <CustomizerSection
        title="Layout"
        isExpanded={layoutExpanded}
        onExpandedChange={setLayoutExpanded}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {layoutOptions.map((option) => (
              <StyleTile
                key={option.id}
                option={option}
                isSelected={layout === option.id}
                onClick={() => updateMembersConfig({ layout: option.id as any })}
              />
            ))}
          </div>

          {/* Hide Admins Toggle */}
          <PropertyToggle
            icon={Settings01}
            label="Hide Admins and Staff"
            isSelected={hideAdmins}
            onChange={(value) => updateMembersConfig({ hideAdmins: value })}
            id="hide-admins"
          />
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className={cx(
        "border-t",
        theme === 'dark' ? "border-gray-700" : "border-secondary"
      )}></div>

      {/* Sort Section */}
      <CustomizerSection
        title="Sort"
        isExpanded={sortExpanded}
        onExpandedChange={setSortExpanded}
      >
        <div className="grid grid-cols-3 gap-2">
          {sortOptions.map((option) => (
            <StyleTile
              key={option.id}
              option={option}
              isSelected={sort === option.id}
              onClick={() => updateMembersConfig({ sort: option.id as any })}
            />
          ))}
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className={cx(
        "border-t",
        theme === 'dark' ? "border-gray-700" : "border-secondary"
      )}></div>

      {/* Properties Section */}
      <CustomizerSection
        title="Properties"
        isExpanded={propertiesExpanded}
        onExpandedChange={setPropertiesExpanded}
      >
        <div className="space-y-2">
          <PropertyToggle
            icon={User01}
            label="Member Avatar"
            isSelected={showAvatar}
            onChange={(value) => updateMembersConfig({ showAvatar: value })}
            id="show-avatar"
          />

          <PropertyToggle
            icon={Award01}
            label="Member Badges"
            isSelected={showBadges}
            onChange={(value) => updateMembersConfig({ showBadges: value })}
            id="show-badges"
          />

          <PropertyToggle
            icon={MessageSquare01}
            label="Message Button"
            isSelected={showMessageButton}
            onChange={(value) => updateMembersConfig({ showMessageButton: value })}
            id="show-message-button"
          />

          <PropertyToggle
            icon={InfoCircle}
            label="Member Details"
            isSelected={showDetails}
            onChange={(value) => updateMembersConfig({ showDetails: value })}
            id="show-details"
          />
        </div>
      </CustomizerSection>
    </div>
  );
};

