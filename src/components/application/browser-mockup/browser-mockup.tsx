import { DotsHorizontal, ArrowLeft, ArrowRight, RefreshCw02, Globe01, Star01, Shield01, Calendar, SearchLg, Home01, Rss01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { SpaceHeaderWidget } from "./space-header-widget";
import { EventsListWidget } from "./events-list-widget";

// Add custom animations
const customStyles = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes scaleIn {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
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
  url = "http://localhost:5173/site/event", 
  title = "Events",
  theme: propTheme
}: BrowserMockupProps) => {
  const theme = useResolvedTheme(propTheme);

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
          "h-[600px] overflow-hidden flex flex-col",
          theme === 'dark' ? "bg-gray-900" : "bg-gray-50"
        )}>
          {/* Site Navigation Header */}
          <div className={cx(
            "border-b px-4 py-2",
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
              "w-48 border-r",
              theme === 'dark' ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
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
              "flex-1 overflow-hidden",
              theme === 'dark' ? "bg-gray-800" : "bg-gray-50"
            )}>
              <div className="h-full overflow-y-auto scrollbar-thin">
                <div className="max-w-4xl mx-auto p-6">
                  {/* Space Header Widget */}
                  <SpaceHeaderWidget />
                  
                  {/* Events List Widget */}
                  <EventsListWidget />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 