"use client";

import React, { useState, useCallback } from "react";
import { ChevronRight, Folder, File05, Plus } from "@untitledui/icons";
import { motion, AnimatePresence } from "motion/react";
import { cx } from "@/utils/cx";
import { Toggle } from "@/components/base/toggle/toggle";

// Types
export type TreeNode = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  data?: any;
  showAddButton?: boolean;
  showToggleButton?: boolean;
  toggleState?: boolean;
};

export type TreeViewProps = {
  data: TreeNode[];
  className?: string;
  onNodeClick?: (node: TreeNode) => void;
  onNodeExpand?: (nodeId: string, expanded: boolean) => void;
  onToggleChange?: (nodeId: string, isToggled: boolean) => void;
  defaultExpandedIds?: string[];
  expandedIds?: string[]; // Add controlled expansion support
  showLines?: boolean;
  showIcons?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  indent?: number;
  animateExpand?: boolean;
};

// Main TreeView component
export function TreeView({
  data,
  className,
  onNodeClick,
  onNodeExpand,
  onToggleChange,
  defaultExpandedIds = [],
  expandedIds,
  showLines = true,
  showIcons = true,
  selectable = true,
  multiSelect = false,
  selectedIds = [],
  onSelectionChange,
  indent = 20,
  animateExpand = true,
}: TreeViewProps) {
  const [internalExpandedIds, setInternalExpandedIds] = useState<Set<string>>(
    new Set(defaultExpandedIds),
  );
  const [internalSelectedIds, setInternalSelectedIds] =
    useState<string[]>(selectedIds);

  const isControlled =
    selectedIds !== undefined && onSelectionChange !== undefined;
  const currentSelectedIds = isControlled ? selectedIds : internalSelectedIds;

  // Use controlled expansion when expandedIds is provided
  const isExpansionControlled = expandedIds !== undefined;
  const currentExpandedIds = isExpansionControlled 
    ? new Set(expandedIds) 
    : internalExpandedIds;

  const toggleExpanded = useCallback(
    (nodeId: string) => {
      const isExpanded = currentExpandedIds.has(nodeId);
      
      if (isExpansionControlled) {
        // For controlled expansion, just call the callback
        onNodeExpand?.(nodeId, !isExpanded);
      } else {
        // For uncontrolled expansion, update internal state
        setInternalExpandedIds((prev) => {
          const newSet = new Set(prev);
          isExpanded ? newSet.delete(nodeId) : newSet.add(nodeId);
          onNodeExpand?.(nodeId, !isExpanded);
          return newSet;
        });
      }
    },
    [onNodeExpand, isExpansionControlled, currentExpandedIds],
  );

  const handleSelection = useCallback(
    (nodeId: string, ctrlKey = false) => {
      if (!selectable) return;

      let newSelection: string[];

      if (multiSelect && ctrlKey) {
        newSelection = currentSelectedIds.includes(nodeId)
          ? currentSelectedIds.filter((id) => id !== nodeId)
          : [...currentSelectedIds, nodeId];
      } else {
        newSelection = currentSelectedIds.includes(nodeId) ? [] : [nodeId];
      }

      isControlled
        ? onSelectionChange?.(newSelection)
        : setInternalSelectedIds(newSelection);
    },
    [
      selectable,
      multiSelect,
      currentSelectedIds,
      isControlled,
      onSelectionChange,
    ],
  );

  const renderNode = (
    node: TreeNode,
    level = 0,
    isLast = false,
    parentPath: boolean[] = [],
  ) => {
    const hasChildren = (node.children?.length ?? 0) > 0;
    const isExpanded = currentExpandedIds.has(node.id);
    const isSelected = currentSelectedIds.includes(node.id);
    const currentPath = [...parentPath, isLast];

    const getDefaultIcon = () =>
      hasChildren ? (
        isExpanded ? (
          <Folder className="size-5 text-fg-quaternary" />
        ) : (
          <Folder className="size-5 text-fg-quaternary" />
        )
      ) : (
        <File05 className="size-5 text-fg-quaternary" />
      );

    return (
      <div key={node.id} className="select-none">
        <motion.div
          className={cx(
            "group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
            isSelected && "bg-active hover:bg-secondary_hover",
            "px-3 py-2",
          )}
          style={{ paddingLeft: level * indent + 12 }}
          onClick={(e) => {
            if (hasChildren) toggleExpanded(node.id);
            handleSelection(node.id, e.ctrlKey || e.metaKey);
            onNodeClick?.(node);
          }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        >
          {/* Tree Lines */}
          {showLines && level > 0 && (
            <div className="absolute left-0 top-0 bottom-0 pointer-events-none">
              {currentPath.map((isLastInPath, pathIndex) => (
                <div
                  key={pathIndex}
                  className="absolute top-0 bottom-0 border-l border-secondary/40"
                  style={{
                    left: pathIndex * indent + 12,
                    display:
                      pathIndex === currentPath.length - 1 && isLastInPath
                        ? "none"
                        : "block",
                  }}
                />
              ))}
              <div
                className="absolute top-1/2 border-t border-secondary/40"
                style={{
                  left: (level - 1) * indent + 12,
                  width: indent - 4,
                  transform: "translateY(-1px)",
                }}
              />
              {isLast && (
                <div
                  className="absolute top-0 border-l border-secondary/40"
                  style={{
                    left: (level - 1) * indent + 12,
                    height: "50%",
                  }}
                />
              )}
            </div>
          )}

          {/* Left Chevron for expandable items */}
          {hasChildren && (
            <motion.div
              className="mr-1 size-3 shrink-0 flex items-center justify-center"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ChevronRight className="size-2.5 text-fg-quaternary transition-inherit-all" />
            </motion.div>
          )}

          {/* Node Icon */}
          {showIcons && (
            <motion.div
              className="mr-2 size-5 shrink-0 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.15 }}
            >
              {node.icon || getDefaultIcon()}
            </motion.div>
          )}

          {/* Label */}
          <span className="flex-1 text-sm font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate">
            {node.label}
          </span>
          {/* Plus Button */}
          {node.showAddButton && (
            <div className="ml-3 size-4 shrink-0 flex items-center justify-center">
              <button
                className="opacity-0 group-hover:opacity-100 flex items-center justify-center size-4 rounded hover:bg-secondary/70 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Add button clicked for:", node.label);
                }}
              >
                <Plus className="size-4 stroke-[2.5px] text-fg-quaternary" />
              </button>
            </div>
          )}
          {/* Toggle Button */}
          {node.showToggleButton && (
            <div className="ml-3 flex items-center justify-center">
              <Toggle
                size="sm"
                slim={true}
                isSelected={node.toggleState}
                onChange={(isSelected) => {
                  onToggleChange?.(node.id, isSelected);
                }}
              />
            </div>
          )}


        </motion.div>

        {/* Children */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: animateExpand ? 0.3 : 0,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{
                  duration: animateExpand ? 0.2 : 0,
                  delay: animateExpand ? 0.1 : 0,
                }}
              >
                {node.children!.map((child, index) =>
                  renderNode(
                    child,
                    level + 1,
                    index === node.children!.length - 1,
                    currentPath,
                  ),
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      className={cx(
        "w-full bg-primary border border-secondary rounded-xl",
        className,
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="p-0">
        {data.map((node, index) =>
          renderNode(node, 0, index === data.length - 1),
        )}
      </div>
    </motion.div>
  );
} 