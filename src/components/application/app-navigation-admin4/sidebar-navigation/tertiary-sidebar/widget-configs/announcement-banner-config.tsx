import React, { useState } from 'react';
import { Settings01, AlertTriangle, InfoCircle, X, Square, Zap } from '@untitledui/icons';
import { Input } from '@/components/base/input/input';
import { Toggle } from '@/components/base/toggle/toggle';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';

export const AnnouncementBannerConfig: React.FC = () => {
  const { announcementBannerConfig, updateAnnouncementBannerConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  const { title, url, style, showIcon, showCloseButton } = announcementBannerConfig;

  // Section collapse/expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);

  const styleOptions = [
    { id: 'primary', label: 'Primary', icon: Zap },
    { id: 'natural', label: 'Natural', icon: Square },
    { id: 'warning', label: 'Warning', icon: AlertTriangle },
    { id: 'error', label: 'Error', icon: X },
    { id: 'info', label: 'Info', icon: InfoCircle }
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
      {/* Basic Section */}
      <CustomizerSection
        title="Basic"
        isExpanded={infoExpanded}
        onExpandedChange={setInfoExpanded}
      >
        <div className="space-y-4">
          <div>
            <Input
              label="Title"
              id="banner-title"
              value={title}
              onChange={(value) => updateAnnouncementBannerConfig({ title: value })}
              placeholder="Enter announcement title"
            />
          </div>
          
          <div>
            <Input
              label="URL"
              id="banner-url"
              value={url}
              onChange={(value) => updateAnnouncementBannerConfig({ url: value })}
              placeholder="Enter link URL"
            />
          </div>
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className={cx(
        "border-t",
        theme === 'dark' ? "border-gray-700" : "border-secondary"
      )}></div>

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
                  onClick={() => updateAnnouncementBannerConfig({ style: option.id as 'primary' | 'natural' | 'warning' | 'error' | 'info' })}
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
            onChange={(value) => updateAnnouncementBannerConfig({ showIcon: value })}
            id="show-icon"
          />

          <PropertyToggle
            icon={X}
            label="Close Button"
            isSelected={showCloseButton}
            onChange={(value) => updateAnnouncementBannerConfig({ showCloseButton: value })}
            id="show-close-button"
          />
        </div>
      </CustomizerSection>
    </div>
  );
};

