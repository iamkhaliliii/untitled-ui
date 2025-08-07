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

export const AdminSiteSettingsPage = () => {
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
            description="Configure general settings, permissions, and preferences for your community"
            currentPath={location.pathname}
            headerActions={headerActions}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="flex flex-col space-y-5 max-w-3xl">

                    {/* General Settings */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl" id="general-settings">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">General settings</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6 flex flex-col space-y-5">
                            <form className="relative">
                                <div className="flex flex-col space-y-5">
                                    <div className="space-y-1">
                                        <Label htmlFor="communityName">Community name</Label>
                                        <Input
                                            id="communityName"
                                            name="communityName"
                                            value={formData.communityName}
                                            onChange={(value) => handleInputChange("communityName", value)}
                                            placeholder="ACME Community"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="termsOfService">Terms of service</Label>
                                        <Input
                                            id="termsOfService"
                                            name="termsOfService"
                                            value={formData.termsOfService}
                                            onChange={(value) => handleInputChange("termsOfService", value)}
                                            placeholder="https://example.com/terms"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="privacyPolicy">Privacy policy</Label>
                                        <Input
                                            id="privacyPolicy"
                                            name="privacyPolicy"
                                            value={formData.privacyPolicy}
                                            onChange={(value) => handleInputChange("privacyPolicy", value)}
                                            placeholder="https://example.com/privacy"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Publish Settings */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl" id="publish">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Publish settings</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {toggles.isPublished ? (
                                        <Eye className="h-5 w-5 text-success" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-error" />
                                    )}
                                    <p className="text-primary">
                                        {toggles.isPublished 
                                            ? "Your site is published and visible to everyone."
                                            : "Your site is unpublished and not visible to the public."
                                        }
                                    </p>
                                </div>
                                <Button 
                                    size="sm" 
                                    color={toggles.isPublished ? "secondary" : "primary"}
                                    onClick={() => handleToggleChange("isPublished", !toggles.isPublished)}
                                >
                                    {toggles.isPublished ? "Unpublish" : "Publish"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Permissions */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl" id="permissions">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Permissions</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative">
                                <div className="flex flex-col space-y-5">
                                    <Toggle
                                        label="Private community"
                                        hint="Allow only community members to view and browse the community."
                                        isSelected={toggles.privateCommunity}
                                        onChange={(checked) => handleToggleChange("privateCommunity", checked)}
                                        size="sm"
                                        slim
                                    />
                                    <Toggle
                                        label="Invite-only"
                                        hint="Allow only people with an invite to join as community members."
                                        isSelected={toggles.inviteOnly}
                                        onChange={(checked) => handleToggleChange("inviteOnly", checked)}
                                        size="sm"
                                        slim
                                    />
                                    <Toggle
                                        label="Anyone can invite"
                                        hint="Allow non-admin members to invite others to the community."
                                        isSelected={toggles.anyoneCanInvite}
                                        onChange={(checked) => handleToggleChange("anyoneCanInvite", checked)}
                                        size="sm"
                                        slim
                                    />
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Homepage Settings */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl" id="homepage-settings">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Homepage settings</h3>
                                <div className="text-tertiary mt-1">
                                    <p>Choose the landing page for visitors and members when they visit the community.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6 flex flex-col space-y-5">
                            <form className="relative">
                                <div className="space-y-5">
                                    <div>
                                        <Label>Default homepage for logged-out visitors</Label>
                                        <div className="mt-1 space-y-2">
                                            <Select placeholder="Select page">
                                                <option value="explore">Explore</option>
                                                <option value="feed">Feed</option>
                                                <option value="about">About</option>
                                            </Select>
                                            <p className="text-sm text-tertiary">
                                                Choose the page for public visitors who haven't logged in. If your community is private, they will be redirected to the login page.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Default homepage for returning members</Label>
                                        <div className="mt-1 space-y-2">
                                            <Select placeholder="Select page">
                                                <option value="feed" selected>Feed</option>
                                                <option value="explore">Explore</option>
                                                <option value="dashboard">Dashboard</option>
                                            </Select>
                                            <p className="text-sm text-tertiary">
                                                This is the landing page for existing members returning to your site.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Landing page for new members</Label>
                                        <div className="mt-1 space-y-2">
                                            <Select placeholder="Same as default homepage for returning members">
                                                <option value="onboarding">Onboarding</option>
                                                <option value="welcome">Welcome</option>
                                                <option value="feed">Feed</option>
                                            </Select>
                                            <p className="text-sm text-tertiary">
                                                Set a specific page to welcome new members after sign-up, regardless of their past activity or interactions. This is ideal for onboarding or introductory content.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" disabled>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Default Spaces */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Default spaces</h3>
                                <div className="text-tertiary mt-1">
                                    <p>Select which spaces you want new members to be automatically added to.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="flex flex-col space-y-5">
                                <div className="relative">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSpaces.map((space) => (
                                            <Badge
                                                key={space.id}
                                                size="md"
                                                className="flex items-center gap-2 px-3 py-2"
                                            >
                                                <img 
                                                    src={space.image} 
                                                    alt={space.name}
                                                    className="w-4 h-4 rounded-sm"
                                                />
                                                <span>{space.name}</span>
                                                <button className="ml-1 hover:text-error">
                                                    ×
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button size="sm">
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Media Settings */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Media settings</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative">
                                <div className="flex flex-col space-y-5">
                                    <div className="space-y-1">
                                        <Label htmlFor="fileSizeLimit">Attachment and video size limit</Label>
                                        <div className="space-y-2">
                                            <Input
                                                type="number"
                                                id="fileSizeLimit"
                                                name="fileSizeLimit"
                                                value={formData.fileSizeLimit}
                                                onChange={(value) => handleInputChange("fileSizeLimit", value)}
                                                placeholder="10"
                                            />
                                            <div className="text-sm text-tertiary">
                                                The maximum size for each attachment or inline video (in MB).
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Supported file types</Label>
                                        <div className="flex flex-wrap gap-2 p-3 border border-secondary rounded-lg bg-secondary/20">
                                            {selectedFileTypes.map((type, index) => (
                                                <Badge
                                                    key={index}
                                                    size="sm"
                                                    className="flex items-center gap-1"
                                                >
                                                    <span>{type}</span>
                                                    <button className="ml-1 hover:text-error">
                                                        ×
                                                    </button>
                                                </Badge>
                                            ))}
                                            <Input 
                                                placeholder="Add file type..."
                                                className="border-0 bg-transparent text-sm w-32"
                                            />
                                        </div>
                                        <div className="text-sm text-tertiary space-y-1">
                                            <p>By default, we support all video, image, audio, and pdf files.</p>
                                            <p>
                                                Define what file types can be uploaded in your community. You can use either{" "}
                                                <a 
                                                    href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                >
                                                    MIME types
                                                </a>
                                                {" "}(e.g. image/*) or extensions (e.g. .docx).
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Branding & Referrals */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg flex items-center gap-2">
                                <span>Branding & Referrals</span>
                            </h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative">
                                <div className="flex flex-col space-y-5">
                                    <Toggle
                                        label="Display Bettermode badge"
                                        hint='Show a "Made in Bettermode" badge on your site and in email footers.'
                                        isSelected={toggles.displayBadge}
                                        onChange={(checked) => handleToggleChange("displayBadge", checked)}
                                        size="sm"
                                        slim
                                    />
                                    
                                    {toggles.displayBadge && (
                                        <div className="pl-4 space-y-4">
                                            <Toggle
                                                label="Earn with referrals"
                                                hint={
                                                    <span>
                                                        Turn this on to replace the badge link with your own affiliate link and earn rewards. Must join the affiliate program first. Potential rewards up to $1,000!{" "}
                                                        <a 
                                                            href="/hub/referrals?utm_source=adminpanel&utm_campaign=whitelabelsetting"
                                                            className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                        >
                                                            Learn more
                                                        </a>
                                                    </span>
                                                }
                                                isSelected={toggles.earnWithReferrals}
                                                onChange={(checked) => handleToggleChange("earnWithReferrals", checked)}
                                                size="sm"
                                                slim
                                            />
                                            <div className="space-y-1">
                                                <Label htmlFor="affiliateLink">Your affiliate link</Label>
                                                <Input
                                                    type="url"
                                                    id="affiliateLink"
                                                    name="affiliateLink"
                                                    value={formData.affiliateLink}
                                                    onChange={(value) => handleInputChange("affiliateLink", value)}
                                                    placeholder="https://bettermode.cello.so/[your referral code]"
                                                    isDisabled={!toggles.earnWithReferrals}
                                                />
                                                <div className="text-sm text-tertiary">
                                                    Copy and share your unique link to invite others and earn rewards.<br />
                                                    Need your link?{" "}
                                                    <a 
                                                        href="https://app.bettermode.com/referral?utm_source=adminpanel&utm_campaign=whitelabelsetting"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                    >
                                                        Join our affiliate program
                                                    </a>
                                                    {" "}and paste it here to start earning.
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Other Settings */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Other settings</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative">
                                <div className="flex flex-col space-y-5">
                                    <Toggle
                                        label="Enable Keyboard Shortcuts"
                                        hint={
                                            <span>
                                                When disabled, most keyboard shortcuts will be turned off, but text formatting shortcuts in the post editor and basic system shortcuts will still work.{" "}
                                                <a 
                                                    href="/hub/getting-started/post/keyboard-shortcuts-0e97HvUgMgqW5fA"
                                                    className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                >
                                                    Learn more
                                                </a>
                                            </span>
                                        }
                                        isSelected={toggles.keyboardShortcuts}
                                        onChange={(checked) => handleToggleChange("keyboardShortcuts", checked)}
                                        size="sm"
                                        slim
                                    />
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" disabled>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}; 