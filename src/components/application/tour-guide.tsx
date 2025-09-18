import React, { useEffect, useState } from "react";
import { X, ArrowLeft, ArrowRight, Target } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

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
        };
    }, [currentStep, currentStepData, isActive, targetElement]);

    // Clean up on unmount or when tour becomes inactive
    useEffect(() => {
        return () => {
            // Remove all tour highlights
            const highlightedElements = document.querySelectorAll('.tour-guide-highlight');
            highlightedElements.forEach(el => el.classList.remove('tour-guide-highlight'));
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
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 z-[9998] tour-guide-overlay" />
            
            {/* Tour Tooltip */}
            <div
                className="fixed z-[9999] w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4"
                style={{
                    top: tooltipPosition.top,
                    left: tooltipPosition.left,
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-brand-secondary" />
                        <span className="text-xs font-medium text-brand-secondary">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                    </div>
                    <button
                        onClick={onSkip}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {currentStepData.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {currentStepData.description}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                            className="bg-brand-solid h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {currentStep > 0 && (
                            <Button
                                size="sm"
                                color="tertiary"
                                iconLeading={ArrowLeft}
                                onClick={onPrevious}
                            >
                                Previous
                            </Button>
                        )}
                    </div>
                    
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            color="tertiary"
                            onClick={onSkip}
                        >
                            Skip Tour
                        </Button>
                        <Button
                            size="sm"
                            color="primary"
                            iconTrailing={currentStep < steps.length - 1 ? ArrowRight : undefined}
                            onClick={handleNext}
                        >
                            {currentStep < steps.length - 1 ? 'Next' : 'Complete'}
                        </Button>
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
