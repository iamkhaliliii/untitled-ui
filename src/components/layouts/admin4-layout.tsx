import { ReactNode, useState } from "react";
import {
    Archive,
    BarChartSquare02,
    CheckDone01,
    ClockFastForward,
    CurrencyDollarCircle,
    CreditCard01,
    Grid03,
    HomeLine,
    Inbox01,
    LifeBuoy01,
    LineChartUp03,
    NotificationBox,
    Package,
    PieChart03,
    Rows01,
    Settings01,
    Settings03,
    Star01,
    Stars01,
    User01,
    UserSquare,
    Users01,
    UsersPlus,
    Bell01,
    Palette,
    Database01,
    Data,
    CodeBrowser,
    Settings02,
    CreditCard02,
    GraduationHat02,
    Globe01,
    Key01,
    Mail01,
    Grid01,
    Zap,
    SearchLg,
    MessageSquare01,
    Shield01,
    Flag02,
    SearchMd,
    Lock01,
    Trophy01,
    Calendar,
    MessageChatCircle,
    Tag01,
    Target03,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import type { NavItemType } from "@/components/application/app-navigation-admin4/config";
import { SidebarNavigationDual } from "@/components/application/app-navigation-admin4/sidebar-navigation/sidebar-dual";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { useAdmin } from "@/hooks/use-admin";
import { ErrorBoundary } from "@/components/error-boundary";
import { FloatingProgressButton } from "@/components/application/floating-progress-button";
import { MobileNavigationSystem } from "@/components/application/app-navigation-admin4/mobile-navigation-system";

// Helper function to generate navigation items for admin4
const generateAdmin4NavItems = (): NavItemType[] => {
    const items: NavItemType[] = [];
    
    // Dashboard removed for admin4 as requested
    
    // Content 2 for admin4 (same as admin2)
    items.push({
        label: "Content",
        href: "/admin4/content2",
        icon: Database01,
        items: [
            { label: "Posts", href: "/admin4/content2/posts", icon: Package },
            { label: "Events", href: "/admin4/content2/events", icon: Calendar },
            { label: "Spaces", href: "/admin4/content2/spaces", icon: Archive },
            { label: "Tag", href: "/admin4/content2/tag", icon: Tag01 },
        ],
    });
    
    // Site section
    items.push({
        label: "Site",
        href: "/admin4/site",
        icon: CodeBrowser,
        items: [
            { label: "Dashboard", href: "/admin4/site/dashboard", icon: BarChartSquare02 },
            { label: "File Explorer", href: "/admin4/site/files", icon: Archive },
            { label: "Themes", href: "/admin4/site/themes", icon: Palette },
            { label: "Plugins", href: "/admin4/site/plugins", icon: Package },
            { label: "Menu", href: "/admin4/site/menu", icon: Grid03 },
            { label: "Widgets", href: "/admin4/site/widgets", icon: Stars01 },
        ],
    });
    
    // People section
    items.push({
        label: "People",
        href: "/admin4/people",
        icon: Users01,
        items: [
            { label: "Members", href: "/admin4/people", icon: Users01 },
            { label: "Staff", href: "/admin4/people/staff", icon: UserSquare },
            { label: "Invitations", href: "/admin4/people/invitations", icon: UsersPlus },
            { label: "Profile fields", href: "/admin4/people/profile-fields", icon: User01 },
            { label: "Badges", href: "/admin4/people/badges", icon: Archive },
        ],
    });
    
    // Billing section
    items.push({
        label: "Billing",
        href: "/admin4/billing",
        icon: CreditCard01,
        items: [
            { label: "Summary", href: "/admin4/billing", icon: CreditCard01 },
            { label: "Subscription plans", href: "/admin4/billing/plans", icon: Package },
            { label: "Service usage", href: "/admin4/billing/usage", icon: BarChartSquare02 },
        ],
    });
    
    // Reports section
    items.push({
        label: "Reports",
        href: "/admin4/report",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/admin4/report", icon: BarChartSquare02 },
            { label: "Reach & engagement", href: "/admin4/report/reach", icon: LineChartUp03 },
            { label: "People", href: "/admin4/report/people", icon: Users01 },
            { label: "Posts", href: "/admin4/report/posts", icon: Package },
            { label: "Spaces", href: "/admin4/report/spaces", icon: Archive },
            { label: "Audit logs", href: "/admin4/report/audit-logs", icon: CheckDone01 },
            { label: "Email logs", href: "/admin4/report/email-logs", icon: Inbox01 },
        ],
    });
    
    // App Store section
    items.push({
        label: "App Store",
        href: "/admin4/appstore",
        icon: Grid01,
        items: [
            { label: "Apps & Integrations", href: "/admin4/appstore", icon: Grid01 },
            { label: "Add-ons", href: "/admin4/appstore/addons", icon: Zap },
        ],
    });
    
    // Setting section
    items.push({
        label: "Setting",
        href: "/admin4/setting",
        icon: Settings02,
        items: [
            { label: "Site settings", href: "/admin4/setting/site-settings", icon: Settings01 },
            { label: "Authentication", href: "/admin4/setting/authentication", icon: Key01 },
            { label: "Domain", href: "/admin4/setting/domain", icon: Globe01 },
            { label: "Search", href: "/admin4/setting/search", icon: SearchLg },
            { label: "Messaging", href: "/admin4/setting/messaging", icon: Mail01 },
            { label: "Moderation", href: "/admin4/setting/moderation", icon: Shield01 },
            { label: "Localization", href: "/admin4/setting/localization", icon: Flag02 },
            { label: "Notifications", href: "/admin4/setting/notifications", icon: Bell01 },
            { label: "SEO settings", href: "/admin4/setting/seo-settings", icon: SearchMd },
            { label: "Security & Privacy", href: "/admin4/setting/security-privacy", icon: Lock01 },
        ],
    });
    
    return items;
};

