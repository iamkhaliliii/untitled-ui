import { CheckCircle, Settings01, Rocket01, CheckDone01 } from "@untitledui/icons";
import { useState, useEffect } from "react";

// Types for onboarding data
interface OnboardingStep {
    id: string;
    title: string;
    status: 'pending' | 'completed';
    required: boolean;
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
    // State for dynamic onboarding data with localStorage persistence
    const [onboardingData, setOnboardingData] = useState(() => {
        const saved = localStorage.getItem('onboarding-progress');
        return saved ? JSON.parse(saved) : onboardingCategories;
    });

    // Listen for onboarding step completion events
    useEffect(() => {
        const handleStepCompleted = (event: CustomEvent) => {
            const { stepId, categoryId } = event.detail;
            console.log(`ProgressWidget: Updating step ${stepId} in category ${categoryId} to completed`);
            
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
        };

        window.addEventListener('onboarding-step-completed', handleStepCompleted as EventListener);
        
        return () => {
            window.removeEventListener('onboarding-step-completed', handleStepCompleted as EventListener);
        };
    }, [onboardingData]);

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
        
        // Show progress up to Onboarding phase (25% minimum)
        const baseProgress = 25;
        const calculatedProgress = Math.round((completedRequired / totalRequired) * 100);
        return Math.max(baseProgress, calculatedProgress);
    };

    return (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 w-full">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-medium text-white">Your Journey</h4>
                <span className="text-xs text-gray-400">{getRemainingRequiredStepsCount()} required steps to go live</span>
            </div>
            
            <div className="relative mb-6">
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-violet-500 h-1.5 rounded-full" style={{width: `${getRequiredProgressPercentage()}%`}}></div>
                </div>
                
                <div className="absolute -top-1.5 left-0 right-0 flex justify-between">
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-violet-500 rounded-full"></div>
                        <span className="text-xs text-violet-300 font-medium mt-2">Initial</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${areRequiredStepsCompleted('onboarding') ? 'bg-violet-500' : 'bg-gray-600'}`}></div>
                        <span className={`text-xs font-medium mt-2 ${areRequiredStepsCompleted('onboarding') ? 'text-violet-300' : 'text-gray-400'}`}>Onboarding</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${areRequiredStepsCompleted('setup') ? 'bg-violet-500' : 'bg-gray-600'}`}></div>
                        <span className={`text-xs font-medium mt-2 ${areRequiredStepsCompleted('setup') ? 'text-violet-300' : 'text-gray-400'}`}>Setup</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${areRequiredStepsCompleted('launch') ? 'bg-violet-500' : 'bg-gray-600'}`}></div>
                        <span className={`text-xs font-medium mt-2 ${areRequiredStepsCompleted('launch') ? 'text-violet-300' : 'text-gray-400'}`}>Launch</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
