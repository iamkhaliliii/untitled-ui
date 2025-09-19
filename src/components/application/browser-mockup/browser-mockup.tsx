import React from "react";
import { DotsHorizontal, ArrowLeft, ArrowRight, RefreshCw02,Menu01, Globe01, Star01, Shield01, Calendar, SearchLg, Home01, Rss01, Lock01, UserPlus01, HelpCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";
import { SpaceHeaderWidget } from "./space-header-widget";
import { EventsListWidget } from "./events-list-widget";



// Minimal styles for smooth transitions
const customStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 2px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.5);
  }
`;

interface BrowserMockupProps {
  className?: string;
  url?: string;
  title?: string;
  theme?: 'light' | 'dark';
}


export const BrowserMockup = ({ 
  className, 
  url = "/site/event", 
  title = "Events",
  theme: propTheme
}: BrowserMockupProps) => {
  const theme = useResolvedTheme(propTheme);
  const { toggleStates, spaceWidgetStates, layoutStates, sidebarWidgetStates } = useWidgetConfig();
  
  // Detect if we're on a private space page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPrivateSpacePage = currentPath.includes('/admin/site/spaces/private-space');

  return (
    <div className="w-full h-full">
      <style>{customStyles}</style>
      <div className={cx(
        "w-full rounded-xl shadow-lg overflow-hidden border",
        theme === 'dark' ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
        className
      )}>
        {/* Browser Header */}
        <div className={cx(
          "border-b px-4 py-3",
          theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
        )}>
          {/* Window Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center gap-1 ml-4">
                <button className={cx(
                  "p-1.5 rounded-md transition-colors",
                  theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-200"
                )}>
                  <ArrowLeft className={cx(
                    "w-4 h-4",
                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                  )} />
                </button>
                <button className={cx(
                  "p-1.5 rounded-md transition-colors",
                  theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-200"
                )}>
                  <ArrowRight className={cx(
                    "w-4 h-4",
                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                  )} />
                </button>
                <button className={cx(
                  "p-1.5 rounded-md transition-colors",
                  theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-200"
                )}>
                  <RefreshCw02 className={cx(
                    "w-4 h-4",
                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                  )} />
                </button>
              </div>
            </div>
            
            <button className={cx(
              "p-1.5 rounded-md transition-colors",
              theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-200"
            )}>
              <DotsHorizontal className={cx(
                "w-4 h-4",
                theme === 'dark' ? "text-gray-400" : "text-gray-600"
              )} />
            </button>
          </div>
          
          {/* Address Bar */}
          <div className="mt-3 flex items-center gap-2">
            <div className={cx(
              "flex-1 rounded-full border px-4 py-2 flex items-center gap-2",
              theme === 'dark' ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
            )}>
              <Shield01 className={cx(
                "w-4 h-4",
                theme === 'dark' ? "text-green-400" : "text-green-600"
              )} />
              <span className={cx(
                "text-sm font-medium",
                theme === 'dark' ? "text-gray-200" : "text-gray-800"
              )}>{url}</span>
            </div>
            <button className={cx(
              "p-2 rounded-full transition-colors",
              theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-200"
            )}>
              <Star01 className={cx(
                "w-4 h-4",
                theme === 'dark' ? "text-gray-400" : "text-gray-600"
              )} />
            </button>
          </div>
        </div>
        
        {/* Browser Content */}
        <div className={cx(
          "h-[calc(100vh-158px)] overflow-hidden flex flex-col",
          theme === 'dark' ? "bg-gray-900" : "bg-gray-50"
        )}>
          {/* Site Navigation Header */}
          <div className={cx(
            "border-b px-4 py-2 transition-all duration-300 ease-in-out",
            toggleStates?.header !== false 
              ? "opacity-100 max-h-20 overflow-visible" 
              : "opacity-0 max-h-0 overflow-hidden",
            theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  <nav className="flex items-center gap-6">
                    <span className={cx(
                      "text-xs transition-colors",
                      theme === 'dark' ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
                    )}>Products</span>
                    <span className={cx(
                      "text-xs transition-colors",
                      theme === 'dark' ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
                    )}>Services</span>
                    <span className={cx(
                      "text-xs transition-colors",
                      theme === 'dark' ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
                    )}>Pricing</span>
                    <span className={cx(
                      "text-xs transition-colors",
                      theme === 'dark' ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
                    )}>Resources</span>
                    <span className={cx(
                      "text-xs transition-colors",
                      theme === 'dark' ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
                    )}>About</span>
                  </nav>
                </div>
                <div className="flex items-center gap-2">
                  <button className={cx(
                    "px-2 py-1 text-xs transition-colors",
                    theme === 'dark' ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
                  )}>Sign in</button>
                  <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">Get started</button>
                </div>
              </div>
            </div>

          {/* Main Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <div className={cx(
              "transition-all duration-200 ease-out",
              toggleStates?.leftSidebar !== false 
                ? "w-48 opacity-100" 
                : "w-0 opacity-0 overflow-hidden",
              theme === 'dark' ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
            )}>
                <div className="py-3 px-3">
                  <nav className="space-y-1">
                    <div className={cx(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
                      theme === 'dark' ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    )}>
                      <Home01 className="h-3.5 w-3.5" />
                      Home
                    </div>
                    <div className={cx(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
                      theme === 'dark' ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    )}>
                      <Rss01 className="h-3.5 w-3.5" />
                      Feed
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium bg-blue-600 text-white">
                      <Calendar className="h-3.5 w-3.5" />
                      Events
                    </div>
                    <div className={cx(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
                      theme === 'dark' ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    )}>
                      <SearchLg className="h-3.5 w-3.5" />
                      Explore
                    </div>
                  </nav>
                </div>
              </div>

            {/* Main Content */}
            <div className={cx(
              "flex-1 overflow-hidden transition-all duration-200 ease-out",
              theme === 'dark' ? "bg-gray-800" : "bg-gray-50"
            )}>
              <div className="h-full overflow-y-auto scrollbar-thin">
                <div className={cx(
                  "mx-auto p-6 transition-all duration-200 ease-out",
                  layoutStates?.layoutStyle === 'with-sidebar' ? "max-w-3xl" : "max-w-4xl"
                )}>
                                    {isPrivateSpacePage ? (
                    /* Private Space Empty State */
                    <>
                      <div className="mx-auto bg-white overflow-hidden rounded-xl shadow-md flex w-full  flex-col items-center justify-center py-20">
                        {/* Background Pattern */}
                        <header className="relative mb-5">
                          <svg 
                            width="480" 
                            height="480" 
                            viewBox="0 0 480 480" 
                            fill="none" 
                            className={cx(
                              "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                              theme === 'dark' ? "text-gray-700/40" : "text-gray-200"
                            )}
                          >
                            <mask id="mask0_private_space" maskUnits="userSpaceOnUse" x="0" y="0" width="480" height="480" style={{maskType: 'alpha'}}>
                              <rect width="480" height="480" fill="url(#paint0_radial_private_space)"></rect>
                            </mask>
                            <g mask="url(#mask0_private_space)">
                              <circle cx="240" cy="240" r="47.5" stroke="currentColor"></circle>
                              <circle cx="240" cy="240" r="79.5" stroke="currentColor"></circle>
                              <circle cx="240" cy="240" r="111.5" stroke="currentColor"></circle>
                              <circle cx="240" cy="240" r="143.5" stroke="currentColor"></circle>
                              <circle cx="240" cy="240" r="175.5" stroke="currentColor"></circle>
                              <circle cx="240" cy="240" r="207.5" stroke="currentColor"></circle>
                              <circle cx="240" cy="240" r="239.5" stroke="currentColor"></circle>
                            </g>
                            <defs>
                              <radialGradient 
                                id="paint0_radial_private_space" 
                                cx="0" 
                                cy="0" 
                                r="1" 
                                gradientUnits="userSpaceOnUse" 
                                gradientTransform="translate(240 240) rotate(90) scale(240 240)"
                              >
                                <stop></stop>
                                <stop offset="1" stopOpacity="0"></stop>
                              </radialGradient>
                            </defs>
                          </svg>
                          
                          {/* Featured Icon */}
                          <div className={cx(
                            "relative flex shrink-0 items-center justify-center size-12 rounded-[10px]",
                            "shadow-xs ring-1 ring-inset z-10",
                            theme === 'dark' 
                              ? "bg-gray-800 ring-gray-700 text-gray-400" 
                              : "bg-white ring-gray-200 text-gray-600"
                          )}>
                            <Lock01 className="size-6" />
                          </div>
                        </header>
                        
                        {/* Main Content */}
                        <main className="z-10 flex w-full max-w-88 flex-col items-center justify-center mb-8 gap-2">
                          <h1 className={cx(
                            "text-lg font-semibold",
                            theme === 'dark' ? "text-gray-100" : "text-gray-900"
                          )}>
                            Access Restricted
                          </h1>
                          <p className={cx(
                            "text-center text-sm",
                            theme === 'dark' ? "text-gray-400" : "text-gray-600"
                          )}>
                            This space is private and requires authorization. Request access to view exclusive content.
                          </p>
                        </main>
                        
                        {/* Footer Actions */}
                        <footer className="z-10 flex gap-3">
                          <button className={cx(
                            "group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap",
                            "outline-none transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
                            "gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold shadow-xs ring-1 ring-inset",
                            theme === 'dark'
                              ? "bg-gray-800 text-gray-300 ring-gray-700 hover:bg-gray-700 hover:text-gray-200"
                              : "bg-white text-gray-700 ring-gray-300 hover:bg-gray-50 hover:text-gray-800"
                          )}>
                            <span className="transition-inherit-all px-0.5">Back to Home</span>
                          </button>
                          
                          <button className={cx(
                            "group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap",
                            "outline-none transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
                            "gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold shadow-xs ring-1 ring-transparent ring-inset",
                            "bg-blue-600 text-white hover:bg-blue-700",
                            "before:absolute before:inset-px before:border before:border-white/12 before:rounded-[7px]"
                          )}>
                            <UserPlus01 className="size-5 shrink-0" />
                            <span className="transition-inherit-all px-0.5">Request Access</span>
                          </button>
                        </footer>
                      </div>
                      
                      {/* Helper Note */}
                      <div className={cx(
                        "mt-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-md mx-auto",
                        theme === 'dark' 
                          ? "bg-blue-900/20 border-blue-800/50 text-blue-200 hover:bg-blue-900/30" 
                          : "bg-blue-50/80 border-blue-200/60 text-blue-800 hover:bg-blue-50/90"
                      )}>
                        <div className="p-5">
                          <div className="flex items-start gap-4">
                            <div className={cx(
                              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                              theme === 'dark' ? "bg-blue-800/50" : "bg-blue-100"
                            )}>
                              <HelpCircle className="w-4 h-4" />
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                Admin Customization
                                <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-blue-500 text-white rounded-full">!</span>
                              </h4>
                              <p className="text-sm opacity-90 leading-relaxed">
                                Customize this private space experience through the admin panel. 
                                Configure access messages, button actions, and different layouts 
                                for various user permission levels.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Events Content */
                    <div className="space-y-6">
                      {/* Space Header Widget */}
                      <div className={cx(
                        "transition-all duration-200 ease-out",
                        spaceWidgetStates?.spaceHeader 
                          ? "opacity-100 max-h-96 overflow-visible" 
                          : "opacity-0 max-h-0 overflow-hidden"
                      )}>
                        <SpaceHeaderWidget />
                      </div>
                      
                      {/* Events List Widget */}
                      <div className={cx(
                        "transition-all duration-200 ease-out",
                        spaceWidgetStates?.eventsList 
                          ? "opacity-100 max-h-screen overflow-visible" 
                          : "opacity-0 max-h-0 overflow-hidden"
                      )}>
                        <EventsListWidget />
                      </div>
                      
                      {/* Hero Banner Widget */}
                      <div className={cx(
                        "transition-all duration-200 ease-out",
                        spaceWidgetStates?.heroBanner 
                          ? "opacity-100 max-h-96 overflow-visible" 
                          : "opacity-0 max-h-0 overflow-hidden"
                      )}>
                        <div className="rounded-lg border p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          <h2 className="text-2xl font-bold mb-2">Welcome to Our Events</h2>
                          <p className="text-blue-100 mb-4">
                            Discover amazing events and connect with your community.
                          </p>
                          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                            Explore Events
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className={cx(
              "transition-all duration-200 ease-out border-l",
              layoutStates?.layoutStyle === 'with-sidebar'
                ? "w-64 opacity-100" 
                : "w-0 opacity-0 overflow-hidden",
              theme === 'dark' ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
            )}>
              <div className="p-4">
                  {/* Quick Actions - Conditional */}
                  <div className={cx(
                    "transition-all duration-200 ease-out",
                    sidebarWidgetStates?.quickActions 
                      ? "opacity-100 max-h-96 overflow-visible mb-4" 
                      : "opacity-0 max-h-0 overflow-hidden"
                  )}>
                    <div className={cx(
                      "rounded-lg border p-4",
                      theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    )}>
                      <h4 className={cx(
                        "text-sm font-medium mb-3",
                        theme === 'dark' ? "text-gray-200" : "text-gray-800"
                      )}>
                        Quick Actions
                      </h4>
                      <div className="space-y-2">
                        <button className="w-full flex items-center gap-2 p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors text-sm">
                          <Calendar className="h-4 w-4" />
                          Create Event
                        </button>
                        <button className="w-full flex items-center gap-2 p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm">
                          <SearchLg className="h-4 w-4" />
                          Find Events
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity - Conditional */}
                  <div className={cx(
                    "transition-all duration-200 ease-out",
                    sidebarWidgetStates?.recentActivity 
                      ? "opacity-100 max-h-96 overflow-visible" 
                      : "opacity-0 max-h-0 overflow-hidden"
                  )}>
                    <div className={cx(
                      "rounded-lg border p-4",
                      theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    )}>
                      <h4 className={cx(
                        "text-sm font-medium mb-3",
                        theme === 'dark' ? "text-gray-200" : "text-gray-800"
                      )}>
                        Recent Activity
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className={cx("text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
                            New event created
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className={cx("text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
                            5 new registrations
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className={cx("text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
                            Event updated
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 