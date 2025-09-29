import React, { useState } from "react";
import { LayoutAlt01, LayoutTop, LayoutLeft, LayoutRight, LayoutBottom, FlexAlignTop, Menu01, Menu02, User02, FlexAlignBottom, Calendar, File01, Grid03, Plus, SearchLg, Grid02, Grid01, Settings01, Lock01, InfoCircle, Square, FlexAlignRight, Maximize01, DotsHorizontal, Edit03, EyeOff, Copy01, Trash01, DotsGrid } from "@untitledui/icons";
import { TreeView } from "@/components/ui/tree-view";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { cx } from "@/utils/cx";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Toggle } from "@/components/base/toggle/toggle";
import { useWidgetConfig } from "@/providers/widget-config-provider";
import { Label } from "@/components/base/input/label";
import { AddWidgetList } from "./add-widget-list";

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
  onWidgetSelect?: (widget: any) => void; // Add this prop
  onSetWidgetSelectionType?: (type: 'space' | 'sidebar') => void; // Add this prop
}

export const EventsCustomizeSettings = ({ 
  toggleStates, 
  customizeExpandedIds, 
  setCustomizeExpandedIds, 
  handleToggleChange, 
  updateToggleStates,
  onAddWidgetClick,
  onWidgetConfig,
  onEditGlobalWidgets,
  onWidgetSelect,
  onSetWidgetSelectionType
}: EventsCustomizeSettingsProps) => {
  const theme = useResolvedTheme();
  const { 
    spaceWidgetStates, 
    updateSpaceWidgetStates, 
    layoutStates, 
    updateLayoutStates, 
    sidebarWidgetStates, 
    updateSidebarWidgetStates, 
    removeSpaceWidget, 
    duplicateSpaceWidget,
    removeSidebarWidget,
    duplicateSidebarWidget
  } = useWidgetConfig();
  
  // Enhanced PropertyToggle component with colored icons, settings action, and dropdown menu
  const PropertyToggle = ({ icon: Icon, label, isSelected, onChange, id, iconColor, onSettingsClick, isDynamic = false, widgetType }: {
    icon: React.ComponentType<any>;
    label: string;
    isSelected: boolean;
    onChange: (value: boolean) => void;
    id: string;
    iconColor?: string;
    onSettingsClick?: () => void;
    isDynamic?: boolean;
    widgetType?: 'space' | 'sidebar';
  }) => {
    const isDropdownOpen = openDropdownId === id;
    // Static widgets (space-header, events-list, etc.) can't be deleted, but dynamic widgets can
    const isDeleteDisabled = !isDynamic && (id === 'space-header' || id === 'events-list');
    
    return (
      <div className={cx(
        "flex items-center py-2 px-2 border rounded-md transition-all duration-300 ease-in-out relative",
        theme === 'dark' 
          ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
          : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
      )}>
        <div className="flex items-center space-x-3">
          {/* Reorder handle */}
          <div className="cursor-move p-1">
            <DotsGrid className={cx(
              "h-4 w-4",
              theme === 'dark' ? "text-gray-500" : "text-gray-400"
            )} />
          </div>
          
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
        <div className="ml-auto flex items-center space-x-1">
          {/* Dropdown Menu Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Dropdown button clicked for:', id, 'Currently open:', openDropdownId);
                setOpenDropdownId(isDropdownOpen ? null : id);
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
                  "absolute right-0 top-8 w-40 rounded-lg border shadow-lg py-1",
                  theme === 'dark' 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-gray-200"
                )}
                style={{ 
                  zIndex: 9999,
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: '2px solid red' // Visual debug - remove later
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Rename clicked for:', label);
                    setOpenDropdownId(null);
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
                    console.log('Hide clicked for:', label);
                    onChange(false);
                    setOpenDropdownId(null);
                  }}
                  className={cx(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors",
                    theme === 'dark' ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <EyeOff className="h-4 w-4" />
                  Hide
                </button>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Duplicate clicked for:', label, 'isDynamic:', isDynamic, 'widgetType:', widgetType);
                    if (isDynamic && widgetType === 'space') {
                      duplicateSpaceWidget(id);
                    } else if (isDynamic && widgetType === 'sidebar') {
                      duplicateSidebarWidget(id);
                    } else {
                      console.log('Duplicate not supported for static widget:', label);
                    }
                    setOpenDropdownId(null);
                  }}
                  onMouseEnter={() => console.log('Duplicate button hover')}
                  className={cx(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors",
                    theme === 'dark' ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"
                  )}
                  style={{ backgroundColor: 'yellow', color: 'black' }} // Visual debug
                >
                  <Copy01 className="h-4 w-4" />
                  Duplicate TEST
                </button>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Configure clicked for:', label);
                    onSettingsClick?.();
                    setOpenDropdownId(null);
                  }}
                  className={cx(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors",
                    theme === 'dark' ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Settings01 className="h-4 w-4" />
                  Configure
                </button>
                
                <div className="h-px bg-secondary my-1"></div>
                
                <button
                  onClick={() => {
                    if (!isDeleteDisabled) {
                      if (isDynamic && widgetType === 'space') {
                        removeSpaceWidget(id);
                        console.log('Deleted space widget:', label);
                      } else if (isDynamic && widgetType === 'sidebar') {
                        removeSidebarWidget(id);
                        console.log('Deleted sidebar widget:', label);
                      } else {
                        console.log('Delete not supported for static widget:', label);
                      }
                      setOpenDropdownId(null);
                    }
                  }}
                  disabled={isDeleteDisabled}
                  className={cx(
                    "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors text-red-600",
                    isDeleteDisabled
                      ? "opacity-20 cursor-not-allowed"
                      : "opacity-100 hover:bg-red-50",
                    !isDeleteDisabled && theme === 'dark' ? "hover:bg-red-900/20" : "",
                    !isDeleteDisabled && theme === 'light' ? "hover:bg-red-50" : ""
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Trash01 className="h-4 w-4" />
                    Delete
                  </div>
                  {isDeleteDisabled && (
                    <Lock01 className="h-4 w-4" />
                  )}
                </button>
              </div>
            )}
          </div>
          
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
  };
  
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
  
  // Use global layout state
  const selectedLayoutStyle = layoutStates.layoutStyle;
  
  // State for layout section expansion
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  
  // State for dropdown management
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  // State for Add Widget view
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [addWidgetType, setAddWidgetType] = useState<'space' | 'sidebar'>('space');
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
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

  // Handle Add Widget clicks
  const handleAddSpaceWidget = () => {
    setAddWidgetType('space');
    if (onSetWidgetSelectionType) {
      onSetWidgetSelectionType('space');
    }
    setShowAddWidget(true);
  };

  const handleAddSidebarWidget = () => {
    setAddWidgetType('sidebar');
    if (onSetWidgetSelectionType) {
      onSetWidgetSelectionType('sidebar');
    }
    setShowAddWidget(true);
  };

  const handleAddWidgetBack = () => {
    setShowAddWidget(false);
  };

  const handleWidgetSelect = (widget: any) => {
    console.log('Selected widget:', widget);
    // Call the parent's widget select handler if provided
    if (onWidgetSelect) {
      onWidgetSelect(widget);
    }
    // Close the modal
    setShowAddWidget(false);
  };

  // If showing Add Widget view, render that instead
  if (showAddWidget) {
    return (
      <AddWidgetList
        onBack={handleAddWidgetBack}
        onSelectWidget={handleWidgetSelect}
        widgetType={addWidgetType}
      />
    );
  }
  
  // Function to build tree structure with dynamic widgets
  const buildTreeStructure = () => {
    const { dynamicWidgets } = spaceWidgetStates;
    
    // Debug log to see if we have any dynamic widgets
    console.log('Dynamic widgets in buildTreeStructure:', dynamicWidgets);
    
    // Group dynamic widgets by container
    const widgetsByContainer = dynamicWidgets.reduce((acc, widget) => {
      if (!acc[widget.containerId]) {
        acc[widget.containerId] = [];
      }
      acc[widget.containerId].push({
        id: widget.id,
        label: widget.label,
        icon: React.createElement(widget.icon, { 
          className: "bg-blue-100/20 p-[1px] rounded-md size-5 text-blue-400" 
        }),
      });
      return acc;
    }, {} as Record<string, any[]>);
    
    console.log('Widgets by container:', widgetsByContainer);
    
    if (isPrivateSpacePage) {
      return [
        {
          id: "container",
          label: "Container",
          icon: <Grid01 className="size-5 text-fg-quaternary" />,
          children: [
            {
              id: "privateSpaceWidget",
              label: "Private space widget",
              icon: <Lock01 className="bg-green-100/20 p-[1px] rounded-md size-5 text-green-400" />,
            },
            ...(widgetsByContainer['container'] || [])
          ]
        }
      ];
    }
    
    return [
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
              },
              ...(widgetsByContainer['mainColumn'] || [])
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
                  },
                  ...(widgetsByContainer['column1'] || [])
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
                  },
                  ...(widgetsByContainer['column2'] || [])
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
                  },
                  ...(widgetsByContainer['column3'] || [])
                ]
              }
            ]
          }
        ]
      }
    ];
  };
  
  // StyleTile component - exact replica from widget-config.tsx
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
        <span className="text-xs font-medium">{option.label}</span>
      </div>
    );
  };
  
  // SectionHeader component - exact replica from widget-config.tsx
  const SectionHeader = ({ icon: Icon, title, isExpanded, onToggle }: {
    icon: React.ComponentType<any>;
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-2 hover:bg-secondary/20 rounded-md transition-colors"
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-brand-secondary" />
        <h5 className="text-xs font-semibold text-primary">{title}</h5>
      </div>
      <div className={cx(
        "transition-transform duration-200",
        isExpanded ? "rotate-180" : "rotate-0"
      )}>
        <InfoCircle className="size-3 text-fg-quaternary" />
      </div>
    </button>
  );

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
          <SectionHeader
            icon={LayoutTop}
            title="Space Layout"
            isExpanded={layoutExpanded}
            onToggle={() => setLayoutExpanded(!layoutExpanded)}
          />
          {layoutExpanded && (
            <div className="bg-secondary/20 rounded-lg p-3">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="layout-style">Layout Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <StyleTile
                      option={{ id: 'simple', label: 'Simple', icon: Square }}
                      isSelected={selectedLayoutStyle === 'simple'}
                      onClick={() => updateLayoutStates({ layoutStyle: 'simple' })}
                    />
                    <StyleTile
                      option={{ id: 'with-sidebar', label: 'Sidebar', icon: FlexAlignRight }}
                      isSelected={selectedLayoutStyle === 'with-sidebar'}
                      onClick={() => updateLayoutStates({ layoutStyle: 'with-sidebar' })}
                    />
                    <StyleTile
                      option={{ id: 'full-width', label: 'Full Width', icon: Maximize01 }}
                      isSelected={selectedLayoutStyle === 'full-width'}
                      onClick={() => updateLayoutStates({ layoutStyle: 'full-width' })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
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
              onClick={handleAddSpaceWidget}
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
                  icon={File01}
                  label="Hero Banner"
                  isSelected={spaceWidgetStates.heroBanner}
                  onChange={(value) => updateSpaceWidgetStates({ heroBanner: value })}
                  id="hero-banner"
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'heroBanner', label: 'hero banner' })}
                />
                
                {/* Dynamic Widgets */}
                {spaceWidgetStates.dynamicWidgets.map((widget) => {
                  const IconComponent = widget.icon;
                  return (
                    <PropertyToggle
                      key={widget.id}
                      icon={IconComponent}
                      label={widget.label}
                      isSelected={widget.enabled}
                      onChange={(value) => {
                        // Update the specific dynamic widget's enabled state
                        const updatedWidgets = spaceWidgetStates.dynamicWidgets.map(w => 
                          w.id === widget.id ? { ...w, enabled: value } : w
                        );
                        updateSpaceWidgetStates({ dynamicWidgets: updatedWidgets });
                      }}
                      id={widget.id}
                      iconColor="bg-blue-100/20" // Blue for dynamic widgets
                      onSettingsClick={() => onWidgetConfig({ id: widget.id, label: widget.label })}
                      isDynamic={true}
                      widgetType="space"
                    />
                  );
                })}
              </div>
            </div>
          ) : (
          <div className="bg-secondary/20 rounded-lg p-1">
            <TreeView
              data={buildTreeStructure()}
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
                <FlexAlignRight className="size-4 text-brand-secondary" />
                <h5 className="text-xs font-semibold text-primary">Sidebar Widget</h5>
              </div>
              <button
                className={cx(
                  "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
                  theme === 'dark'
                    ? "text-brand-primary bg-brand-solid/20 border border-brand-solid/30 hover:bg-brand-solid/30"
                    : "text-brand-secondary bg-brand-50 border border-brand-200 hover:bg-brand-100"
                )}
                onClick={handleAddSidebarWidget}
              >
                <Plus className="size-3" />
                Add Widget
              </button>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-1">
              <div className="space-y-2">
                <PropertyToggle
                  icon={Calendar}
                  label="Quick Actions"
                  isSelected={sidebarWidgetStates.quickActions}
                  onChange={(value) => updateSidebarWidgetStates({ quickActions: value })}
                  id="quick-actions"
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'quickActions', label: 'Quick Actions' })}
                />
                
                <PropertyToggle
                  icon={File01}
                  label="Recent Activity"
                  isSelected={sidebarWidgetStates.recentActivity}
                  onChange={(value) => updateSidebarWidgetStates({ recentActivity: value })}
                  id="recent-activity"
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: 'recentActivity', label: 'Recent Activity' })}
                />
                
                {/* Dynamic Sidebar Widgets */}
                {sidebarWidgetStates.dynamicWidgets.map((widget) => {
                  const IconComponent = widget.icon;
                  return (
                    <PropertyToggle
                      key={widget.id}
                      icon={IconComponent}
                      label={widget.label}
                      isSelected={widget.enabled}
                      onChange={(value) => {
                        // Update the specific dynamic widget's enabled state
                        const updatedWidgets = sidebarWidgetStates.dynamicWidgets.map(w => 
                          w.id === widget.id ? { ...w, enabled: value } : w
                        );
                        updateSidebarWidgetStates({ dynamicWidgets: updatedWidgets });
                      }}
                      id={widget.id}
                      iconColor="bg-blue-100/20" // Blue for dynamic widgets
                      onSettingsClick={() => onWidgetConfig({ id: widget.id, label: widget.label })}
                      isDynamic={true}
                      widgetType="sidebar"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}; 