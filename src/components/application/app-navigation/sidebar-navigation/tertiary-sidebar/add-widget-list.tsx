import React from "react";
import { AlertCircle, Rows01, User01, Grid03, Edit03, File01, Star01, Bookmark, Users01, Tag01, Monitor01, ArrowLeft, HelpCircle, Code01, Link01, Image01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";

interface AddWidgetListProps {
  onBack: () => void;
  onSelectWidget: (widget: any) => void;
  widgetType: 'space' | 'sidebar';
}

const spaceWidgets = [
  { id: 'about', label: 'About', icon: AlertCircle },
  { id: 'accordions', label: 'Accordions', icon: Rows01 },
  { id: 'announcement-banner', label: 'Announcement Banner', icon: HelpCircle },
  { id: 'auth-member-card', label: 'Auth member card', icon: User01 },
  { id: 'collections-menu', label: 'Collections menu', icon: Grid03 },
  { id: 'composer', label: 'Composer', icon: Edit03 },
  { id: 'feed', label: 'Feed', icon: File01 },
  { id: 'hero-banner', label: 'Hero banner', icon: HelpCircle },
  { id: 'html-script', label: 'Html script', icon: Code01 },
  { id: 'leaderboard', label: 'Leaderboard', icon: Star01 },
  { id: 'link-menu', label: 'Link menu', icon: Bookmark },
  { id: 'members', label: 'Members', icon: Users01 },
  { id: 'posts', label: 'Posts', icon: File01 },
  { id: 'quick-links', label: 'Quick links', icon: Link01 },
  { id: 'rich-text', label: 'Rich text', icon: File01 },
  { id: 'section', label: 'Section', icon: Grid03 },
  { id: 'single-post', label: 'Single post', icon: File01 },
  { id: 'space-header', label: 'Space header', icon: Image01 },
  { id: 'spaces', label: 'Spaces', icon: Grid03 },
  { id: 'tags', label: 'Tags', icon: Tag01 },
  { id: 'iframe', label: 'iFrame', icon: Monitor01 },
];

const sidebarWidgets = [
  { id: 'quick-actions', label: 'Quick Actions', icon: HelpCircle },
  { id: 'recent-activity', label: 'Recent Activity', icon: File01 },
  { id: 'event-calendar', label: 'Event Calendar', icon: AlertCircle },
  { id: 'member-list', label: 'Member List', icon: Users01 },
  { id: 'navigation-menu', label: 'Navigation Menu', icon: Grid03 },
];

export const AddWidgetList = ({ onBack, onSelectWidget, widgetType }: AddWidgetListProps) => {
  const theme = useResolvedTheme();
  const widgets = widgetType === 'space' ? spaceWidgets : sidebarWidgets;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 pt-6 pb-4 border-b border-secondary bg-primary">
        <button
          onClick={onBack}
          className="p-1 rounded-md hover:bg-secondary/60 transition-colors"
        >
          <ArrowLeft className="size-4 text-fg-quaternary" />
        </button>
        <h3 className="text-sm font-semibold text-brand-secondary">
          Add {widgetType === 'space' ? 'Space' : 'Sidebar'} Widget
        </h3>
      </div>

      {/* Widget List */}
      <div className="flex-1 min-w-0 text-content-subdued -m-2 p-4">
        <div className="space-y-1">
          {widgets.map((widget) => {
            const IconComponent = widget.icon;
            return (
              <button
                key={widget.id}
                type="button"
                onClick={() => onSelectWidget(widget)}
                className={cx(
                  "w-full py-2 px-5 truncate transition-colors rounded-md",
                  "hover:bg-action-primary hover:text-content-on-primary",
                  "disabled:bg-surface-disabled disabled:text-content-disabled",
                  theme === 'dark' 
                    ? "hover:bg-blue-600 hover:text-white text-gray-300"
                    : "hover:bg-blue-600 hover:text-white text-gray-700"
                )}
              >
                <div className="flex flex-grow items-center gap-3">
                  <IconComponent className="shrink-0 h-5 w-5" />
                  <div className="text-start truncate font-medium">{widget.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
