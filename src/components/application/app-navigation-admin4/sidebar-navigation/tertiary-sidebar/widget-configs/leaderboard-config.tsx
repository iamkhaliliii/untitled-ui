import React, { useState, useEffect } from 'react';
import { Settings01, Users01, Grid01, Calendar, Star01, Hash01, DotsGrid } from '@untitledui/icons';
import { Input } from '@/components/base/input/input';
import { Toggle } from '@/components/base/toggle/toggle';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';

export const LeaderboardConfig: React.FC = () => {
  const { leaderboardConfig, updateLeaderboardConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  const { source, numberOfMembers, excludeAdmins, tabView, allTab, monthTab, weekTab, showScore } = leaderboardConfig;

  // Section collapse/expand states
  const [sourceExpanded, setSourceExpanded] = useState(true);
  const [tabExpanded, setTabExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);

  // Tab views state - sync with config
  const [tabViews, setTabViews] = useState([
    { id: 'all', label: 'All Time', enabled: allTab },
    { id: 'month', label: 'This Month', enabled: monthTab },
    { id: 'week', label: 'This Week', enabled: weekTab }
  ]);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);

  // Sync tabViews with config
  useEffect(() => {
    setTabViews([
      { id: 'all', label: 'All Time', enabled: allTab },
      { id: 'month', label: 'This Month', enabled: monthTab },
      { id: 'week', label: 'This Week', enabled: weekTab }
    ]);
  }, [allTab, monthTab, weekTab]);

  // Update config whenever tabViews change
  useEffect(() => {
    const allTabItem = tabViews.find(t => t.id === 'all');
    const monthTabItem = tabViews.find(t => t.id === 'month');
    const weekTabItem = tabViews.find(t => t.id === 'week');
    
    updateLeaderboardConfig({
      allTab: allTabItem?.enabled ?? true,
      monthTab: monthTabItem?.enabled ?? true,
      weekTab: weekTabItem?.enabled ?? true
    });

    // If current tab is disabled, switch to first enabled
    const enabledTabs = tabViews.filter(tab => tab.enabled);
    const currentTab = tabViews.find(tab => tab.id === tabView);
    if (currentTab && !currentTab.enabled && enabledTabs.length > 0) {
      updateLeaderboardConfig({ tabView: enabledTabs[0].id as any });
    }
  }, [tabViews]);

  // Tab handlers
  const handleToggleTab = (tabId: string) => {
    if (tabId === 'all') return; // All Time tab can't be disabled
    
    setTabViews(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, enabled: !tab.enabled } : tab
    ));
  };

  const handleRenameTab = (tabId: string, newLabel: string) => {
    setTabViews(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, label: newLabel } : tab
    ));
  };

  const sourceOptions = [
    { id: 'all', label: 'All', icon: Users01 },
    { id: 'current', label: 'Current Space', icon: Grid01 }
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

  const TabViewItem = ({ tab, onToggle, onRename }: {
    tab: { id: string; label: string; enabled: boolean };
    onToggle: (tabId: string) => void;
    onRename: (tabId: string, newLabel: string) => void;
  }) => {
    const isEditing = editingTabId === tab.id;
    const [editLabel, setEditLabel] = useState(tab.label);

    useEffect(() => {
      setEditLabel(tab.label);
    }, [tab.label]);

    const handleRename = () => {
      onRename(tab.id, editLabel);
      setEditingTabId(null);
    };

    const handleStartEdit = () => {
      setEditingTabId(tab.id);
      setEditLabel(tab.label);
    };

    const handleCancelEdit = () => {
      setEditLabel(tab.label);
      setEditingTabId(null);
    };

    return (
      <div className={cx(
        "flex items-center px-2 py-2 border rounded-lg transition-all duration-200",
        theme === 'dark' 
          ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
          : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
      )}>
        <DotsGrid className={cx(
          "size-4 mr-3 cursor-grab",
          theme === 'dark' ? "text-gray-500" : "text-gray-400"
        )} />

        <div className="flex-1">
          {isEditing ? (
            <Input
              value={editLabel}
              onChange={(value) => setEditLabel(value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
                if (e.key === 'Escape') handleCancelEdit();
              }}
              size="sm"
              autoFocus
            />
          ) : (
            <span 
              className={cx(
                "text-sm font-medium cursor-pointer",
                theme === 'dark' ? "text-gray-100" : "text-gray-900"
              )}
              onDoubleClick={handleStartEdit}
            >
              {tab.label}
            </span>
          )}
        </div>

        <div className="mr-2">
          <Toggle
            isSelected={tab.enabled}
            onChange={() => onToggle(tab.id)}
            size="sm"
            slim
            isDisabled={tab.id === 'all'}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {/* Source Section */}
      <CustomizerSection
        title="Source"
        isExpanded={sourceExpanded}
        onExpandedChange={setSourceExpanded}
      >
        <div className="space-y-4">
          <div>
            <div className="grid grid-cols-2 gap-2">
              {sourceOptions.map((option) => (
                <StyleTile
                  key={option.id}
                  option={option}
                  isSelected={source === option.id}
                  onClick={() => updateLeaderboardConfig({ source: option.id as any })}
                />
              ))}
            </div>
          </div>

          {/* Number of Members */}
          <Input
            label="Number of members"
            type="number"
            value={numberOfMembers.toString()}
            onChange={(value) => updateLeaderboardConfig({ numberOfMembers: parseInt(value) || 5 })}
            placeholder="5"
          />

          {/* Exclude Admins Toggle */}
          <PropertyToggle
            icon={Settings01}
            label="Exclude Admins & Moderators"
            isSelected={excludeAdmins}
            onChange={(value) => updateLeaderboardConfig({ excludeAdmins: value })}
            id="exclude-admins"
          />
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className={cx(
        "border-t",
        theme === 'dark' ? "border-gray-700" : "border-secondary"
      )}></div>

      {/* Tab Views Section */}
      <CustomizerSection
        title="Tab views"
        isExpanded={tabExpanded}
        onExpandedChange={setTabExpanded}
      >
        <div className="space-y-1.5">
          {tabViews.map((tab) => (
            <TabViewItem
              key={tab.id}
              tab={tab}
              onToggle={handleToggleTab}
              onRename={handleRenameTab}
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
            icon={Hash01}
            label="Show Score"
            isSelected={showScore}
            onChange={(value) => updateLeaderboardConfig({ showScore: value })}
            id="show-score"
          />
        </div>
      </CustomizerSection>
    </div>
  );
};
