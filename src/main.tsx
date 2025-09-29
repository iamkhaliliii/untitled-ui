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
import { SiteHomePage } from "@/pages/site/home";
import { SiteFeedPage } from "@/pages/site/feed";
import SiteEventPage from "@/pages/site/event";
import SiteEventDetailPage from "@/pages/site/event-detail";
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
                        
                        {/* Legacy Admin Routes - redirect to Admin 3.0 */}
                        <Route path="/admin" element={<Navigate to="/admin3" replace />} />
                        <Route path="/admin/*" element={<Navigate to="/admin3" replace />} />
                        
                        {/* Site Routes */}
                        <Route path="/site" element={<SiteHomePage />} />
                        <Route path="/site/feed" element={<SiteFeedPage />} />
                        <Route path="/site/post-view" element={<PostViewPage />} />
                        <Route path="/site/event" element={<SiteEventPage />} />
                        <Route path="/site/event/:id" element={<SiteEventDetailPage />} />
                        
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
