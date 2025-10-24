import React from "react";
import { Calendar, Clock, MarkerPin01, Repeat02 } from "@untitledui/icons";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const EventsPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div className="space-preview-container">
      {renderSpaceHeader(
        'Events & Activities',
        'Discover and join amazing events in your community',
        <Calendar className="w-7 h-7 text-white" />,
        'bg-blue-600',
        theme
      )}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-preview-grid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div 
          key={i} 
          className={cx(
            "group relative rounded-xl sm:rounded-2xl border overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-200",
            theme === 'dark' 
              ? "bg-gray-800 border-gray-700 hover:shadow-md hover:border-blue-500/50" 
              : "bg-white border-gray-300 hover:shadow-md hover:border-brand-200"
          )}
          style={{ 
            animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`
          }}
        >
          <div className="relative overflow-hidden aspect-square">
            <img 
              src={`https://picsum.photos/400/200?random=${i}`}
              alt="Event" 
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              {i === 1 && (
                <Badge color="error" type="pill-color" size="md">
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-600 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-error-600"></span>
                    </span>
                    Live Now
                  </span>
                </Badge>
              )}
              {i === 3 && (
                <BadgeWithIcon color="brand" type="pill-color" size="md" iconLeading={Repeat02}>
                  Recurring Event
                </BadgeWithIcon>
              )}
            </div>
          </div>
          <div className="p-2 sm:p-3 flex flex-col flex-1">
            <div className="mb-1 sm:mb-2">
              <div className="flex items-center gap-2">
                <span className={cx("text-[10px] sm:text-xs", theme === 'dark' ? "text-gray-400" : "text-secondary")}>
                  By Event Host
                </span>
              </div>
            </div>
            <h3 className={cx(
              "text-sm sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-brand-solid transition-colors duration-200",
              theme === 'dark' ? "text-gray-100" : "text-primary"
            )}>
              {i === 1 ? 'React Conference 2024' 
               : i === 2 ? 'Design Thinking Workshop' 
               : i === 3 ? 'Startup Pitch Competition'
               : i === 4 ? 'AI & Machine Learning Summit'
               : i === 5 ? 'Photography Masterclass'
               : i === 6 ? 'Digital Marketing Bootcamp'
               : i === 7 ? 'Web3 Developer Meetup'
               : i === 8 ? 'Product Management 101'
               : 'UX Research Workshop'}
            </h3>
            <div className="space-y-0.5 sm:space-y-1 flex-1">
              <div className={cx("flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm group-hover:text-primary transition-colors", theme === 'dark' ? "text-gray-400" : "text-secondary")}>
                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-solid flex-shrink-0" />
                <span className="font-medium">March {14 + i}, 2024</span>
              </div>
              <div className={cx("flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm group-hover:text-primary transition-colors", theme === 'dark' ? "text-gray-400" : "text-secondary")}>
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-success-solid flex-shrink-0" />
                <span>{i % 3 === 1 ? '9:00 AM - 6:00 PM' : i % 3 === 2 ? '2:00 PM - 5:00 PM' : '7:00 PM - 10:00 PM'}</span>
              </div>
              <div className={cx("flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm group-hover:text-primary transition-colors", theme === 'dark' ? "text-gray-400" : "text-secondary")}>
                <MarkerPin01 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-warning-solid flex-shrink-0" />
                <span>{i === 1 ? 'LA, USA' : i === 2 ? 'Online' : 'NYC, USA'}</span>
              </div>
            </div>
            <div className={cx(
              "pt-2 sm:pt-3 mt-1.5 sm:mt-2 border-t group-hover:border-gray-200 transition-colors",
              theme === 'dark' ? "border-gray-700" : "border-secondary/30"
            )}>
              <div className="flex items-center justify-end">
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-secondary hover:bg-secondary_hover text-primary rounded-lg transition-colors">
                  RSVP Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};
