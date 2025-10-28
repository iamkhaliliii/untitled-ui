import { useLocation, useNavigate } from 'react-router';
import { CustomizerLayout } from '@/components/layouts/customizer-layout';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import { KnowledgesListConfig } from '@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-configs';

const KnowledgesListCustomizePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleBack = () => {
    // Navigate back to main customize page
    const customizePath = currentPath.replace(/\/widget\/[^/]+$/, '');
    navigate(customizePath);
  };

  const handleSave = () => {
    console.log('Save knowledges list config');
  };

  return (
    <CustomizerLayout
      sidebarTitle="Configure Knowledges List"
      sidebarDescription="Configure widget settings and appearance"
      currentPath={currentPath}
      onBack={handleBack}
      onSave={handleSave}
      configSidebarContent={<KnowledgesListConfig />}
    >
      <div className="p-4">
        <BrowserMockup 
          url="http://yoursite.com/knowledges"
          title="Knowledges Preview"
        />
      </div>
    </CustomizerLayout>
  );
};

export default KnowledgesListCustomizePage;

