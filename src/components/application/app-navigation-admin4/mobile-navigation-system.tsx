"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { X, ChevronRight, ArrowLeft, Sun, Moon01, Monitor01, GraduationHat02, ChevronSelectorVertical, SearchLg, Plus, Archive } from "@untitledui/icons";
import { AnimatePresence, motion } from "motion/react";
import { cx } from "@/utils/cx";
import type { NavItemType } from "./config";
import { NavItemBase } from "./base-components/nav-item";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { LogOut01, LifeBuoy01, Settings01 } from "@untitledui/icons";
import { useTheme } from "@/providers/theme";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button as AriaButton } from "react-aria-components";
import { AdminStickyHeaderAccountMenu } from "@/components/application/admin-sticky-header-account-menu";
import { TreeView, type TreeNode } from "@/components/ui/tree-view";
import { File05, Folder, Calendar, File01, Package, Database01, LayoutAlt01 } from "@untitledui/icons";

interface MobileNavigationSystemProps {
    isOpen: boolean;
    onClose: () => void;
    items: NavItemType[];
    footerItems?: NavItemType[];
    activeUrl?: string;
}

type NavigationLevel = 'main' | 'secondary';

export const MobileNavigationSystem = ({
    isOpen,
    onClose,
    items,
    footerItems = [],
    activeUrl
}: MobileNavigationSystemProps) => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const [currentLevel, setCurrentLevel] = useState<NavigationLevel>('main');
    const [selectedMainItem, setSelectedMainItem] = useState<NavItemType | null>(null);
    const [expandedIds, setExpandedIds] = useState<string[]>(["spaces"]); // Only Collections & Spaces expanded by default in mobile
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Reset to main level when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentLevel('main');
            setSelectedMainItem(null);
            setSearchQuery(""); // Clear search when opening
        }
    }, [isOpen]);

    // Filter TreeView data based on search query
    const filterTreeData = (nodes: TreeNode[], query: string): TreeNode[] => {
        if (!query.trim()) return nodes;

        const filtered: TreeNode[] = [];
        
        for (const node of nodes) {
            const matchesQuery = node.label.toLowerCase().includes(query.toLowerCase());
            let filteredChildren: TreeNode[] = [];
            
            if (node.children) {
                filteredChildren = filterTreeData(node.children, query);
            }
            
            // Include node if it matches or has matching children
            if (matchesQuery || filteredChildren.length > 0) {
                filtered.push({
                    ...node,
                    children: filteredChildren.length > 0 ? filteredChildren : node.children
                });
            }
        }
        
        return filtered;
    };

    // Auto-expand all nodes when searching
    useEffect(() => {
        if (searchQuery.trim()) {
            const allNodeIds = getAllNodeIds(getSiteTreeData());
            setExpandedIds(allNodeIds);
        } else {
            setExpandedIds(["spaces"]); // Reset to default when clearing search
        }
    }, [searchQuery]);

    // Helper function to get all node IDs for expansion
    const getAllNodeIds = (nodes: TreeNode[]): string[] => {
        const ids: string[] = [];
        for (const node of nodes) {
            ids.push(node.id);
            if (node.children) {
                ids.push(...getAllNodeIds(node.children));
            }
        }
        return ids;
    };

    const handleMainItemClick = (item: NavItemType) => {
        // Special handling for Site item - show TreeView instead of regular subitems
        if (item.label === "Site") {
            setSelectedMainItem(item);
            setCurrentLevel('secondary');
        } else if (item.items && item.items.length > 0) {
            setSelectedMainItem(item);
            setCurrentLevel('secondary');
        } else if (item.href) {
            navigate(item.href);
            onClose();
        }
    };

    const handleSecondaryItemClick = (item: NavItemType) => {
        if (item.href) {
            navigate(item.href);
            onClose();
        }
    };

    const handleBackToMain = () => {
        setCurrentLevel('main');
        setSelectedMainItem(null);
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'light': return Sun;
            case 'dark': return Moon01;
            case 'system': return Monitor01;
            default: return Monitor01;
        }
    };

    const getThemeLabel = () => {
        switch (theme) {
            case 'light': return 'Light';
            case 'dark': return 'Dark';
            case 'system': return 'System';
            default: return 'System';
        }
    };

    const cycleTheme = () => {
        const themes = ['light', 'dark', 'system'] as const;
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    // Site TreeView data - exactly matching the desktop version
    const getSiteTreeData = (): TreeNode[] => {
        const currentAdminVersion = 'admin4';
        
        // Create folder with children (matching desktop logic)
        const createFolderWithChildren = (folderId: string, folderName: string) => ({
            id: folderId,
            label: folderName,
            icon: <Folder className="size-5 text-fg-quaternary" />,
            children: [
                {
                    id: `${folderId}-events`,
                    label: "Events",
                    icon: <File05 className="size-5 text-fg-quaternary" />,
                    data: folderId === "myFolder" ? { href: `/${currentAdminVersion}/site/spaces/myfolder/events` } : 
                          folderId === "myFolder2" ? { href: `/${currentAdminVersion}/site/spaces/growth/events` } : undefined
                },
                {
                    id: `${folderId}-blog`,
                    label: "Blog", 
                    icon: <File05 className="size-5 text-fg-quaternary" />,
                    data: folderId === "myFolder" ? { href: `/${currentAdminVersion}/site/spaces/myfolder/blog` } : 
                          folderId === "myFolder2" ? { href: `/${currentAdminVersion}/site/spaces/growth/blog` } : undefined
                },
                {
                    id: `${folderId}-help`,
                    label: "Help", 
                    icon: <File05 className="size-5 text-fg-quaternary" />,
                    data: folderId === "myFolder" ? { href: `/${currentAdminVersion}/site/spaces/myfolder/help` } : 
                          folderId === "myFolder2" ? { href: `/${currentAdminVersion}/site/spaces/growth/help` } : undefined
                },
                {
                    id: `${folderId}-posts`,
                    label: "Posts", 
                    icon: <File05 className="size-5 text-fg-quaternary" />,
                    data: folderId === "myFolder" ? { href: `/${currentAdminVersion}/site/spaces/myfolder/posts` } : 
                          folderId === "myFolder2" ? { href: `/${currentAdminVersion}/site/spaces/growth/posts` } : undefined
                },
            ]
        });

        // All base items (simple spaces without children) - matching your exact list
        const allBaseItems: TreeNode[] = [
            { id: "feed", label: "Feed", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "explorer", label: "Explorer", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "members", label: "Members", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "help", label: "Help", icon: <File05 className="size-5 text-fg-quaternary" /> },
        ];

        // Create multiple folders with children
        const folders = [
            createFolderWithChildren("myFolder", "MyFolder"),
            createFolderWithChildren("myFolder2", "Growth"),
        ];

        const spacesChildren: TreeNode[] = [
            ...allBaseItems,
            ...folders,
        ];
        
        return [
            {
                id: "spaces",
                label: "Collections & Spaces",
                showAddButton: true,
                icon: <Folder className="size-5 text-fg-quaternary" />,
                children: spacesChildren,
                hasMore: false,
                isLoading: false,
                totalCount: allBaseItems.length + folders.length,
                loadedCount: allBaseItems.length + folders.length,
                data: { "data-tour-spaces-section": true }
            },
            {
                id: "utilityPages",
                label: "Utility pages",
                icon: <File01 className="size-5 text-fg-quaternary" />,
                children: [
                    { id: "search", label: "Search" },
                    { id: "404", label: "404" },
                    { 
                        id: "privateSpace", 
                        label: "Private space",
                        data: { href: `/${currentAdminVersion}/site/spaces/private-space` }
                    },
                    { id: "memberProfile", label: "Member profile" },
                ]
            },
            {
                id: "navigation",
                label: "Navigation",
                icon: <LayoutAlt01 className="size-5 text-fg-quaternary" />,
                children: [
                    { id: "Configuration", label: "Config", icon: <Settings01 className="size-5 text-fg-quaternary" />},
                ],
                data: { "data-tour-navigation-item": true }
            },
            {
                id: "content-types",
                label: "Content Types",
                icon: <Database01 className="size-5 text-fg-quaternary" />,
                children: [
                    { 
                        id: "event", 
                        label: "Event",
                        icon: <Calendar className="size-5 text-fg-quaternary" />,
                        data: { href: `/${currentAdminVersion}/site/cms/events` }
                    },
                    { 
                        id: "blog", 
                        label: "Blog", 
                        icon: <File01 className="size-5 text-fg-quaternary" /> 
                    },
                ]
            }
        ];
    };

    const renderMainLevel = () => (
        <div className="flex flex-col h-full">
            {/* Header with Site Logo */}
            <div className="flex items-center justify-between p-4 border-b border-secondary">
                <div className="flex items-center gap-3 flex-1">
                    <Dropdown.Root>
                        <AriaButton className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                            <Avatar
                                size="sm"
                                src="https://www.untitledui.com/images/logos/badge/light-logomark/elasticware.svg"
                                alt="Elasticware"
                            />
                            <p className="font-medium text-secondary">Elasticware</p>
                            <ChevronSelectorVertical className="w-4 h-4 text-fg-quaternary ml-1" />
                        </AriaButton>
                        <Dropdown.Popover className="z-[80] !w-80">
                            <AdminStickyHeaderAccountMenu />
                        </Dropdown.Popover>
                    </Dropdown.Root>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
                    aria-label="Close menu"
                >
                    <X className="w-5 h-5 text-fg-quaternary" />
                </button>
            </div>

            {/* Main Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                    {items.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleMainItemClick(item)}
                            className={cx(
                                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                                activeUrl === item.href || item.items?.some(subItem => subItem.href === activeUrl)
                                    ? "bg-active text-secondary_hover"
                                    : "text-secondary hover:text-primary hover:bg-secondary"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon && <item.icon className="w-5 h-5" />}
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {item.items && item.items.length > 0 && (
                                <ChevronRight className="w-4 h-4 text-fg-quaternary" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-secondary">
                {/* Bottom Action Icons */}
                <div className="flex items-center justify-around p-3 border-b border-secondary">
                    <ButtonUtility
                        size="sm"
                        color="tertiary"
                        icon={LifeBuoy01}
                        tooltip="Support"
                        onClick={() => {
                            navigate('/support');
                            onClose();
                        }}
                        className="flex-1 max-w-none"
                    />
                    <ButtonUtility
                        size="sm"
                        color="tertiary"
                        icon={GraduationHat02}
                        tooltip="Onboarding"
                        onClick={() => {
                            navigate('/admin4/onboarding');
                            onClose();
                        }}
                        className="flex-1 max-w-none"
                    />
                    <ButtonUtility
                        size="sm"
                        color="tertiary"
                        icon={getThemeIcon()}
                        tooltip={`Theme: ${getThemeLabel()}`}
                        onClick={cycleTheme}
                        className="flex-1 max-w-none"
                    />
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-3 p-4">
                    <AvatarLabelGroup
                        status="online"
                        size="sm"
                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                        title="Olivia Rhye"
                        subtitle="olivia@untitledui.com"
                    />
                    <ButtonUtility
                        size="sm"
                        color="tertiary"
                        icon={LogOut01}
                        tooltip="Logout"
                        className="ml-auto"
                    />
                </div>
            </div>
        </div>
    );

    const renderSecondaryLevel = () => (
        <div className="flex flex-col h-full">
            {/* Header with back button */}
            <div className="flex items-center gap-3 p-4 border-b border-secondary flex-shrink-0">
                <button
                    onClick={handleBackToMain}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    aria-label="Back to main menu"
                >
                    <ArrowLeft className="w-5 h-5 text-fg-quaternary" />
                </button>
                <div className="flex items-center gap-3">
                    {selectedMainItem?.icon && (
                        <selectedMainItem.icon className="w-5 h-5 text-brand-solid" />
                    )}
                    <h2 className="text-lg font-semibold text-primary">{selectedMainItem?.label}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors ml-auto"
                    aria-label="Close menu"
                >
                    <X className="w-5 h-5 text-fg-quaternary" />
                </button>
            </div>

            {selectedMainItem?.label === "Site" ? (
                <>
                    {/* Scrollable Content - Constrained height */}
                    <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-4">
                                {/* Search Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <SearchLg className="h-5 w-5 text-fg-quaternary" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search spaces and pages..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-secondary rounded-lg bg-primary text-primary placeholder-fg-quaternary focus:outline-none focus:ring-2 focus:ring-brand-solid focus:border-transparent text-base"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            <X className="h-4 w-4 text-fg-quaternary hover:text-fg-secondary transition-colors" />
                                        </button>
                                    )}
                                </div>

                                {/* TreeView for Site item */}
                                <div className="pb-4">
                                    <TreeView
                                        data={filterTreeData(getSiteTreeData(), searchQuery)}
                                        expandedIds={expandedIds}
                                        selectedIds={[]}
                                        onNodeClick={(node) => {
                                            console.log('Node clicked:', node);
                                            if (node.data?.href) {
                                                console.log('Navigating to:', node.data.href);
                                                navigate(node.data.href);
                                                onClose();
                                            }
                                        }}
                                        onNodeExpand={(nodeId, expanded) => {
                                            if (expanded) {
                                                setExpandedIds(prev => [...prev, nodeId]);
                                            } else {
                                                setExpandedIds(prev => prev.filter(id => id !== nodeId));
                                            }
                                        }}
                                        className="border-none bg-transparent [&_.tree-node]:!py-3 [&_.tree-node]:!px-3 [&_.tree-node_span]:!text-base [&_.tree-node_.size-5]:!size-6"
                                        showLines={false}
                                        showIcons={true}
                                        indent={24}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer with Add Buttons - Compact Design */}
                    <div className="flex-shrink-0 border-t border-secondary bg-primary h-[100px]">
                        <div className="flex flex-col justify-center h-full px-4">
                            <div className="space-y-1">
                                <button
                                    onClick={() => {
                                        console.log('Add Space clicked');
                                        navigate('/admin4/site/spaces/create');
                                        onClose();
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2  hover:bg-secondary_hover text-secondary hover:text-primary transition-colors"
                                >
                                    <Plus className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-medium text-sm">Add Space</span>
                                </button>
                                
                                <button
                                    onClick={() => {
                                        console.log('Add Collection clicked');
                                        navigate('/admin4/site/collections/create');
                                        onClose();
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2  hover:bg-secondary_hover text-secondary hover:text-primary transition-colors"
                                >
                                    <Archive className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-medium text-sm">Add Collection</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // Regular subitems for other items
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-1">
                        {selectedMainItem?.items?.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleSecondaryItemClick(item)}
                                className={cx(
                                    "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                                    activeUrl === item.href
                                        ? "bg-active text-secondary_hover"
                                        : "text-secondary hover:text-primary hover:bg-secondary"
                                )}
                            >
                                {item.icon && <item.icon className="w-5 h-5" />}
                                <span className="font-medium">{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto px-2 py-1 text-xs bg-brand-solid text-white rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            duration: 0.25,
                            ease: "easeInOut"
                        }}
                        className="fixed inset-0 bg-overlay/70 backdrop-blur-sm z-[70] lg:hidden"
                        onClick={onClose}
                    />

                    {/* Sliding Panel */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ 
                            x: 0,
                            width: currentLevel === 'main' ? "75%" : "100%"
                        }}
                        exit={{ 
                            x: "-100%",
                            transition: { 
                                duration: 0.25,
                                ease: "easeIn"
                            }
                        }}
                        transition={{ 
                            duration: 0.25,
                            ease: "easeOut"
                        }}
                        className={cx(
                            "fixed top-0 left-0 bottom-0 bg-primary border-r border-secondary z-[71] lg:hidden",
                            currentLevel === 'main' ? "max-w-sm" : ""
                        )}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentLevel}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                    duration: 0.15,
                                    ease: "easeInOut"
                                }}
                                className="h-full"
                            >
                                {currentLevel === 'main' ? renderMainLevel() : renderSecondaryLevel()}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
