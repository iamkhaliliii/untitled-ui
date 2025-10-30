import React from 'react';
import { HelpCircle, X, ArrowRight, Zap, Square, AlertTriangle, InfoCircle, Palette, Image01, VideoRecorder } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface AnnouncementBannerWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const AnnouncementBannerWidget: React.FC<AnnouncementBannerWidgetProps> = ({ className, theme: propTheme }) => {
  const theme = useResolvedTheme(propTheme);
  const { announcementBannerConfig } = useWidgetConfig();

  // Calculate contrast and determine text color for custom colors
  const getTextColorForBackground = (hexColor: string): 'white' | 'black' => {
    // Remove # if present
    const hex = hexColor.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate relative luminance (WCAG formula)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark backgrounds, black for light backgrounds
    return luminance > 0.5 ? 'black' : 'white';
  };

  // Style configurations based on the selected style
  const getStyleClasses = () => {
    const baseClasses = "rounded-lg p-4";
    
    switch (announcementBannerConfig.style) {
      case 'primary':
        return cx(
          baseClasses,
          "bg-brand-solid",
          // No border for primary
        );
      case 'natural':
        return cx(
          baseClasses,
          "border bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200",
          theme === 'dark' && "from-gray-900/20 to-slate-900/20 border-gray-700"
        );
      case 'warning':
        return cx(
          baseClasses,
          "border bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200",
          theme === 'dark' && "from-yellow-900/20 to-orange-900/20 border-yellow-700"
        );
      case 'error':
        return cx(
          baseClasses,
          "border bg-gradient-to-r from-red-50 to-pink-50 border-red-200",
          theme === 'dark' && "from-red-900/20 to-pink-900/20 border-red-700"
        );
      case 'info':
        return cx(
          baseClasses,
          "border bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200",
          theme === 'dark' && "from-cyan-900/20 to-teal-900/20 border-cyan-700"
        );
      case 'color':
        return cx(
          baseClasses,
          // No border for color style - will use custom background color
        );
      case 'image':
        return cx(
          baseClasses,
          "relative overflow-hidden",
          // No border - will show image
        );
      case 'video':
        return cx(
          baseClasses,
          "relative overflow-hidden",
          // No border - will show video
        );
      default:
        return cx(
          baseClasses,
          "bg-brand-solid"
        );
    }
  };

  const getIconColor = () => {
    switch (announcementBannerConfig.style) {
      case 'primary': return 'text-purple-600';
      case 'natural': return 'text-gray-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-cyan-600';
      case 'color': return 'text-pink-600';
      case 'image': return 'text-green-600';
      case 'video': return 'text-violet-600';
      default: return 'text-purple-600';
    }
  };

  const getIconComponent = () => {
    switch (announcementBannerConfig.style) {
      case 'primary': return Zap;
      case 'natural': return Square;
      case 'warning': return AlertTriangle;
      case 'error': return X;
      case 'info': return InfoCircle;
      case 'color': return Palette;
      case 'image': return Image01;
      case 'video': return VideoRecorder;
      default: return Zap;
    }
  };

  const getTextColor = () => {
    switch (announcementBannerConfig.style) {
      case 'primary': return "text-white"; // Always white on solid brand background
      case 'natural': return theme === 'dark' ? "text-gray-100" : "text-gray-900";
      case 'warning': return theme === 'dark' ? "text-yellow-100" : "text-yellow-900";
      case 'error': return theme === 'dark' ? "text-red-100" : "text-red-900";
      case 'info': return theme === 'dark' ? "text-cyan-100" : "text-cyan-900";
      case 'color': {
        // Dynamic text color based on background brightness
        const bgColor = announcementBannerConfig.backgroundColor || '#ec4899';
        const textColor = getTextColorForBackground(bgColor);
        return textColor === 'white' ? 'text-white' : 'text-black';
      }
      case 'image': return "text-white"; // White on image
      case 'video': return "text-white"; // White on video
      default: return "text-white";
    }
  };

  const BannerContent = () => {
    const IconComponent = getIconComponent();
    
    return (
      <div className="flex items-center justify-between relative">
        {/* Left spacer for alignment (same width as close button if it exists) */}
        <div className={cx("flex-shrink-0", announcementBannerConfig.showCloseButton ? "w-8" : "w-0")}></div>

        {/* Center content - Icon + Text */}
        <div className="flex-1 flex items-center justify-center gap-3">
          {/* Icon - Dynamic based on style (hidden for primary, color, image, video) */}
          {announcementBannerConfig.showIcon && 
           !['primary', 'color', 'image', 'video'].includes(announcementBannerConfig.style) && (
        <div className="flex-shrink-0">
              <IconComponent className={cx("w-5 h-5", getIconColor())} />
        </div>
      )}

          {/* Text - Centered */}
          <p className={cx("text-sm font-medium", getTextColor())}>
            {announcementBannerConfig.title || "Announcement text"}
          </p>
      </div>

        {/* Close Button - Far right */}
      {announcementBannerConfig.showCloseButton && (
        <button 
          className={cx(
            "flex-shrink-0 p-1 rounded-md transition-colors",
            "hover:bg-white/20",
            getTextColor()
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
  };

  return (
    <div 
      className={cx(getStyleClasses(), className, "relative")}
      style={announcementBannerConfig.style === 'color' ? { backgroundColor: announcementBannerConfig.backgroundColor || '#ec4899' } : undefined}
    >
      {/* Image Background */}
      {announcementBannerConfig.style === 'image' && (
        <>
          <div className="absolute inset-0">
            {announcementBannerConfig.imageUrl ? (
              <img 
                src={announcementBannerConfig.imageUrl} 
                alt="Banner Background" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={cx(
                "w-full h-full",
                theme === 'dark' ? "bg-gray-800" : "bg-gray-600"
              )}>
                {/* Placeholder pattern */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}
                />
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/40"></div>
        </>
      )}
      
      {/* Video Background */}
      {announcementBannerConfig.style === 'video' && (
        <>
          <div className="absolute inset-0">
            {announcementBannerConfig.videoUrl ? (
              <video 
                src={announcementBannerConfig.videoUrl} 
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <div className={cx(
                "w-full h-full",
                theme === 'dark' ? "bg-gray-800" : "bg-gray-700"
              )}>
                {/* Placeholder pattern */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}
                />
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
        </>
      )}
      
      {announcementBannerConfig.url && announcementBannerConfig.url !== '#' ? (
        <a 
          href={announcementBannerConfig.url}
          className="block cursor-pointer hover:opacity-90 transition-opacity relative z-10"
        >
          <BannerContent />
        </a>
      ) : (
        <div className="relative z-10">
        <BannerContent />
        </div>
      )}
    </div>
  );
};
