import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CustomizerLayout } from '@/components/layouts/customizer-layout';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import { QuestionsListConfig } from '@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-configs';
import { Button } from '@/components/base/buttons/button';
import { ButtonGroup, ButtonGroupItem } from '@/components/base/button-group/button-group';
import { Phone01, Tablet01, Monitor01, FlipBackward, FlipForward, Sun, Moon01 } from '@untitledui/icons';

const QuestionsListCustomizePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [selectedDevice, setSelectedDevice] = useState<string>("desktop");
  const [selectedNavigation, setSelectedNavigation] = useState<string>("forward");
  const [selectedTheme, setSelectedTheme] = useState<string>("light");

  const handleBack = () => {
    const customizePath = currentPath.replace(/\/widget\/[^/]+$/, '');
    navigate(customizePath);
  };

  const handleSave = () => {
    console.log('Save questions list config');
  };

  const handleDeviceChange = (device: string) => {
    setSelectedDevice(device);
  };

  const handleNavigationChange = (direction: string) => {
    setSelectedNavigation(direction);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
  };

  const handleSaveChanges = () => {
    handleSave();
  };

  return (
    <CustomizerLayout
      sidebarTitle="Configure Questions List"
      sidebarDescription="Configure widget settings and appearance"
      currentPath={currentPath}
      onBack={handleBack}
      onSave={handleSave}
      configSidebarContent={<QuestionsListConfig />}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
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
          
          <Button size="sm" color="primary" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </div>
        
        <BrowserMockup 
          url="http://yoursite.com/questions"
          title="Questions Preview"
          theme={selectedTheme as 'light' | 'dark'}
          device={selectedDevice as 'mobile' | 'tablet' | 'desktop'}
        />
      </div>
    </CustomizerLayout>
  );
};

export default QuestionsListCustomizePage;
