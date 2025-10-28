import React, { useState } from 'react';
import { BarChart03, Users01, Globe05, Home01, Calendar, Edit03 } from '@untitledui/icons';
import { Input } from '@/components/base/input/input';
import { Select } from '@/components/base/select/select';
import { Toggle } from '@/components/base/toggle/toggle';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';

export const LeaderboardConfig: React.FC = () => {
  const { leaderboardConfig, updateLeaderboardConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  const { title, source, numberOfMembers, defaultTab, showScore, excludeAdminsModerators } = leaderboardConfig;

  // Section collapse/expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);

  const sourceOptions = [
    { id: 'all_spaces', label: 'All Spaces', icon: Globe05 },
    { id: 'current_space', label: 'Current Space', icon: Home01 },
    { id: 'event', label: 'Event', icon: Calendar },
    { id: 'blog', label: 'Blog', icon: Edit03 }
  ];

  const defaultTabOptions = [
    { id: 'all_time', label: 'All Time', icon: Globe05 },
    { id: 'month', label: 'Month', icon: Calendar },
    { id: 'week', label: 'Week', icon: Calendar }
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
              id="leaderboard-title"
              value={title}
              onChange={(value) => updateLeaderboardConfig({ title: value })}
              placeholder="Enter leaderboard title"
            />
          </div>
          
          <div>
            <Select
              label="Source"
              items={sourceOptions}
              selectedKey={source}
              onSelectionChange={(key) => updateLeaderboardConfig({ source: key as 'all_spaces' | 'current_space' | 'event' | 'blog' })}
            >
              {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
            </Select>
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
        <div className="space-y-4">
          <div>
            <Input
              label="Number of Members"
              id="number-of-members"
              type="number"
              value={numberOfMembers.toString()}
              onChange={(value) => updateLeaderboardConfig({ numberOfMembers: parseInt(value) || 5 })}
              placeholder="5"
            />
          </div>
          
          <div>
            <Select
              label="Default Tab"
              items={defaultTabOptions}
              selectedKey={defaultTab}
              onSelectionChange={(key) => updateLeaderboardConfig({ defaultTab: key as 'all_time' | 'month' | 'week' })}
            >
              {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
            </Select>
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
            icon={BarChart03}
            label="Show Score"
            isSelected={showScore}
            onChange={(value) => updateLeaderboardConfig({ showScore: value })}
            id="show-score"
          />

          <PropertyToggle
            icon={Users01}
            label="Exclude Admins & Moderators"
            isSelected={excludeAdminsModerators}
            onChange={(value) => updateLeaderboardConfig({ excludeAdminsModerators: value })}
            id="exclude-admins-moderators"
          />
        </div>
      </CustomizerSection>
    </div>
  );
};

