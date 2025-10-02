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
                id: "customize-navigation",
                title: "Customize Navigation",
                description: "Hit the save changes button in the design studio",
                icon: BarChartSquare02,
                status: "pending",
                required: true,
                href: "/admin2/site?startTour=true",
                image: "/pic/onboarding/customize-navigation.jpg"
            },
            {
                id: "customize-space",
                title: "Customize a Space You Created",
                description: "Hit the save changes button in the design studio",
                icon: Database01,
                status: "pending",
                required: true,
                href: "/admin2/site/spaces/create?startTour=true",
                image: "/pic/onboarding/customize-spaces.jpg"
            },
            {
                id: "setup-permissions",
                title: "Setup Permissions Site Settings",
                description: "Finishing the tour guide",
                icon: Settings01,
                status: "pending",
                required: false,
                href: "/admin2/setting/site-settings",
                image: "/pic/onboarding/moderation-rules.jpg"
            },
            {
                id: "invite-teammates",
                title: "Invite Your Teammates",
                description: "Finishing the tour guide",
                icon: Users01,
                status: "pending",
                required: false,
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
                id: "member-profile-fields",
                title: "Add Member Profile Fields",
                description: "Finishing the tour guide",
                icon: Users01,
                status: "pending",
                required: false,
                href: "/admin2/people",
                image: "/pic/onboarding/customize-member-profile.jpg"
            },
            {
                id: "appearance-settings",
                title: "Customize Appearance Settings",
                description: "Finishing the tour guide",
                icon: Palette,
                status: "pending",
                required: true,
                href: "/admin2/site-settings",
                image: "/pic/onboarding/customize-theme.jpg"
            },
            {
                id: "setup-messaging",
                title: "Setup Messaging",
                description: "Finishing the tour guide",
                icon: MessageChatCircle,
                status: "pending",
                required: false,
                href: "/admin2/setting",
                image: "/pic/onboarding/create-your-first-post.jpg"
            },
            {
                id: "custom-domain",
                title: "Setup the Custom Domain",
                description: "Finish the wizard!",
                icon: CodeBrowser,
                status: "pending",
                required: true,
                href: "/admin2/site",
                image: "/pic/onboarding/update-community-name.jpg"
            },
            {
                id: "login-methods",
                title: "Setup Login Methods Authentication",
                description: "Finishing the tour guide",
                icon: Lock01,
                status: "pending",
                required: false,
                href: "/admin2/setting/authentication",
                image: "/pic/onboarding/social-login.jpg"
            },
            {
                id: "email-domain",
                title: "Setup Custom Email Domain",
                description: "Finishing the tour guide",
                icon: MessageChatCircle,
                status: "pending",
                required: false,
                href: "/admin2/setting",
                image: "/pic/onboarding/manage-staff-seats.jpg"
            },
            {
                id: "notifications",
                title: "Managing Notifications & Email digest",
                description: "Save to send the notifications at all!",
                icon: Settings01,
                status: "pending",
                required: true,
                href: "/admin2/setting",
                image: "/pic/onboarding/manage-staff-seats.jpg"
            },
            {
                id: "localization",
                title: "Setup Localization",
                description: "Finishing the tour guide",
                icon: Settings01,
                status: "pending",
                required: false,
                href: "/admin2/setting",
                image: "/pic/onboarding/customize-theme.jpg"
            },
            {
                id: "seo-settings",
                title: "Setup Site SEO settings",
                description: "Finishing the tour guide",
                icon: BarChartSquare02,
                status: "pending",
                required: false,
                href: "/admin2/setting",
                image: "/pic/onboarding/build-app.jpg"
            },
            {
                id: "add-post",
                title: "Add a Post",
                description: "Finishing the tour guide",
                icon: Plus,
                status: "pending",
                required: false,
                href: "/admin2/content2",
                image: "/pic/onboarding/create-your-first-post.jpg"
            }
        ]
    },
    {
        id: "launch",
        title: "Launch",
        description: "Advanced features",
        steps: [
            {
                id: "security-privacy",
                title: "Setup Security & Privacy",
                description: "Finishing the tour guide",
                icon: Lock01,
                status: "pending",
                required: false,
                href: "/admin2/setting/site-settings",
                image: "/pic/onboarding/moderation-rules.jpg"
            },
            {
                id: "setup-moderation",
                title: "Setup Moderation",
                description: "Update the AI spam detector and keyword moderation",
                icon: Settings01,
                status: "pending",
                required: true,
                href: "/admin2/setting",
                image: "/pic/onboarding/moderation-rules.jpg"
            },
            {
                id: "setup-integrations",
                title: "Setup Integrations",
                description: "Finishing the tour guide",
                icon: Data,
                status: "pending",
                required: false,
                href: "/admin2/appstore",
                image: "/pic/onboarding/explore-apps.jpg"
            },
            {
                id: "invite-members",
                title: "Invite Members",
                description: "Invite at least one member",
                icon: Users01,
                status: "pending",
                required: true,
                href: "/admin2/people",
                image: "/pic/onboarding/invite-members.jpg"
            },
            {
                id: "publish-go-live",
                title: "Publish and Go Live!",
                description: "Launch your community to the world",
                icon: Rocket01,
                status: "pending",
                required: true,
                href: "/admin2/site",
                image: "/pic/onboarding/build-app.jpg"
            }
        ]
    }
];

