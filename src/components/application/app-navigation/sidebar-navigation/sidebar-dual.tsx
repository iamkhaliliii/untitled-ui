"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { LogOut01, Palette, Settings01, Sun, Moon01, Monitor01, Grid03, Package, Folder, LayoutAlt01, Rows01, Settings02, Archive, LayoutTop, LayoutLeft, LayoutRight, LayoutBottom, FlexAlignTop, Menu01, Menu02, User02, FlexAlignBottom, Calendar, File01, File02, FileX02, File04, File05, ArrowLeft, Globe01, Users01, SearchLg, AlertTriangle, Check, X, BarChart03, ClipboardCheck, MessageChatCircle, Lightbulb01, BookOpen01, Edit03, MessageSquare01, Plus, FilePlus01, AlertCircle, Tag01, Placeholder, Data, Database01, Link01, FolderCode, InfoCircle, ChevronDown, ChevronUp, Heart, Shield01 } from "@untitledui/icons";
import { Button as AriaButton, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover, Menu } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { cx } from "@/utils/cx";
import { MobileNavigationHeader } from "../base-components/mobile-header";
import { NavAccountMenu } from "../base-components/nav-account-card";
import { NavItemBase } from "../base-components/nav-item";
import { NavItemButton } from "../base-components/nav-item-button";
import { NavList } from "../base-components/nav-list";
import type { NavItemDividerType, NavItemType } from "../config";
import { useTheme } from "@/providers/theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";
import { TreeView, type TreeNode } from "@/components/ui/tree-view";
import { Input, InputBase } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { RadioButton } from "@/components/base/radio-buttons/radio-buttons";
import { useAdmin } from "@/hooks/use-admin";
import { EventsGeneralSettings } from "./tertiary-sidebar/events-general-settings";
import { EventsSeoSettings } from "./tertiary-sidebar/events-seo-settings";
import { EventsMembersSettings } from "./tertiary-sidebar/events-members-settings";
import { EventsAnalyticsSettings } from "./tertiary-sidebar/events-analytics-settings";
import { EventsAuditLogsSettings } from "./tertiary-sidebar/events-audit-logs-settings";
import { EventsDangerSettings } from "./tertiary-sidebar/events-danger-settings";
import { EventsPermissionsSettings } from "./tertiary-sidebar/events-permissions-settings";
import { AddSpaceModal } from "../../modals/add-space-modal";
import { SpaceConfigurationModal } from "../../modals/space-configuration-modal";
import { FieldSelectionModal } from "../../modals/field-selection-modal";
import { EventsCustomizeSettings } from "./tertiary-sidebar/events-customize-settings";
import { CmsEventsSettings } from "./tertiary-sidebar/cms-events-settings";
import { WidgetSelection } from "./tertiary-sidebar/widget-selection";
import WidgetConfig from "./tertiary-sidebar/widget-config";
import { TourGuide, useTourGuide, type TourStep } from "../../tour-guide";

// Space types for create page
const spaceTypes = [
    {
        id: "explore",
        label: "Explore",
        description: "A general exploration space for community discovery",
        icon: Package,
        color: "bg-blue-100/20 text-blue-400"
    },
    {
        id: "guidelines",
        label: "Guidelines", 
        description: "Community guidelines and rules",
        icon: BookOpen01,
        color: "bg-purple-100/20 text-purple-400"
    },
    {
        id: "discussions",
        label: "Discussions",
        description: "Open discussions and conversations", 
        icon: MessageSquare01,
        color: "bg-green-100/20 text-green-400"
    },
    {
        id: "questions",
        label: "Questions",
        description: "Q&A and help requests",
        icon: MessageChatCircle,
        color: "bg-orange-100/20 text-orange-400"
    },
    {
        id: "articles",
        label: "Articles",
        description: "Blog posts and articles",
        icon: Edit03,
        color: "bg-indigo-100/20 text-indigo-400"
    },
    {
        id: "events",
        label: "Events",
        description: "Community events and meetups",
        icon: Calendar,
        color: "bg-red-100/20 text-red-400"
    },
    {
        id: "changelogs",
        label: "Changelogs",
        description: "Product updates and release notes",
        icon: FileX02,
        color: "bg-teal-100/20 text-teal-400"
    },
    {
        id: "jobs",
        label: "Jobs",
        description: "Job postings and career opportunities",
        icon: Rows01,
        color: "bg-yellow-100/20 text-yellow-400"
    },
    {
        id: "wishlist",
        label: "Wishlist",
        description: "Feature requests and ideas",
        icon: Lightbulb01,
        color: "bg-pink-100/20 text-pink-400"
    },
    {
        id: "podcast",
        label: "Podcast",
        description: "Podcast episodes and audio content",
        icon: User02,
        color: "bg-cyan-100/20 text-cyan-400"
    },
    {
        id: "blank",
        label: "Blank",
        description: "Start with a blank space",
        icon: File01,
        color: "bg-gray-100/20 text-gray-400"
    },
    {
        id: "landing-page",
        label: "Landing Page",
        description: "Create a landing page for your community",
        icon: Globe01,
        color: "bg-emerald-100/20 text-emerald-400"
    },
    {
        id: "experts-directory",
        label: "Experts Directory",
        description: "Directory of community experts",
        icon: Users01,
        color: "bg-violet-100/20 text-violet-400"
    },
    {
        id: "partners-directory",
        label: "Partners Directory", 
        description: "Directory of partners and collaborators",
        icon: Users01,
        color: "bg-rose-100/20 text-rose-400"
    }
];

interface SidebarNavigationDualProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: (NavItemType | NavItemDividerType)[];
    /** List of footer items to display. */
    footerItems?: (NavItemType | NavItemDividerType)[];
    /** Whether to hide the border. */
    hideBorder?: boolean;
    /** Whether to hide the right side border. */
    hideRightBorder?: boolean;
}

