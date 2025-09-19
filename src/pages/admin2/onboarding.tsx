import {
    CheckDone01,
    CheckCircle,
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
    GraduationHat02,
    Lock01,
    LinkExternal01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { useAdmin } from "@/hooks/use-admin";
import { useLocation, useNavigate } from "react-router";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { useState, useEffect } from "react";

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
                status: "completed",
                href: "/admin2/setting/site-settings",
                image: "/pic/onboarding/moderation-rules.jpg"
            },
            {
                id: "auth",
                title: "Login/Auth",
                description: "Set up authentication methods",
                icon: Users01,
                status: "completed",
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
                href: "/admin2/site/spaces/create?startTour=true",
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
    },
    {
        id: "growth",
        title: "Growth",
        description: "Scale your community",
        steps: [
            {
                id: "content-strategy",
                title: "Content Strategy",
                description: "Plan engaging content for your members",
                icon: MessageChatCircle,
                status: "pending",
                href: "/admin2/content2",
                image: "/pic/onboarding/customize-theme.jpg"
            },
            {
                id: "member-engagement",
                title: "Member Engagement",
                description: "Build active community participation",
                icon: Users01,
                status: "pending",
                href: "/admin2/people",
                image: "/pic/onboarding/invite-members.jpg"
            },
            {
                id: "monetization",
                title: "Monetization",
                description: "Explore revenue opportunities",
                icon: Plus,
                status: "pending",
                href: "/admin2/setting",
                image: "/pic/onboarding/build-app.jpg"
            },
            {
                id: "community-insights",
                title: "Community Insights",
                description: "Track growth and member behavior",
                icon: BarChartSquare02,
                status: "pending",
                href: "/admin2/report",
                image: "/pic/onboarding/explore-apps.jpg"
            }
        ]
    }
];

