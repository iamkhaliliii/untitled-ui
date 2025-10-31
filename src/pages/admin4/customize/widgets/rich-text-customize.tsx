import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CustomizerLayout } from '@/components/layouts/customizer-layout';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import { RichTextConfig } from '@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-configs/rich-text-config';
import { Button } from '@/components/base/buttons/button';
import { ButtonGroup, ButtonGroupItem } from '@/components/base/button-group/button-group';
import { Phone01, Tablet01, Monitor01, FlipBackward, FlipForward, Sun, Moon01 } from '@untitledui/icons';

const RichTextCustomizePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  const [selectedDevice, setSelectedDevice] = useState<string>("desktop");
  const [selectedNavigation, setSelectedNavigation] = useState<string>("forward");
  const [selectedTheme, setSelectedTheme] = useState<string>("light");
  
  const configSidebar = useMemo(() => <RichTextConfig />, []);

  const handleBack = () => {
    const customizePath = currentPath.replace(/\/widget\/[^/]+$/, '');
    navigate(customizePath);
  };

  const handleSave = () => console.log('Save rich text config');
  const handleDiscard = () => console.log('Discard changes');
  const handleDeviceChange = (device: string) => setSelectedDevice(device);
  const handleNavigationChange = (direction: string) => setSelectedNavigation(direction);
  const handleThemeChange = (theme: string) => setSelectedTheme(theme);
  const handleSaveChanges = () => handleSave();

  return (
    <CustomizerLayout
      sidebarTitle="Configure Rich Text"
      sidebarDescription="Add formatted text content with styling"
      currentPath={currentPath}
      onBack={handleBack}
      onSave={handleSave}
      onDiscard={handleDiscard}
      configSidebarContent={configSidebar}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <ButtonGroup size="sm" selectedKeys={[selectedDevice]} onSelectionChange={(keys) => handleDeviceChange(Array.from(keys)[0] as string)}>
              <ButtonGroupItem id="mobile" iconLeading={Phone01} />
              <ButtonGroupItem id="tablet" iconLeading={Tablet01} />
              <ButtonGroupItem id="desktop" iconLeading={Monitor01} />
            </ButtonGroup>
            <ButtonGroup size="sm" selectedKeys={[selectedNavigation]} onSelectionChange={(keys) => handleNavigationChange(Array.from(keys)[0] as string)}>
              <ButtonGroupItem id="backward" iconLeading={FlipBackward} />
              <ButtonGroupItem id="forward" iconLeading={FlipForward} />
            </ButtonGroup>
            <ButtonGroup size="sm" selectedKeys={[selectedTheme]} onSelectionChange={(keys) => handleThemeChange(Array.from(keys)[0] as string)}>
              <ButtonGroupItem id="light" iconLeading={Sun} />
              <ButtonGroupItem id="dark" iconLeading={Moon01} />
            </ButtonGroup>
          </div>
          <Button size="sm" color="primary" onClick={handleSaveChanges}>Save changes</Button>
        </div>
        <BrowserMockup url="http://yoursite.com/space" title="Rich Text Preview" theme={selectedTheme as 'light' | 'dark'} device={selectedDevice as 'mobile' | 'tablet' | 'desktop'} />
      </div>
    </CustomizerLayout>
  );
};

export default RichTextCustomizePage;

