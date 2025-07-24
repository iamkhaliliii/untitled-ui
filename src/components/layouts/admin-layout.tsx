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
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationDual } from "@/components/application/app-navigation/sidebar-navigation/sidebar-dual";



const navItemsDualTier: NavItemType[] = [
    {
        label: "Content",
        href: "/admin/content",
        icon: Database01,
        items: [
            { label: "Posts", href: "/admin/content/posts", icon: Package },
            { label: "Pages", href: "/admin/content/pages", icon: Grid03 },
            { label: "Media", href: "/admin/content/media", icon: Archive },
            { label: "Categories", href: "/admin/content/categories", icon: Rows01 },
            { label: "Comments", href: "/admin/content/comments", icon: Inbox01 },
        ],
    },
    {
        label: "Site",
        href: "/admin/site",
        icon: CodeBrowser,
        items: [
            { label: "Dashboard", href: "/admin/site/dashboard", icon: BarChartSquare02 },
            { label: "File Explorer", href: "/admin/site/files", icon: Archive },
            { label: "Themes", href: "/admin/site/themes", icon: Palette },
            { label: "Plugins", href: "/admin/site/plugins", icon: Package },
            { label: "Menu", href: "/admin/site/menu", icon: Grid03 },
            { label: "Widgets", href: "/admin/site/widgets", icon: Stars01 },
        ],
    },
    {
        label: "People",
        href: "/admin/people",
        icon: Users01,
        items: [
            { label: "All Users", href: "/admin/people/all", icon: Users01 },
            { label: "Administrators", href: "/admin/people/admins", icon: UserSquare },
            { label: "Moderators", href: "/admin/people/moderators", icon: User01 },
            { label: "Subscribers", href: "/admin/people/subscribers", icon: UsersPlus },
            { label: "Banned Users", href: "/admin/people/banned", icon: Archive },
        ],
    },
    {
        label: "Moderation",
        href: "/admin/moderation",
        icon: ShieldTick,
        items: [
            { label: "Reports", href: "/admin/moderation/reports", icon: PieChart03, badge: 5 },
            { label: "Spam", href: "/admin/moderation/spam", icon: Archive },
            { label: "Pending", href: "/admin/moderation/pending", icon: ClockFastForward },
            { label: "Logs", href: "/admin/moderation/logs", icon: Rows01 },
        ],
    },
    {
        label: "Appearance",
        href: "/admin/appearance",
        icon: Brush03,
        items: [
            { label: "Themes", href: "/admin/appearance/themes", icon: Palette },
            { label: "Customizer", href: "/admin/appearance/customizer", icon: Settings03 },
            { label: "Menus", href: "/admin/appearance/menus", icon: Grid03 },
            { label: "Widgets", href: "/admin/appearance/widgets", icon: Stars01 },
            { label: "Background", href: "/admin/appearance/background", icon: Package },
        ],
    },
    {
        label: "Setting",
        href: "/admin/setting",
        icon: Settings02,
        items: [
            { label: "General", href: "/admin/setting/general", icon: Settings01 },
            { label: "Writing", href: "/admin/setting/writing", icon: Package },
            { label: "Reading", href: "/admin/setting/reading", icon: Grid03 },
            { label: "Discussion", href: "/admin/setting/discussion", icon: Inbox01 },
            { label: "Permalinks", href: "/admin/setting/permalinks", icon: Rows01 },
        ],
    },
    {
        label: "Billing",
        href: "/admin/billing",
        icon: CreditCard02,
        items: [
            { label: "Overview", href: "/admin/billing/overview", icon: BarChartSquare02 },
            { label: "Invoices", href: "/admin/billing/invoices", icon: Package },
            { label: "Payments", href: "/admin/billing/payments", icon: CurrencyDollarCircle },
            { label: "Subscriptions", href: "/admin/billing/subscriptions", icon: Stars01 },
            { label: "History", href: "/admin/billing/history", icon: Archive },
        ],
    },
    {
        label: "Report",
        href: "/admin/report",
        icon: BarChartSquare02,
        items: [
            { label: "Analytics", href: "/admin/report/analytics", icon: LineChartUp03 },
            { label: "Traffic", href: "/admin/report/traffic", icon: BarChartSquare02 },
            { label: "Users", href: "/admin/report/users", icon: Users01 },
            { label: "Content", href: "/admin/report/content", icon: Package },
            { label: "Performance", href: "/admin/report/performance", icon: Star01 },
        ],
    },
    {
        label: "AppStore",
        href: "/admin/appstore",
        icon: Data,
        items: [
            { label: "Browse", href: "/admin/appstore/browse", icon: Grid03 },
            { label: "Installed", href: "/admin/appstore/installed", icon: CheckDone01 },
            { label: "Updates", href: "/admin/appstore/updates", icon: ClockFastForward },
            { label: "Favorites", href: "/admin/appstore/favorites", icon: Star01 },
            { label: "Settings", href: "/admin/appstore/settings", icon: Settings01 },
        ],
    },
];

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
    currentPath = "/admin",
    hideHeader = false
}: AdminLayoutProps) => {
    const SidebarNavigationDualDemo = () => (
        <SidebarNavigationDual
            activeUrl={currentPath}
            items={navItemsDualTier}
            footerItems={[
                {
                    label: "Support",
                    href: "/support",
                    icon: LifeBuoy01,
                },
                {
                    label: "Onboarding",
                    href: "/onboarding",
                    icon: GraduationHat02,
                },
            ]}
        />
    );

    return (
        <div className="flex h-dvh">
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
    );
}; 