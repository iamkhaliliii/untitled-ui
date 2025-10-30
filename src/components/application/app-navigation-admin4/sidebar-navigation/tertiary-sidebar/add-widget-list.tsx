import React from "react";
import { AlertCircle, Grid03, File01, Star01, Users01, ArrowLeft, HelpCircle, Code01, Image01, CursorBox, FlexAlignTop } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface AddWidgetListProps {
  onBack: () => void;
  onSelectWidget: (widget: any) => void;
  widgetType: 'space' | 'sidebar';
}

const spaceWidgets = [
  { id: 'hero-banner', label: 'Hero Banner', icon: CursorBox },
  { id: 'announcement-banner', label: 'Announcement Banner', icon: FlexAlignTop },
  { id: 'members', label: 'Members', icon: Users01, underDesign: true },
  { id: 'leaderboard', label: 'Leaderboard', icon: Star01, underDesign: true },
  { id: 'spaces', label: 'Spaces', icon: Grid03, underDesign: true },
  { id: 'html-script', label: 'Html Script', icon: Code01, underDesign: true },
  { id: 'rich-text', label: 'Rich Text', icon: File01, underDesign: true },
];

const sidebarWidgets = [
  { id: 'quick-actions', label: 'Quick Actions', icon: HelpCircle, underDesign: true },
  { id: 'recent-activity', label: 'Recent Activity', icon: File01, underDesign: true },
  { id: 'event-calendar', label: 'Event Calendar', icon: AlertCircle, underDesign: true },
  { id: 'member-list', label: 'Member List', icon: Users01, underDesign: true },
  { id: 'navigation-menu', label: 'Navigation Menu', icon: Grid03, underDesign: true },
];

export const AddWidgetList = ({ onBack, onSelectWidget, widgetType }: AddWidgetListProps) => {
  const widgets = widgetType === 'space' ? spaceWidgets : sidebarWidgets;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 pt-6 pb-4 border-b border-secondary dark:border-gray-700 bg-primary dark:bg-gray-900">
        <button
          onClick={onBack}
          className="p-1 rounded-md hover:bg-secondary/60 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="size-4 text-fg-quaternary dark:text-gray-400" />
        </button>
        <h3 className="text-sm font-semibold text-brand-secondary dark:text-brand-400">
          Add {widgetType === 'space' ? 'Space' : 'Sidebar'} Widget
        </h3>
      </div>

      {/* Widget List */}
      <div className="flex-1 min-w-0 text-content-subdued dark:text-gray-400 -m-2 p-4">
        <div className="space-y-1">
          {widgets.map((widget) => {
            const IconComponent = widget.icon;
            const isDisabled = widget.underDesign;
            
            return (
              <button
                key={widget.id}
                type="button"
                onClick={() => !isDisabled && onSelectWidget(widget)}
                disabled={isDisabled}
                className={cx(
                  "w-full py-2 px-5 transition-colors rounded-md text-gray-700 dark:text-gray-300",
                  isDisabled 
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <div className="flex flex-grow items-center gap-3">
                  <IconComponent className="shrink-0 h-5 w-5" />
                  <div className="text-start font-medium flex items-center gap-2">
                    <span>{widget.label}</span>
                    {isDisabled && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        (under design)
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
