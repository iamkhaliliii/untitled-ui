import { ReactNode, useState } from "react";
import { Link } from "react-router";
import {
    Globe01,
    TrendUp01,
    Calendar,
    Heart,
    Users01,
    MessageCircle01,
    Settings01,
    Bell01,
    User01,
    BookOpen01,
    LifeBuoy01,
    SearchLg,
    Menu02,
    X,
    ArrowLeft,
    Home01,
    Rss01,
    Star01,
    Bookmark,
    Plus,
    BookClosed,
    FileCode01,
    PlayCircle,
    Stars02,
    Sun,
    Moon01,
    UserSquare,
    UsersPlus,
    Shield01,
    LogOut01,
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
import { NavMenuItemLink } from "@/components/marketing/header-navigation/base-components/nav-menu-item";
import { Header } from "@/components/marketing/header-navigation/components/header";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { AdminToggle } from "@/components/application/admin-toggle";
import { useAdmin } from "@/hooks/use-admin";
import { ErrorBoundary } from "@/components/error-boundary";

interface SiteLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    currentPath?: string;
    headerActions?: ReactNode;
    showBackButton?: boolean;
    showRightSidebar?: boolean;
    rightSidebarContent?: ReactNode;
}

const siteNavigation = [
    {
        label: "Feed",
        href: "/site/feed",
        icon: Rss01,
    },
    {
        label: "Events",
        href: "/site/event",
        icon: Calendar,
    },
];

