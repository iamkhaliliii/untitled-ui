import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Rocket01, X, MessageChatCircle, Database01, Users01, CodeBrowser, Settings01, Palette, BarChartSquare02, Data, Plus, ArrowRight, Lock01 } from "@untitledui/icons";
import { ProgressWidget } from "./progress-widget";

// Types for onboarding data
interface OnboardingStep {
    id: string;
    title: string;
    status: 'pending' | 'completed';
    required: boolean;
    href: string;
    icon?: any;
}

interface OnboardingCategory {
    id: string;
    title: string;
    steps: OnboardingStep[];
}

// Onboarding data matching the main onboarding page
const onboardingCategories: OnboardingCategory[] = [
    {
        id: "onboarding",
        title: "Onboarding",
        steps: [
            { id: "customize-navigation", title: "Customize Navigation", status: "pending", required: true, href: "/admin2/site?startTour=true", icon: BarChartSquare02 },
            { id: "customize-space", title: "Customize a Space You Created", status: "pending", required: true, href: "/admin2/site/spaces/create?startTour=true", icon: Database01 },
            { id: "setup-permissions", title: "Setup Permissions Site Settings", status: "pending", required: false, href: "/admin2/setting/site-settings", icon: Settings01 },
            { id: "invite-teammates", title: "Invite Your Teammates", status: "pending", required: false, href: "/admin2/people", icon: Users01 }
        ]
    },
    {
        id: "setup",
        title: "Setup",
        steps: [
            { id: "member-profile-fields", title: "Add Member Profile Fields", status: "pending", required: false, href: "/admin2/people", icon: Users01 },
            { id: "appearance-settings", title: "Customize Appearance Settings", status: "pending", required: true, href: "/admin2/site-settings", icon: Palette },
            { id: "setup-messaging", title: "Setup Messaging", status: "pending", required: false, href: "/admin2/setting", icon: MessageChatCircle },
            { id: "custom-domain", title: "Setup the Custom Domain", status: "pending", required: true, href: "/admin2/site", icon: CodeBrowser },
            { id: "login-methods", title: "Setup Login Methods Authentication", status: "pending", required: false, href: "/admin2/setting/authentication", icon: Lock01 },
            { id: "email-domain", title: "Setup Custom Email Domain", status: "pending", required: false, href: "/admin2/setting", icon: MessageChatCircle },
            { id: "notifications", title: "Managing Notifications & Email digest", status: "pending", required: true, href: "/admin2/setting", icon: Settings01 },
            { id: "localization", title: "Setup Localization", status: "pending", required: false, href: "/admin2/setting", icon: Settings01 },
            { id: "seo-settings", title: "Setup Site SEO settings", status: "pending", required: false, href: "/admin2/setting", icon: BarChartSquare02 },
            { id: "add-post", title: "Add a Post", status: "pending", required: false, href: "/admin2/content2", icon: Plus }
        ]
    },
    {
        id: "launch",
        title: "Launch",
        steps: [
            { id: "security-privacy", title: "Setup Security & Privacy", status: "pending", required: false, href: "/admin2/setting/site-settings", icon: Lock01 },
            { id: "setup-moderation", title: "Setup Moderation", status: "pending", required: true, href: "/admin2/setting", icon: Settings01 },
            { id: "setup-integrations", title: "Setup Integrations", status: "pending", required: false, href: "/admin2/appstore", icon: Data },
            { id: "invite-members", title: "Invite Members", status: "pending", required: true, href: "/admin2/people", icon: Users01 },
            { id: "publish-go-live", title: "Publish and Go Live!", status: "pending", required: true, href: "/admin2/site", icon: Rocket01 }
        ]
    }
];

