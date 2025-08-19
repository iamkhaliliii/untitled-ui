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
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
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
        label: "Home",
        href: "/site",
        icon: Home01,
    },
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
    {
        label: "Explore",
        href: "/site/explore",
        icon: SearchLg,
    },
    {
        label: "Bookmarks",
        href: "/site/bookmarks",
        icon: Bookmark,
    },
    {
        label: "Profile",
        href: "/site/profile",
        icon: User01,
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

const HeaderDropdownSimple = ({ onMobileMenuToggle }: { onMobileMenuToggle?: () => void }) => (
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
            
            {/* Add/Create Button */}
            <ButtonUtility 
                size="sm" 
                color="secondary"
                icon={Plus}
                className="w-10 h-10"
                tooltip="Create"
            />
            
            {/* Profile Avatar */}
            <Avatar status="online" size="sm" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />

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
    const { theme } = useTheme();
    const { isAdmin, adminHeaderVisible, adminHeaderCollapsed, toggleAdminHeader } = useAdmin();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="flex min-h-screen flex-col bg-primary">
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
            <div className={`sticky z-40 bg-primary/80 backdrop-blur-lg shadow-sm ${
                isAdmin && adminHeaderVisible && !adminHeaderCollapsed
                    ? 'top-12' // Full admin header height (48px)
                    : 'top-0'  // No admin header or collapsed (back to normal)
            }`}>
                <HeaderDropdownSimple onMobileMenuToggle={handleMobileMenuToggle} />

            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={handleMobileMenuToggle}>
                    <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-zinc-900 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
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
                                            ? "bg-brand-50 text-brand-secondary"
                                            : "text-secondary hover:bg-secondary hover:text-primary"
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
            <div className="mx-auto pt-4 max-w-container px-4 sm:px-6 lg:px-8">
                <div className="flex flex-1">
                    {/* Left Sidebar */}
                    <aside className="hidden lg:block w-64 bg-primary">
                                                       <div className={`sticky overflow-y-auto scrollbar-thin py-4 pr-8 ${
                                   isAdmin && adminHeaderVisible && !adminHeaderCollapsed
                                       ? 'top-20 h-[calc(100vh-5rem)]'           // 3rem (admin) + 2rem (header) = 5rem  
                                       : 'top-16 h-[calc(100vh-4rem)]'           // No admin header or collapsed (back to normal)
                               }`}>
                            {/* Navigation */}
                            <nav className="space-y-2">
                                {siteNavigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className={cx(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                            currentPath === item.href
                                                ? "bg-brand-50 text-brand-secondary"
                                                : "text-secondary hover:bg-secondary hover:text-primary"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-hidden">
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

            {/* Footer */}
            <footer className="border-t border-secondary bg-primary">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="py-12">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            <div>
                                <h3 className="text-sm font-medium text-primary">Platform</h3>
                                <ul className="mt-4 space-y-2">
                                    <li><Link to="/site" className="text-sm text-tertiary hover:text-primary">Home</Link></li>
                                    <li><Link to="/site/feed" className="text-sm text-tertiary hover:text-primary">Feed</Link></li>
                                    <li><Link to="/site/event" className="text-sm text-tertiary hover:text-primary">Events</Link></li>
                                    <li><Link to="/site/explore" className="text-sm text-tertiary hover:text-primary">Explore</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-primary">Community</h3>
                                <ul className="mt-4 space-y-2">
                                    <li><Link to="/site/about" className="text-sm text-tertiary hover:text-primary">About</Link></li>
                                    <li><Link to="/site/blog" className="text-sm text-tertiary hover:text-primary">Blog</Link></li>
                                    <li><Link to="/site/help" className="text-sm text-tertiary hover:text-primary">Help Center</Link></li>
                                    <li><Link to="/site/guidelines" className="text-sm text-tertiary hover:text-primary">Guidelines</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-primary">Resources</h3>
                                <ul className="mt-4 space-y-2">
                                    <li><Link to="/site/api" className="text-sm text-tertiary hover:text-primary">API</Link></li>
                                    <li><Link to="/site/docs" className="text-sm text-tertiary hover:text-primary">Documentation</Link></li>
                                    <li><Link to="/site/status" className="text-sm text-tertiary hover:text-primary">Status</Link></li>
                                    <li><Link to="/site/changelog" className="text-sm text-tertiary hover:text-primary">Changelog</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-primary">Legal</h3>
                                <ul className="mt-4 space-y-2">
                                    <li><Link to="/site/privacy" className="text-sm text-tertiary hover:text-primary">Privacy</Link></li>
                                    <li><Link to="/site/terms" className="text-sm text-tertiary hover:text-primary">Terms</Link></li>
                                    <li><Link to="/site/cookies" className="text-sm text-tertiary hover:text-primary">Cookies</Link></li>
                                    <li><Link to="/site/licenses" className="text-sm text-tertiary hover:text-primary">Licenses</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-secondary pt-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <UntitledLogo className="h-6" />
                                    <span className="text-sm text-tertiary">© 2024 Untitled UI. All rights reserved.</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <ButtonUtility size="sm" color="tertiary" icon={BookOpen01} tooltip="Documentation" />
                                    <ButtonUtility size="sm" color="tertiary" icon={LifeBuoy01} tooltip="Support" />
                                    <ButtonUtility size="sm" color="tertiary" icon={Settings01} tooltip="Settings" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>



            {/* Admin Toggle for testing - can be removed in production */}
            <ErrorBoundary fallback={<div>Toggle error</div>}>
                <AdminToggle />
            </ErrorBoundary>
        </div>
    );
}; 