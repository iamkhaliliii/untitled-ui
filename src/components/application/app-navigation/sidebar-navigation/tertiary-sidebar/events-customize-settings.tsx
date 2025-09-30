import React, { useState } from "react";
import { LayoutAlt01, LayoutTop, LayoutLeft, LayoutRight, LayoutBottom, FlexAlignTop, Menu01, Menu02, User02, FlexAlignBottom, Calendar, File01, Grid03, Plus, SearchLg, Grid02, Grid01, Settings01, Lock01, InfoCircle, Square, FlexAlignRight, Maximize01, DotsHorizontal, Edit03, EyeOff, Copy01, Trash01, DotsGrid, ChevronUp, ChevronDown } from "@untitledui/icons";
import { TreeView } from "@/components/ui/tree-view";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { cx } from "@/utils/cx";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Toggle } from "@/components/base/toggle/toggle";
import { useWidgetConfig } from "@/providers/widget-config-provider";
import { Label } from "@/components/base/input/label";
import { AddWidgetList } from "./add-widget-list";
import { CustomizerSection } from "./customizer-section";

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
  onWidgetSelect?: (widget: any) => void;
  onSetWidgetSelectionType?: (type: 'space' | 'sidebar') => void;
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
  
  // Detect if we're on a private space page, CMS events page, or Growth folder page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPrivateSpacePage = currentPath.includes('/admin/site/spaces/private-space');
  const isCmsEventsPage = currentPath.includes('/site/cms/events');
  const isGrowthFolderPage = currentPath.includes('/site/spaces/growth/');
  
  // State for space widgets tree expansion
  const [spaceWidgetsExpandedIds, setSpaceWidgetsExpandedIds] = useState<string[]>(
    ["mainColumn", "rightColumn", "leftColumn", "footerColumn"]
  );
  
  // Use global layout state
  const selectedLayoutStyle = layoutStates.layoutStyle;
  
  // State for layout section expansion
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  
  // State for other sections expansion
  const [headerSidebarExpanded, setHeaderSidebarExpanded] = useState(true);
  const [spaceWidgetsExpanded, setSpaceWidgetsExpanded] = useState(true);
  const [sidebarWidgetExpanded, setSidebarWidgetExpanded] = useState(true);
  
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
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff'
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
                  className={cx(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors",
                    theme === 'dark' ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Copy01 className="h-4 w-4" />
                  Duplicate
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
    if (onWidgetSelect) {
      onWidgetSelect(widget);
    }
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
    
    console.log('Dynamic widgets in buildTreeStructure:', dynamicWidgets);
    
    const widgetsByContainer = dynamicWidgets.reduce((acc, widget) => {
      if (!acc[widget.containerId]) {
        acc[widget.containerId] = [];
      }
      acc[widget.containerId].push({
        id: widget.id,
        label: widget.label,
        icon: <widget.icon className="size-4 text-current" />,
        data: { widget }
      });
      return acc;
    }, {} as Record<string, any[]>);

    return [
      {
        id: "mainColumn",
        label: "Main Column",
        icon: <LayoutAlt01 className="size-4 text-fg-quaternary" />,
        children: [
          {
            id: "space-header-builtin",
            label: "Space Header",
            icon: <FlexAlignTop className="size-4 text-green-400" />
          },
          {
            id: "events-list-builtin", 
            label: "Events List",
            icon: <Calendar className="size-4 text-green-400" />
          },
          {
            id: "hero-banner-builtin",
            label: "Hero Banner", 
            icon: <File01 className="size-4 text-blue-400" />
          },
          ...(widgetsByContainer.mainColumn || [])
        ]
      },
      {
        id: "rightColumn",
        label: "Right Column",
        icon: <LayoutRight className="size-4 text-fg-quaternary" />,
        children: widgetsByContainer.rightColumn || []
      },
      {
        id: "leftColumn", 
        label: "Left Column",
        icon: <LayoutLeft className="size-4 text-fg-quaternary" />,
        children: widgetsByContainer.leftColumn || []
      },
      {
        id: "footerColumn",
        label: "Footer",
        icon: <LayoutBottom className="size-4 text-fg-quaternary" />,
        children: widgetsByContainer.footerColumn || []
      }
    ];
  };

  // StyleTile component
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
            ? "border-brand-solid bg-brand-50 text-brand-secondary"
            : "border-secondary bg-primary text-secondary hover:border-brand-200 hover:bg-brand-25"
        )}
      >
        <div className={cx(
          "p-2 rounded-md",
          isSelected ? "bg-brand-100" : "bg-secondary/60"
        )}>
          <IconComponent className="size-4" />
        </div>
        <span className="text-xs font-medium">{option.label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-2 p-4">
      
      {/* Global Widgets Section */}
      <CustomizerSection
        title="Header and sidebar"
        isExpanded={headerSidebarExpanded}
        onExpandedChange={setHeaderSidebarExpanded}
        action={{
          label: "Edit",
          icon: Settings01,
          onClick: onEditGlobalWidgets
        }}
      >
        {/* Simple form for both CMS Events and Space Events */}
        <div className="grid grid-cols-2 gap-2">
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
      </CustomizerSection>
      
      {/* Divider */}
      <div className="border-t border-secondary"></div>
      
      {/* Space Layout Section - Only for Growth folder pages */}
      {isGrowthFolderPage && (
        <>
          <CustomizerSection
            title="Space Layout"
            isExpanded={layoutExpanded}
            onExpandedChange={setLayoutExpanded}
          >
            <div className="space-y-6">
              <div>
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
          </CustomizerSection>
          
          {/* Divider */}
          <div className="border-t border-secondary"></div>
        </>
      )}
      
      {/* Space Widgets Section */}
      <CustomizerSection
        title="Space Widgets"
        isExpanded={spaceWidgetsExpanded}
        onExpandedChange={setSpaceWidgetsExpanded}
        action={{
          label: "Add Widget",
          icon: Plus,
          onClick: handleAddSpaceWidget
        }}
      >
        {/* Growth folder gets Properties-style layout, others get TreeView */}
        {isGrowthFolderPage ? (
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
                    const updatedWidgets = spaceWidgetStates.dynamicWidgets.map(w => 
                      w.id === widget.id ? { ...w, enabled: value } : w
                    );
                    updateSpaceWidgetStates({ dynamicWidgets: updatedWidgets });
                  }}
                  id={widget.id}
                  iconColor="bg-blue-100/20"
                  onSettingsClick={() => onWidgetConfig({ id: widget.id, label: widget.label })}
                  isDynamic={true}
                  widgetType="space"
                />
              );
            })}
          </div>
        ) : (
          <div>
            <TreeView
              data={buildTreeStructure()}
              expandedIds={spaceWidgetsExpandedIds}
              selectedIds={[]}
              onNodeClick={(node) => {
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
      </CustomizerSection>
        
      {/* Divider */}
      <div className="border-t border-secondary"></div>
      
      {/* Sidebar Widget Section - Only show when "With Sidebar" layout is selected */}
      {isGrowthFolderPage && selectedLayoutStyle === "with-sidebar" && (
        <>
          <CustomizerSection
            title="Sidebar Widget"
            isExpanded={sidebarWidgetExpanded}
            onExpandedChange={setSidebarWidgetExpanded}
            action={{
              label: "Add Widget",
              icon: Plus,
              onClick: handleAddSidebarWidget
            }}
          >
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
                      const updatedWidgets = sidebarWidgetStates.dynamicWidgets.map(w => 
                        w.id === widget.id ? { ...w, enabled: value } : w
                      );
                      updateSidebarWidgetStates({ dynamicWidgets: updatedWidgets });
                    }}
                    id={widget.id}
                    iconColor="bg-blue-100/20"
                    onSettingsClick={() => onWidgetConfig({ id: widget.id, label: widget.label })}
                    isDynamic={true}
                    widgetType="sidebar"
                  />
                );
              })}
            </div>
          </CustomizerSection>
        </>
      )}
    </div>
  );
};
