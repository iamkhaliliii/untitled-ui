import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    Plus,
    SearchLg,
    Star01,
    Download01,
    CheckCircle,
    Settings01,
    Zap,
    Shield01,
    Database01,
    Mail01,
    MessageSquare02,
    BarChart03,
    CreditCard01,
    Users01,
    Calendar,
    Package,
    Grid01,
    Sliders01,
    ChevronDown,
    Eye,
    Trash01,
    ArrowRight,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { MobileSpaceTabs } from "@/components/application/app-navigation-admin4/mobile-space-tabs";
import { useBreakpoint } from "@/hooks/use-breakpoint";

// Sample apps & integrations data
const appsIntegrations = [
    {
        id: 1,
        name: "Slack",
        description: "Connect your community with Slack for seamless team communication",
        category: "Communication",
        icon: "💬",
        color: "purple",
        installed: true,
        rating: 4.8,
        installs: "10k+",
        developer: "Slack Technologies"
    },
    {
        id: 2,
        name: "Google Analytics",
        description: "Track and analyze your community engagement with Google Analytics",
        category: "Analytics",
        icon: "📊",
        color: "orange",
        installed: true,
        rating: 4.9,
        installs: "50k+",
        developer: "Google"
    },
    {
        id: 3,
        name: "Mailchimp",
        description: "Sync members and send email campaigns directly from your community",
        category: "Marketing",
        icon: "📧",
        color: "yellow",
        installed: false,
        rating: 4.6,
        installs: "25k+",
        developer: "Mailchimp"
    },
    {
        id: 4,
        name: "Stripe",
        description: "Accept payments and manage subscriptions for your community",
        category: "Payment",
        icon: "💳",
        color: "blue",
        installed: false,
        rating: 4.9,
        installs: "100k+",
        developer: "Stripe"
    },
    {
        id: 5,
        name: "Zapier",
        description: "Automate workflows by connecting your community with 3000+ apps",
        category: "Automation",
        icon: "⚡",
        color: "orange",
        installed: true,
        rating: 4.7,
        installs: "75k+",
        developer: "Zapier"
    },
    {
        id: 6,
        name: "Discord",
        description: "Bridge your community with Discord for voice and text chat",
        category: "Communication",
        icon: "🎮",
        color: "indigo",
        installed: false,
        rating: 4.5,
        installs: "15k+",
        developer: "Discord Inc."
    },
    {
        id: 7,
        name: "Salesforce",
        description: "Sync community data with Salesforce CRM for better insights",
        category: "CRM",
        icon: "☁️",
        color: "blue",
        installed: false,
        rating: 4.4,
        installs: "20k+",
        developer: "Salesforce"
    },
    {
        id: 8,
        name: "Intercom",
        description: "Add live chat and customer messaging to your community",
        category: "Support",
        icon: "💬",
        color: "blue",
        installed: false,
        rating: 4.6,
        installs: "30k+",
        developer: "Intercom"
    }
];

