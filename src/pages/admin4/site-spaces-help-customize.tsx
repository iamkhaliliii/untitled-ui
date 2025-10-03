import { useNavigate, useLocation } from "react-router";
import { DesignLayout } from "@/components/layouts/design-layout";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
import { useState } from "react";
import { EventsCustomizeSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-customize-settings";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { ArrowLeft, FlipBackward } from "@untitledui/icons";

export const SiteSpacesHelpCustomizePage = () => {
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
        if (currentPath.includes("/admin4/site/spaces/growth/help")) {
            return "Customize your help page layout and appearance";
        }
        return "Customize your help page layout and appearance";
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
        // Navigate back to the main help page (without /customize)
        const basePath = currentPath.replace('/customize', '');
        navigate(basePath);
    };
    
    // Render sidebar content with title and header controls
    const renderCustomizeSidebarContent = () => {
        return (
            <div className="flex flex-col h-full">
                {/* Title and Description */}
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-primary mb-2">{getMainTitle()}</h2>
                    <p className="text-sm text-tertiary">{getPageTitle()}</p>
                </div>
                
                {/* Header controls - Sticky */}
                <div className="sticky top-0 z-10 bg-primary p-2 border-b border-secondary">
                    <div className="flex items-center justify-between mb-2">
                        {/* Left: Circular back button - only show if not on main customizer state */}
                        <div></div> {/* Empty div since this page doesn't have widget states yet */}
                        
                        {/* Right: Space Settings link */}
                        <button
                            onClick={handleSpaceSettings}
                            className="flex items-center gap-1 px-1 py-0.5 text-xs font-medium transition-colors cursor-pointer text-brand-secondary hover:text-brand-secondary_hover"
                        >
                            <FlipBackward className="size-3" />
                            Back to Space Settings
                        </button>
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
