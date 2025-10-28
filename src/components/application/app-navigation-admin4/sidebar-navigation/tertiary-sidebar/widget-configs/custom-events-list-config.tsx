import React, { useState, useEffect } from 'react';
import { useListData } from "react-stately";
import { Calendar, ArrowRight, Grid01, Rows02, Dotpoints02, DotsGrid, User02, Monitor01, Square, Maximize01, Minimize01, CheckCircle, Image01, FileCheck03, FileCheck02, FileHeart01, MessageSquare01, BarChart03, Settings01, Plus, DotsHorizontal, Edit03, Copy01, Trash01 } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Label } from '@/components/base/input/label';
import { TextArea } from '@/components/base/textarea/textarea';
import { Select } from '@/components/base/select/select';
import { MultiSelect } from '@/components/base/select/multi-select';
import { Toggle } from '@/components/base/toggle/toggle';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';

interface SpaceItem {
  label: string;
  id: string;
  supportingText: string;
  avatarUrl: string;
  icon?: React.FC | React.ReactNode;
}

interface EventItem {
  label: string;
  id: string;
  supportingText: string;
  avatarUrl: string;
  icon?: React.FC | React.ReactNode;
}

interface CustomEventsListConfigProps {
  onFilterViewChange?: (isFilterView: boolean) => void;
}

