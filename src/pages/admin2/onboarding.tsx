import {
    CheckDone01,
    Users01,
    Settings01,
    Palette,
    MessageChatCircle,
    Plus,
    ArrowRight,
    Lightbulb01,
    Rocket01,
    Database01,
    CodeBrowser,
    BarChartSquare02,
    Data,
    LifeBuoy01,
    GraduationHat02
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { useAdmin } from "@/hooks/use-admin";
import { useLocation } from "react-router";
import type { NavItemType } from "@/components/application/app-navigation/config";

const onboardingCategories = [
    {
        id: "onboarding",
        title: "Onboarding",
        description: "Core setup for your community",
        steps: [
            {
                id: "permissions",
                title: "Site permissions & privacy",
                description: "Configure who can access your community",
                icon: Settings01,
                status: "pending",
                href: "/admin2/setting/site-settings",
                image: "/pic/onboarding/moderation-rules.jpg"
            },
            {
                id: "auth",
                title: "Login/Auth",
                description: "Set up authentication methods",
                icon: Users01,
                status: "pending",
                href: "/admin2/setting/authentication",
                image: "/pic/onboarding/social-login.jpg"
            },
            {
                id: "domain",
                title: "Community Domain",
                description: "Configure your community URL",
                icon: CodeBrowser,
                status: "pending",
                href: "/admin2/site",
                image: "/pic/onboarding/update-community-name.jpg"
            },
            {
                id: "invite",
                title: "Invite teammates",
                description: "Add your team members",
                icon: Users01,
                status: "pending",
                href: "/admin2/people",
                image: "/pic/onboarding/invite-members.jpg"
            }
        ]
    },
    {
        id: "setup",
        title: "Setup",
        description: "Make it yours",
        steps: [
            {
                id: "branding",
                title: "Branding & Theme",
                description: "Upload logo and set colors",
                icon: Palette,
                status: "pending",
                href: "/admin2/site-settings",
                image: "/pic/onboarding/customize-theme.jpg"
            },
            {
                id: "spaces",
                title: "Create Spaces",
                description: "Organize your content",
                icon: Database01,
                status: "pending",
                href: "/admin2/content2/spaces",
                image: "/pic/onboarding/customize-spaces.jpg"
            },
            {
                id: "navigation",
                title: "Navigation Setup",
                description: "Configure menus and structure",
                icon: BarChartSquare02,
                status: "pending",
                href: "/admin2/site",
                image: "/pic/onboarding/customize-navigation.jpg"
            }
        ]
    },
    {
        id: "launch",
        title: "Launch",
        description: "Advanced features",
        steps: [
            {
                id: "integrations",
                title: "Integrations",
                description: "Connect external tools",
                icon: Data,
                status: "pending",
                href: "/admin2/appstore",
                image: "/pic/onboarding/explore-apps.jpg"
            },
            {
                id: "analytics",
                title: "Analytics Setup",
                description: "Track community engagement",
                icon: BarChartSquare02,
                status: "pending",
                href: "/admin2/report",
                image: "/pic/onboarding/build-app.jpg"
            },
            {
                id: "automation",
                title: "Automation",
                description: "Set up workflows and rules",
                icon: Settings01,
                status: "pending",
                href: "/admin2/setting",
                image: "/pic/onboarding/manage-staff-seats.jpg"
            }
        ]
    }
];

export const AdminOnboardingPage = () => {
    const location = useLocation();
    const { isAdmin, adminHeaderVisible, toggleAdminHeader } = useAdmin();
    
    // Admin2 navigation items
    const navItems: NavItemType[] = [
        {
            label: "Content 2",
            href: "/admin2/content2",
            icon: Database01,
        },
        {
            label: "Site",
            href: "/admin2/site",
            icon: CodeBrowser,
        },
        {
            label: "People",
            href: "/admin2/people",
            icon: Users01,
        },
        {
            label: "Setting",
            href: "/admin2/setting/site-settings",
            icon: Settings01,
        },
        {
            label: "Report",
            href: "/admin2/report",
            icon: BarChartSquare02,
        },
        {
            label: "AppStore",
            href: "/admin2/appstore",
            icon: Data,
        },
    ];

    return (
        <div className="flex flex-col h-dvh">
            {/* Admin Sticky Header */}
            {isAdmin && (
                <AdminStickyHeader 
                    isVisible={adminHeaderVisible} 
                    onToggleVisibility={toggleAdminHeader}
                    isAdminPage={true}
                />
            )}

            {/* Main layout with slim sidebar */}
            <div className="flex flex-1 overflow-hidden">
                <SidebarNavigationSlim
                    activeUrl={location.pathname}
                    items={navItems}
                    footerItems={[
                        {
                            label: "Support",
                            href: "/support",
                            icon: LifeBuoy01,
                        },
                        {
                            label: "Onboarding",
                            href: "/admin2/onboarding",
                            icon: GraduationHat02,
                        },
                    ]}
                />
                
                <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden scrollbar-thin">
                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
                        <div className="px-4 py-6 lg:px-6">
                            <div className="mx-auto max-w-4xl">
                    
                    {/* Welcome Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-brand-solid rounded-2xl flex items-center justify-center">
                                <Rocket01 className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-primary mb-4">
                            Welcome to Your Community! 🎉
                        </h1>
                        <p className="text-lg text-tertiary max-w-2xl mx-auto">
                            Complete these setup steps to create an amazing experience for your members.
                        </p>
                    </div>

                    {/* Progress Overview */}
                    <div className="bg-brand-primary_alt border border-brand-300 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-primary">Setup Progress</h2>
                            <Badge color="brand" size="sm">0 of 10 completed</Badge>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                            <div className="w-0 h-full bg-brand-solid rounded-full transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Onboarding Categories */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {onboardingCategories.map((category) => (
                            <div key={category.id} className="bg-primary border border-secondary rounded-xl p-3 space-y-3">
                                
                                {/* Category Header */}
                                <div className="text-left pb-2 border-b border-secondary/50">
                                    <h2 className="text-lg font-semibold text-primary mb-1">
                                        {category.title}
                                    </h2>
                                    <p className="text-xs text-tertiary">
                                        {category.description}
                                    </p>
                                </div>

                                {/* Category Steps */}
                                <div className="space-y-3">
                                    {category.steps.map((step, index) => (
                                        <div 
                                            key={step.id}
                                            className="bg-secondary border-1 border-secondary rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer "
                                            onClick={() => window.location.href = step.href}
                                        >
                                            {/* Cover Image */}
                                            <div className="h-28 bg-gray-100 overflow-hidden relative">
                                                <img 
                                                    src={step.image} 
                                                    alt={step.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/40 to-secondary"></div>
                                            </div>

                                            {/* Card Content */}
                                            <div className="px-3 pb-4 pt-2 relative">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <step.icon className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                                                    <h3 className="text-sm font-semibold text-primary">
                                                        {step.title}
                                                    </h3>
                                                </div>
                                                <p className="text-xs text-tertiary mt-1 mb-6">
                                                    {step.description}
                                                </p>
                                                
                                                {/* CTA Link */}
                                                <div className="absolute bottom-3 right-3">
                                                    <span className="text-xs text-brand-secondary hover:text-brand-secondary_hover transition-colors">
                                                        Setup →
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>


                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
