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
    LogOut01,
    UsersPlus,
    UserSquare,
    CheckCircle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Badge } from "@/components/base/badges/badges";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { cx } from "@/utils/cx";
import { useTheme } from "@/providers/theme";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { AdminToggle } from "@/components/application/admin-toggle";
import { useAdmin } from "@/hooks/use-admin";
import { ErrorBoundary } from "@/components/error-boundary";

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
            <button 
                className="lg:hidden w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700"
                onClick={onMobileMenuToggle}
            >
                <Menu02 className="w-5 h-5 text-tertiary dark:text-gray-400" />
            </button>
            
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
            <button className="md:hidden w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700">
                <SearchLg className="w-5 h-5 text-tertiary dark:text-gray-400" />
            </button>
            
            {/* Messages */}
            <Dropdown.Root>
                <Button color="tertiary" className="!p-0 !w-auto !h-auto !min-w-0 !border-0 !shadow-none hover:!bg-transparent relative">
                    <button className="w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700">
                        <MessageCircle01 className="w-5 h-5 text-tertiary dark:text-gray-400" />
                    </button>
                    <span className="absolute -top-1 -right-1 w-5 h-5 max-sm:w-4 max-sm:h-4 bg-red-500 text-white text-xs max-sm:text-[10px] rounded-full flex items-center justify-center pointer-events-none">
                        2
                    </span>
                </Button>
                <Dropdown.Popover className="!w-96 !border-gray-200 dark:!border-gray-700">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Messages</h3>
                            <Button color="tertiary" size="sm" iconLeading={Plus} className="!p-1.5">
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {/* Message Item 1 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Olivia Rhye</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">2 hours ago</span>
                                    </div>
                                    <p className="text-sm text-secondary dark:text-gray-300 truncate">Thanks for the quick response! I'll check...</p>
                                </div>
                            </div>
                            
                            {/* Message Item 2 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" alt="Phoenix Baker" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Phoenix Baker</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">Yesterday</span>
                                    </div>
                                    <p className="text-sm text-secondary dark:text-gray-300 truncate">Hey! Can you help me with the event setup?</p>
                                </div>
                            </div>
                            
                            {/* Message Item 3 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80" alt="Lana Steiner" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Lana Steiner</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">3 days ago</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-secondary dark:text-gray-300 truncate flex-1">The new dashboard looks amazing! When...</p>
                                        <Badge color="success" size="sm">2</Badge>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Message Item 4 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80" alt="Drew Cano" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Drew Cano</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">1 week ago</span>
                                    </div>
                                    <p className="text-sm text-secondary dark:text-gray-300 truncate">You: Sure, I'll send you the documentation</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* See All Button */}
                        <div className="mt-4 pt-3 border-t border-secondary dark:border-gray-700">
                            <button className="w-full text-center text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors py-2">
                                See all messages
                            </button>
                        </div>
                    </div>
                </Dropdown.Popover>
            </Dropdown.Root>
            
            {/* Notifications */}
            <Dropdown.Root>
                <Button color="tertiary" className="!p-0 !w-auto !h-auto !min-w-0 !border-0 !shadow-none hover:!bg-transparent relative">
                    <button className="w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700">
                        <Bell01 className="w-5 h-5 text-tertiary dark:text-gray-400" />
                    </button>
                    <span className="absolute -top-1 -right-1 w-6 h-5 max-sm:w-5 max-sm:h-4 bg-red-500 text-white text-xs max-sm:text-[10px] rounded-full flex items-center justify-center pointer-events-none">
                        99+
                    </span>
                </Button>
                <Dropdown.Popover className="!w-[32rem] !border-gray-200 dark:!border-gray-700">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Notifications</h3>
                            <div className="flex items-center gap-2">
                                <Button color="tertiary" size="sm" iconLeading={CheckCircle} className="!p-1.5" title="Mark all as read">
                                </Button>
                                <Button 
                                    color="tertiary" 
                                    size="sm" 
                                    iconLeading={Settings01} 
                                    className="!p-1.5"
                                    title="Notification settings"
                                    onClick={() => window.location.href = '/site/settings?section=notifications'}
                                >
                                </Button>
                            </div>
                        </div>
                        
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {/* Notification Item 1 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors border-l-2 border-gray-200 dark:border-success-solid">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" alt="Phoenix Baker" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Phoenix Baker</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">mentioned you in</span>
                                        <span className="text-xs font-medium text-brand-secondary">React Conference 2024</span>
                                        <span className="ml-auto w-2 h-2 bg-success-solid rounded-full flex-shrink-0"></span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400 mb-2">5 minutes ago</p>
                                    <div className="bg-secondary dark:bg-gray-700 rounded-lg p-3 text-sm text-secondary dark:text-gray-300">
                                        @you Great presentation ideas! Would love to collaborate on this session with you.
                                    </div>
                                </div>
                            </div>
                            
                            {/* Notification Item 2 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors border-l-2 border-gray-200 dark:border-success-solid">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80" alt="Lana Steiner" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Lana Steiner</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">posted</span>
                                        <span className="text-xs font-medium text-brand-secondary">New Feature Announcement</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">in</span>
                                        <span className="text-xs text-brand-secondary">Updates</span>
                                        <span className="ml-auto w-2 h-2 bg-success-solid rounded-full flex-shrink-0"></span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400 mb-2">2 hours ago</p>
                                    <div className="bg-secondary dark:bg-gray-700 rounded-lg p-3 text-sm text-secondary dark:text-gray-300">
                                        We're excited to announce our new event management system with advanced RSVP features and recurring event support!
                                    </div>
                                </div>
                            </div>
                            
                            {/* Notification Item 3 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Olivia Rhye</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">reacted to your post in</span>
                                        <span className="text-xs text-brand-secondary">General Discussion</span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400">1 day ago</p>
                                </div>
                            </div>
                            
                            {/* Notification Item 4 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80" alt="Drew Cano" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Drew Cano</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">commented on</span>
                                        <span className="text-xs font-medium text-brand-secondary">Product Roadmap Q2</span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400">3 days ago</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* See All Button */}
                        <div className="mt-4 pt-3 border-t border-secondary dark:border-gray-700">
                            <button className="w-full text-center text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors py-2">
                                See all notifications
                            </button>
                        </div>
                    </div>
                </Dropdown.Popover>
            </Dropdown.Root>
            
            {/* Theme Toggle */}
            <button 
                className="w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700"
                onClick={onThemeToggle}
                title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
                {theme === "dark" ? <Sun className="w-5 h-5 text-tertiary dark:text-gray-400" /> : <Moon01 className="w-5 h-5 text-tertiary dark:text-gray-400" />}
            </button>
            
            {/* Add/Create Button */}
            <button 
                className="w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700"
                title="Create"
                onClick={() => window.location.href = '/admin4/content2/posts/create'}
            >
                <Plus className="w-5 h-5 text-tertiary dark:text-gray-400" />
            </button>
            
            {/* Profile Avatar with Dropdown */}
            <Dropdown.Root>
                <Button color="tertiary" className="!p-0 !w-auto !h-auto !min-w-0 !border-0 !shadow-none hover:!bg-transparent">
                    <Avatar status="online" size="sm" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" className="cursor-pointer" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Item key="profile" icon={User01} onAction={() => window.location.href = '/site/profile'}>
                            Your profile
                        </Dropdown.Item>
                        <Dropdown.Item key="settings" icon={Settings01} onAction={() => window.location.href = '/site/settings'}>
                            Account settings
                        </Dropdown.Item>
                        <Dropdown.Item key="invite" icon={UsersPlus}>
                            Invite members
                        </Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item key="admin" icon={UserSquare} onAction={() => window.location.href = '/admin4'}>
                            Administration
                        </Dropdown.Item>
                        <Dropdown.Item key="moderation" icon={Shield01} onAction={() => window.location.href = '/site/moderation'}>
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

