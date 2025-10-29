import React from "react";
import { AlertCircle, Rows01, User01, Grid03, Edit03, File01, Star01, Bookmark, Users01, Tag01, Monitor01, ArrowLeft, HelpCircle, Code01, Link01, Image01, Calendar, MessageCircle02, Heart, HelpCircle as QuestionIcon } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface AddWidgetListProps {
  onBack: () => void;
  onSelectWidget: (widget: any) => void;
  widgetType: 'space' | 'sidebar';
}

const spaceWidgets = [
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'discussions', label: 'Discussions', icon: MessageCircle02 },
  { id: 'wishlists', label: 'Wishlists', icon: Heart },
  { id: 'questions', label: 'Questions', icon: QuestionIcon },
  { id: 'about', label: 'About', icon: AlertCircle, underDesign: true },
  { id: 'accordions', label: 'Accordions', icon: Rows01, underDesign: true },
  { id: 'announcement-banner', label: 'Banner', icon: HelpCircle, underDesign: true },
  { id: 'auth-member-card', label: 'Auth member card', icon: User01, underDesign: true },
  { id: 'collections-menu', label: 'Collections menu', icon: Grid03, underDesign: true },
  { id: 'composer', label: 'Composer', icon: Edit03, underDesign: true },
  { id: 'feed', label: 'Feed', icon: File01, underDesign: true },
  { id: 'hero-banner', label: 'Hero banner', icon: HelpCircle, underDesign: true },
  { id: 'html-script', label: 'Html script', icon: Code01, underDesign: true },
  { id: 'leaderboard', label: 'Leaderboard', icon: Star01, underDesign: true },
  { id: 'link-menu', label: 'Link menu', icon: Bookmark, underDesign: true },
  { id: 'members', label: 'Members', icon: Users01, underDesign: true },
  { id: 'posts', label: 'Posts', icon: File01, underDesign: true },
  { id: 'quick-links', label: 'Quick links', icon: Link01, underDesign: true },
  { id: 'rich-text', label: 'Rich text', icon: File01, underDesign: true },
  { id: 'section', label: 'Section', icon: Grid03, underDesign: true },
  { id: 'single-post', label: 'Single post', icon: File01, underDesign: true },
  { id: 'space-header', label: 'Space header', icon: Image01, underDesign: true },
  { id: 'spaces', label: 'Spaces', icon: Grid03, underDesign: true },
  { id: 'tags', label: 'Tags', icon: Tag01, underDesign: true },
  { id: 'iframe', label: 'iFrame', icon: Monitor01, underDesign: true },
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
