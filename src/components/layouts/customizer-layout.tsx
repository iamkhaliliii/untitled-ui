import { ReactNode } from "react";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { useAdmin } from "@/hooks/use-admin";
import { ErrorBoundary } from "@/components/error-boundary";
import { ArrowLeft, Settings01, Check, X } from "@untitledui/icons";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useNavigate } from "react-router";
import { useScrollLock } from "@/hooks/use-scroll-lock";

interface CustomizerLayoutProps {
    children: ReactNode;
    configSidebarContent: ReactNode;
    sidebarTitle: string;
    sidebarDescription: string;
    currentPath?: string;
    onBack?: () => void;
    onSave?: () => void;
    onDiscard?: () => void;
    showBackButton?: boolean;
    showSaveButtons?: boolean;
    backButtonTooltip?: string;
}

export const CustomizerLayout = ({ 
    children, 
    configSidebarContent,
    sidebarTitle,
    sidebarDescription,
    currentPath = "/admin4/customize",
    onBack,
    onSave,
    onDiscard,
    showBackButton = true,
    showSaveButtons = true,
    backButtonTooltip = "Back"
}: CustomizerLayoutProps) => {
    const { adminHeaderVisible, toggleAdminHeader } = useAdmin();
    const navigate = useNavigate();
    
    // Lock scroll position when content changes
    const scrollContainerRef = useScrollLock();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleSave = () => {
        if (onSave) {
            onSave();
        }
    };

    const handleDiscard = () => {
        if (onDiscard) {
            onDiscard();
        }
    };

    return (
        <div className="flex flex-col h-dvh overflow-hidden">
            {/* Admin Sticky Header */}
            <ErrorBoundary fallback={
                <div className="h-12 bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-700 dark:text-red-300 text-sm">
                    Admin header error - check console
                </div>
            }>
                <AdminStickyHeader 
                    isVisible={true} 
                    onToggleVisibility={toggleAdminHeader}
                    isAdminPage={true}
                    modeSwitcherType="buttonGroup"
                />
            </ErrorBoundary>

            {/* Main layout - Config sidebar and content */}
            <div className="flex flex-1 overflow-hidden min-h-0">
                {/* Configuration Sidebar */}
                <div className="w-93 bg-primary border-r border-secondary overflow-hidden flex flex-col">
                    {/* Scrollable Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex-1 overflow-y-auto min-h-0 scrollbar-thin customizer-sidebar-scroll" 
                        style={{ overflowAnchor: 'none' }}
                    >
                        {/* Inner Flex Container */}
                        <div className="flex flex-col">
                            {/* Header Section */}
                            <div className="px-4 mt-6 lg:px-5 flex-shrink-0">
                                {/* Back Button Row */}
                                {showBackButton && (
                                    <div className="mb-2">
                                        <button
                                            onClick={handleBack}
                                            className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                                        >
                                            <ArrowLeft className="size-4 text-fg-quaternary" />
                                        </button>
                                    </div>
                                )}
                                
                                {/* Title and Description */}
                                <div className="mb-3">
                                    <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">
                                        {sidebarTitle}
                                    </h3>
                                    <p className="text-sm text-tertiary mt-1">
                                        {sidebarDescription}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Content Area */}
                            <div className="mt-2 px-4 pb-4">
                                {configSidebarContent}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area (Browser Mockup) */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin min-h-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};


