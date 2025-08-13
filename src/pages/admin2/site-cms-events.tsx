import { AdminLayout } from "@/components/layouts/admin-layout";
import { useLocation } from "react-router";

export const SiteCmsEventsPage = () => {
    const location = useLocation();
    
    return (
        <AdminLayout title="CMS Events" currentPath={location.pathname}>
            <div className="flex h-full">
                <div className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-primary mb-2">
                                CMS Events
                            </h1>
                            <p className="text-secondary">
                                Manage your events content and configuration
                            </p>
                        </div>
                        
                        {/* Main content area */}
                        <div className="bg-primary border border-secondary rounded-lg p-6">
                            <p className="text-secondary">
                                CMS Events content will be displayed here based on the selected tab (Settings or Customize).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
