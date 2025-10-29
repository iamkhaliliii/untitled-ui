import React, { useState } from "react";
import { SiteAdminLayout } from "@/components/layouts/site-admin-layout";
import { 
    ArrowLeft,
    User01,
    Bell01,
    Mail01,
    Globe01,
    Lock01,
    Trash01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";

// Left Sidebar Navigation
const LeftSidebarContent = ({ currentSection, onSectionChange }: { currentSection: string; onSectionChange: (section: string) => void }) => {
    const sections = [
        { id: "account", label: "Account", icon: User01 },
        { id: "notifications", label: "Notifications", icon: Bell01 },
    ];

    return (
        <div className="space-y-6">
            {/* Back to Community Button */}
            <button 
                onClick={() => window.location.href = '/site/feed'}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-secondary dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 hover:text-primary dark:hover:text-gray-100 border border-secondary dark:border-gray-700"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to community</span>
            </button>

            {/* Settings Sections */}
            <div>
                <ul className="space-y-1">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <li key={section.id}>
                                <button 
                                    onClick={() => onSectionChange(section.id)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        currentSection === section.id
                                            ? "bg-brand-50 dark:bg-brand-900/30 text-brand-secondary dark:text-brand-400"
                                            : "text-secondary dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 hover:text-primary dark:hover:text-gray-100"
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{section.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

// Timezone options
const timezones = [
    { id: 'UTC', label: 'UTC', value: 'UTC' },
    { id: 'America/New_York', label: 'America/New York', value: 'America/New_York' },
    { id: 'America/Los_Angeles', label: 'America/Los Angeles', value: 'America/Los_Angeles' },
    { id: 'Europe/London', label: 'Europe/London', value: 'Europe/London' },
    { id: 'Asia/Dubai', label: 'Asia/Dubai', value: 'Asia/Dubai' },
    { id: 'Asia/Tokyo', label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
];

export default function SiteSettingsPage() {
    // Check URL params for section
    const urlParams = new URLSearchParams(window.location.search);
    const sectionParam = urlParams.get('section');
    
    const [currentSection, setCurrentSection] = useState(sectionParam || "account");
    const [email, setEmail] = useState("amirhossienkhalili@gmail.com");
    const [timezone, setTimezone] = useState("Asia/Dubai");
    const [notificationToggles, setNotificationToggles] = useState({
        browserNotifications: false,
        instantEmail: false,
        messages: true,
        mentions: true,
        followed: true,
    });
    const [selectedTab, setSelectedTab] = useState("spaces");

    return (
        <SiteAdminLayout
            currentPath="/site/settings"
            leftSidebarContent={<LeftSidebarContent currentSection={currentSection} onSectionChange={setCurrentSection} />}
        >
            <div className="max-w-3xl">
                {/* Account Section */}
                {currentSection === "account" && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-2xl font-bold text-primary dark:text-gray-100 mb-2">Account</h1>
                            <p className="text-sm text-tertiary dark:text-gray-400">Manage how you log in to your account.</p>
                        </div>

                        {/* Email Section */}
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-1">Email</h3>
                            <p className="text-sm text-tertiary dark:text-gray-400 mb-4">
                                We'll send you an email confirmation when you update your email.
                            </p>
                            <div className="flex items-end gap-3">
                                <div className="flex-1">
                                    <Input
                                        label="Email"
                                        value={email}
                                        onChange={(value) => setEmail(value)}
                                        type="email"
                                    />
                                </div>
                                <Button color="secondary" size="md">
                                    Update
                                </Button>
                            </div>
                        </div>

                        {/* Timezone Section */}
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-1">Timezone</h3>
                            <p className="text-sm text-tertiary dark:text-gray-400 mb-4">
                                Choose your timezone to get notifications based on your local time.
                            </p>
                            <div className="flex items-end gap-3">
                                <div className="flex-1">
                                    <Select
                                        label="Preferred timezone"
                                        selectedKey={timezone}
                                        onSelectionChange={(value) => setTimezone(value as string)}
                                        items={timezones}
                                    >
                                        {(item) => (
                                            <Select.Item key={item.id} id={item.id}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                </div>
                                <Button color="secondary" size="md">
                                    Update
                                </Button>
                            </div>
                        </div>

                        {/* Password Section */}
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-1">Password</h3>
                            <p className="text-sm text-tertiary dark:text-gray-400 mb-4">
                                Protect your account with a secure password.
                            </p>
                            <Button color="secondary" size="md">
                                Change password
                            </Button>
                        </div>

                        {/* Support Access Section */}
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-1">Support access</h3>
                            <p className="text-sm text-tertiary dark:text-gray-400 mb-4">
                                Grant Bettermode support access to your account so we can troubleshoot and fix problems on your behalf. You can revoke access at any time.
                            </p>
                            <Button color="secondary" size="md">
                                Allow access
                            </Button>
                        </div>

                        {/* Delete Account Section */}
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-1">Delete account</h3>
                            <p className="text-sm text-tertiary dark:text-gray-400">
                                Community owner and admins cannot delete their own accounts.
                            </p>
                        </div>
                    </div>
                )}

                {/* Notifications Section */}
                {currentSection === "notifications" && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-2xl font-bold text-primary dark:text-gray-100 mb-2">Notifications</h1>
                        </div>

                        {/* Browser Notifications */}
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-1">Browser notifications</h3>
                            <p className="text-sm text-tertiary dark:text-gray-400 mb-4">
                                Stay informed instantly with real-time browser notifications for all activities.
                            </p>
                            <Toggle
                                label="Enable browser notifications"
                                isSelected={notificationToggles.browserNotifications}
                                onChange={(value) => setNotificationToggles(prev => ({ ...prev, browserNotifications: value }))}
                            />
                        </div>

                        {/* Instant Email Notifications */}
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Instant email notifications</h3>
                            <p className="text-sm text-tertiary dark:text-gray-400 mb-6">
                                Get notified via email when you receive a notification or direct message.
                            </p>
                            
                            <div className="space-y-4">
                                <Toggle
                                    label="Messages"
                                    hint="Get notified via email when you receive direct messages."
                                    isSelected={notificationToggles.messages}
                                    onChange={(value) => setNotificationToggles(prev => ({ ...prev, messages: value }))}
                                />
                                
                                <Toggle
                                    label="Mentions"
                                    hint="Receive email alerts when you're mentioned in comments, posts, or discussions."
                                    isSelected={notificationToggles.mentions}
                                    onChange={(value) => setNotificationToggles(prev => ({ ...prev, mentions: value }))}
                                />
                                
                                <Toggle
                                    label="Notifications for followed posts, spaces, and members"
                                    hint="Receive email updates on new posts, spaces, and member activities that you follow."
                                    isSelected={notificationToggles.followed}
                                    onChange={(value) => setNotificationToggles(prev => ({ ...prev, followed: value }))}
                                />
                            </div>
                        </div>

                        {/* Manage Notifications */}
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-1">Manage notifications</h3>
                            <p className="text-sm text-tertiary dark:text-gray-400 mb-6">
                                Select which space, posts, and members you'd like to receive notifications for. You will still receive in-app notifications even if email notifications are disabled.
                            </p>
                            
                            {/* Tab Group */}
                            <ButtonGroup
                                selectionMode="single"
                                selectedKeys={new Set([selectedTab])}
                                onSelectionChange={(keys) => setSelectedTab(Array.from(keys)[0] as string)}
                                className="mb-6"
                            >
                                <ButtonGroupItem id="spaces" className="flex-1">
                                    Spaces
                                </ButtonGroupItem>
                                <ButtonGroupItem id="posts" className="flex-1">
                                    Posts
                                </ButtonGroupItem>
                                <ButtonGroupItem id="members" className="flex-1">
                                    Members
                                </ButtonGroupItem>
                            </ButtonGroup>

                            {/* Tab Content Placeholder */}
                            <div className="text-center py-8">
                                <p className="text-sm text-tertiary dark:text-gray-400">
                                    {selectedTab === "spaces" && "Manage space notifications here"}
                                    {selectedTab === "posts" && "Manage post notifications here"}
                                    {selectedTab === "members" && "Manage member notifications here"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SiteAdminLayout>
    );
}

