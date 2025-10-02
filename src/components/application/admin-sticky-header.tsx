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
    DotsHorizontal
} from "@untitledui/icons";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button as AriaButton } from "react-aria-components";
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

    if (!isVisible) {
        return null;
    }

    // Get breadcrumbs based on URL
    const getBreadcrumbsData = () => {
        const path = location.pathname;
        const segments = path.split('/').filter(Boolean);
        
        if (segments.length === 0) return [{ label: 'Home', path: '/' }];
        
        // Build breadcrumbs from URL segments
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
        return 'admin3'; // default to admin3
    };

    const currentAdminVersion = getCurrentAdminVersion();

    const adminTools = [
        { 
            icon: File04, 
            label: "Files",
            onClick: () => navigate(`/${currentAdminVersion}/site/files`)
        },
        { 
            icon: Database01, 
            label: "Database",
            onClick: () => navigate(`/${currentAdminVersion}/content`)
        },
        { 
            icon: BarChart03, 
            label: "Analytics",
            onClick: () => navigate(`/${currentAdminVersion}/report/analytics`)
        },
        { 
            icon: Shield01, 
            label: "Security",
            onClick: () => navigate(`/${currentAdminVersion}/setting/security-privacy`)
        },
    ];

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
    
    return (
        <div className="sticky top-0 left-0 right-0 z-[60] bg-black dark:bg-white border-b border-gray-800 dark:border-gray-200 overflow-hidden relative">
            {/* Main Header Content */}
            <div className={`transition-all duration-400 ease-in-out transform ${
                adminHeaderCollapsed 
                    ? 'h-3 -translate-y-9' 
                    : 'h-12 translate-y-0'
            }`}>
                <div className="flex items-center h-12">
                    {/* Logo Section */}
                    <div 
                        className="relative w-16 h-12 flex items-center justify-center transition-all duration-300 ease-in-out border-r border-gray-800 dark:border-gray-200 cursor-pointer hover:bg-gray-900 dark:hover:bg-gray-100"
                        onClick={() => navigate("/admin4")}
                        title="Go to Admin Dashboard"
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
                    </div>

                    <div className="flex-1 flex items-center">
                        {/* Tools Section */}
                        <div className="w-77 flex-shrink-0 h-full border-r border-gray-800 dark:border-gray-200">
                            <div className="flex h-full items-center justify-center gap-2 px-2">
                                {adminTools.map((tool, index) => (
                                    <div key={index} className="relative group">
                                        <ButtonUtility 
                                            size="sm" 
                                            color="tertiary"
                                            icon={tool.icon}
                                            tooltip={tool.label}
                                            onClick={tool.onClick}
                                            className="border border-gray-800 dark:border-gray-300 bg-black dark:bg-white text-gray-300 dark:text-gray-600 hover:bg-gray-900 dark:hover:bg-gray-100"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

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
                                    <div className="h-12 flex items-center justify-center border-r border-l border-gray-800 dark:border-gray-200">
                                        <ButtonUtility 
                                            size="sm"
                                            color="tertiary" 
                                            icon={Plus}
                                            tooltip="Add New Event"
                                            onClick={handleAddNew}
                                            className="w-12 h-12 bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-gray-300 dark:text-gray-600"
                                        />
                                    </div>

                                    <div className="h-12 flex items-center justify-center border-r border-gray-800 dark:border-gray-200">
                                        <ButtonUtility 
                                            size="sm"
                                            color="tertiary" 
                                            icon={isAdminPage ? Globe01 : Settings01}
                                            tooltip={isAdminPage ? "View Site" : "Admin Settings"}
                                            onClick={handleSettings}
                                            className="w-12 h-12 bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-gray-300 dark:text-gray-600"
                                        />
                                    </div>

                                    <div className="h-12 flex items-center justify-center">
                                        <ButtonUtility 
                                            size="sm"
                                            color="tertiary" 
                                            icon={Stars01}
                                            tooltip="AI Assistant"
                                            onClick={handleAIAssistant}
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