interface Admin4LayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    headerActions?: ReactNode;
    currentPath?: string;
    hideHeader?: boolean;
    showAdvancedFeatures?: boolean;
    mobileTabSelector?: ReactNode;
}

export const Admin4Layout = ({ 
    children, 
    title = "Admin4 Dashboard", 
    description = "Advanced administration with enhanced features and automation.",
    headerActions,
    currentPath = "/admin4",
    hideHeader = false,
    showAdvancedFeatures = true,
    mobileTabSelector
}: Admin4LayoutProps) => {
    const { isAdmin, adminHeaderVisible, toggleAdminHeader } = useAdmin();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = generateAdmin4NavItems();

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
    };
    
    const SidebarNavigationAdmin4 = () => (
        <SidebarNavigationDual
            activeUrl={currentPath}
            items={navItems}
            footerItems={[
                {
                    label: "Support Center",
                    href: "/admin4/support",
                    icon: LifeBuoy01,
                },
                {
                    label: "Onboarding Pro",
                    href: "/admin4/onboarding",
                    icon: GraduationHat02,
                },
            ]}
        />
    );

    return (
        <div className="flex flex-col h-dvh">
            {/* Enhanced Admin4 Sticky Header - Always visible and prominent */}
            <ErrorBoundary fallback={
                <div className="h-12 bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-700 dark:text-red-300 text-sm">
                    Admin4 header error - check console
                </div>
            }>
                <AdminStickyHeader 
                    isVisible={true} 
                    onToggleVisibility={toggleAdminHeader}
                    isAdminPage={true}
                    onMobileMenuToggle={handleMobileMenuToggle}
                />
            </ErrorBoundary>

            {/* Main layout with enhanced sidebar and content - Responsive */}
            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Sidebar - Hidden on mobile/tablet */}
                <div className="hidden lg:block">
                    <SidebarNavigationAdmin4 />
                </div>
                
                {/* Main Content Area - Responsive */}
                <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden scrollbar-thin w-full lg:w-auto">
                    {/* Mobile Tab Selector - Always show on mobile when available */}
                    {mobileTabSelector && (
                        <div className="lg:hidden border-b border-secondary bg-primary">
                            {mobileTabSelector}
                        </div>
                    )}

                    {/* Enhanced Header with admin4 branding - Responsive */}
                    {!hideHeader && (
                        <header className="border-b border-secondary bg-primary">
                            {/* Hide title/description on mobile when mobileTabSelector exists */}
                            {!mobileTabSelector && (
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-2">
                                    <div className="min-w-0 flex-1">
                                        <h1 className="text-lg sm:text-xl font-semibold text-primary truncate">{title}</h1>
                                        <p className="text-xs sm:text-sm text-tertiary mt-0.5 line-clamp-2 sm:line-clamp-1">{description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {headerActions || (
                                            <>
                                                {showAdvancedFeatures && (
                                                    <Button 
                                                        color="secondary" 
                                                        size="sm"
                                                        iconLeading={Target03}
                                                        className="hidden sm:flex"
                                                    >
                                                        <span className="hidden md:inline">Quick Actions</span>
                                                        <span className="md:hidden">Actions</span>
                                                    </Button>
                                                )}
                                                <Button 
                                                    color="secondary" 
                                                    size="sm"
                                                    iconLeading={Bell01}
                                                >
                                                    <span className="hidden sm:inline">Notifications</span>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {/* Show title/description only on desktop when mobileTabSelector exists */}
                            {mobileTabSelector && (
                                <div className="hidden lg:flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-2">
                                    <div className="min-w-0 flex-1">
                                        <h1 className="text-lg sm:text-xl font-semibold text-primary truncate">{title}</h1>
                                        <p className="text-xs sm:text-sm text-tertiary mt-0.5 line-clamp-2 sm:line-clamp-1">{description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {headerActions || (
                                            <>
                                                {showAdvancedFeatures && (
                                                    <Button 
                                                        color="secondary" 
                                                        size="sm"
                                                        iconLeading={Target03}
                                                        className="hidden sm:flex"
                                                    >
                                                        <span className="hidden md:inline">Quick Actions</span>
                                                        <span className="md:hidden">Actions</span>
                                                    </Button>
                                                )}
                                                <Button 
                                                    color="secondary" 
                                                    size="sm"
                                                    iconLeading={Bell01}
                                                >
                                                    <span className="hidden sm:inline">Notifications</span>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </header>
                    )}

                    {/* Main Content - Responsive padding */}
                    <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
                        <div className="min-h-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
            
            {/* Enhanced Floating Progress Button for admin4 - Hidden on small screens */}
            {showAdvancedFeatures && (
                <div className="hidden sm:block">
                    <FloatingProgressButton />
                </div>
            )}

            {/* Mobile Navigation System */}
            <MobileNavigationSystem
                isOpen={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
                items={navItems}
                footerItems={[
                    {
                        label: "Support Center",
                        href: "/admin4/support",
                        icon: LifeBuoy01,
                    },
                    {
                        label: "Onboarding Pro",
                        href: "/admin4/onboarding",
                        icon: GraduationHat02,
                    },
                ]}
                activeUrl={currentPath}
            />
        </div>
    );
};
