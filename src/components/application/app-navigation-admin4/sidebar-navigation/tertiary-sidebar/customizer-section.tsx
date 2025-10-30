"use client";

import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";

interface CustomizerSectionProps {
  /** Section title */
  title: string;
  /** Whether the section is expanded by default */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  isExpanded?: boolean;
  /** Callback when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Optional single action button (link style) */
  action?: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick: () => void;
  };
  /** Optional multiple utility actions */
  utilityActions?: React.ReactNode;
  /** Children content to show when expanded */
  children?: React.ReactNode;
  /** Additional className for the container */
  className?: string;
}

export const CustomizerSection = ({
  title,
  action,
  utilityActions,
  children,
  className
}: CustomizerSectionProps) => {
  const theme = useResolvedTheme();

  return (
    <div className={cx("space-y-1 -mx-2", className)}>
      <div
        className={cx(
          "group w-full flex items-center text-start rounded-base font-medium py-2 px-2 text-md",
          theme === 'dark'
            ? "text-gray-100"
            : "text-content bg-surface"
        )}
      >
        <span className="flex-grow truncate tracking-tight">{title}</span>
        <div className="flex items-center gap-2 ml-2">
          {/* Show utility actions if provided */}
          {utilityActions && (
            <div className="flex items-center gap-1">
              {utilityActions}
            </div>
          )}
          
          {/* Show single action if provided and no utility actions */}
          {action && !utilityActions && (
            <button
              className={cx(
                "flex items-center gap-1 px-1 py-0.5 text-xs font-medium transition-colors cursor-pointer",
                theme === 'dark'
                  ? "text-violet-400 hover:text-violet-300"
                  : "text-brand-secondary hover:text-brand-secondary_hover"
              )}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
            >
              {action.icon && <action.icon className="size-3" />}
              {action.label}
            </button>
          )}
        </div>
      </div>
      
      {/* Content - Always visible */}
      {children && (
        <div className="pt-2 pb-4 px-2">
          {children}
        </div>
      )}
    </div>
  );
};
