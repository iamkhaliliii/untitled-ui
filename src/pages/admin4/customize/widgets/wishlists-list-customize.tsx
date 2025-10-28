import { useLocation, useNavigate } from 'react-router';
import { CustomizerLayout } from '@/components/layouts/customizer-layout';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import { WishlistsListConfig } from '@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/widget-configs';

const WishlistsListCustomizePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleBack = () => {
    // Navigate back to main customize page
    const customizePath = currentPath.replace(/\/widget\/[^/]+$/, '');
    navigate(customizePath);
  };

  const handleSave = () => {
    console.log('Save wishlists list config');
  };

  return (
    <CustomizerLayout
      sidebarTitle="Configure Wishlists List"
      sidebarDescription="Configure widget settings and appearance"
      currentPath={currentPath}
      onBack={handleBack}
      onSave={handleSave}
      configSidebarContent={<WishlistsListConfig />}
    >
      <div className="p-4">
        <BrowserMockup 
          url="http://yoursite.com/wishlists"
          title="Wishlists Preview"
        />
      </div>
    </CustomizerLayout>
  );
};

export default WishlistsListCustomizePage;

