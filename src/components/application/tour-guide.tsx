import React, { useEffect, useState } from "react";
import { X, ArrowLeft, ArrowRight, NavigationPointer01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// Tour guide component for step-by-step UI guidance
export interface TourStep {
    id: string;
    title: string;
    description: string;
    targetSelector: string;
    position?: "top" | "bottom" | "left" | "right";
    action?: () => void;
}

interface TourGuideProps {
    isActive: boolean;
    steps: TourStep[];
    currentStep: number;
    onNext: () => void;
    onPrevious: () => void;
    onSkip: () => void;
    onComplete: () => void;
}

export const TourGuide: React.FC<TourGuideProps> = ({
    isActive,
    steps,
    currentStep,
    onNext,
    onPrevious,
    onSkip,
    onComplete,
}) => {
    const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const currentStepData = steps[currentStep];

    useEffect(() => {
        if (!isActive || !currentStepData) return;

        const findAndHighlightElement = () => {
            const element = document.querySelector(currentStepData.targetSelector) as HTMLElement;
            if (element) {
                setTargetElement(element);
                
                // Add highlight class
                element.classList.add('tour-guide-highlight');
                
                // Add a subtle blur effect to non-sidebar content
                const mainContent = document.querySelector('main');
                if (mainContent && !mainContent.contains(element)) {
                    mainContent.style.filter = 'blur(0.5px)';
                    mainContent.style.transition = 'filter 0.3s ease';
                }
                
                // Calculate tooltip position
                const rect = element.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                
                let top = rect.top + scrollTop;
                let left = rect.left + scrollLeft;
                
                // Adjust position based on preferred position
                switch (currentStepData.position) {
                    case 'bottom':
                        top = rect.bottom + scrollTop + 10;
                        left = rect.left + scrollLeft + (rect.width / 2) - 150; // Center tooltip
                        break;
                    case 'top':
                        top = rect.top + scrollTop - 180; // Tooltip height
                        left = rect.left + scrollLeft + (rect.width / 2) - 150;
                        break;
                    case 'right':
                        top = rect.top + scrollTop + (rect.height / 2) - 90; // Half tooltip height
                        left = rect.right + scrollLeft + 10;
                        break;
                    case 'left':
                    default:
                        top = rect.top + scrollTop + (rect.height / 2) - 90;
                        left = rect.left + scrollLeft - 310; // Tooltip width
                        break;
                }
                
                setTooltipPosition({ top, left });
                
                // Scroll element into view
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'center'
                });
            }
        };

        // Try to find element immediately
        findAndHighlightElement();
        
        // If not found, try again after a short delay (for dynamic content)
        const timeout = setTimeout(findAndHighlightElement, 100);
        
        return () => {
            clearTimeout(timeout);
            // Remove highlight from previous element
            if (targetElement) {
                targetElement.classList.remove('tour-guide-highlight');
            }
            // Remove blur from main content
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.style.filter = '';
                mainContent.style.transition = '';
            }
        };
    }, [currentStep, currentStepData, isActive, targetElement]);

    // Clean up on unmount or when tour becomes inactive
    useEffect(() => {
        return () => {
            // Remove all tour highlights
            const highlightedElements = document.querySelectorAll('.tour-guide-highlight');
            highlightedElements.forEach(el => el.classList.remove('tour-guide-highlight'));
            
            // Remove blur from main content
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.style.filter = '';
                mainContent.style.transition = '';
            }
            
        };
    }, [isActive]);

    if (!isActive || !currentStepData) return null;

    const handleNext = () => {
        if (currentStepData.action) {
            currentStepData.action();
        }
        
        if (currentStep < steps.length - 1) {
            onNext();
        } else {
            onComplete();
        }
    };

    return (
        <>
            {/* Smart Overlay with rectangular spotlight */}
            {targetElement && (
                <>
                    {/* Top overlay */}
                    <div 
                        className="fixed z-[9998] bg-black/60 animate-in fade-in duration-300 transition-all duration-500"
                        style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            height: Math.max(0, targetElement.getBoundingClientRect().top - 12)
                        }}
                    />
                    {/* Bottom overlay */}
                    <div 
                        className="fixed z-[9998] bg-black/60 animate-in fade-in duration-300 transition-all duration-500"
                        style={{
                            top: targetElement.getBoundingClientRect().bottom + 12,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    />
                    {/* Left overlay */}
                    <div 
                        className="fixed z-[9998] bg-black/60 animate-in fade-in duration-300 transition-all duration-500"
                        style={{
                            top: Math.max(0, targetElement.getBoundingClientRect().top - 12),
                            left: 0,
                            width: Math.max(0, targetElement.getBoundingClientRect().left - 12),
                            height: targetElement.getBoundingClientRect().height + 24
                        }}
                    />
                    {/* Right overlay */}
                    <div 
                        className="fixed z-[9998] bg-black/60 animate-in fade-in duration-300 transition-all duration-500"
                        style={{
                            top: Math.max(0, targetElement.getBoundingClientRect().top - 12),
                            left: targetElement.getBoundingClientRect().right + 12,
                            right: 0,
                            height: targetElement.getBoundingClientRect().height + 24
                        }}
                    />
                </>
            )}
            
            {!targetElement && (
                <div className="fixed inset-0 z-[9998] bg-black/60 animate-in fade-in duration-300" />
            )}
            
            {/* Enhanced Tour Tooltip */}
            <div
                className="fixed z-[9999] w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden tour-guide-tooltip"
                style={{
                    top: tooltipPosition.top,
                    left: tooltipPosition.left,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
            >
                {/* Enhanced Header with gradient background */}
                <div className="bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-950 dark:to-brand-900 px-6 py-4 border-b border-brand-200/50 dark:border-brand-800/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shadow-lg">
                                <NavigationPointer01 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <span className="text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                                    Tour Guide
                                </span>
                                <div className="text-sm font-semibold text-brand-900 dark:text-brand-100">
                                    Step {currentStep + 1} of {steps.length}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onSkip}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors group"
                        >
                            <X className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" />
                        </button>
                    </div>
                </div>

                {/* Enhanced Content */}
                <div className="px-6 py-5">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                            {currentStepData.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {currentStepData.description}
                        </p>
                    </div>

                    {/* Minimal Progress Bar */}
                    <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                            {/* Simple progress dots */}
                            <div className="flex items-center gap-1.5">
                                {Array.from({ length: steps.length }, (_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index <= currentStep
                                                ? 'bg-brand-500'
                                                : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                                {currentStep + 1}/{steps.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Actions */}
                <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                            {currentStep > 0 && (
                                <Button
                                    size="sm"
                                    color="tertiary"
                                    iconLeading={ArrowLeft}
                                    onClick={onPrevious}
                                    className="shadow-sm hover:shadow-md transition-shadow"
                                >
                                    Previous
                                </Button>
                            )}
                        </div>
                        
                        <div className="flex gap-3">
                            <Button
                                size="sm"
                                color="tertiary"
                                onClick={onSkip}
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                Skip Tour
                            </Button>
                            <Button
                                size="sm"
                                color="primary"
                                iconTrailing={currentStep < steps.length - 1 ? ArrowRight : undefined}
                                onClick={handleNext}
                                className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                {currentStep < steps.length - 1 ? 'Next Step' : 'Complete Tour'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Hook for managing tour state
export const useTourGuide = () => {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState<TourStep[]>([]);

    const startTour = (tourSteps: TourStep[]) => {
        setSteps(tourSteps);
        setCurrentStep(0);
        setIsActive(true);
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const skipTour = () => {
        setIsActive(false);
        setCurrentStep(0);
        setSteps([]);
    };

    const completeTour = () => {
        setIsActive(false);
        setCurrentStep(0);
        setSteps([]);
    };

    return {
        isActive,
        currentStep,
        steps,
        startTour,
        nextStep,
        previousStep,
        skipTour,
        completeTour,
    };
};
