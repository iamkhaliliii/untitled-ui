import React from "react";
import type { Widget } from "./types";
import { getCategoryColor, getTrendingColor } from "./widget-utils";

interface WidgetCardProps {
  widget: Widget;
  categoryName: string;
  onClick: (widget: Widget) => void;
  onMouseEnter: (widget: Widget, event: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

export const WidgetCard = ({ 
  widget, 
  categoryName, 
  onClick, 
  onMouseEnter, 
  onMouseLeave 
}: WidgetCardProps) => {
  // Get colors based on category or widget type
  const colors = categoryName === "Trending Widgets" 
    ? getTrendingColor(widget.id)
    : getCategoryColor(categoryName);

  return (
    <button
      onClick={() => onClick(widget)}
      onMouseEnter={(e) => onMouseEnter(widget, e)}
      onMouseLeave={onMouseLeave}
      className={`group aspect-square flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-gray-200 bg-white ${colors.hover} transition-all duration-200 hover:shadow-sm text-center`}
    >
      <div className={`w-full h-1 rounded-full ${colors.accent}`}></div>
      <div className="p-3 bg-gray-50 rounded-lg">
        <widget.icon className="size-8 text-gray-600" />
      </div>
      <h5 className="text-sm font-medium text-gray-900">{widget.name}</h5>
    </button>
  );
};

interface WidgetPopoverProps {
  widget: Widget;
  position: { x: number; y: number };
}

export const WidgetPopover = ({ widget, position }: WidgetPopoverProps) => {
  return (
    <div 
      className="fixed bg-white rounded-2xl shadow-2xl border border-gray-200 w-128 z-50 pointer-events-none overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translateY(-20px)'
      }}
    >
      {/* Full Width Image at Top */}
      <div className="h-48 w-full px-4 pt-4 relative">
        <img 
          src={widget.previewImage || "/Presets.png"}
          alt={widget.name}
          className="w-full h-full object-cover rounded-2xl border border-gray-200"
        />
        {/* Status Badges */}
        {widget.badges && widget.badges.length > 0 && (
          <div className="absolute top-2 right-2 flex gap-1">
            {widget.badges.map((badge, index) => (
              <div
                key={index}
                className={`${badge.color} text-white p-1 rounded-full shadow-sm`}
                title={badge.type}
              >
                <badge.icon className="size-3" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Below Image */}
      <div className="p-3">
        {/* Header with widget info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-gray-100 rounded-md">
            <widget.icon className="size-3 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">{widget.name}</h3>
            <p className="text-xs text-gray-500">
              {widget.category}{widget.subcategory && ` • ${widget.subcategory}`}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {widget.description}
          </p>
        </div>

        {/* Ultra Compact Feature Tags */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {widget.features.slice(0, 10).map((feature, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 bg-gray-50/20 text-gray-600 text-[0.68rem] rounded-full border border-gray-200"
              >
                {feature}
              </span>
            ))}
            {widget.features.length > 10 && (
              <span className="px-1 py-0.5 bg-gray-50 text-gray-500 text-[0.68rem] rounded-sm border border-gray-200">
                +{widget.features.length - 10}
              </span>
            )}
          </div>
        </div>

        {/* Author Credit */}
        {widget.author && (
          <div className="text-xs text-gray-500">
            By: <span className="font-medium text-gray-700">{widget.author}</span>
          </div>
        )}
      </div>
    </div>
  );
}; 