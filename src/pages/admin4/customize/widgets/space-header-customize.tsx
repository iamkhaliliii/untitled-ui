import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CustomizerLayout } from '@/components/layouts/customizer-layout';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import { SpaceHeaderConfig } from '@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-configs';
import { Button } from '@/components/base/buttons/button';
import { ButtonGroup, ButtonGroupItem } from '@/components/base/button-group/button-group';
import { Phone01, Tablet01, Monitor01, FlipBackward, FlipForward, Sun, Moon01 } from '@untitledui/icons';

const SpaceHeaderCustomizePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  // Device and navigation state
  const [selectedDevice, setSelectedDevice] = useState<string>("desktop");
  const [selectedNavigation, setSelectedNavigation] = useState<string>("forward");
  const [selectedTheme, setSelectedTheme] = useState<string>("light");
  
  // Memoize config sidebar to prevent unnecessary re-renders
  const configSidebar = useMemo(() => <SpaceHeaderConfig />, []);

  const handleBack = () => {
    // Navigate back to main customize page
    const customizePath = currentPath.replace(/\/widget\/[^/]+$/, '');
    navigate(customizePath);
  };

  const handleSave = () => {
    console.log('Save space header config');
  };

  const handleDiscard = () => {
    console.log('Discard changes');
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
    handleSave();
  };

  return (
    <CustomizerLayout
      sidebarTitle="Configure Space Header"
      sidebarDescription="Configure space header settings and appearance"
      currentPath={currentPath}
      onBack={handleBack}
      onSave={handleSave}
      onDiscard={handleDiscard}
      configSidebarContent={configSidebar}
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
        
        <BrowserMockup 
          url="http://yoursite.com/space"
          title="Space Header Preview"
          theme={selectedTheme as 'light' | 'dark'}
          device={selectedDevice as 'mobile' | 'tablet' | 'desktop'}
        />
      </div>
    </CustomizerLayout>
  );
};

export default SpaceHeaderCustomizePage;

