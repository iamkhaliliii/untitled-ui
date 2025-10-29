import { useState } from "react";
import { RefreshCw02, Copy01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Toggle } from "@/components/base/toggle/toggle";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";

// Social login provider icons
const SocialIcon = ({ provider }: { provider: string }) => {
    const iconMap: Record<string, { src: string; bg: string }> = {
        google: { 
            src: "https://www.google.com/favicon.ico",
            bg: "bg-white"
        },
        facebook: { 
            src: "https://www.facebook.com/favicon.ico",
            bg: "bg-blue-600"
        },
        linkedin: { 
            src: "https://www.linkedin.com/favicon.ico",
            bg: "bg-blue-700"
        },
        discord: { 
            src: "/logos/s/discord.svg",
            bg: "bg-white"
        },
        slack: { 
            src: "/logos/s/slack-new-logo.svg",
            bg: "bg-white"
        },
    };
    
    const iconData = iconMap[provider] || { src: "", bg: "bg-gray-500" };
    
    return (
        <div className={`w-6 h-6 rounded-full ${iconData.bg} flex items-center justify-center p-1 shrink-0 border border-secondary shadow-sm`}>
            <img 
                src={iconData.src} 
                alt={provider}
                className="w-full h-full object-contain"
            />
        </div>
    );
};

