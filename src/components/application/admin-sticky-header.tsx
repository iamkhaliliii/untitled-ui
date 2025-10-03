import { useNavigate, useLocation } from "react-router";
import React from "react";
import {
    File04,
    Database01,
    BarChart03,
    Shield01,
    Plus,
    Settings01,
    Stars01,
    ChevronUp,
    ChevronDown,
    Menu01,
    Globe01,
    DotsHorizontal,
    Brush02,
    CodeBrowser,
    Monitor01,
    Eye,
    ChevronDownDouble,
    Settings02
} from "@untitledui/icons";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button as AriaButton } from "react-aria-components";
import { AdminStickyHeaderAccountMenu } from "@/components/application/admin-sticky-header-account-menu";
import { AdminStickyHeaderDropdown } from "@/components/application/admin-sticky-header-dropdown";
import { useAdmin } from "@/hooks/use-admin";

export interface AdminStickyHeaderProps {
    isVisible?: boolean;
    onToggleVisibility?: () => void;
    isAdminPage?: boolean; // Whether we're in admin panel or site
}

export const AdminStickyHeader = ({ 
    isVisible = true, 
    onToggleVisibility,
    isAdminPage = false
}: AdminStickyHeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { adminHeaderCollapsed, toggleAdminHeaderCollapse } = useAdmin();
    
    // Check if user came from Page Customizer
    const cameFromPageCustomizer = location.state?.from === 'page-customizer' || 
                                   document.referrer.includes('/admin4/design/page-customizer');

    if (!isVisible) {
        return null;
    }

    // Get breadcrumbs based on URL
    const getBreadcrumbsData = () => {
        const path = location.pathname;
        const segments = path.split('/').filter(Boolean);
        
        if (segments.length === 0) return [{ label: 'Home', path: '/' }];
        
        // If user came from Page Customizer and is on a customize page, show Page Customizer in breadcrumb
        if (cameFromPageCustomizer && path.includes('/customize')) {
            const breadcrumbs = [];
            
            // Add Admin Panel
            breadcrumbs.push({ label: 'Admin Panel', path: '/admin4' });
            
            // Add Design
            breadcrumbs.push({ label: 'Design', path: '/admin4/design' });
            
            // Add Page Customizer
            breadcrumbs.push({ label: 'Page Customizer', path: '/admin4/design/page-customizer' });
            
            // Add current page name
            const pathParts = path.split('/');
            const spaceName = pathParts[pathParts.length - 3]; // e.g., 'myfolder' or 'growth'
            const pageType = pathParts[pathParts.length - 2]; // e.g., 'events', 'blog'
            
            let displayName = pageType.charAt(0).toUpperCase() + pageType.slice(1);
            if (spaceName === 'growth') {
                displayName = `Growth ${displayName}`;
            } else if (spaceName !== 'myfolder') {
                displayName = `${spaceName.charAt(0).toUpperCase() + spaceName.slice(1)} ${displayName}`;
            }
            
            breadcrumbs.push({ label: `${displayName} Customize`, path: path });
            
            return breadcrumbs;
        }
        
        // Build breadcrumbs from URL segments (original logic)
        const breadcrumbs = [];
        let currentPath = '';
        
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            currentPath += `/${segment}`;
            
            let label = segment;
            if (segment.startsWith('admin')) {
                label = segment === 'admin4' ? 'Admin Panel' : 
                       segment === 'admin3' ? 'Admin3' : 
                       segment === 'admin2' ? 'Admin2' : 'Admin';
            } else {
                label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ');
            }
            
            breadcrumbs.push({ label, path: currentPath });
        }
        
        return breadcrumbs;
    };

    const renderBreadcrumbs = () => {
        const breadcrumbs = getBreadcrumbsData();
        
        if (breadcrumbs.length <= 3) {
            // Show all if 3 or less
            return breadcrumbs.map((crumb, index) => (
                <span key={crumb.path} className="flex items-center gap-1">
                    <button
                        onClick={() => navigate(crumb.path)}
                        className={`cursor-pointer hover:text-white dark:hover:text-black transition-colors ${
                            index === breadcrumbs.length - 1 
                                ? 'text-white dark:text-black font-medium' 
                                : 'text-gray-300 dark:text-gray-600'
                        }`}
                    >
                        {crumb.label}
                    </button>
                    {index < breadcrumbs.length - 1 && (
                        <span className="text-gray-500 dark:text-gray-400">›</span>
                    )}
                </span>
            ));
        } else {
            // Show first, second, ..., second-to-last, last
            return (
                <>
                    <span className="flex items-center gap-1">
                        <button
                            onClick={() => navigate(breadcrumbs[0].path)}
                            className="cursor-pointer text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors"
                        >
                            {breadcrumbs[0].label}
                        </button>
                        <span className="text-gray-500 dark:text-gray-400">›</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <button
                            onClick={() => navigate(breadcrumbs[1].path)}
                            className="cursor-pointer text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors"
                        >
                            {breadcrumbs[1].label}
                        </button>
                        <span className="text-gray-500 dark:text-gray-400">›</span>
                    </span>
                    <Dropdown.Root>
                        <AriaButton
                            aria-label="Show hidden breadcrumbs"
                            className="cursor-pointer rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-500 transition-colors p-1"
                        >
                            <DotsHorizontal className="w-4 h-4  " />
                        </AriaButton>
                        <Dropdown.Popover className="z-[70] !min-w-32">
                            <Dropdown.Menu>
                                {breadcrumbs.slice(2, -2).map((crumb) => (
                                    <Dropdown.Item
                                        key={crumb.path}
                                        label={crumb.label}
                                        onAction={() => navigate(crumb.path)}
                                    />
                                ))}
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                    <span className="text-gray-500 dark:text-gray-400">›</span>
                    <span className="flex items-center gap-1">
                        <button
                            onClick={() => navigate(breadcrumbs[breadcrumbs.length - 2].path)}
                            className="cursor-pointer text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors"
                        >
                            {breadcrumbs[breadcrumbs.length - 2].label}
                        </button>
                        <span className="text-gray-500 dark:text-gray-400">›</span>
                    </span>
                    <span>
                        <button
                            onClick={() => navigate(breadcrumbs[breadcrumbs.length - 1].path)}
                            className="cursor-pointer text-white dark:text-black font-medium hover:text-gray-200 dark:hover:text-gray-800 transition-colors"
                        >
                            {breadcrumbs[breadcrumbs.length - 1].label}
                        </button>
                    </span>
                </>
            );
        }
    };

    // Determine current admin version
    const getCurrentAdminVersion = () => {
        const path = location.pathname;
        if (path.includes('/admin4')) return 'admin4';
        if (path.includes('/admin2')) return 'admin2';
        if (path.includes('/admin3')) return 'admin3';
        return 'admin4'; // default to admin3
    };

    const currentAdminVersion = getCurrentAdminVersion();
    const isDesignPage = location.pathname.includes('/design');

    const baseTools = [
        { 
            icon: Database01, 
            label: "Content",
            items: [
                { 
                    label: "Recently Posts",
                    isSection: true
                },
                { label: "Native Events", onClick: () => navigate(`/${currentAdminVersion}/content2/posts`) },
                { label: "Member groups", onClick: () => navigate(`/${currentAdminVersion}/content2/posts`) },
                { label: "Image text in Content if an image", onClick: () => navigate(`/${currentAdminVersion}/content2/posts`) },
                { label: "See more", onClick: () => navigate(`/${currentAdminVersion}/content2/posts`) },
                { 
                    label: "Recently Events",
                    isSection: true
                },
                { label: "Annual Tech Conference 2024", onClick: () => navigate(`/${currentAdminVersion}/content2/events`) },
                { label: "Product Launch Event", onClick: () => navigate(`/${currentAdminVersion}/content2/events`) },
                { label: "Team Building Workshop", onClick: () => navigate(`/${currentAdminVersion}/content2/events`) },
                { label: "See more", onClick: () => navigate(`/${currentAdminVersion}/content2/events`) },
                { 
                    label: "separator1",
                    isSeparator: true
                },
                { 
                    label: "Quick Access",
                    isSection: true
                },
                { label: "Spaces", onClick: () => navigate(`/${currentAdminVersion}/content2/spaces`) },
                { label: "Tags", onClick: () => navigate(`/${currentAdminVersion}/content2/tag`) },
            ]
        },
        { 
            icon: CodeBrowser, 
            label: "Site",
            items: [
                { 
                    label: "Recently Visited Spaces",
                    isSection: true
                },
                { label: "Growth Events", onClick: () => navigate(`/${currentAdminVersion}/site/spaces/growth/events`) },
                { label: "Events", onClick: () => navigate(`/${currentAdminVersion}/site/spaces/myfolder/events`) },
                { label: "Blog", onClick: () => navigate(`/${currentAdminVersion}/site/spaces/myfolder/blog`) },
                { label: "Help", onClick: () => navigate(`/${currentAdminVersion}/site/spaces/myfolder/help`) },
                { label: "Posts", onClick: () => navigate(`/${currentAdminVersion}/site/spaces/myfolder/posts`) },
                { label: "See more", onClick: () => navigate(`/${currentAdminVersion}/site`) },
                { 
                    label: "separator1",
                    isSeparator: true
                },
                { 
                    label: "Utility Pages",
                    isSection: true
                },
                { label: "404", onClick: () => navigate(`/${currentAdminVersion}/site/404`) },
                { label: "Search", onClick: () => navigate(`/${currentAdminVersion}/site/search`) },
                { label: "Member Profile", onClick: () => navigate(`/${currentAdminVersion}/site/member-profile`) },
                { 
                    label: "separator2",
                    isSeparator: true
                },
                { 
                    label: "Content Types",
                    isSection: true
                },
                { label: "Event", onClick: () => navigate(`/${currentAdminVersion}/site/cms/events`) },
                { label: "Blog", onClick: () => navigate(`/${currentAdminVersion}/site/cms/blog`) },
            ]
        },
        { 
            icon: Brush02, 
            label: "Design Mode",
            isActive: isDesignPage,
            onClick: () => navigate(`/${currentAdminVersion}/design`)
        },
        { 
            icon: Shield01, 
            label: "Security",
            onClick: () => navigate(`/${currentAdminVersion}/setting/security-privacy`)
        },
    ];

    // Reorder tools based on current page
    const adminTools = isDesignPage 
        ? [baseTools[2], baseTools[0], baseTools[1], baseTools[3]] // Design first, then Content, Site, Security
        : baseTools; // Normal order: Content, Site, Design, Security

    const handleAddNew = () => {
        navigate(`/${currentAdminVersion}/site/spaces/myfolder/events/create`);
    };

    const handleSettings = () => {
        if (isAdminPage) {
            navigate("/site");
        } else {
            navigate(`/${currentAdminVersion}/setting/site-settings`);
        }
    };

    const handleAIAssistant = () => {
        console.log("AI Assistant clicked");
    };

    const isAdmin4 = location.pathname.includes('/admin4');
    
    // Determine current mode based on URL
    const getCurrentMode = () => {
        const path = location.pathname;
        // Check if on any design-related page (including ALL customize pages since they use DesignLayout)
        if (path.includes('/design') || path.includes('/customize')) {
            return { icon: Brush02, label: 'Design Mode' };
        } else if (path.includes('/moderation')) {
            return { icon: Eye, label: 'Moderation Mode' };
        } else {
            return { icon: Settings02, label: 'Admin Mode' };
        }
    };

    const currentMode = getCurrentMode();
    
    return (
        <div className="sticky top-0 left-0 right-0 z-[60] bg-black dark:bg-white border-b border-gray-800 dark:border-gray-200 overflow-hidden relative">
            {/* Main Header Content */}
            <div className={`transition-all duration-400 ease-in-out transform ${
                adminHeaderCollapsed 
                    ? 'h-3 -translate-y-9' 
                    : 'h-12 translate-y-0'
            }`}>
                <div className="flex items-center h-12">
                    {/* Logo Section with Dropdown */}
                    <Dropdown.Root>
                        <AriaButton
                            aria-label="User menu"
                            className="relative w-16 h-12 flex items-center justify-center transition-all duration-300 ease-in-out border-r border-gray-800 dark:border-gray-200 cursor-pointer hover:bg-gray-900 dark:hover:bg-gray-100"
                        >
                            <svg 
                                width="24" 
                                height="24" 
                                viewBox="0 0 58 58" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="text-white dark:text-black"
                            >
                                <path 
                                    d="M28.9912 0C12.9792 0 0 12.9792 0 28.9912C0 45.0032 12.9792 57.9824 28.9912 57.9824C45.0032 57.9824 57.9824 45.0032 57.9824 28.9912C57.9824 12.9792 45.0032 0 28.9912 0ZM34.4282 38.051H23.5554C18.551 38.051 14.4967 33.9956 14.4967 28.9912C14.4967 23.9868 18.5521 19.9315 23.5554 19.9315H34.4282C39.4326 19.9315 43.4868 23.9868 43.4868 28.9912C43.4868 33.9956 39.4315 38.051 34.4282 38.051Z" 
                                    fill="currentColor"
                                />
                                <path 
                                    d="M34.427 36.2389C38.4299 36.2389 41.6748 32.9939 41.6748 28.9911C41.6748 24.9882 38.4299 21.7433 34.427 21.7433C30.4242 21.7433 27.1792 24.9882 27.1792 28.9911C27.1792 32.9939 30.4242 36.2389 34.427 36.2389Z" 
                                    fill="currentColor"
                                />
                            </svg>
                        </AriaButton>
                        <Dropdown.Popover className="z-[70]">
                            <AdminStickyHeaderAccountMenu />
                        </Dropdown.Popover>
                    </Dropdown.Root>

                    <div className="flex-1 flex items-center">
                        {/* Tools Section - Hidden */}
                        {/* <div className="w-77 flex-shrink-0 h-full border-r border-gray-800 dark:border-gray-200">
                            <div className="flex h-full items-center justify-center gap-2 px-2">
                                {adminTools.map((tool, index) => (
                                    <div key={index} className="relative group">
                                        {tool.items ? (
                                            <Dropdown.Root>
                                                <ButtonUtility 
                                                    size="sm" 
                                                    color="tertiary"
                                                    icon={tool.icon}
                                                    tooltip={tool.label}
                                                    className="border border-gray-800 dark:border-gray-300 bg-black dark:bg-white text-gray-300 dark:text-gray-600 hover:bg-gray-900 dark:hover:bg-gray-100"
                                                />
                                                <Dropdown.Popover className="z-[70] !w-56">
                                                    <AdminStickyHeaderDropdown items={tool.items} />
                                                </Dropdown.Popover>
                                            </Dropdown.Root>
                                        ) : tool.isActive ? (
                                            <div className={`flex items-center gap-1 px-2 py-1 mr-3 rounded-md border border-brand-400 dark:border-brand-500 bg-brand-600 dark:bg-brand-500 text-white hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors cursor-pointer`}
                                                onClick={tool.onClick}
                                            >
                                                <tool.icon className="w-5 h-5" />
                                                <span className="text-sm font-medium">{tool.label}</span>
                                            </div>
                                        ) : (
                                            <ButtonUtility 
                                                size="sm" 
                                                color="tertiary"
                                                icon={tool.icon}
                                                tooltip={tool.label}
                                                onClick={tool.onClick}
                                                className="border border-gray-800 dark:border-gray-300 bg-black dark:bg-white text-gray-300 dark:text-gray-600 hover:bg-gray-900 dark:hover:bg-gray-100"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        {/* Main Content Area */}
                        <div className="flex-1 flex items-center justify-between pl-3">
                            <div className="flex items-center gap-2 text-xs">
                                <div className="flex items-center gap-1">
                                    {renderBreadcrumbs()}
                                </div>

                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    {/* Mode Dropdown */}
                                    <div className="h-12 flex items-center justify-center border-r border-l border-gray-800 dark:border-gray-200">
                                        <Dropdown.Root>
                                            <AriaButton
                                                aria-label="Switch Mode"
                                                className="flex items-center gap-2 px-3 h-12 bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-gray-300 dark:text-gray-600 transition-colors"
                                            >
                                                <currentMode.icon className="w-4 h-4" />
                                                <span className="text-sm font-medium">{currentMode.label}</span>
                                                <ChevronDown className="w-3 h-3" />
                                            </AriaButton>
                                            <Dropdown.Popover className="z-[70] !min-w-64">
                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        icon={Settings02}
                                                        label="Admin Mode"
                                                        onAction={() => navigate(`/${currentAdminVersion}`)}
                                                    />
                                                    <Dropdown.Item
                                                        icon={Brush02}
                                                        label="Design Mode"
                                                        onAction={() => navigate(`/${currentAdminVersion}/design`)}
                                                    />
                                                    <Dropdown.Item
                                                        icon={Shield01}
                                                        label="Moderation Mode"
                                                        onAction={() => navigate(`/${currentAdminVersion}/moderation`)}
                                                    />
                                                </Dropdown.Menu>
                                            </Dropdown.Popover>
                                        </Dropdown.Root>
                                    </div>

                                    {/* Plus Action - Hidden */}
                                    {/* <div className="h-12 flex items-center justify-center border-r border-l border-gray-800 dark:border-gray-200">
                                        <ButtonUtility 
                                            size="sm"
                                            color="tertiary" 
                                            icon={Plus}
                                            tooltip="Add New Event"
                                            onClick={handleAddNew}
                                            className="w-12 h-12 bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-gray-300 dark:text-gray-600"
                                        />
                                    </div> */}

                                    <div className="h-12 flex items-center justify-center border-gray-800 dark:border-gray-200">
                                        <ButtonUtility 
                                            size="sm"
                                            color="tertiary" 
                                            icon={isAdminPage ? Globe01 : Settings01}
                                            tooltip={isAdminPage ? "View Site" : "Admin Settings"}
                                            onClick={handleSettings}
                                            className="w-12 h-12 bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-gray-300 dark:text-gray-600"
                                        />
                                    </div>

                                </div>

                                                               {/* Hide/Show Toggle - Only show on site pages, not admin pages */}
                               {!isAdminPage && (
                                   <ButtonUtility
                                       size="sm"
                                       color="tertiary"
                                       icon={adminHeaderCollapsed ? ChevronDown : ChevronUp}
                                       onClick={toggleAdminHeaderCollapse}
                                       tooltip={adminHeaderCollapsed ? "Show Admin Header" : "Minimize Admin Header"}
                                       className="text-gray-300 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-200"
                                   />
                               )}

                                {/* Mobile Menu */}
                                <div className="lg:hidden">
                                    <ButtonUtility 
                                        size="sm"
                                        color="tertiary"
                                        icon={Menu01}
                                        tooltip="Menu"
                                        className="text-gray-300 dark:text-gray-600 hover:bg-gray-900 dark:hover:bg-gray-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Collapsed state toggle button positioned absolutely */}
            {adminHeaderCollapsed && !isAdminPage && (
                <div className="absolute top-0 right-4 h-3 flex items-center">
                    <ButtonUtility 
                        size="sm"
                        color="tertiary"
                        icon={ChevronDown}
                        onClick={toggleAdminHeaderCollapse}
                        tooltip="Show Admin Header"
                        className="text-gray-300 dark:text-gray-600 hover:bg-gray-900 dark:hover:bg-gray-100 h-6 w-8 rounded-b-md"
                    />
                </div>
            )}
        </div>
    );
};