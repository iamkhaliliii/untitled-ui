// Featured cards demo components
import React from "react";

interface FeaturedCardProps {
    title: string;
    description: string;
    confirmLabel: string;
    progress: number;
    className?: string;
    onDismiss: () => void;
    onConfirm: () => void;
}

export const FeaturedCardProgressBar = ({ 
    title, 
    description, 
    confirmLabel, 
    progress, 
    className = "", 
    onDismiss, 
    onConfirm 
}: FeaturedCardProps) => {
    return (
        <div className={`p-4 bg-card rounded-lg border ${className}`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium">{title}</h3>
                <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600">
                    ×
                </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${progress}%` }}
                />
            </div>
            <button 
                onClick={onConfirm}
                className="w-full text-sm bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                {confirmLabel}
            </button>
        </div>
    );
};

export const FeaturedCardProgressCircle = ({ 
    title, 
    description, 
    confirmLabel, 
    progress, 
    className = "", 
    onDismiss, 
    onConfirm 
}: FeaturedCardProps) => {
    return (
        <div className={`p-4 bg-card rounded-lg border ${className}`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium">{title}</h3>
                <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600">
                    ×
                </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <div className="flex items-center justify-center mb-3">
                <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                        <circle 
                            cx="18" 
                            cy="18" 
                            r="16" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="2"
                            strokeDasharray={`${progress}, 100`}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-medium">{progress}%</span>
                    </div>
                </div>
            </div>
            <button 
                onClick={onConfirm}
                className="w-full text-sm bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                {confirmLabel}
            </button>
        </div>
    );
}; 