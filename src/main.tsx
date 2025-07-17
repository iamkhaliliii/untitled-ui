import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomeScreen } from "@/pages/home-screen";
import { AdminDashboardPage } from "@/pages/admin/dashboard";
import { AdminContentPage } from "@/pages/admin/content";
import { AdminPeoplePage } from "@/pages/admin/people";
import { AdminSitePage } from "@/pages/admin/site";
import { SiteFilesPage } from "@/pages/admin/site-files";
import { SiteSpacesEventsPage } from "@/pages/admin/site-spaces-events";
import { SiteSpacesEventsCreatePage } from "@/pages/admin/site-spaces-events-create";
import { SiteHomePage } from "@/pages/site/home";
import { SiteFeedPage } from "@/pages/site/feed";
import { SiteEventPage } from "@/pages/site/event";
import { NotFound } from "@/pages/not-found";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <RouteProvider>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        
                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminDashboardPage />} />
                        <Route path="/admin/content" element={<AdminContentPage />} />
                        <Route path="/admin/people" element={<AdminPeoplePage />} />
                        <Route path="/admin/site" element={<AdminSitePage />} />
                        <Route path="/admin/site/files" element={<SiteFilesPage />} />
                        <Route path="/admin/site/spaces/myfolder/events" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/create" element={<SiteSpacesEventsCreatePage />} />
                        <Route path="/admin/site/spaces/myfolder/events/customize" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/members" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/analytics" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/audit-logs" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/seo" element={<SiteSpacesEventsPage />} />
                        <Route path="/admin/site/spaces/myfolder/events/danger" element={<SiteSpacesEventsPage />} />
                        
                        {/* Site Routes */}
                        <Route path="/site" element={<SiteHomePage />} />
                        <Route path="/site/feed" element={<SiteFeedPage />} />
                        <Route path="/site/event" element={<SiteEventPage />} />
                        
                        {/* Backwards compatibility routes */}
                        <Route path="/content" element={<AdminContentPage />} />
                        <Route path="/people" element={<AdminPeoplePage />} />
                        
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
