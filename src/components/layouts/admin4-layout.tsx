import { ReactNode } from "react";
import {
    Archive,
    BarChartSquare02,
    CheckDone01,
    ClockFastForward,
    CurrencyDollarCircle,
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
    ShieldTick,
    Settings02,
    Brush03,
    CreditCard02,
    GraduationHat02,
    Globe01,
    Key01,
    Mail01,
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
    Zap,
    Target03,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import type { NavItemType } from "@/components/application/app-navigation-admin4/config";
import { SidebarNavigationDual } from "@/components/application/app-navigation-admin4/sidebar-navigation/sidebar-dual";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { useAdmin } from "@/hooks/use-admin";
import { ErrorBoundary } from "@/components/error-boundary";
import { FloatingProgressButton } from "@/components/application/floating-progress-button";

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
    
    // Moderation section
    items.push({
        label: "Moderation",
        href: "/admin4/moderation",
        icon: ShieldTick,
        items: [
            { label: "Reports", href: "/admin4/moderation/reports", icon: PieChart03, badge: 5 },
            { label: "Spam", href: "/admin4/moderation/spam", icon: Archive },
            { label: "Pending", href: "/admin4/moderation/pending", icon: ClockFastForward },
            { label: "Logs", href: "/admin4/moderation/logs", icon: Rows01 },
        ],
    });
    
    // Appearance section
    items.push({
        label: "Appearance",
        href: "/admin4/appearance",
        icon: Brush03,
        items: [
            { label: "Themes", href: "/admin4/appearance/themes", icon: Palette },
            { label: "Customizer", href: "/admin4/appearance/customizer", icon: Settings03 },
            { label: "Menus", href: "/admin4/appearance/menus", icon: Grid03 },
            { label: "Widgets", href: "/admin4/appearance/widgets", icon: Stars01 },
            { label: "Background", href: "/admin4/appearance/background", icon: Package },
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
            { label: "Gamification", href: "/admin4/setting/gamification", icon: Trophy01 },
        ],
    });
    
    // Billing section
    items.push({
        label: "Billing",
        href: "/admin4/billing",
        icon: CreditCard02,
        items: [
            { label: "Overview", href: "/admin4/billing/overview", icon: BarChartSquare02 },
            { label: "Invoices", href: "/admin4/billing/invoices", icon: Package },
            { label: "Payments", href: "/admin4/billing/payments", icon: CurrencyDollarCircle },
            { label: "Subscriptions", href: "/admin4/billing/subscriptions", icon: Stars01 },
            { label: "History", href: "/admin4/billing/history", icon: Archive },
        ],
    });
    
    // Report section
    items.push({
        label: "Report",
        href: "/admin4/report",
        icon: BarChartSquare02,
        items: [
            { label: "Analytics", href: "/admin4/report/analytics", icon: LineChartUp03 },
            { label: "Traffic", href: "/admin4/report/traffic", icon: BarChartSquare02 },
            { label: "Users", href: "/admin4/report/users", icon: Users01 },
            { label: "Content", href: "/admin4/report/content", icon: Package },
            { label: "Performance", href: "/admin4/report/performance", icon: Star01 },
        ],
    });
    
    // AppStore section
    items.push({
        label: "AppStore",
        href: "/admin4/appstore",
        icon: Data,
        items: [
            { label: "Browse", href: "/admin4/appstore/browse", icon: Grid03 },
            { label: "Installed", href: "/admin4/appstore/installed", icon: CheckDone01 },
            { label: "Updates", href: "/admin4/appstore/updates", icon: ClockFastForward },
            { label: "Favorites", href: "/admin4/appstore/favorites", icon: Star01 },
            { label: "Settings", href: "/admin4/appstore/settings", icon: Settings01 },
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
}

export const Admin4Layout = ({ 
    children, 
    title = "Admin4 Dashboard", 
    description = "Advanced administration with enhanced features and automation.",
    headerActions,
    currentPath = "/admin4",
    hideHeader = false,
    showAdvancedFeatures = true
}: Admin4LayoutProps) => {
    const { isAdmin, adminHeaderVisible, toggleAdminHeader } = useAdmin();
    
    const navItems = generateAdmin4NavItems();
    
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
                />
            </ErrorBoundary>

            {/* Main layout with enhanced sidebar and content */}
            <div className="flex flex-1 overflow-hidden">
                <SidebarNavigationAdmin4 />
                
                <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden scrollbar-thin">
                    {/* Enhanced Header with admin4 branding */}
                    {!hideHeader && (
                        <header className="flex items-center justify-between border-b border-secondary bg-primary px-6 py-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-xl font-semibold text-primary">{title}</h1>
                                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                                        Admin4 Pro
                                    </span>
                                </div>
                                <p className="text-sm text-tertiary">{description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {showAdvancedFeatures && (
                                    <Button 
                                        color="secondary" 
                                        size="sm"
                                        iconLeading={Target03}
                                    >
                                        Quick Actions
                                    </Button>
                                )}
                                {headerActions || (
                                    <Button 
                                        color="secondary" 
                                        size="sm"
                                        iconLeading={Bell01}
                                    >
                                        Notifications
                                    </Button>
                                )}
                            </div>
                        </header>
                    )}

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
                        {children}
                    </main>
                </div>
            </div>
            
            {/* Enhanced Floating Progress Button for admin4 */}
            {showAdvancedFeatures && <FloatingProgressButton />}
        </div>
    );
};
