import React, { useState } from "react";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import type { Widget, WidgetSelectionProps } from "./types";
import { availableWidgets } from "./widgets-data";
import { filterWidgets, getCategoryColor, calculatePopoverPosition } from "./widget-utils";
import { WidgetCard, WidgetPopover } from "./widget-card";

export const WidgetSelection = ({ onBack, onSelectWidget }: WidgetSelectionProps) => {
  const theme = useResolvedTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredWidget, setHoveredWidget] = useState<Widget | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  // Filter widgets based on search term
  const filteredWidgets = filterWidgets(availableWidgets, searchTerm);

  const handleWidgetClick = (widget: Widget) => {
    onSelectWidget(widget);
  };

  const handleWidgetMouseEnter = (widget: Widget, event: React.MouseEvent) => {
    const position = calculatePopoverPosition(event);
    setPopoverPosition(position);
    setHoveredWidget(widget);
  };

  const handleWidgetMouseLeave = () => {
    setHoveredWidget(null);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Search */}
      <div className="sticky top-[4.5rem] z-30 p-4 border-b border-secondary bg-primary/95 backdrop-blur-sm">
        <Input
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* All Categories and Subcategories */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="space-y-6 pb-4">
          {filteredWidgets.map((category) => (
            <div key={category.name} className="mb-6">
              {/* Category Header - Sticky with proper offset from search */}
              <div className="sticky z-30 bg-primary/95 backdrop-blur-sm border-b border-secondary px-4 py-3 shadow-sm">
                <h3 className="text-sm font-medium text-primary uppercase tracking-wide">
                  {category.name}
                </h3>
              </div>

              {/* Subcategories or Direct Widgets */}
              <div className="sticky z-30 top-[4.5rem] px-4">
                {category.subcategories ? category.subcategories.map((subcategory, index) => {
                  // Get category color for subcategory header
                  const subcategoryColors = getCategoryColor(category.name);
                  
                  return (
                    <div key={subcategory.name}>
                      {/* Subcategory Header - Sticky with proper offset from search + category */}
                      <div className="sticky top-[8.25rem] z-20 bg-primary/95 backdrop-blur-sm border-b border-secondary/60 py-2.5 px-3 mb-3 rounded-md">
                        <h4 className={`text-xs font-medium ${subcategoryColors.textColor} flex items-center gap-2`}>
                          <subcategory.icon className={`size-3 ${subcategoryColors.iconColor}`} />
                          {subcategory.name}
                        </h4>
                      </div>

                      {/* Widget Models - 2 Column Grid */}
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {subcategory.widgets.map((widget) => (
                          <WidgetCard
                            key={widget.id}
                            widget={widget}
                            categoryName={category.name}
                            theme={theme}
                            onClick={handleWidgetClick}
                            onMouseEnter={handleWidgetMouseEnter}
                            onMouseLeave={handleWidgetMouseLeave}
                          />
                        ))}
                      </div>
                      
                      {/* Divider between subcategories */}
                      {index < category.subcategories!.length - 1 && (
                        <div className="border-t border-secondary/30 my-6"></div>
                      )}
                    </div>
                  );
                }) : 
                
                // Handle direct widgets (like Trending Widgets)
                category.widgets && (
                  <div className="py-3">
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {category.widgets.map((widget) => (
                        <WidgetCard
                          key={widget.id}
                          widget={widget}
                          categoryName={category.name}
                          theme={theme}
                          onClick={handleWidgetClick}
                          onMouseEnter={handleWidgetMouseEnter}
                          onMouseLeave={handleWidgetMouseLeave}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Popover */}
      {hoveredWidget && (
        <WidgetPopover 
          widget={hoveredWidget} 
          position={popoverPosition} 
          theme={theme}
        />
      )}
    </div>
  );
}; 