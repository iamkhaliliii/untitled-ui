import React from "react";
import { cx } from "@/utils/cx";
import type { Widget } from "./types";
import { getCategoryColor, getTrendingColor } from "./widget-utils";

interface WidgetCardProps {
  widget: Widget;
  categoryName: string;
  theme: 'light' | 'dark';
  onClick: (widget: Widget) => void;
  onMouseEnter: (widget: Widget, event: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

export const WidgetCard = ({ 
  widget, 
  categoryName, 
  theme,
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
      className={cx(
        "group aspect-square flex flex-col items-center justify-center gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-sm text-center",
        theme === 'dark'
          ? "border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-gray-600"
          : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300",
        colors.hover
      )}
    >
      <div className={`w-full h-1 rounded-full ${colors.accent}`}></div>
      <div className={cx(
        "p-3 rounded-lg",
        theme === 'dark' ? "bg-gray-700" : "bg-gray-50"
      )}>
        <widget.icon className={cx(
          "size-8",
          theme === 'dark' ? "text-gray-300" : "text-gray-600"
        )} />
      </div>
      <h5 className={cx(
        "text-sm font-medium",
        theme === 'dark' ? "text-gray-100" : "text-gray-900"
      )}>{widget.name}</h5>
    </button>
  );
};

interface WidgetPopoverProps {
  widget: Widget;
  position: { x: number; y: number };
  theme: 'light' | 'dark';
}

export const WidgetPopover = ({ widget, position, theme }: WidgetPopoverProps) => {
  return (
    <div 
      className={cx(
        "fixed rounded-2xl shadow-2xl border w-128 z-50 pointer-events-none overflow-hidden",
        theme === 'dark'
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      )}
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
          className={cx(
            "w-full h-full object-cover rounded-2xl border",
            theme === 'dark' ? "border-gray-700" : "border-gray-200"
          )}
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
          <div className={cx(
            "p-1.5 rounded-md",
            theme === 'dark' ? "bg-gray-700" : "bg-gray-100"
          )}>
            <widget.icon className={cx(
              "size-3",
              theme === 'dark' ? "text-gray-300" : "text-gray-600"
            )} />
          </div>
          <div className="flex-1">
            <h3 className={cx(
              "text-sm font-semibold",
              theme === 'dark' ? "text-gray-100" : "text-gray-900"
            )}>{widget.name}</h3>
            <p className={cx(
              "text-xs",
              theme === 'dark' ? "text-gray-400" : "text-gray-500"
            )}>
              {widget.category}{widget.subcategory && ` • ${widget.subcategory}`}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <p className={cx(
            "text-sm leading-relaxed line-clamp-3",
            theme === 'dark' ? "text-gray-300" : "text-gray-600"
          )}>
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