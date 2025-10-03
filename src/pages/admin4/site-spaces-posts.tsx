import {
    MessageSquare01,
    Plus,
    SearchLg,
    Eye,
    Edit01,
    Trash01,
    Users01,
    MarkerPin01,
    Clock,
    Tag01,
    FilterFunnel01,
    ArrowUpRight,
    LinkExternal01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useNavigate, useLocation } from "react-router";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
import { useState } from "react";
import { EventsGeneralSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-general-settings";
import { EventsPermissionsSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-permissions-settings";
import { EventsMembersSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-members-settings";
import { EventsAnalyticsSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-analytics-settings";
import { EventsAuditLogsSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-audit-logs-settings";
import { EventsSeoSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-seo-settings";
import { EventsDangerSettings } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/events-danger-settings";
import { CustomizerSection } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/customizer-section";
import { Toggle } from "@/components/base/toggle/toggle";
import { Package, InfoCircle, SearchMd, Download01, UsersPlus } from "@untitledui/icons";


export const SiteSpacesPostsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const isPostsPage = currentPath.includes("/admin4/site/spaces/myfolder/posts") || currentPath.includes("/admin4/site/spaces/growth/posts");
    const isPrivateSpacePage = currentPath.includes("/admin4/site/spaces/private-space");
    const isSpacePage = isPostsPage || isPrivateSpacePage;
    
    // State for form toggles
    const [formToggles, setFormToggles] = useState({
        inviteOnly: false,
        anyoneInvite: false,
        hideFromFeed: false,
        comments: false,
        reactions: false,
    });
    
    // State for space permissions toggles
    const [spacePermissions, setSpacePermissions] = useState({
        makePrivate: false,
        inviteOnly: false,
        anyoneInvite: false,
    });
    
    // Determine current page type based on URL
    const getCurrentPageType = () => {
        if (currentPath.includes("/customize")) return "customize";
        if (currentPath.includes("/permissions")) return "permissions";
        if (currentPath.includes("/members")) return "members";
        if (currentPath.includes("/analytics")) return "analytics";
        if (currentPath.includes("/audit-logs")) return "audit-logs";
        if (currentPath.includes("/seo")) return "seo";
        if (currentPath.includes("/danger")) return "danger";
        return "general";
    };
    
    const currentPageType = getCurrentPageType();
    
    // Member management handlers
    const handleSearchMembers = () => {
        console.log("Search members triggered");
        // Add search functionality here
    };

    const handleExportData = () => {
        console.log("Export data triggered");
        // Add export functionality here
    };

    const handleAddMember = () => {
        console.log("Add member triggered");
        // Add member functionality here
    };
    
    // Render content permissions for posts page
    const renderContentPermissions = () => {
        return (
            <div className="flex items-center gap-2">
                <Package className="size-4 text-orange-400 bg-orange-100/20 p-[1px] rounded-md" />
                <span className="text-sm font-medium text-secondary">Discussion</span>
                <Badge size="sm" color="gray" className="ml-0">
                    Active
                </Badge>
            </div>
        );
    };
    
    // Get content description for posts page
    const getContentDescription = () => {
        return "The Discussion module is active for this space. Posts can be created, managed, and displayed to members by admins and staff.";
    };
    
    
    // Render header actions for non-customize pages
    const renderHeaderActions = () => {
        if (currentPageType === "customize") {
            return null; // No custom actions for customize page
        }
        
        // Pages that only show View button (no Discard/Save)
        const viewOnlyPages = ["analytics", "audit-logs", "danger"];
        
        if (viewOnlyPages.includes(currentPageType)) {
            return (
                <div className="flex items-center gap-2">
                    <Button 
                        color="secondary" 
                        size="sm"
                        iconLeading={LinkExternal01}
                    >
                        View
                    </Button>
                </div>
            );
        }
        
        // All other pages show View, Discard, and Save
        return (
            <div className="flex items-center gap-2">
                <Button 
                    color="secondary" 
                    size="sm"
                    iconLeading={LinkExternal01}
                >
                    View
                </Button>
                <Button 
                    color="secondary" 
                    size="sm"
                >
                    Discard
                </Button>
                <Button 
                    color="primary" 
                    size="sm"
                >
                    Save
                </Button>
            </div>
        );
    };
    
    // Get page title based on current path
    const getPageTitle = () => {
        if (isPrivateSpacePage) {
            if (currentPath.includes("/customize")) return "Customize your private space layout and appearance";
            return "Manage and configure your private space settings";
        }
        
        if (currentPath.includes("/customize")) return "Customize your posts page layout and appearance";
        if (currentPath.includes("/permissions")) return "Manage posts space and content permissions";
        if (currentPath.includes("/members")) return "Manage posts members and permissions";
        if (currentPath.includes("/analytics")) return "View posts analytics and insights";
        if (currentPath.includes("/audit-logs")) return "View posts audit logs and activity";
        if (currentPath.includes("/seo")) return "Configure SEO settings for your posts";
        if (currentPath.includes("/danger")) return "Danger zone - irreversible actions";
        if (currentPath.includes("/admin4/site/spaces/growth/posts")) return "Manage and organize posts in your growth workspace";
        return "Manage and organize posts in your personal workspace";
    };

    // Get main title based on current page type
    const getMainTitle = () => {
        switch (currentPageType) {
            case "general":
                return "General Settings";
            case "permissions":
                return "Permissions";
            case "members":
                return "Members";
            case "analytics":
                return "Analytics";
            case "audit-logs":
                return "Audit Logs";
            case "seo":
                return "SEO Settings";
            case "danger":
                return "Danger Zone";
            default:
                return "General Settings";
        }
    };
    
    // Render main content based on current page type
    const renderMainContent = () => {
        // Only show browser mockup for customize page
        if (currentPageType === "customize") {
            return <BrowserMockup />;
        }
        
        // For all other pages, show the settings content directly
        const pageType = 'posts';
        
        switch (currentPageType) {
            case "general":
                return (
                    <div className="max-w-2xl">
                        <EventsGeneralSettings
                            formToggles={formToggles}
                            setFormToggles={setFormToggles}
                            pageType={pageType}
                        />
                    </div>
                );
            case "permissions":
                return (
                    <div className="max-w-2xl space-y-6">
                        <CustomizerSection
                            title="Space Permissions"
                            defaultExpanded={true}
                        >
                            <div className="space-y-4">
                                <Toggle
                                    label="Make private"
                                    size="sm"
                                    slim
                                    hint="Make this space private and only accessible to invited members"
                                    isSelected={spacePermissions.makePrivate}
                                    onChange={(isSelected) => 
                                        setSpacePermissions(prev => ({ ...prev, makePrivate: isSelected }))
                                    }
                                />
                                <Toggle
                                    label="Make invite-only"
                                    size="sm"
                                    slim
                                    hint="Only allow invited users to join this space"
                                    isSelected={spacePermissions.inviteOnly}
                                    onChange={(isSelected) => 
                                        setSpacePermissions(prev => ({ ...prev, inviteOnly: isSelected }))
                                    }
                                />
                                <Toggle
                                    label="Anyone can invite"
                                    size="sm"
                                    slim
                                    hint="Allow any member to invite others to this space"
                                    isSelected={spacePermissions.anyoneInvite}
                                    onChange={(isSelected) => 
                                        setSpacePermissions(prev => ({ ...prev, anyoneInvite: isSelected }))
                                    }
                                />
                            </div>
                        </CustomizerSection>
                        
                        <CustomizerSection
                            title="Content Permissions"
                            defaultExpanded={true}
                        >
                            <div className="space-y-4">
                                {renderContentPermissions()}
                                <div className="text-xs flex items-start gap-2">
                                    <InfoCircle className="size-3 mt-0.5 flex-shrink-0 text-tertiary" />
                                    <div className="leading-relaxed text-tertiary">
                                        {getContentDescription()}
                                    </div>
                                </div>
                            </div>
                        </CustomizerSection>
                    </div>
                );
            case "members":
                return (
                    <div className="max-w-2xl space-y-6">
                        <CustomizerSection
                            title="Notification Config"
                            defaultExpanded={true}
                        >
                            <div className="space-y-4">
                                <Toggle
                                    label="Auto-subscribe new and existing members"
                                    hint="Enable this setting to automatically subscribe new and existing members to notifications for updates and posts, unless they have already adjusted their notification settings."
                                    size="sm"
                                    slim
                                    isSelected={formToggles.comments}
                                    onChange={(isSelected) => 
                                        setFormToggles(prev => ({ ...prev, comments: isSelected }))
                                    }
                                />
                            </div>
                        </CustomizerSection>
                        
                        <CustomizerSection
                            title="Members Config"
                            defaultExpanded={true}
                            utilityActions={
                                <>
                                    <ButtonUtility
                                        size="sm"
                                        color="tertiary"
                                        icon={SearchMd}
                                        tooltip="Search Members"
                                        onClick={handleSearchMembers}
                                    />
                                    <ButtonUtility
                                        size="sm"
                                        color="tertiary"
                                        icon={Download01}
                                        tooltip="Export Data"
                                        onClick={handleExportData}
                                    />
                                    <ButtonUtility
                                        size="sm"
                                        color="tertiary"
                                        icon={UsersPlus}
                                        tooltip="Add Member"
                                        onClick={handleAddMember}
                                    />
                                </>
                            }
                        >
                            <EventsMembersSettings />
                        </CustomizerSection>
                    </div>
                );
            case "analytics":
                return (
                    <div className="max-w-2xl">
                        <EventsAnalyticsSettings />
                    </div>
                );
            case "audit-logs":
                return (
                    <div className="max-w-2xl">
                        <EventsAuditLogsSettings />
                    </div>
                );
            case "seo":
                return (
                    <div className="max-w-2xl">
                        <EventsSeoSettings />
                    </div>
                );
            case "danger":
                return (
                    <div className="max-w-2xl">
                        <EventsDangerSettings />
                    </div>
                );
            default:
                return (
                    <div className="max-w-2xl">
                        <EventsGeneralSettings
                            formToggles={formToggles}
                            setFormToggles={setFormToggles}
                            pageType={pageType}
                        />
                    </div>
                );
        }
    };

    return (
        <Admin4Layout 
            title={getMainTitle()}
            description={getPageTitle()}
            currentPath={currentPath}
            headerActions={renderHeaderActions()}
        >
            <div className="px-4 py-6 lg:px-6">
                {renderMainContent()}
            </div>
        </Admin4Layout>
    );
};
