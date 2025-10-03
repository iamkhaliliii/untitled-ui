import { useNavigate, useLocation } from "react-router";
import { DesignLayout } from "@/components/layouts/design-layout";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
import { useState } from "react";
import { EventsCustomizeSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-customize-settings";
import { Button } from "@/components/base/buttons/button";
import { ArrowLeft } from "@untitledui/icons";

export const SiteSpacesPostsCustomizePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    
    // State for customization
    const [toggleStates, setToggleStates] = useState({
        header: true,
        leftSidebar: true,
        rightSidebar: false,
        footer: false,
    });
    
    const [customizeExpandedIds, setCustomizeExpandedIds] = useState<string[]>([]);
    
    // Get page title and description
    const getPageTitle = () => {
        if (currentPath.includes("/admin4/site/spaces/private-space")) {
            return "Customize your private space layout and appearance";
        }
        if (currentPath.includes("/admin4/site/spaces/growth/posts")) {
            return "Customize your posts page layout and appearance";
        }
        return "Customize your posts page layout and appearance";
    };

    const getMainTitle = () => {
        return "Customizer";
    };
    
    // Handlers for EventsCustomizeSettings
    const handleToggleChange = (nodeId: string, isToggled: boolean) => {
        console.log("Toggle change:", nodeId, isToggled);
    };

    const updateToggleStates = (states: Partial<typeof toggleStates>) => {
        setToggleStates(prev => ({ ...prev, ...states }));
    };

    const handleAddWidgetClick = () => {
        console.log("Add widget clicked");
    };

    const handleWidgetConfig = (widget: any) => {
        console.log("Widget config:", widget);
    };

    const handleEditGlobalWidgets = () => {
        console.log("Edit global widgets");
    };

    const handleWidgetSelect = (widget: any) => {
        console.log("Widget selected:", widget);
    };

    const handleSetWidgetSelectionType = (type: 'space' | 'sidebar') => {
        console.log("Widget selection type:", type);
    };

    // Back button handler - returns to main customizer state
    const handleBackToCustomizer = () => {
        // For now, just a placeholder since this page doesn't have widget states yet
        console.log("Back to customizer");
    };

    // Space Settings button handler
    const handleSpaceSettings = () => {
        // Navigate back to the main posts page (without /customize)
        const basePath = currentPath.replace('/customize', '');
        navigate(basePath);
    };
    
    // Render sidebar content with header controls first, then title
    const renderCustomizeSidebarContent = () => {
        return (
            <div className="flex flex-col h-full">
                {/* Header controls - Sticky */}
                <div className="sticky top-0 z-10 bg-primary p-2 border-b border-secondary">
                    <div className="flex items-center justify-between mb-2">
                        {/* Left: Circular back button */}
                        <ButtonUtility
                            size="sm"
                            color="tertiary"
                            icon={ArrowLeft}
                            tooltip="Back to Customizer"
                            onClick={handleBackToCustomizer}
                            className="rounded-full border border-secondary"
                        />
                        
                        {/* Right: Space Settings link */}
                        <button
                            onClick={handleSpaceSettings}
                            className="flex items-center gap-1 px-1 py-0.5 text-xs font-medium transition-colors cursor-pointer text-brand-secondary hover:text-brand-secondary_hover"
                        >
                            <FlipBackward className="size-3" />
                            Back to Space Settings
                        </button>
                    </div>
                    
                    {/* Title and Description */}
                    <div>
                        <h2 className="text-lg font-semibold text-primary">{getMainTitle()}</h2>
                        <p className="text-sm text-tertiary">{getPageTitle()}</p>
                    </div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 overflow-y-auto">
                    <EventsCustomizeSettings
                        toggleStates={toggleStates}
                        customizeExpandedIds={customizeExpandedIds}
                        setCustomizeExpandedIds={setCustomizeExpandedIds}
                        handleToggleChange={handleToggleChange}
                        updateToggleStates={updateToggleStates}
                        onAddWidgetClick={handleAddWidgetClick}
                        onWidgetConfig={handleWidgetConfig}
                        onEditGlobalWidgets={handleEditGlobalWidgets}
                        onWidgetSelect={handleWidgetSelect}
                        onSetWidgetSelectionType={handleSetWidgetSelectionType}
                    />
                </div>
            </div>
        );
    };

    return (
        <DesignLayout
            title="" // Empty since we handle title in sidebar content
            description="" // Empty since we handle description in sidebar content
            currentPath={currentPath}
            sidebarContent={renderCustomizeSidebarContent()}
        >
            <div className="p-6">
                <BrowserMockup />
            </div>
        </DesignLayout>
    );
};
