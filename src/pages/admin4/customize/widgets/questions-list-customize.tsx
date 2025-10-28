import { useLocation, useNavigate } from 'react-router';
import { CustomizerLayout } from '@/components/layouts/customizer-layout';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import { QuestionsListConfig } from '@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-configs';

const QuestionsListCustomizePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleBack = () => {
    // Navigate back to main customize page
    const customizePath = currentPath.replace(/\/widget\/[^/]+$/, '');
    navigate(customizePath);
  };

  const handleSave = () => {
    console.log('Save questions list config');
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
        <BrowserMockup 
          url="http://yoursite.com/questions"
          title="Questions Preview"
        />
      </div>
    </CustomizerLayout>
  );
};

export default QuestionsListCustomizePage;

