import { DotsHorizontal, ArrowLeft, ArrowRight, RefreshCw02, Globe01, Star01, Shield01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface BrowserMockupProps {
  className?: string;
  url?: string;
  title?: string;
}

export const BrowserMockup = ({ 
  className, 
  url = "https://bettermode.com/spaces/myfolder/events", 
  title = "MyFolder Events" 
}: BrowserMockupProps) => {
  return (
    <div className={cx("w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200", className)}>
      {/* Browser Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
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
              <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
                <ArrowLeft className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
                <RefreshCw02 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          
          <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
            <DotsHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full border border-gray-300 px-4 py-2 flex items-center gap-2">
            <Shield01 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600 font-medium">{url}</span>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <Star01 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Browser Content */}
      <div className="bg-white h-[600px] overflow-hidden">
        {/* Website Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Globe01 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">MyFolder</h1>
                <p className="text-sm text-blue-100">Community Events</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors">
                Join
              </button>
              <button className="px-3 py-1.5 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center gap-6">
            <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-2">
              Events
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 pb-2">
              Feed
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 pb-2">
              Members
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 pb-2">
              About
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="px-6 py-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Upcoming Events</h2>
            <p className="text-gray-600 mb-4">Join our community events and connect with fellow members</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View All Events
            </button>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Weekly Standup",
                date: "Today, 10:00 AM",
                attendees: "12 attending",
                color: "bg-blue-500"
              },
              {
                title: "Project Review",
                date: "Tomorrow, 2:00 PM",
                attendees: "8 attending",
                color: "bg-green-500"
              },
              {
                title: "Team Building",
                date: "Friday, 4:00 PM",
                attendees: "25 attending",
                color: "bg-purple-500"
              },
              {
                title: "Monthly Demo",
                date: "Next Week",
                attendees: "15 attending",
                color: "bg-orange-500"
              },
              {
                title: "Training Session",
                date: "Jan 25, 9:00 AM",
                attendees: "6 attending",
                color: "bg-pink-500"
              },
              {
                title: "Company Meetup",
                date: "Jan 30, 6:00 PM",
                attendees: "45 attending",
                color: "bg-cyan-500"
              }
            ].map((event, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${event.color} rounded-lg flex items-center justify-center`}>
                    <Globe01 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{event.attendees}</span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 