export const FloatingProgressButton = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showSimplePopover, setShowSimplePopover] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
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

    // Helper function to deserialize onboarding data from localStorage
    const deserializeOnboardingData = (data: any): OnboardingCategory[] => {
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

    // State for onboarding progress with localStorage persistence
    const [onboardingData, setOnboardingData] = useState<OnboardingCategory[]>(() => {
        const saved = localStorage.getItem('onboarding-progress');
        if (saved) {
            try {
                const parsedData = JSON.parse(saved);
                return deserializeOnboardingData(parsedData);
            } catch (error) {
                console.error('Error parsing saved onboarding data:', error);
                return onboardingCategories;
            }
        }
        return onboardingCategories;
    });
    
    // State for success message
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successData, setSuccessData] = useState<{completedStep: string, nextStep: string} | null>(null);

    // Helper functions using dynamic onboarding data
    const getRequiredStepsForCategory = (categoryId: string) => {
        const category = onboardingData.find((cat: OnboardingCategory) => cat.id === categoryId);
        return category?.steps.filter((step: OnboardingStep) => step.required) || [];
    };

    const areRequiredStepsCompleted = (categoryId: string) => {
        const requiredSteps = getRequiredStepsForCategory(categoryId);
        return requiredSteps.every((step: OnboardingStep) => step.status === 'completed');
    };

    const isCategoryLocked = (categoryId: string) => {
        if (categoryId === 'onboarding') return false;
        if (categoryId === 'setup') {
            return !areRequiredStepsCompleted('onboarding');
        }
        if (categoryId === 'launch') {
            return !areRequiredStepsCompleted('onboarding') || !areRequiredStepsCompleted('setup');
        }
        return false;
    };

    const getRequiredStepsCount = () => {
        return onboardingData.reduce((total: number, category: OnboardingCategory) => {
            return total + category.steps.filter((step: OnboardingStep) => step.required).length;
        }, 0);
    };

    const getCompletedRequiredStepsCount = () => {
        return onboardingData.reduce((total: number, category: OnboardingCategory) => {
            return total + category.steps.filter((step: OnboardingStep) => step.required && step.status === 'completed').length;
        }, 0);
    };

    const getRemainingRequiredStepsCount = () => {
        return getRequiredStepsCount() - getCompletedRequiredStepsCount();
    };

    const getRequiredProgressPercentage = () => {
        const completedRequired = getCompletedRequiredStepsCount();
        const totalRequired = getRequiredStepsCount();
        if (totalRequired === 0) return 0;
        
        // Show progress up to Onboarding phase (25% minimum)
        const baseProgress = 25;
        const calculatedProgress = Math.round((completedRequired / totalRequired) * 100);
        return Math.max(baseProgress, calculatedProgress);
    };

    // Listen for onboarding step completion events
    useEffect(() => {
        const handleStepCompleted = (event: CustomEvent) => {
            const { stepId, categoryId } = event.detail;
            console.log(`Updating step ${stepId} in category ${categoryId} to completed`);
            
            const updatedData = onboardingData.map((category: OnboardingCategory) => 
                category.id === categoryId 
                    ? {
                        ...category,
                        steps: category.steps.map((step: OnboardingStep) => 
                            step.id === stepId 
                                ? { ...step, status: 'completed' as const }
                                : step
                        )
                    }
                    : category
            );
            
            setOnboardingData(updatedData);
            console.log('FloatingProgressButton: Updated onboarding data:', updatedData);
            
            // Also save to localStorage to ensure persistence
            const serializedData = updatedData.map((category: OnboardingCategory) => ({
                ...category,
                steps: category.steps.map((step: OnboardingStep) => ({
                    ...step,
                    icon: step.icon?.name || 'Settings01' // Store icon name instead of component
                }))
            }));
            localStorage.setItem('onboarding-progress', JSON.stringify(serializedData));
            console.log('FloatingProgressButton: Saved to localStorage:', serializedData);
        };

        window.addEventListener('onboarding-step-completed', handleStepCompleted as EventListener);
        
        return () => {
            window.removeEventListener('onboarding-step-completed', handleStepCompleted as EventListener);
        };
    }, []);

    // Listen for success message events
    useEffect(() => {
        const handleShowSuccess = (event: CustomEvent) => {
            const { completedStep, nextStep } = event.detail;
            console.log(`Showing success message for completed step: ${completedStep}`);
            
            setSuccessData({ completedStep, nextStep });
            setShowSuccessMessage(true);
            setIsOpen(true); // Open the main popover
            setShowSimplePopover(false); // Hide simple popover
            
            // Don't auto-hide - user must click "Got it"
        };

        window.addEventListener('show-progress-success', handleShowSuccess as EventListener);
        
        return () => {
            window.removeEventListener('show-progress-success', handleShowSuccess as EventListener);
        };
    }, []);

    // Listen for onboarding reset events
    useEffect(() => {
        const handleReset = (event: CustomEvent) => {
            if (event.detail.reset) {
                console.log('FloatingProgressButton: Resetting onboarding data to default');
                setOnboardingData(onboardingCategories);
                setShowSuccessMessage(false);
                setSuccessData(null);
            }
        };

        window.addEventListener('onboarding-reset', handleReset as EventListener);
        
        return () => {
            window.removeEventListener('onboarding-reset', handleReset as EventListener);
        };
    }, []);

    const togglePopover = () => {
        setIsOpen(!isOpen);
        setShowSimplePopover(false); // Hide simple popover when main one opens
    };

    const closePopover = () => {
        setIsOpen(false);
    };

    const getNextRecommendedStep = () => {
        // Find first pending required step
        for (const category of onboardingData) {
            if (isCategoryLocked(category.id)) continue;
            const nextStep = category.steps.find((step: OnboardingStep) => step.status === 'pending' && step.required);
            if (nextStep) return nextStep;
        }
        // If no required steps, find first pending step
        for (const category of onboardingData) {
            if (isCategoryLocked(category.id)) continue;
            const nextStep = category.steps.find((step: OnboardingStep) => step.status === 'pending');
            if (nextStep) return nextStep;
        }
        return null;
    };

    const handleSimplePopoverClick = () => {
        setShowSimplePopover(false);
        const nextStep = getNextRecommendedStep();
        if (nextStep) {
            navigate(nextStep.href);
        }
    };

    const closeSimplePopover = () => {
        setShowSimplePopover(false);
    };

    // Show simple popover after 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSimplePopover(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Floating Buttons Container */}
            <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">
                {/* Progress Button - Left */}
                <button
                    ref={buttonRef}
                    onClick={() => {
                        togglePopover();
                        closeSimplePopover();
                    }}
                    className="bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 p-3 group min-w-[240px] ring-1 ring-white/10"
                    aria-label="View Progress"
                    style={{
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Rocket01 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                            {/* Progress indicator */}
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-medium text-white">Your Journey</div>
                            <div className="text-xs text-gray-300">{getRemainingRequiredStepsCount()} required steps to go live</div>
                        </div>
                    </div>
                </button>

                {/* Chat Button - Right */}
                <button
                    onClick={closeSimplePopover}
                    className="w-14 h-14 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-center group ring-1 ring-white/10"
                    aria-label="Chat Support"
                    style={{
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <MessageChatCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </button>
            </div>

            {/* Simple White Popover - Positioned exactly above "Your Journey" button (left button) */}
            {showSimplePopover && !isOpen && (() => {
                const nextStep = getNextRecommendedStep();
                if (!nextStep) return null;
                const IconComponent = nextStep.icon;
                
                return (
                    <div className="fixed bottom-[16px] right-[86px] z-40 animate-in slide-in-from-bottom-2 duration-300">
                        <div 
                            onClick={handleSimplePopoverClick}
                            className="bg-white dark:bg-gray-50 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-300 p-3 cursor-pointer hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:-translate-y-1"
                            style={{
                                height: '128px',
                                width: '256px',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <IconComponent className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-800 leading-tight">
                                        {nextStep.title}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-700 flex items-center gap-1">
                                        {nextStep.required && (
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        )}
                                        <span>Next step →</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeSimplePopover();
                                    }}
                                    className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Popover */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={closePopover}
                    />
                    
                    {/* Popover Content */}
                    <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-2 duration-200 max-w-sm">
                        <div 
                            className="bg-gray-900 border border-gray-700 rounded-xl w-full"
                            style={{
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                                <h3 className="text-sm font-semibold text-white">Setup Progress</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => navigate('/admin2/onboarding')}
                                        className="text-xs text-violet-400 hover:text-violet-300 underline transition-colors font-medium"
                                    >
                                        Onboarding Hub
                                    </button>
                                    <button
                                        onClick={closePopover}
                                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Progress Widget */}
                            <div className="p-4">
                                <ProgressWidget />
                            </div>
                            
                            {/* Success Message */}
                            {showSuccessMessage && successData && (
                                <div className="p-4 border-t border-gray-700 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-b border-green-600/40">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-green-300 mb-1">Step Completed! 🎉</h4>
                                            <p className="text-xs text-green-200/90 leading-relaxed">
                                                Now, you can start the{' '}
                                                <button
                                                    onClick={() => {
                                                        const nextStep = getNextRecommendedStep();
                                                        if (nextStep) {
                                                            navigate(nextStep.href);
                                                            setShowSuccessMessage(false);
                                                            setSuccessData(null);
                                                        }
                                                    }}
                                                    className="text-green-300 hover:text-green-200 underline hover:no-underline transition-colors font-medium"
                                                >
                                                    next recommended step
                                                </button>{' '}
                                                or explore more options in the{' '}
                                                <button
                                                    onClick={() => {
                                                        navigate('/admin2/onboarding');
                                                        setShowSuccessMessage(false);
                                                        setSuccessData(null);
                                                    }}
                                                    className="text-green-300 hover:text-green-200 underline hover:no-underline transition-colors font-medium"
                                                >
                                                    Onboarding Hub
                                                </button>.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => {
                                                setShowSuccessMessage(false);
                                                setSuccessData(null);
                                            }}
                                            className="text-gray-400 hover:text-gray-300 text-xs underline hover:no-underline transition-colors"
                                        >
                                            Got it
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Setup Steps */}
                            <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                                <div className="text-xs text-gray-400 mb-3">{getRemainingRequiredStepsCount()} required steps to go live:</div>
                                <div className="max-h-64 overflow-y-auto scrollbar-thin space-y-2">
                                    {/* Dynamic Steps by Category */}
                                    {onboardingData.map((category: OnboardingCategory) => {
                                        const pendingSteps = category.steps.filter((step: OnboardingStep) => step.status === 'pending');
                                        if (pendingSteps.length === 0) return null;
                                        
                                        const isLocked = isCategoryLocked(category.id);
                                        
                                        return (
                                            <div key={category.id} className="space-y-2">
                                                {/* Category Label */}
                                                <div className="flex items-center gap-2 px-2">
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        category.id === 'onboarding' ? 'bg-violet-500' :
                                                        category.id === 'setup' ? 'bg-blue-500' :
                                                        'bg-purple-500'
                                                    }`}></div>
                                                    <h5 className={`text-xs font-semibold uppercase tracking-wide ${
                                                        isLocked ? 'text-gray-500' : 'text-gray-400'
                                                    }`}>
                                                        {category.title}
                                                    </h5>
                                                    {isLocked && (
                                                        <Lock01 className="w-3 h-3 text-gray-500" />
                                                    )}
                                                </div>
                                                
                                                {/* Category Steps */}
                                                {pendingSteps.slice(0, 4).map((step: OnboardingStep, index: number) => {
                                                    const isRecommended = index === 0 && category.id === 'onboarding';
                                                    const IconComponent = step.icon;
                                                    
                                                    return (
                                                        <button 
                                                            key={step.id}
                                                            onClick={() => !isLocked && navigate(step.href)}
                                                            disabled={isLocked}
                                                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                                                                isRecommended 
                                                                    ? 'bg-violet-500/20 border border-violet-500/30 hover:bg-violet-500/30'
                                                                    : isLocked
                                                                        ? 'bg-gray-700/20 cursor-not-allowed opacity-50'
                                                                        : 'bg-gray-700/30 hover:bg-gray-700/50'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <IconComponent className={`w-4 h-4 flex-shrink-0 ${
                                                                    isRecommended ? 'text-violet-400' : isLocked ? 'text-gray-500' : 'text-gray-400'
                                                                }`} />
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="text-sm font-medium text-white">{step.title}</span>
                                                                        {isRecommended && (
                                                                            <div className="text-xs bg-violet-500/30 text-violet-300 px-1.5 py-0.5 rounded">Next</div>
                                                                        )}
                                                                        {step.required && (
                                                                            <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                                                                        )}
                                                                        {isLocked && (
                                                                            <div className="text-xs bg-gray-600/30 text-gray-400 px-1.5 py-0.5 rounded">Locked</div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <ArrowRight className={`w-3 h-3 ${
                                                                    isRecommended ? 'text-violet-400' : 'text-gray-500'
                                                                }`} />
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}

                                    {/* Completed Tasks - Mock + Dynamic */}
                                    {(() => {
                                        const completedSteps = onboardingData.flatMap((category: OnboardingCategory) => 
                                            category.steps.filter((step: OnboardingStep) => step.status === 'completed')
                                        );
                                        
                                        const totalCompleted = 2 + completedSteps.length; // Mock items + real completed steps
                                        
                                        return (
                                            <div className="pt-3 mt-3 border-t border-gray-700">
                                                <div className="text-xs text-gray-500 mb-2">Completed:</div>
                                                
                                                {/* Mock completed steps */}
                                                <div className="p-2 bg-gray-800/50 rounded-lg opacity-60 mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <Users01 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                                                        <div className="flex-1">
                                                            <span className="text-sm font-medium text-white line-through">Create a new community</span>
                                                        </div>
                                                        <div className="w-3 h-3 bg-violet-500 rounded-full flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="p-2 bg-gray-800/50 rounded-lg opacity-60 mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <Database01 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                                                        <div className="flex-1">
                                                            <span className="text-sm font-medium text-white line-through">Initial Setup Complete</span>
                                                        </div>
                                                        <div className="w-3 h-3 bg-violet-500 rounded-full flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Dynamic completed steps */}
                                                {completedSteps.map((step: OnboardingStep) => {
                                                    const IconComponent = step.icon;
                                                    return (
                                                        <div key={step.id} className="p-2 bg-gray-800/50 rounded-lg opacity-60 mb-2">
                                                            <div className="flex items-center gap-3">
                                                                <IconComponent className="w-4 h-4 text-violet-400 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <span className="text-sm font-medium text-white line-through">{step.title}</span>
                                                                </div>
                                                                <div className="w-3 h-3 bg-violet-500 rounded-full flex items-center justify-center">
                                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                                </div>
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
                </>
            )}
        </>
    );
};