// Sample add-ons data
const addOns = [
    {
        id: 1,
        name: "Advanced Moderation Tools",
        description: "Enhanced moderation capabilities with AI-powered content filtering",
        category: "Moderation",
        icon: "🛡️",
        color: "red",
        installed: true,
        price: "$29/month",
        features: [
            "AI content filtering",
            "Auto-moderation rules",
            "Advanced ban management",
            "Spam detection"
        ]
    },
    {
        id: 2,
        name: "Custom Branding",
        description: "Remove branding and add your own logo and colors",
        category: "Customization",
        icon: "🎨",
        color: "purple",
        installed: true,
        price: "$49/month",
        features: [
            "Custom logo",
            "Brand colors",
            "Custom domain",
            "White-label solution"
        ]
    },
    {
        id: 3,
        name: "Advanced Analytics",
        description: "Deep insights into member behavior and engagement patterns",
        category: "Analytics",
        icon: "📈",
        color: "green",
        installed: false,
        price: "$39/month",
        features: [
            "Custom reports",
            "Export data",
            "Real-time dashboards",
            "Funnel analysis"
        ]
    },
    {
        id: 4,
        name: "Priority Support",
        description: "Get 24/7 priority support with dedicated account manager",
        category: "Support",
        icon: "🎧",
        color: "blue",
        installed: false,
        price: "$99/month",
        features: [
            "24/7 support",
            "Dedicated manager",
            "Priority tickets",
            "Phone support"
        ]
    },
    {
        id: 5,
        name: "SSO & Advanced Security",
        description: "Enterprise-grade security with Single Sign-On capabilities",
        category: "Security",
        icon: "🔐",
        color: "red",
        installed: false,
        price: "$79/month",
        features: [
            "SSO integration",
            "2FA enforcement",
            "IP whitelisting",
            "Audit logs"
        ]
    },
    {
        id: 6,
        name: "API Access",
        description: "Full API access for custom integrations and automation",
        category: "Developer",
        icon: "⚙️",
        color: "gray",
        installed: true,
        price: "$59/month",
        features: [
            "REST API",
            "GraphQL API",
            "Webhooks",
            "Documentation"
        ]
    }
];

