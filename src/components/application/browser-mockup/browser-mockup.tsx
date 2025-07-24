import { DotsHorizontal, ArrowLeft, ArrowRight, RefreshCw02, Globe01, Star01, Shield01, Calendar, SearchLg, Home01, Rss01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
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
}

export const BrowserMockup = ({ 
  className, 
  url = "http://localhost:5173/site/event", 
  title = "Events" 
}: BrowserMockupProps) => {

  return (
    <div className="w-full h-full">
      <style>{customStyles}</style>
      <div className={cx("w-full bg-primary rounded-xl shadow-lg overflow-hidden border border-secondary", className)}>
        {/* Browser Header */}
        <div className="bg-secondary border-b border-secondary px-4 py-3">
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
                <button className="p-1.5 rounded-md hover:bg-secondary_hover transition-colors">
                  <ArrowLeft className="w-4 h-4 text-tertiary" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-secondary_hover transition-colors">
                  <ArrowRight className="w-4 h-4 text-tertiary" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-secondary_hover transition-colors">
                  <RefreshCw02 className="w-4 h-4 text-tertiary" />
                </button>
              </div>
            </div>
            
            <button className="p-1.5 rounded-md hover:bg-secondary_hover transition-colors">
              <DotsHorizontal className="w-4 h-4 text-tertiary" />
            </button>
          </div>
          
          {/* Address Bar */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-primary rounded-full border border-secondary px-4 py-2 flex items-center gap-2">
              <Shield01 className="w-4 h-4 text-green-600" />
              <span className="text-sm text-secondary font-medium">{url}</span>
            </div>
            <button className="p-2 rounded-full hover:bg-secondary_hover transition-colors">
              <Star01 className="w-4 h-4 text-tertiary" />
            </button>
          </div>
        </div>
        
        {/* Browser Content */}
        <div className="bg-primary h-[600px] overflow-hidden flex flex-col">
          {/* Site Navigation Header */}
          <div className="bg-primary border-b border-secondary px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
                <nav className="flex items-center gap-6">
                  <span className="text-xs text-tertiary hover:text-primary">Products</span>
                  <span className="text-xs text-tertiary hover:text-primary">Services</span>
                  <span className="text-xs text-tertiary hover:text-primary">Pricing</span>
                  <span className="text-xs text-tertiary hover:text-primary">Resources</span>
                  <span className="text-xs text-tertiary hover:text-primary">About</span>
                </nav>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 text-xs text-tertiary hover:text-primary">Sign in</button>
                <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Get started</button>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-48 bg-primary border-r border-secondary">
              <div className="py-3 px-3">
                <nav className="space-y-1">
                  <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-secondary hover:bg-secondary hover:text-primary">
                    <Home01 className="h-3.5 w-3.5" />
                    Home
                  </div>
                  <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-secondary hover:bg-secondary hover:text-primary">
                    <Rss01 className="h-3.5 w-3.5" />
                    Feed
                  </div>
                  <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium bg-blue-50 text-blue-600">
                    <Calendar className="h-3.5 w-3.5" />
                    Events
                  </div>
                  <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-secondary hover:bg-secondary hover:text-primary">
                    <SearchLg className="h-3.5 w-3.5" />
                    Explore
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50 overflow-hidden">
              <div className="h-full overflow-y-auto">
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