export const AdminOnboardingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAdmin, adminHeaderVisible, toggleAdminHeader } = useAdmin();
    const [showOnboardingHub, setShowOnboardingHub] = useState(false);
    
    // Check if onboarding is fully completed (all required tasks + "Publish and Go Live!")
    const isOnboardingFullyCompleted = () => {
        // Check if all required steps are completed
        const allRequiredCompleted = dynamicOnboardingCategories.every((category: any) => 
            areRequiredStepsCompleted(category.id)
        );
        
        // Check if "Publish and Go Live!" is specifically completed
        const publishStep = dynamicOnboardingCategories
            .find((cat: any) => cat.id === 'launch')
            ?.steps.find((step: any) => step.id === 'publish-go-live');
        
        const publishCompleted = publishStep?.status === 'completed';
        
        return allRequiredCompleted && publishCompleted;
    };
    
    // Icon mapping for localStorage compatibility
    const iconMap: Record<string, any> = {
        'BarChartSquare02': BarChartSquare02,
        'Database01': Database01,
        'Settings01': Settings01,
        'Users01': Users01,
        'Palette': Palette,
        'MessageChatCircle': MessageChatCircle,
        'CodeBrowser': CodeBrowser,
        'Lock01': Lock01,
        'Plus': Plus,
        'Data': Data,
        'Rocket01': Rocket01
    };

    // Helper function to serialize onboarding data for localStorage
    const serializeOnboardingData = (data: typeof onboardingCategories) => {
        return data.map(category => ({
            ...category,
            steps: category.steps.map(step => ({
                ...step,
                icon: step.icon?.name || 'Settings01' // Store icon name instead of component
            }))
        }));
    };

    // Helper function to deserialize onboarding data from localStorage
    const deserializeOnboardingData = (data: any) => {
        return data.map((category: any) => ({
            ...category,
            steps: category.steps.map((step: any) => {
                // Find the original step to get the correct icon
                const originalCategory = onboardingCategories.find(cat => cat.id === category.id);
                const originalStep = originalCategory?.steps.find(s => s.id === step.id);
                
                return {
                    ...step,
                    icon: originalStep?.icon || iconMap[step.icon] || Settings01 // Use original icon first, then mapped icon, then fallback
                };
            })
        }));
    };

    // State for dynamic onboarding data with localStorage persistence
    const [dynamicOnboardingCategories, setDynamicOnboardingCategories] = useState(() => {
        const saved = localStorage.getItem('onboarding-progress');
        console.log('Loading onboarding data from localStorage:', saved);
        if (saved) {
            try {
                const parsedData = JSON.parse(saved);
                console.log('Parsed localStorage data:', parsedData);
                const deserializedData = deserializeOnboardingData(parsedData);
                console.log('Deserialized data:', deserializedData);
                return deserializedData;
            } catch (error) {
                console.error('Error parsing saved onboarding data:', error);
                return onboardingCategories;
            }
        }
        console.log('No saved data, using default onboardingCategories');
        return onboardingCategories;
    });

    // Helper functions for step logic using dynamic data
    const getRequiredStepsForCategory = (categoryId: string) => {
        const category = dynamicOnboardingCategories.find((cat: any) => cat.id === categoryId);
        return category?.steps.filter((step: any) => step.required) || [];
    };

    const areRequiredStepsCompleted = (categoryId: string) => {
        const requiredSteps = getRequiredStepsForCategory(categoryId);
        return requiredSteps.every((step: any) => step.status === 'completed');
    };

    const isCategoryLocked = (categoryId: string) => {
        if (categoryId === 'onboarding') return false; // Onboarding is never locked
        if (categoryId === 'setup') {
            return !areRequiredStepsCompleted('onboarding');
        }
        if (categoryId === 'launch') {
            return !areRequiredStepsCompleted('onboarding') || !areRequiredStepsCompleted('setup');
        }
        return false;
    };

    // New helper functions for section completion logic
    const getActiveSections = () => {
        const sections = [];
        
        // Add sections that still have required steps pending OR are locked (to show them)
        for (const category of dynamicOnboardingCategories) {
            if (!areRequiredStepsCompleted(category.id)) {
                sections.push(category);
            }
        }
        
        return sections;
    };

    const getAdditionalSteps = () => {
        const additionalSteps = [];
        
        // Collect optional steps from completed sections
        for (const category of dynamicOnboardingCategories) {
            if (areRequiredStepsCompleted(category.id)) {
                const optionalSteps = category.steps.filter((step: any) => 
                    !step.required && step.status === 'pending'
                );
                additionalSteps.push(...optionalSteps);
            }
        }
        
        return additionalSteps;
    };

    const getDisplayCategories = () => {
        const activeSections = getActiveSections();
        const additionalSteps = getAdditionalSteps();
        
        const displayCategories = [...activeSections];
        
        // Add "Additional Steps" section if there are optional steps from completed sections
        if (additionalSteps.length > 0) {
            displayCategories.push({
                id: 'additional-steps',
                title: 'Additional Steps',
                description: 'Optional enhancements for your community',
                steps: additionalSteps
            });
        }
        
        return displayCategories;
    };

    const getCompletedStepsCount = () => {
        return dynamicOnboardingCategories.reduce((total: number, category: any) => {
            return total + category.steps.filter((step: any) => step.status === 'completed').length;
        }, 0);
    };

    const getTotalStepsCount = () => {
        return dynamicOnboardingCategories.reduce((total: number, category: any) => {
            return total + category.steps.length;
        }, 0);
    };

    const getProgressPercentage = () => {
        const completed = getCompletedStepsCount();
        const total = getTotalStepsCount();
        return Math.round((completed / total) * 100);
    };

    const getRequiredStepsCount = () => {
        return dynamicOnboardingCategories.reduce((total: number, category: any) => {
            return total + category.steps.filter((step: any) => step.required).length;
        }, 0);
    };

    const getCompletedRequiredStepsCount = () => {
        return dynamicOnboardingCategories.reduce((total: number, category: any) => {
            return total + category.steps.filter((step: any) => step.required && step.status === 'completed').length;
        }, 0);
    };

    const getRemainingRequiredStepsCount = () => {
        return getRequiredStepsCount() - getCompletedRequiredStepsCount();
    };

    const getRequiredProgressPercentage = () => {
        const completedRequired = getCompletedRequiredStepsCount();
        const totalRequired = getRequiredStepsCount();
        if (totalRequired === 0) return 0;
        
        // Divide into 9 segments: 1 filled by default + 8 for required steps
        // Each segment = 100% / 9 = ~11.11%
        const segmentSize = 100 / 9;
        const baseProgress = segmentSize; // 1 segment filled by default (~11.11%)
        const calculatedProgress = baseProgress + (completedRequired * segmentSize);
        return Math.min(calculatedProgress, 100);
    };

    // Listen for onboarding step completion events
    useEffect(() => {
        const handleStepCompleted = (event: CustomEvent) => {
            const { stepId, categoryId } = event.detail;
            console.log(`Updating step ${stepId} in category ${categoryId} to completed`);
            
            setDynamicOnboardingCategories((currentData: any) => {
                let updatedData;
                
                // If step 1 (customize-navigation) is completed, mark all steps as completed
                if (stepId === 'customize-navigation') {
                    updatedData = currentData.map((category: any) => ({
                        ...category,
                        steps: category.steps.map((step: any) => ({
                            ...step,
                            status: 'completed' as const
                        }))
                    }));
                } else {
                    // For other steps, just mark the specific step as completed
                    updatedData = currentData.map((category: any) => 
                        category.id === categoryId 
                            ? {
                                ...category,
                                steps: category.steps.map((step: any) => 
                                    step.id === stepId 
                                        ? { ...step, status: 'completed' as const }
                                        : step
                                )
                            }
                            : category
                    );
                }
                
                // Persist to localStorage with serialization
                localStorage.setItem('onboarding-progress', JSON.stringify(serializeOnboardingData(updatedData)));
                return updatedData;
            });
        };

        window.addEventListener('onboarding-step-completed', handleStepCompleted as EventListener);
        
        return () => {
            window.removeEventListener('onboarding-step-completed', handleStepCompleted as EventListener);
        };
    }, []);

    // Auto-show onboarding hub when fully completed
    useEffect(() => {
        if (isOnboardingFullyCompleted()) {
            setShowOnboardingHub(true);
        }
    }, [dynamicOnboardingCategories]);

    // Keyboard event handlers
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'o') {
                setShowOnboardingHub(prev => !prev);
            }
            
            if (event.key.toLowerCase() === 'x') {
                console.log('Resetting onboarding progress to default state...');
                
                // Reset to default onboarding data
                setDynamicOnboardingCategories(onboardingCategories);
                
                // Hide onboarding hub to show only Welcome Section
                setShowOnboardingHub(false);
                
                // Clear localStorage
                localStorage.removeItem('onboarding-progress');
                
                // Dispatch event to update other components
                const resetEvent = new CustomEvent('onboarding-reset', { detail: { reset: true } });
                window.dispatchEvent(resetEvent);
                
                console.log('Onboarding progress reset complete');
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
                        {/* Full Height Welcome Section - Hidden when onboarding is fully completed */}
                        {!isOnboardingFullyCompleted() && (
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
                                                        <span className="text-xs text-primary font-bold">{getRemainingRequiredStepsCount()} required steps remaining</span>
                                                    </div>
                                                    <p className="text-xs text-tertiary">Track and complete every stage from onboarding to launch</p>
                                                </div>
                                                
                                                <div className="mb-6">
                                                    {/* Header */}

                                                    
                                                    {/* Progress Bar */}
                                                    <div className="mb-4">

                                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                            <div 
                                                                className="bg-brand-solid h-2 rounded-full transition-all duration-300 ease-out"
                                                                style={{ width: `${getRequiredProgressPercentage()}%` }}
                                                            ></div>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <span className="text-xs text-tertiary">Get Started</span>
                                                            <span className="text-xs text-tertiary">Publish and Go Live!</span>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Deep Enhanced Step List */}
                                            <div className="bg-gradient-to-br from-secondary via-primary to-secondary/50 rounded-2xl p-4 border border-secondary shadow-lg">
                                                
                                                <div className="max-h-72 overflow-y-auto scrollbar-thin space-y-3 pr-2">
                                                {/* Global Recommended Next Step */}
                                                {(() => {
                                                    // Find the first required pending step across all display categories
                                                    const firstRequiredPendingStep = (() => {
                                                        for (const cat of getDisplayCategories()) {
                                                            if (isCategoryLocked(cat.id)) continue;
                                                            const requiredPendingStep = cat.steps.find((s: any) => s.status === 'pending' && s.required);
                                                            if (requiredPendingStep) return { step: requiredPendingStep, categoryId: cat.id };
                                                        }
                                                        return null;
                                                    })();
                                                    
                                                    if (!firstRequiredPendingStep) return null;
                                                    
                                                    const IconComponent = firstRequiredPendingStep.step.icon;
                                                    
                                                    return (
                                                        <div>
                                                        </div>
                                                    );
                                                })()}
                                                
                                                {/* Categorized Pending Steps */}
                                                {getDisplayCategories().map((category: any) => {
                                                    // Find the global recommended step to exclude it from category lists
                                                    const globalRecommendedStep = (() => {
                                                        for (const cat of getDisplayCategories()) {
                                                            if (isCategoryLocked(cat.id)) continue;
                                                            const requiredPendingStep = cat.steps.find((s: any) => s.status === 'pending' && s.required);
                                                            if (requiredPendingStep) return requiredPendingStep;
                                                        }
                                                        return null;
                                                    })();
                                                    
                                                    // Filter out the recommended step from category display, show both pending and completed steps
                                                    const visibleSteps = category.steps.filter((step: any) => 
                                                        step.id !== globalRecommendedStep?.step?.id
                                                    );
                                                    if (visibleSteps.length === 0) return null;
                                                    
                                                    const isLocked = isCategoryLocked(category.id);
                                                    
                                                    return (
                                                        <div key={category.id} className="space-y-2">
                                                            {/* Category Label */}
                                                            <div className="flex items-center justify-between px-2">
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`w-2 h-2 rounded-full ${
                                                                        category.id === 'onboarding' ? 'bg-brand-solid' :
                                                                        category.id === 'setup' ? 'bg-brand-secondary' :
                                                                        category.id === 'additional-steps' ? 'bg-gray-500' :
                                                                        'bg-purple-500'
                                                                    }`}></div>
                                                                    <h5 className={`text-xs font-semibold uppercase tracking-wide ${
                                                                        isLocked ? 'text-tertiary/50' : 'text-tertiary'
                                                                    }`}>
                                                                        {category.title}
                                                                    </h5>
                                                                    {isLocked && (
                                                                        <Lock01 className="w-3 h-3 text-tertiary/50" />
                                                                    )}
                                                                </div>
                                                                {isLocked ? (
                                                                    <div className="flex items-center gap-1 text-xs text-tertiary/60 italic">
                                                                        <span>Complete</span>
                                                                        <div className="w-3 h-3 bg-brand-primary_alt rounded-full flex items-center justify-center">
                                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full"></div>
                                                                        </div>
                                                                        <span>required steps to unlock</span>
                                                                    </div>
                                                                ) : category.id === 'additional-steps' ? (
                                                                    <div className="flex items-center gap-1 text-xs text-tertiary/60">
                                                                        <div className="w-3 h-3 bg-gray-200 rounded-full flex items-center justify-center">
                                                                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                                                                        </div>
                                                                        <span>Optional</span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-1 text-xs text-tertiary/60">
                                                                        <div className="w-3 h-3 bg-brand-primary_alt rounded-full flex items-center justify-center">
                                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full"></div>
                                                                        </div>
                                                                        <span>Required</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            
                                                            {/* Category Steps */}
                                                            {(() => {
                                                                // Find the first required pending step across all display categories
                                                                const firstRequiredPendingStep = (() => {
                                                                    for (const cat of getDisplayCategories()) {
                                                                        if (isCategoryLocked(cat.id)) continue;
                                                                        const requiredPendingStep = cat.steps.find((s: any) => s.status === 'pending' && s.required);
                                                                        if (requiredPendingStep) return requiredPendingStep;
                                                                    }
                                                                    return null;
                                                                })();
                                                                
                                                                // Sort steps so recommended step comes first
                                                                const sortedSteps = [...visibleSteps].sort((a, b) => {
                                                                    const aIsRecommended = a.id === firstRequiredPendingStep?.id;
                                                                    const bIsRecommended = b.id === firstRequiredPendingStep?.id;
                                                                    if (aIsRecommended && !bIsRecommended) return -1;
                                                                    if (!aIsRecommended && bIsRecommended) return 1;
                                                                    return 0;
                                                                });
                                                                
                                                                return sortedSteps.map((step: any, index: number) => {
                                                                    const isRecommended = step.id === firstRequiredPendingStep?.id;
                                                                const IconComponent = step.icon;
                                                                
                                                                return (
                                                                    <div 
                                                                        key={step.id}
                                                                        className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                                                                            step.status === 'completed'
                                                                                ? 'bg-brand-solid/5 border border-brand-solid/20 opacity-70 hover:opacity-90'
                                                                                : isRecommended 
                                                                                    ? 'bg-gradient-to-r from-brand-primary_alt to-brand-secondary/10 border-2 border-brand-secondary hover:shadow-lg transform hover:-translate-y-0.5'
                                                                                    : isLocked
                                                                                        ? 'bg-secondary/50 border border-secondary/50 opacity-50 cursor-not-allowed'
                                                                                        : 'bg-secondary border border-secondary hover:bg-brand-primary_alt/20'
                                                                        }`}
                                                                        onClick={() => {
                                                                            if (isLocked) return;
                                                                            
                                                                            // If step is already completed, navigate to href (like "Redo")
                                                                            if (step.status === 'completed') {
                                                                                navigate(step.href);
                                                                                return;
                                                                            }
                                                                            
                                                                            // Step 1 navigates to tour guide, all others mark as completed
                                                                            if (step.id === 'customize-navigation') {
                                                                                navigate(step.href);
                                                                            } else {
                                                                                // For additional steps, find the original category
                                                                                let originalCategoryId = category.id;
                                                                                if (category.id === 'additional-steps') {
                                                                                    // Find the original category for this step
                                                                                    for (const originalCat of dynamicOnboardingCategories) {
                                                                                        if (originalCat.steps.some((s: any) => s.id === step.id)) {
                                                                                            originalCategoryId = originalCat.id;
                                                                                            break;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                
                                                                                // Mark step as completed
                                                                                const event = new CustomEvent('onboarding-step-completed', {
                                                                                    detail: { stepId: step.id, categoryId: originalCategoryId }
                                                                                });
                                                                                window.dispatchEvent(event);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <IconComponent className={`w-5 h-5 flex-shrink-0 ${
                                                                            step.status === 'completed' 
                                                                                ? 'text-brand-solid' 
                                                                                : isRecommended 
                                                                                    ? 'text-brand-secondary' 
                                                                                    : isLocked 
                                                                                        ? 'text-tertiary/50' 
                                                                                        : 'text-tertiary'
                                                                        }`} />
                                                                        <div className="flex-1">
                                                                            <div className="flex items-center gap-2 mb-1">
                                                                                <h4 className={`text-sm font-medium ${
                                                                                    step.status === 'completed'
                                                                                        ? 'text-brand-solid line-through'
                                                                                        : isRecommended 
                                                                                            ? 'font-semibold text-primary' 
                                                                                            : 'text-primary'
                                                                                }`}>
                                                                                    {step.title}
                                                                                </h4>
                                                                                {isRecommended && (
                                                                                    <Badge color="brand" size="sm">Recommended Next Step</Badge>
                                                                                )}
                                                                            {step.required && (
                                                                                <div className="w-3 h-3 bg-brand-primary_alt rounded-full flex items-center justify-center" title="Required">
                                                                                    <div className="w-1.5 h-1.5 bg-brand-solid rounded-full"></div>
                                                                                </div>
                                                                            )}
                                                                                {isLocked && (
                                                                                    <BadgeWithIcon 
                                                                                        type="pill-color" 
                                                                                        size="sm" 
                                                                                        color="gray" 
                                                                                        iconLeading={Lock01}
                                                                                    >
                                                                                        Locked
                                                                                    </BadgeWithIcon>
                                                                                )}
                                                                            </div>
                                                                            <p className="text-xs text-tertiary">{step.description}</p>
                                                                        </div>
                                                                        <div className={`${
                                                                            step.status === 'completed'
                                                                                ? 'text-brand-solid'
                                                                                : isRecommended 
                                                                                    ? 'text-brand-secondary' 
                                                                                    : 'text-tertiary'
                                                                        }`}>
                                                                            <ArrowRight className="w-4 h-4" />
                                                                        </div>
                                                                    </div>
                                                                );
                                                                });
                                                            })()}
                                                        </div>
                                                    );
                                                })}

                                                {/* Enhanced Completed Steps Section */}
                                                {/* Dynamic Completed Steps Section */}
                                                {(() => {
                                                    const completedSteps = dynamicOnboardingCategories.flatMap((category: any) => 
                                                        category.steps.filter((step: any) => step.status === 'completed')
                                                    );
                                                    
                                                    // Always show completed section (has mock items + dynamic items)
                                                    
                                                    return (
                                                        <div className="pt-4 mt-4 border-t border-secondary/50">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-5 h-5 bg-brand-solid/20 rounded-lg flex items-center justify-center">
                                                                        <CheckCircle className="w-3 h-3 text-brand-solid" />
                                                                    </div>
                                                                    <h5 className="text-xs font-semibold text-brand-solid">Completed Tasks</h5>
                                                                </div>
                                                                <div className="text-xs text-brand-solid/70 font-medium">{2 + completedSteps.length} done</div>
                                                            </div>
                                                            
                                                            {/* Mock completed steps */}
                                                            <div className="flex items-center gap-3 p-2 bg-brand-solid/5 border border-brand-solid/20 rounded-lg cursor-pointer opacity-60 transition-all duration-300 mb-2 hover:opacity-80">
                                                                <Users01 className="w-4 h-4 text-brand-solid flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <h4 className="text-xs font-medium text-brand-solid line-through">Create a new community</h4>
                                                                </div>
                                                                <div className="w-4 h-4 bg-brand-solid rounded-full flex items-center justify-center">
                                                                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="flex items-center gap-3 p-2 bg-brand-solid/5 border border-brand-solid/20 rounded-lg cursor-pointer opacity-60 transition-all duration-300 mb-2 hover:opacity-80">
                                                                <Database01 className="w-4 h-4 text-brand-solid flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <h4 className="text-xs font-medium text-brand-solid line-through">Initial Setup Complete</h4>
                                                                </div>
                                                                <div className="w-4 h-4 bg-brand-solid rounded-full flex items-center justify-center">
                                                                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Dynamic completed steps */}
                                                            {completedSteps.map((step: any) => {
                                                                const IconComponent = step.icon;
                                                                return (
                                                                    <div key={step.id} className="flex items-center gap-3 p-2 bg-brand-solid/5 border border-brand-solid/20 rounded-lg cursor-pointer opacity-60 transition-all duration-300 mb-2 hover:opacity-80">
                                                                        <IconComponent className="w-4 h-4 text-brand-solid flex-shrink-0" />
                                                                        <div className="flex-1">
                                                                            <h4 className="text-xs font-medium text-brand-solid line-through">{step.title}</h4>
                                                                        </div>
                                                                        <div className="w-4 h-4 bg-brand-solid rounded-full flex items-center justify-center">
                                                                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    );
                                                })()}
                                                </div>
                                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        )}

                        {/* Onboarding Hub Section - Separate scrollable section - Show when fully completed or toggled with 'O' key */}
                        {(showOnboardingHub || isOnboardingFullyCompleted()) && (
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
                                                
                                                <h3 className="text-lg font-semibold text-primary mb-2">
                                                    Get to know Bettermode
                                                </h3>
                                                
                                                <p className="text-sm text-tertiary leading-relaxed mb-4">
                                                    Take a tour around administration and learn how to create collections and spaces to organize your community.
                                                </p>
                                                
                                                <div className="flex items-center gap-4">
                                                    <a href="#" className="flex items-center gap-1 text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors">
                                                        <span>Academy</span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </a>
                                                    <a href="#" className="flex items-center gap-1 text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors">
                                                        <span>Help Center</span>
                                                        <ArrowRight className="w-4 h-4" />
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
                                                    <p className="text-white font-medium text-sm">Getting Started with Bettermode</p>
                                                </div>
                        </div>
                        </div>
                    </div>

                                    {/* Bottom Section - Onboarding Categories as Horizontal Sections */}
                                    <div className="space-y-12">
                        {dynamicOnboardingCategories.map((category: any, categoryIndex: number) => (
                            <div key={category.id} className="">
                                
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
                                    {category.steps.map((step: any, stepIndex: number) => {
                                        const IconComponent = step.icon;
                                        
                                        return (
                                        <div 
                                            key={step.id}
                                            className="bg-white border border-secondary rounded-lg transition-colors cursor-pointer flex flex-col hover:border-primary"
                                            onClick={() => {
                                                // Step 1 navigates to tour guide, all others mark as completed
                                                if (step.id === 'customize-navigation') {
                                                    navigate(step.href);
                                                } else {
                                                    // Mark step as completed
                                                    const event = new CustomEvent('onboarding-step-completed', {
                                                        detail: { stepId: step.id, categoryId: category.id }
                                                    });
                                                    window.dispatchEvent(event);
                                                }
                                            }}
                                        >
                                            {/* Card Content */}
                                            <div className="p-6 h-full flex flex-col">
                                                {/* Header with Icon and Badge */}
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="relative shrink-0 rounded-lg h-10 w-10" title={step.title}>
                                                        <div className="shrink-0 rounded-lg h-10 w-10 bg-gradient-to-br from-brand-primary_alt to-brand-secondary/20 flex items-center justify-center">
                                                            <IconComponent className="w-5 h-5 text-brand-secondary" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-end gap-2">
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
                                                        
                                                        {/* Pending Badge for pending steps */}
                                                        {step.status === 'pending' && (
                                                            <Badge 
                                                                type="pill-color" 
                                                                size="sm" 
                                                                color="gray"
                                                            >
                                                                Pending
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                {/* Title and Description */}
                                                <div className="flex-1 mb-4">
                                                    <h4 className="text-lg font-semibold text-primary mb-2">{step.title}</h4>
                                                    <p className="text-sm text-tertiary leading-relaxed">{step.description}</p>
                                                </div>
                                                
                                                {/* CTA Footer - Always at bottom */}
                                                <div className="flex items-center justify-end pt-4 border-t border-secondary/10 mt-auto">
                                                        {step.status === 'completed' ? (
                                                            <a 
                                                                href={step.href} 
                                                                className="flex items-center gap-1 text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <span>Redo</span>
                                                                <ArrowRight className="w-4 h-4" />
                                                            </a>
                                                        ) : (
                                                            <>
                                                                <a 
                                                                    href="#" 
                                                                    className="flex items-center gap-1 text-sm text-tertiary hover:text-secondary transition-colors mr-4"
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
                                                            </>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        );
                                    })}
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

