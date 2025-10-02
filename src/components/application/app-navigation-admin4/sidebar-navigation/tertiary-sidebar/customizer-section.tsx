"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "@untitledui/icons";
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
  /** Optional action button */
  action?: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick: () => void;
  };
  /** Children content to show when expanded */
  children?: React.ReactNode;
  /** Additional className for the container */
  className?: string;
}

export const CustomizerSection = ({
  title,
  defaultExpanded = true,
  isExpanded: controlledExpanded,
  onExpandedChange,
  action,
  children,
  className
}: CustomizerSectionProps) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const theme = useResolvedTheme();
  
  // Use controlled state if provided, otherwise use internal state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  
  const handleToggle = () => {
    const newExpanded = !isExpanded;
    
    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    
    onExpandedChange?.(newExpanded);
  };

  return (
    <div className={cx("space-y-1 -mx-2", className)}>
      <button
        className={cx(
          "group w-full flex items-center text-start rounded-base focus:outline-none focus-visible:ring ring-inset ring-offset-0 font-medium py-2 px-2 text-md transition-colors",
          theme === 'dark'
            ? "text-gray-100 hover:text-gray-50 hover:bg-gray-800/20 rounded-md"
            : "text-content bg-surface hover:text-content-hovered hover:bg-surface-hovered"
        )}
        onClick={handleToggle}
      >
        <span className="flex-grow truncate tracking-tight">{title}</span>
        <div className="flex items-center gap-2 ml-2">
          {action && (
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
          {isExpanded ? (
            <ChevronUp className={cx(
              "h-5 w-5 transform transition-all ease-in-out duration-150 flex-shrink-0 shrink-0 ms-2",
              theme === 'dark' ? "text-gray-400" : "text-fg-secondary"
            )} />
          ) : (
            <ChevronDown className={cx(
              "h-5 w-5 transform transition-all ease-in-out duration-150 flex-shrink-0 shrink-0 ms-2",
              theme === 'dark' ? "text-gray-400" : "text-fg-secondary"
            )} />
          )}
        </div>
      </button>
      
      {/* Content */}
      {isExpanded && children && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 ease-out pt-2 pb-4 px-2">
          {children}
        </div>
      )}
    </div>
  );
};
