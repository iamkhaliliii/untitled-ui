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
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationDual } from "@/components/application/app-navigation/sidebar-navigation/sidebar-dual";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { useAdmin } from "@/hooks/use-admin";
import { ErrorBoundary } from "@/components/error-boundary";
import { FloatingProgressButton } from "@/components/application/floating-progress-button";



// Helper function to generate navigation items for different admin versions
const generateNavItems = (adminVersion: string): NavItemType[] => {
    const items: NavItemType[] = [];
    
    // Add Content section only for admin3, not admin2
    if (adminVersion === 'admin3') {
        items.push({
            label: "Content",
            href: `/${adminVersion}/content`,
            icon: Database01,
            items: [
                { label: "Posts", href: `/${adminVersion}/content/posts`, icon: Package },
                { label: "Pages", href: `/${adminVersion}/content/pages`, icon: Grid03 },
                { label: "Media", href: `/${adminVersion}/content/media`, icon: Archive },
                { label: "Categories", href: `/${adminVersion}/content/categories`, icon: Rows01 },
                { label: "Comments", href: `/${adminVersion}/content/comments`, icon: Inbox01 },
            ],
        });
    }
    
    // Content 2 for both admin versions
    items.push({
        label: "Content 2",
        href: `/${adminVersion}/content2`,
        icon: Database01,
        items: [
            { 
                label: "Contents", 
                href: `/${adminVersion}/content2/contents`, 
                icon: Package,
                items: [
                    { label: "Events", href: `/${adminVersion}/content2/contents/events`, icon: Calendar },
                    { label: "Discussion", href: `/${adminVersion}/content2/contents/discussion`, icon: MessageChatCircle },
                ]
            },
            { 
                label: "Spaces", 
                href: `/${adminVersion}/content2/spaces`, 
                icon: Archive,
                items: [
                    { label: "Events", href: `/${adminVersion}/content2/spaces/events`, icon: Calendar },
                    { label: "Discussion", href: `/${adminVersion}/content2/spaces/discussion`, icon: MessageChatCircle },
                ]
            },
            { label: "Tag", href: `/${adminVersion}/content2/tag`, icon: Tag01 },
            { label: "CMS", href: `/${adminVersion}/content2/cms`, icon: Settings01 },
        ],
    });
    
    // Site section
    items.push({
        label: "Site",
        href: `/${adminVersion}/site`,
        icon: CodeBrowser,
        items: [
            { label: "Dashboard", href: `/${adminVersion}/site/dashboard`, icon: BarChartSquare02 },
            { label: "File Explorer", href: `/${adminVersion}/site/files`, icon: Archive },
            { label: "Themes", href: `/${adminVersion}/site/themes`, icon: Palette },
            { label: "Plugins", href: `/${adminVersion}/site/plugins`, icon: Package },
            { label: "Menu", href: `/${adminVersion}/site/menu`, icon: Grid03 },
            { label: "Widgets", href: `/${adminVersion}/site/widgets`, icon: Stars01 },
        ],
    });
    
    // People section
    items.push({
        label: "People",
        href: `/${adminVersion}/people`,
        icon: Users01,
        items: [
            { label: "Members", href: `/${adminVersion}/people`, icon: Users01 },
            { label: "Staff", href: `/${adminVersion}/people/staff`, icon: UserSquare },
            { label: "Invitations", href: `/${adminVersion}/people/invitations`, icon: UsersPlus },
            { label: "Profile fields", href: `/${adminVersion}/people/profile-fields`, icon: User01 },
            { label: "Badges", href: `/${adminVersion}/people/badges`, icon: Archive },
        ],
    });
    
    // Moderation section
    items.push({
        label: "Moderation",
        href: `/${adminVersion}/moderation`,
        icon: ShieldTick,
        items: [
            { label: "Reports", href: `/${adminVersion}/moderation/reports`, icon: PieChart03, badge: 5 },
            { label: "Spam", href: `/${adminVersion}/moderation/spam`, icon: Archive },
            { label: "Pending", href: `/${adminVersion}/moderation/pending`, icon: ClockFastForward },
            { label: "Logs", href: `/${adminVersion}/moderation/logs`, icon: Rows01 },
        ],
    });
    
    // Appearance section
    items.push({
        label: "Appearance",
        href: `/${adminVersion}/appearance`,
        icon: Brush03,
        items: [
            { label: "Themes", href: `/${adminVersion}/appearance/themes`, icon: Palette },
            { label: "Customizer", href: `/${adminVersion}/appearance/customizer`, icon: Settings03 },
            { label: "Menus", href: `/${adminVersion}/appearance/menus`, icon: Grid03 },
            { label: "Widgets", href: `/${adminVersion}/appearance/widgets`, icon: Stars01 },
            { label: "Background", href: `/${adminVersion}/appearance/background`, icon: Package },
        ],
    });
    
    // Setting section
    items.push({
        label: "Setting",
        href: `/${adminVersion}/setting`,
        icon: Settings02,
        items: [
            { label: "Site settings", href: `/${adminVersion}/setting/site-settings`, icon: Settings01 },
            { label: "Authentication", href: `/${adminVersion}/setting/authentication`, icon: Key01 },
            { label: "Domain", href: `/${adminVersion}/setting/domain`, icon: Globe01 },
            { label: "Search", href: `/${adminVersion}/setting/search`, icon: SearchLg },
            { label: "Messaging", href: `/${adminVersion}/setting/messaging`, icon: Mail01 },
            { label: "Moderation", href: `/${adminVersion}/setting/moderation`, icon: Shield01 },
            { label: "Localization", href: `/${adminVersion}/setting/localization`, icon: Flag02 },
            { label: "Notifications", href: `/${adminVersion}/setting/notifications`, icon: Bell01 },
            { label: "SEO settings", href: `/${adminVersion}/setting/seo-settings`, icon: SearchMd },
            { label: "Security & Privacy", href: `/${adminVersion}/setting/security-privacy`, icon: Lock01 },
            { label: "Gamification", href: `/${adminVersion}/setting/gamification`, icon: Trophy01 },
        ],
    });
    
    // Billing section
    items.push({
        label: "Billing",
        href: `/${adminVersion}/billing`,
        icon: CreditCard02,
        items: [
            { label: "Overview", href: `/${adminVersion}/billing/overview`, icon: BarChartSquare02 },
            { label: "Invoices", href: `/${adminVersion}/billing/invoices`, icon: Package },
            { label: "Payments", href: `/${adminVersion}/billing/payments`, icon: CurrencyDollarCircle },
            { label: "Subscriptions", href: `/${adminVersion}/billing/subscriptions`, icon: Stars01 },
            { label: "History", href: `/${adminVersion}/billing/history`, icon: Archive },
        ],
    });
    
    // Report section
    items.push({
        label: "Report",
        href: `/${adminVersion}/report`,
        icon: BarChartSquare02,
        items: [
            { label: "Analytics", href: `/${adminVersion}/report/analytics`, icon: LineChartUp03 },
            { label: "Traffic", href: `/${adminVersion}/report/traffic`, icon: BarChartSquare02 },
            { label: "Users", href: `/${adminVersion}/report/users`, icon: Users01 },
            { label: "Content", href: `/${adminVersion}/report/content`, icon: Package },
            { label: "Performance", href: `/${adminVersion}/report/performance`, icon: Star01 },
        ],
    });
    
    // AppStore section
    items.push({
        label: "AppStore",
        href: `/${adminVersion}/appstore`,
        icon: Data,
        items: [
            { label: "Browse", href: `/${adminVersion}/appstore/browse`, icon: Grid03 },
            { label: "Installed", href: `/${adminVersion}/appstore/installed`, icon: CheckDone01 },
            { label: "Updates", href: `/${adminVersion}/appstore/updates`, icon: ClockFastForward },
            { label: "Favorites", href: `/${adminVersion}/appstore/favorites`, icon: Star01 },
            { label: "Settings", href: `/${adminVersion}/appstore/settings`, icon: Settings01 },
        ],
    });
    
    return items;
};

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    headerActions?: ReactNode;
    currentPath?: string;
    hideHeader?: boolean;
}



