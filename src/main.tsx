import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { HomeScreen } from "@/pages/home-screen";
// Admin 3.0 imports
import { AdminDashboardPage } from "@/pages/admin3/dashboard";
import { AdminContentPage } from "@/pages/admin3/content";
import { AdminContent2Page } from "@/pages/admin3/content2";
import { AdminContentEventsPage } from "@/pages/admin3/content-events";
import { AdminContentEventsCreatePage } from "@/pages/admin3/content-events-create";
import { AdminPeoplePage } from "@/pages/admin3/people";
import { AdminGamificationPage } from "@/pages/admin3/gamification";
import { AdminSiteSettingsPage } from "@/pages/admin3/site-settings";
import { AdminAuthenticationPage } from "@/pages/admin3/authentication";
import { AdminSitePage } from "@/pages/admin3/site";
import { SiteFilesPage } from "@/pages/admin3/site-files";
import { SiteSpacesEventsPage } from "@/pages/admin3/site-spaces-events";
import { SiteSpacesEventsCreatePage } from "@/pages/admin3/site-spaces-events-create";
import EventsCustomizePage from "@/pages/admin3/events-customize";

// Admin 2.0 imports
import { AdminDashboardPage as Admin2DashboardPage } from "@/pages/admin2/dashboard";
import { AdminContentEventsCreatePage as Admin2ContentEventsCreatePage } from "@/pages/admin2/content-events-create";
import { AdminContent2Page as Admin2Content2Page } from "@/pages/admin2/content2";

import { AdminPeoplePage as Admin2PeoplePage } from "@/pages/admin2/people";
import { AdminGamificationPage as Admin2GamificationPage } from "@/pages/admin2/gamification";
import { AdminSiteSettingsPage as Admin2SiteSettingsPage } from "@/pages/admin2/site-settings";
import { AdminAuthenticationPage as Admin2AuthenticationPage } from "@/pages/admin2/authentication";
import { AdminSitePage as Admin2SitePage } from "@/pages/admin2/site";
import { SiteFilesPage as Admin2SiteFilesPage } from "@/pages/admin2/site-files";
import { AdminOnboardingPage } from "@/pages/admin2/onboarding";
import { SiteSpacesEventsPage as Admin2SiteSpacesEventsPage } from "@/pages/admin2/site-spaces-events";
import { SiteSpacesEventsCreatePage as Admin2SiteSpacesEventsCreatePage } from "@/pages/admin2/site-spaces-events-create";
import { SiteSpacesBlogPage as Admin2SiteSpacesBlogPage } from "@/pages/admin2/site-spaces-blog";
import { SiteSpacesHelpPage as Admin2SiteSpacesHelpPage } from "@/pages/admin2/site-spaces-help";
import { SiteSpacesPostsPage as Admin2SiteSpacesPostsPage } from "@/pages/admin2/site-spaces-posts";
import { SiteSpacesCreatePage as Admin2SiteSpacesCreatePage } from "@/pages/admin2/site-spaces-create";
import Admin2EventsCustomizePage from "@/pages/admin2/events-customize";
import { SiteCmsEventsPage as Admin2SiteCmsEventsPage } from "@/pages/admin2/site-cms-events";

