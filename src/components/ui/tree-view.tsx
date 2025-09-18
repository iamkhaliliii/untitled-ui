"use client";

import React, { useState, useCallback } from "react";
import { ChevronRight, Folder, File05, Plus, ChevronDown, ChevronUp } from "@untitledui/icons";
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
  // Lazy loading props
  hasMore?: boolean;
  isLoading?: boolean;
  totalCount?: number;
  loadedCount?: number;
};

export type TreeViewProps = {
  data: TreeNode[];
  className?: string;
  onNodeClick?: (node: TreeNode) => void;
  onNodeExpand?: (nodeId: string, expanded: boolean) => void;
  onToggleChange?: (nodeId: string, isToggled: boolean) => void;
  onNodeAdd?: (node: TreeNode) => void;
  onLoadMore?: (nodeId: string, totalCount?: number) => void; // New prop for load more functionality
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
  onNodeAdd,
  onLoadMore,
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
          initial={node.data?.isSkeleton ? { opacity: 0, y: -5 } : false}
          animate={node.data?.isSkeleton ? { opacity: 0.8, y: 0 } : {}}
          transition={node.data?.isSkeleton ? { duration: 0.3, delay: 0.1 } : {}}
          className={cx(
            "group relative flex w-full items-center rounded-md outline-focus-ring transition duration-100 ease-linear select-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
            node.data?.isSkeleton 
              ? "bg-primary cursor-default opacity-80"
              : (node.data?.loadMoreId || node.data?.showLessId)
                ? "bg-secondary/5 hover:bg-secondary/10 text-gray-400 hover:text-gray-500 text-xs cursor-pointer"
                : "bg-primary hover:bg-primary_hover cursor-pointer",
            isSelected && !node.data?.loadMoreId && !node.data?.showLessId && "bg-active hover:bg-secondary_hover",
            (node.data?.loadMoreId || node.data?.showLessId) ? "px-2 py-1" : "px-2 py-2",
          )}
          style={{ paddingLeft: level * indent + 12 }}
          {...(node.data?.["data-tour-spaces-section"] && { "data-tour-spaces-section": true })}
          onClick={(e) => {
            // Don't handle clicks on skeleton items
            if (node.data?.isSkeleton) {
              return;
            }
            
            // Don't expand load more/show less buttons - just handle the click
            if (node.data?.loadMoreId || node.data?.showLessId) {
              onNodeClick?.(node);
              return;
            }
            
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
              className={cx(
                "mr-2 shrink-0 flex items-center justify-center",
                (node.data?.loadMoreId || node.data?.showLessId) ? "size-2.5" : "size-5"
              )}
              whileHover={{ scale: (node.data?.loadMoreId || node.data?.showLessId) ? 1.05 : 1.1 }}
              transition={{ duration: 0.15 }}
            >
              {node.icon || getDefaultIcon()}
            </motion.div>
          )}

          {/* Label */}
          {(node.data?.loadMoreId || node.data?.showLessId) && node.isLoading ? (
            // Skeleton for load more button
            <div className="flex items-center gap-2 flex-1">
              <div className="w-3 h-3 border-2 border-tertiary/20 border-t-tertiary rounded-full animate-spin" />
              <div className="flex-1 h-3 bg-secondary/20 rounded animate-pulse" />
            </div>
          ) : node.data?.isSkeleton ? (
            // Skeleton for regular items
            <div className="flex-1 flex items-center gap-2">
              <div className="h-3 bg-gray-400/30 rounded-full relative overflow-hidden flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/40 to-transparent animate-shimmer" />
              </div>
              <div className="h-3 w-8 bg-gray-400/20 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent animate-shimmer" style={{
                  animationDelay: '0.3s'
                }} />
              </div>
            </div>
          ) : (
            <span className={cx(
              "flex-1 font-medium transition-inherit-all truncate",
              (node.data?.loadMoreId || node.data?.showLessId)
                ? "text-xs text-gray-400 group-hover:text-gray-500"
                : "text-sm text-secondary group-hover:text-secondary_hover"
            )}>
              {node.label}
            </span>
          )}
          {/* Plus Button */}
          {node.showAddButton && (
            <div className="ml-3 size-4 shrink-0 flex items-center justify-center">
              <button
                className="opacity-0 group-hover:opacity-100 flex items-center justify-center size-4 rounded hover:bg-secondary/70 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onNodeAdd?.(node);
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
                
                {/* Loading Skeleton */}
                {node.isLoading && (
                  <div style={{ paddingLeft: (level + 1) * indent + 12 }}>
                    {[...Array(5)].map((_, skeletonIndex) => (
                      <motion.div
                        key={`skeleton-${skeletonIndex}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: skeletonIndex * 0.1,
                          ease: "easeOut"
                        }}
                        className="flex items-center px-2 py-2 my-1"
                      >
                        <div className="mr-1 size-3 shrink-0" />
                        <div className="mr-2 size-5 shrink-0 rounded relative overflow-hidden bg-secondary/20">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/40 to-transparent animate-shimmer" />
                        </div>
                        <div className="flex-1 h-4 rounded relative overflow-hidden bg-secondary/20">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/40 to-transparent animate-shimmer" style={{
                            animationDelay: '0.2s'
                          }} />
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Loading indicator text */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center px-2 py-1 mt-2"
                    >
                      <div className="flex items-center gap-2 text-xs text-tertiary">
                        <div className="w-3 h-3 border-2 border-brand-secondary/20 border-t-brand-secondary rounded-full animate-spin" />
                        <span>Loading more items...</span>
                      </div>
                    </motion.div>
                  </div>
                )}
                
                {/* Load More Button */}
                {node.hasMore && !node.isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ paddingLeft: (level + 1) * indent + 12 }}
                    className="px-2 py-1"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLoadMore?.(node.id, node.totalCount);
                      }}
                      className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-gray-400 hover:text-gray-500 bg-secondary/5 hover:bg-secondary/10 rounded-md transition-all duration-200 w-full"
                    >
                      {node.isLoading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-tertiary/20 border-t-tertiary rounded-full animate-spin" />
                          <div className="flex-1 h-3 bg-secondary/20 rounded animate-pulse" />
                        </>
                      ) : (
                        <>
                          <ChevronDown className="size-2.5 text-gray-400" />
                          <span>More</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
                
                {/* Show Less Button */}
                {!node.hasMore && !node.isLoading && node.loadedCount && node.totalCount && node.loadedCount > 5 && node.loadedCount >= node.totalCount && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ paddingLeft: (level + 1) * indent + 12 }}
                    className="px-2 py-1"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLoadMore?.(node.id, 5); // Reset to 5 items
                      }}
                      className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-gray-400 hover:text-gray-500 bg-secondary/5 hover:bg-secondary/10 rounded-md transition-all duration-200 w-full"
                    >
                      <ChevronUp className="size-2.5 text-gray-400" />
                      <span>Show less</span>
                    </button>
                  </motion.div>
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