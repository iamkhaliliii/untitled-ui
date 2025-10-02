import {
    CodeBrowser,
    Package,
    Settings01,
    Globe01,
    Plus,
    SearchLg,
    Eye,
    Edit01,
    Trash01,
    CheckDone01,
    BarChartSquare02,
    Users01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
export const AdminSitePage = () => {

    return (
        <Admin4Layout 
            title="Site Management"
            description="Manage your website settings, themes, and configurations"
            currentPath="/admin4/site"
            hideHeader={true}
        >
            <div className="px-4 py-6 lg:px-6">
                <BrowserMockup />
            </div>
        </Admin4Layout>
    );
}; 