import React, { useState } from 'react';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import WidgetConfig from '@/components/application/app-navigation/sidebar-navigation/tertiary-sidebar/widget-config';

import { AdminLayout } from '@/components/layouts/admin-layout';
import { Calendar, Save01 } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';

const EventsCustomizePage = () => {
  const currentPath = window.location.pathname;
  const isPrivateSpacePage = currentPath.includes("/admin/site/spaces/private-space");
  
  const [selectedWidget] = useState({
    id: isPrivateSpacePage ? 'private-space-list' : 'events-list',
    label: isPrivateSpacePage ? 'Private Space' : 'Events List',
    icon: <Calendar className="h-4 w-4" />
  });

  const handleBack = () => {
    console.log('Back clicked');
  };

  const handleSave = () => {
    console.log('Save clicked');
  };

  // Get title and description based on space type
  const getTitle = () => {
    if (isPrivateSpacePage) return "Private Space Customization";
    return "Events Widget Customization";
  };

  const getDescription = () => {
    if (isPrivateSpacePage) return "Customize the appearance and behavior of your private space";
    return "Customize the appearance and behavior of your events list widget";
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button 
        color="secondary" 
        size="sm"
        onClick={handleBack}
      >
        Back
      </Button>
      <Button 
        color="primary" 
        size="sm"
        iconLeading={Save01}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );

  return (
      <AdminLayout
        hideHeader={true}
        title={getTitle()}
        description={getDescription()}
        headerActions={headerActions}
        currentPath={currentPath}

      >
        <div className="flex h-full">
          {/* Right side - Browser Mockup */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
              <BrowserMockup 
                url="http://yoursite.com/events"
                title="Events Customization"
              />
            </div>
          </div>
        </div>
      </AdminLayout>
  );
};

export default EventsCustomizePage; 