// Admin 4.0 imports
import { AdminDashboardPage as Admin4DashboardPage } from "@/pages/admin4/dashboard";
import { AdminContentEventsCreatePage as Admin4ContentEventsCreatePage } from "@/pages/admin4/content-events-create";
import { AdminContentPostsCreatePage as Admin4ContentPostsCreatePage } from "@/pages/admin4/content-posts-create";
import { AdminContent2Page as Admin4Content2Page } from "@/pages/admin4/content2";
import { AdminPeoplePage as Admin4PeoplePage } from "@/pages/admin4/people";
import { AdminBillingPage as Admin4BillingPage } from "@/pages/admin4/billing";
import { AdminReportPage as Admin4ReportPage } from "@/pages/admin4/report";
import { AdminAppStorePage as Admin4AppStorePage } from "@/pages/admin4/appstore";
import { AdminSettingsPage as Admin4SettingsPage } from "@/pages/admin4/settings";
import { AdminGamificationPage as Admin4GamificationPage } from "@/pages/admin4/gamification";
import { AdminSiteSettingsPage as Admin4SiteSettingsPage } from "@/pages/admin4/site-settings";
import { AdminAuthenticationPage as Admin4AuthenticationPage } from "@/pages/admin4/authentication";
import { AdminSitePage as Admin4SitePage } from "@/pages/admin4/site";
import { SiteFilesPage as Admin4SiteFilesPage } from "@/pages/admin4/site-files";
import { AdminOnboardingPage as Admin4OnboardingPage } from "@/pages/admin4/onboarding";
import { SiteSpacesEventsPage as Admin4SiteSpacesEventsPage } from "@/pages/admin4/site-spaces-events";
import { SiteSpacesEventsCreatePage as Admin4SiteSpacesEventsCreatePage } from "@/pages/admin4/site-spaces-events-create";
import { SiteSpacesBlogPage as Admin4SiteSpacesBlogPage } from "@/pages/admin4/site-spaces-blog";
import { SiteSpacesHelpPage as Admin4SiteSpacesHelpPage } from "@/pages/admin4/site-spaces-help";
import { SiteSpacesPostsPage as Admin4SiteSpacesPostsPage } from "@/pages/admin4/site-spaces-posts";
import { SiteSpacesCreatePage as Admin4SiteSpacesCreatePage } from "@/pages/admin4/site-spaces-create";
import { SiteSpacesEventsCustomizePage as Admin4SiteSpacesEventsCustomizePage } from "@/pages/admin4/site-spaces-events-customize";
import { SiteSpacesBlogCustomizePage as Admin4SiteSpacesBlogCustomizePage } from "@/pages/admin4/site-spaces-blog-customize";
import { SiteSpacesHelpCustomizePage as Admin4SiteSpacesHelpCustomizePage } from "@/pages/admin4/site-spaces-help-customize";
import { SiteSpacesPostsCustomizePage as Admin4SiteSpacesPostsCustomizePage } from "@/pages/admin4/site-spaces-posts-customize";
import { SiteCmsEventsPage as Admin4SiteCmsEventsPage } from "@/pages/admin4/site-cms-events";
import { SiteCmsEventsCustomizePage as Admin4SiteCmsEventsCustomizePage } from "@/pages/admin4/site-cms-events-customize";
import { AdminDesignPage as Admin4DesignPage } from "@/pages/admin4/design";
import { DesignSpacesCreatePage as Admin4DesignSpacesCreatePage } from "@/pages/admin4/design-spaces-create";
import { DesignSpacesCustomizePage as Admin4DesignSpacesCustomizePage } from "@/pages/admin4/design-spaces-customize";
import EventsListCustomizePage from "@/pages/admin4/customize/widgets/events-list-customize";
import DiscussionsListCustomizePage from "@/pages/admin4/customize/widgets/discussions-list-customize";
import KnowledgesListCustomizePage from "@/pages/admin4/customize/widgets/knowledges-list-customize";
import WishlistsListCustomizePage from "@/pages/admin4/customize/widgets/wishlists-list-customize";
import QuestionsListCustomizePage from "@/pages/admin4/customize/widgets/questions-list-customize";
import SpaceHeaderCustomizePage from "@/pages/admin4/customize/widgets/space-header-customize";
import { SiteHomePage } from "@/pages/site/home";
import { SiteFeedPage } from "@/pages/site/feed";
import SiteEventPage from "@/pages/site/event";
import SiteEventDetailPage from "@/pages/site/event-detail";
import EventEmailPreview from "@/pages/site/event-email-preview";
import SiteModerationPage from "@/pages/site/moderation";
import SiteSettingsPage from "@/pages/site/settings";
import PostViewPage from "@/pages/site/post-view";
import { NotFound } from "@/pages/not-found";
import { SignupPage } from "@/pages/signup";
import { LoginPage } from "@/pages/login";
import { WizardPage } from "@/pages/wizard";
import { EditDashboard } from "@/pages/edit-dashboard";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme";
import { AdminDemo } from "@/components/application/admin-demo";
import { TestAdminPage } from "@/pages/test-admin";
import { WidgetConfigProvider } from "@/providers/widget-config-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { AdminProvider } from "@/hooks/use-admin";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary>
            <AdminProvider>
                <ThemeProvider>
                    <WidgetConfigProvider>
                        <BrowserRouter>
                            <RouteProvider>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/edit" element={<EditDashboard />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/wizard" element={<WizardPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        
                        {/* Admin 3.0 Routes */}
                        <Route path="/admin3" element={<AdminDashboardPage />} />
                        <Route path="/admin3/content" element={<AdminContentPage />} />
                        <Route path="/admin3/content2" element={<Navigate to="/admin3/content2/posts" replace />} />
                        <Route path="/admin3/content2/events" element={<AdminContent2Page />} />
                        <Route path="/admin3/content2/posts" element={<AdminContent2Page />} />
                        <Route path="/admin3/content2/spaces" element={<AdminContent2Page />} />
                        <Route path="/admin3/content2/tag" element={<AdminContent2Page />} />
                        <Route path="/admin3/content2/cms" element={<AdminContent2Page />} />
                        <Route path="/admin3/content/events" element={<AdminContentEventsPage />} />
                        <Route path="/admin3/content/events/create" element={<AdminContentEventsCreatePage />} />
                        <Route path="/admin3/people" element={<AdminPeoplePage />} />
                        <Route path="/admin3/setting" element={<Navigate to="/admin3/setting/site-settings" replace />} />
                        <Route path="/admin3/setting/site-settings" element={<AdminSiteSettingsPage />} />
                        <Route path="/admin3/setting/authentication" element={<AdminAuthenticationPage />} />
                        <Route path="/admin3/setting/gamification" element={<AdminGamificationPage />} />
                        <Route path="/admin3/site" element={<AdminSitePage />} />
                        <Route path="/admin3/site/files" element={<SiteFilesPage />} />
                        <Route path="/admin3/site/spaces/myfolder/events" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin3/site/spaces/myfolder/events/create" element={<SiteSpacesEventsCreatePage />} />
                        <Route path="/admin3/site/spaces/myfolder/events/customize" element={<EventsCustomizePage />} />
                        <Route path="/admin3/site/spaces/myfolder/events/members" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin3/site/spaces/myfolder/events/analytics" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin3/site/spaces/myfolder/events/audit-logs" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin3/site/spaces/myfolder/events/seo" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin3/site/spaces/myfolder/events/danger" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin3/site/spaces/private-space" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin3/site/spaces/private-space/customize" element={<EventsCustomizePage />} />
                        
                        {/* Admin 2.0 Routes */}
                        <Route path="/admin2" element={<Navigate to="/admin2/content2/posts" replace />} />
                        <Route path="/admin2/content2" element={<Navigate to="/admin2/content2/posts" replace />} />
                        <Route path="/admin2/content2/events" element={<Admin2Content2Page />} />
                        <Route path="/admin2/content2/events/create" element={<Admin2ContentEventsCreatePage />} />
                        <Route path="/admin2/content2/posts" element={<Admin2Content2Page />} />
                        <Route path="/admin2/content2/spaces" element={<Admin2Content2Page />} />
                        <Route path="/admin2/content2/tag" element={<Admin2Content2Page />} />
                        <Route path="/admin2/content2/cms" element={<Admin2Content2Page />} />

                        <Route path="/admin2/people" element={<Admin2PeoplePage />} />
                        <Route path="/admin2/setting" element={<Navigate to="/admin2/setting/site-settings" replace />} />
                        <Route path="/admin2/setting/site-settings" element={<Admin2SiteSettingsPage />} />
                        <Route path="/admin2/setting/authentication" element={<Admin2AuthenticationPage />} />
                        <Route path="/admin2/setting/gamification" element={<Admin2GamificationPage />} />
                        <Route path="/admin2/site" element={<Admin2SitePage />} />
                        <Route path="/admin2/site/spaces/create" element={<Admin2SiteSpacesCreatePage />} />
                        <Route path="/admin2/site/files" element={<Admin2SiteFilesPage />} />
                        <Route path="/admin2/site/spaces/myfolder/events" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/events/create" element={<Admin2SiteSpacesEventsCreatePage />} />
                        <Route path="/admin2/site/spaces/myfolder/events/customize" element={<Admin2EventsCustomizePage />} />
                        <Route path="/admin2/site/spaces/myfolder/events/permissions" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/events/members" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/events/analytics" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/events/audit-logs" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/events/seo" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/events/danger" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/blog" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/myfolder/blog/customize" element={<Admin2EventsCustomizePage />} />
                        <Route path="/admin2/site/spaces/myfolder/blog/permissions" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/myfolder/blog/members" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/myfolder/blog/analytics" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/myfolder/blog/audit-logs" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/myfolder/blog/seo" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/myfolder/blog/danger" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/myfolder/help" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/myfolder/help/customize" element={<Admin2EventsCustomizePage />} />
                        <Route path="/admin2/site/spaces/myfolder/help/permissions" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/myfolder/help/members" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/myfolder/help/analytics" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/myfolder/help/audit-logs" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/myfolder/help/seo" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/myfolder/help/danger" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/myfolder/posts" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/posts/customize" element={<Admin2EventsCustomizePage />} />
                        <Route path="/admin2/site/spaces/myfolder/posts/permissions" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/posts/members" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/posts/analytics" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/posts/audit-logs" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/posts/seo" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/myfolder/posts/danger" element={<Admin2SiteSpacesPostsPage />} />
                        
                        {/* Growth folder routes */}
                        <Route path="/admin2/site/spaces/growth/events" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/growth/events/create" element={<Admin2SiteSpacesEventsCreatePage />} />
                        <Route path="/admin2/site/spaces/growth/events/customize" element={<Admin2EventsCustomizePage />} />
                        <Route path="/admin2/site/spaces/growth/events/permissions" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/growth/events/members" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/growth/events/analytics" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/growth/events/audit-logs" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/growth/events/seo" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/growth/events/danger" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/growth/blog" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/growth/blog/customize" element={<Admin2EventsCustomizePage />} />
                        <Route path="/admin2/site/spaces/growth/blog/permissions" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/growth/blog/members" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/growth/blog/analytics" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/growth/blog/audit-logs" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/growth/blog/seo" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/growth/blog/danger" element={<Admin2SiteSpacesBlogPage />} />
                        <Route path="/admin2/site/spaces/growth/help" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/growth/help/customize" element={<Admin2EventsCustomizePage />} />
                        <Route path="/admin2/site/spaces/growth/help/permissions" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/growth/help/members" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/growth/help/analytics" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/growth/help/audit-logs" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/growth/help/seo" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/growth/help/danger" element={<Admin2SiteSpacesHelpPage />} />
                        <Route path="/admin2/site/spaces/growth/posts" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/growth/posts/customize" element={<Admin2EventsCustomizePage />} />
                        <Route path="/admin2/site/spaces/growth/posts/permissions" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/growth/posts/members" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/growth/posts/analytics" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/growth/posts/audit-logs" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/growth/posts/seo" element={<Admin2SiteSpacesPostsPage />} />
                        <Route path="/admin2/site/spaces/growth/posts/danger" element={<Admin2SiteSpacesPostsPage />} />
                        
                        <Route path="/admin2/site/spaces/private-space" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/spaces/private-space/customize" element={<Admin2EventsCustomizePage />} />
                        <Route path="/admin2/site/spaces/private-space/permissions" element={<Admin2SiteSpacesEventsPage />} />
                        <Route path="/admin2/site/cms/events" element={<Navigate to="/admin2/site/cms/events/customize" replace />} />
                        <Route path="/admin2/site/cms/events/settings" element={<Admin2SiteCmsEventsPage />} />
                        <Route path="/admin2/site/cms/events/customize" element={<Admin2SiteCmsEventsPage />} />
                        <Route path="/admin2/onboarding" element={<AdminOnboardingPage />} />
                        
                        {/* Admin 4.0 Routes */}
                        <Route path="/admin4" element={<Navigate to="/admin4/content2/posts" replace />} />
                        <Route path="/admin4/dashboard" element={<Admin4DashboardPage />} />
                        <Route path="/admin4/content2" element={<Navigate to="/admin4/content2/posts" replace />} />
                        <Route path="/admin4/content2/events" element={<Admin4Content2Page />} />
                        <Route path="/admin4/content2/events/create" element={<Admin4ContentEventsCreatePage />} />
                        <Route path="/admin4/content2/posts" element={<Admin4Content2Page />} />
                        <Route path="/admin4/content2/posts/create" element={<Admin4ContentPostsCreatePage />} />
                        <Route path="/admin4/content2/spaces" element={<Admin4Content2Page />} />
                        <Route path="/admin4/content2/tag" element={<Admin4Content2Page />} />
                        <Route path="/admin4/content2/cms" element={<Admin4Content2Page />} />

                        <Route path="/admin4/people" element={<Admin4PeoplePage />} />
                        <Route path="/admin4/people/staff" element={<Admin4PeoplePage />} />
                        <Route path="/admin4/people/invitations" element={<Admin4PeoplePage />} />
                        <Route path="/admin4/people/profile-fields" element={<Admin4PeoplePage />} />
                        <Route path="/admin4/people/badges" element={<Admin4PeoplePage />} />
                        <Route path="/admin4/billing" element={<Admin4BillingPage />} />
                        <Route path="/admin4/billing/plans" element={<Admin4BillingPage />} />
                        <Route path="/admin4/billing/usage" element={<Admin4BillingPage />} />
                        <Route path="/admin4/report" element={<Admin4ReportPage />} />
                        <Route path="/admin4/report/reach" element={<Admin4ReportPage />} />
                        <Route path="/admin4/report/people" element={<Admin4ReportPage />} />
                        <Route path="/admin4/report/posts" element={<Admin4ReportPage />} />
                        <Route path="/admin4/report/spaces" element={<Admin4ReportPage />} />
                        <Route path="/admin4/report/audit-logs" element={<Admin4ReportPage />} />
                        <Route path="/admin4/report/email-logs" element={<Admin4ReportPage />} />
                        <Route path="/admin4/appstore" element={<Admin4AppStorePage />} />
                        <Route path="/admin4/appstore/addons" element={<Admin4AppStorePage />} />
                        <Route path="/admin4/setting" element={<Navigate to="/admin4/setting/site-settings" replace />} />
                        <Route path="/admin4/setting/site-settings" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/authentication" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/domain" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/search" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/messaging" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/moderation" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/localization" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/notifications" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/seo-settings" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/security-privacy" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/setting/gamification" element={<Admin4SettingsPage />} />
                        <Route path="/admin4/site" element={<Admin4SitePage />} />
                        <Route path="/admin4/site/spaces/create" element={<Admin4SiteSpacesCreatePage />} />
                        <Route path="/admin4/site/files" element={<Admin4SiteFilesPage />} />
                        <Route path="/admin4/site/spaces/myfolder/events" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/create" element={<Admin4SiteSpacesEventsCreatePage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/customize" element={<Admin4SiteSpacesEventsCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/customize/widget/space-header" element={<SpaceHeaderCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/customize/widget/events-list" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/customize/widget/discussions-list" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/customize/widget/knowledges-list" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/customize/widget/wishlists-list" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/customize/widget/questions-list" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/permissions" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/members" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/analytics" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/audit-logs" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/seo" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/events/danger" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/customize" element={<Admin4SiteSpacesBlogCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/customize/widget/space-header" element={<SpaceHeaderCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/customize/widget/events-list" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/customize/widget/discussions-list" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/customize/widget/knowledges-list" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/customize/widget/wishlists-list" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/customize/widget/questions-list" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/permissions" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/members" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/analytics" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/audit-logs" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/seo" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/myfolder/blog/danger" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/myfolder/help" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/customize" element={<Admin4SiteSpacesHelpCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/customize/widget/space-header" element={<SpaceHeaderCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/customize/widget/events-list" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/customize/widget/discussions-list" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/customize/widget/knowledges-list" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/customize/widget/wishlists-list" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/customize/widget/questions-list" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/permissions" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/members" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/analytics" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/audit-logs" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/seo" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/myfolder/help/danger" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/customize" element={<Admin4SiteSpacesPostsCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/customize/widget/space-header" element={<SpaceHeaderCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/customize/widget/events-list" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/customize/widget/discussions-list" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/customize/widget/knowledges-list" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/customize/widget/wishlists-list" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/customize/widget/questions-list" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/permissions" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/members" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/analytics" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/audit-logs" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/seo" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/myfolder/posts/danger" element={<Admin4SiteSpacesPostsPage />} />
                        
                        {/* Admin4 Growth folder routes */}
                        <Route path="/admin4/site/spaces/growth/events" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/growth/events/create" element={<Admin4SiteSpacesEventsCreatePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize" element={<Admin4SiteSpacesEventsCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/space-header" element={<SpaceHeaderCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/events-list" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/events" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/discussions-list" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/discussions" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/knowledges-list" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/wishlists-list" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/wishlists" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/questions-list" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/customize/widget/questions" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/events/permissions" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/growth/events/members" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/growth/events/analytics" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/growth/events/audit-logs" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/growth/events/seo" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/growth/events/danger" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/growth/blog" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize" element={<Admin4SiteSpacesBlogCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/space-header" element={<SpaceHeaderCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/events-list" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/events" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/discussions-list" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/discussions" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/knowledges-list" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/wishlists-list" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/wishlists" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/questions-list" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/customize/widget/questions" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/blog/permissions" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/growth/blog/members" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/growth/blog/analytics" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/growth/blog/audit-logs" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/growth/blog/seo" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/growth/blog/danger" element={<Admin4SiteSpacesBlogPage />} />
                        <Route path="/admin4/site/spaces/growth/help" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize" element={<Admin4SiteSpacesHelpCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/space-header" element={<SpaceHeaderCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/events-list" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/events" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/discussions-list" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/discussions" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/knowledges-list" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/wishlists-list" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/wishlists" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/questions-list" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/customize/widget/questions" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/help/permissions" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/growth/help/members" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/growth/help/analytics" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/growth/help/audit-logs" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/growth/help/seo" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/growth/help/danger" element={<Admin4SiteSpacesHelpPage />} />
                        <Route path="/admin4/site/spaces/growth/posts" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize" element={<Admin4SiteSpacesPostsCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/space-header" element={<SpaceHeaderCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/events-list" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/events" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/discussions-list" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/discussions" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/knowledges-list" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/wishlists-list" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/wishlists" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/questions-list" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/customize/widget/questions" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/site/spaces/growth/posts/permissions" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/growth/posts/members" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/growth/posts/analytics" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/growth/posts/audit-logs" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/growth/posts/seo" element={<Admin4SiteSpacesPostsPage />} />
                        <Route path="/admin4/site/spaces/growth/posts/danger" element={<Admin4SiteSpacesPostsPage />} />
                        
                        <Route path="/admin4/site/spaces/private-space" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/private-space/customize" element={<Admin4SiteSpacesEventsCustomizePage />} />
                        <Route path="/admin4/site/spaces/private-space/permissions" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/cms/events" element={<Navigate to="/admin4/site/cms/events/settings" replace />} />
                        <Route path="/admin4/site/cms/events/settings" element={<Admin4SiteCmsEventsPage />} />
                        <Route path="/admin4/site/cms/events/customize" element={<Admin4SiteCmsEventsCustomizePage />} />
                        <Route path="/admin4/onboarding" element={<Admin4OnboardingPage />} />
                        
                        {/* Widget Customizer Pages - Standalone routes */}
                        <Route path="/admin4/widgets/events-list/customize" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/widgets/discussions-list/customize" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/widgets/knowledges-list/customize" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/widgets/wishlists-list/customize" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/widgets/questions-list/customize" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/appearance" element={<Navigate to="/admin4/design" replace />} />
                        <Route path="/admin4/design" element={<Admin4DesignPage />} />
                        <Route path="/admin4/design/page-customizer" element={<Admin4DesignPage />} />
                        <Route path="/admin4/design/site-appearance" element={<Admin4DesignPage />} />
                        <Route path="/admin4/design/site-appearance/logos" element={<Admin4DesignPage />} />
                        <Route path="/admin4/design/site-appearance/themes" element={<Admin4DesignPage />} />
                        <Route path="/admin4/design/site-appearance/typographies" element={<Admin4DesignPage />} />
                        <Route path="/admin4/design/site-appearance/styles" element={<Admin4DesignPage />} />
                        <Route path="/admin4/design/site-appearance/navigation" element={<Admin4DesignPage />} />
                        <Route path="/admin4/design/spaces/create" element={<Admin4DesignSpacesCreatePage />} />
                        
                        {/* Design mode - Space type customization routes */}
                        <Route path="/admin4/design/spaces/:spaceType/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/:spaceType/customize/widget/space-header" element={<SpaceHeaderCustomizePage />} />
                        <Route path="/admin4/design/spaces/:spaceType/customize/widget/events-list" element={<EventsListCustomizePage />} />
                        <Route path="/admin4/design/spaces/:spaceType/customize/widget/discussions-list" element={<DiscussionsListCustomizePage />} />
                        <Route path="/admin4/design/spaces/:spaceType/customize/widget/knowledges-list" element={<KnowledgesListCustomizePage />} />
                        <Route path="/admin4/design/spaces/:spaceType/customize/widget/wishlists-list" element={<WishlistsListCustomizePage />} />
                        <Route path="/admin4/design/spaces/:spaceType/customize/widget/questions-list" element={<QuestionsListCustomizePage />} />
                        <Route path="/admin4/design/spaces/explore/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/discussions/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/questions/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/articles/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/events/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/guidelines/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/changelogs/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/jobs/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/wishlist/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/podcast/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        <Route path="/admin4/design/spaces/blank/customize" element={<Admin4DesignSpacesCustomizePage />} />
                        
                        {/* Site - Generic Space settings routes */}
                        <Route path="/admin4/site/spaces/:spaceType/settings" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/:spaceType/settings/permissions" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/:spaceType/settings/members" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/:spaceType/settings/seo" element={<Admin4SiteSpacesEventsPage />} />
                        <Route path="/admin4/site/spaces/:spaceType/settings/danger" element={<Admin4SiteSpacesEventsPage />} />
                        
                        {/* Legacy design space routes (keep for backward compatibility) */}
                        <Route path="/admin4/design/spaces/growth/events/customize" element={<Admin4SiteSpacesEventsCustomizePage />} />
                        <Route path="/admin4/design/spaces/myfolder/events/customize" element={<Admin4SiteSpacesEventsCustomizePage />} />
                        
                        {/* Legacy Admin Routes - redirect to Admin 3.0 */}
                        <Route path="/admin" element={<Navigate to="/admin3" replace />} />
                        <Route path="/admin/*" element={<Navigate to="/admin3" replace />} />
                        
                        {/* Site Routes */}
                        <Route path="/site" element={<Navigate to="/site/feed" replace />} />
                        <Route path="/site/feed" element={<SiteFeedPage />} />
                        <Route path="/site/post-view" element={<PostViewPage />} />
                        <Route path="/site/event" element={<SiteEventPage />} />
                        <Route path="/site/event/email" element={<EventEmailPreview />} />
                        <Route path="/site/event/:id" element={<SiteEventDetailPage />} />
                        <Route path="/site/moderation" element={<SiteModerationPage />} />
                        <Route path="/site/modration" element={<Navigate to="/site/moderation" replace />} />
                        <Route path="/site/settings" element={<SiteSettingsPage />} />
                        
                        {/* Backwards compatibility routes - redirect to Admin 3.0 */}
                        <Route path="/content" element={<Navigate to="/admin3/content" replace />} />
                        <Route path="/people" element={<Navigate to="/admin3/people" replace />} />
                        
                        {/* Admin Header Demo */}
                        <Route path="/admin-demo" element={<AdminDemo />} />
                        <Route path="/test-admin" element={<TestAdminPage />} />
                        
                        <Route path="*" element={<NotFound />} />
                        </Routes>
                        </RouteProvider>
                        </BrowserRouter>
                    </WidgetConfigProvider>
                </ThemeProvider>
            </AdminProvider>
        </ErrorBoundary>
    </StrictMode>,
);