export const CustomEventsListConfig: React.FC<CustomEventsListConfigProps> = ({ onFilterViewChange }) => {
  const { eventsListConfig, updateEventsListConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  const { 
    style, 
    cardSize, 
    cardStyle, 
    eventDetails, 
    hostInfo, 
    coverImage,
    attended,
    tabView,
    allEventsTab,
    upcomingEventsTab,
    pastEventsTab,
    title,
    description,
    eventSource,
    selectedSpaces,
    selectedEvents
  } = eventsListConfig;
  
  // Section collapse/expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [tabViewsExpanded, setTabViewsExpanded] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);
  const [sourceExpanded, setSourceExpanded] = useState(true);
  const [isFilterView, setIsFilterView] = useState(false);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  // Tab views state - initialize based on current config
  const [tabViews, setTabViews] = useState([
    { id: 'all', label: 'All', enabled: allEventsTab },
    { id: 'upcoming', label: 'Upcoming', enabled: upcomingEventsTab },
    { id: 'past', label: 'Past', enabled: pastEventsTab }
  ]);

  // Notify parent when filter view changes
  useEffect(() => {
    onFilterViewChange?.(isFilterView);
  }, [isFilterView, onFilterViewChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId) {
        setOpenDropdownId(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

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

  const handleAddNewTab = () => {
    const newTabId = `tab_${Date.now()}`;
    const newTab = {
      id: newTabId,
      label: 'New Tab',
      enabled: false
    };
    setTabViews(prev => [...prev, newTab]);
    
    // Set the new tab to edit mode immediately
    setEditingTabId(newTabId);
  };

  const handleConfigTab = (tabId: string) => {
    const tab = tabViews.find(t => t.id === tabId);
    if (tab) {
      console.log('Configure tab:', tab.label);
      // TODO: Open tab configuration view
    }
  };

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

  // Selected events for MultiSelect
  const selectedEventsItems = useListData<EventItem>({
    initialItems: [],
  });

  // Initialize selectedEventsItems with current config
  useEffect(() => {
    const currentItems = selectedEvents.map(id => eventsData.find(event => event.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
    
    // Only update if different
    const currentIds = selectedEventsItems.items.map(item => item.id);
    if (JSON.stringify(currentIds.sort()) !== JSON.stringify(selectedEvents.sort())) {
      // Clear and repopulate
      if (selectedEventsItems.items.length > 0) {
        selectedEventsItems.remove(...selectedEventsItems.items.map(item => item.id));
      }
      if (currentItems.length > 0) {
        selectedEventsItems.append(...currentItems);
      }
    }
  }, [selectedEvents]);

  // Handle event insertion
  const handleEventInserted = (key: React.Key) => {
    const newSelectedEvents = [...selectedEvents, key.toString()];
    updateEventsListConfig({ selectedEvents: newSelectedEvents });
  };

  // Handle event removal
  const handleEventCleared = (key: React.Key) => {
    const newSelectedEvents = selectedEvents.filter(id => id !== key.toString());
    updateEventsListConfig({ selectedEvents: newSelectedEvents });
  };

  const styleOptions = [
    { id: 'card', label: 'Card', icon: Grid01 },
    { id: 'list', label: 'List', icon: Dotpoints02 },
    { id: 'feed', label: 'Feed', icon: Rows02 },
    { id: 'carousel', label: 'Carousel', icon: ArrowRight }
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

  const eventSourceOptions = [
    { id: 'all_spaces', label: 'All spaces', icon: FileCheck03 },
    { id: 'current_space', label: 'Current space', icon: FileCheck02 },
    { id: 'specific_spaces', label: 'Specific spaces', icon: FileHeart01 },
    { id: 'specific_events', label: 'Specific events', icon: Calendar }
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

  const eventsData: EventItem[] = [
    {
      label: "React Conference 2024",
      id: "react-conf-2024",
      supportingText: "Annual conference featuring the latest React developments",
      avatarUrl: "",
      icon: Calendar,
    },
    {
      label: "TypeScript Workshop",
      id: "typescript-workshop",
      supportingText: "Hands-on workshop covering advanced TypeScript patterns",
      avatarUrl: "",
      icon: Calendar,
    },
    {
      label: "Design System Meetup",
      id: "design-system-meetup",
      supportingText: "Monthly meetup for design system enthusiasts",
      avatarUrl: "",
      icon: Calendar,
    },
    {
      label: "Product Launch Event",
      id: "product-launch",
      supportingText: "Celebrating the launch of our new product",
      avatarUrl: "",
      icon: Calendar,
    },
    {
      label: "Community Q&A Session",
      id: "community-qa",
      supportingText: "Open Q&A session with the community team",
      avatarUrl: "",
      icon: Calendar,
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

  const TabViewItem = ({ tab, onToggle, onRename, onConfig, onDuplicate, onDelete }: {
    tab: { id: string; label: string; enabled: boolean };
    onToggle: (tabId: string) => void;
    onRename: (tabId: string, newLabel: string) => void;
    onConfig: (tabId: string) => void;
    onDuplicate: (tabId: string) => void;
    onDelete: (tabId: string) => void;
  }) => {
    const isEditing = editingTabId === tab.id;
    const [editLabel, setEditLabel] = useState(tab.label);
    const isDropdownOpen = openDropdownId === tab.id;

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
      setOpenDropdownId(null);
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

        {/* Actions */}
        <div className="flex items-center space-x-1 ml-2">
          {/* Dropdown Menu Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenDropdownId(isDropdownOpen ? null : tab.id);
              }}
              className={cx(
                "p-1 rounded-md hover:bg-secondary/60 transition-colors",
                theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-100"
              )}
            >
              <DotsHorizontal className={cx(
                "h-4 w-4",
                theme === 'dark' ? "text-gray-400" : "text-gray-500"
              )} />
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className={cx(
                  "absolute right-0 top-8 w-40 rounded-lg border shadow-lg py-1 z-50",
                  theme === 'dark' 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-gray-200"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleStartEdit();
                  }}
                  className={cx(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors",
                    theme === 'dark' ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Edit03 className="h-4 w-4" />
                  Rename
                </button>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDuplicate(tab.id);
                    setOpenDropdownId(null);
                  }}
                  className={cx(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors",
                    theme === 'dark' ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Copy01 className="h-4 w-4" />
                  Duplicate
                </button>
                
                {tab.id !== 'all' && (
                  <>
                    <div className="h-px bg-secondary my-1"></div>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(tab.id);
                        setOpenDropdownId(null);
                      }}
                      className={cx(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors text-red-600",
                        theme === 'dark' ? "hover:bg-red-900/20" : "hover:bg-red-50"
                      )}
                    >
                      <Trash01 className="h-4 w-4" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Config Button */}
          <button
            onClick={() => {
              onConfig(tab.id);
              setOpenDropdownId(null);
            }}
            className={cx(
              "p-1 rounded-md hover:bg-secondary/60 transition-colors",
              theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            <Settings01 className={cx(
              "h-4 w-4",
              theme === 'dark' ? "text-gray-400" : "text-gray-500"
            )} />
          </button>

          {/* Toggle */}
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
    <div className="space-y-2 min-h-0">
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

      {/* Resource Section */}
      <CustomizerSection
        title="Resource"
        isExpanded={sourceExpanded}
        onExpandedChange={setSourceExpanded}
      >
        <div className="space-y-4">
          <div>
            <Select 
              label="Event source"
              items={eventSourceOptions} 
              selectedKey={eventSourceOptions.find(option => option.id === eventSource) ? eventSource : 'specific_events'}
              onSelectionChange={(key) => updateEventsListConfig({ 
                eventSource: key as 'all_spaces' | 'current_space' | 'specific_spaces' | 'specific_events',
                selectedSpaces: key === 'specific_spaces' ? selectedSpaces : [],
                selectedEvents: key === 'specific_events' ? selectedEvents : []
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

          {eventSource === 'specific_events' && (
            <div>
              <MultiSelect
                selectedItems={selectedEventsItems}
                label="Select events"
                hint="Choose which specific events to display"
                placeholder="Search events"
                items={eventsData}
                onItemInserted={handleEventInserted}
                onItemCleared={handleEventCleared}
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
                  onConfig={handleConfigTab}
                  onDuplicate={handleDuplicateTab}
                  onDelete={handleDeleteTab}
                />
              ))}
              
              {/* Add New Tab Button */}
              <Button
                onClick={handleAddNewTab}
                size="sm"
                color="secondary"
                iconLeading={Plus}
                className="w-full mt-2"
              >
                Add new tab
              </Button>
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
        <div className="space-y-6">
          <div>
            <Label htmlFor="style">Style</Label>
            <div className="grid grid-cols-4 gap-2 mt-3">
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

