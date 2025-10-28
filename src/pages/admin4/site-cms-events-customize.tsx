import { useNavigate, useLocation } from "react-router";
import { DesignLayout } from "@/components/layouts/design-layout";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
import { useState } from "react";
import { EventsCustomizeSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-customize-settings";
import { WidgetSelection } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-selection";
import WidgetConfig from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-config";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { ArrowLeft, FlipBackward, FlipForward, Phone01, Tablet01, Monitor01 } from "@untitledui/icons";
import { useWidgetConfig } from "@/providers/widget-config-provider";

export const SiteCmsEventsCustomizePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    
    // Use widget config context for toggle states
    const { toggleStates, updateToggleStates: contextUpdateToggleStates } = useWidgetConfig();
    
    const [customizeExpandedIds, setCustomizeExpandedIds] = useState<string[]>([]);
    
    // Device and navigation state
    const [selectedDevice, setSelectedDevice] = useState<string>("desktop");
    const [selectedNavigation, setSelectedNavigation] = useState<string>("forward");
    
    // Widget selection and configuration state
    const [showWidgetSelection, setShowWidgetSelection] = useState<boolean>(false);
    const [showWidgetConfig, setShowWidgetConfig] = useState<boolean>(false);
    const [selectedWidgetForConfig, setSelectedWidgetForConfig] = useState<any>(null);
    const [widgetSelectionType, setWidgetSelectionType] = useState<'space' | 'sidebar'>('space');
    const [isTabConfigMode, setIsTabConfigMode] = useState<boolean>(false);
    const [tabConfigLabel, setTabConfigLabel] = useState<string>("");
    const [showNavigationInTertiary, setShowNavigationInTertiary] = useState<boolean>(false);
    
    // Get page title and description
    const getPageTitle = () => {
        return "Customize your CMS events layout and appearance";
    };

    const getMainTitle = () => {
        return "Customizer";
    };
    
    // Get sidebar title based on current state
    const getSidebarTitle = () => {
        if (showWidgetSelection) {
            return "Add Widget";
        }
        
        if (showWidgetConfig && selectedWidgetForConfig) {
            if (isTabConfigMode && tabConfigLabel) {
                return `"${tabConfigLabel}" Tab Config`;
            }
            return `Configure ${selectedWidgetForConfig.label}`;
        }
        
        if (showNavigationInTertiary) {
            return "Header and sidebar";
        }
        
        return "Customizer";
    };

    // Get sidebar description based on current state
    const getSidebarDescription = () => {
        if (showWidgetSelection) {
            return "Choose widgets to add to your space";
        }
        
        if (showWidgetConfig && selectedWidgetForConfig) {
            return "Configure widget settings and appearance";
        }
        
        if (showNavigationInTertiary) {
            return "Configure navigation settings";
        }
        
        return "Customize your CMS events layout and appearance";
    };
    
    // Handlers for EventsCustomizeSettings
    const handleToggleChange = (nodeId: string, isToggled: boolean) => {
        console.log("Toggle change:", nodeId, isToggled);
    };

    const updateToggleStates = (states: Partial<typeof toggleStates>) => {
        contextUpdateToggleStates(states);
    };

    const handleAddWidgetClick = () => {
        setShowWidgetSelection(true);
    };

    const handleWidgetConfig = (widget: any) => {
        setSelectedWidgetForConfig(widget);
        setShowWidgetConfig(true);
        setShowWidgetSelection(false);
    };

    const handleEditGlobalWidgets = () => {
        setShowNavigationInTertiary(true);
    };

    const handleWidgetSelect = (widget: any) => {
        setSelectedWidgetForConfig(widget);
        setShowWidgetConfig(true);
        setShowWidgetSelection(false);
    };

    const handleSetWidgetSelectionType = (type: 'space' | 'sidebar') => {
        setWidgetSelectionType(type);
    };

    // Widget selection handlers
    const handleWidgetSelectionBack = () => {
        setShowWidgetSelection(false);
    };

    // Widget config handlers
    const handleWidgetConfigBack = () => {
        setShowWidgetConfig(false);
        setSelectedWidgetForConfig(null);
        setIsTabConfigMode(false);
        setTabConfigLabel("");
    };

    const handleWidgetConfigSave = () => {
        console.log("Widget config saved");
        setShowWidgetConfig(false);
        setSelectedWidgetForConfig(null);
    };

    const handleTabConfigChange = (isTabConfig: boolean, tabLabel?: string) => {
        setIsTabConfigMode(isTabConfig);
        setTabConfigLabel(tabLabel || "");
    };

    const handleFilterViewChange = (isFilterView: boolean) => {
        console.log("Filter view change:", isFilterView);
    };

    // Back button handler - returns to main customizer state
    const handleBackToCustomizer = () => {
        setShowWidgetSelection(false);
        setShowWidgetConfig(false);
        setSelectedWidgetForConfig(null);
        setShowNavigationInTertiary(false);
        setIsTabConfigMode(false);
        setTabConfigLabel("");
    };

    // Space Settings button handler
    const handleSpaceSettings = () => {
        // Navigate back to the CMS events settings page
        navigate('/admin4/site/cms/events/settings');
    };

    // Device selection handler
    const handleDeviceChange = (device: string) => {
        setSelectedDevice(device);
    };

    // Navigation handler
    const handleNavigationChange = (direction: string) => {
        setSelectedNavigation(direction);
    };

    // Save changes handler
    const handleSaveChanges = () => {
        console.log("Save changes clicked");
        // Add save functionality here
    };

    // Render sidebar content based on current state
    const renderCustomizeSidebarContent = () => {
        const content = (() => {
            if (showWidgetSelection) {
                return (
                    <WidgetSelection
                        onBack={handleWidgetSelectionBack}
                        onSelectWidget={handleWidgetSelect}
                    />
                );
            }
            
            if (showWidgetConfig && selectedWidgetForConfig) {
                return (
                    <WidgetConfig
                        selectedWidget={selectedWidgetForConfig}
                        onBack={handleWidgetConfigBack}
                        onSave={handleWidgetConfigSave}
                        onTabConfigChange={handleTabConfigChange}
                        onFilterViewChange={handleFilterViewChange}
                    />
                );
            }
            
            if (showNavigationInTertiary) {
                return (
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Navigation Settings</h3>
                        <p className="text-sm text-tertiary">Configure header and sidebar navigation settings here.</p>
                    </div>
                );
            }
            
            // Default: show EventsCustomizeSettings
            return (
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
            );
        })();

        // Wrap content with header controls first, then title
        return (
            <div className="flex flex-col">
                {/* Header controls - Sticky */}
                <div className="sticky top-0 z-10 bg-primary p-2 border-b border-secondary">
                    <div className="flex items-center justify-between mb-2">
                        {/* Left: Circular back button - only show if not on main customizer state */}
                        {(showWidgetSelection || showWidgetConfig || showNavigationInTertiary) ? (
                            <ButtonUtility
                                size="sm"
                                color="tertiary"
                                icon={ArrowLeft}
                                tooltip="Back to Customizer"
                                onClick={handleBackToCustomizer}
                                className="rounded-full border border-secondary"
                            />
                        ) : (
                            <div></div> // Empty div to maintain layout
                        )}
                        
                        {/* Right: Space Settings link */}
                        <button
                            onClick={handleSpaceSettings}
                            className="flex items-center gap-1 px-1 py-0.5 text-xs font-medium transition-colors cursor-pointer text-brand-secondary hover:text-brand-secondary_hover"
                        >
                            <FlipBackward className="size-3" />
                            Back to CMS Settings
                        </button>
                    </div>
                    
                    {/* Title and Description */}
                    <div>
                        <h2 className="text-lg font-semibold text-primary">{getSidebarTitle()}</h2>
                        <p className="text-sm text-tertiary">{getSidebarDescription()}</p>
                    </div>
                </div>
                
                {/* Main content */}
                <div>
                    {content}
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
            <div className="p-4">
                {/* Control bar above browser mockup */}
                <div className="flex items-center justify-between mb-3">
                    {/* Left side: Device and Navigation ButtonGroups */}
                    <div className="flex items-center gap-4">
                        {/* Device ButtonGroup */}
                        <ButtonGroup 
                            size="sm"
                            selectedKeys={[selectedDevice]}
                            onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;
                                if (selected) handleDeviceChange(selected);
                            }}
                        >
                            <ButtonGroupItem id="mobile" iconLeading={Phone01} />
                            <ButtonGroupItem id="tablet" iconLeading={Tablet01} />
                            <ButtonGroupItem id="desktop" iconLeading={Monitor01} />
                        </ButtonGroup>
                        
                        {/* Navigation ButtonGroup */}
                        <ButtonGroup 
                            size="sm"
                            selectedKeys={[selectedNavigation]}
                            onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;
                                if (selected) handleNavigationChange(selected);
                            }}
                        >
                            <ButtonGroupItem id="backward" iconLeading={FlipBackward} />
                            <ButtonGroupItem id="forward" iconLeading={FlipForward} />
                        </ButtonGroup>
                    </div>
                    
                    {/* Right side: Save button */}
                    <Button
                        size="sm"
                        color="primary"
                        onClick={handleSaveChanges}
                    >
                        Save changes
                    </Button>
                </div>
                
                {/* Browser Mockup */}
                <BrowserMockup />
            </div>
        </DesignLayout>
    );
};