export const SidebarNavigationDual = ({ activeUrl, items, footerItems = [], hideBorder, hideRightBorder }: SidebarNavigationDualProps) => {
    const navigate = useNavigate();
    const { toggleStates, updateToggleStates, addSpaceWidget, addSidebarWidget } = useWidgetConfig();
    const { isAdmin, adminHeaderVisible, adminHeaderCollapsed } = useAdmin();
    
    // Check if user came from CMS page
    const urlParams = new URLSearchParams(window.location.search);
    const fromCms = urlParams.get('from') === 'cms';
    const startTour = urlParams.get('startTour') === 'true';
    
    // Tour guide functionality
    const tourGuide = useTourGuide();

    // Determine current admin version from activeUrl
    const getCurrentAdminVersion = () => {
        if (activeUrl?.includes('/admin2')) return 'admin2';
        if (activeUrl?.includes('/admin3')) return 'admin3';
        return 'admin3'; // default to admin3
    };

    const currentAdminVersion = getCurrentAdminVersion();

    // Tour steps for spaces creation with enhanced descriptions
    const spacesTourSteps: TourStep[] = [
        {
            id: "main-sidebar",
            title: "🎯 Welcome to Your Admin Hub",
            description: "This sleek navigation sidebar is your command center! From here, you can access all the powerful tools to manage and grow your community.",
            targetSelector: "[data-tour-main-sidebar]",
            position: "right"
        },
        {
            id: "site-section",
            title: "🏗️ Site Management Center",
            description: "The Site section is where the magic happens! This is your gateway to managing spaces, organizing content, and customizing your community's structure.",
            targetSelector: "[data-tour-site-section]",
            position: "right"
        },
        {
            id: "secondary-sidebar",
            title: "📁 Your Content Architecture",
            description: "Think of this as your digital filing cabinet! Here you'll see all your collections, spaces, and pages organized in a clean, hierarchical structure.",
            targetSelector: "[data-tour-secondary-sidebar]",
            position: "right"
        },
        {
            id: "spaces-section",
            title: "🗂️ Collections & Spaces Hub",
            description: "This is where your content comes to life! Collections and spaces help you organize discussions, articles, events, and more into meaningful categories.",
            targetSelector: "[data-tour-spaces-section]",
            position: "right"
        },
        {
            id: "add-space-button",
            title: "✨ Create Your First Space",
            description: "Ready to build something amazing? Click this button to create a new space and start organizing your community content. Let's make it happen!",
            targetSelector: "[data-tour-add-space]",
            position: "right",
            action: () => {
                // Simulate clicking the add space button
                const addSpaceButton = document.querySelector("[data-tour-add-space]") as HTMLElement;
                if (addSpaceButton) {
                    addSpaceButton.click();
                }
            }
        }
    ];

    // Start tour when URL parameter is present
    useEffect(() => {
        if (startTour && activeUrl?.includes('/site/spaces/create')) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                tourGuide.startTour(spacesTourSteps);
            }, 500);
        }
    }, [startTour, activeUrl]);

    // State for tree expansion
    const [expandedIds, setExpandedIds] = useState<string[]>(["spaces"]);
    
    // State for customize page tree expansion
    const [customizeExpandedIds, setCustomizeExpandedIds] = useState<string[]>([]);
    
    // State for CMS tree expansion
    const [cmsExpandedIds, setCmsExpandedIds] = useState<string[]>(["models"]);
    


    // Ref to prevent double execution and track folder count
    const isAddingFolderRef = useRef(false);
    const folderCounterRef = useRef(2);

    // State for tracking previous tab
    const [previousSecondaryItem, setPreviousSecondaryItem] = useState<string>("general");
    
    // State for secondary sidebar selection
    const [selectedSecondaryItem, setSelectedSecondaryItem] = useState<string>(() => {
        // Set initial state based on current URL
        if (activeUrl?.includes("/site/spaces/myfolder/events/customize")) return "customize";
        if (activeUrl?.includes("/site/spaces/myfolder/events/permissions")) return "permissions";
        if (activeUrl?.includes("/site/spaces/myfolder/events/members")) return "members";
        if (activeUrl?.includes("/site/spaces/myfolder/events/analytics")) return "analytics";
        if (activeUrl?.includes("/site/spaces/myfolder/events/audit-logs")) return "audit-logs";
        if (activeUrl?.includes("/site/spaces/myfolder/events/seo")) return "seo";
        if (activeUrl?.includes("/site/spaces/myfolder/events/danger")) return "danger";
        if (activeUrl?.includes("/site/spaces/myfolder/blog/customize")) return "customize";
        if (activeUrl?.includes("/site/spaces/myfolder/blog/permissions")) return "permissions";
        if (activeUrl?.includes("/site/spaces/myfolder/blog/members")) return "members";
        if (activeUrl?.includes("/site/spaces/myfolder/blog/analytics")) return "analytics";
        if (activeUrl?.includes("/site/spaces/myfolder/blog/audit-logs")) return "audit-logs";
        if (activeUrl?.includes("/site/spaces/myfolder/blog/seo")) return "seo";
        if (activeUrl?.includes("/site/spaces/myfolder/blog/danger")) return "danger";
        if (activeUrl?.includes("/site/spaces/myfolder/help/customize")) return "customize";
        if (activeUrl?.includes("/site/spaces/myfolder/help/permissions")) return "permissions";
        if (activeUrl?.includes("/site/spaces/myfolder/help/members")) return "members";
        if (activeUrl?.includes("/site/spaces/myfolder/help/analytics")) return "analytics";
        if (activeUrl?.includes("/site/spaces/myfolder/help/audit-logs")) return "audit-logs";
        if (activeUrl?.includes("/site/spaces/myfolder/help/seo")) return "seo";
        if (activeUrl?.includes("/site/spaces/myfolder/help/danger")) return "danger";
        if (activeUrl?.includes("/site/spaces/myfolder/posts/customize")) return "customize";
        if (activeUrl?.includes("/site/spaces/myfolder/posts/permissions")) return "permissions";
        if (activeUrl?.includes("/site/spaces/myfolder/posts/members")) return "members";
        if (activeUrl?.includes("/site/spaces/myfolder/posts/analytics")) return "analytics";
        if (activeUrl?.includes("/site/spaces/myfolder/posts/audit-logs")) return "audit-logs";
        if (activeUrl?.includes("/site/spaces/myfolder/posts/seo")) return "seo";
        if (activeUrl?.includes("/site/spaces/myfolder/posts/danger")) return "danger";
        // Growth folder routes
        if (activeUrl?.includes("/site/spaces/growth/events/customize")) return "customize";
        if (activeUrl?.includes("/site/spaces/growth/events/permissions")) return "permissions";
        if (activeUrl?.includes("/site/spaces/growth/events/members")) return "members";
        if (activeUrl?.includes("/site/spaces/growth/events/analytics")) return "analytics";
        if (activeUrl?.includes("/site/spaces/growth/events/audit-logs")) return "audit-logs";
        if (activeUrl?.includes("/site/spaces/growth/events/seo")) return "seo";
        if (activeUrl?.includes("/site/spaces/growth/events/danger")) return "danger";
        if (activeUrl?.includes("/site/spaces/growth/blog/customize")) return "customize";
        if (activeUrl?.includes("/site/spaces/growth/blog/permissions")) return "permissions";
        if (activeUrl?.includes("/site/spaces/growth/blog/members")) return "members";
        if (activeUrl?.includes("/site/spaces/growth/blog/analytics")) return "analytics";
        if (activeUrl?.includes("/site/spaces/growth/blog/audit-logs")) return "audit-logs";
        if (activeUrl?.includes("/site/spaces/growth/blog/seo")) return "seo";
        if (activeUrl?.includes("/site/spaces/growth/blog/danger")) return "danger";
        if (activeUrl?.includes("/site/spaces/growth/help/customize")) return "customize";
        if (activeUrl?.includes("/site/spaces/growth/help/permissions")) return "permissions";
        if (activeUrl?.includes("/site/spaces/growth/help/members")) return "members";
        if (activeUrl?.includes("/site/spaces/growth/help/analytics")) return "analytics";
        if (activeUrl?.includes("/site/spaces/growth/help/audit-logs")) return "audit-logs";
        if (activeUrl?.includes("/site/spaces/growth/help/seo")) return "seo";
        if (activeUrl?.includes("/site/spaces/growth/help/danger")) return "danger";
        if (activeUrl?.includes("/site/spaces/growth/posts/customize")) return "customize";
        if (activeUrl?.includes("/site/spaces/growth/posts/permissions")) return "permissions";
        if (activeUrl?.includes("/site/spaces/growth/posts/members")) return "members";
        if (activeUrl?.includes("/site/spaces/growth/posts/analytics")) return "analytics";
        if (activeUrl?.includes("/site/spaces/growth/posts/audit-logs")) return "audit-logs";
        if (activeUrl?.includes("/site/spaces/growth/posts/seo")) return "seo";
        if (activeUrl?.includes("/site/spaces/growth/posts/danger")) return "danger";
        if (activeUrl?.includes("/site/spaces/private-space/customize")) return "customize";
        if (activeUrl?.includes("/site/cms/events/customize")) return "customize";
        if (activeUrl?.includes("/site/cms/events/settings")) return "general";
        // For CMS events, default to customize
        if (activeUrl?.includes("/site/cms/events")) return "customize";
        return "general";
    });

    // Dynamic tree data with additional folders
    const [additionalFolders, setAdditionalFolders] = useState<TreeNode[]>([]);
    
    // Lazy loading state
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const [loadedCounts, setLoadedCounts] = useState<Record<string, number>>({});
    

    
    // Paginate children for a node
    const getPaginatedChildren = (nodeId: string, allChildren: TreeNode[], initialSize?: number): TreeNode[] => {
        const defaultInitialSize = initialSize || 5;
        const currentLoaded = loadedCounts[nodeId] || defaultInitialSize;
        return allChildren.slice(0, currentLoaded);
    };
    
    // Handle load more functionality - load ALL remaining items
    const handleLoadMore = useCallback((nodeId: string, totalCount?: number) => {
        setLoadingStates(prev => ({ ...prev, [nodeId]: true }));
        
        // Simulate network delay
        setTimeout(() => {
            setLoadedCounts(prev => ({
                ...prev,
                [nodeId]: totalCount || (prev[nodeId] || 5) + 5 // Load ALL items or fallback to +5
            }));
            setLoadingStates(prev => ({ ...prev, [nodeId]: false }));
        }, 1500);
    }, []);

    // Handle show less functionality - collapse back to 5 items
    const handleShowLess = useCallback((nodeId: string) => {
        setLoadedCounts(prev => ({
            ...prev,
            [nodeId]: 5 // Reset to 5 items
        }));
    }, []);

    // Helper function to create folder with children
    const createFolderWithChildren = (folderId: string, folderLabel: string, childrenCount: number = 20) => {
        const allChildren = [
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
            { id: `${folderId}-wishlist`, label: "Wishlist", icon: <File05 className="size-5 text-fg-quaternary" /> },
            ...Array.from({ length: childrenCount }, (_, index) => ({
                id: `${folderId}-item-${index + 6}`,
                label: `${folderLabel} Item ${index + 6}`,
                icon: <File05 className="size-5 text-fg-quaternary" />,
            }))
        ];
        
        const paginatedChildren = getPaginatedChildren(folderId, allChildren);
        const loadedCount = loadedCounts[folderId] || 5;
        
        // Add skeleton items for loading state - show skeletons for ALL remaining items
        const totalItems = 5 + childrenCount;
        const remainingCount = Math.max(0, totalItems - loadedCount);
        const skeletonItems = loadingStates[folderId] ? Array.from({ length: remainingCount }, (_, index) => ({
            id: `skeleton-${folderId}-${index}`,
            label: "Loading...",
            icon: <div className="size-5 bg-gray-400/30 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent animate-shimmer" style={{
                    animationDelay: `${index * 0.05}s`
                }} />
            </div>,
            isLoading: true,
            data: { isSkeleton: true }
        })) : [];
        
        const childrenWithSkeletons = [...paginatedChildren, ...skeletonItems];
        
        return {
            id: folderId,
            label: folderLabel,
            icon: <Folder className="size-5 text-fg-quaternary" />,
            children: childrenWithSkeletons,
            hasMore: !loadingStates[folderId] && loadedCount < totalItems,
            isLoading: loadingStates[folderId] || false,
            totalCount: totalItems,
            loadedCount: loadedCount
        };
    };

    // Initial file tree data for Site section
    const getInitialSiteFileTree = (): TreeNode[] => {
        // All base items (simple spaces without children)
        const allBaseItems: TreeNode[] = [
            { id: "feed", label: "Feed", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "explorer", label: "Explorer", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "members", label: "Members", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "help", label: "Help", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "showcase", label: "Showcase", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "announcements", label: "Announcements", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "general", label: "General Discussion", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "introductions", label: "Introductions", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "feedback", label: "Feedback", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "resources", label: "Resources", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "random", label: "Random", icon: <File05 className="size-5 text-fg-quaternary" /> },
            { id: "offtopic", label: "Off Topic", icon: <File05 className="size-5 text-fg-quaternary" /> },
        ];

        // Create multiple folders with independent pagination
        const folders = [
            createFolderWithChildren("myFolder", "MyFolder", 15),
            createFolderWithChildren("myFolder2", "Growth", 15),
            createFolderWithChildren("myFolder3", "MyFolder3", 15),
            createFolderWithChildren("myFolder4", "MyFolder4", 15),
            createFolderWithChildren("myFolder5", "MyFolder5", 15),
            createFolderWithChildren("myFolder6", "MyFolder6", 15),
            createFolderWithChildren("myFolder7", "MyFolder7", 15),
            createFolderWithChildren("myFolder8", "MyFolder8", 15),
            createFolderWithChildren("myFolder9", "MyFolder9", 15),
            createFolderWithChildren("myFolder10", "MyFolder10", 15),
        ];

        // Paginate simple items and folders separately
        const paginatedBaseItems = getPaginatedChildren("spaces-simple", allBaseItems);
        const paginatedFolders = getPaginatedChildren("spaces-folders", folders);
        const simpleLoadedCount = loadedCounts["spaces-simple"] || 5;
        const foldersLoadedCount = loadedCounts["spaces-folders"] || 5;

        // Add skeleton items for loading states - show skeletons for ALL remaining items
        const simpleRemainingCount = Math.max(0, allBaseItems.length - simpleLoadedCount);
        const simpleSkeletonItems = loadingStates["spaces-simple"] ? Array.from({ length: simpleRemainingCount }, (_, index) => ({
            id: `skeleton-simple-${index}`,
            label: "Loading...",
            icon: <div className="size-5 bg-gray-400/30 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent animate-shimmer" style={{
                    animationDelay: `${index * 0.05}s`
                }} />
            </div>,
            isLoading: true,
            data: { isSkeleton: true }
        })) : [];

        const foldersRemainingCount = Math.max(0, folders.length - foldersLoadedCount);
        const foldersSkeletonItems = loadingStates["spaces-folders"] ? Array.from({ length: foldersRemainingCount }, (_, index) => ({
            id: `skeleton-folders-${index}`,
            label: "Loading...",
            icon: <div className="size-5 bg-gray-400/30 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent animate-shimmer" style={{
                    animationDelay: `${index * 0.05}s`
                }} />
            </div>,
            isLoading: true,
            data: { isSkeleton: true }
        })) : [];

        // Combine paginated items with their respective load more buttons
        const spacesChildren: TreeNode[] = [
            ...paginatedBaseItems,
            ...simpleSkeletonItems,
            // Add load more or show less for simple items
            ...(!loadingStates["spaces-simple"] && simpleLoadedCount < allBaseItems.length ? [{
                id: "load-more-simple",
                label: "More",
                icon: <ChevronDown className="size-2.5 text-gray-400" />,
                hasMore: true,
                isLoading: false,
                totalCount: allBaseItems.length,
                loadedCount: simpleLoadedCount,
                data: { loadMoreId: "spaces-simple", totalCount: allBaseItems.length }
            }] : []),
            ...(!loadingStates["spaces-simple"] && simpleLoadedCount >= allBaseItems.length && simpleLoadedCount > 5 ? [{
                id: "show-less-simple",
                label: "Show less",
                icon: <ChevronUp className="size-2.5 text-gray-400" />,
                hasMore: false,
                isLoading: false,
                totalCount: allBaseItems.length,
                loadedCount: simpleLoadedCount,
                data: { showLessId: "spaces-simple" }
            }] : []),
            ...paginatedFolders,
            ...foldersSkeletonItems,
            // Add load more or show less for folders
            ...(!loadingStates["spaces-folders"] && foldersLoadedCount < folders.length ? [{
                id: "load-more-folders",
                label: "More",
                icon: <ChevronDown className="size-2.5 text-gray-400" />,
                hasMore: true,
                isLoading: false,
                totalCount: folders.length,
                loadedCount: foldersLoadedCount,
                data: { loadMoreId: "spaces-folders", totalCount: folders.length }
            }] : []),
            ...(!loadingStates["spaces-folders"] && foldersLoadedCount >= folders.length && foldersLoadedCount > 5 ? [{
                id: "show-less-folders",
                label: "Show less",
                icon: <ChevronUp className="size-2.5 text-gray-400" />,
                hasMore: false,
                isLoading: false,
                totalCount: folders.length,
                loadedCount: foldersLoadedCount,
                data: { showLessId: "spaces-folders" }
            }] : [])
        ];
        
        return [
            {
                id: "spaces",
                label: "Collections & Spaces",
                showAddButton: true,
                icon: <Folder className="size-5 text-fg-quaternary" />,
                children: spacesChildren,
                hasMore: false, // No load more at this level since children handle it
                isLoading: false,
                totalCount: allBaseItems.length + folders.length,
                loadedCount: simpleLoadedCount + foldersLoadedCount,
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
                { id: "Configuration", label: "Config" , icon: <Settings01 className="size-5 text-fg-quaternary" />},
            ]
        },
        {
            id: "content-types",
            label: "Content Types",
            showAddButton: true,
            icon: <Package className="size-5 text-fg-quaternary" />,
            children: [
                { 
                    id: "cms-events", 
                    label: "Event",
                    icon: <Database01 className="size-5 text-violet-400" />,
                    data: { href: `/${currentAdminVersion}/site/cms/events` }
                },
                { 
                    id: "cms-blog", 
                    label: "Blog",
                    icon: <Database01 className="size-5 text-violet-400" />
                },
                {
                    id: "archived-content-types",
                    label: "Archived Content type",
                    icon: <Archive className="size-5 text-fg-quaternary" />,
                    children: [
                        { 
                            id: "cms-wishlist", 
                            label: "Wishlist",
                            icon: <Database01 className="size-5 text-violet-400" />
                        },
                    ]
                },
            ]
        },
    ];
    };

    // Reactive tree data that updates when toggleStates change
    const siteTreeData = useMemo(() => {
        const baseTree = getInitialSiteFileTree();
        // Add additional folders to the spaces children
        const spacesNode = baseTree.find(node => node.id === "spaces");
        if (spacesNode && spacesNode.children) {
            spacesNode.children = [...spacesNode.children, ...additionalFolders];
        }
        return baseTree;
    }, [toggleStates, additionalFolders, loadedCounts, loadingStates]);

    // CMS tree data
    const cmsTreeData = useMemo((): TreeNode[] => [
        {
            id: "models",
            label: "Models",
            icon: <Database01 className="size-5 text-fg-quaternary" />,
            children: [
                { 
                    id: "event", 
                    label: "Event",
                    icon: <Calendar className="size-5 text-fg-quaternary" />,
                    data: { href: `/${currentAdminVersion}/content2/cms/event` }
                },
                { 
                    id: "article", 
                    label: "Article",
                    icon: <Edit03 className="size-5 text-fg-quaternary" />,
                    data: { href: `/${currentAdminVersion}/content2/cms/article` }
                },
                { 
                    id: "discussion", 
                    label: "Discussion",
                    icon: <MessageSquare01 className="size-5 text-fg-quaternary" />,
                    data: { href: `/${currentAdminVersion}/content2/cms/discussion` }
                },
                { 
                    id: "changelog", 
                    label: "Changelog",
                    icon: <FileX02 className="size-5 text-fg-quaternary" />,
                    data: { href: `/${currentAdminVersion}/content2/cms/changelog` }
                },
                { 
                    id: "help-article", 
                    label: "Help Article",
                    icon: <BookOpen01 className="size-5 text-fg-quaternary" />,
                    data: { href: `/${currentAdminVersion}/content2/cms/help-article` }
                },
            ],
        },
        {
            id: "archivedModels",
            label: "Archived Models",
            icon: <Archive className="size-5 text-fg-quaternary" />,
            children: [
                { id: "event", label: "Event" },
                { id: "article", label: "Article" },
                { id: "discussion", label: "Discussion" },
                { id: "changelog", label: "Changelog" },
                { id: "help-article", label: "Help Article" },
            ]
        }
    ], [currentAdminVersion]);



    // State for widget selection
    const [showWidgetSelection, setShowWidgetSelection] = useState(false);
    const [widgetSelectionType, setWidgetSelectionType] = useState<'space' | 'sidebar'>('space');

    // State for widget configuration
    const [showWidgetConfig, setShowWidgetConfig] = useState(false);
    const [selectedWidgetForConfig, setSelectedWidgetForConfig] = useState<any>(null);
    const [isTabConfigMode, setIsTabConfigMode] = useState(false);
    const [tabConfigLabel, setTabConfigLabel] = useState<string>('');
    const [isFilterViewMode, setIsFilterViewMode] = useState(false);
    
    // State for add space modal
    const [showAddSpaceModal, setShowAddSpaceModal] = useState(false);
    
    // State for field selection modal (step 2)
    const [showFieldSelectionModal, setShowFieldSelectionModal] = useState(false);
    
    // State for space configuration modal (step 3)
    const [showSpaceConfigModal, setShowSpaceConfigModal] = useState(false);
    const [selectedContentType, setSelectedContentType] = useState<string>("");
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    
    // State for spaces create page
    const [selectedSpaceType, setSelectedSpaceType] = useState<string>("explore");
    
    // State for navigation section
    const [isNavigationSelected, setIsNavigationSelected] = useState<boolean>(false);
    const [navigationExpandedIds, setNavigationExpandedIds] = useState<string[]>(["header-nav", "sidebar-nav"]);
    
    // State for showing navigation settings in tertiary sidebar
    const [showNavigationInTertiary, setShowNavigationInTertiary] = useState<boolean>(false);

    // Handle add widget click
    const handleAddWidgetClick = () => {
        setShowWidgetSelection(true);
    };

    // Handle widget selection back
    const handleWidgetSelectionBack = () => {
        setShowWidgetSelection(false);
    };

    // Handle widget selection
    const handleWidgetSelect = (widget: any) => {
        console.log("Selected widget:", widget);
        
        if (widgetSelectionType === 'space') {
            // Add widget to space widgets section
            addSpaceWidget({
                id: `${widget.id}_${Date.now()}`, // Unique ID with timestamp
                label: widget.label,
                icon: widget.icon,
                containerId: 'mainColumn', // Default to main column
            });
            console.log(`Added widget "${widget.label}" to Space Widgets section`);
        } else if (widgetSelectionType === 'sidebar') {
            // Add widget to sidebar widgets section
            addSidebarWidget({
                id: `${widget.id}_${Date.now()}`, // Unique ID with timestamp
                label: widget.label,
                icon: widget.icon,
            });
            console.log(`Added widget "${widget.label}" to Sidebar Widgets section`);
        }
        
        setShowWidgetSelection(false);
    };

    // Handle widget configuration
    const handleWidgetConfig = (widget: any) => {
        console.log("Configure widget:", widget);
        setSelectedWidgetForConfig(widget);
        setShowWidgetConfig(true);
    };

    // Handle widget config back
    const handleWidgetConfigBack = () => {
        setShowWidgetConfig(false);
        setSelectedWidgetForConfig(null);
        setIsTabConfigMode(false);
        setTabConfigLabel('');
    };

    // Handle tab config mode changes
    const handleTabConfigChange = (isTabConfig: boolean, tabLabel?: string) => {
        setIsTabConfigMode(isTabConfig);
        setTabConfigLabel(tabLabel || '');
    };

    // Handle filter view mode changes
    const handleFilterViewChange = (isFilterView: boolean) => {
        setIsFilterViewMode(isFilterView);
    };

    // Handle add space modal
    const handleAddSpaceClick = () => {
        if (currentAdminVersion === 'admin3') {
            setShowAddSpaceModal(true);
        } else {
            // Admin 2: Navigate to spaces creation page
            navigate(`/${currentAdminVersion}/site/spaces/create`);
        }
    };

    const handleAddSpaceModalClose = () => {
        setShowAddSpaceModal(false);
    };

    const handleSelectContentType = (typeId: string) => {
        console.log("Selected content type:", typeId);
        setSelectedContentType(typeId);
        setShowAddSpaceModal(false);
        setShowFieldSelectionModal(true);
    };

    // Handle add collection - directly add folder without modal
    const handleAddCollectionClick = () => {
        console.log("Add collection clicked - adding new folder");
        // Directly add new folder to the tree
        addNewFolderToTree();
    };



    // Function to add new folder to tree
    const addNewFolderToTree = useCallback(() => {
        console.log("addNewFolderToTree called");
        
        // Prevent double execution
        if (isAddingFolderRef.current) {
            console.log("Already adding folder, skipping...");
            return;
        }
        
        isAddingFolderRef.current = true;
        
        // Use the counter for unique naming
        const newFolderName = `New Folder${folderCounterRef.current}`;
        const newFolderId = `newFolder${folderCounterRef.current}`;
        
        console.log(`Creating folder: ${newFolderName}`);
        
        // Increment counter immediately to prevent duplicate IDs
        folderCounterRef.current++;
        
        // Check if folder already exists to prevent duplicates
        const existingFolder = additionalFolders.find(folder => folder.id === newFolderId);
        if (existingFolder) {
            console.log("Folder already exists, skipping...");
            isAddingFolderRef.current = false;
            return;
        }
        
        // Add new folder with folder icon and empty children (like MyFolder)
        const newFolder = {
            id: newFolderId,
            label: newFolderName,
            icon: <Folder className="size-5 text-fg-quaternary" />,
            children: [] // Empty children but expandable
        };
        
        setAdditionalFolders(prev => [...prev, newFolder]);
        console.log("Folder added:", newFolderName);
        
        // Make sure spaces is expanded to show the new folder (outside setSiteTreeData)
        setExpandedIds(prev => {
            if (!prev.includes("spaces")) {
                console.log("Expanding spaces section");
                return [...prev, "spaces"];
            }
            return prev;
        });
        
        // Reset the flag after a short delay
        setTimeout(() => {
            isAddingFolderRef.current = false;
        }, 200);
    }, []);

    // Handle field selection modal (step 2)
    const handleFieldSelectionModalClose = () => {
        setShowFieldSelectionModal(false);
        setSelectedContentType("");
        setSelectedFields([]);
    };

    const handleFieldSelectionBack = () => {
        setShowFieldSelectionModal(false);
        setShowAddSpaceModal(true);
    };

    const handleFieldSelectionNext = (fields: string[]) => {
        console.log("Selected fields:", fields);
        setSelectedFields(fields);
        setShowFieldSelectionModal(false);
        setShowSpaceConfigModal(true);
    };

    // Handle space configuration modal (step 3)
    const handleSpaceConfigModalClose = () => {
        setShowSpaceConfigModal(false);
        setSelectedContentType("");
        setSelectedFields([]);
    };

    const handleSpaceConfigBack = () => {
        setShowSpaceConfigModal(false);
        setShowFieldSelectionModal(true);
    };

    const handleCreateSpace = (spaceData: any) => {
        console.log("Creating space:", spaceData);
        console.log("With fields:", selectedFields);
        // TODO: Add actual space creation logic
    };

    // Handle space type selection
    const handleSpaceTypeSelect = (spaceTypeId: string) => {
        setSelectedSpaceType(spaceTypeId);
        console.log("Selected space type:", spaceTypeId);
        // TODO: Add space creation logic here
        navigate(`/${currentAdminVersion}/site`);
    };

    // Handle toggle changes
    const handleToggleChange = (nodeId: string, isToggled: boolean) => {
        updateToggleStates({
            [nodeId]: isToggled
        });
        
        // Sync with tree expansion
        if (isToggled) {
            setExpandedIds(prev => [...prev, nodeId]);
        } else {
            setExpandedIds(prev => prev.filter(id => id !== nodeId));
        }
    };

    // Handle node click and navigation
    const handleNodeClick = (node: any) => {
        console.log("Site file clicked:", node.label);
        
        // Handle load more buttons
        if (node.data?.loadMoreId) {
            handleLoadMore(node.data.loadMoreId, node.data.totalCount);
            return;
        }
        
        // Handle show less buttons
        if (node.data?.showLessId) {
            handleShowLess(node.data.showLessId);
            return;
        }
        
        // Check if navigation item is clicked
        if (node.id === "navigation") {
            setIsNavigationSelected(true);
            return;
        } else {
            setIsNavigationSelected(false);
        }
        
        // Navigate if the node has an href
        if (node.data?.href) {
            navigate(node.data.href);
        }
    };



    // Handle secondary sidebar item selection
    const handleSecondaryItemClick = (itemKey: string, href: string) => {
        // Track previous tab before changing
        if (selectedSecondaryItem !== "customize" && itemKey === "customize") {
            setPreviousSecondaryItem(selectedSecondaryItem);
        }
        setSelectedSecondaryItem(itemKey);
        navigate(href);
    };

    // Check if we're on any events page, blog page, help page, posts page, private space page, spaces create page, or CMS events page
    const isEventsPage = activeUrl?.includes("/site/spaces/myfolder/events") || activeUrl?.includes("/site/spaces/growth/events");
    const isBlogPage = activeUrl?.includes("/site/spaces/myfolder/blog") || activeUrl?.includes("/site/spaces/growth/blog");
    const isHelpPage = activeUrl?.includes("/site/spaces/myfolder/help") || activeUrl?.includes("/site/spaces/growth/help");
    const isPostsPage = activeUrl?.includes("/site/spaces/myfolder/posts") || activeUrl?.includes("/site/spaces/growth/posts");
    const isPrivateSpacePage = activeUrl?.includes("/site/spaces/private-space");
    const isSpacesCreatePage = activeUrl?.includes("/site/spaces/create");
    const isCmsEventsPage = activeUrl?.includes("/site/cms/events");
    const isGrowthPage = activeUrl?.includes("/site/spaces/growth/");
    const isSpacePage = isEventsPage || isBlogPage || isHelpPage || isPostsPage || isPrivateSpacePage || isCmsEventsPage;

    // State for form toggles
    const [formToggles, setFormToggles] = useState({
        inviteOnly: false,
        anyoneInvite: false,
        hideFromFeed: false,
        comments: false,
        reactions: false,
    });

    // Get title for tertiary sidebar based on selected menu item
    const getTertiaryTitle = () => {
        if (showWidgetSelection) {
            return "Add Widget";
        }
        
        if (showWidgetConfig && selectedWidgetForConfig) {
            if (isTabConfigMode && tabConfigLabel) {
                return `"${tabConfigLabel}" Tab Config`;
            }
            return `Configure ${selectedWidgetForConfig.label}`;
        }
        
        if (showNavigationInTertiary) {
            return "Header and sidebar";
        }
        
        switch (selectedSecondaryItem) {
            case "general":
                return isCmsEventsPage ? "CMS Settings" : "General Settings";
            case "customize":
                return isCmsEventsPage ? "CMS Customization" : "Customization";
            case "permissions":
                return "Permissions";
            case "members":
                return "Members";
            case "analytics":
                return "Space Analytics";
            case "audit-logs":
                return "Audit Logs";
            case "seo":
                return "SEO Settings";
            case "danger":
                return "Danger Zone";
            default:
                return "Options";
        }
    };

    // Tertiary sidebar content based on selected secondary item
    const getTertiarySidebarContent = () => {
        if (showWidgetSelection) {
            return (
                <WidgetSelection
                    onBack={handleWidgetSelectionBack}
                    onSelectWidget={handleWidgetSelect}
                />
            );
        }
        
        if (showWidgetConfig && selectedWidgetForConfig) {
            return (
                <WidgetConfig
                    selectedWidget={selectedWidgetForConfig}
                    onBack={handleWidgetConfigBack}
                    onSave={() => {
                        console.log("Widget config saved");
                        handleWidgetConfigBack();
                    }}
                    onTabConfigChange={handleTabConfigChange}
                    onFilterViewChange={handleFilterViewChange}
                />
            );
        }
        
        if (showNavigationInTertiary) {
            return (
                <div className="p-4 space-y-4">
                    {/* Description section */}
                    <div>
                        <p className="text-sm text-secondary leading-relaxed">
                            Adjust layout settings for the Header and Sidebar, controlling their visibility and arrangement site-wide.
                        </p>
                    </div>
                    
                    {/* Quick Toggle Checkboxes */}
                    <div className="grid grid-cols-2 gap-2 p-2 border border-secondary rounded-lg bg-primary">
                        <div className="flex flex-row col-span-1 py-1 px-2 hover:bg-secondary border border-secondary rounded-md items-center text-tertiary">
                            <Checkbox
                                isSelected={toggleStates.header}
                                onChange={(isSelected) => updateToggleStates({ header: isSelected })}
                                label="Header"
                                size="sm"
                            />
                        </div>
                        
                        <div className="flex flex-row col-span-1 py-1 px-2 hover:bg-secondary border border-secondary rounded-md items-center text-tertiary">
                            <Checkbox
                                isSelected={toggleStates.leftSidebar}
                                onChange={(isSelected) => updateToggleStates({ leftSidebar: isSelected })}
                                label="Sidebar"
                                size="sm"
                            />
                        </div>
                    </div>
                    
                    {/* Navigation TreeView */}
                    <div className="flex-1 overflow-y-auto">
                        <TreeView
                            data={[
                                {
                                    id: "header-nav",
                                    label: "Header",
                                    toggleState: toggleStates.header,
                                    
                                    showAddButton: true,
                                    icon: <LayoutTop className="size-5 text-fg-quaternary" />,
                                    children: [
                                        {
                                            id: "top-navigation",
                                            label: "Top navigation",
                                            icon: <FlexAlignTop className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" />
                                        }
                                    ]
                                },
                                {
                                    id: "sidebar-nav",
                                    label: "Sidebar",
                                    toggleState: toggleStates.leftSidebar,
                                    
                                    showAddButton: true,
                                    icon: <LayoutLeft className="size-5 text-fg-quaternary" />,
                                    children: [
                                        {
                                            id: "collection-menu",
                                            label: "Collection menu",
                                            icon: <FolderCode className="bg-blue-100/20 p-[1px] rounded-md size-5 text-blue-400" />
                                        },
                                        {
                                            id: "link-menu",
                                            label: "Link menu",
                                            icon: <Link01 className="bg-green-100/20 p-[1px] rounded-md size-5 text-green-400" />
                                        }
                                    ]
                                }
                            ]}
                            expandedIds={navigationExpandedIds}
                            selectedIds={[]}
                            onNodeClick={(node) => {
                                console.log("Navigation item clicked:", node.label);
                            }}
                            onToggleChange={(nodeId, isToggled) => {
                                const toggleKey = nodeId === "header-nav" ? "header" : "leftSidebar";
                                updateToggleStates({ [toggleKey]: isToggled });
                                
                                if (isToggled) {
                                    setNavigationExpandedIds(prev => [...prev, nodeId]);
                                } else {
                                    setNavigationExpandedIds(prev => prev.filter(id => id !== nodeId));
                                }
                            }}
                            onNodeExpand={(nodeId, expanded) => {
                                if (expanded) {
                                    setNavigationExpandedIds(prev => [...prev, nodeId]);
                                } else {
                                    setNavigationExpandedIds(prev => prev.filter(id => id !== nodeId));
                                }
                                
                                if (nodeId === "header-nav" || nodeId === "sidebar-nav") {
                                    const toggleKey = nodeId === "header-nav" ? "header" : "leftSidebar";
                                    updateToggleStates({ [toggleKey]: expanded });
                                }
                            }}
                            className="border-none bg-transparent"
                            showLines={false}
                            showIcons={true}
                        />
                    </div>
                    
                    {/* Helper Note */}
                    <div className="text-xs mt-4 flex items-start gap-2">
                        <InfoCircle className="size-3 mt-0.5 flex-shrink-0 text-gray-400" />
                        <div className="leading-relaxed text-gray-400">
                            You can <span className="font-medium">show/hide</span> navigation sections for this space, but widget edits apply site-wide. 
                            <button className="font-medium underline ml-1 hover:no-underline text-blue-400 hover:text-blue-300">
                                Upgrade to Pro
                            </button> for per-space customization.
                        </div>
                    </div>
                </div>
            );
        }
        
        switch (selectedSecondaryItem) {
            case "general":
                return isCmsEventsPage ? (
                    <CmsEventsSettings
                        formToggles={formToggles}
                        setFormToggles={setFormToggles}
                    />
                ) : (
                    <EventsGeneralSettings
                        formToggles={formToggles}
                        setFormToggles={setFormToggles}
                        pageType={isEventsPage ? 'events' : isBlogPage ? 'blog' : isHelpPage ? 'help' : isPostsPage ? 'posts' : 'events'}
                    />
                );
            case "customize":
                return (
                    <EventsCustomizeSettings
                        toggleStates={toggleStates}
                        customizeExpandedIds={customizeExpandedIds}
                        setCustomizeExpandedIds={setCustomizeExpandedIds}
                        handleToggleChange={handleToggleChange}
                        updateToggleStates={updateToggleStates}
                        onAddWidgetClick={handleAddWidgetClick}
                        onWidgetConfig={handleWidgetConfig}
                        onEditGlobalWidgets={() => setShowNavigationInTertiary(true)}
                        onWidgetSelect={handleWidgetSelect}
                        onSetWidgetSelectionType={setWidgetSelectionType}
                    />
                );
            case "permissions":
                return (
                    <EventsPermissionsSettings
                        formToggles={formToggles}
                        setFormToggles={setFormToggles}
                        pageType={isEventsPage ? 'events' : isBlogPage ? 'blog' : isHelpPage ? 'help' : isPostsPage ? 'posts' : 'events'}
                    />
                );
            case "members":
                return <EventsMembersSettings />;
            case "analytics":
                return <EventsAnalyticsSettings />;
            case "audit-logs":
                return <EventsAuditLogsSettings />;
            case "seo":
                return (
                    <EventsSeoSettings />
                );
            case "danger":
                return (
                    <EventsDangerSettings />
                );
            default:
                return null;
        }
    };



    const activeItem = [...items, ...footerItems].find((item) => {
        if (item.href === activeUrl) return true;
        if (item.items?.some((subItem) => subItem.href === activeUrl)) return true;
        // Handle nested routes for Content 2
        if (item.label === "Content 2" && activeUrl?.includes("/content2")) return true;
        // Handle Site routes - specifically for CMS events
        if (item.label === "Site" && activeUrl?.includes("/site")) return true;
        return false;
    });
    const [currentItem, setCurrentItem] = useState(activeItem || items[0]);
    const { theme, setTheme } = useTheme();

    // Update currentItem when activeUrl changes
    useEffect(() => {
        if (activeItem) {
            setCurrentItem(activeItem);
        }
    }, [activeItem]);

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("system");
        } else {
            setTheme("light");
        }
    };

    const getThemeIcon = () => {
        if (theme === "light") return Sun;
        if (theme === "dark") return Moon01;
        return Monitor01; // System mode
    };

    const getThemeLabel = () => {
        if (theme === "light") return "Light Mode";
        if (theme === "dark") return "Dark Mode";
        return "System Mode";
    };

    const MAIN_SIDEBAR_WIDTH = 68;
    const SECONDARY_SIDEBAR_WIDTH = 280; // w-80 equivalent
    // Dynamic width calculation
    const TERTIARY_SIDEBAR_WIDTH = 368;
    const TOTAL_WIDTH = MAIN_SIDEBAR_WIDTH + 
        (selectedSecondaryItem === "customize" ? TERTIARY_SIDEBAR_WIDTH : SECONDARY_SIDEBAR_WIDTH);

    const mainSidebar = (
        <aside
            data-tour-main-sidebar
            style={{
                width: MAIN_SIDEBAR_WIDTH,
            }}
            className="group flex h-full max-h-full max-w-full overflow-y-auto scrollbar-thin bg-primary py-1 pl-1"
        >
            <div
                className={cx(
                    "flex w-auto flex-col justify-between rounded-xl ring-1 ring-secondary transition duration-300 ring-inset",
                    isAdmin && adminHeaderVisible && currentAdminVersion === 'admin3' ? "pt-0" : "pt-5", // No padding when logo is hidden
                    hideBorder && "ring-transparent",
                )}
            >
                <div className="flex justify-center px-3">
                    <UntitledLogoMinimal className="size-8" />
                </div>

                <ul className="mt-4 flex flex-col gap-0.5 px-3">
                        {items.map((item) => (
                            <li key={item.label}>
                                <NavItemButton
                                    size="md"
                                    current={currentItem?.href === item.href}
                                    href={item.href}
                                    label={item.label || ""}
                                    icon={item.icon}
                                    onClick={(e) => setCurrentItem(item)}
                                    {...(item.label === "Site" ? { "data-tour-site-section": true } : {})}
                                />
                            </li>
                        ))}
                </ul>
                <div className="mt-auto flex flex-col gap-4 px-3 py-5">
                    <ul className="flex flex-col gap-0.5">
                        {footerItems.map((item) => (
                            <li key={item.label}>
                                <NavItemButton
                                    size="md"
                                    current={currentItem?.href === item.href}
                                    label={item.label || ""}
                                    href={item.href}
                                    icon={item.icon}
                                    onClick={(e) => setCurrentItem(item)}
                                />
                            </li>
                        ))}
                        <li>
                            <NavItemButton
                                size="md"
                                current={false}
                                label={getThemeLabel()}
                                icon={getThemeIcon()}
                                onClick={toggleTheme}
                            />
                        </li>
                    </ul>

                    <AriaDialogTrigger>
                        <AriaButton
                            className={({ isPressed, isFocused }) =>
                                cx("group relative inline-flex rounded-full", (isPressed || isFocused) && "outline-2 outline-offset-2 outline-focus-ring")
                            }
                        >
                            <Avatar status="online" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" size="md" alt="Olivia Rhye" />
                        </AriaButton>
                        <AriaPopover
                            placement="right bottom"
                            offset={8}
                            crossOffset={6}
                            className={({ isEntering, isExiting }) =>
                                cx(
                                    "will-change-transform",
                                    isEntering &&
                                        "duration-300 ease-out animate-in fade-in placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
                                    isExiting &&
                                        "duration-150 ease-in animate-out fade-out placement-right:slide-out-to-left-2 placement-top:slide-out-to-bottom-2 placement-bottom:slide-out-to-top-2",
                                )
                            }
                        >
                            <NavAccountMenu />
                        </AriaPopover>
                    </AriaDialogTrigger>
                </div>
            </div>
        </aside>
    );

    const secondarySidebar = (
        <div
            data-tour-secondary-sidebar
            style={{ width: SECONDARY_SIDEBAR_WIDTH }}
            className={cx("relative h-full overflow-hidden bg-primary", !(hideBorder || hideRightBorder) && "border-r border-secondary")}
        >
            <div className="flex h-full flex-col px-4 pt-6 pb-5">
                <h3 className="text-sm font-semibold text-brand-secondary">
                    {isEventsPage ? 
                        (activeUrl?.includes("/site/spaces/growth/events") ? "Growth Events" : "Events") : 
                     isBlogPage ? 
                        (activeUrl?.includes("/site/spaces/growth/blog") ? "Growth Blog" : "Blog") : 
                     isHelpPage ? 
                        (activeUrl?.includes("/site/spaces/growth/help") ? "Growth Help" : "Help") : 
                     isPostsPage ? 
                        (activeUrl?.includes("/site/spaces/growth/posts") ? "Growth Posts" : "Posts") : 
                     isPrivateSpacePage ? "Private Space" : 
                     isCmsEventsPage ? "CMS Events" : 
                     currentItem?.label}
                </h3>
                
                {/* Show Navigation Settings when navigation is selected */}
                {isNavigationSelected ? (
                    <div className="mt-2">
                        {/* Back Button */}
                        <button
                            onClick={() => setIsNavigationSelected(false)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-secondary rounded-md transition-colors mb-4"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Site
                        </button>
                        
                        {/* Navigation Content */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-primary mb-2">
                                    Header and sidebar
                                </h3>
                                <p className="text-sm text-secondary leading-relaxed">
                                    Adjust layout settings for the Header and Sidebar, controlling their visibility and arrangement site-wide.
                                </p>
                            </div>
                            
                            {/* Quick Toggle Checkboxes */}
                            <div className="grid grid-cols-2 gap-2 p-2 border border-secondary rounded-lg bg-primary">
                                <div className="flex flex-row col-span-1 py-1 px-2 hover:bg-secondary border border-secondary rounded-md items-center text-tertiary">
                                    <Checkbox
                                        isSelected={toggleStates.header}
                                        onChange={(isSelected) => updateToggleStates({ header: isSelected })}
                                        label="Header"
                                        size="sm"
                                    />
                                </div>
                                
                                <div className="flex flex-row col-span-1 py-1 px-2 hover:bg-secondary border border-secondary rounded-md items-center text-tertiary">
                                    <Checkbox
                                        isSelected={toggleStates.leftSidebar}
                                        onChange={(isSelected) => updateToggleStates({ leftSidebar: isSelected })}
                                        label="Sidebar"
                                        size="sm"
                                    />
                                </div>
                            </div>
                            
                            {/* Navigation TreeView */}
                            <div className="flex-1 overflow-y-auto">
                                <TreeView
                                    data={[
                                        {
                                            id: "header-nav",
                                            label: "Header",
                                            toggleState: toggleStates.header,
                                            
                                            showAddButton: true,
                                            icon: <LayoutTop className="size-5 text-fg-quaternary" />,
                                            children: [
                                                { 
                                                    id: "top-navigation", 
                                                    label: "Top navigation",
                                                    icon: <FlexAlignTop className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" />
                                                }
                                            ]
                                        },
                                        {
                                            id: "sidebar-nav",
                                            label: "Sidebar",
                                            toggleState: toggleStates.leftSidebar,
                                            
                                            showAddButton: true,
                                            icon: <LayoutLeft className="size-5 text-fg-quaternary" />,
                                            children: [
                                                { 
                                                    id: "collection-menu", 
                                                    label: "Collection menu",
                                                    icon: <FolderCode className="bg-blue-100/20 p-[1px] rounded-md size-5 text-blue-400" />
                                                },
                                                { 
                                                    id: "link-menu", 
                                                    label: "Link menu",
                                                    icon: <Link01 className="bg-green-100/20 p-[1px] rounded-md size-5 text-green-400" />
                                                }
                                            ]
                                        }
                                    ]}
                                    expandedIds={navigationExpandedIds}
                                    selectedIds={[]}
                                    onNodeClick={(node) => {
                                        console.log("Navigation item clicked:", node.label);
                                    }}
                                    onToggleChange={(nodeId, isToggled) => {
                                        // Handle toggle state changes
                                        updateToggleStates({
                                            [nodeId === "header-nav" ? "header" : "leftSidebar"]: isToggled
                                        });
                                        
                                        // Update expansion state
                                        if (isToggled) {
                                            setNavigationExpandedIds(prev => [...prev, nodeId]);
                                        } else {
                                            setNavigationExpandedIds(prev => prev.filter(id => id !== nodeId));
                                        }
                                    }}
                                    onNodeExpand={(nodeId, expanded) => {
                                        // Update expanded state
                                        if (expanded) {
                                            setNavigationExpandedIds(prev => [...prev, nodeId]);
                                        } else {
                                            setNavigationExpandedIds(prev => prev.filter(id => id !== nodeId));
                                        }
                                        
                                        // Sync with toggle state for layout items
                                        if (nodeId === "header-nav" || nodeId === "sidebar-nav") {
                                            updateToggleStates({
                                                [nodeId === "header-nav" ? "header" : "leftSidebar"]: expanded
                                            });
                                        }
                                    }}
                                    className="border-none bg-transparent"
                                    showLines={false}
                                    showIcons={true}
                                />
                            </div>
                        </div>
                    </div>
                ) : currentItem?.label === "Site" && activeUrl === `/${currentAdminVersion}/site` ? (
                    <div className="flex h-full flex-col mt-2">
                        {/* Fixed Header - Search Input */}
                        <div className="flex-shrink-0 mb-4">
                            <Input 
                                size="sm" 
                                placeholder="Search files and folders..." 
                                icon={SearchLg}
                                className="w-full"
                            />
                        </div>
                        
                        {/* Scrollable Content Area */}
                        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
                            <TreeView
                                data={siteTreeData}
                                expandedIds={expandedIds}
                                selectedIds={["spaces"]}
                                onNodeClick={handleNodeClick}
                                onToggleChange={handleToggleChange}
                                onLoadMore={handleLoadMore}
                                onNodeExpand={(nodeId, expanded) => {
                                    // Update expanded state
                                    if (expanded) {
                                        setExpandedIds(prev => [...prev, nodeId]);
                                    } else {
                                        setExpandedIds(prev => prev.filter(id => id !== nodeId));
                                    }
                                    
                                    // Sync with toggle state for layout items
                                    if (nodeId === "header" || nodeId === "leftSidebar" || nodeId === "rightSidebar" || nodeId === "footer") {
                                        updateToggleStates({
                                            [nodeId]: expanded
                                        });
                                    }
                                }}
                                className="border-none bg-transparent"
                                showLines={false}
                                showIcons={true}
                            />
                        </div>

                        {/* Fixed Footer Actions */}
                        <div className="flex-shrink-0 bg-primary">
                            <div className="h-px bg-secondary/40 my-2"></div>
                            <button 
                                data-tour-add-space
                                onClick={handleAddSpaceClick}
                                className="cursor-pointer rounded-md group flex items-center w-full transition duration-100 ease-linear bg-primary text-secondary hover:bg-primary_hover hover:text-secondary_hover focus:outline-none px-3 py-1.5"
                            >
                                <div className="mr-2 size-4 shrink-0 flex items-center justify-center">
                                    <Package className="size-4 text-fg-quaternary transition-inherit-all group-hover:text-secondary_hover" />
                                </div>
                                <span className="flex-1 text-sm font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate text-left">
                                    Add space
                                </span>
                                <div className="ml-1 size-3 shrink-0 flex items-center justify-center">
                                    <AlertCircle className="size-3 text-fg-quaternary/60 opacity-60" />
                                </div>
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAddCollectionClick();
                                }}
                                className="cursor-pointer rounded-md group flex items-center w-full transition duration-100 ease-linear bg-primary text-secondary hover:bg-primary_hover hover:text-secondary_hover focus:outline-none px-3 py-1.5 mt-0.5"
                            >
                                <div className="mr-2 size-4 shrink-0 flex items-center justify-center">
                                    <FilePlus01 className="size-4 text-fg-quaternary transition-inherit-all group-hover:text-secondary_hover" />
                                </div>
                                <span className="flex-1 text-sm font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate text-left">
                                    Add collection
                                </span>
                                <div className="ml-1 size-3 shrink-0 flex items-center justify-center">
                                    <AlertCircle className="size-3 text-fg-quaternary/60 opacity-60" />
                                </div>
                            </button>
                        </div>
                    </div>
                ) : currentItem?.label === "Content" && activeUrl?.includes("/content") && !isCmsEventsPage ? (
                    <div className="mt-2 space-y-4">
                        {/* Content Status Section */}
                        <ul>
                            <li className="py-0.5">
                                <NavItemBase current={activeUrl === `/${currentAdminVersion}/content`} href={`/${currentAdminVersion}/content`} icon={File01} type="link">
                                    All Content
                                </NavItemBase>
                            </li>
                            <li className="py-0.5">
                                <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/scheduled`} href={`/${currentAdminVersion}/content/scheduled`} icon={Calendar} type="link">
                                    All Scheduled
                                </NavItemBase>
                            </li>
                            <li className="py-0.5">
                                <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/draft`} href={`/${currentAdminVersion}/content/draft`} icon={File04} type="link">
                                    All Draft
                                </NavItemBase>
                            </li>
                        </ul>

                        {/* Divider */}
                        <div className="border-t border-secondary my-4"></div>

                        {/* Content Type Section */}
                        <div>
                            <h4 className="px-3 py-1 text-xs font-medium text-tertiary uppercase tracking-wider">
                                Content Type
                            </h4>
                            <ul className="mt-2">
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/job-board`} href={`/${currentAdminVersion}/content/job-board`} icon={Package} type="link">
                                        Job Board
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/events`} href={`/${currentAdminVersion}/content/events`} icon={Calendar} type="link">
                                        Events
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/qa`} href={`/${currentAdminVersion}/content/qa`} icon={MessageChatCircle} type="link">
                                        Q&A
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/ideas`} href={`/${currentAdminVersion}/content/ideas`} icon={Lightbulb01} type="link">
                                        Ideas & Wishlist
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/knowledge-base`} href={`/${currentAdminVersion}/content/knowledge-base`} icon={BookOpen01} type="link">
                                        Knowledge Base
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/blog`} href={`/${currentAdminVersion}/content/blog`} icon={Edit03} type="link">
                                        Blog
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/discussions`} href={`/${currentAdminVersion}/content/discussions`} icon={MessageSquare01} type="link">
                                        Discussions
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content/changelog`} href={`/${currentAdminVersion}/content/changelog`} icon={FileX02} type="link">
                                        Changelog
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={false} href={`/${currentAdminVersion}/content/add-type`} icon={Plus} type="link">
                                        Add new content type
                                    </NavItemBase>
                                </li>
                            </ul>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-secondary my-4"></div>

                        {/* Custom Views Section */}
                        <div>
                            <h4 className="px-3 py-1 text-xs font-medium text-tertiary uppercase tracking-wider">
                                Custom Views
                            </h4>
                            <div className="mt-2 px-3 py-4">
                                <p className="text-sm text-tertiary leading-relaxed">
                                    No custom views yet. Create filters or sorting, then save as a view.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : isSpacePage || isSpacesCreatePage || isCmsEventsPage ? (
                    <div className="mt-2">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate(fromCms ? `/${currentAdminVersion}/content2/cms` : `/${currentAdminVersion}/site`)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-secondary rounded-md transition-colors mb-4"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            {fromCms ? "Back to CMS" : "Back to Site"}
                        </button>

                        {/* Spaces Create Page */}
                        {isSpacesCreatePage ? (
                            <div className="flex-1 overflow-y-auto">
                                <h3 className="text-sm font-semibold text-brand-secondary mb-4">
                                    Create New Space
                                </h3>
                                <h4 className="px-3 py-1 text-xs font-medium text-tertiary uppercase tracking-wider mb-2">
                                    Space Types
                                </h4>
                                <ul className="space-y-1">
                                    {spaceTypes.map((type) => {
                                        const IconComponent = type.icon;
                                        const isSelected = selectedSpaceType === type.id;
                                        return (
                                            <li key={type.id}>
                                                <button
                                                    onClick={() => handleSpaceTypeSelect(type.id)}
                                                    className={cx(
                                                        "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors text-left",
                                                        isSelected
                                                            ? "bg-active text-secondary_hover"
                                                            : "text-secondary hover:text-primary hover:bg-secondary"
                                                    )}
                                                >
                                                    <div className={cx(
                                                        "p-1.5 rounded-md",
                                                        isSelected ? type.color : "bg-secondary/60"
                                                    )}>
                                                        <IconComponent className="w-4 h-4" />
                                                    </div>
                                                    <span className="truncate">{type.label}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : (
                            /* Space Menu */
                            <ul className="space-y-0.5">
                            {/* Show General tab only for non-CMS pages */}
                            {!isCmsEventsPage && (
                                <li>
                                    <button
                                        onClick={() => handleSecondaryItemClick("general", 
                                            isPrivateSpacePage ? `/${currentAdminVersion}/site/spaces/private-space` : 
                                            activeUrl?.includes("/site/spaces/growth/blog") ? `/${currentAdminVersion}/site/spaces/growth/blog` :
                                            activeUrl?.includes("/site/spaces/growth/help") ? `/${currentAdminVersion}/site/spaces/growth/help` :
                                            activeUrl?.includes("/site/spaces/growth/posts") ? `/${currentAdminVersion}/site/spaces/growth/posts` :
                                            activeUrl?.includes("/site/spaces/growth/events") ? `/${currentAdminVersion}/site/spaces/growth/events` :
                                            isBlogPage ? `/${currentAdminVersion}/site/spaces/myfolder/blog` :
                                            isHelpPage ? `/${currentAdminVersion}/site/spaces/myfolder/help` :
                                            isPostsPage ? `/${currentAdminVersion}/site/spaces/myfolder/posts` :
                                            `/${currentAdminVersion}/site/spaces/myfolder/events`
                                        )}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                            selectedSecondaryItem === "general"
                                                ? "bg-active text-secondary_hover"
                                                : "text-secondary hover:text-primary hover:bg-secondary"
                                        }`}
                                    >
                                        <Globe01 className="h-4 w-4" />
                                        General
                                    </button>
                                </li>
                            )}
                            {/* Show Customize tab for both CMS and regular pages */}
                            <li>
                                <button
                                    onClick={() => handleSecondaryItemClick("customize", 
                                        isCmsEventsPage ? `/${currentAdminVersion}/site/cms/events/customize` :
                                        isPrivateSpacePage ? `/${currentAdminVersion}/site/spaces/private-space/customize` : 
                                        activeUrl?.includes("/site/spaces/growth/blog") ? `/${currentAdminVersion}/site/spaces/growth/blog/customize` :
                                        activeUrl?.includes("/site/spaces/growth/help") ? `/${currentAdminVersion}/site/spaces/growth/help/customize` :
                                        activeUrl?.includes("/site/spaces/growth/posts") ? `/${currentAdminVersion}/site/spaces/growth/posts/customize` :
                                        activeUrl?.includes("/site/spaces/growth/events") ? `/${currentAdminVersion}/site/spaces/growth/events/customize` :
                                        isBlogPage ? `/${currentAdminVersion}/site/spaces/myfolder/blog/customize` :
                                        isHelpPage ? `/${currentAdminVersion}/site/spaces/myfolder/help/customize` :
                                        isPostsPage ? `/${currentAdminVersion}/site/spaces/myfolder/posts/customize` :
                                        `/${currentAdminVersion}/site/spaces/myfolder/events/customize`
                                    )}
                                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                        selectedSecondaryItem === "customize"
                                            ? "bg-active text-secondary_hover"
                                            : "text-secondary hover:text-primary hover:bg-secondary"
                                    }`}
                                >
                                    <Palette className="h-4 w-4" />
                                    Customize
                                </button>
                            </li>
                            {/* Show Permissions tab for non-CMS pages */}
                            {!isCmsEventsPage && (
                                <li>
                                    <button
                                        onClick={() => handleSecondaryItemClick("permissions", 
                                            isPrivateSpacePage ? `/${currentAdminVersion}/site/spaces/private-space/permissions` : 
                                            activeUrl?.includes("/site/spaces/growth/blog") ? `/${currentAdminVersion}/site/spaces/growth/blog/permissions` :
                                            activeUrl?.includes("/site/spaces/growth/help") ? `/${currentAdminVersion}/site/spaces/growth/help/permissions` :
                                            activeUrl?.includes("/site/spaces/growth/posts") ? `/${currentAdminVersion}/site/spaces/growth/posts/permissions` :
                                            activeUrl?.includes("/site/spaces/growth/events") ? `/${currentAdminVersion}/site/spaces/growth/events/permissions` :
                                            isBlogPage ? `/${currentAdminVersion}/site/spaces/myfolder/blog/permissions` :
                                            isHelpPage ? `/${currentAdminVersion}/site/spaces/myfolder/help/permissions` :
                                            isPostsPage ? `/${currentAdminVersion}/site/spaces/myfolder/posts/permissions` :
                                            `/${currentAdminVersion}/site/spaces/myfolder/events/permissions`
                                        )}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                            selectedSecondaryItem === "permissions"
                                                ? "bg-active text-secondary_hover"
                                                : "text-secondary hover:text-primary hover:bg-secondary"
                                        }`}
                                    >
                                        <Shield01 className="h-4 w-4" />
                                        Permissions
                                    </button>
                                </li>
                            )}
                            {/* Show Settings tab only for CMS pages */}
                            {isCmsEventsPage && (
                                <li>
                                    <button
                                        onClick={() => handleSecondaryItemClick("general", `/${currentAdminVersion}/site/cms/events/settings`)}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                            selectedSecondaryItem === "general"
                                                ? "bg-active text-secondary_hover"
                                                : "text-secondary hover:text-primary hover:bg-secondary"
                                        }`}
                                    >
                                        <Settings01 className="h-4 w-4" />
                                        Settings
                                    </button>
                                </li>
                            )}
                            {/* Only show these items for Events, Blog, Help, and Posts, not for Private Space */}
                            {(isEventsPage || isBlogPage || isHelpPage || isPostsPage) && (
                                <>
                                    <li>
                                        <button
                                            onClick={() => handleSecondaryItemClick("members", 
                                                activeUrl?.includes("/site/spaces/growth/blog") ? `/${currentAdminVersion}/site/spaces/growth/blog/members` :
                                                activeUrl?.includes("/site/spaces/growth/help") ? `/${currentAdminVersion}/site/spaces/growth/help/members` :
                                                activeUrl?.includes("/site/spaces/growth/posts") ? `/${currentAdminVersion}/site/spaces/growth/posts/members` :
                                                activeUrl?.includes("/site/spaces/growth/events") ? `/${currentAdminVersion}/site/spaces/growth/events/members` :
                                                isBlogPage ? `/${currentAdminVersion}/site/spaces/myfolder/blog/members` :
                                                isHelpPage ? `/${currentAdminVersion}/site/spaces/myfolder/help/members` :
                                                isPostsPage ? `/${currentAdminVersion}/site/spaces/myfolder/posts/members` :
                                                `/${currentAdminVersion}/site/spaces/myfolder/events/members`
                                            )}
                                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                selectedSecondaryItem === "members"
                                                    ? "bg-active text-secondary_hover"
                                                    : "text-secondary hover:text-primary hover:bg-secondary"
                                            }`}
                                        >
                                            <Users01 className="h-4 w-4" />
                                            Members
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleSecondaryItemClick("analytics", 
                                                activeUrl?.includes("/site/spaces/growth/blog") ? `/${currentAdminVersion}/site/spaces/growth/blog/analytics` :
                                                activeUrl?.includes("/site/spaces/growth/help") ? `/${currentAdminVersion}/site/spaces/growth/help/analytics` :
                                                activeUrl?.includes("/site/spaces/growth/posts") ? `/${currentAdminVersion}/site/spaces/growth/posts/analytics` :
                                                activeUrl?.includes("/site/spaces/growth/events") ? `/${currentAdminVersion}/site/spaces/growth/events/analytics` :
                                                isBlogPage ? `/${currentAdminVersion}/site/spaces/myfolder/blog/analytics` :
                                                isHelpPage ? `/${currentAdminVersion}/site/spaces/myfolder/help/analytics` :
                                                isPostsPage ? `/${currentAdminVersion}/site/spaces/myfolder/posts/analytics` :
                                                `/${currentAdminVersion}/site/spaces/myfolder/events/analytics`
                                            )}
                                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                selectedSecondaryItem === "analytics"
                                                    ? "bg-active text-secondary_hover"
                                                    : "text-secondary hover:text-primary hover:bg-secondary"
                                            }`}
                                        >
                                            <BarChart03 className="h-4 w-4" />
                                            Space Analytics
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleSecondaryItemClick("audit-logs", 
                                                activeUrl?.includes("/site/spaces/growth/blog") ? `/${currentAdminVersion}/site/spaces/growth/blog/audit-logs` :
                                                activeUrl?.includes("/site/spaces/growth/help") ? `/${currentAdminVersion}/site/spaces/growth/help/audit-logs` :
                                                activeUrl?.includes("/site/spaces/growth/posts") ? `/${currentAdminVersion}/site/spaces/growth/posts/audit-logs` :
                                                activeUrl?.includes("/site/spaces/growth/events") ? `/${currentAdminVersion}/site/spaces/growth/events/audit-logs` :
                                                isBlogPage ? `/${currentAdminVersion}/site/spaces/myfolder/blog/audit-logs` :
                                                isHelpPage ? `/${currentAdminVersion}/site/spaces/myfolder/help/audit-logs` :
                                                isPostsPage ? `/${currentAdminVersion}/site/spaces/myfolder/posts/audit-logs` :
                                                `/${currentAdminVersion}/site/spaces/myfolder/events/audit-logs`
                                            )}
                                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                selectedSecondaryItem === "audit-logs"
                                                    ? "bg-active text-secondary_hover"
                                                    : "text-secondary hover:text-primary hover:bg-secondary"
                                            }`}
                                        >
                                            <ClipboardCheck className="h-4 w-4" />
                                            Audit Logs
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleSecondaryItemClick("seo", 
                                                activeUrl?.includes("/site/spaces/growth/blog") ? `/${currentAdminVersion}/site/spaces/growth/blog/seo` :
                                                activeUrl?.includes("/site/spaces/growth/help") ? `/${currentAdminVersion}/site/spaces/growth/help/seo` :
                                                activeUrl?.includes("/site/spaces/growth/posts") ? `/${currentAdminVersion}/site/spaces/growth/posts/seo` :
                                                activeUrl?.includes("/site/spaces/growth/events") ? `/${currentAdminVersion}/site/spaces/growth/events/seo` :
                                                isBlogPage ? `/${currentAdminVersion}/site/spaces/myfolder/blog/seo` :
                                                isHelpPage ? `/${currentAdminVersion}/site/spaces/myfolder/help/seo` :
                                                isPostsPage ? `/${currentAdminVersion}/site/spaces/myfolder/posts/seo` :
                                                `/${currentAdminVersion}/site/spaces/myfolder/events/seo`
                                            )}
                                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                selectedSecondaryItem === "seo"
                                                    ? "bg-active text-secondary_hover"
                                                    : "text-secondary hover:text-primary hover:bg-secondary"
                                            }`}
                                        >
                                            <SearchLg className="h-4 w-4" />
                                            SEO
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleSecondaryItemClick("danger", 
                                                activeUrl?.includes("/site/spaces/growth/blog") ? `/${currentAdminVersion}/site/spaces/growth/blog/danger` :
                                                activeUrl?.includes("/site/spaces/growth/help") ? `/${currentAdminVersion}/site/spaces/growth/help/danger` :
                                                activeUrl?.includes("/site/spaces/growth/posts") ? `/${currentAdminVersion}/site/spaces/growth/posts/danger` :
                                                activeUrl?.includes("/site/spaces/growth/events") ? `/${currentAdminVersion}/site/spaces/growth/events/danger` :
                                                isBlogPage ? `/${currentAdminVersion}/site/spaces/myfolder/blog/danger` :
                                                isHelpPage ? `/${currentAdminVersion}/site/spaces/myfolder/help/danger` :
                                                isPostsPage ? `/${currentAdminVersion}/site/spaces/myfolder/posts/danger` :
                                                `/${currentAdminVersion}/site/spaces/myfolder/events/danger`
                                            )}
                                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                selectedSecondaryItem === "danger"
                                                    ? "bg-active text-secondary_hover"
                                                    : "text-secondary hover:text-primary hover:bg-secondary"
                                            }`}
                                        >
                                            <AlertTriangle className="h-4 w-4" />
                                            Danger Zone
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                        )}
                    </div>
                ) : currentItem?.label === "Content 2" && activeUrl?.includes("/content2") ? (
                    activeUrl === `/${currentAdminVersion}/content2/cms` ? (
                        <div className="flex h-full flex-col pt-2">
                            {/* Fixed Header - Back Button and Title */}
                            <div className="flex-shrink-0 flex items-center gap-1 mb-4">
                                <Button onClick={() => navigate(`/${currentAdminVersion}/content2`)} color="tertiary" size="md" iconLeading={ArrowLeft} aria-label="Button CTA" />
                                <h3 className="text-lg font-semibold">
                                    CMS
                                </h3>
                                <Badge className="ml-1" color="gray">
                                    Beta
                                </Badge>
                            </div>
                            
                            {/* Scrollable Content Area */}
                            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
                                <TreeView
                                    data={cmsTreeData}
                                    expandedIds={cmsExpandedIds}
                                    selectedIds={[]}
                                    onNodeClick={handleNodeClick}
                                    onNodeExpand={(nodeId, expanded) => {
                                        // Update expanded state
                                        if (expanded) {
                                            setCmsExpandedIds(prev => [...prev, nodeId]);
                                        } else {
                                            setCmsExpandedIds(prev => prev.filter(id => id !== nodeId));
                                        }
                                    }}
                                    className="border-none bg-transparent"
                                    showLines={false}
                                    showIcons={true}
                                />
                            </div>

                            {/* Fixed Footer Actions */}
                            <div className="flex-shrink-0 bg-primary">
                                <div className="h-px bg-secondary/40 my-2"></div>
                                <button 
                                    onClick={() => {
                                        navigate(`/${currentAdminVersion}/site/spaces/create?from=cms`);
                                    }}
                                    className="cursor-pointer rounded-md group flex items-center w-full transition duration-100 ease-linear bg-primary text-secondary hover:bg-primary_hover hover:text-secondary_hover focus:outline-none px-3 py-1.5"
                                >
                                    <div className="mr-2 size-4 shrink-0 flex items-center justify-center">
                                        <Plus className="size-4 text-fg-quaternary transition-inherit-all group-hover:text-secondary_hover" />
                                    </div>
                                    <span className="flex-1 text-sm font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate text-left">
                                        Add CMS
                                    </span>
                                    <div className="ml-1 size-3 shrink-0 flex items-center justify-center">
                                        <AlertCircle className="size-3 text-fg-quaternary/60 opacity-60" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full mt-2">
                            <ul>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content2/posts`} href={`/${currentAdminVersion}/content2/posts`} icon={Package} type="link">
                                        Posts
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content2/events`} href={`/${currentAdminVersion}/content2/events`} icon={Calendar} type="link">
                                        Events
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content2/spaces`} href={`/${currentAdminVersion}/content2/spaces`} icon={Folder} type="link">
                                        Spaces
                                    </NavItemBase>
                                </li>
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content2/tag`} href={`/${currentAdminVersion}/content2/tag`} icon={Tag01} type="link">
                                        Tag
                                    </NavItemBase>
                                </li>

                            </ul>
                        </div>
                    )
                ) : (
                    <ul className="mt-2">
                        {currentItem?.items?.map((item, index) => (
                            <li key={item.label} className="py-0.5">
                                {item.items && item.items.length > 0 ? (
                                    <details className="group" open>
                                        <NavItemBase current={activeUrl === item.href} href={item.href} icon={item.icon} badge={item.badge} type="collapsible">
                                            {item.label}
                                        </NavItemBase>
                                        <ul className="ml-4 mt-1 space-y-0.5">
                                            {item.items.map((subItem, subIndex) => (
                                                <li key={subItem.label}>
                                                    <NavItemBase current={activeUrl === subItem.href} href={subItem.href} icon={subItem.icon} badge={subItem.badge} type="collapsible-child">
                                                        {subItem.label}
                                                    </NavItemBase>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                ) : (
                                    <NavItemBase current={activeUrl === item.href} href={item.href} icon={item.icon} badge={item.badge} type="link">
                                        {item.label}
                                    </NavItemBase>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );


    return (
        <>
            {/* Tour Guide */}
            <TourGuide
                isActive={tourGuide.isActive}
                steps={tourGuide.steps}
                currentStep={tourGuide.currentStep}
                onNext={tourGuide.nextStep}
                onPrevious={tourGuide.previousStep}
                onSkip={tourGuide.skipTour}
                onComplete={tourGuide.completeTour}
            />
            
            {/* Desktop dual sidebar navigation */}
                <div className={`z-40 hidden lg:fixed lg:left-0 lg:flex ${
                    isAdmin && adminHeaderVisible && currentAdminVersion === 'admin3'
                        ? adminHeaderCollapsed
                            ? 'lg:top-3 lg:bottom-0'  // Collapsed header height
                            : 'lg:top-12 lg:bottom-0' // Full header height
                        : 'lg:inset-y-0'
                }`}>
                {mainSidebar}
                {selectedSecondaryItem !== "customize" && secondarySidebar}
                {/* Show tertiary sidebar inline only for customize tab */}
                {isSpacePage && selectedSecondaryItem === "customize" && (
                    <div 
                        style={{ width: TERTIARY_SIDEBAR_WIDTH }}
                        className="h-full overflow-y-auto bg-primary scrollbar-minimal border-r border-secondary"
                    >
                        <div className="flex h-full flex-col">
                            {/* Header with back button and title */}
                            {/* Sticky header - Only back button and actions */}
                            <div className="sticky top-0 z-99 flex items-center justify-between px-4 pt-6 pb-4 bg-primary">
                                {/* Back button logic for customize tab */}
                                {(showWidgetSelection || showWidgetConfig || showNavigationInTertiary) ? (
                                    /* Widget config back buttons */
                                    <>
                                        {showWidgetSelection && (
                                            <button
                                                onClick={handleWidgetSelectionBack}
                                                className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                                            >
                                                <ArrowLeft className="size-4 text-fg-quaternary" />
                                            </button>
                                        )}
                                        {showWidgetConfig && (
                                            <button
                                                onClick={handleWidgetConfigBack}
                                                className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                                            >
                                                <ArrowLeft className="size-4 text-fg-quaternary" />
                                            </button>
                                        )}
                                        {showNavigationInTertiary && (
                                            <button
                                                onClick={() => setShowNavigationInTertiary(false)}
                                                className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                                            >
                                                <ArrowLeft className="size-4 text-fg-quaternary" />
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    /* Main back button for customize tab */
                                    <button
                                        onClick={() => {
                                            const backUrl = isPrivateSpacePage ? `/${currentAdminVersion}/site/spaces/private-space` : 
                                                activeUrl?.includes("/site/spaces/growth/blog") ? `/${currentAdminVersion}/site/spaces/growth/blog` :
                                                activeUrl?.includes("/site/spaces/growth/help") ? `/${currentAdminVersion}/site/spaces/growth/help` :
                                                activeUrl?.includes("/site/spaces/growth/posts") ? `/${currentAdminVersion}/site/spaces/growth/posts` :
                                                activeUrl?.includes("/site/spaces/growth/events") ? `/${currentAdminVersion}/site/spaces/growth/events` :
                                                isBlogPage ? `/${currentAdminVersion}/site/spaces/myfolder/blog` :
                                                isHelpPage ? `/${currentAdminVersion}/site/spaces/myfolder/help` :
                                                isPostsPage ? `/${currentAdminVersion}/site/spaces/myfolder/posts` :
                                                `/${currentAdminVersion}/site/spaces/myfolder/events`;
                                            handleSecondaryItemClick(previousSecondaryItem, backUrl);
                                        }}
                                        className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                                    >
                                        <ArrowLeft className="size-4 text-fg-quaternary" />
                                    </button>
                                )}
                                
                                {/* Action buttons on the right */}
                                <div className="flex items-center gap-2">
                                    <ButtonUtility
                                        size="sm"
                                        color="tertiary"
                                        icon={X}
                                        tooltip="Discard changes"
                                    />
                                    <ButtonUtility
                                        size="sm"
                                        color="tertiary"
                                        icon={Check}
                                        tooltip="Save changes"
                                    />
                                </div>
                            </div>
                            
                            {/* Non-sticky title and description */}
                            <div className="px-4 pb-4">
                                <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">{getTertiaryTitle()}</h3>
                                <p className="text-sm text-secondary">Customize the layout and widgets for your space to create the perfect user experience.</p>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                                {getTertiarySidebarContent()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Tertiary sidebar overlay - positioned over main content */}
            {isSpacePage && (selectedSecondaryItem === "general" || selectedSecondaryItem === "permissions" || selectedSecondaryItem === "members" || selectedSecondaryItem === "analytics" || selectedSecondaryItem === "audit-logs" || selectedSecondaryItem === "seo" || selectedSecondaryItem === "danger") && (
                <div 
                    className={`z-50 lg:fixed ${
                        isAdmin && adminHeaderVisible && currentAdminVersion === 'admin3'
                            ? adminHeaderCollapsed
                                ? 'lg:top-3 lg:bottom-0'  // Collapsed header height
                                : 'lg:top-12 lg:bottom-0' // Full header height
                            : 'lg:inset-y-0'
                    }`}
                    style={{ 
                        display: 'block',
                        left: MAIN_SIDEBAR_WIDTH + SECONDARY_SIDEBAR_WIDTH, // Position next to secondary sidebar
                        width: 736,
                        boxShadow: '20px 0 40px -10px rgba(0, 0, 0, 0.3)' // Simple right shadow on container
                    }}
                >
                    <div
                        style={{ 
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'var(--color-bg-primary)' // Solid background
                        }}
                        className="overflow-y-auto bg-primary scrollbar-minimal border-r border-secondary tertiary-overlay"
                    >
                        <div className="flex h-full flex-col">
                            {/* Header with title and actions */}
                            {!isTabConfigMode && !isFilterViewMode && (
                                <div className="sticky top-0 z-99 flex items-center justify-between px-4 pt-6 pb-4 border-b border-secondary bg-primary">
                                <div className="flex items-center gap-3">
                                    {showWidgetSelection && (
                                        <button
                                            onClick={handleWidgetSelectionBack}
                                            className="p-1 rounded-md hover:bg-secondary/60 transition-colors"
                                        >
                                            <ArrowLeft className="size-4 text-fg-quaternary" />
                                        </button>
                                    )}
                                    {showWidgetConfig && !isTabConfigMode && (
                                        <button
                                            onClick={handleWidgetConfigBack}
                                            className="p-1 rounded-md hover:bg-secondary/60 transition-colors"
                                        >
                                            <ArrowLeft className="size-4 text-fg-quaternary" />
                                        </button>
                                    )}
                                    {showNavigationInTertiary && (
                                        <button
                                            onClick={() => setShowNavigationInTertiary(false)}
                                            className="p-1 rounded-md hover:bg-secondary/60 transition-colors"
                                        >
                                            <ArrowLeft className="size-4 text-fg-quaternary" />
                                        </button>
                                    )}
                                    {!isTabConfigMode && !isFilterViewMode && (
                                        <h3 className="text-sm font-semibold text-brand-secondary">{getTertiaryTitle()}</h3>
                                    )}
                                </div>
                                {showWidgetConfig && !isTabConfigMode ? (
                                    <div className="flex items-center gap-2">
                                        <ButtonUtility
                                            size="sm"
                                            color="secondary"
                                            icon={Check}
                                            tooltip="Save changes"
                                            onClick={() => {
                                                console.log("Widget config saved");
                                                handleWidgetConfigBack();
                                            }}
                                        />
                                    </div>
                                ) : !showWidgetSelection && !isTabConfigMode && !showNavigationInTertiary && (
                                    <div className="flex items-center gap-2">
                                        <ButtonUtility
                                            size="sm"
                                            color="tertiary"
                                            icon={X}
                                            tooltip="Discard changes"
                                        />
                                        <ButtonUtility
                                            size="sm"
                                            color="tertiary"
                                            icon={Check}
                                            tooltip="Save changes"
                                        />
                                    </div>
                                )}
                            </div>
                            )}
                            
                            {/* Content */}
                            <div className="flex-1 px-4">
                                {getTertiarySidebarContent()}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
            <div
                style={{
                    paddingLeft: TOTAL_WIDTH,
                }}
                className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
            />

            {/* Mobile header navigation */}
            <MobileNavigationHeader>
                <aside className="group flex h-full max-h-full w-full max-w-full flex-col justify-between overflow-y-auto scrollbar-thin bg-primary pt-4">
                    {(currentAdminVersion === 'admin2' || !(isAdmin && adminHeaderVisible)) && (
                        <div className="px-4">
                            <UntitledLogo className="h-8" />
                        </div>
                    )}

                    <NavList items={items} activeUrl={activeUrl} />

                    <div className="mt-auto flex flex-col gap-5 px-2 py-4">
                        <div className="flex flex-col gap-1">
                            {footerItems.map((item) => (
                                <NavItemBase 
                                    key={item.label} 
                                    type="link" 
                                    href={item.href} 
                                    icon={item.icon}
                                    current={activeUrl === item.href}
                                >
                                    {item.label}
                                </NavItemBase>
                            ))}
                            <NavItemBase 
                                type="link" 
                                href="#" 
                                icon={getThemeIcon()}
                                current={false}
                                onClick={toggleTheme}
                            >
                                {getThemeLabel()}
                            </NavItemBase>
                        </div>

                        <div className="relative flex items-center gap-3 border-t border-secondary pt-6 pr-8 pl-2">
                            <AvatarLabelGroup
                                status="online"
                                size="md"
                                src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                title="Olivia Rhye"
                                subtitle="olivia@untitledui.com"
                            />
                        </div>
                    </div>
                </aside>
            </MobileNavigationHeader>
            {/* Add Space Modal */}
            <AddSpaceModal 
                isOpen={showAddSpaceModal}
                onClose={handleAddSpaceModalClose}
                onSelectType={handleSelectContentType}
                title="Choose a space type"
                description="Select the type of space you want to create for your community."
            />
            

            
            {/* Field Selection Modal (Step 2) */}
            <FieldSelectionModal
                isOpen={showFieldSelectionModal}
                onClose={handleFieldSelectionModalClose}
                onBack={handleFieldSelectionBack}
                onNext={handleFieldSelectionNext}
                contentType={selectedContentType}
            />
            
            {/* Space Configuration Modal (Step 3) */}
            <SpaceConfigurationModal
                isOpen={showSpaceConfigModal}
                onClose={handleSpaceConfigModalClose}
                onBack={handleSpaceConfigBack}
                onCreateSpace={handleCreateSpace}
                contentType={selectedContentType}
                selectedFields={selectedFields}
            />
        </>
    );
}; 