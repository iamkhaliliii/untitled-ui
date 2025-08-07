import { useState } from "react";
import {
    Key01,
    RefreshCw01,
    Copy01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Toggle } from "@/components/base/toggle/toggle";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { useLocation } from "react-router";

export const AdminAuthenticationPage = () => {
    const location = useLocation();
    const [toggles, setToggles] = useState({
        emailAuth: false,
        googleAuth: false,
        facebookAuth: false,
        linkedinAuth: false,
        discordAuth: false,
        slackAuth: false,
        oauth2SSO: false,
        jwtSSO: true,
        samlSSO: false,
    });

    const [jwtFormData, setJwtFormData] = useState({
        privateKey: "C45sCR✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎",
        authorizationUrl: "",
        logoutUrl: "",
        signUpUrl: "",
        settingsUrl: "",
        buttonText: "",
    });

    const headerActions = (
        <div className="flex items-center gap-2">
            <Button size="sm" color="tertiary">
                Test Configuration
            </Button>
            <Button size="sm" iconLeading={Key01}>
                Security Settings
            </Button>
        </div>
    );

    const handleToggleChange = (name: string, checked: boolean) => {
        setToggles(prev => ({ ...prev, [name]: checked }));
    };

    const handleJwtInputChange = (name: string, value: string) => {
        setJwtFormData(prev => ({ ...prev, [name]: value }));
    };

    const socialProviders = [
        { id: "googleAuth", name: "Login with Google" },
        { id: "facebookAuth", name: "Login with Facebook" },
        { id: "linkedinAuth", name: "Login with LinkedIn" },
        { id: "discordAuth", name: "Login with Discord" },
        { id: "slackAuth", name: "Login with Slack" },
    ];

    return (
        <AdminLayout 
            title="Authentication"
            description="Configure login methods and authentication providers for your community"
            currentPath={location.pathname}
            headerActions={headerActions}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="max-w-3xl flex flex-col space-y-5">

                    {/* Email Section */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Email</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <Toggle
                                label="Login & register with email"
                                hint="Allow users to register and access the community with an email and password."
                                isSelected={toggles.emailAuth}
                                onChange={(checked) => handleToggleChange("emailAuth", checked)}
                                size="sm"
                                slim
                            />
                        </div>
                    </div>

                    {/* Social Login Section */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Social login</h3>
                                <div className="text-tertiary mt-1">
                                    <p>
                                        Allow users to register and access the community with social accounts.{" "}
                                        <a 
                                            href="http://bettermode.com/hub/apps-integrations/post/how-to-enable-social-login-for-my-community-on-bettermode-KwoC46SNrETAt0R"
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
                            <ul className="flex flex-col -my-4">
                                {socialProviders.map((provider) => (
                                    <li key={provider.id} className="py-4">
                                        <Toggle
                                            label={provider.name}
                                            isSelected={toggles[provider.id as keyof typeof toggles] as boolean}
                                            onChange={(checked) => handleToggleChange(provider.id, checked)}
                                            size="sm"
                                            slim
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* OAuth2 SSO Section */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg flex items-center gap-2">
                                    <span>OAuth2 SSO</span>
                                </h3>
                                <div className="text-tertiary mt-1">
                                    <p>
                                        Allow users to register and access the community using their existing credentials on your website or application.{" "}
                                        <a 
                                            href="http://bettermode.com/hub/apps-integrations/post/how-to-enable-oauth2-sso-for-my-community-on-bettermode-21xeutpDCoU5a8g"
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
                            <Toggle
                                label="Enable OAuth2 SSO"
                                isSelected={toggles.oauth2SSO}
                                onChange={(checked) => handleToggleChange("oauth2SSO", checked)}
                                size="sm"
                                slim
                            />
                        </div>
                    </div>

                    {/* JWT SSO Section */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg flex items-center gap-2">
                                <span>JWT SSO</span>
                            </h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="space-y-5">
                                <Toggle
                                    label="Enable JWT SSO"
                                    isSelected={toggles.jwtSSO}
                                    onChange={(checked) => handleToggleChange("jwtSSO", checked)}
                                    size="sm"
                                    slim
                                    isDisabled={toggles.jwtSSO} // Already enabled and disabled
                                />

                                {toggles.jwtSSO && (
                                    <div className="py-4 mt-4 space-y-5">
                                        {/* Private Key */}
                                        <div className="space-y-1">
                                            <Label htmlFor="privateKey">Private key</Label>
                                            <div className="space-y-2">
                                                <div className="relative inline-flex items-center gap-2 block rounded-xl appearance-none border placeholder:text-tertiary placeholder:text-sm transition duration-200 px-3 py-3 min-h-[48px] text-sm focus-within:ring-brand-secondary focus-within:border-brand-secondary bg-primary text-primary border-secondary w-full focus:outline-none focus-within:ring-1 ring-offset-0">
                                                    <input 
                                                        className="grow appearance-none focus-visible:outline-none bg-transparent" 
                                                        type="text" 
                                                        id="privateKey" 
                                                        name="privateKey" 
                                                        value={jwtFormData.privateKey}
                                                        readOnly
                                                    />
                                                    <div className="shrink-0">
                                                        <div className="flex items-center divide-x divide-secondary">
                                                            <div className="flex px-2 first:ps-0 last:pe-0">
                                                                <button 
                                                                    type="button" 
                                                                    className="p-0.5 transition duration-200 text-tertiary hover:text-primary focus:outline-none focus-visible:ring rounded-lg"
                                                                >
                                                                    <RefreshCw01 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                            <div className="flex px-2 first:ps-0 last:pe-0">
                                                                <button 
                                                                    type="button" 
                                                                    className="p-0.5 transition duration-200 text-tertiary hover:text-primary focus:outline-none focus-visible:ring rounded-lg opacity-50" 
                                                                    disabled
                                                                >
                                                                    <Copy01 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-tertiary">
                                                    You'll need to make a JWT with this private key. Please copy and save it in a secure location. For security reasons, it will not be displayed again after you leave or refresh this page.{" "}
                                                    <a 
                                                        href="https://developers.bettermode.com/docs/guide/single-sign-on/jwt-sso"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                    >
                                                        Learn more
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* JWT URLs Form */}
                                        <form className="relative">
                                            <div className="flex flex-col space-y-5">
                                                <div className="space-y-1">
                                                    <Label htmlFor="authorizationUrl">Authorization URL</Label>
                                                    <Input
                                                        id="authorizationUrl"
                                                        name="authorizationUrl"
                                                        value={jwtFormData.authorizationUrl}
                                                        onChange={(value) => handleJwtInputChange("authorizationUrl", value)}
                                                        placeholder="https://example.com/auth"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="logoutUrl">Logout URL</Label>
                                                    <Input
                                                        id="logoutUrl"
                                                        name="logoutUrl"
                                                        value={jwtFormData.logoutUrl}
                                                        onChange={(value) => handleJwtInputChange("logoutUrl", value)}
                                                        placeholder="https://example.com/logout"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="signUpUrl">Sign-up URL</Label>
                                                    <Input
                                                        id="signUpUrl"
                                                        name="signUpUrl"
                                                        value={jwtFormData.signUpUrl}
                                                        onChange={(value) => handleJwtInputChange("signUpUrl", value)}
                                                        placeholder="https://example.com/signup"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="settingsUrl">Settings URL</Label>
                                                    <Input
                                                        id="settingsUrl"
                                                        name="settingsUrl"
                                                        value={jwtFormData.settingsUrl}
                                                        onChange={(value) => handleJwtInputChange("settingsUrl", value)}
                                                        placeholder="https://example.com/settings"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="buttonText">Login button text</Label>
                                                    <Input
                                                        id="buttonText"
                                                        name="buttonText"
                                                        value={jwtFormData.buttonText}
                                                        onChange={(value) => handleJwtInputChange("buttonText", value)}
                                                        placeholder="Sign in with SSO"
                                                    />
                                                </div>
                                                <div className="flex justify-end">
                                                    <Button type="submit" size="sm" isDisabled>
                                                        Update
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SAML SSO Section */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg flex items-center gap-2">
                                    <span>SAML SSO</span>
                                </h3>
                                <div className="text-tertiary mt-1">
                                    <p>Allow staff members to register and access the community through SAML SSO.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <Toggle
                                label="Enable SAML SSO"
                                isSelected={toggles.samlSSO}
                                onChange={(checked) => handleToggleChange("samlSSO", checked)}
                                size="sm"
                                slim
                            />
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}; 