const DropdownMenuSimple = () => {
    const items = [
        {
            title: "Blog",
            subtitle: "The latest industry new and guides curated by our expert team.",
            href: "/blog",
            Icon: BookClosed,
        },
        {
            title: "Customer stories",
            subtitle: "Learn how our customers are using Untitled UI to 10x their growth.",
            href: "/customer-stories",
            Icon: Stars02,
        },
        {
            title: "Video tutorials",
            subtitle: "Get up and running on our newest features and in-depth guides.",
            href: "/tutorials",
            Icon: PlayCircle,
        },
        {
            title: "Documentation",
            subtitle: "In-depth articles on our tools and technologies to empower teams.",
            href: "/docs",
            Icon: FileCode01,
        },
        {
            title: "Help and support",
            subtitle: "Need help with something? Our expert team is here to help 24/7.",
            href: "/help",
            Icon: LifeBuoy01,
        },
    ];

    return (
        <div className="px-3 pb-2 md:max-w-84 md:p-0">
            <nav className="overflow-hidden rounded-2xl bg-primary py-2 shadow-xs ring-1 ring-secondary_alt md:p-2 md:shadow-lg">
                <ul className="flex flex-col gap-0.5">
                    {items.map(({ title, subtitle, href, Icon }) => (
                        <li key={title}>
                            <NavMenuItemLink icon={Icon} title={title} subtitle={subtitle} href={href} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

const HeaderDropdownSimple = ({ onMobileMenuToggle, theme, onThemeToggle }: { onMobileMenuToggle?: () => void; theme?: string; onThemeToggle?: () => void }) => (
    <div className="flex max-w-container mx-auto items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-4 max-sm:py-3 max-sm:px-3">
        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <ButtonUtility 
                size="sm" 
                color="secondary"
                icon={Menu02}
                className="md:hidden w-10 h-10"
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
                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white/40 focus:ring-2 focus:ring-white/20"
                    icon={SearchLg}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <kbd className="px-2 py-1 text-xs font-semibold text-white/70 bg-white/10 border border-white/20 rounded-md">
                        ⌘K
                    </kbd>
                </div>
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
            <Dropdown.Root>
                <div className="relative">
                    <Button color="tertiary" className="!p-0 !w-10 !h-10 !min-w-0 !border-0 !shadow-none">
                        <MessageCircle01 className="w-5 h-5" />
                    </Button>
                    <span className="absolute -top-1 -right-1 w-5 h-5 max-sm:w-4 max-sm:h-4 bg-red-500 text-white text-xs max-sm:text-[10px] rounded-full flex items-center justify-center pointer-events-none">
                        2
                    </span>
                </div>
                <Dropdown.Popover className="!w-96">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Messages</h3>
                            <Button color="tertiary" size="sm" iconLeading={Plus} className="!p-1.5">
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {/* Message Item 1 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" initials="T" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Test</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">3 months ago</span>
                                    </div>
                                    <p className="text-sm text-secondary dark:text-gray-300 truncate">Elaya M... Bettermode is uniquely posi...</p>
                                </div>
                            </div>
                            
                            {/* Message Item 2 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80" alt="Deleted Member" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Deleted Member</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">8 months ago</span>
                                    </div>
                                    <p className="text-sm text-secondary dark:text-gray-300 truncate">Karen s... Hello</p>
                                </div>
                            </div>
                            
                            {/* Message Item 3 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" initials="A" className="flex-shrink-0 bg-pink-100 text-pink-700" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Amanda</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">8 months ago</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-secondary dark:text-gray-300 truncate flex-1">I messaged one of the other admins ye...</p>
                                        <Badge color="success" size="sm">2</Badge>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Message Item 4 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80" alt="Allen" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Allen</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">10 months ago</span>
                                    </div>
                                    <p className="text-sm text-secondary dark:text-gray-300 truncate">You: chi poshidi?</p>
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
                <div className="relative">
                    <Button color="tertiary" className="!p-0 !w-10 !h-10 !min-w-0 !border-0 !shadow-none">
                        <Bell01 className="w-5 h-5" />
                    </Button>
                    <span className="absolute -top-1 -right-1 w-6 h-5 max-sm:w-5 max-sm:h-4 bg-red-500 text-white text-xs max-sm:text-[10px] rounded-full flex items-center justify-center pointer-events-none">
                        99+
                    </span>
                </div>
                <Dropdown.Popover className="!w-[32rem]">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Notifications</h3>
                            <div className="flex items-center gap-2">
                                <Button color="tertiary" size="sm" iconLeading={CheckCircle} className="!p-1.5">
                                </Button>
                                <Button color="tertiary" size="sm" iconLeading={Settings01} className="!p-1.5">
                                </Button>
                            </div>
                        </div>
                        
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {/* Notification Item 1 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors border-l-2 border-success-solid">
                                <Avatar size="sm" initials="B" className="flex-shrink-0 bg-purple-600 text-white" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Ben Smith</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">posted</span>
                                        <span className="text-xs font-medium text-brand-secondary">Bulk user import using CSV</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">in</span>
                                        <span className="text-xs text-brand-secondary">Wishlist</span>
                                        <span className="ml-auto w-2 h-2 bg-success-solid rounded-full flex-shrink-0"></span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400 mb-2">2 days ago</p>
                                    <div className="bg-secondary dark:bg-gray-700 rounded-lg p-3 text-sm text-secondary dark:text-gray-300">
                                        I often need to add multiple users at once, and manually typing in correct names to match email addresses is tedious. Can we get the capability to import users using a CSV upload?
                                    </div>
                                </div>
                            </div>
                            
                            {/* Notification Item 2 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors border-l-2 border-success-solid">
                                <Avatar size="sm" src="https://via.placeholder.com/32x32/000000/FFFFFF?text=BLVK" alt="BLVK" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">BLVK</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">posted</span>
                                        <span className="text-xs font-medium text-brand-secondary">A pro plan should include no bettermode branding</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">in</span>
                                        <span className="text-xs text-brand-secondary">Wishlist</span>
                                        <span className="ml-auto w-2 h-2 bg-success-solid rounded-full flex-shrink-0"></span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400">8 months ago</p>
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

export const SiteLayout = ({ 
    children, 
    title,
    description,
    currentPath = "/site",
    headerActions,
    showBackButton,
    showRightSidebar = false,
    rightSidebarContent
}: SiteLayoutProps) => {
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
                .site-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .site-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .site-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 3px;
                }
                .site-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #9ca3af;
                }
                .dark .site-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #4b5563;
                }
                .dark .site-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #6b7280;
                }
                `
            }} />
            <div className="flex h-screen flex-col bg-primary overflow-hidden">
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
            <div className={`sticky z-40 bg-primary/80 backdrop-blur-lg shadow-sm flex-shrink-0 ${
                isAdmin && adminHeaderVisible && !adminHeaderCollapsed
                    ? 'top-12' // Full admin header height (48px)
                    : 'top-0'  // No admin header or collapsed (back to normal)
            }`}>
                <HeaderDropdownSimple 
                    onMobileMenuToggle={handleMobileMenuToggle}
                    theme={theme}
                    onThemeToggle={handleThemeToggle}
                />

            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={handleMobileMenuToggle}>
                    <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <UntitledLogo className="h-8" />
                            <ButtonUtility 
                                size="sm" 
                                color="secondary"
                                icon={X}
                                className="w-10 h-10"
                                tooltip="Close"
                                onClick={handleMobileMenuToggle}
                            />
                        </div>
                        <nav className="p-4 space-y-2">
                            {siteNavigation.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={handleMobileMenuToggle}
                                    className={cx(
                                        "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                                        currentPath === item.href
                                            ? "bg-brand-50 dark:bg-brand-900/30 text-brand-secondary dark:text-brand-400"
                                            : "text-secondary dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 hover:text-primary dark:hover:text-gray-100"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 flex overflow-hidden">
                    {/* Left Sidebar - Fixed */}
                    <aside className="hidden lg:block w-64 bg-primary dark:bg-gray-950 flex-shrink-0 pt-4">
                        <div className="pr-8">
                            {/* Navigation */}
                            <nav className="space-y-2">
                                {siteNavigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className={cx(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                            currentPath === item.href
                                                ? "bg-brand-50 dark:bg-brand-900/30 text-brand-secondary dark:text-brand-400"
                                                : "text-secondary dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 hover:text-primary dark:hover:text-gray-100"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area - Scrollable */}
                    <main className="flex-1 overflow-y-auto pt-4 pb-8 site-scrollbar">
                        {showRightSidebar ? (
                            <div className="flex gap-6">
                                <div className="flex-1">
                                    {children}
                                </div>
                                {rightSidebarContent && (
                                    <aside className="w-80 space-y-6">
                                        {rightSidebarContent}
                                    </aside>
                                )}
                            </div>
                        ) : (
                            children
                        )}
                    </main>
                </div>
            </div>

                {/* Admin Toggle for testing - can be removed in production */}
                <ErrorBoundary fallback={<div>Toggle error</div>}>
                    <AdminToggle />
                </ErrorBoundary>
            </div>
        </>
    );
}; 