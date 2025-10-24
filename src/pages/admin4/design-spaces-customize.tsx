import { useNavigate, useLocation, useParams } from "react-router";
import { DesignLayout } from "@/components/layouts/design-layout";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
import { useState, useEffect, useRef } from "react";
import { EventsCustomizeSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-customize-settings";
import { WidgetSelection } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-selection";
import WidgetConfig from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-config";
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { ArrowLeft, FlipBackward, FlipForward, Phone01, Tablet01, Monitor01, Settings01, Edit02 } from "@untitledui/icons";
import { useWidgetConfig } from "@/providers/widget-config-provider";

export const DesignSpacesCustomizePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    
    // Get space type from URL path or state
    const spaceType = params.spaceType || location.state?.spaceType || 'discussions';
    
    // Check if user came from space creation
    const cameFromSpaceCreation = location.state?.from === 'space-creation' || 
                                   document.referrer.includes('/admin4/design/spaces/create');
    const currentPath = location.pathname;
    
    // Use widget config context for toggle states
    const { toggleStates, updateToggleStates: contextUpdateToggleStates } = useWidgetConfig();
    
    const [customizeExpandedIds, setCustomizeExpandedIds] = useState<string[]>([]);
    
    // Space name editing state
    const [spaceName, setSpaceName] = useState<string>(() => {
        const typeLabel = spaceType.charAt(0).toUpperCase() + spaceType.slice(1);
        return `New ${typeLabel} Template`;
    });
    const [isEditingSpaceName, setIsEditingSpaceName] = useState<boolean>(true); // Start in edit mode
    const spaceNameInputRef = useRef<HTMLInputElement>(null);
    
    // Auto-focus on space name input when page loads
    useEffect(() => {
        if (isEditingSpaceName && spaceNameInputRef.current) {
            spaceNameInputRef.current.focus();
            spaceNameInputRef.current.select();
        }
    }, [isEditingSpaceName]);
    
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
    
    // Get page title and description based on space type
    const getPageTitle = () => {
        const typeLabel = spaceType.charAt(0).toUpperCase() + spaceType.slice(1);
        return `Customize your ${typeLabel.toLowerCase()} space layout and appearance`;
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
        setSelectedWidgetForConfig(widget);
        setShowWidgetConfig(true);
        setShowWidgetSelection(false);
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

    // Space Settings button handler (currently unused in design mode but kept for consistency)
    const handleSpaceSettings = () => {
        console.log("Space settings clicked");
    };
    
    // Back to Space Creation handler
    const handleBackToSpaceCreation = () => {
        navigate('/admin4/design/spaces/create', {
            state: {
                selectedSpaceType: spaceType
            }
        });
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
    
    // Space name editing handlers
    const handleSpaceNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsEditingSpaceName(false);
        } else if (e.key === 'Escape') {
            // Reset to original name and exit edit mode
            const typeLabel = spaceType.charAt(0).toUpperCase() + spaceType.slice(1);
            setSpaceName(`New ${typeLabel} Template`);
            setIsEditingSpaceName(false);
        }
    };

    const handleSpaceNameBlur = () => {
        setIsEditingSpaceName(false);
    };

    const handleSpaceNameClick = () => {
        if (!isEditingSpaceName) {
            setIsEditingSpaceName(true);
        }
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
        
        const typeLabel = spaceType.charAt(0).toUpperCase() + spaceType.slice(1);
        return `Customize your ${typeLabel.toLowerCase()} space layout and appearance`;
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
            <div className="flex flex-col h-full">
                {/* Header Section - Match Page Customizer styling */}
                <div className="px-4 mt-6 lg:px-5 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        {/* Left: Back button - show widget back button OR space creation back button */}
                        {(showWidgetSelection || showWidgetConfig || showNavigationInTertiary) ? (
                            <button
                                onClick={handleBackToCustomizer}
                                className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                            >
                                <ArrowLeft className="size-4 text-fg-quaternary" />
                            </button>
                        ) : cameFromSpaceCreation ? (
                            <button
                                onClick={handleBackToSpaceCreation}
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
                        {/* Show editable space name only in main customizer state (not in widget selection/config) */}
                        {!(showWidgetSelection || showWidgetConfig || showNavigationInTertiary) ? (
                            <>
                                {isEditingSpaceName ? (
                                    <input
                                        ref={spaceNameInputRef}
                                        type="text"
                                        value={spaceName}
                                        onChange={(e) => setSpaceName(e.target.value)}
                                        onKeyDown={handleSpaceNameKeyDown}
                                        onBlur={handleSpaceNameBlur}
                                        className="w-full text-[1.35rem] font-semibold text-primary tracking-tight bg-primary border border-brand-solid rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-solid focus:border-transparent transition-all shadow-sm"
                                        placeholder="Enter space name"
                                    />
                                ) : (
                                    <div 
                                        onClick={handleSpaceNameClick}
                                        className="group flex items-center gap-2 cursor-text px-1 hover:opacity-70 transition-opacity"
                                    >
                                        <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">
                                            {spaceName}
                                        </h3>
                                        <Edit02 className="size-4 text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )}
                            </>
                        ) : (
                            <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">{getSidebarTitle()}</h3>
                        )}
                        <p className="text-sm text-tertiary mt-1">{getSidebarDescription()}</p>
                    </div>
                </div>
                
                {/* Main content */}
                <div className="mt-2 flex-1 min-h-0 overflow-y-auto px-4">
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
                
                {/* Browser Mockup with selected space type preview */}
                <BrowserMockup previewType={spaceType} />
            </div>
        </DesignLayout>
    );
};

