import { useState } from "react";
import {
    Settings01,
    Eye,
    EyeOff,
    Globe01,
    Users01,
    Home01,
    FolderCode,
    Image01,
    Star01,
    Gift01,
    Keyboard01,
    ChevronDown,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Toggle } from "@/components/base/toggle/toggle";
import { Select } from "@/components/base/select/select";
import { Badge } from "@/components/base/badges/badges";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { useLocation } from "react-router";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";

export const SiteSpacesCreatePage = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        communityName: "ACME Community",
        termsOfService: "",
        privacyPolicy: "",
        fileSizeLimit: "10",
        affiliateLink: "",
    });

    const [toggles, setToggles] = useState({
        isPublished: true,
        privateCommunity: false,
        inviteOnly: false,
        anyoneCanInvite: false,
        displayBadge: true,
        earnWithReferrals: false,
        keyboardShortcuts: true,
    });

    const [selectedSpaces] = useState([
        { id: "1", name: "Knowledge Base", image: "https://via.placeholder.com/24" },
        { id: "2", name: "Product Updates", image: "https://via.placeholder.com/24" },
        { id: "3", name: "Getting Started", image: "https://via.placeholder.com/24" },
        { id: "4", name: "Intros & Networking", image: "https://via.placeholder.com/24" },
        { id: "5", name: "Events", image: "https://via.placeholder.com/24" },
        { id: "6", name: "Ask the Community", image: "https://via.placeholder.com/24" },
    ]);

    const [selectedFileTypes] = useState([
        "image/*", "audio/*", "video/*", ".pdf", "application/json"
    ]);

    const headerActions = (
        <div className="flex items-center gap-2">
            <Button size="sm" color="tertiary">
                Preview Changes
            </Button>
            <Button size="sm" iconLeading={Settings01}>
                Advanced Settings
            </Button>
        </div>
    );

    const handleInputChange = (name: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (name: string, checked: boolean) => {
        setToggles(prev => ({ ...prev, [name]: checked }));
    };

    return (
        <AdminLayout 
            title="Site settings"
            hideHeader={true}
            description="Configure general settings, permissions, and preferences for your community"
            currentPath={location.pathname}
            headerActions={headerActions}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="flex-1 overflow-y-auto">
                    <BrowserMockup />
                </div>
            </div>
        </AdminLayout>
    );
}; 