import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Toggle } from "@/components/base/toggle/toggle";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";
import { Eye, EyeOff, Copy01 } from "@untitledui/icons";

type PasswordComplexity = "Average" | "Standard" | "Strong";
type EmbeddingStatus = "enabledForAll" | "enabledForSpecific" | "disabled";

export const AdminSecurityPrivacyPage = () => {
    const location = useLocation();
    
    const [securitySettings, setSecuritySettings] = useState({
        passwordComplexity: "Standard" as PasswordComplexity,
        recaptchaEnabled: true,
        siteKey: "",
        secretKey: "",
        embeddingStatus: "enabledForAll" as EmbeddingStatus,
        allowAccountDeletion: true,
    });

    const [showSiteKey, setShowSiteKey] = useState(false);
    const [showSecretKey, setShowSecretKey] = useState(false);

    const handlePasswordComplexityChange = (value: PasswordComplexity) => {
        setSecuritySettings(prev => ({ ...prev, passwordComplexity: value }));
    };

    const handleEmbeddingChange = (value: EmbeddingStatus) => {
        setSecuritySettings(prev => ({ ...prev, embeddingStatus: value }));
    };

    const handleToggleChange = (name: string, checked: boolean) => {
        setSecuritySettings(prev => ({ ...prev, [name]: checked }));
    };

    const handleInputChange = (name: string, value: string) => {
        setSecuritySettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Update security settings:", securitySettings);
    };

    return (
        <Admin4Layout 
            title="Security & Privacy"
            description="Configure security and privacy settings"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="flex flex-col space-y-5 max-w-3xl">

                    {/* Password Strength */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Password strength</h3>
                                <div className="text-tertiary mt-1">
                                    <p>As an admin, you can enforce password requirements to protect your users' accounts and meet your organization's compliance needs. You can require a certain number of characters and symbols for passwords.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative" onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-5">
                                    <div className="space-y-1">
                                        <div className="relative space-y-3">
                                            {/* Average */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handlePasswordComplexityChange("Average")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        securitySettings.passwordComplexity === "Average"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Average
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Standard */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handlePasswordComplexityChange("Standard")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        securitySettings.passwordComplexity === "Standard"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Standard
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Password should have 1 lowercase letter, 1 uppercase letter, <span className="font-semibold">1 special character</span>, and be at least 8 characters long
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Strong */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handlePasswordComplexityChange("Strong")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        securitySettings.passwordComplexity === "Strong"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Strong
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Password should have 1 lowercase letter, 1 uppercase letter, 1 number, <span className="font-semibold">1 special character</span>, and be at least <span className="font-semibold">10 characters long</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-tertiary font-medium">
                                        These policies don't apply in some cases, such as when users are authenticated by a third party identity provider.
                                    </p>

                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" isDisabled={true}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Google reCAPTCHA v3 */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Google reCAPTCHA v3</h3>
                                <div className="text-tertiary mt-1">
                                    <p>
                                        Add an extra layer of security to your community. It verifies that users are genuine and not bots during the signup process, ensuring a safer environment.{" "}
                                        <a 
                                            href="https://www.google.com/recaptcha/intro/v3.html?ref=techmoon"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                        >
                                            Learn more
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative" onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Toggle
                                            label="Enable invisible reCAPTCHA for signup"
                                            hint={
                                                <span>
                                                    Register your domain with the Google reCAPTCHA V3 service and enter the provided keys below.{" "}
                                                    <a 
                                                        href="https://developers.google.com/recaptcha/docs/v3"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                    >
                                                        Get the API keys
                                                    </a>
                                                </span>
                                            }
                                            isSelected={securitySettings.recaptchaEnabled}
                                            onChange={(checked) => handleToggleChange("recaptchaEnabled", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>

                                    {securitySettings.recaptchaEnabled && (
                                        <div className="py-4 mt-4 space-y-5">
                                            {/* Site Key */}
                                            <div className="space-y-1">
                                                <Label htmlFor="siteKey">Site key</Label>
                                                <div className="space-y-2">
                                                    <div className="relative inline-flex items-center gap-2 rounded-lg border border-secondary bg-primary px-3 py-3 w-full">
                                                        <input 
                                                            className="grow appearance-none focus-visible:outline-none bg-transparent text-sm"
                                                            type={showSiteKey ? "text" : "password"}
                                                            id="siteKey"
                                                            name="siteKey"
                                                            value={securitySettings.siteKey}
                                                            onChange={(e) => handleInputChange("siteKey", e.target.value)}
                                                        />
                                                        <div className="shrink-0">
                                                            <div className="flex items-center divide-x divide-secondary">
                                                                <div className="flex px-2">
                                                                    <button 
                                                                        type="button"
                                                                        onClick={() => setShowSiteKey(!showSiteKey)}
                                                                        className="p-0.5 transition duration-200 text-tertiary hover:text-primary focus:outline-none focus-visible:ring rounded-base"
                                                                    >
                                                                        {showSiteKey ? (
                                                                            <EyeOff className="w-5 h-5" />
                                                                        ) : (
                                                                            <Eye className="w-5 h-5" />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                                <div className="flex px-2">
                                                                    <button 
                                                                        type="button"
                                                                        className="p-0.5 transition duration-200 text-tertiary hover:text-primary focus:outline-none focus-visible:ring rounded-base"
                                                                    >
                                                                        <Copy01 className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Secret Key */}
                                            <div className="space-y-1">
                                                <Label htmlFor="secretKey">Secret key</Label>
                                                <div className="space-y-2">
                                                    <div className="relative inline-flex items-center gap-2 rounded-lg border border-secondary bg-primary px-3 py-3 w-full">
                                                        <input 
                                                            className="grow appearance-none focus-visible:outline-none bg-transparent text-sm"
                                                            type={showSecretKey ? "text" : "password"}
                                                            id="secretKey"
                                                            name="secretKey"
                                                            value={securitySettings.secretKey}
                                                            onChange={(e) => handleInputChange("secretKey", e.target.value)}
                                                        />
                                                        <div className="shrink-0">
                                                            <div className="flex items-center divide-x divide-secondary">
                                                                <div className="flex px-2">
                                                                    <button 
                                                                        type="button"
                                                                        onClick={() => setShowSecretKey(!showSecretKey)}
                                                                        className="p-0.5 transition duration-200 text-tertiary hover:text-primary focus:outline-none focus-visible:ring rounded-base"
                                                                    >
                                                                        {showSecretKey ? (
                                                                            <EyeOff className="w-5 h-5" />
                                                                        ) : (
                                                                            <Eye className="w-5 h-5" />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                                <div className="flex px-2">
                                                                    <button 
                                                                        type="button"
                                                                        className="p-0.5 transition duration-200 text-tertiary hover:text-primary focus:outline-none focus-visible:ring rounded-base"
                                                                    >
                                                                        <Copy01 className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" isDisabled={true}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Embedding Control */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Embedding Control</h3>
                                <div className="text-tertiary mt-1">
                                    <p>Allow or prevent your site from being embedded in external websites or applications. When disabled, embedding will not be allowed, enhancing security but restricting the ability to embed your site.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative" onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-5">
                                    <div className="space-y-1">
                                        <div className="relative space-y-3">
                                            {/* Allow embedding in all domains */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handleEmbeddingChange("enabledForAll")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        securitySettings.embeddingStatus === "enabledForAll"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Allow embedding in all domains
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Your site can be embedded in any external websites or applications.
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Allow embedding in specific domains */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handleEmbeddingChange("enabledForSpecific")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        securitySettings.embeddingStatus === "enabledForSpecific"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Allow embedding in specific domains
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Specify the domains where embedding is allowed
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Disallow embedding */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handleEmbeddingChange("disabled")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        securitySettings.embeddingStatus === "disabled"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Disallow embedding
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Embedding will be disabled for all domains, providing an additional layer of security.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" isDisabled={true}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* User Account Deletion Option */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">User account deletion option</h3>
                                <div className="text-tertiary mt-1">
                                    <p>Enable this to comply with data protection laws and boost user trust by allowing them to delete their account.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative" onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Toggle
                                            label="Allow members to delete their account"
                                            isSelected={securitySettings.allowAccountDeletion}
                                            onChange={(checked) => handleToggleChange("allowAccountDeletion", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" isDisabled={true}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};

