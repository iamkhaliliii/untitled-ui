import React, { useState, useEffect } from 'react';
import { useListData } from "react-stately";
import { Calendar, ChevronDown, ChevronUp, Grid01, Rows02, Dotpoints02, DotsGrid, User02, Monitor01, Square, Maximize01, Minimize01, CheckCircle, Image01 } from '@untitledui/icons';
import { Input } from '@/components/base/input/input';
import { TextArea } from '@/components/base/textarea/textarea';
import { Select } from '@/components/base/select/select';
import { Toggle } from '@/components/base/toggle/toggle';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';

interface EventsListConfigProps {
  onTabConfigChange?: (isTabConfig: boolean, tabLabel?: string) => void;
}

export const EventsListConfig: React.FC<EventsListConfigProps> = ({ onTabConfigChange }) => {
  const { eventsListConfig, updateEventsListConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  // Use config from context
  const { 
    style, 
    cardSize, 
    cardStyle, 
    reactionsCounter, 
    rsvpAction, 
    eventDetails, 
    hostInfo, 
    coverImage,
    attended,
    tabView,
    allEventsTab,
    upcomingEventsTab,
    pastEventsTab,
    thisMonthEventsTab,
    title,
    description,
    eventSource
  } = eventsListConfig;
  
  // Section collapse/expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [tabViewsExpanded, setTabViewsExpanded] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);

  // Tab views state - initialize based on current config
  const [tabViews, setTabViews] = useState([
    { id: 'all', label: 'All', enabled: allEventsTab },
    { id: 'upcoming', label: 'Upcoming', enabled: upcomingEventsTab },
    { id: 'past', label: 'Past', enabled: pastEventsTab }
  ]);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);

  // Update tabView and individual tab configs whenever tabViews change
  useEffect(() => {
    const enabledTabsCount = tabViews.filter(tab => tab.enabled).length;
    const allTab = tabViews.find(tab => tab.id === 'all');
    const upcomingTab = tabViews.find(tab => tab.id === 'upcoming');
    const pastTab = tabViews.find(tab => tab.id === 'past');
    
    updateEventsListConfig({ 
      tabView: enabledTabsCount > 1,
      allEventsTab: allTab?.enabled || false,
      upcomingEventsTab: upcomingTab?.enabled || false,
      pastEventsTab: pastTab?.enabled || false
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabViews]);

  // Tab views handlers
  const handleToggleTab = (tabId: string) => {
    // Prevent disabling the "All" tab
    if (tabId === 'all') return;
    
    setTabViews(prev => {
      const updatedTabs = prev.map(tab => 
        tab.id === tabId ? { ...tab, enabled: !tab.enabled } : tab
      );
      
      return updatedTabs;
    });
  };

  const handleRenameTab = (tabId: string, newLabel: string) => {
    setTabViews(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, label: newLabel } : tab
    ));
  };

  const styleOptions = [
    { id: 'card', label: 'Card', icon: Grid01 },
    { id: 'list', label: 'List', icon: Dotpoints02 },
    { id: 'feed', label: 'Feed', icon: Rows02 }
  ];

  const cardSizeOptions = [
    { id: 'small', label: 'Small', icon: Minimize01 },
    { id: 'medium', label: 'Medium', icon: Square },
    { id: 'large', label: 'Large', icon: Maximize01 },
    { id: 'extralarge', label: 'Extra Large', icon: Monitor01 }
  ];

  const cardStyleOptions = [
    { id: 'modern', label: 'Modern Style', icon: Calendar },
    { id: 'simple', label: 'Simple Card', icon: Square }
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

    // Update editLabel when tab.label changes or when entering edit mode
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
        {/* Drag Handle */}
        <DotsGrid className={cx(
          "size-4 mr-3 cursor-grab",
          theme === 'dark' ? "text-gray-500" : "text-gray-400"
        )} />

        {/* Label */}
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

        {/* Toggle */}
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
      {/* Info Section */}
      <CustomizerSection
        title="Info"
        isExpanded={infoExpanded}
        onExpandedChange={setInfoExpanded}
      >
        <div className="space-y-3">
          <div>
            <Input
              label='Widget Title'
              id="widget-title"
              value={title}
              onChange={(value) => updateEventsListConfig({ title: value })}
              placeholder="Enter widget title"
            />
          </div>

          <div>
            <TextArea
              label='Description'
              id="description"
              value={description}
              onChange={(e) => updateEventsListConfig({ description: e.target.value })}
              placeholder="Enter widget description"
              rows={3}
            />
          </div>
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className={cx(
        "border-t",
        theme === 'dark' ? "border-gray-700" : "border-secondary"
      )}></div>

      {/* Tab Views Section - Hidden when specific_events is selected */}
      {eventSource !== 'specific_events' && (
        <>
          <CustomizerSection
            title="Tab views"
            isExpanded={tabViewsExpanded}
            onExpandedChange={setTabViewsExpanded}
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
          <div className="border-t border-secondary"></div>
        </>
      )}

      {/* Layout Section */}
      <CustomizerSection
        title="Layout"
        isExpanded={layoutExpanded}
        onExpandedChange={setLayoutExpanded}
      >
        <div className="space-y-4">
          <div>
            <div className="grid grid-cols-3 gap-2">
              {styleOptions.map((option) => (
                <StyleTile
                  key={option.id}
                  option={option}
                  isSelected={style === option.id}
                  onClick={() => updateEventsListConfig({ style: option.id as 'card' | 'list' | 'feed' | 'carousel' })}
                />
              ))}
            </div>
          </div>

          {style === 'card' && (
            <>
              <div>
                <Select 
                  label="Card Size"
                  items={cardSizeOptions} 
                  selectedKey={cardSize}
                  onSelectionChange={(key) => updateEventsListConfig({ cardSize: key as 'small' | 'medium' | 'large' | 'extralarge' })}
                >
                  {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                </Select>
              </div>

              <div>
                <Select 
                  label="Card Style"
                  items={cardStyleOptions} 
                  selectedKey={cardStyle}
                  onSelectionChange={(key) => updateEventsListConfig({ cardStyle: key as 'modern' | 'simple' })}
                >
                  {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                </Select>
              </div>
            </>
          )}
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
          {!(style === 'card' && cardStyle === 'modern') && (
            <PropertyToggle
              icon={Image01}
              label="Event cover"
              isSelected={coverImage}
              onChange={(value) => updateEventsListConfig({ coverImage: value })}
              id="cover-image"
            />
          )}
          <PropertyToggle
            icon={Calendar}
            label="Event details"
            isSelected={eventDetails}
            onChange={(value) => updateEventsListConfig({ eventDetails: value })}
            id="event-details"
          />

          <PropertyToggle
            icon={User02}
            label="Host info"
            isSelected={hostInfo}
            onChange={(value) => updateEventsListConfig({ hostInfo: value })}
            id="host-info"
          />

          <PropertyToggle
            icon={CheckCircle}
            label="Attended"
            isSelected={attended}
            onChange={(value) => updateEventsListConfig({ attended: value })}
            id="attended"
          />
        </div>
      </CustomizerSection>
    </div>
  );
};

