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
import { ArrowLeft, FlipBackward, FlipForward, Phone01, Tablet01, Monitor01, Settings01, Sun, Moon01 } from "@untitledui/icons";
import { useWidgetConfig } from "@/providers/widget-config-provider";

export const SiteSpacesHelpCustomizePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check if user came from Page Customizer
    const cameFromPageCustomizer = location.state?.from === 'page-customizer' || 
                                   document.referrer.includes('/admin4/design/page-customizer');
    const currentPath = location.pathname;
    
    // Use widget config context for toggle states and widgets
    const { toggleStates, updateToggleStates: contextUpdateToggleStates, addSpaceWidget, addSidebarWidget } = useWidgetConfig();
    
    const [customizeExpandedIds, setCustomizeExpandedIds] = useState<string[]>([]);
    
    // Device and navigation state
    const [selectedDevice, setSelectedDevice] = useState<string>("desktop");
    const [selectedNavigation, setSelectedNavigation] = useState<string>("forward");
    const [selectedTheme, setSelectedTheme] = useState<string>("light");
    
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
        if (currentPath.includes("/admin4/site/spaces/private-space")) {
            return "Customize your private space layout and appearance";
        }
        if (currentPath.includes("/admin4/site/spaces/growth/question")) {
            return "Customize your question page layout and appearance";
        }
        return "Customize your question page layout and appearance";
    };

    const getMainTitle = () => {
        return "Customizer";
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
        // Navigate to dedicated widget config page
        const widgetSlug = widget.label.toLowerCase().replace(/\s+/g, '-');
        const basePath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
        navigate(`${basePath}/widget/${widgetSlug}`);
    };

    const handleEditGlobalWidgets = () => {
        // Navigate to design navigation page with state to track where we came from
        navigate('/admin4/design/site-appearance/navigation', {
            state: { 
                from: 'customize-page',
                returnTo: location.pathname 
            }
        });
    };

    const handleWidgetSelect = (widget: any) => {
        console.log('Selected widget:', widget);
        
        if (widgetSelectionType === 'space') {
            // Add widget to space widgets section
            addSpaceWidget({
                id: `${widget.id}_${Date.now()}`, // Unique ID with timestamp
                label: widget.label,
                icon: widget.icon,
                containerId: 'mainColumn', // Default to main column
            });
            console.log(`Added widget "${widget.label}" to Space Widgets section`);
        } else if (widgetSelectionType === 'sidebar') {
            // Add widget to sidebar widgets section
            addSidebarWidget({
                id: `${widget.id}_${Date.now()}`, // Unique ID with timestamp
                label: widget.label,
                icon: widget.icon,
            });
            console.log(`Added widget "${widget.label}" to Sidebar Widgets section`);
        }
        
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
        // Navigate back to the main help page (without /customize)
        const basePath = currentPath.replace('/customize', '');
        navigate(basePath);
    };
    
    // Back to Page Customizer handler
    const handleBackToPageCustomizer = () => {
        navigate('/admin4/design/page-customizer');
    };

    // Device selection handler
    const handleDeviceChange = (device: string) => {
        setSelectedDevice(device);
    };

    // Navigation handler
    const handleNavigationChange = (direction: string) => {
        setSelectedNavigation(direction);
    };

    // Theme handler
    const handleThemeChange = (theme: string) => {
        setSelectedTheme(theme);
    };

    // Save changes handler
    const handleSaveChanges = () => {
        console.log("Save changes clicked");
        // Add save functionality here
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
        
        return "Customize your question page layout and appearance";
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
                {/* Header Section - Match Page Customizer styling */}
                <div className="px-4 mt-6 lg:px-5 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        {/* Left: Back button - show widget back button OR page customizer back button */}
                        {(showWidgetSelection || showWidgetConfig || showNavigationInTertiary) ? (
                            <button
                                onClick={handleBackToCustomizer}
                                className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                            >
                                <ArrowLeft className="size-4 text-fg-quaternary" />
                            </button>
                        ) : cameFromPageCustomizer ? (
                            <button
                                onClick={handleBackToPageCustomizer}
                                className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                            >
                                <ArrowLeft className="size-4 text-fg-quaternary" />
                            </button>
                        ) : (
                            <div></div> // Empty div to maintain layout
                        )}
                        
                        {/* Right: Space Settings button - only show on main customizer state */}
                        {!(showWidgetSelection || showWidgetConfig || showNavigationInTertiary) && (
                            <button
                                onClick={handleSpaceSettings}
                                className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                            >
                                <Settings01 className="size-4 text-fg-quaternary" />
                            </button>
                        )}
                    </div>
                    
                    {/* Title and Description */}
                    <div className="mb-3">
                        <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">{getSidebarTitle()}</h3>
                        <p className="text-sm text-tertiary mt-1">{getSidebarDescription()}</p>
                    </div>
                </div>
                
                {/* Main content */}
                <div className="mt-2 px-4">
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

                        {/* Theme ButtonGroup */}
                        <ButtonGroup 
                            size="sm"
                            selectedKeys={[selectedTheme]}
                            onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;
                                if (selected) handleThemeChange(selected);
                            }}
                        >
                            <ButtonGroupItem id="light" iconLeading={Sun} />
                            <ButtonGroupItem id="dark" iconLeading={Moon01} />
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
                <BrowserMockup 
                  theme={selectedTheme as 'light' | 'dark'}
                  device={selectedDevice as 'mobile' | 'tablet' | 'desktop'}
                />
            </div>
        </DesignLayout>
    );
};
