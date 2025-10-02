"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface SectionHeaderProps {
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Section title */
  label: string;
  /** Optional action button */
  action?: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  /** Whether the section is expanded by default */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  isExpanded?: boolean;
  /** Callback when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Whether to show the accordion chevron */
  showChevron?: boolean;
  /** Children content to show when expanded */
  children?: React.ReactNode;
  /** Additional className for the container */
  className?: string;
}

export const SectionHeader = ({
  icon: Icon,
  label,
  action,
  defaultExpanded = true,
  isExpanded: controlledExpanded,
  onExpandedChange,
  showChevron = true,
  children,
  className
}: SectionHeaderProps) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  
  // Use controlled state if provided, otherwise use internal state
  // If showChevron is false, always show content
  const isExpanded = showChevron ? 
    (controlledExpanded !== undefined ? controlledExpanded : internalExpanded) : 
    true;
  
  const handleToggle = () => {
    const newExpanded = !isExpanded;
    
    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    
    onExpandedChange?.(newExpanded);
  };

  const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div className={cx("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div 
          className={cx(
            "flex items-center gap-2",
            showChevron && "cursor-pointer select-none"
          )}
          onClick={showChevron ? handleToggle : undefined}
        >
          <Icon className="size-4 text-brand-secondary" />
          <h5 className="text-sm font-semibold text-primary">{label}</h5>
          {showChevron && (
            <ChevronIcon className="size-3 text-fg-quaternary ml-1 transition-transform duration-200" />
          )}
        </div>
        
        {action && (
          <button
            className={cx(
              "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
              action.variant === 'primary'
                ? "text-white bg-brand-solid hover:bg-brand-solid_hover"
                : "text-brand-secondary bg-brand-50 border border-brand-200 hover:bg-brand-100 dark:text-brand-primary dark:bg-brand-solid/20 dark:border-brand-solid/30 dark:hover:bg-brand-solid/30"
            )}
            onClick={action.onClick}
          >
            {action.icon && <action.icon className="size-3" />}
            {action.label}
          </button>
        )}
      </div>
      
      {/* Content */}
      {isExpanded && children && (
        <div className="animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