export const AdminLayout = ({ 
    children, 
    title = "Admin Dashboard", 
    description = "Welcome back! Here's what's happening with your application.",
    headerActions,
    currentPath = "/admin3", // This should always be overridden by pages
    hideHeader = false
}: AdminLayoutProps) => {
    const { isAdmin, adminHeaderVisible, toggleAdminHeader } = useAdmin();
    
    // Determine admin version from current path
    const adminVersion = currentPath.includes('/admin2') ? 'admin2' : 'admin3';
    const navItems = generateNavItems(adminVersion);
    
    const SidebarNavigationDualDemo = () => (
        <SidebarNavigationDual
            activeUrl={currentPath}
            items={navItems}
            footerItems={[
                {
                    label: "Support",
                    href: "/support",
                    icon: LifeBuoy01,
                },
                {
                    label: "Onboarding",
                    href: `/${adminVersion}/onboarding`,
                    icon: GraduationHat02,
                },
            ]}
        />
    );

    return (
        <div className="flex flex-col h-dvh">
            {/* Admin Sticky Header - Only visible to admins and only for admin3 */}
            {isAdmin && adminVersion === 'admin3' && (
                <ErrorBoundary fallback={
                    <div className="h-12 bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-700 dark:text-red-300 text-sm">
                        Admin header error - check console
                    </div>
                }>
                    <AdminStickyHeader 
                        isVisible={adminHeaderVisible} 
                        onToggleVisibility={toggleAdminHeader}
                        isAdminPage={true}
                    />
                </ErrorBoundary>
            )}

            {/* Main layout with sidebar and content */}
            <div className="flex flex-1 overflow-hidden">
                <SidebarNavigationDualDemo />
                
                <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden scrollbar-thin">
                {/* Header */}
                {!hideHeader && (
                    <header className="flex items-center justify-between border-b border-secondary bg-primary px-6 py-4">
                        <div>
                            <h1 className="text-xl font-semibold text-primary">{title}</h1>
                            <p className="text-sm text-tertiary">{description}</p>
                        </div>
                        <div className="flex items-center gap-2">
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
            
            {/* Floating Progress Button - Only show for admin2 */}
            {adminVersion === 'admin2' && <FloatingProgressButton />}
        </div>
    );
}; 