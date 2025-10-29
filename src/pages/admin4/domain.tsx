import { useState } from "react";
import { Copy01, LinkExternal01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";

export const AdminDomainPage = () => {
    const location = useLocation();
    
    const [domainSettings, setDomainSettings] = useState({
        currentDomain: "https://bettermode.tribeplatform.com",
        newDomain: "",
    });

    const handleInputChange = (name: string, value: string) => {
        setDomainSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(domainSettings.currentDomain);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle domain transfer check
        console.log("Check transferability for:", domainSettings.newDomain);
    };

    return (
        <Admin4Layout 
            title="Domain"
            description="Configure your custom domain settings"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="max-w-3xl flex flex-col items-start justify-start self-start space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5">
                    
                    {/* Domain Settings Card */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl w-full">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Domain settings</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="max-w-3xl flex flex-col max-w-full self-center space-y-2 sm:space-y-2.5 lg:space-y-3">
                                
                                {/* Current Domain */}
                                <div className="space-y-1">
                                    <Label htmlFor="currentDomain">Current address of your site</Label>
                                    <div className="space-y-2">
                                        <div className="relative inline-flex items-center gap-2 rounded-lg border border-secondary bg-disabled_subtle px-3 py-3 w-full font-mono">
                                            <input 
                                                className="grow appearance-none focus-visible:outline-none bg-transparent text-sm text-tertiary"
                                                type="text"
                                                id="currentDomain"
                                                name="currentDomain"
                                                value={domainSettings.currentDomain}
                                                readOnly
                                            />
                                            <div className="shrink-0">
                                                <div className="flex items-center">
                                                    <div className="flex px-2">
                                                        <button 
                                                            type="button"
                                                            onClick={handleCopy}
                                                            className="p-0.5 transition duration-200 text-tertiary hover:text-primary focus:outline-none focus-visible:ring rounded-base"
                                                        >
                                                            <Copy01 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-tertiary">
                                            <div className="p-3 bg-warning-secondary rounded-lg border border-warning-tertiary">
                                                Your site is only accessible via its alias, located at{" "}
                                                <a 
                                                    href="https://bettermode.com/hub"
                                                    className="text-brand-secondary hover:text-brand-secondary-hovered underline font-mono"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    https://bettermode.com/hub
                                                </a>
                                                , since it is installed on a subfolder.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div>
                                    <div className="relative py-4">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-secondary"></div>
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="px-2 bg-primary text-tertiary">
                                                <span className="font-semibold text-lg text-primary">
                                                    Want to use a different address for your site?
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* New Domain Form */}
                                    <form className="relative mt-0" onSubmit={handleSubmit}>
                                        <div className="space-y-1">
                                            <Label htmlFor="newDomain">Enter your own domain</Label>
                                            <div className="space-y-2">
                                                <Input
                                                    type="text"
                                                    id="newDomain"
                                                    name="newDomain"
                                                    value={domainSettings.newDomain}
                                                    onChange={(value) => handleInputChange("newDomain", value)}
                                                    placeholder="e.g. hub.mysite.com"
                                                    className="font-mono"
                                                />
                                                <div className="text-sm text-tertiary">
                                                    <span className="text-primary">
                                                        Enter the domain or subdomain that you want to move your site to. You should already own the domain and have access to its DNS settings in order to complete the migration. We will guide you through the process.{" "}
                                                        <a 
                                                            href="/hub/branding/post/use-a-custom-domain-or-subdomain-qfTp9h6Y30WEX6F"
                                                            className="text-brand-secondary hover:text-brand-secondary-hovered underline inline-flex items-center gap-1"
                                                        >
                                                            <span>Learn more</span>
                                                            <LinkExternal01 className="w-4 h-4" />
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-5">
                                            <Button type="submit" size="sm">
                                                Check transferability
                                            </Button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};

