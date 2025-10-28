import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CustomizerLayout } from '@/components/layouts/customizer-layout';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import { SpaceHeaderConfig } from '@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-configs';

const SpaceHeaderCustomizePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
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
        <BrowserMockup 
          url="http://yoursite.com/space"
          title="Space Header Preview"
        />
      </div>
    </CustomizerLayout>
  );
};

export default SpaceHeaderCustomizePage;

