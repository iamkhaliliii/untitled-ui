import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    Settings01,
    Key01,
    Globe01,
    SearchLg,
    Mail01,
    Shield01,
    Flag02,
    Bell01,
    SearchMd,
    Lock01,
    Trophy01,
    Eye,
    EyeOff,
    Users01,
    Home01,
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
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { MobileSpaceTabs } from "@/components/application/app-navigation-admin4/mobile-space-tabs";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { TextArea } from "@/components/base/textarea/textarea";

export const AdminSettingsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isDesktop = useBreakpoint("lg");

    // Form states for Site Settings
    const [formData, setFormData] = useState({
        communityName: "ACME Community",
        termsOfService: "",
        privacyPolicy: "",
        fileSizeLimit: "10",
        affiliateLink: "",
        customDomain: "",
        searchEngine: "elasticsearch",
        emailProvider: "sendgrid",
        defaultLanguage: "en",
        timezone: "UTC",
        metaTitle: "",
        metaDescription: "",
        twoFactorAuth: false,
    });

    const [toggles, setToggles] = useState({
        isPublished: true,
        privateCommunity: false,
        inviteOnly: false,
        anyoneCanInvite: false,
        displayBadge: true,
        earnWithReferrals: false,
        keyboardShortcuts: true,
        emailNotifications: true,
        pushNotifications: true,
        autoModeration: false,
        profanityFilter: true,
        enableSearch: true,
        sslEnabled: true,
        dataEncryption: true,
        gamificationEnabled: true,
    });

    // Check which settings page we're on
    const isSiteSettingsPage = location.pathname === '/admin4/setting/site-settings';
    const isAuthenticationPage = location.pathname === '/admin4/setting/authentication';
    const isDomainPage = location.pathname === '/admin4/setting/domain';
    const isSearchPage = location.pathname === '/admin4/setting/search';
    const isMessagingPage = location.pathname === '/admin4/setting/messaging';
    const isModerationPage = location.pathname === '/admin4/setting/moderation';
    const isLocalizationPage = location.pathname === '/admin4/setting/localization';
    const isNotificationsPage = location.pathname === '/admin4/setting/notifications';
    const isSeoPage = location.pathname === '/admin4/setting/seo-settings';
    const isSecurityPage = location.pathname === '/admin4/setting/security-privacy';
    const isGamificationPage = location.pathname === '/admin4/setting/gamification';

    const getPageTitle = () => {
        if (isSiteSettingsPage) return "Site Settings";
        if (isAuthenticationPage) return "Authentication";
        if (isDomainPage) return "Domain";
        if (isSearchPage) return "Search";
        if (isMessagingPage) return "Messaging";
        if (isModerationPage) return "Moderation";
        if (isLocalizationPage) return "Localization";
        if (isNotificationsPage) return "Notifications";
        if (isSeoPage) return "SEO Settings";
        if (isSecurityPage) return "Security & Privacy";
        if (isGamificationPage) return "Gamification";
        return "Settings";
    };

    const getPageDescription = () => {
        if (isSiteSettingsPage) return "Configure your community's basic settings";
        if (isAuthenticationPage) return "Manage authentication and login methods";
        if (isDomainPage) return "Configure custom domain settings";
        if (isSearchPage) return "Configure search functionality";
        if (isMessagingPage) return "Manage email and messaging settings";
        if (isModerationPage) return "Configure content moderation rules";
        if (isLocalizationPage) return "Manage language and regional settings";
        if (isNotificationsPage) return "Configure notification preferences";
        if (isSeoPage) return "Optimize your community for search engines";
        if (isSecurityPage) return "Manage security and privacy settings";
        if (isGamificationPage) return "Configure gamification features";
        return "Manage your community settings";
    };

    const getCurrentPageType = () => {
        if (location.pathname.includes("/authentication")) return "authentication";
        if (location.pathname.includes("/domain")) return "domain";
        if (location.pathname.includes("/search")) return "search";
        if (location.pathname.includes("/messaging")) return "messaging";
        if (location.pathname.includes("/moderation")) return "moderation";
        if (location.pathname.includes("/localization")) return "localization";
        if (location.pathname.includes("/notifications")) return "notifications";
        if (location.pathname.includes("/seo-settings")) return "seo-settings";
        if (location.pathname.includes("/security-privacy")) return "security-privacy";
        if (location.pathname.includes("/gamification")) return "gamification";
        return "site-settings";
    };

    const currentPageType = getCurrentPageType();

    const settingsTabs = [
        { id: "site-settings", label: "Site settings", path: "/site-settings" },
        { id: "authentication", label: "Authentication", path: "/authentication" },
        { id: "domain", label: "Domain", path: "/domain" },
        { id: "search", label: "Search", path: "/search" },
        { id: "messaging", label: "Messaging", path: "/messaging" },
        { id: "moderation", label: "Moderation", path: "/moderation" },
        { id: "localization", label: "Localization", path: "/localization" },
        { id: "notifications", label: "Notifications", path: "/notifications" },
        { id: "seo-settings", label: "SEO settings", path: "/seo-settings" },
        { id: "security-privacy", label: "Security & Privacy", path: "/security-privacy" },
    ];

    const getBasePath = () => {
        return "/admin4/setting";
    };

    const renderHeaderActions = () => (
        <div className="flex items-center gap-2">
            <Button color="primary" size="sm" className="text-xs px-3 py-1.5">
                Save Changes
            </Button>
        </div>
    );

    return (
        <Admin4Layout
            title={`Settings - ${getPageTitle()}`}
            description={getPageDescription()}
            currentPath={location.pathname}
            hideHeader={true}
            headerActions={renderHeaderActions()}
            mobileTabSelector={
                <MobileSpaceTabs
                    basePath={getBasePath()}
                    tabs={settingsTabs}
                    currentTab={currentPageType}
                    headerActions={renderHeaderActions()}
                />
            }
        >
            <div className="px-4 py-6 lg:px-6">
                <div className="flex flex-col space-y-6 max-w-3xl">
                    {/* Site Settings Page */}
                    {isSiteSettingsPage && (
                        <>
                            <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Basic Information</h3>
                                <div className="space-y-4">
                                    <Input
                                        label="Community Name"
                                        placeholder="Enter community name"
                                        value={formData.communityName}
                                        onChange={(value) => setFormData(prev => ({ ...prev, communityName: value }))}
                                    />
                                    <Input
                                        label="Terms of Service URL"
                                        placeholder="https://example.com/terms"
                                        value={formData.termsOfService}
                                        onChange={(value) => setFormData(prev => ({ ...prev, termsOfService: value }))}
                                    />
                                    <Input
                                        label="Privacy Policy URL"
                                        placeholder="https://example.com/privacy"
                                        value={formData.privacyPolicy}
                                        onChange={(value) => setFormData(prev => ({ ...prev, privacyPolicy: value }))}
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Privacy Settings</h3>
                                <div className="space-y-4">
                                    <Toggle
                                        label="Community Published"
                                        hint="Make your community visible to the public"
                                        isSelected={toggles.isPublished}
                                        onChange={(value) => setToggles(prev => ({ ...prev, isPublished: value }))}
                                    />
                                    <Toggle
                                        label="Private Community"
                                        hint="Only members can access the community"
                                        isSelected={toggles.privateCommunity}
                                        onChange={(value) => setToggles(prev => ({ ...prev, privateCommunity: value }))}
                                    />
                                    <Toggle
                                        label="Invite Only"
                                        hint="New members can only join via invitation"
                                        isSelected={toggles.inviteOnly}
                                        onChange={(value) => setToggles(prev => ({ ...prev, inviteOnly: value }))}
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">File Upload Settings</h3>
                                <div className="space-y-4">
                                    <Input
                                        type="number"
                                        label="Maximum File Size (MB)"
                                        placeholder="10"
                                        value={formData.fileSizeLimit}
                                        onChange={(value) => setFormData(prev => ({ ...prev, fileSizeLimit: value }))}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Authentication Page */}
                    {isAuthenticationPage && (
                        <>
                            <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Login Methods</h3>
                                <div className="space-y-4">
                                    <Toggle
                                        label="Email/Password Login"
                                        hint="Allow users to login with email and password"
                                        isSelected={true}
                                        onChange={() => {}}
                                    />
                                    <Toggle
                                        label="Social Login"
                                        hint="Enable login with social media accounts"
                                        isSelected={true}
                                        onChange={() => {}}
                                    />
                                    <Toggle
                                        label="SSO (Single Sign-On)"
                                        hint="Enable enterprise SSO authentication"
                                        isSelected={false}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Two-Factor Authentication</h3>
                                <div className="space-y-4">
                                    <Toggle
                                        label="Require 2FA for Admins"
                                        hint="Enforce two-factor authentication for admin accounts"
                                        isSelected={formData.twoFactorAuth}
                                        onChange={(value) => setFormData(prev => ({ ...prev, twoFactorAuth: value }))}
                                    />
                                    <Toggle
                                        label="Optional 2FA for Members"
                                        hint="Allow members to enable 2FA on their accounts"
                                        isSelected={true}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Domain Page */}
                    {isDomainPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Custom Domain</h3>
                            <div className="space-y-4">
                                <Input
                                    label="Custom Domain"
                                    placeholder="community.yourdomain.com"
                                    value={formData.customDomain}
                                    onChange={(value) => setFormData(prev => ({ ...prev, customDomain: value }))}
                                    hint="Enter your custom domain name"
                                />
                                <div className="p-4 bg-brand-solid/5 dark:bg-brand-solid/10 border border-brand-solid/20 dark:border-brand-solid/30 rounded-lg">
                                    <p className="text-sm text-tertiary dark:text-gray-400">
                                        <strong className="text-primary dark:text-gray-100">DNS Configuration:</strong> Add a CNAME record pointing to: <code className="px-2 py-1 bg-secondary dark:bg-gray-800 rounded">app.untitledui.com</code>
                                    </p>
                                </div>
                                <Toggle
                                    label="SSL Enabled"
                                    hint="Enable HTTPS for your custom domain"
                                    isSelected={toggles.sslEnabled}
                                    onChange={(value) => setToggles(prev => ({ ...prev, sslEnabled: value }))}
                                />
                            </div>
                        </div>
                    )}

                    {/* Search Page */}
                    {isSearchPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Search Configuration</h3>
                            <div className="space-y-4">
                                <Toggle
                                    label="Enable Search"
                                    hint="Allow members to search content"
                                    isSelected={toggles.enableSearch}
                                    onChange={(value) => setToggles(prev => ({ ...prev, enableSearch: value }))}
                                />
                                <Select
                                    label="Search Engine"
                                    selectedKey={formData.searchEngine}
                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, searchEngine: value as string }))}
                                    items={[
                                        { id: 'elasticsearch', label: 'Elasticsearch' },
                                        { id: 'algolia', label: 'Algolia' },
                                        { id: 'basic', label: 'Basic Search' }
                                    ]}
                                >
                                    {(item) => <Select.Item key={item.id} id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* Messaging Page */}
                    {isMessagingPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Email & Messaging</h3>
                            <div className="space-y-4">
                                <Select
                                    label="Email Provider"
                                    selectedKey={formData.emailProvider}
                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, emailProvider: value as string }))}
                                    items={[
                                        { id: 'sendgrid', label: 'SendGrid' },
                                        { id: 'mailgun', label: 'Mailgun' },
                                        { id: 'aws-ses', label: 'AWS SES' }
                                    ]}
                                >
                                    {(item) => <Select.Item key={item.id} id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <Toggle
                                    label="Email Notifications"
                                    hint="Send email notifications to members"
                                    isSelected={toggles.emailNotifications}
                                    onChange={(value) => setToggles(prev => ({ ...prev, emailNotifications: value }))}
                                />
                            </div>
                        </div>
                    )}

                    {/* Moderation Page */}
                    {isModerationPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Content Moderation</h3>
                            <div className="space-y-4">
                                <Toggle
                                    label="Auto-Moderation"
                                    hint="Automatically moderate content using AI"
                                    isSelected={toggles.autoModeration}
                                    onChange={(value) => setToggles(prev => ({ ...prev, autoModeration: value }))}
                                />
                                <Toggle
                                    label="Profanity Filter"
                                    hint="Filter out inappropriate language"
                                    isSelected={toggles.profanityFilter}
                                    onChange={(value) => setToggles(prev => ({ ...prev, profanityFilter: value }))}
                                />
                                <TextArea
                                    label="Blocked Keywords"
                                    placeholder="Enter keywords to block (one per line)"
                                    rows={4}
                                    hint="Posts containing these keywords will be flagged for review"
                                />
                            </div>
                        </div>
                    )}

                    {/* Localization Page */}
                    {isLocalizationPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Language & Region</h3>
                            <div className="space-y-4">
                                <Select
                                    label="Default Language"
                                    selectedKey={formData.defaultLanguage}
                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, defaultLanguage: value as string }))}
                                    items={[
                                        { id: 'en', label: 'English' },
                                        { id: 'es', label: 'Spanish' },
                                        { id: 'fr', label: 'French' },
                                        { id: 'de', label: 'German' }
                                    ]}
                                >
                                    {(item) => <Select.Item key={item.id} id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <Select
                                    label="Timezone"
                                    selectedKey={formData.timezone}
                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, timezone: value as string }))}
                                    items={[
                                        { id: 'UTC', label: 'UTC' },
                                        { id: 'America/New_York', label: 'Eastern Time' },
                                        { id: 'America/Los_Angeles', label: 'Pacific Time' },
                                        { id: 'Europe/London', label: 'London' }
                                    ]}
                                >
                                    {(item) => <Select.Item key={item.id} id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* Notifications Page */}
                    {isNotificationsPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Notification Settings</h3>
                            <div className="space-y-4">
                                <Toggle
                                    label="Email Notifications"
                                    hint="Send notifications via email"
                                    isSelected={toggles.emailNotifications}
                                    onChange={(value) => setToggles(prev => ({ ...prev, emailNotifications: value }))}
                                />
                                <Toggle
                                    label="Push Notifications"
                                    hint="Send push notifications to mobile devices"
                                    isSelected={toggles.pushNotifications}
                                    onChange={(value) => setToggles(prev => ({ ...prev, pushNotifications: value }))}
                                />
                            </div>
                        </div>
                    )}

                    {/* SEO Settings Page */}
                    {isSeoPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">SEO Configuration</h3>
                            <div className="space-y-4">
                                <Input
                                    label="Meta Title"
                                    placeholder="Your Community Name"
                                    value={formData.metaTitle}
                                    onChange={(value) => setFormData(prev => ({ ...prev, metaTitle: value }))}
                                />
                                <TextArea
                                    label="Meta Description"
                                    placeholder="Describe your community..."
                                    value={formData.metaDescription}
                                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}

                    {/* Security & Privacy Page */}
                    {isSecurityPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Security Settings</h3>
                            <div className="space-y-4">
                                <Toggle
                                    label="SSL Enabled"
                                    hint="Enforce HTTPS connections"
                                    isSelected={toggles.sslEnabled}
                                    onChange={(value) => setToggles(prev => ({ ...prev, sslEnabled: value }))}
                                />
                                <Toggle
                                    label="Data Encryption"
                                    hint="Encrypt sensitive data at rest"
                                    isSelected={toggles.dataEncryption}
                                    onChange={(value) => setToggles(prev => ({ ...prev, dataEncryption: value }))}
                                />
                                <Toggle
                                    label="Two-Factor Authentication"
                                    hint="Require 2FA for all admin accounts"
                                    isSelected={formData.twoFactorAuth}
                                    onChange={(value) => setFormData(prev => ({ ...prev, twoFactorAuth: value }))}
                                />
                            </div>
                        </div>
                    )}

                    {/* Gamification Page */}
                    {isGamificationPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Gamification Features</h3>
                            <div className="space-y-4">
                                <Toggle
                                    label="Enable Gamification"
                                    hint="Enable badges, points, and leaderboards"
                                    isSelected={toggles.gamificationEnabled}
                                    onChange={(value) => setToggles(prev => ({ ...prev, gamificationEnabled: value }))}
                                />
                                <Toggle
                                    label="Display Badges"
                                    hint="Show badges on member profiles"
                                    isSelected={toggles.displayBadge}
                                    onChange={(value) => setToggles(prev => ({ ...prev, displayBadge: value }))}
                                />
                                <Toggle
                                    label="Earn with Referrals"
                                    hint="Allow members to earn rewards through referrals"
                                    isSelected={toggles.earnWithReferrals}
                                    onChange={(value) => setToggles(prev => ({ ...prev, earnWithReferrals: value }))}
                                />
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other pages */}
                    {(isDomainPage || isSearchPage || isMessagingPage || isModerationPage || isLocalizationPage || isNotificationsPage) && !formData.customDomain && !formData.searchEngine && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                            <div className="text-center py-12">
                                <Settings01 className="size-16 text-tertiary dark:text-gray-600 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-2">
                                    {getPageTitle()}
                                </h3>
                                <p className="text-sm text-tertiary dark:text-gray-400">
                                    Configuration options for {getPageTitle().toLowerCase()} will be available here.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Admin4Layout>
    );
};

