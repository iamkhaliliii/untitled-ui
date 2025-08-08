import React, { useState, useEffect } from 'react';
import { useListData } from "react-stately";
import { ArrowLeft, Settings01, Heart, Calendar, Eye, InfoCircle, LayoutAlt01, Code01, ChevronDown, ChevronUp, Grid01, List, Rows02, Dotpoints02, DotsGrid, User02, Monitor01, Square, Maximize01, Minimize01, CheckCircle, Database01, Zap, Menu01, Plus, Globe05, Home01, DotsHorizontal, Edit03, Copy01, Trash01, MessageSquare01, BarChart03, Users01, Image01, PlayCircle } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Label } from '@/components/base/input/label';
import { TextArea } from '@/components/base/textarea/textarea';
import { Select } from '@/components/base/select/select';
import { MultiSelect } from '@/components/base/select/multi-select';
import { Toggle } from '@/components/base/toggle/toggle';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';

interface SpaceItem {
  label: string;
  id: string;
  supportingText: string;
  avatarUrl: string;
  icon?: React.FC | React.ReactNode;
}

interface WidgetConfigProps {
  selectedWidget: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  };
  onBack: () => void;
  onSave: () => void;
  onTabConfigChange?: (isTabConfig: boolean, tabLabel?: string) => void;
}