export const AdminAuthenticationPage = () => {
    const location = useLocation();
    
    const [authSettings, setAuthSettings] = useState({
        emailLogin: false,
        googleLogin: false,
        facebookLogin: false,
        linkedinLogin: false,
        discordLogin: false,
        slackLogin: false,
        oauth2SSO: false,
        jwtSSO: true,
        samlSSO: false,
    });

    const [jwtSettings, setJwtSettings] = useState({
        privateKey: "C45sCR************************",
        authorizationUrl: "",
        logoutUrl: "",
        signUpUrl: "",
        settingsUrl: "",
        buttonText: "",
    });

    const handleToggleChange = (name: string, checked: boolean) => {
        setAuthSettings(prev => ({ ...prev, [name]: checked }));
    };

    const handleJwtInputChange = (name: string, value: string) => {
        setJwtSettings(prev => ({ ...prev, [name]: value }));
    };

    const socialLogins = [
        { id: "google", name: "Login with Google", key: "googleLogin" },
        { id: "facebook", name: "Login with Facebook", key: "facebookLogin" },
        { id: "linkedin", name: "Login with LinkedIn", key: "linkedinLogin" },
        { id: "discord", name: "Login with Discord", key: "discordLogin" },
        { id: "slack", name: "Login with Slack", key: "slackLogin" },
    ];

    return (
        <Admin4Layout 
            title="Authentication"
            description="Configure authentication methods and single sign-on options"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="max-w-3xl flex flex-col space-y-5">

                    {/* Email Section */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Email</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div>
                            <Toggle
                                label="Login & register with email"
                                hint="Allow users to register and access the community with an email and password."
                                    isSelected={authSettings.emailLogin}
                                    onChange={(checked) => handleToggleChange("emailLogin", checked)}
                                size="sm"
                                slim
                            />
                            </div>
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
                                {socialLogins.map((provider) => (
                                    <li key={provider.id} className="py-4">
                                        <div className="flex justify-between gap-3">
                                            <div className="min-w-0 flex items-center gap-3">
                                                <SocialIcon provider={provider.id} />
                                                <span className="font-medium text-md text-primary">{provider.name}</span>
                                            </div>
                                            <div className="shrink-0">
                                        <Toggle
                                                    isSelected={authSettings[provider.key as keyof typeof authSettings] as boolean}
                                                    onChange={(checked) => handleToggleChange(provider.key, checked)}
                                            size="sm"
                                            slim
                                        />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* OAuth2 SSO Section */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">
                                    <div className="flex items-center gap-2">
                                        <div>OAuth2 SSO</div>
                                    </div>
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
                            <div>
                            <Toggle
                                label="Enable OAuth2 SSO"
                                    isSelected={authSettings.oauth2SSO}
                                onChange={(checked) => handleToggleChange("oauth2SSO", checked)}
                                size="sm"
                                slim
                            />
                            </div>
                        </div>
                    </div>

                    {/* JWT SSO Section */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">
                                <div className="flex items-center gap-2">
                                    <div>JWT SSO</div>
                                </div>
                            </h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div>
                                <Toggle
                                    label="Enable JWT SSO"
                                    isSelected={authSettings.jwtSSO}
                                    onChange={(checked) => handleToggleChange("jwtSSO", checked)}
                                    size="sm"
                                    slim
                                    isDisabled={true}
                                />
                            </div>

                            {authSettings.jwtSSO && (
                                    <div className="py-4 mt-4 space-y-5">
                                        {/* Private Key */}
                                        <div className="space-y-1">
                                            <Label htmlFor="privateKey">Private key</Label>
                                            <div className="space-y-2">
                                            <div className="relative inline-flex items-center gap-2 rounded-lg border border-secondary bg-primary px-3 py-3 w-full">
                                                    <input 
                                                    className="grow appearance-none focus-visible:outline-none bg-transparent text-sm"
                                                        type="text" 
                                                        id="privateKey" 
                                                        name="privateKey" 
                                                    value={jwtSettings.privateKey}
                                                        readOnly
                                                    />
                                                    <div className="shrink-0">
                                                        <div className="flex items-center divide-x divide-secondary">
                                                        <div className="flex px-2">
                                                                <button 
                                                                    type="button" 
                                                                className="p-0.5 transition duration-200 text-tertiary hover:text-primary focus:outline-none focus-visible:ring rounded-base"
                                                                >
                                                                <RefreshCw02 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        <div className="flex px-2">
                                                                <button 
                                                                    type="button" 
                                                                className="p-0.5 transition duration-200 text-tertiary hover:text-primary focus:outline-none focus-visible:ring rounded-base opacity-50"
                                                                    disabled
                                                                >
                                                                <Copy01 className="w-4 h-4" />
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

                                        <form className="relative">
                                            <div className="flex flex-col space-y-5">
                                                <div className="space-y-1">
                                                    <Label htmlFor="authorizationUrl">Authorization URL</Label>
                                                <div className="space-y-2">
                                                    <Input
                                                        type="text"
                                                        id="authorizationUrl"
                                                        name="authorizationUrl"
                                                        value={jwtSettings.authorizationUrl}
                                                        onChange={(value) => handleJwtInputChange("authorizationUrl", value)}
                                                    />
                                                </div>
                                            </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="logoutUrl">Logout URL</Label>
                                                <div className="space-y-2">
                                                    <Input
                                                        type="text"
                                                        id="logoutUrl"
                                                        name="logoutUrl"
                                                        value={jwtSettings.logoutUrl}
                                                        onChange={(value) => handleJwtInputChange("logoutUrl", value)}
                                                    />
                                                </div>
                                            </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="signUpUrl">Sign-up URL</Label>
                                                <div className="space-y-2">
                                                    <Input
                                                        type="text"
                                                        id="signUpUrl"
                                                        name="signUpUrl"
                                                        value={jwtSettings.signUpUrl}
                                                        onChange={(value) => handleJwtInputChange("signUpUrl", value)}
                                                    />
                                                </div>
                                            </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="settingsUrl">Settings URL</Label>
                                                <div className="space-y-2">
                                                    <Input
                                                        type="text"
                                                        id="settingsUrl"
                                                        name="settingsUrl"
                                                        value={jwtSettings.settingsUrl}
                                                        onChange={(value) => handleJwtInputChange("settingsUrl", value)}
                                                    />
                                                </div>
                                            </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="buttonText">Login button text</Label>
                                                <div className="space-y-2">
                                                    <Input
                                                        type="text"
                                                        id="buttonText"
                                                        name="buttonText"
                                                        value={jwtSettings.buttonText}
                                                        onChange={(value) => handleJwtInputChange("buttonText", value)}
                                                    />
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
                                )}
                        </div>
                    </div>

                    {/* SAML SSO Section */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">
                                    <div className="flex items-center gap-2">
                                        <div>SAML SSO</div>
                                    </div>
                                </h3>
                                <div className="text-tertiary mt-1">
                                    <p>Allow staff members to register and access the community through SAML SSO.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div>
                            <Toggle
                                label="Enable SAML SSO"
                                    isSelected={authSettings.samlSSO}
                                onChange={(checked) => handleToggleChange("samlSSO", checked)}
                                size="sm"
                                slim
                            />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
}; 
