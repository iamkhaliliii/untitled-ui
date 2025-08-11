import React, { useState } from "react";
import { LayoutAlt01, LayoutTop, LayoutLeft, LayoutRight, LayoutBottom, FlexAlignTop, Menu01, Menu02, User02, FlexAlignBottom, Calendar, File01, Grid03, Plus, SearchLg, Grid02, Grid01, Settings01, Lock01, InfoCircle } from "@untitledui/icons";
import { TreeView } from "@/components/ui/tree-view";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { cx } from "@/utils/cx";

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
  
  // Detect if we're on a private space page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPrivateSpacePage = currentPath.includes('/admin/site/spaces/private-space');
  
  // State for space widgets tree expansion
  const [spaceWidgetsExpandedIds, setSpaceWidgetsExpandedIds] = useState<string[]>(
    isPrivateSpacePage 
      ? ["container"] 
      : ["container", "mainColumn", "secondary", "column1", "column2", "column3"]
  );

  return (
    <div className="space-y-2 p-2">
      
      {/* Global Widgets Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-secondary">
          <div className="flex items-center gap-2">
            <LayoutAlt01 className="size-4 text-brand-secondary" />
            <h5 className="text-xs font-semibold text-primary">Global Widgets</h5>
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
        <div className="bg-secondary/20 rounded-lg p-1">
          <TreeView
            data={[
              {
                id: "navigation",
                label: "Navigation",
                icon: <LayoutAlt01 className="size-5 text-fg-quaternary" />,
                children: [
                  { 
                    id: "header", 
                    label: "Header",
                    icon: <LayoutTop className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,

                    toggleState: toggleStates.header,
                    children: [
                      { id: "topNavigation", label: "Top Navigation", icon: <FlexAlignTop className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                  },
                  { 
                    id: "leftSidebar", 
                    label: "Sidebar",
                    icon: <LayoutLeft className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    toggleState: toggleStates.leftSidebar,
                    children: [
                      { id: "menu", label: "Menu", icon: <Menu02 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                  },
                ]
              }
            ]}
            expandedIds={[...customizeExpandedIds,]}
            selectedIds={[]}
            onToggleChange={handleToggleChange}
            onNodeExpand={(nodeId, expanded) => {
              // Update customize expanded state
              if (expanded) {
                setCustomizeExpandedIds(prev => [...prev, nodeId]);
              } else {
                setCustomizeExpandedIds(prev => prev.filter(id => id !== nodeId));
              }
              
              // Sync with toggle state for layout items if needed
              if (nodeId === "header" || nodeId === "leftSidebar" || nodeId === "rightSidebar" || nodeId === "footer") {
                updateToggleStates({
                  [nodeId]: expanded
                });
              }
            }}
            className="border-none bg-transparent"
            showLines={false}
            showIcons={true}
          />
        </div>
        
        {/* Helper Note */}
        <div className="text-xs mt-2 flex items-start gap-2">
          <InfoCircle className={cx("size-3 mt-0.5 flex-shrink-0", theme === 'dark' ? "text-gray-400" : "text-gray-500")} />
          <div className={cx("leading-relaxed", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
            You can <span className="font-medium">show/hide</span> navigation sections for this space, but widget edits apply site-wide. 
            <button className={cx(
              "font-medium underline ml-1 hover:no-underline",
              theme === 'dark' ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
            )}>
              Upgrade to Pro
            </button> for per-space customization.
          </div>
        </div>
      </div>
      
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
                          label: "Single Event", 
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
        </div>
    </div>
  );
}; 