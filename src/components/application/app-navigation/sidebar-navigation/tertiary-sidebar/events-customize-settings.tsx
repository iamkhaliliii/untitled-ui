import React, { useState } from "react";
import { LayoutAlt01, LayoutTop, LayoutLeft, LayoutRight, LayoutBottom, FlexAlignTop, Menu01, Menu02, User02, FlexAlignBottom, Calendar, File01, Grid03, Plus, SearchLg, Grid02, Grid01, Settings01, Lock01, InfoCircle } from "@untitledui/icons";
import { TreeView } from "@/components/ui/tree-view";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { cx } from "@/utils/cx";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Toggle } from "@/components/base/toggle/toggle";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface EventsCustomizeSettingsProps {
  toggleStates: {
    header: boolean;
    leftSidebar: boolean;
    rightSidebar: boolean;
    footer: boolean;
  };
  customizeExpandedIds: string[];
  setCustomizeExpandedIds: (callback: (prev: string[]) => string[]) => void;
  handleToggleChange: (nodeId: string, isToggled: boolean) => void;
  updateToggleStates: (states: Partial<{
    header: boolean;
    leftSidebar: boolean;
    rightSidebar: boolean;
    footer: boolean;
  }>) => void;
  onAddWidgetClick: () => void;
  onWidgetConfig: (widget: any) => void;
  onEditGlobalWidgets: () => void;
}