const WidgetConfig: React.FC<WidgetConfigProps> = ({ selectedWidget, onBack, onSave, onTabConfigChange }) => {
  const { eventsListConfig, updateEventsListConfig, spaceHeaderConfig, updateSpaceHeaderConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  // Use config from context
  const { 
    style, 
    cardSize, 
    cardStyle, 
    groupView, 
    groupBy, 
    reactionsCounter, 
    rsvpAction, 
    eventDetails, 
    hostInfo, 
    coverImage,
    tabView,
    allEventsTab,
    upcomingEventsTab,
    pastEventsTab,
    thisMonthEventsTab,
    title,
    description,
    eventSource,
    selectedSpaces
  } = eventsListConfig;
  
  // Section collapse/expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [tabViewsExpanded, setTabViewsExpanded] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);
  const [sourceExpanded, setSourceExpanded] = useState(true);
  const [customCSSExpanded, setCustomCSSExpanded] = useState(true);

  // Selected spaces for MultiSelect
  const selectedSpacesItems = useListData<SpaceItem>({
    initialItems: [],
  });

  // Initialize selectedSpacesItems with current config
  useEffect(() => {
    const currentItems = selectedSpaces.map(id => spacesData.find(space => space.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
    
    // Only update if different
    const currentIds = selectedSpacesItems.items.map(item => item.id);
    if (JSON.stringify(currentIds.sort()) !== JSON.stringify(selectedSpaces.sort())) {
      // Clear and repopulate
      if (selectedSpacesItems.items.length > 0) {
        selectedSpacesItems.remove(...selectedSpacesItems.items.map(item => item.id));
      }
      if (currentItems.length > 0) {
        selectedSpacesItems.append(...currentItems);
      }
    }
  }, [selectedSpaces]);

  // Handle item insertion
  const handleSpaceInserted = (key: React.Key) => {
    const newSelectedSpaces = [...selectedSpaces, key.toString()];
    updateEventsListConfig({ selectedSpaces: newSelectedSpaces });
  };

  // Handle item removal
  const handleSpaceCleared = (key: React.Key) => {
    const newSelectedSpaces = selectedSpaces.filter(id => id !== key.toString());
    updateEventsListConfig({ selectedSpaces: newSelectedSpaces });
  };

  // Tab views state - initialize based on current config
  const [tabViews, setTabViews] = useState([
    { id: 'all', label: 'All', enabled: allEventsTab },
    { id: 'upcoming', label: 'Upcoming', enabled: upcomingEventsTab },
    { id: 'past', label: 'Past', enabled: pastEventsTab }
  ]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  // Tab configuration view state
  const [isTabConfigView, setIsTabConfigView] = useState(false);
  const [currentConfigTab, setCurrentConfigTab] = useState<{ id: string; label: string } | null>(null);
  
  // Filter items expanded state
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set(['tags', 'start_date_time']));

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

  const handleDuplicateTab = (tabId: string) => {
    const tabToDuplicate = tabViews.find(tab => tab.id === tabId);
    if (tabToDuplicate) {
      const newTab = {
        ...tabToDuplicate,
        id: `${tabId}_copy_${Date.now()}`,
        label: `${tabToDuplicate.label} Copy`,
        enabled: false
      };
      setTabViews(prev => [...prev, newTab]);
    }
  };

  const handleDeleteTab = (tabId: string) => {
    setTabViews(prev => prev.filter(tab => tab.id !== tabId));
  };

  const handleAddView = () => {
    const newTab = {
      id: `view_${Date.now()}`,
      label: 'New View',
      enabled: false
    };
    setTabViews(prev => [...prev, newTab]);
  };

  const handleConfigTab = (tabId: string) => {
    const tab = tabViews.find(t => t.id === tabId);
    if (tab) {
      setCurrentConfigTab({ id: tab.id, label: tab.label });
      setIsTabConfigView(true);
      onTabConfigChange?.(true, tab.label);
    }
  };

  const handleBackFromConfig = () => {
    setIsTabConfigView(false);
    setCurrentConfigTab(null);
    onTabConfigChange?.(false);
  };

  // Toggle filter expansion
  const toggleFilterExpanded = (filterId: string) => {
    setExpandedFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(filterId)) {
        newSet.delete(filterId);
      } else {
        newSet.add(filterId);
      }
      return newSet;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId && !(event.target as Element).closest('.relative')) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdownId]);

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
    { id: 'modern', label: 'Modern Style', icon: Zap },
    { id: 'simple', label: 'Simple Card', icon: Square }
  ];

  const eventSourceOptions = [
    { id: 'all_spaces', label: 'All spaces', icon: Globe05 },
    { id: 'current_space', label: 'Current space', icon: Home01 },
    { id: 'specific_spaces', label: 'Specific spaces', icon: Settings01 }
  ];

  const spacesData: SpaceItem[] = [
    {
      label: "General Discussion",
      id: "general",
      supportingText: "",
      avatarUrl: "",
      icon: MessageSquare01,
    },
    { 
      label: "Product Updates", 
      id: "product", 
      supportingText: "", 
      avatarUrl: "",
      icon: BarChart03,
    },
    {
      label: "Technical Support",
      id: "support",
      supportingText: "",
      avatarUrl: "",
      icon: Settings01,
    },
    { 
      label: "Feature Requests", 
      id: "features", 
      supportingText: "", 
      avatarUrl: "",
      icon: Plus,
    }
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
      <div
        className={cx(
          "flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105",
          isSelected 
            ? theme === 'dark'
              ? 'border-brand-solid bg-brand-solid/20 text-brand-primary shadow-md'
              : 'border-brand-solid bg-brand-50 text-brand-primary shadow-md'
            : theme === 'dark'
              ? 'border-gray-700 bg-gray-800 text-gray-200 hover:border-gray-600 hover:bg-gray-700 hover:shadow-sm'
              : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
        )}
        onClick={onClick}
      >
        <IconComponent className="h-6 w-6 mb-2" />
        <span className="text-sm font-medium">{option.label}</span>
      </div>
    );
  };

  const TabViewItem = ({ tab, onToggle, onRename, onConfig, onDuplicate, onDelete }: {
    tab: { id: string; label: string; enabled: boolean };
    onToggle: (tabId: string) => void;
    onRename: (tabId: string, newLabel: string) => void;
    onConfig: (tabId: string) => void;
    onDuplicate: (tabId: string) => void;
    onDelete: (tabId: string) => void;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editLabel, setEditLabel] = useState(tab.label);
    const isDropdownOpen = openDropdownId === tab.id;

    const handleRename = () => {
      onRename(tab.id, editLabel);
      setIsEditing(false);
      setOpenDropdownId(null);
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
                if (e.key === 'Escape') {
                  setEditLabel(tab.label);
                  setIsEditing(false);
                }
              }}
              size="sm"
              autoFocus
            />
          ) : (
            <span className={cx(
              "text-sm font-medium",
              theme === 'dark' ? "text-gray-100" : "text-gray-900"
            )}>
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
          />
        </div>

        {/* More Actions */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdownId(isDropdownOpen ? null : tab.id)}
            className={cx(
              "p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              theme === 'dark' ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <DotsHorizontal className="size-4" />
          </button>

          {isDropdownOpen && (
            <div className={cx(
              "absolute right-0 mt-1 w-36 rounded-md shadow-lg z-10",
              theme === 'dark' ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
            )}>
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setOpenDropdownId(null);
                  }}
                  className={cx(
                    "flex items-center w-full px-3 py-2 text-sm transition-colors",
                    theme === 'dark' 
                      ? "text-gray-200 hover:bg-gray-700 hover:text-gray-100"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Edit03 className="size-3 mr-2" />
                  Rename
                </button>
                <button
                  onClick={() => {
                    onConfig(tab.id);
                    setOpenDropdownId(null);
                  }}
                  className={cx(
                    "flex items-center w-full px-3 py-2 text-sm transition-colors",
                    theme === 'dark' 
                      ? "text-gray-200 hover:bg-gray-700 hover:text-gray-100"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Settings01 className="size-3 mr-2" />
                  Config
                </button>
                <button
                  onClick={() => {
                    onDuplicate(tab.id);
                    setOpenDropdownId(null);
                  }}
                  className={cx(
                    "flex items-center w-full px-3 py-2 text-sm transition-colors",
                    theme === 'dark' 
                      ? "text-gray-200 hover:bg-gray-700 hover:text-gray-100"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Copy01 className="size-3 mr-2" />
                  Duplicate
                </button>
                {tab.id !== 'all' && (
                  <button
                    onClick={() => {
                      onDelete(tab.id);
                      setOpenDropdownId(null);
                    }}
                    className={cx(
                      "flex items-center w-full px-3 py-2 text-sm transition-colors",
                      theme === 'dark' 
                        ? "text-red-400 hover:bg-red-900/20 hover:text-red-300"
                        : "text-red-600 hover:bg-red-50 hover:text-red-700"
                    )}
                  >
                    <Trash01 className="size-3 mr-2" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SectionHeader = ({ icon: Icon, title, isExpanded, onToggle }: {
    icon: React.ComponentType<any>;
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
  }) => (
    <div 
      className={`flex items-center justify-between mb-2 pb-2 cursor-pointer ${
        isExpanded ? 'border-b border-secondary' : ''
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-brand-secondary" />
        <h5 className="text-xs font-semibold text-primary">{title}</h5>
      </div>
      {isExpanded ? (
        <ChevronUp className="size-4 text-brand-secondary" />
      ) : (
        <ChevronDown className={cx(
          "size-4",
          theme === 'dark' ? "text-gray-400" : "text-gray-400"
        )} />
      )}
    </div>
  );

  const renderTabConfigView = () => {
    if (!currentConfigTab) return null;

    return (
      <div className="p-4 transition-all duration-300 ease-in-out">
        {/* Header with Back Button */}
        <div className="mb-6">
          {/* Back Button Row */}
          <div className="mb-3">
            <Button
              size="sm"
              color="secondary"
              iconLeading={ArrowLeft}
              onClick={handleBackFromConfig}
            />
          </div>
          
          {/* Title Row */}
          <div>
            <h2 className={cx(
              "text-lg font-semibold",
              theme === 'dark' ? "text-gray-100" : "text-gray-900"
            )}>
              "{currentConfigTab.label}" Tab Config
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {/* Filters Section */}
          <div className="space-y-2">
            {/* Filter Title */}
            <div className="px-2">
              <div>
                <h3 className={cx(
                  "text-sm font-semibold",
                  theme === 'dark' ? "text-gray-100" : "text-gray-900"
                )}>
                  <div className="flex justify-between items-center">
                    Fixed filters
                    <div className="text-sm font-normal">
                      <a className={cx(
                        "cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring",
                        theme === 'dark' 
                          ? "text-blue-400 hover:text-blue-300 ring-blue-400" 
                          : "text-blue-600 hover:text-blue-700 ring-blue-600"
                      )}>
                        Clear
                      </a>
                    </div>
                  </div>
                </h3>
                <p className={cx(
                  "text-sm mt-1",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  These filters are applied to all the content.
                </p>
              </div>
            </div>
            
            <div className="h-px bg-secondary"></div>
            
            {/* Filter Items */}
            {['Tags', 'Spaces', 'Title', 'Author', 'Published date', 'Start Date & Time', 'End Date & Time', 'Location Type', 'Location', 'Hosts'].map((filterName, index) => (
              <div key={filterName}>
                <div className="space-y-1 -mx-2">
                  <button
                    onClick={() => toggleFilterExpanded(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', ''))}
                    className={cx(
                      "w-full flex items-center text-start rounded-base focus:outline-none focus-visible:ring ring-inset ring-offset-0 font-medium py-2 px-2 text-md transition-colors",
                      theme === 'dark' 
                        ? "text-gray-100 bg-transparent hover:text-gray-50 hover:bg-gray-800/50" 
                        : "text-gray-900 bg-transparent hover:text-gray-800 hover:bg-gray-50"
                    )}
                  >
                    <span className="flex-grow truncate">
                      <div className="flex space-x-1 flex-1 truncate justify-between items-center">
                        <span className={cx(
                          "font-semibold",
                          (filterName === 'Tags' || filterName === 'Start Date & Time') && expandedFilters.has(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', ''))
                            ? theme === 'dark' ? "text-blue-400" : "text-blue-600"
                            : theme === 'dark' ? "text-gray-100" : "text-gray-900"
                        )}>
                          {filterName}
                        </span>
                        {(filterName === 'Tags' || filterName === 'Start Date & Time') && expandedFilters.has(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', '')) && (
                          <span className="inline-block shrink-0 rounded-full h-2 w-2 bg-blue-500"></span>
                        )}
                      </div>
                    </span>
                    <ChevronDown className={cx(
                      "h-5 w-5 transform transition-all ease-in-out duration-150 flex-shrink-0 ms-2",
                      (filterName === 'Tags' || filterName === 'Start Date & Time') && expandedFilters.has(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', '')) ? "rotate-180" : "",
                      theme === 'dark' ? "text-gray-400" : "text-gray-500"
                    )} />
                  </button>
                </div>
                {index < 9 && <div className="h-px bg-secondary"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderEventsListConfig = () => (
    <div className="space-y-4">
      {/* Info Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={InfoCircle}
          title="Info"
          isExpanded={infoExpanded}
          onToggle={() => setInfoExpanded(!infoExpanded)}
        />
        {infoExpanded && (
          <div className="bg-secondary/20 rounded-lg p-2">
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
          </div>
        )}
      </div>

      {/* Source Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={Database01}
          title="Source"
          isExpanded={sourceExpanded}
          onToggle={() => setSourceExpanded(!sourceExpanded)}
        />
        {sourceExpanded && (
          <div className="bg-secondary/20 rounded-lg p-3">
            <div className="space-y-4">
              <div>
                <Select 
                  label="Event source"
                  items={eventSourceOptions} 
                  selectedKey={eventSourceOptions.find(option => option.id === eventSource) ? eventSource : 'all_spaces'}
                  onSelectionChange={(key) => updateEventsListConfig({ 
                    eventSource: key as 'all_spaces' | 'current_space' | 'specific_spaces',
                    selectedSpaces: key === 'specific_spaces' ? selectedSpaces : []
                  })}
                >
                  {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                </Select>
              </div>

              {eventSource === 'specific_spaces' && (
                <div>
                  <MultiSelect
                    selectedItems={selectedSpacesItems}
                    label="Select spaces"
                    hint="Choose which spaces to include events from"
                    placeholder="Search spaces"
                    items={spacesData}
                    onItemInserted={handleSpaceInserted}
                    onItemCleared={handleSpaceCleared}
                  >
                    {(item) => (
                      <MultiSelect.Item 
                        id={item.id} 
                        icon={item.icon}
                      >
                        {item.label}
                      </MultiSelect.Item>
                    )}
                  </MultiSelect>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tab Views Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={Menu01}
          title="Tab views"
          isExpanded={tabViewsExpanded}
          onToggle={() => setTabViewsExpanded(!tabViewsExpanded)}
        />
        {tabViewsExpanded && (
          <div className="bg-secondary/20 rounded-lg p-3">
            <div className="space-y-3">
              {tabViews.map((tab) => (
                <TabViewItem
                  key={tab.id}
                  tab={tab}
                  onToggle={handleToggleTab}
                  onRename={handleRenameTab}
                  onConfig={handleConfigTab}
                  onDuplicate={handleDuplicateTab}
                  onDelete={handleDeleteTab}
                />
              ))}
              
              {/* Add View Button */}
              <Button
                onClick={handleAddView}
                size="sm"
                color="secondary"
                iconLeading={Plus}
                className="w-full mt-3"
              >
                Add view
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Layout Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={LayoutAlt01}
          title="Layout"
          isExpanded={layoutExpanded}
          onToggle={() => setLayoutExpanded(!layoutExpanded)}
        />
        {layoutExpanded && (
          <div className="bg-secondary/20 rounded-lg p-3">
            <div className="space-y-6">
              <div>
                <Label htmlFor="style">Style</Label>
                <div className="grid grid-cols-3 gap-2">
                  {styleOptions.map((option) => (
                    <StyleTile
                      key={option.id}
                      option={option}
                      isSelected={style === option.id}
                      onClick={() => updateEventsListConfig({ style: option.id as 'card' | 'list' | 'feed' })}
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
          </div>
        )}
      </div>

      {/* Properties Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={Eye}
          title="Properties"
          isExpanded={propertiesExpanded}
          onToggle={() => setPropertiesExpanded(!propertiesExpanded)}
        />
        {propertiesExpanded && (
          <div className="bg-secondary/20 rounded-lg p-1">
            <div className="space-y-2">
              {!(style === 'card' && cardStyle === 'modern') && (
                <PropertyToggle
                  icon={Monitor01}
                  label="Cover image"
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
                icon={Heart}
                label="Reactions counter"
                isSelected={reactionsCounter}
                onChange={(value) => updateEventsListConfig({ reactionsCounter: value })}
                id="reactions-counter"
              />
              
              {!(style === 'card' && cardStyle === 'modern') && (
                <PropertyToggle
                  icon={CheckCircle}
                  label="RSVP Action"
                  isSelected={rsvpAction}
                  onChange={(value) => updateEventsListConfig({ rsvpAction: value })}
                  id="rsvp-action"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSpaceHeaderConfig = () => {
    const { style, showDescription, showIcon, showStats, showMembers, actionAddPost, showActions } = spaceHeaderConfig;

    const styleOptions = [
      { id: 'simple', label: 'Simple', icon: Square },
      { id: 'color', label: 'Color', icon: Zap },
      { id: 'image', label: 'Image', icon: Image01 },
      { id: 'video', label: 'Video', icon: PlayCircle },
      { id: 'gradient', label: 'Gradient', icon: Maximize01 }
    ];

    return (
      <div className="space-y-4">
        {/* Style Section */}
        <div className="border border-secondary rounded-lg bg-primary p-2">
          <SectionHeader
            icon={LayoutAlt01}
            title="Style"
            isExpanded={layoutExpanded}
            onToggle={() => setLayoutExpanded(!layoutExpanded)}
          />
          {layoutExpanded && (
            <div className="bg-secondary/20 rounded-lg p-3">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="style">Header Style</Label>
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
            </div>
          )}
        </div>

        {/* Properties Section */}
        <div className="border border-secondary rounded-lg bg-primary p-2">
          <SectionHeader
            icon={Eye}
            title="Properties"
            isExpanded={propertiesExpanded}
            onToggle={() => setPropertiesExpanded(!propertiesExpanded)}
          />
          {propertiesExpanded && (
            <div className="bg-secondary/20 rounded-lg p-1">
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
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDefaultConfig = () => (
    <div className="space-y-4">
      {/* Info Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={InfoCircle}
          title="Info"
          isExpanded={infoExpanded}
          onToggle={() => setInfoExpanded(!infoExpanded)}
        />
        {infoExpanded && (
          <div className="bg-secondary/20 rounded-lg p-2">
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
                <Label htmlFor="description">Description</Label>
                <TextArea
                  id="description"
                  value={description}
                  onChange={(e) => updateEventsListConfig({ description: e.target.value })}
                  placeholder="Enter widget description"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Layout Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={LayoutAlt01}
          title="Layout"
          isExpanded={layoutExpanded}
          onToggle={() => setLayoutExpanded(!layoutExpanded)}
        />
        {layoutExpanded && (
          <div className="bg-secondary/20 rounded-lg p-3">
            <div className="space-y-4">
              <div>
                <Label htmlFor="max-items">Max Items</Label>
                <Input
                  id="max-items"
                  type="number"
                  defaultValue="10"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={Code01}
          title="Custom CSS"
          isExpanded={customCSSExpanded}
          onToggle={() => setCustomCSSExpanded(!customCSSExpanded)}
        />
        {customCSSExpanded && (
          <div className="bg-secondary/20 rounded-lg p-3">
            <div className="space-y-4">
              <div>
                <TextArea
                  placeholder="Enter custom CSS styles..."
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {isTabConfigView ? (
        renderTabConfigView()
      ) : (
        <div className="p-4 transition-all duration-300 ease-in-out">
          {selectedWidget.label === 'Events List' 
            ? renderEventsListConfig() 
            : selectedWidget.label === 'Space Header'
              ? renderSpaceHeaderConfig()
              : renderDefaultConfig()}
        </div>
      )}
    </>
  );
};

export default WidgetConfig;