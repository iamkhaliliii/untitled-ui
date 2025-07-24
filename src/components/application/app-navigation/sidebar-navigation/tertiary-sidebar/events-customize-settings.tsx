import React, { useState } from "react";
import { LayoutAlt01, LayoutTop, LayoutLeft, LayoutRight, LayoutBottom, FlexAlignTop, Menu01, Menu02, User02, FlexAlignBottom, Calendar, File01, Grid03, Plus, SearchLg, Grid02, Grid01, Settings01 } from "@untitledui/icons";
import { TreeView } from "@/components/ui/tree-view";

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
  setToggleStates: (callback: (prev: any) => any) => void;
  onAddWidgetClick: () => void;
  onWidgetConfig: (widget: any) => void;
}

export const EventsCustomizeSettings = ({ 
  toggleStates, 
  customizeExpandedIds, 
  setCustomizeExpandedIds, 
  handleToggleChange, 
  setToggleStates,
  onAddWidgetClick,
  onWidgetConfig
}: EventsCustomizeSettingsProps) => {
  // State for space widgets tree expansion
  const [spaceWidgetsExpandedIds, setSpaceWidgetsExpandedIds] = useState<string[]>(["container", "mainColumn", "secondary", "column1", "column2", "column3"]);

  return (
    <div className="space-y-2 p-2">
      
      {/* Global Widgets Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-secondary">
          <LayoutAlt01 className="size-4 text-brand-secondary" />
          <h5 className="text-xs font-semibold text-primary">Global Widgets</h5>
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
                      { id: "topNavigation", label: "TopNavigation", icon: <FlexAlignTop className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                      { id: "searchBar", label: "SearchBar", icon: <SearchLg className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                      { id: "userProfile", label: "UserProfile", icon: <User02 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                  },
                  { 
                    id: "leftSidebar", 
                    label: "Left Sidebar",
                    icon: <LayoutLeft className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    toggleState: toggleStates.leftSidebar,
                    children: [
                      { id: "menu", label: "Menu", icon: <Menu02 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                      { id: "navigation", label: "Navigation", icon: <Menu01 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                  },
                  { 
                    id: "rightSidebar", 
                    label: "Right Sidebar",
                    icon: <LayoutRight className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    toggleState: toggleStates.rightSidebar,
                    children: [
                      { id: "leaderboard", label: "Leaderboard", icon: <User02 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                      { id: "activityFeed", label: "ActivityFeed", icon: <Calendar className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                  },
                  { 
                    id: "footer", 
                    label: "Footer",
                    icon: <LayoutBottom className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    toggleState: toggleStates.footer,
                    children: [
                      { id: "footerBlock", label: "FooterBlock", icon: <FlexAlignBottom className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                      { id: "copyright", label: "Copyright", icon: <File01 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                  },
                ]
              }
            ]}
            expandedIds={customizeExpandedIds}
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
                setToggleStates(prev => ({
                  ...prev,
                  [nodeId]: expanded
                }));
              }
            }}
            className="border-none bg-transparent"
            showLines={false}
            showIcons={true}
          />
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
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-brand-secondary bg-brand-50 border border-brand-200 rounded-md hover:bg-brand-100 transition-colors"
              onClick={onAddWidgetClick}
            >
              <Plus className="size-3" />
              Add Widget
            </button>
          </div>
          <div className="bg-secondary/20 rounded-lg p-1">
            <TreeView
              data={[
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