import React, { useState } from 'react';
import { BrowserMockup } from '@/components/application/browser-mockup/browser-mockup';
import WidgetConfig from '@/components/application/app-navigation/sidebar-navigation/tertiary-sidebar/widget-config';
import { WidgetConfigProvider } from '@/providers/widget-config-provider';
import { AdminLayout } from '@/components/layouts/admin-layout';
import { Calendar, Save01 } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';

const EventsCustomizePage = () => {
  const [selectedWidget] = useState({
    id: 'events-list',
    label: 'Events List',
    icon: <Calendar className="h-4 w-4" />
  });

  const handleBack = () => {
    console.log('Back clicked');
  };

  const handleSave = () => {
    console.log('Save clicked');
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
    <WidgetConfigProvider>
      <AdminLayout
        hideHeader={true}
        title="Events Widget Customization"
        description="Customize the appearance and behavior of your events list widget"
        headerActions={headerActions}
        currentPath="/admin/site/spaces/myfolder/events/customize"

      >
        <div className="flex h-full">
          {/* Right side - Browser Mockup */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto">
              <BrowserMockup 
                url="http://yoursite.com/events"
                title="Events Customization"
              />
            </div>
          </div>
        </div>
      </AdminLayout>
    </WidgetConfigProvider>
  );
};

export default EventsCustomizePage; 