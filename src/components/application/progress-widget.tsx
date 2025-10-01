import { CheckCircle, Settings01, Rocket01, CheckDone01, BarChartSquare02, Database01, Users01, Palette, MessageChatCircle, CodeBrowser, Lock01, Plus, Data } from "@untitledui/icons";
import { useState, useEffect } from "react";

// Types for onboarding data
interface OnboardingStep {
    id: string;
    title: string;
    status: 'pending' | 'completed';
    required: boolean;
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
            { id: "customize-navigation", title: "Customize Navigation", status: "pending", required: true },
            { id: "customize-space", title: "Customize a Space You Created", status: "pending", required: true },
            { id: "setup-permissions", title: "Setup Permissions Site Settings", status: "pending", required: false },
            { id: "invite-teammates", title: "Invite Your Teammates", status: "pending", required: false }
        ]
    },
    {
        id: "setup",
        title: "Setup",
        steps: [
            { id: "member-profile-fields", title: "Add Member Profile Fields", status: "pending", required: false },
            { id: "appearance-settings", title: "Customize Appearance Settings", status: "pending", required: true },
            { id: "setup-messaging", title: "Setup Messaging", status: "pending", required: false },
            { id: "custom-domain", title: "Setup the Custom Domain", status: "pending", required: true },
            { id: "login-methods", title: "Setup Login Methods Authentication", status: "pending", required: false },
            { id: "email-domain", title: "Setup Custom Email Domain", status: "pending", required: false },
            { id: "notifications", title: "Managing Notifications & Email digest", status: "pending", required: true },
            { id: "localization", title: "Setup Localization", status: "pending", required: false },
            { id: "seo-settings", title: "Setup Site SEO settings", status: "pending", required: false },
            { id: "add-post", title: "Add a Post", status: "pending", required: false }
        ]
    },
    {
        id: "launch",
        title: "Launch",
        steps: [
            { id: "security-privacy", title: "Setup Security & Privacy", status: "pending", required: false },
            { id: "setup-moderation", title: "Setup Moderation", status: "pending", required: true },
            { id: "setup-integrations", title: "Setup Integrations", status: "pending", required: false },
            { id: "invite-members", title: "Invite Members", status: "pending", required: true },
            { id: "publish-go-live", title: "Publish and Go Live!", status: "pending", required: true }
        ]
    }
];

export const ProgressWidget = () => {
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

    // State for dynamic onboarding data with localStorage persistence
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

    // Listen for onboarding step completion events
    useEffect(() => {
        const handleStepCompleted = (event: CustomEvent) => {
            const { stepId, categoryId } = event.detail;
            console.log(`ProgressWidget: Updating step ${stepId} in category ${categoryId} to completed`);
            
            setOnboardingData(currentData => {
                let updatedData;
                
                // If step 1 (customize-navigation) is completed, mark all steps as completed
                if (stepId === 'customize-navigation') {
                    updatedData = currentData.map((category: OnboardingCategory) => ({
                        ...category,
                        steps: category.steps.map((step: OnboardingStep) => ({
                            ...step,
                            status: 'completed' as const
                        }))
                    }));
                } else {
                    // For other steps, just mark the specific step as completed
                    updatedData = currentData.map((category: OnboardingCategory) => 
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
                }
                
                return updatedData;
            });
        };

        window.addEventListener('onboarding-step-completed', handleStepCompleted as EventListener);
        
        return () => {
            window.removeEventListener('onboarding-step-completed', handleStepCompleted as EventListener);
        };
    }, []);

    // Listen for onboarding reset events
    useEffect(() => {
        const handleReset = (event: CustomEvent) => {
            if (event.detail.reset) {
                console.log('ProgressWidget: Resetting onboarding data to default');
                setOnboardingData(onboardingCategories);
            }
        };

        window.addEventListener('onboarding-reset', handleReset as EventListener);
        
        return () => {
            window.removeEventListener('onboarding-reset', handleReset as EventListener);
        };
    }, []);

    // Helper functions using dynamic data
    const getRequiredStepsForCategory = (categoryId: string) => {
        const category = onboardingData.find((cat: OnboardingCategory) => cat.id === categoryId);
        return category?.steps.filter((step: OnboardingStep) => step.required) || [];
    };

    const areRequiredStepsCompleted = (categoryId: string) => {
        const requiredSteps = getRequiredStepsForCategory(categoryId);
        return requiredSteps.every((step: OnboardingStep) => step.status === 'completed');
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
        
        // Divide into 9 segments: 1 filled by default + 8 for required steps
        // Each segment = 100% / 9 = ~11.11%
        const segmentSize = 100 / 9;
        const baseProgress = segmentSize; // 1 segment filled by default (~11.11%)
        const calculatedProgress = baseProgress + (completedRequired * segmentSize);
        return Math.min(calculatedProgress, 100);
    };

    const getTotalStepsCount = () => {
        return onboardingData.reduce((total: number, category: OnboardingCategory) => {
            return total + category.steps.length;
        }, 0);
    };

    const getCompletedStepsCount = () => {
        return onboardingData.reduce((total: number, category: OnboardingCategory) => {
            return total + category.steps.filter((step: OnboardingStep) => step.status === 'completed').length;
        }, 0);
    };

    // Simple progress calculation
    const totalSteps = getTotalStepsCount();
    const completedSteps = getCompletedStepsCount();
    const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    const remainingSteps = totalSteps - completedSteps;

    return (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white font-bold">{getRemainingRequiredStepsCount()} required steps remaining</span>
            </div>
            
            <div className="mb-6">
                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-violet-500 h-2 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${getRequiredProgressPercentage()}%` }}
                        ></div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">Get Started</span>
                            <span className="text-xs text-gray-400">Publish and Go Live!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
