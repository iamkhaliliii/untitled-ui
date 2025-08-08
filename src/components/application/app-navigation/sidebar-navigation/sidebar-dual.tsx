"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { LogOut01, Palette, Settings01, Sun, Moon01, Monitor01, Grid03, Package, Folder, LayoutAlt01, Rows01, Settings02, Archive, LayoutTop, LayoutLeft, LayoutRight, LayoutBottom, FlexAlignTop, Menu01, Menu02, User02, FlexAlignBottom, Calendar, File01, FileX02, File04, ArrowLeft, Globe01, Users01, SearchLg, AlertTriangle, Check, X, BarChart03, ClipboardCheck, MessageChatCircle, Lightbulb01, BookOpen01, Edit03, MessageSquare01, Plus, FilePlus01, AlertCircle, Tag01, Placeholder, Data, Database01 } from "@untitledui/icons";
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
import { AddSpaceModal } from "../../modals/add-space-modal";
import { SpaceConfigurationModal } from "../../modals/space-configuration-modal";
import { FieldSelectionModal } from "../../modals/field-selection-modal";
import { EventsCustomizeSettings } from "./tertiary-sidebar/events-customize-settings";
import { WidgetSelection } from "./tertiary-sidebar/widget-selection";
import WidgetConfig from "./tertiary-sidebar/widget-config";

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
    const { toggleStates, updateToggleStates } = useWidgetConfig();
    const { isAdmin, adminHeaderVisible, adminHeaderCollapsed } = useAdmin();

    // Determine current admin version from activeUrl
    const getCurrentAdminVersion = () => {
        if (activeUrl?.includes('/admin2')) return 'admin2';
        if (activeUrl?.includes('/admin3')) return 'admin3';
        return 'admin3'; // default to admin3
    };

    const currentAdminVersion = getCurrentAdminVersion();

    // State for tree expansion
    const [expandedIds, setExpandedIds] = useState<string[]>(["spaces"]);
    
    // State for customize page tree expansion
    const [customizeExpandedIds, setCustomizeExpandedIds] = useState<string[]>([]);
    
    // State for CMS tree expansion
    const [cmsExpandedIds, setCmsExpandedIds] = useState<string[]>(["models"]);
    


    // Ref to prevent double execution and track folder count
    const isAddingFolderRef = useRef(false);
    const folderCounterRef = useRef(2);

    // State for secondary sidebar selection
    const [selectedSecondaryItem, setSelectedSecondaryItem] = useState<string>(() => {
        // Set initial state based on current URL
        if (activeUrl?.includes("/site/spaces/myfolder/events/customize")) return "customize";
        if (activeUrl?.includes("/site/spaces/myfolder/events/members")) return "members";
        if (activeUrl?.includes("/site/spaces/myfolder/events/analytics")) return "analytics";
        if (activeUrl?.includes("/site/spaces/myfolder/events/audit-logs")) return "audit-logs";
        if (activeUrl?.includes("/site/spaces/myfolder/events/seo")) return "seo";
        if (activeUrl?.includes("/site/spaces/myfolder/events/danger")) return "danger";
        if (activeUrl?.includes("/site/spaces/private-space/customize")) return "customize";
        return "general";
    });

    // Dynamic tree data with additional folders
    const [additionalFolders, setAdditionalFolders] = useState<TreeNode[]>([]);

    // Initial file tree data for Site section
    const getInitialSiteFileTree = (): TreeNode[] => [
        {
            id: "spaces",
            label: "Collections & Spaces",
            showAddButton: true,
            icon: <Folder className="size-5 text-fg-quaternary" />,
            children: [
                { id: "feed", label: "Feed" },
                { id: "explorer", label: "Explorer" },
                { id: "members", label: "Members" },
                { 
                    id: "myFolder", 
                    label: "MyFolder",
                    children: [
                        { 
                            id: "events", 
                            label: "Events",
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder/events` }
                        },
                        { id: "blog", label: "Blog" },
                    ]
                },
            ]
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
                { 
                    id: "header", 
                    label: "Header",
                    icon: <LayoutTop className="size-5 text-fg-quaternary" />,
                    showAddButton: true,
                    showToggleButton: true,
                    toggleState: toggleStates.header,
                    children: [
                        { id: "topNavigation", label: "Top Navigation", icon: <FlexAlignTop className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                },
                { 
                    id: "leftSidebar", 
                    label: "Sidebar",
                    icon: <LayoutLeft className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    showAddButton: true,
                    toggleState: toggleStates.leftSidebar,
                    children: [
                        { id: "menu", label: "Menu", icon: <Menu02 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                },
/*                 { 
                    id: "rightSidebar", 
                    label: "Right Sidebar",
                    icon: <LayoutRight className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    toggleState: toggleStates.rightSidebar,
                    children: [
                        { id: "leaderboard", label: "Leaderboard", icon: <User02 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                }, */
/*                 { 
                    id: "footer", 
                    label: "Footer",
                    icon: <LayoutBottom className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    toggleState: toggleStates.footer,
                    children: [
                        { id: "footerBlock", label: "Footer Block", icon: <FlexAlignBottom className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                }, */
            ]
        },
        {
            id: "modules",
            label: "CMS Pages",
            showAddButton: true,
            icon: <Package className="size-5 text-fg-quaternary" />,
            children: [
                { id: "events", label: "Events" },
                { id: "blog", label: "Blog" },
            ]
        },
    ];

    // Reactive tree data that updates when toggleStates change
    const siteTreeData = useMemo(() => {
        const baseTree = getInitialSiteFileTree();
        // Add additional folders to the spaces children
        const spacesNode = baseTree.find(node => node.id === "spaces");
        if (spacesNode && spacesNode.children) {
            spacesNode.children = [...spacesNode.children, ...additionalFolders];
        }
        return baseTree;
    }, [toggleStates, additionalFolders]);

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

    // State for widget configuration
    const [showWidgetConfig, setShowWidgetConfig] = useState(false);
    const [selectedWidgetForConfig, setSelectedWidgetForConfig] = useState<any>(null);
    const [isTabConfigMode, setIsTabConfigMode] = useState(false);
    const [tabConfigLabel, setTabConfigLabel] = useState<string>('');
    
    // State for add space modal
    const [showAddSpaceModal, setShowAddSpaceModal] = useState(false);
    
    // State for field selection modal (step 2)
    const [showFieldSelectionModal, setShowFieldSelectionModal] = useState(false);
    
    // State for space configuration modal (step 3)
    const [showSpaceConfigModal, setShowSpaceConfigModal] = useState(false);
    const [selectedContentType, setSelectedContentType] = useState<string>("");
    const [selectedFields, setSelectedFields] = useState<string[]>([]);

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
        setShowWidgetSelection(false);
        // TODO: Add widget to the customize settings
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
        
        // Navigate if the node has an href
        if (node.data?.href) {
            navigate(node.data.href);
        }
    };



    // Handle secondary sidebar item selection
    const handleSecondaryItemClick = (itemKey: string, href: string) => {
        setSelectedSecondaryItem(itemKey);
        navigate(href);
    };

    // Check if we're on any events page or private space page
    const isEventsPage = activeUrl?.includes("/site/spaces/myfolder/events");
    const isPrivateSpacePage = activeUrl?.includes("/site/spaces/private-space");
    const isSpacePage = isEventsPage || isPrivateSpacePage;

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
        
        switch (selectedSecondaryItem) {
            case "general":
                return "General Settings";
            case "customize":
                return "Customization";
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
                />
            );
        }
        
        switch (selectedSecondaryItem) {
                        case "general":
                return (
                    <EventsGeneralSettings
                        formToggles={formToggles}
                        setFormToggles={setFormToggles}
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
    const SECONDARY_SIDEBAR_WIDTH = isSpacePage ? 200 : 268;
    const TERTIARY_SIDEBAR_WIDTH = 368;
    const TOTAL_WIDTH = MAIN_SIDEBAR_WIDTH + SECONDARY_SIDEBAR_WIDTH + (isSpacePage ? TERTIARY_SIDEBAR_WIDTH : 0);

    const mainSidebar = (
        <aside
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
                {(currentAdminVersion === 'admin2' || !(isAdmin && adminHeaderVisible)) && (
                    <div className="flex justify-center px-3">
                        <UntitledLogoMinimal className="size-8" />
                    </div>
                )}

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
            style={{ width: SECONDARY_SIDEBAR_WIDTH }}
            className={cx("relative h-full overflow-y-auto scrollbar-thin bg-primary", !(hideBorder || hideRightBorder) && "border-r border-secondary")}
        >
            <div className="flex h-full flex-col px-4 pt-6 pb-5">
                <h3 className="text-sm font-semibold text-brand-secondary">
                    {isEventsPage ? "Events" : isPrivateSpacePage ? "Private Space" : currentItem?.label}
                </h3>
                
                {/* Show TreeView for Site section when on admin site page */}
                {currentItem?.label === "Site" && activeUrl === `/${currentAdminVersion}/site` ? (
                    <div className="flex h-full flex-col flex-1 mt-2">
                        {/* Search Input */}
                        <div className="mb-4">
                            <Input 
                                size="sm" 
                                placeholder="Search files and folders..." 
                                icon={SearchLg}
                                className="w-full"
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <TreeView
                                data={siteTreeData}
                                expandedIds={expandedIds}
                                selectedIds={["spaces"]}
                                onNodeClick={handleNodeClick}
                                onToggleChange={handleToggleChange}
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

                        {/* Footer Actions */}
                        <div className="sticky bg-primary">
                            <div className="h-px bg-secondary/40 my-2"></div>
                            <button 
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
                ) : currentItem?.label === "Content" && activeUrl?.includes("/content") ? (
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
                ) : isSpacePage ? (
                    <div className="mt-2">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate(`/${currentAdminVersion}/site`)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-secondary rounded-md transition-colors mb-4"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Site
                        </button>

                        {/* Space Menu */}
                        <ul className="space-y-0.5">
                            <li>
                                <button
                                    onClick={() => handleSecondaryItemClick("general", 
                                        isPrivateSpacePage ? `/${currentAdminVersion}/site/spaces/private-space` : `/${currentAdminVersion}/site/spaces/myfolder/events`
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
                            <li>
                                <button
                                    onClick={() => handleSecondaryItemClick("customize", 
                                        isPrivateSpacePage ? `/${currentAdminVersion}/site/spaces/private-space/customize` : `/${currentAdminVersion}/site/spaces/myfolder/events/customize`
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
                            {/* Only show these items for Events, not for Private Space */}
                            {isEventsPage && (
                                <>
                                    <li>
                                        <button
                                            onClick={() => handleSecondaryItemClick("members", `/${currentAdminVersion}/site/spaces/myfolder/events/members`)}
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
                                            onClick={() => handleSecondaryItemClick("analytics", `/${currentAdminVersion}/site/spaces/myfolder/events/analytics`)}
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
                                            onClick={() => handleSecondaryItemClick("audit-logs", `/${currentAdminVersion}/site/spaces/myfolder/events/audit-logs`)}
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
                                            onClick={() => handleSecondaryItemClick("seo", `/${currentAdminVersion}/site/spaces/myfolder/events/seo`)}
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
                                            onClick={() => handleSecondaryItemClick("danger", `/${currentAdminVersion}/site/spaces/myfolder/events/danger`)}
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
                    </div>
                ) : currentItem?.label === "Content 2" && activeUrl?.includes("/content2") ? (
                    activeUrl === `/${currentAdminVersion}/content2/cms` ? (
                        <div className="h-[calc(100vh-120px)] pt-2">
                            {/* Back Button */}
                            
                            <div className="flex items-center gap-1 mb-4">
                            <Button  onClick={() => navigate(`/${currentAdminVersion}/content2`)} color="tertiary" size="md" iconLeading={ArrowLeft} aria-label="Button CTA" />

                                <h3 className="text-lg font-semibold">
                                    CMS
                                </h3>
                                <Badge className="ml-1" color="gray">
                                    Beta
                                </Badge>
                            </div>
                            {/* CMS Models Tree */}
                            <div className="flex h-full flex-col flex-1 mt-2">
                                <div className="flex-1 overflow-y-auto">
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

                                {/* Footer Actions */}
                                <div className="sticky bg-primary">
                                    <div className="h-px bg-secondary/40 my-2"></div>
                                    <button 
                                        onClick={() => {
                                            console.log("Add CMS clicked");
                                            // TODO: Add CMS creation logic
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
                                <li className="py-0.5">
                                    <NavItemBase current={activeUrl === `/${currentAdminVersion}/content2/cms`} href={`/${currentAdminVersion}/content2/cms`} icon={Settings01} badge="beta" type="link">
                                        CMS
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

    const tertiarySidebar = (
        <div
            style={{ width: TERTIARY_SIDEBAR_WIDTH }}
            className={cx("relative h-full overflow-y-auto bg-primary scrollbar-minimal", !(hideBorder || hideRightBorder) && "border-r border-secondary")}
        >
            <div className="flex h-full flex-col">
                {/* Header with title and actions */}
                {!isTabConfigMode && (
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
                        {!isTabConfigMode && (
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
                    ) : !showWidgetSelection && !isTabConfigMode && (
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
                <div className="flex-1">
                    {getTertiarySidebarContent()}
                </div>
            </div>
        </div>
    );

    return (
        <>
                            {/* Desktop triple sidebar navigation */}
                <div className={`z-40 hidden lg:fixed lg:left-0 lg:flex ${
                    isAdmin && adminHeaderVisible && currentAdminVersion === 'admin3'
                        ? adminHeaderCollapsed
                            ? 'lg:top-3 lg:bottom-0'  // Collapsed header height
                            : 'lg:top-12 lg:bottom-0' // Full header height
                        : 'lg:inset-y-0'
                }`}>
                {mainSidebar}
                {secondarySidebar}
                {isSpacePage && tertiarySidebar}
            </div>

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