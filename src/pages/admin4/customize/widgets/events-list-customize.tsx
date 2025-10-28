import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CustomizerLayout } from '@/components/layouts/customizer-layout';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import { EventsListConfig } from '@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-configs';

const EventsListCustomizePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  // Memoize config sidebar to prevent unnecessary re-renders
  const configSidebar = useMemo(() => <EventsListConfig />, []);

  const handleBack = () => {
    // Navigate back to main customize page
    // Remove /widget/events-list from the end
    const customizePath = currentPath.replace(/\/widget\/[^/]+$/, '');
    navigate(customizePath);
  };

  const handleSave = () => {
    console.log('Save widget config');
    // Add save logic here
  };

  const handleDiscard = () => {
    console.log('Discard changes');
    // Add discard logic here
  };

  return (
    <CustomizerLayout
      sidebarTitle="Configure Events List"
      sidebarDescription="Configure widget settings and appearance"
      currentPath={currentPath}
      onBack={handleBack}
      onSave={handleSave}
      onDiscard={handleDiscard}
      configSidebarContent={configSidebar}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          {/* Device preview buttons and other controls */}
          <div className="flex items-center gap-4">
            {/* Add device switcher here if needed */}
          </div>
        </div>
        
        <BrowserMockup 
          url="http://yoursite.com/events"
          title="Events Preview"
        />
      </div>
    </CustomizerLayout>
  );
};

export default EventsListCustomizePage;

