import React from "react";
import {
    SearchLg,
    Home01,
    Menu01,
    Globe01,
} from "@untitledui/icons";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { SpacePreviews } from "./space-previews";

interface MobileBrowserMockupProps {
    previewType?: string;
    theme?: 'light' | 'dark';
}

// Mobile layout styles - Clean mobile view
const mobileLayoutStyles = `
/* Scale wrapper to 75% */
.mobile-layout-wrapper {
    transform: scale(0.75);
    transform-origin: top center;
    width: 133.33%;
    margin-left: -16.665%;
}

/* Force single column grid */
.mobile-layout-wrapper .space-preview-grid {
    grid-template-columns: 1fr !important;
    gap: 0.5rem !important;
}

.mobile-layout-wrapper .space-preview-grid > * {
    max-width: 100% !important;
}

/* Compact header for mobile */
.mobile-layout-wrapper > div > div:first-child {
    margin-bottom: 0.75rem !important;
    padding: 0.75rem !important;
    border-radius: 0.75rem !important;
}

/* Header inner layout - wrap to two rows */
.mobile-layout-wrapper > div > div:first-child > div {
    flex-wrap: wrap !important;
    gap: 0.5rem !important;
}

/* Header - show actions on second line */
.mobile-layout-wrapper > div > div:first-child > div > div:last-child {
    width: 100% !important;
    margin-left: 0 !important;
    display: flex !important;
    gap: 0.5rem !important;
}

/* Header left side */
.mobile-layout-wrapper > div > div:first-child > div > div:first-child {
    flex: 1 !important;
    min-width: 0 !important;
}

/* Header icon size */
.mobile-layout-wrapper > div > div:first-child svg {
    width: 1.25rem !important;
    height: 1.25rem !important;
}

/* Header icon container */
.mobile-layout-wrapper > div > div:first-child [class*="w-10"],
.mobile-layout-wrapper > div > div:first-child [class*="w-12"] {
    width: 2rem !important;
    height: 2rem !important;
    border-radius: 0.5rem !important;
}

/* Header title */
.mobile-layout-wrapper > div > div:first-child h1 {
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    margin-bottom: 0 !important;
}

/* Hide header description */
.mobile-layout-wrapper > div > div:first-child p {
    display: none !important;
}

/* Minimal action buttons */
.mobile-layout-wrapper > div > div:first-child button {
    padding: 0.375rem 0.625rem !important;
    font-size: 0.75rem !important;
    border-radius: 0.5rem !important;
    height: auto !important;
}

/* Button icons minimal */
.mobile-layout-wrapper > div > div:first-child button svg {
    width: 0.75rem !important;
    height: 0.75rem !important;
}

/* First button (Join Space) takes more space */
.mobile-layout-wrapper > div > div:first-child button:first-child {
    flex: 1 !important;
}

/* Card optimizations */
.mobile-layout-wrapper .space-preview-grid > div {
    border-radius: 0.75rem !important;
}

/* Card padding */
.mobile-layout-wrapper .space-preview-grid > div > div:last-child {
    padding: 0.75rem !important;
}

/* Card title size */
.mobile-layout-wrapper .space-preview-grid h3 {
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    margin-bottom: 0.5rem !important;
}

/* Card stats and description smaller */
.mobile-layout-wrapper .space-preview-grid p,
.mobile-layout-wrapper .space-preview-grid > div > div:last-child > div:nth-child(3) {
    font-size: 0.75rem !important;
    line-height: 1rem !important;
}

/* Card footer */
.mobile-layout-wrapper .space-preview-grid button {
    font-size: 0.75rem !important;
}
`;

export const MobileBrowserMockup = ({ previewType, theme: propTheme }: MobileBrowserMockupProps) => {
    const theme = useResolvedTheme(propTheme);
    
    return (
        <>
            <style>{mobileLayoutStyles}</style>
        <div className="absolute bottom-0 right-8 w-[260px] z-20 transform transition-all duration-300 group">
            <div className="rounded-[20px] overflow-hidden bg-gray-100 dark:bg-gray-800 p-1.5 shadow-2xl border border-gray-200 dark:border-gray-700" style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05)"
            }}>
                {/* Mobile Device Frame */}
                <div className="relative bg-white dark:bg-gray-950 rounded-[16px] overflow-hidden">
                    {/* Notch - HD Proportional */}
                    
                    {/* Mobile Content - HD Aspect Ratio (260:462 = 9:16 approx) */}
                    <div className="bg-gray-50 dark:bg-gray-900 h-[462px] overflow-y-hidden overflow-x-hidden">
                        {/* Mobile Top Navigation */}
                        <div className="bg-white dark:bg-gray-950 mb-1 border-b border-gray-100 dark:border-gray-800 px-3 py-2 flex items-center justify-between sticky top-0 z-10">
                            {/* Logo & Title */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                                </div>
                                <span className="text-xs text-gray-900 dark:text-gray-100">Products</span>
                            </div>
                            
                            {/* Hamburger Menu */}
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                                <Menu01 className="size-4 text-gray-700 dark:text-gray-300" />
                            </button>
                        </div>
                        
                        {/* Scrollable Content */}
                        <div className="h-[calc(100%-40px)] overflow-hidden scrollbar-thin">
                            <div className="p-2.5 mobile-layout-wrapper">
                                {/* Use the same space previews as desktop but in mobile layout */}
                                <SpacePreviews previewType={previewType || null} theme={theme} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile Bottom Bar - HD Proportional */}
                </div>
            </div>
        </div>
        </>
    );
};

