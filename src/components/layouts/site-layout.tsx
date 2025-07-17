import { ReactNode } from "react";
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
import { cx } from "@/utils/cx";
import { useTheme } from "@/providers/theme";
import { NavMenuItemLink } from "@/components/marketing/header-navigation/base-components/nav-menu-item";
import { Header } from "@/components/marketing/header-navigation/components/header";

interface SiteLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    currentPath?: string;
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

const HeaderDropdownSimple = () => (
    <Header
        items={[
            { label: "Products", href: "/products", menu: <DropdownMenuSimple /> },
            { label: "Services", href: "/Services", menu: <DropdownMenuSimple /> },
            { label: "Pricing", href: "/pricing" },
            { label: "Resources", href: "/resources", menu: <DropdownMenuSimple /> },
            { label: "About", href: "/about" },
        ]}
    />
);

export const SiteLayout = ({ 
    children, 
    title,
    description,
    currentPath = "/site"
}: SiteLayoutProps) => {
    const { theme } = useTheme();

    return (
        <div className="flex min-h-screen flex-col bg-primary">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-primary/80 backdrop-blur-lg">
                <HeaderDropdownSimple />
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
                <div className="flex flex-1">
                    {/* Left Sidebar */}
                    <aside className="hidden lg:block w-64 bg-primary">
                        <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-4 pr-8">
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
                        {children}
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

            {/* Mobile Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-secondary bg-primary/95 backdrop-blur-sm">
                <div className="flex items-center justify-around px-4 py-2">
                    {siteNavigation.slice(0, 5).map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cx(
                                "flex flex-col items-center gap-1 p-2 text-xs",
                                currentPath === item.href
                                    ? "text-brand-secondary"
                                    : "text-tertiary"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}; 