export const AdminOnboardingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAdmin, adminHeaderVisible, toggleAdminHeader } = useAdmin();
    const [showOnboardingHub, setShowOnboardingHub] = useState(false);

    // Keyboard event handler for 'O' key
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'o') {
                setShowOnboardingHub(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    
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
                        {/* Full Height Welcome Section */}
                        <div className="min-h-screen flex items-center justify-center px-4 py-6 lg:px-6">
                            <div className="mx-auto max-w-7xl w-full">
                                {/* Top Hero Section - Welcome Message and Suggested Steps */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                        
                                        {/* Left - Enhanced Welcome Message */}
                                        <div className="flex flex-col justify-start space-y-6">
                                            {/* Hero Badge */}
                                            <div className="inline-flex items-center gap-2 bg-brand-primary_alt border border-brand-300 rounded-full px-3 py-1.5 w-fit">
                                                <Rocket01 className="w-3.5 h-3.5 text-brand-secondary" />
                                                <span className="text-xs font-medium text-brand-secondary">Getting Started</span>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <h1 className="text-3xl font-bold text-primary leading-tight">
                                                    Welcome to Your<br />
                                                    <span className="bg-gradient-to-r from-brand-solid to-brand-secondary bg-clip-text text-transparent">
                                                        Community! 🎉
                                                    </span>
                                                </h1>
                                                <p className="text-sm text-tertiary leading-relaxed max-w-lg">
                                                    Set up your foundation, complete these core steps to ensure security, branding, and team access before launch.
                                                </p>
                                                
                                                {/* Help Links */}
                                                <div className="pt-4">
                                                    <p className="text-sm text-tertiary mb-3">Know more:</p>
                                                    <div className="flex flex-col space-y-2">
                                                        <a href="#" className="flex items-center gap-1 text-sm text-tertiary/60 hover:text-tertiary transition-colors w-fit">
                                                            <span>Academy</span>
                                                            <ArrowRight className="w-3 h-3" />
                                                        </a>
                                                        <a href="#" className="flex items-center gap-1 text-sm text-tertiary/60 hover:text-tertiary transition-colors w-fit">
                                                            <span>Support Hub</span>
                                                            <ArrowRight className="w-3 h-3" />
                                                        </a>
                                                        <a href="#" className="flex items-center gap-1 text-sm text-tertiary/60 hover:text-tertiary transition-colors w-fit">
                                                            <span>Knowledge Base</span>
                                                            <ArrowRight className="w-3 h-3" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        {/* Right - Enhanced Suggested Steps Card */}
                                        <div className="bg-gradient-to-br from-secondary to-primary border border-secondary rounded-xl p-4 shadow-md">
                                            
                                            {/* Progress */}
                                            <div className="mb-4 p-3">
                                                <div className="mb-6">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="text-sm font-medium text-primary">Community Journey</h4>
                                                        <span className="text-xs text-tertiary">3 more steps to complete setup</span>
                                                    </div>
                                                    <p className="text-xs text-tertiary">Track and complete every stage from setup to growth</p>
                                                </div>
                                                
                                                <div className="relative mb-6">
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                                        <div className="bg-purple-600 h-1.5 rounded-full" style={{width: '30%'}}></div>
                                                    </div>
                                                    
                                                    <div className="absolute -top-1.5 left-0 right-0 flex justify-between">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-4 h-4 bg-brand-solid rounded-full"></div>
                                                            <span className="text-xs text-brand-solid font-medium mt-2">Initial</span>
                                                        </div>
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-4 h-4 bg-brand-solid rounded-full"></div>
                                                            <span className="text-xs text-brand-solid font-medium mt-2">Onboarded</span>
                                                        </div>
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-4 h-4 bg-brand-secondary rounded-full"></div>
                                                            <span className="text-xs text-brand-secondary font-medium mt-2">Setup</span>
                                                        </div>
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                                            <span className="text-xs text-tertiary mt-2">Launch</span>
                                                        </div>
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                                            <span className="text-xs text-tertiary mt-2">Growth</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Deep Enhanced Step List */}
                                            <div className="bg-gradient-to-br from-secondary via-primary to-secondary/50 rounded-2xl p-4 border border-secondary shadow-lg">
                                                
                                                <div className="max-h-72 overflow-y-auto scrollbar-thin space-y-2 pr-2">
                                                {/* Step 3 - Recommended Next Step */}
                                                <div 
                                                    className="flex items-center gap-4 p-3 bg-gradient-to-r from-brand-primary_alt to-brand-secondary/10 border-2 border-brand-secondary rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                                    onClick={() => navigate("/admin2/site/spaces/create?startTour=true")}
                                                >
                                                    <Database01 className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="text-sm font-semibold text-primary">Create Spaces</h4>
                                                            <Badge color="brand" size="sm">Recommended Next Step</Badge>
                                                        </div>
                                                        <p className="text-xs text-tertiary">Organize your content structure</p>
                                                    </div>
                                                    <div className="text-brand-secondary">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                                
                                                {/* Step 4 - Pending */}
                                                <div className="flex items-center gap-4 p-3 bg-secondary border border-secondary rounded-xl cursor-pointer hover:bg-brand-primary_alt/20 transition-all duration-300">
                                                    <Users01 className="w-5 h-5 text-tertiary flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-primary">Invite teammates</h4>
                                                        <p className="text-xs text-tertiary">Add your team members</p>
                                                    </div>
                                                    <div className="text-tertiary">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                {/* Step 5 - Pending */}
                                                <div className="flex items-center gap-4 p-3 bg-secondary border border-secondary rounded-xl cursor-pointer hover:bg-brand-primary_alt/20 transition-all duration-300">
                                                    <CodeBrowser className="w-5 h-5 text-tertiary flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-primary">Community Domain</h4>
                                                        <p className="text-xs text-tertiary">Configure your community URL</p>
                                                    </div>
                                                    <div className="text-tertiary">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                {/* Step 6 - Pending */}
                                                <div className="flex items-center gap-4 p-3 bg-secondary border border-secondary rounded-xl cursor-pointer hover:bg-brand-primary_alt/20 transition-all duration-300">
                                                    <MessageChatCircle className="w-5 h-5 text-tertiary flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-primary">Setup Communication</h4>
                                                        <p className="text-xs text-tertiary">Configure messaging and notifications</p>
                                                    </div>
                                                    <div className="text-tertiary">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                {/* Step 7 - Pending */}
                                                <div className="flex items-center gap-4 p-3 bg-secondary border border-secondary rounded-xl cursor-pointer hover:bg-brand-primary_alt/20 transition-all duration-300">
                                                    <BarChartSquare02 className="w-5 h-5 text-tertiary flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-primary">Analytics Setup</h4>
                                                        <p className="text-xs text-tertiary">Track community engagement</p>
                                                    </div>
                                                    <div className="text-tertiary">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                {/* Step 8 - Pending */}
                                                <div className="flex items-center gap-4 p-3 bg-secondary border border-secondary rounded-xl cursor-pointer hover:bg-brand-primary_alt/20 transition-all duration-300">
                                                    <Data className="w-5 h-5 text-tertiary flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-primary">Integrations</h4>
                                                        <p className="text-xs text-tertiary">Connect external tools</p>
                                                    </div>
                                                    <div className="text-tertiary">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                {/* Step 9 - Pending */}
                                                <div className="flex items-center gap-4 p-3 bg-secondary border border-secondary rounded-xl cursor-pointer hover:bg-brand-primary_alt/20 transition-all duration-300">
                                                    <Plus className="w-5 h-5 text-tertiary flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-primary">Content Creation</h4>
                                                        <p className="text-xs text-tertiary">Add initial posts and content</p>
                                                    </div>
                                                    <div className="text-tertiary">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                {/* Step 10 - Pending */}
                                                <div className="flex items-center gap-4 p-3 bg-secondary border border-secondary rounded-xl cursor-pointer hover:bg-brand-primary_alt/20 transition-all duration-300">
                                                    <Rocket01 className="w-5 h-5 text-tertiary flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-primary">Launch Community</h4>
                                                        <p className="text-xs text-tertiary">Go live with your community</p>
                                                    </div>
                                                    <div className="text-tertiary">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                {/* Enhanced Completed Steps Section */}
                                                <div className="pt-4 mt-4 border-t border-secondary/50">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-5 h-5 bg-brand-solid/20 rounded-lg flex items-center justify-center">
                                                                <CheckCircle className="w-3 h-3 text-brand-solid" />
                                                            </div>
                                                            <h5 className="text-xs font-semibold text-brand-solid">Completed Tasks</h5>
                                                        </div>
                                                        <div className="text-xs text-brand-solid/70 font-medium">2 done</div>
                                                    </div>
                                                    
                                                    {/* Step 1 - Completed */}
                                                    <div className="flex items-center gap-3 p-2 bg-brand-solid/5 border border-brand-solid/20 rounded-lg cursor-pointer opacity-60 transition-all duration-300 mb-2 hover:opacity-80">
                                                        <Settings01 className="w-4 h-4 text-brand-solid flex-shrink-0" />
                                                        <div className="flex-1">
                                                            <h4 className="text-xs font-medium text-brand-solid line-through">Site permissions & privacy</h4>
                                                        </div>
                                                        <div className="w-4 h-4 bg-brand-solid rounded-full flex items-center justify-center">
                                                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Step 2 - Completed */}
                                                    <div className="flex items-center gap-3 p-2 bg-brand-solid/5 border border-brand-solid/20 rounded-lg cursor-pointer opacity-60 transition-all duration-300 hover:opacity-80">
                                                        <Palette className="w-4 h-4 text-brand-solid flex-shrink-0" />
                                                        <div className="flex-1">
                                                            <h4 className="text-xs font-medium text-brand-solid line-through">Branding & Theme</h4>
                                                        </div>
                                                        <div className="w-4 h-4 bg-brand-solid rounded-full flex items-center justify-center">
                                                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                        </div>
                    </div>
                        </div>
                        </div>

                        {/* Onboarding Hub Section - Separate scrollable section - Hidden by default, toggle with 'O' key */}
                        {showOnboardingHub && (
                            <div className="px-4 py-12 lg:px-6 bg-gray-50">
                                <div className="mx-auto max-w-7xl">

                                    {/* Section Introduction */}
                                    <div className="text-center space-y-4 mb-8">
                                        <h2 className="text-3xl font-bold text-primary">Your Onboarding Hub</h2>
                        <p className="text-lg text-tertiary max-w-2xl mx-auto">
                                            All setup steps organized by stage
                        </p>
                    </div>

                                    {/* Customer Education Section */}
                                    <div className="bg-primary border border-secondary rounded-xl p-3 space-y-3 mb-12">
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                                            {/* Left side - Jacob's info */}
                                            <div className="lg:col-span-2 p-3">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-300">
                                                        <img 
                                                            src="/Jacob Harris.png" 
                                                            alt="Jacob Harris"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="text-sm text-tertiary">Jacob from the customer education team</span>
                                                </div>
                                                
                                                <h3 className="text-2xl font-bold text-primary mb-3">
                                                    Get to know Bettermode
                                                </h3>
                                                
                                                <p className="text-xs text-tertiary leading-relaxed mb-4">
                                                    Take a tour around administration and learn how to create collections and spaces to organize your community.
                                                </p>
                                                
                                                <div className="flex items-center gap-4">
                                                    <a href="#" className="flex items-center gap-1 text-xs font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors">
                                                        <span>Academy</span>
                                                        <ArrowRight className="w-3 h-3" />
                                                    </a>
                                                    <a href="#" className="flex items-center gap-1 text-xs font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors">
                                                        <span>Help Center</span>
                                                        <ArrowRight className="w-3 h-3" />
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Right side - Video thumbnail */}
                                            <div className="relative group cursor-pointer p-3">
                                                <div className="rounded-lg overflow-hidden shadow-sm aspect-video">
                                                    <img 
                                                        src="/maxresdefault.jpg" 
                                                        alt="Getting Started with Bettermode"
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                {/* Play button overlay */}
                                                <div className="absolute inset-3 flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 border-2 border-white/50">
                                                        <div className="w-0 h-0 border-l-[12px] border-l-brand-solid border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent ml-1"></div>
                                                    </div>
                                                </div>
                                                {/* Video title overlay */}
                                                <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg">
                                                    <p className="text-white font-medium text-xs">Getting Started with Bettermode</p>
                                                </div>
                        </div>
                        </div>
                    </div>

                                    {/* Bottom Section - Onboarding Categories as Horizontal Sections */}
                                    <div className="space-y-12">
                        {onboardingCategories.map((category, categoryIndex) => (
                            <div key={category.id} className="bg-primary">
                                
                                {/* Category Header */}
                                <div className="text-left mb-6">
                                    <h2 className="text-2xl font-bold text-primary mb-2">
                                        {category.title}
                                    </h2>
                                    <p className="text-base text-tertiary">
                                        {category.description}
                                    </p>
                                </div>

                                {/* Category Steps in 4-Column Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {category.steps.map((step, stepIndex) => (
                                        <div 
                                            key={step.id}
                                            className={`bg-white border border-secondary rounded-lg hover:border-primary transition-colors cursor-pointer flex flex-col ${
                                                step.status === 'pending' && (step.id === 'branding' || step.id === 'spaces' || step.id === 'monetization' || step.id === 'community-insights') 
                                                ? 'opacity-50' 
                                                : ''
                                            }`}
                                            onClick={() => navigate(step.href)}
                                        >
                                            {/* Card Content */}
                                            <div className="p-6">
                                                <div className="flex flex-col h-full">
                                                    {/* Header with Icon and Badge */}
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="relative shrink-0 rounded-lg h-10 w-10" title={step.title}>
                                                            <div className="shrink-0 rounded-lg h-10 w-10 bg-gradient-to-br from-brand-primary_alt to-brand-secondary/20 flex items-center justify-center">
                                                                <step.icon className="w-5 h-5 text-brand-secondary" />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap justify-end gap-2">
                                                            {/* Locked Badge for specific steps */}
                                                            {step.status === 'pending' && (step.id === 'branding' || step.id === 'spaces' || step.id === 'monetization' || step.id === 'community-insights') && (
                                                                <BadgeWithIcon 
                                                                    type="pill-color" 
                                                                    size="sm" 
                                                                    color="gray" 
                                                                    iconLeading={Lock01}
                                                                >
                                                                    Locked
                                                                </BadgeWithIcon>
                                                            )}
                                                            
                                                            {/* Done Badge for completed steps */}
                                                            {step.status === 'completed' && (
                                                                <BadgeWithIcon 
                                                                    type="pill-color" 
                                                                    size="sm" 
                                                                    color="success" 
                                                                    iconLeading={CheckCircle}
                                                                >
                                                                    Done
                                                                </BadgeWithIcon>
                                                            )}
                                                            
                                                            {/* Ready Badge for available pending steps */}
                                                            {step.status === 'pending' && !(step.id === 'branding' || step.id === 'spaces' || step.id === 'monetization' || step.id === 'community-insights') && (
                                                                <Badge 
                                                                    type="pill-color" 
                                                                    size="sm" 
                                                                    color="brand"
                                                                >
                                                                    Ready
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Title and Description */}
                                                    <div className="flex-1 mb-6">
                                                        <h4 className="text-lg font-semibold text-primary mb-2">{step.title}</h4>
                                                        <p className="text-sm text-tertiary leading-relaxed">{step.description}</p>
                                                    </div>
                                                    
                                                    {/* CTA Footer */}
                                                    <div className="flex items-center justify-end gap-4 pt-4 mt-auto border-t border-secondary/10">
                                                        <a 
                                                            href="#" 
                                                            className="flex items-center gap-1 text-sm text-tertiary hover:text-secondary transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span>Learn more</span>
                                                            <LinkExternal01 className="w-4 h-4" />
                                                        </a>
                                                        <a 
                                                            href={step.href} 
                                                            className="flex items-center gap-1 text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span>Setup</span>
                                                            <ArrowRight className="w-4 h-4" />
                                                        </a>
                                                    </div>
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
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

