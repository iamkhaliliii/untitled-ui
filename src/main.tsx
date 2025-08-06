import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { HomeScreen } from "@/pages/home-screen";
import { AdminDashboardPage } from "@/pages/admin/dashboard";
import { AdminContentPage } from "@/pages/admin/content";
import { AdminContentEventsPage } from "@/pages/admin/content-events";
import { AdminContentEventsCreatePage } from "@/pages/admin/content-events-create";
import { AdminPeoplePage } from "@/pages/admin/people";
import { AdminGamificationPage } from "@/pages/admin/gamification";
import { AdminSiteSettingsPage } from "@/pages/admin/site-settings";
import { AdminAuthenticationPage } from "@/pages/admin/authentication";
import { AdminSitePage } from "@/pages/admin/site";
import { SiteFilesPage } from "@/pages/admin/site-files";
import { SiteSpacesEventsPage } from "@/pages/admin/site-spaces-events";
import { SiteSpacesEventsCreatePage } from "@/pages/admin/site-spaces-events-create";
import EventsCustomizePage from "@/pages/admin/events-customize";
import { SiteHomePage } from "@/pages/site/home";
import { SiteFeedPage } from "@/pages/site/feed";
import { SiteEventPage } from "@/pages/site/event";
import SiteEventDetailPage from "@/pages/site/event-detail";
import { NotFound } from "@/pages/not-found";
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
                        
                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminDashboardPage />} />
                        <Route path="/admin/content" element={<AdminContentPage />} />
                        <Route path="/admin/content/events" element={<AdminContentEventsPage />} />
                        <Route path="/admin/content/events/create" element={<AdminContentEventsCreatePage />} />
                        <Route path="/admin/people" element={<AdminPeoplePage />} />
                        <Route path="/admin/setting" element={<Navigate to="/admin/setting/site-settings" replace />} />
                        <Route path="/admin/setting/site-settings" element={<AdminSiteSettingsPage />} />
                        <Route path="/admin/setting/authentication" element={<AdminAuthenticationPage />} />
                        <Route path="/admin/setting/gamification" element={<AdminGamificationPage />} />
                        <Route path="/admin/site" element={<AdminSitePage />} />
                        <Route path="/admin/site/files" element={<SiteFilesPage />} />
                        <Route path="/admin/site/spaces/myfolder/events" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/create" element={<SiteSpacesEventsCreatePage />} />
                        <Route path="/admin/site/spaces/myfolder/events/customize" element={<EventsCustomizePage />} />
                        <Route path="/admin/site/spaces/myfolder/events/members" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/analytics" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/audit-logs" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/seo" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/danger" element={<SiteSpacesEventsPage />} />
                        
                        {/* Private Space Routes */}
                        <Route path="/admin/site/spaces/private-space" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/private-space/customize" element={<EventsCustomizePage />} />
                        
                        {/* Site Routes */}
                        <Route path="/site" element={<SiteHomePage />} />
                        <Route path="/site/feed" element={<SiteFeedPage />} />
                        <Route path="/site/event" element={<SiteEventPage />} />
                        <Route path="/site/event/:id" element={<SiteEventDetailPage />} />
                        
                        {/* Backwards compatibility routes */}
                        <Route path="/content" element={<AdminContentPage />} />
                        <Route path="/people" element={<AdminPeoplePage />} />
                        
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