export const AdminAppStorePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isDesktop = useBreakpoint("lg");
    const [searchQuery, setSearchQuery] = useState("");

    // Check if we're on a specific page
    const isAppsPage = location.pathname === '/admin4/appstore' || location.pathname === '/admin4/appstore/';
    const isAddOnsPage = location.pathname === '/admin4/appstore/addons';

    const getPageTitle = () => {
        if (isAppsPage) return "Apps & Integrations";
        if (isAddOnsPage) return "Add-ons";
        return "App Store";
    };

    const getPageDescription = () => {
        if (isAppsPage) return "Connect with your favorite tools and services";
        if (isAddOnsPage) return "Enhance your community with premium features";
        return "Discover apps and add-ons for your community";
    };

    // Determine current page type for tabs
    const getCurrentPageType = () => {
        if (location.pathname.includes("/addons")) return "addons";
        return "apps";
    };

    const currentPageType = getCurrentPageType();

    // Define tabs
    const appStoreTabs = [
        { id: "apps", label: "Apps & Integrations", path: "" },
        { id: "addons", label: "Add-ons", path: "/addons" },
    ];

    // Get base path
    const getBasePath = () => {
        return "/admin4/appstore";
    };

    // Filter data based on search
    const filteredApps = appsIntegrations.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAddOns = addOns.filter(addon =>
        addon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        addon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        addon.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Render header actions
    const renderHeaderActions = () => (
        <div className="flex items-center gap-2">
            <div className="relative w-64">
                <SearchLg className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-fg-quaternary dark:text-gray-500" />
                <Input
                    placeholder="Search..."
                    className="w-full pl-10"
                    size="sm"
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                />
            </div>
        </div>
    );

    return (
        <Admin4Layout
            title={`App Store - ${getPageTitle()}`}
            description={getPageDescription()}
            currentPath={location.pathname}
            hideHeader={true}
            headerActions={renderHeaderActions()}
            mobileTabSelector={
                <MobileSpaceTabs
                    basePath={getBasePath()}
                    tabs={appStoreTabs}
                    currentTab={currentPageType}
                    headerActions={renderHeaderActions()}
                />
            }
        >
            <div className="px-4 py-6 lg:px-6">
                <div className="flex flex-col lg:p-1 space-y-6">
                    {/* Apps & Integrations Page */}
                    {isAppsPage && (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary dark:text-gray-100">Apps & Integrations</h2>
                                    <p className="text-sm text-tertiary dark:text-gray-400 mt-1">
                                        {filteredApps.length} apps available • {appsIntegrations.filter(a => a.installed).length} installed
                                    </p>
                                </div>
                            </div>

                            {/* Categories Filter */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                <Button color="primary" size="sm">All</Button>
                                <Button color="secondary" size="sm">Communication</Button>
                                <Button color="secondary" size="sm">Analytics</Button>
                                <Button color="secondary" size="sm">Marketing</Button>
                                <Button color="secondary" size="sm">Payment</Button>
                                <Button color="secondary" size="sm">Automation</Button>
                            </div>

                            {/* Apps Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredApps.map((app) => (
                                    <div
                                        key={app.id}
                                        className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="text-4xl">{app.icon}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="text-lg font-semibold text-primary dark:text-gray-100">{app.name}</h3>
                                                    {app.installed && (
                                                        <Badge color="success" size="sm">
                                                            <CheckCircle className="size-3 mr-1" />
                                                            Installed
                                                        </Badge>
                                                    )}
                                                </div>
                                                <Badge color="gray" size="sm" className="mt-1">{app.category}</Badge>
                                            </div>
                                        </div>

                                        <p className="text-sm text-tertiary dark:text-gray-400 mb-4 line-clamp-2">
                                            {app.description}
                                        </p>

                                        <div className="flex items-center gap-4 mb-4 text-sm text-tertiary dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Star01 className="size-4 text-warning-solid fill-warning-solid" />
                                                <span>{app.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Download01 className="size-4" />
                                                <span>{app.installs}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {app.installed ? (
                                                <>
                                                    <Button color="secondary" size="sm" className="flex-1" iconLeading={Settings01}>
                                                        Configure
                                                    </Button>
                                                    <Button color="tertiary" size="sm" iconLeading={Trash01} className="!p-2" />
                                                </>
                                            ) : (
                                                <Button color="primary" size="sm" className="flex-1" iconLeading={Plus}>
                                                    Install
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Add-ons Page */}
                    {isAddOnsPage && (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary dark:text-gray-100">Add-ons</h2>
                                    <p className="text-sm text-tertiary dark:text-gray-400 mt-1">
                                        {filteredAddOns.length} add-ons available • {addOns.filter(a => a.installed).length} active
                                    </p>
                                </div>
                            </div>

                            {/* Add-ons Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {filteredAddOns.map((addon) => (
                                    <div
                                        key={addon.id}
                                        className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-start gap-4">
                                                <div className="text-4xl">{addon.icon}</div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-1">
                                                        {addon.name}
                                                    </h3>
                                                    <Badge color="gray" size="sm">{addon.category}</Badge>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-primary dark:text-gray-100">
                                                    {addon.price}
                                                </div>
                                                {addon.installed && (
                                                    <Badge color="success" size="sm" className="mt-1">Active</Badge>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-sm text-tertiary dark:text-gray-400 mb-4">
                                            {addon.description}
                                        </p>

                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-secondary dark:text-gray-300 mb-2">
                                                Features included:
                                            </h4>
                                            <ul className="space-y-1">
                                                {addon.features.map((feature, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm text-tertiary dark:text-gray-400">
                                                        <CheckCircle className="size-4 text-success-solid dark:text-green-400 flex-shrink-0" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {addon.installed ? (
                                                <>
                                                    <Button color="secondary" size="sm" className="flex-1" iconLeading={Settings01}>
                                                        Manage
                                                    </Button>
                                                    <Button color="tertiary" size="sm" iconTrailing={ArrowRight}>
                                                        Upgrade
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button color="primary" size="sm" className="flex-1">
                                                        Subscribe
                                                    </Button>
                                                    <Button color="secondary" size="sm" iconLeading={Eye}>
                                                        Learn More
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing Note */}
                            <div className="rounded-xl bg-brand-solid/5 dark:bg-brand-solid/10 border border-brand-solid/20 dark:border-brand-solid/30 p-6">
                                <div className="flex items-start gap-3">
                                    <Zap className="size-6 text-brand-solid flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-1">
                                            Need more features?
                                        </h3>
                                        <p className="text-sm text-tertiary dark:text-gray-400 mb-3">
                                            Upgrade to our Professional or Enterprise plan to get access to all add-ons at a discounted rate.
                                        </p>
                                        <Button color="primary" size="sm" iconTrailing={ArrowRight}>
                                            View Plans
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Admin4Layout>
    );
};