export const EventsCustomizeSettings = ({ 
  toggleStates, 
  customizeExpandedIds, 
  setCustomizeExpandedIds, 
  handleToggleChange, 
  updateToggleStates,
  onAddWidgetClick,
  onWidgetConfig,
  onEditGlobalWidgets
}: EventsCustomizeSettingsProps) => {
  const theme = useResolvedTheme();
  const { spaceWidgetStates, updateSpaceWidgetStates } = useWidgetConfig();
  
  // Enhanced PropertyToggle component with colored icons and settings action
  const PropertyToggle = ({ icon: Icon, label, isSelected, onChange, id, iconColor, onSettingsClick }: {
    icon: React.ComponentType<any>;
    label: string;
    isSelected: boolean;
    onChange: (value: boolean) => void;
    id: string;
    iconColor?: string;
    onSettingsClick?: () => void;
  }) => (
    <div className={cx(
      "flex items-center py-2 px-2 border rounded-md transition-all duration-300 ease-in-out",
      theme === 'dark' 
        ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
        : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
    )}>
      <div className="flex items-center space-x-3">
        <div className={cx(
          "p-1.5 rounded-md",
          iconColor || "bg-green-100/20"
        )}>
          <Icon className={cx(
            "h-4 w-4",
            iconColor ? iconColor.includes('green') ? "text-green-400" : 
                       iconColor.includes('blue') ? "text-blue-400" : 
                       iconColor.includes('purple') ? "text-purple-400" :
                       iconColor.includes('orange') ? "text-orange-400" : 
                       iconColor.includes('violet') ? "text-violet-400" :
                       iconColor.includes('indigo') ? "text-indigo-400" : "text-green-400"
            : "text-green-400"
          )} />
        </div>
        <span className={cx(
          "text-sm font-medium",
          theme === 'dark' ? "text-gray-100" : "text-gray-900"
        )}>{label}</span>
      </div>
      <div className="ml-auto flex items-center space-x-2">
        {onSettingsClick && (
          <button
            onClick={onSettingsClick}
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
        )}
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
  
  // Detect if we're on a private space page, CMS events page, or Growth folder page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPrivateSpacePage = currentPath.includes('/admin/site/spaces/private-space');
  const isCmsEventsPage = currentPath.includes('/site/cms/events');
  const isGrowthFolderPage = currentPath.includes('/site/spaces/growth/');
  
  // State for space widgets tree expansion
  const [spaceWidgetsExpandedIds, setSpaceWidgetsExpandedIds] = useState<string[]>(
    isPrivateSpacePage 
      ? ["container"] 
      : ["container", "mainColumn", "secondary", "column1", "column2", "column3"]
  );
  
  // State for selected layout style (for Growth folder pages)
  const [selectedLayoutStyle, setSelectedLayoutStyle] = useState<string>("simple");

  return (
    <div className="space-y-2 p-2">
      
      {/* Global Widgets Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-secondary">
          <div className="flex items-center gap-2">
            <LayoutAlt01 className="size-4 text-brand-secondary" />
            <h5 className="text-xs font-semibold text-primary">Header and sidebar</h5>
          </div>
          <button
            className={cx(
              "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
              theme === 'dark'
                ? "text-brand-primary bg-brand-solid/20 border border-brand-solid/30 hover:bg-brand-solid/30"
                : "text-brand-secondary bg-brand-50 border border-brand-200 hover:bg-brand-100"
            )}
            onClick={onEditGlobalWidgets}
          >
            <Settings01 className="size-3" />
            Edit
          </button>
        </div>
        
        {/* Simple form for both CMS Events and Space Events */}
        <div className="grid grid-cols-2 gap-2 p-2">
          <div className="flex flex-row col-span-1 py-1 px-2 hover:bg-secondary border border-secondary rounded-md items-center text-tertiary border-secondary">
            <Checkbox
              isSelected={toggleStates.header}
              onChange={(isSelected) => updateToggleStates({ header: isSelected })}
              label="Header"
              size="sm"
            />
          </div>
          
          <div className="flex flex-row col-span-1 py-1 px-2 hover:bg-secondary border border-secondary rounded-md items-center text-tertiary border-secondary">
            <Checkbox
              isSelected={toggleStates.leftSidebar}
              onChange={(isSelected) => updateToggleStates({ leftSidebar: isSelected })}
              label="Sidebar"
              size="sm"
            />
          </div>
        </div>
      </div>
      
      {/* Space Layout Section - Only for Growth folder pages */}
      {isGrowthFolderPage && (
        <div className="border border-secondary rounded-lg bg-primary p-2">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-secondary">
            <div className="flex items-center gap-2">
              <LayoutTop className="size-4 text-brand-secondary" />
              <h5 className="text-xs font-semibold text-primary">Space Layout</h5>
            </div>
            <button
              className={cx(
                "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
                theme === 'dark'
                  ? "text-brand-primary bg-brand-solid/20 border border-brand-solid/30 hover:bg-brand-solid/30"
                  : "text-brand-secondary bg-brand-50 border border-brand-200 hover:bg-brand-100"
              )}
            >
              <Settings01 className="size-3" />
              Configure
            </button>
          </div>
          
          {/* Layout options */}
          <div className="p-2">
            <label className="text-xs font-medium text-secondary mb-3 block">Layout Style</label>
            <div className="grid grid-cols-3 gap-3">
              {/* Simple Layout */}
              <div 
                onClick={() => setSelectedLayoutStyle("simple")}
                className={`flex flex-col items-center p-4 border-2 rounded-lg hover:bg-secondary/10 cursor-pointer ${
                  selectedLayoutStyle === "simple" 
                    ? "border-brand-secondary bg-brand-50/30" 
                    : "border-secondary"
                }`}
              >
                <div className="w-8 h-8 mb-3 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-fg-tertiary rounded-sm"></div>
                </div>
                <span className="text-xs font-medium text-secondary">Simple</span>
              </div>
              
              {/* With Sidebar Layout */}
              <div 
                onClick={() => setSelectedLayoutStyle("with-sidebar")}
                className={`flex flex-col items-center p-4 border-2 rounded-lg hover:bg-secondary/10 cursor-pointer ${
                  selectedLayoutStyle === "with-sidebar" 
                    ? "border-brand-secondary bg-brand-50/30" 
                    : "border-secondary"
                }`}
              >
                <div className="w-8 h-8 mb-3 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-6 bg-fg-tertiary rounded-sm"></div>
                    <div className="w-4 h-6 border-2 border-fg-tertiary rounded-sm"></div>
                  </div>
                </div>
                <span className="text-xs font-medium text-secondary">With Sidebar</span>
              </div>
              
              {/* Full Width Layout */}
              <div 
                onClick={() => setSelectedLayoutStyle("full-width")}
                className={`flex flex-col items-center p-4 border-2 rounded-lg hover:bg-secondary/10 cursor-pointer ${
                  selectedLayoutStyle === "full-width" 
                    ? "border-brand-secondary bg-brand-50/30" 
                    : "border-secondary"
                }`}
              >
                <div className="w-8 h-8 mb-3 flex items-center justify-center">
                  <div className="w-7 h-5 border-2 border-fg-tertiary rounded-sm"></div>
                </div>
                <span className="text-xs font-medium text-secondary">Full Width</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
              {/* Space Widgets Section */}
        <div className="border border-secondary rounded-lg bg-primary p-2">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-secondary">
            <div className="flex items-center gap-2">
              <Grid03 className="size-4 text-brand-secondary" />
              <h5 className="text-xs font-semibold text-primary">Space Widgets</h5>
            </div>
            <button
              className={cx(
                "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
                theme === 'dark'
                  ? "text-brand-primary bg-brand-solid/20 border border-brand-solid/30 hover:bg-brand-solid/30"
                  : "text-brand-secondary bg-brand-50 border border-brand-200 hover:bg-brand-100"
              )}
              onClick={onAddWidgetClick}
            >
              <Plus className="size-3" />
              Add Widget
            </button>
          </div>
          
          {/* Growth folder gets Properties-style layout, others get TreeView */}
          {isGrowthFolderPage ? (
            <div className="bg-secondary/20 rounded-lg p-1">
              <div className="space-y-2">
                <PropertyToggle
                  icon={FlexAlignTop}
                  label="Space Header"
                  isSelected={spaceWidgetStates.spaceHeader}
                  onChange={(value) => updateSpaceWidgetStates({ spaceHeader: value })}
                  id="space-header"
                  iconColor="bg-green-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'spaceheader', label: 'Space Header' })}
                />
                
                <PropertyToggle
                  icon={Calendar}
                  label="Events List"
                  isSelected={spaceWidgetStates.eventsList}
                  onChange={(value) => updateSpaceWidgetStates({ eventsList: value })}
                  id="events-list"
                  iconColor="bg-green-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'eventsList', label: 'Events List' })}
                />
                
                <PropertyToggle
                  icon={Calendar}
                  label="Custom Events List"
                  isSelected={spaceWidgetStates.customEventsList}
                  onChange={(value) => updateSpaceWidgetStates({ customEventsList: value })}
                  id="custom-events-list"
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'singleEvent', label: 'Custom Events List' })}
                />
                
                <PropertyToggle
                  icon={Calendar}
                  label="Upcoming Events"
                  isSelected={spaceWidgetStates.upcomingEvents}
                  onChange={(value) => updateSpaceWidgetStates({ upcomingEvents: value })}
                  id="upcoming-events"
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'upcomingEvents', label: 'upcoming events' })}
                />
                
                <PropertyToggle
                  icon={File01}
                  label="Hero Banner"
                  isSelected={spaceWidgetStates.heroBanner}
                  onChange={(value) => updateSpaceWidgetStates({ heroBanner: value })}
                  id="hero-banner"
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'heroBanner', label: 'hero banner' })}
                />
                
                <PropertyToggle
                  icon={Menu01}
                  label="Menu"
                  isSelected={spaceWidgetStates.menu}
                  onChange={(value) => updateSpaceWidgetStates({ menu: value })}
                  id="menu"
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'menu', label: 'Menu' })}
                />
              </div>
            </div>
          ) : (
            <div className="bg-secondary/20 rounded-lg p-1">
              <TreeView
                data={isPrivateSpacePage ? [
                  {
                    id: "container",
                    label: "Container",
                    icon: <Grid01 className="size-5 text-fg-quaternary" />,
                    children: [
                      {
                        id: "privateSpaceWidget",
                        label: "Private space widget",
                        icon: <Lock01 className="bg-green-100/20 p-[1px] rounded-md size-5 text-green-400" />,
                      }
                    ]
                  }
                ] : [
                  {
                    id: "container",
                    label: "Container",
                    icon: <Grid01 className="size-5 text-fg-quaternary" />,
                    children: [
                      {
                        id: "spaceheader",
                        label: "Space Header",
                        icon: <FlexAlignTop className="bg-green-100/20 p-[1px] rounded-md size-5 text-green-400" />,
                      },

                      {
                        id: "mainColumn",
                        label: "Main Column",
                        icon: <Grid03 className="size-5 text-fg-quaternary" />,
                        children: [
                          { 
                            id: "eventsList", 
                            label: "Events List", 
                            icon: <Calendar className="bg-green-100/20 p-[1px] rounded-md size-5 text-green-400" />
                          },
                          { 
                            id: "singleEvent", 
                            label: "Custom Events List", 
                            icon: <Calendar className="bg-blue-100/20 p-[1px] rounded-md size-5 text-blue-400" />
                          }
                        ]
                      },
                      {
                        id: "secondary",
                        label: "Secondary",
                        icon: <Grid03 className="size-5 text-fg-quaternary" />,
                        children: [
                          {
                            id: "column1",
                            label: "Column 1",
                            icon: <Grid03 className="size-5 text-fg-quaternary" />,
                            children: [
                              { 
                                id: "upcomingEvents", 
                                label: "upcoming events", 
                                icon: <Calendar className="bg-blue-100/20 p-[1px] rounded-md size-5 text-blue-400" />
                              }
                            ]
                          },
                          {
                            id: "column2",
                            label: "Column 2",
                            icon: <Grid03 className="size-5 text-fg-quaternary" />,
                            children: [
                              { 
                                id: "heroBanner", 
                                label: "hero banner", 
                                icon: <File01 className="bg-blue-100/20 p-[1px] rounded-md size-5 text-blue-400" />
                              }
                            ]
                          },
                          {
                            id: "column3",
                            label: "Column 3",
                            icon: <Grid03 className="size-5 text-fg-quaternary" />,
                            children: [
                              { 
                                id: "menu", 
                                label: "Menu", 
                                icon: <Menu01 className="bg-blue-100/20 p-[1px] rounded-md size-5 text-blue-400" />
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]}
                expandedIds={spaceWidgetsExpandedIds}
                selectedIds={[]}
                onNodeClick={(node) => {
                  // Check if this is a leaf node (widget) by checking if it has no children
                  if (!node.children || node.children.length === 0) {
                    console.log("Widget clicked:", node.label);
                    onWidgetConfig(node);
                  } else {
                    console.log("Container clicked:", node.label);
                  }
                }}
                onNodeExpand={(nodeId, expanded) => {
                  if (expanded) {
                    setSpaceWidgetsExpandedIds(prev => [...prev, nodeId]);
                  } else {
                    setSpaceWidgetsExpandedIds(prev => prev.filter(id => id !== nodeId));
                  }
                }}
                className="border-none bg-transparent"
                showLines={false}
                showIcons={true}
              />
            </div>
          )}
        </div>
        
        {/* Sidebar Widget Section - Only show when "With Sidebar" layout is selected */}
        {isGrowthFolderPage && selectedLayoutStyle === "with-sidebar" && (
          <div className="border border-secondary rounded-lg bg-primary p-2">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-secondary">
              <div className="flex items-center gap-2">
                <LayoutLeft className="size-4 text-brand-secondary" />
                <h5 className="text-xs font-semibold text-primary">Sidebar Widget</h5>
              </div>
              <button
                className={cx(
                  "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
                  theme === 'dark'
                    ? "text-brand-primary bg-brand-solid/20 border border-brand-solid/30 hover:bg-brand-solid/30"
                    : "text-brand-secondary bg-brand-50 border border-brand-200 hover:bg-brand-100"
                )}
                onClick={onAddWidgetClick}
              >
                <Plus className="size-3" />
                Add Widget
              </button>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-1">
              <div className="space-y-2">
                <PropertyToggle
                  icon={Menu01}
                  label="Sidebar Menu"
                  isSelected={true}
                  onChange={(value) => console.log('Sidebar Menu:', value)}
                  id="sidebar-menu"
                  iconColor="bg-purple-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'sidebarMenu', label: 'Sidebar Menu' })}
                />
                
                <PropertyToggle
                  icon={Calendar}
                  label="Event Calendar"
                  isSelected={true}
                  onChange={(value) => console.log('Event Calendar:', value)}
                  id="event-calendar"
                  iconColor="bg-orange-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'eventCalendar', label: 'Event Calendar' })}
                />
                
                <PropertyToggle
                  icon={User02}
                  label="Member List"
                  isSelected={false}
                  onChange={(value) => console.log('Member List:', value)}
                  id="member-list"
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'memberList', label: 'Member List' })}
                />
                
                <PropertyToggle
                  icon={SearchLg}
                  label="Quick Search"
                  isSelected={true}
                  onChange={(value) => console.log('Quick Search:', value)}
                  id="quick-search"
                  iconColor="bg-green-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'quickSearch', label: 'Quick Search' })}
                />
                
                <PropertyToggle
                  icon={File01}
                  label="Recent Activity"
                  isSelected={false}
                  onChange={(value) => console.log('Recent Activity:', value)}
                  id="recent-activity"
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'recentActivity', label: 'Recent Activity' })}
                />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}; 