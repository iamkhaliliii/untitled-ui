import React from 'react';
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface HeroBannerWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const HeroBannerWidget: React.FC<HeroBannerWidgetProps> = ({ 
  className, 
  theme: propTheme,
}) => {
  const theme = useResolvedTheme(propTheme);
  const { heroBannerConfig } = useWidgetConfig();
  
  const { layout, style, alignment, title, description, showCTA, ctaText, ctaUrl, backgroundColor, imageUrl, videoUrl } = heroBannerConfig;

  // Calculate contrast and determine text color
  const getTextColor = (hexColor: string): 'white' | 'black' => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? 'black' : 'white';
  };

  const textColor = style === 'color' ? getTextColor(backgroundColor) : 'white';

  // Check if layout is split (2-column)
  const isSplitLayout = ['left', 'right', 'top', 'bottom'].includes(layout);
  
  // Get flex direction based on layout
  // Note: We render Content first, then Media in JSX
  // So for "Left" we want Content-Media order (normal flex-row)
  // For "Right" we want Media-Content order (flex-row-reverse)
  const getFlexDirection = () => {
    switch (layout) {
      case 'left':
        return 'flex-row'; // Content first (left), then Media (right)
      case 'right':
        return 'flex-row-reverse'; // Content first but reversed, so Media (left), Content (right)
      case 'top':
        return 'flex-col'; // Content first (top), then Media (bottom)
      case 'bottom':
        return 'flex-col-reverse'; // Content first but reversed, so Media (top), Content (bottom)
      default:
        return '';
    }
  };

  // Get text alignment classes
  const getTextAlignment = () => {
    switch (alignment) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      case 'center':
      default:
        return 'text-center items-center';
    }
  };

  // Render Fill Layout (content over background)
  if (layout === 'fill') {
    return (
      <div 
        className={cx(
          "rounded-lg overflow-hidden relative min-h-[300px] flex flex-col justify-center p-16",
          getTextAlignment(),
          style === 'simple' && (theme === 'dark' ? "bg-gray-800 border border-gray-700" : "bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"),
          className
        )}
        style={style === 'color' ? { backgroundColor } : undefined}
      >
      {/* Image Background */}
      {style === 'image' && (
        <>
          <div className="absolute inset-0">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Hero Background" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={cx(
                "w-full h-full",
                theme === 'dark' ? "bg-gray-800" : "bg-gray-600"
              )}>
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

      {/* Video Background */}
      {style === 'video' && (
        <>
          <div className="absolute inset-0">
            {videoUrl ? (
              <video 
                src={videoUrl} 
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
          <div className="absolute inset-0 bg-black/60"></div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h2 className={cx(
          "text-2xl font-bold mb-3",
          style === 'simple' && (theme === 'dark' ? "text-gray-100" : "text-gray-900"),
          (style === 'color' || style === 'image' || style === 'video') && (textColor === 'white' ? 'text-white' : 'text-black')
        )}>
          {title}
        </h2>
        
        <p className={cx(
          "text-base mb-6",
          style === 'simple' && (theme === 'dark' ? "text-gray-300" : "text-gray-600"),
          (style === 'color' || style === 'image' || style === 'video') && (textColor === 'white' ? 'text-white/90' : 'text-black/80')
        )}>
          {description}
        </p>
        
        {showCTA && (
          <a
            href={ctaUrl}
            className={cx(
              "inline-block px-6 py-3 rounded-lg font-medium text-sm transition-colors",
              style === 'simple' && "bg-brand-solid text-white hover:bg-brand-solid_hover",
              style === 'color' && (textColor === 'white' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'),
              (style === 'image' || style === 'video') && "bg-white text-gray-900 hover:bg-gray-100"
            )}
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
    );
  }

  // Render Split Layout (2-column: content + media)
  return (
    <div 
      className={cx(
        "rounded-lg overflow-hidden border flex min-h-[300px]",
        getFlexDirection(),
        theme === 'dark' ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
        className
      )}
    >
      {/* Content Column */}
      <div className={cx(
        "flex flex-col justify-center p-8",
        getTextAlignment(),
        (layout === 'left' || layout === 'right') && "w-1/2",
        (layout === 'top' || layout === 'bottom') && "w-full"
      )}>
        <h2 className={cx(
          "text-2xl font-bold mb-3",
          theme === 'dark' ? "text-gray-100" : "text-gray-900"
        )}>
          {title}
        </h2>
        
        <p className={cx(
          "text-base mb-6",
          theme === 'dark' ? "text-gray-300" : "text-gray-600"
        )}>
          {description}
        </p>
        
        {showCTA && (
          <div>
            <a
              href={ctaUrl}
              className="inline-block px-6 py-3 rounded-lg font-medium text-sm bg-brand-solid text-white hover:bg-brand-solid_hover transition-colors"
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>

      {/* Media Column */}
      <div className={cx(
        "relative",
        (layout === 'left' || layout === 'right') && "w-1/2",
        (layout === 'top' || layout === 'bottom') && "w-full h-64"
      )}
        style={style === 'color' ? { backgroundColor } : undefined}
      >
        {/* Image Background */}
        {style === 'image' && (
          <div className="absolute inset-0">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Hero Media" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={cx(
                "w-full h-full",
                theme === 'dark' ? "bg-gray-800" : "bg-gray-600"
              )}>
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
        )}

        {/* Video Background */}
        {style === 'video' && (
          <div className="absolute inset-0">
            {videoUrl ? (
              <video 
                src={videoUrl} 
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
        )}

        {/* Simple style - show gradient in media column */}
        {style === 'simple' && (
          <div className={cx(
            "w-full h-full",
            theme === 'dark' ? "bg-gray-800" : "bg-gradient-to-br from-purple-50 to-indigo-50"
          )}></div>
        )}
      </div>
    </div>
  );
};

