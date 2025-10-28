import React, { useState } from 'react';
import { Settings01, MessageSquare01, BarChart03, Users01, Image01, PlayCircle, Plus, Square, Maximize01, Zap } from '@untitledui/icons';
import { Toggle } from '@/components/base/toggle/toggle';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';

export const SpaceHeaderConfig: React.FC = () => {
  const { spaceHeaderConfig, updateSpaceHeaderConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  const { style, showDescription, showIcon, showStats, showMembers, actionAddPost, showActions } = spaceHeaderConfig;

  // Section collapse/expand states
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);

  const styleOptions = [
    { id: 'simple', label: 'Simple', icon: Square },
    { id: 'color', label: 'Color', icon: Zap },
    { id: 'image', label: 'Image', icon: Image01 },
    { id: 'video', label: 'Video', icon: PlayCircle },
    { id: 'gradient', label: 'Gradient', icon: Maximize01 }
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
      {/* Style Section */}
      <CustomizerSection
        title="Style"
        isExpanded={layoutExpanded}
        onExpandedChange={setLayoutExpanded}
      >
        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-3 gap-2">
              {styleOptions.map((option) => (
                <StyleTile
                  key={option.id}
                  option={option}
                  isSelected={style === option.id}
                  onClick={() => updateSpaceHeaderConfig({ style: option.id as 'simple' | 'color' | 'image' | 'video' | 'gradient' })}
                />
              ))}
            </div>
          </div>
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
            icon={Settings01}
            label="Icon"
            isSelected={showIcon}
            onChange={(value) => updateSpaceHeaderConfig({ showIcon: value })}
            id="show-icon"
          />

          <PropertyToggle
            icon={MessageSquare01}
            label="Description"
            isSelected={showDescription}
            onChange={(value) => updateSpaceHeaderConfig({ showDescription: value })}
            id="show-description"
          />

          <PropertyToggle
            icon={BarChart03}
            label="Stats"
            isSelected={showStats}
            onChange={(value) => updateSpaceHeaderConfig({ showStats: value })}
            id="show-stats"
          />

          <PropertyToggle
            icon={Users01}
            label="Members"
            isSelected={showMembers}
            onChange={(value) => updateSpaceHeaderConfig({ showMembers: value })}
            id="show-members"
          />

          <PropertyToggle
            icon={Plus}
            label="Action: Add post"
            isSelected={actionAddPost}
            onChange={(value) => updateSpaceHeaderConfig({ actionAddPost: value })}
            id="action-add-post"
          />

          <PropertyToggle
            icon={Settings01}
            label="Actions"
            isSelected={showActions}
            onChange={(value) => updateSpaceHeaderConfig({ showActions: value })}
            id="show-actions"
          />
        </div>
      </CustomizerSection>
    </div>
  );
};

