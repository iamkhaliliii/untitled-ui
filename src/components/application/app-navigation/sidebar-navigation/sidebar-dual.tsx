"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOut01, Palette, Settings01, Sun, Moon01, Monitor01, Grid03, Package, Folder, LayoutAlt01, Rows01, Settings02, Archive, LayoutTop, LayoutLeft, LayoutRight, LayoutBottom, FlexAlignTop, Menu01, Menu02, User02, FlexAlignBottom, Calendar, File01, FileX02, File04, ArrowLeft, Globe01, Users01, SearchLg, AlertTriangle, Check, X } from "@untitledui/icons";
import { Button as AriaButton, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover, Menu } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
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
import { TreeView, type TreeNode } from "@/components/ui/tree-view";
import { Input, InputBase } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { RadioButton } from "@/components/base/radio-buttons/radio-buttons";
import { EventsGeneralSettings } from "./tertiary-sidebar/events-general-settings";
import { EventsSeoSettings } from "./tertiary-sidebar/events-seo-settings";
import { EventsMembersSettings } from "./tertiary-sidebar/events-members-settings";
import { EventsDangerSettings } from "./tertiary-sidebar/events-danger-settings";
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

    // State for toggle buttons
    const [toggleStates, setToggleStates] = useState({
        header: false,
        leftSidebar: false,
        rightSidebar: false,
        footer: false,
    });

    // State for tree expansion
    const [expandedIds, setExpandedIds] = useState<string[]>(["spaces"]);
    
    // State for customize page tree expansion
    const [customizeExpandedIds, setCustomizeExpandedIds] = useState<string[]>([]);

    // State for secondary sidebar selection
    const [selectedSecondaryItem, setSelectedSecondaryItem] = useState<string>(() => {
        // Set initial state based on current URL
        if (activeUrl?.includes("/admin/site/spaces/myfolder/events/customize")) return "customize";
        if (activeUrl?.includes("/admin/site/spaces/myfolder/events/members")) return "members";
        if (activeUrl?.includes("/admin/site/spaces/myfolder/events/seo")) return "seo";
        if (activeUrl?.includes("/admin/site/spaces/myfolder/events/danger")) return "danger";
        return "general";
    });

    // State for widget selection
    const [showWidgetSelection, setShowWidgetSelection] = useState(false);

    // State for widget configuration
    const [showWidgetConfig, setShowWidgetConfig] = useState(false);
    const [selectedWidgetForConfig, setSelectedWidgetForConfig] = useState<any>(null);

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
    };

    // Handle toggle changes
    const handleToggleChange = (nodeId: string, isToggled: boolean) => {
        setToggleStates(prev => ({
            ...prev,
            [nodeId]: isToggled
        }));
        
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

    // Check if we're on any events page
    const isEventsPage = activeUrl?.includes("/admin/site/spaces/myfolder/events");

    // State for form toggles
    const [formToggles, setFormToggles] = useState({
        inviteOnly: false,
        anyoneInvite: false,
        comments: false,
        reactions: false,
    });

    // Get title for tertiary sidebar based on selected menu item
    const getTertiaryTitle = () => {
        if (showWidgetSelection) {
            return "Add Widget";
        }
        
        if (showWidgetConfig && selectedWidgetForConfig) {
            return `Configure ${selectedWidgetForConfig.label}`;
        }
        
        switch (selectedSecondaryItem) {
            case "general":
                return "General Settings";
            case "customize":
                return "Customization";
            case "members":
                return "Members";
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
                        setToggleStates={setToggleStates}
                        onAddWidgetClick={handleAddWidgetClick}
                        onWidgetConfig={handleWidgetConfig}
                    />
                );
            case "members":
                return <EventsMembersSettings />;
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

    // File tree data for Site section
    const siteFileTree: TreeNode[] = [
        {
            id: "spaces",
            label: "Spaces",
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
                            data: { href: "/admin/site/spaces/myfolder/events" }
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
                { id: "privateSpace", label: "Private space" },
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
                    showToggleButton: true,
                    toggleState: toggleStates.header,
                    children: [
                        { id: "topNavigation", label: "TopNavigation", icon: <FlexAlignTop className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                },
                { 
                    id: "leftSidebar", 
                    label: "Left Sidebar",
                    icon: <LayoutLeft className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    toggleState: toggleStates.leftSidebar,
                    children: [
                        { id: "menu", label: "Menu", icon: <Menu02 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                },
                { 
                    id: "rightSidebar", 
                    label: "Right Sidebar",
                    icon: <LayoutRight className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    toggleState: toggleStates.rightSidebar,
                    children: [
                        { id: "leaderboard", label: "Leaderboard", icon: <User02 className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                },
                { 
                    id: "footer", 
                    label: "Footer",
                    icon: <LayoutBottom className="size-5 text-fg-quaternary" />,
                    showToggleButton: true,
                    toggleState: toggleStates.footer,
                    children: [
                        { id: "footerBlock", label: "FooterBlock", icon: <FlexAlignBottom className="bg-violet-100/20 p-[1px] rounded-md size-5 text-violet-400" /> },
                    ]
                },
            ]
        },
        {
            id: "modules",
            label: "Modules",
            showAddButton: true,
            icon: <Package className="size-5 text-fg-quaternary" />,
            children: [
                { id: "events", label: "Events" },
                { id: "blog", label: "Blog" },
            ]
        },
    ];

    const activeItem = [...items, ...footerItems].find((item) => item.href === activeUrl || item.items?.some((subItem) => subItem.href === activeUrl));
    const [currentItem, setCurrentItem] = useState(activeItem || items[0]);
    const { theme, setTheme } = useTheme();

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
    const SECONDARY_SIDEBAR_WIDTH = isEventsPage ? 200 : 268;
    const TERTIARY_SIDEBAR_WIDTH = 368;
    const TOTAL_WIDTH = MAIN_SIDEBAR_WIDTH + SECONDARY_SIDEBAR_WIDTH + (isEventsPage ? TERTIARY_SIDEBAR_WIDTH : 0);

    const mainSidebar = (
        <aside
            style={{
                width: MAIN_SIDEBAR_WIDTH,
            }}
            className="group flex h-full max-h-full max-w-full overflow-y-auto bg-primary py-1 pl-1"
        >
            <div
                className={cx(
                    "flex w-auto flex-col justify-between rounded-xl pt-5 ring-1 ring-secondary transition duration-300 ring-inset",
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
            className={cx("relative h-full overflow-y-auto bg-primary", !(hideBorder || hideRightBorder) && "border-r border-secondary")}
        >
            <div className="flex h-full flex-col px-4 pt-6 pb-5">
                <h3 className="text-sm font-semibold text-brand-secondary">
                    {isEventsPage ? "Events" : currentItem?.label}
                </h3>
                
                {/* Show TreeView for Site section when on /admin/site page */}
                {currentItem?.label === "Site" && activeUrl === "/admin/site" ? (
                    <div className="mt-2">
                        <TreeView
                            data={siteFileTree}
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
                                    setToggleStates(prev => ({
                                        ...prev,
                                        [nodeId]: expanded
                                    }));
                                }
                            }}
                            className="border-none bg-transparent"
                            showLines={false}
                            showIcons={true}
                        />
                    </div>
                ) : isEventsPage ? (
                    <div className="mt-2">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate("/admin/site")}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-secondary rounded-md transition-colors mb-4"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Site
                        </button>

                        {/* Events Menu */}
                        <ul className="space-y-0.5">
                            <li>
                                <button
                                    onClick={() => handleSecondaryItemClick("general", "/admin/site/spaces/myfolder/events")}
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
                                    onClick={() => handleSecondaryItemClick("customize", "/admin/site/spaces/myfolder/events/customize")}
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
                            <li>
                                <button
                                    onClick={() => handleSecondaryItemClick("members", "/admin/site/spaces/myfolder/events/members")}
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
                                    onClick={() => handleSecondaryItemClick("seo", "/admin/site/spaces/myfolder/events/seo")}
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
                                    onClick={() => handleSecondaryItemClick("danger", "/admin/site/spaces/myfolder/events/danger")}
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
                        </ul>
                    </div>
                ) : (
                    <ul className="mt-2">
                        {currentItem?.items?.map((item, index) => (
                            <li key={item.label} className="py-0.5">
                                <NavItemBase current={activeUrl === item.href} href={item.href} icon={item.icon} badge={item.badge} type="link">
                                    {item.label}
                                </NavItemBase>
                            </li>
                        ))}
                    </ul>
                )}
                
                <div className="relative mt-auto flex justify-between border-t border-secondary px-2 pt-5">
                    <div>
                        <p className="text-sm font-semibold text-primary">Olivia Rhye</p>
                        <p className="text-sm text-tertiary">olivia@untitledui.com</p>
                    </div>
                    <div className="absolute top-2.5 right-0">
                        <ButtonUtility size="sm" color="tertiary" tooltip="Log out" icon={LogOut01} />
                    </div>
                </div>
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
                <div className="sticky top-0 z-10 flex items-center justify-between px-4 pt-6 pb-4 border-b border-secondary bg-primary">
                    <div className="flex items-center gap-3">
                        {showWidgetSelection && (
                            <button
                                onClick={handleWidgetSelectionBack}
                                className="p-1 rounded-md hover:bg-secondary/60 transition-colors"
                            >
                                <ArrowLeft className="size-4 text-fg-quaternary" />
                            </button>
                        )}
                        {showWidgetConfig && (
                            <button
                                onClick={handleWidgetConfigBack}
                                className="p-1 rounded-md hover:bg-secondary/60 transition-colors"
                            >
                                <ArrowLeft className="size-4 text-fg-quaternary" />
                            </button>
                        )}
                        <h3 className="text-sm font-semibold text-brand-secondary">{getTertiaryTitle()}</h3>
                    </div>
                    {showWidgetConfig ? (
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
                    ) : !showWidgetSelection && (
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
            <div className="z-50 hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">
                {mainSidebar}
                {secondarySidebar}
                {isEventsPage && tertiarySidebar}
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
                <aside className="group flex h-full max-h-full w-full max-w-full flex-col justify-between overflow-y-auto bg-primary pt-4">
                    <div className="px-4">
                        <UntitledLogo className="h-8" />
                    </div>

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
        </>
    );
}; 