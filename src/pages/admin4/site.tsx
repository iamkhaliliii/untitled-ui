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
    Folder,
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
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <div className="max-w-sm mx-auto">
                        <div className="mb-3">
                            <Folder className="mx-auto size-12 text-quaternary" />
                        </div>
                        <h3 className="text-base font-semibold text-primary mb-1.5">
                            Select a space to get started
                        </h3>
                        <p className="text-sm text-tertiary">
                            Choose a space from the sidebar to manage its settings.
                        </p>
                    </div>
                </div>
            </div>
        </Admin4Layout>
    );
}; 