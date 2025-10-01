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
    const [previousStep, setPreviousStep] = useState<number>(-1);

    const currentStepData = steps[currentStep];

    // Track step changes to handle backwards navigation
    useEffect(() => {
        if (currentStep < previousStep) {
            // Going backwards - handle state reset
            console.log(`Going backwards from step ${previousStep} to step ${currentStep}`);
            
            // If going back to step 1 from step 2, reset navigation state
            if (currentStep === 0 && previousStep === 1) {
                // Reset navigation selection state
                const event = new CustomEvent('tour-reset-navigation', { detail: { reset: true } });
                window.dispatchEvent(event);
            }
        }
        setPreviousStep(currentStep);
    }, [currentStep, previousStep]);

    useEffect(() => {
        if (!isActive || !currentStepData) return;

        const findAndHighlightElement = () => {
            console.log('Looking for element with selector:', currentStepData.targetSelector);
            const element = document.querySelector(currentStepData.targetSelector) as HTMLElement;
            
            if (element) {
                console.log('Found element:', element);
                setTargetElement(element);
                
                // Add highlight class
                element.classList.add('tour-guide-highlight');
                
                // Add tour-active class to body
                document.body.classList.add('tour-active');
                
                // Add a subtle blur effect to non-sidebar content
                const mainContent = document.querySelector('main');
                if (mainContent && !mainContent.contains(element)) {
                    mainContent.style.filter = 'blur(0.5px)';
                    mainContent.style.transition = 'filter 0.3s ease';
                }
                
                // Ensure element is visible and scrolled into view
                element.style.position = 'relative';
                element.style.zIndex = '10000';
                
                // Scroll element into view first, then calculate position
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'nearest'
                });
                
                // Wait a bit for scroll to complete before calculating position
                setTimeout(() => {
                    const updatedRect = element.getBoundingClientRect();
                    let updatedTop = updatedRect.top;
                    let updatedLeft = updatedRect.left;
                    
                    // Recalculate position after scroll
                    switch (currentStepData.position) {
                        case 'bottom':
                            updatedTop = updatedRect.bottom + 10;
                            updatedLeft = updatedRect.left + (updatedRect.width / 2) - 192;
                            break;
                        case 'top':
                            updatedTop = updatedRect.top - 200;
                            updatedLeft = updatedRect.left + (updatedRect.width / 2) - 192;
                            break;
                        case 'right':
                            updatedTop = updatedRect.top + (updatedRect.height / 2) - 150;
                            updatedLeft = updatedRect.right + 20;
                            break;
                        case 'left':
                        default:
                            updatedTop = updatedRect.top + (updatedRect.height / 2) - 150;
                            updatedLeft = updatedRect.left - 404;
                            break;
                    }
                    
                    // Apply viewport bounds to updated position
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const tooltipWidth = 384;
                    const tooltipHeight = 400;
                    
                    if (updatedLeft < 20) {
                        updatedLeft = 20;
                    } else if (updatedLeft + tooltipWidth > viewportWidth - 20) {
                        updatedLeft = viewportWidth - tooltipWidth - 20;
                    }
                    
                    if (updatedTop < 20) {
                        updatedTop = 20;
                    } else if (updatedTop + tooltipHeight > viewportHeight - 20) {
                        updatedTop = Math.max(20, updatedRect.top - tooltipHeight - 10);
                    }
                    
                    setTooltipPosition({ top: updatedTop, left: updatedLeft });
                }, 300);
            } else {
                console.log('Element not found with selector:', currentStepData.targetSelector);
                console.log('Available elements with data-tour attributes:', 
                    document.querySelectorAll('[data-tour-navigation-item], [data-tour-navigation-panel], [data-tour-header-toggle], [data-tour-sidebar-toggle], [data-tour-navigation-tree]'));
                return;
            }
        };

        // Try to find element with multiple attempts for dynamic content
        let attempts = 0;
        const maxAttempts = 10;
        
        const tryFindElement = () => {
            attempts++;
            console.log(`Attempt ${attempts} to find element:`, currentStepData.targetSelector);
            
            const element = document.querySelector(currentStepData.targetSelector) as HTMLElement;
            if (element) {
                console.log('Found element on attempt', attempts);
                findAndHighlightElement();
            } else if (attempts < maxAttempts) {
                console.log(`Element not found, retrying in ${attempts * 200}ms...`);
                setTimeout(tryFindElement, attempts * 200); // Increasing delay
            } else {
                console.log('Max attempts reached, element not found');
            }
        };
        
        tryFindElement();
        
        return () => {
            // Remove highlight from previous element
            if (targetElement) {
                targetElement.classList.remove('tour-guide-highlight');
                targetElement.style.position = '';
                targetElement.style.zIndex = '';
            }
            // Remove blur from main content
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.style.filter = '';
                mainContent.style.transition = '';
            }
            // Remove tour-active class from body
            document.body.classList.remove('tour-active');
        };
    }, [currentStep, currentStepData, isActive, targetElement]);

    // Clean up on unmount or when tour becomes inactive
    useEffect(() => {
        return () => {
            // Remove all tour highlights
            const highlightedElements = document.querySelectorAll('.tour-guide-highlight');
            highlightedElements.forEach(el => {
                el.classList.remove('tour-guide-highlight');
                (el as HTMLElement).style.position = '';
                (el as HTMLElement).style.zIndex = '';
            });
            
            // Remove blur from main content
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.style.filter = '';
                mainContent.style.transition = '';
            }
            
            // Remove tour-active class from body
            document.body.classList.remove('tour-active');
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
            {/* Tour Guide Styles */}
            <style>{`
                .tour-guide-highlight {
                    position: relative !important;
                    z-index: 9999 !important;
                    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.3) !important;
                    border-radius: 8px !important;
                }
                .tour-guide-tooltip {
                    pointer-events: auto !important;
                }
                body.tour-active {
                    overflow: hidden;
                }
            `}</style>
            
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
                className="fixed z-[99999] w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden tour-guide-tooltip"
                style={{
                    top: Math.max(20, tooltipPosition.top),
                    left: Math.max(20, Math.min(tooltipPosition.left, window.innerWidth - 404)),
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    maxHeight: 'calc(100vh - 40px)',
                    transform: 'translateZ(0)' // Force hardware acceleration
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
