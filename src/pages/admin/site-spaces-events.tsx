import {
    Calendar,
    Plus,
    SearchLg,
    Eye,
    Edit01,
    Trash01,
    Users01,
    MarkerPin01,
    Clock,
    Tag01,
    FilterFunnel01,
    ArrowUpRight,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { useNavigate } from "react-router";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
import { WidgetConfigProvider } from '@/providers/widget-config-provider';

export const SiteSpacesEventsPage = () => {
    const navigate = useNavigate();
    const currentPath = window.location.pathname;
    const isEventsPage = currentPath.includes("/admin/site/spaces/myfolder/events");
    
    // Get page title based on current path
    const getPageTitle = () => {
        if (currentPath.includes("/customize")) return "Customize your events page layout and appearance";
        if (currentPath.includes("/members")) return "Manage event members and permissions";
        if (currentPath.includes("/seo")) return "Configure SEO settings for your events";
        if (currentPath.includes("/danger")) return "Danger zone - irreversible actions";
        return "Manage and organize events in your personal workspace";
    };

    return (
        <AdminLayout 
            title="MyFolder - Events"
            description={getPageTitle()}
            currentPath={currentPath}
            hideHeader={isEventsPage}
        >
            <WidgetConfigProvider>
                <div className="px-4 py-6 lg:px-6">
                    <BrowserMockup />
                </div>
            </WidgetConfigProvider>
        </AdminLayout>
    );
};
 