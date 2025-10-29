import { ReactNode, useState } from "react";
import { Link } from "react-router";
import {
    MessageCircle01,
    Settings01,
    Bell01,
    User01,
    SearchLg,
    Menu02,
    X,
    Plus,
    Sun,
    Moon01,
    Edit05,
    Calendar,
    Shield01,
    UserCheck01,
    AlertCircle,
    ArrowLeft,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { cx } from "@/utils/cx";
import { useTheme } from "@/providers/theme";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { AdminToggle } from "@/components/application/admin-toggle";
import { useAdmin } from "@/hooks/use-admin";
import { ErrorBoundary } from "@/components/error-boundary";
import { LogOut01, UsersPlus, UserSquare } from "@untitledui/icons";

interface SiteAdminLayoutProps {
    children: ReactNode;
    leftSidebarContent?: ReactNode;
    rightSidebarContent?: ReactNode;
    currentPath?: string;
    showBackButton?: boolean;
}

const HeaderSimple = ({ 
    onMobileMenuToggle, 
    theme, 
    onThemeToggle
}: { 
    onMobileMenuToggle?: () => void; 
    theme?: string; 
    onThemeToggle?: () => void;
}) => (
    <div className="flex max-w-container mx-auto items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-4 max-sm:py-3 max-sm:px-3">
        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <ButtonUtility 
                size="sm" 
                color="secondary"
                icon={Menu02}
                className="lg:hidden w-10 h-10"
                tooltip="Menu"
                onClick={onMobileMenuToggle}
            />
            
            {/* Logo - Full on desktop, icon only on mobile */}
            <div className="flex items-center">
                <UntitledLogo className="h-8 max-md:hidden" />
                <UntitledLogoMinimal className="h-8 max-sm:h-6 md:hidden" />
            </div>
        </div>

        {/* Search Box - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
                <Input
                    placeholder="Search events, posts, or people..."
                    className="w-full"
                    icon={SearchLg}
                />
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 max-md:gap-1">
            {/* Search - Mobile only */}
            <ButtonUtility 
                size="sm" 
                color="secondary"
                icon={SearchLg}
                className="md:hidden w-10 h-10"
                tooltip="Search"
            />
            
            {/* Messages */}
            <div className="relative">
                <ButtonUtility 
                    size="sm" 
                    color="secondary"
                    icon={MessageCircle01}
                    className="w-10 h-10"
                    tooltip="Messages"
                />
                <span className="absolute -top-1 -right-1 w-5 h-5 max-sm:w-4 max-sm:h-4 bg-red-500 text-white text-xs max-sm:text-[10px] rounded-full flex items-center justify-center">
                    2
                </span>
            </div>
            
            {/* Notifications */}
            <div className="relative">
                <ButtonUtility 
                    size="sm" 
                    color="secondary"
                    icon={Bell01}
                    className="w-10 h-10"
                    tooltip="Notifications"
                />
                <span className="absolute -top-1 -right-1 w-6 h-5 max-sm:w-5 max-sm:h-4 bg-red-500 text-white text-xs max-sm:text-[10px] rounded-full flex items-center justify-center">
                    99+
                </span>
            </div>
            
            {/* Theme Toggle */}
            <ButtonUtility 
                size="sm" 
                color="secondary"
                icon={theme === "dark" ? Sun : Moon01}
                className="w-10 h-10"
                tooltip={theme === "dark" ? "Light mode" : "Dark mode"}
                onClick={onThemeToggle}
            />
            
            {/* Add/Create Button */}
            <ButtonUtility 
                size="sm" 
                color="secondary"
                icon={Plus}
                className="w-10 h-10"
                tooltip="Create"
            />
            
            {/* Profile Avatar with Dropdown */}
            <Dropdown.Root>
                <Button color="tertiary" className="!p-0 !w-auto !h-auto !min-w-0 !border-0 !shadow-none hover:!bg-transparent">
                    <Avatar status="online" size="sm" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" className="cursor-pointer" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Item key="profile" icon={User01}>
                            Your profile
                        </Dropdown.Item>
                        <Dropdown.Item key="settings" icon={Settings01}>
                            Account settings
                        </Dropdown.Item>
                        <Dropdown.Item key="invite" icon={UsersPlus}>
                            Invite members
                        </Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item key="admin" icon={UserSquare}>
                            Administration
                        </Dropdown.Item>
                        <Dropdown.Item key="moderation" icon={Shield01}>
                            Moderation
                        </Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item key="logout" icon={LogOut01} className="text-error-solid">
                            Log out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>
        </div>
    </div>
);

export const SiteAdminLayout = ({ 
    children, 
    leftSidebarContent,
    rightSidebarContent,
    currentPath = "/site/moderation",
    showBackButton = true,
}: SiteAdminLayoutProps) => {
    const { theme, setTheme } = useTheme();
    const { isAdmin, adminHeaderVisible, adminHeaderCollapsed, toggleAdminHeader } = useAdmin();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .site-admin-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .site-admin-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .site-admin-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 3px;
                }
                .site-admin-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #9ca3af;
                }
                .dark .site-admin-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #4b5563;
                }
                .dark .site-admin-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #6b7280;
                }
                `
            }} />
            <div className="flex h-screen flex-col bg-primary dark:bg-gray-950 overflow-hidden">
                {/* Admin Sticky Header - Only visible to admins */}
                {isAdmin && (
                    <ErrorBoundary fallback={
                        <div className="h-12 bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-700 dark:text-red-300 text-sm">
                            Admin header error - check console
                        </div>
                    }>
                        <AdminStickyHeader 
                            isVisible={adminHeaderVisible} 
                            onToggleVisibility={toggleAdminHeader}
                            isAdminPage={false}
                        />
                    </ErrorBoundary>
                )}

                {/* Header */}
                <div className={`sticky z-40 bg-primary dark:bg-gray-900 border-b border-secondary dark:border-gray-800 shadow-sm flex-shrink-0 ${
                    isAdmin && adminHeaderVisible && !adminHeaderCollapsed
                        ? 'top-12'
                        : 'top-0'
                }`}>
                    <HeaderSimple 
                        onMobileMenuToggle={handleMobileMenuToggle}
                        theme={theme}
                        onThemeToggle={handleThemeToggle}
                    />
                </div>

                {/* Mobile Sidebar Overlay */}
                {isMobileMenuOpen && leftSidebarContent && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={handleMobileMenuToggle}>
                        <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-primary dark:text-gray-100">Menu</h2>
                                <ButtonUtility 
                                    size="sm" 
                                    color="secondary"
                                    icon={X}
                                    className="w-10 h-10"
                                    tooltip="Close"
                                    onClick={handleMobileMenuToggle}
                                />
                            </div>
                            <div className="p-4">
                                {leftSidebarContent}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 flex gap-6 overflow-hidden">
                        {/* Left Sidebar - Fixed */}
                        {leftSidebarContent && (
                            <aside className="hidden lg:block w-64 bg-primary dark:bg-gray-950 flex-shrink-0 pt-6">
                                <div className="pr-4">
                                    {leftSidebarContent}
                                </div>
                            </aside>
                        )}

                        {/* Main Content Area - Scrollable */}
                        <main className="flex-1 overflow-y-auto pt-6 pb-8 site-admin-scrollbar">
                            {children}
                        </main>

                        {/* Right Sidebar - Fixed */}
                        {rightSidebarContent && (
                            <aside className="hidden xl:block w-80 bg-primary dark:bg-gray-950 flex-shrink-0 pt-6">
                                <div className="pl-4">
                                    {rightSidebarContent}
                                </div>
                            </aside>
                        )}
                    </div>
                </div>

                {/* Admin Toggle for testing */}
                <ErrorBoundary fallback={<div>Toggle error</div>}>
                    <AdminToggle />
                </ErrorBoundary>
            </div>
        </>
    );
};

