import React from 'react';
import { DotsHorizontal, Calendar, Users01, File04, SearchLg, User01, Image01, PlayCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface SpaceHeaderWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const SpaceHeaderWidget: React.FC<SpaceHeaderWidgetProps> = ({ className, theme: propTheme }) => {
  const { spaceHeaderConfig } = useWidgetConfig();
  const theme = useResolvedTheme(propTheme);

  // Calculate contrast and determine text color
  const getTextColor = (hexColor: string): 'white' | 'black' => {
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

  // Get contrasting colors for UI elements
  const getContrastColors = (hexColor: string) => {
    const isDark = getTextColor(hexColor) === 'white';
    
    return {
      text: isDark ? 'text-white' : 'text-black',
      textSecondary: isDark ? 'text-white/80' : 'text-black/80',
      icon: isDark ? 'text-white/60' : 'text-black/60',
      iconBg: isDark ? 'bg-white/20' : 'bg-black/10',
      buttonPrimary: isDark 
        ? 'bg-white text-gray-900 hover:bg-white/90' 
        : 'bg-gray-900 text-white hover:bg-gray-800',
      buttonSecondary: isDark
        ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
        : 'bg-black/10 text-black border-black/20 hover:bg-black/20',
      iconButton: isDark
        ? 'border-white/20 text-white/80 hover:text-white hover:bg-white/10'
        : 'border-black/20 text-black/60 hover:text-black hover:bg-black/10',
    };
  };

  const textColor = spaceHeaderConfig.style === 'color' 
    ? getTextColor(spaceHeaderConfig.backgroundColor) 
    : null;
  
  const contrastColors = spaceHeaderConfig.style === 'color'
    ? getContrastColors(spaceHeaderConfig.backgroundColor)
    : null;

  // Check if we should use simple header layout (media above, text below)
  const isSimpleHeader = spaceHeaderConfig.headerStyle === 'simple' && 
    (spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video');

  return (
    <div 
      className={cx(
        "mb-4 rounded-lg overflow-hidden",
        isSimpleHeader && cx(
          "flex flex-col border",
          theme === 'dark' ? "border-gray-700" : "border-gray-200"
        ),
        spaceHeaderConfig.style === 'simple' && cx(
          "",
          theme === 'dark' ? "" : ""
        ),
        spaceHeaderConfig.style === 'color' && !isSimpleHeader && "px-6 py-6 text-white relative",
        spaceHeaderConfig.style === 'gradient' && "px-6 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white",
        spaceHeaderConfig.style === 'pattern' && cx(
          "px-6 py-6 relative overflow-hidden",
          theme === 'dark' ? "bg-gray-800" : "bg-white"
        ),
        spaceHeaderConfig.style === 'image' && !isSimpleHeader && "px-6 py-6 bg-gray-900 text-white relative",
        spaceHeaderConfig.style === 'video' && !isSimpleHeader && "px-6 py-6 bg-gray-900 text-white relative",
        className
      )}
      style={spaceHeaderConfig.style === 'color' && !isSimpleHeader ? { backgroundColor: spaceHeaderConfig.backgroundColor } : undefined}
    >
      {/* Pattern Background */}
      {spaceHeaderConfig.style === 'pattern' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: theme === 'dark' 
              ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`
              : `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      )}

      {/* Image Background - Modern Header Only */}
      {spaceHeaderConfig.style === 'image' && !isSimpleHeader && (
        <>
          <div className="absolute inset-0">
            {spaceHeaderConfig.imageUrl ? (
              <img 
                src={spaceHeaderConfig.imageUrl} 
                alt="Space Header Background" 
                className="w-full h-full object-cover"
              />
            ) : (
              // Pattern placeholder when no image
              <div className={cx(
                "w-full h-full relative",
                theme === 'dark' ? "bg-gray-800" : "bg-gray-100"
              )}>
                {/* Repeating pattern */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}
                />
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/40"></div>
        </>
      )}

      {/* Video Background - Modern Header Only */}
      {spaceHeaderConfig.style === 'video' && !isSimpleHeader && (
        <>
          <div className="absolute inset-0">
            {spaceHeaderConfig.videoUrl ? (
              <video 
                src={spaceHeaderConfig.videoUrl} 
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              // Pattern placeholder when no video
              <div className={cx(
                "w-full h-full relative",
                theme === 'dark' ? "bg-gray-800" : "bg-gray-100"
              )}>
                {/* Repeating pattern */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}
                />
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/40"></div>
        </>
      )}

      {/* Simple Header: Media section (full width) */}
      {isSimpleHeader && (
        <div 
          className="relative overflow-visible"
          style={{
            ...(spaceHeaderConfig.style === 'color' ? { backgroundColor: spaceHeaderConfig.backgroundColor } : {}),
            minHeight: '140px'
          }}
        >
          {/* Image */}
          {spaceHeaderConfig.style === 'image' && (
            <>
              {spaceHeaderConfig.imageUrl ? (
                <img 
                  src={spaceHeaderConfig.imageUrl} 
                  alt="Header Background" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                // Pattern placeholder
                <div className={cx(
                  "absolute inset-0",
                  theme === 'dark' ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '60px 60px'
                    }}
                  />
                </div>
              )}
            </>
          )}
          
          {/* Video */}
          {spaceHeaderConfig.style === 'video' && (
            <>
              {spaceHeaderConfig.videoUrl ? (
                <video 
                  src={spaceHeaderConfig.videoUrl} 
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay loop muted playsInline
                />
              ) : (
                // Pattern placeholder
                <div className={cx(
                  "absolute inset-0",
                  theme === 'dark' ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '60px 60px'
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Simple Header: Icon overlapping, content below in white section */}
      {isSimpleHeader && (
        <>
          {/* White content section with overlapping icon */}
          <div className={cx(
            "relative -mt-10 pl-6 pr-4 py-4",
            theme === 'dark' ? "bg-gray-900" : "bg-white"
          )}>
            <div className="flex justify-between gap-6">
              {/* Left Column: Icon + Title + Description + Stats */}
              <div className="flex items-start gap-4 flex-1">
                {/* Icon overlapping from media */}
                {spaceHeaderConfig.showIcon && (
                  <div className={cx(
                    "w-20 h-20 rounded-2xl border-4 flex items-center justify-center text-5xl flex-shrink-0 shadow-lg -mt-10",
                    theme === 'dark' ? "bg-gray-900 border-gray-900" : "bg-white border-white"
                  )}>
                    {spaceHeaderConfig.iconEmoji || '📅'}
                  </div>
                )}
                
                {/* Title & Description */}
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-primary mb-1">
                    Events & Activities
                  </h1>
                  {spaceHeaderConfig.showDescription && (
                    <p className="text-sm text-tertiary">
                      {spaceHeaderConfig.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column: Stats + Members + Buttons */}
              <div className="flex flex-col items-end gap-2">
                {/* Stats + Members */}
                <div className="flex items-center gap-3">
                  {/* Stats */}
                  {spaceHeaderConfig.showStats && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User01 className="w-3 h-3 text-tertiary" />
                        <span className="text-xs text-tertiary">0</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <File04 className="w-3 h-3 text-tertiary" />
                        <span className="text-xs text-tertiary">0</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Members */}
                  {spaceHeaderConfig.showMembers && (
                    <div className="flex items-center -space-x-1">
                      <img className="w-7 h-7 rounded-full border-2 border-white shadow-sm" src="https://images.unsplash.com/photo-1494790108755-2616c96f40ce?w=150&h=150&fit=crop&crop=face" alt="Member" />
                      <img className="w-7 h-7 rounded-full border-2 border-white shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Member" />
                      <img className="w-7 h-7 rounded-full border-2 border-white shadow-sm" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face" alt="Member" />
                      <div className={cx(
                        "w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium shadow-sm",
                        theme === 'dark' ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-700"
                      )}>+3</div>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-1.5">
                  {spaceHeaderConfig.actionAddPost && (
                    <button className={cx(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      theme === 'dark' ? "bg-brand-solid text-white hover:bg-brand-solid_hover" : "bg-brand-solid text-white hover:bg-brand-solid_hover"
                    )}>
                      Add Post
                    </button>
                  )}
                  {spaceHeaderConfig.showActions && (
                    <>
                      <button className={cx(
                        "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                        theme === 'dark' 
                          ? "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700" 
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                      )}>
                        Joined
                      </button>
                      <button className={cx(
                        "p-1.5 rounded-full border transition-colors",
                        theme === 'dark'
                          ? "border-gray-700 text-gray-400 hover:bg-gray-800"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      )}>
                        <SearchLg className="w-3 h-3" />
                      </button>
                      <button className={cx(
                        "p-1.5 rounded-full border transition-colors",
                        theme === 'dark'
                          ? "border-gray-700 text-gray-400 hover:bg-gray-800"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      )}>
                        <DotsHorizontal className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Section - Modern Header Only */}
      {!isSimpleHeader && (
        <div className="relative flex items-center justify-between">
          {/* Left side - Title, Description, Avatars */}
          <div className="flex-1">
            <div className="flex items-center gap-2.5">
            {/* Icon */}
            {spaceHeaderConfig.showIcon && (
              <div className={cx(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl",
                spaceHeaderConfig.style === 'simple' && "bg-blue-600",
                spaceHeaderConfig.style === 'color' && contrastColors?.iconBg,
                spaceHeaderConfig.style === 'pattern' && "bg-blue-600",
                (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') 
                  && "bg-white/20 backdrop-blur-sm"
              )}>
                {spaceHeaderConfig.iconEmoji || '📅'}
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 items-center justify-center">
              <h1 className={cx(
                "text-[0.85rem] font-bold leading-tight",
                spaceHeaderConfig.style === 'simple' && (theme === 'dark' ? "text-gray-100" : "text-gray-900"),
                spaceHeaderConfig.style === 'color' && !isSimpleHeader && contrastColors?.text,
                spaceHeaderConfig.style === 'color' && isSimpleHeader && "text-primary",
                spaceHeaderConfig.style === 'pattern' && (theme === 'dark' ? "text-gray-100" : "text-gray-900"),
                (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && !isSimpleHeader && "text-white",
                (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && isSimpleHeader && "text-primary",
                spaceHeaderConfig.style === 'gradient' && "text-white"
              )}>Events & Activities</h1>
              
              {/* Description */}
              {spaceHeaderConfig.showDescription && (
                <p className={cx(
                  "text-[0.7rem] leading-relaxed",
                  spaceHeaderConfig.style === 'simple' && (theme === 'dark' ? "text-gray-300" : "text-gray-600"),
                  spaceHeaderConfig.style === 'color' && !isSimpleHeader && contrastColors?.textSecondary,
                  spaceHeaderConfig.style === 'color' && isSimpleHeader && "text-tertiary",
                  spaceHeaderConfig.style === 'pattern' && (theme === 'dark' ? "text-gray-300" : "text-gray-600"),
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && !isSimpleHeader && "text-white/90",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && isSimpleHeader && "text-tertiary",
                  spaceHeaderConfig.style === 'gradient' && "text-white/80"
                )}>{spaceHeaderConfig.description}</p>
              )}
              
              {/* Members Avatar Group */}
              {spaceHeaderConfig.showMembers && (
                <div className="flex items-center gap-0.5">
                  <div className="flex items-center -space-x-0.5">
                    <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1494790108755-2616c96f40ce?w=150&h=150&fit=crop&crop=face" alt="Member" />
                    <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Member" />
                    <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face" alt="Member" />
                    <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Member" />
                    <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" alt="Member" />
                    <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" alt="Member" />
                    <div className="w-5 h-5 rounded-full bg-gray-800 border border-white flex items-center justify-center">
                      <span className="text-xs font-medium text-white">+5</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Stats and Actions (Modern Header Only) */}
        {!isSimpleHeader && (
          <div className="flex flex-col items-end gap-2 ml-4">
          {/* Stats */}
          {spaceHeaderConfig.showStats && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User01 className={cx(
                  "w-3 h-3",
                  spaceHeaderConfig.style === 'simple' && "text-gray-400",
                  spaceHeaderConfig.style === 'color' && contrastColors?.icon,
                  spaceHeaderConfig.style === 'pattern' && "text-gray-400",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/70",
                  spaceHeaderConfig.style === 'gradient' && "text-white/60"
                )} />
                <span className={cx(
                  "text-xs font-medium",
                  spaceHeaderConfig.style === 'simple' && "text-gray-300",
                  spaceHeaderConfig.style === 'color' && contrastColors?.textSecondary,
                  spaceHeaderConfig.style === 'pattern' && "text-gray-300",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/90",
                  spaceHeaderConfig.style === 'gradient' && "text-white/80"
                )}>4</span>
              </div>
              <div className="flex items-center gap-1">
                <File04 className={cx(
                  "w-3 h-3",
                  spaceHeaderConfig.style === 'simple' && "text-gray-400",
                  spaceHeaderConfig.style === 'color' && contrastColors?.icon,
                  spaceHeaderConfig.style === 'pattern' && "text-gray-400",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/70",
                  spaceHeaderConfig.style === 'gradient' && "text-white/60"
                )} />
                <span className={cx(
                  "text-xs font-medium",
                  spaceHeaderConfig.style === 'simple' && "text-gray-300",
                  spaceHeaderConfig.style === 'color' && contrastColors?.textSecondary,
                  spaceHeaderConfig.style === 'pattern' && "text-gray-300",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/90",
                  spaceHeaderConfig.style === 'gradient' && "text-white/80"
                )}>4</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className={cx(
                  "w-3 h-3",
                  spaceHeaderConfig.style === 'simple' && "text-gray-400",
                  spaceHeaderConfig.style === 'color' && contrastColors?.icon,
                  spaceHeaderConfig.style === 'pattern' && "text-gray-400",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/70",
                  spaceHeaderConfig.style === 'gradient' && "text-white/60"
                )} />
                <span className={cx(
                  "text-xs font-medium",
                  spaceHeaderConfig.style === 'simple' && "text-gray-300",
                  spaceHeaderConfig.style === 'color' && contrastColors?.textSecondary,
                  spaceHeaderConfig.style === 'pattern' && "text-gray-300",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/90",
                  spaceHeaderConfig.style === 'gradient' && "text-white/80"
                )}>created 3 days ago</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Add Post */}
            {spaceHeaderConfig.actionAddPost && (
              <button className={cx(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                spaceHeaderConfig.style === 'simple' && "bg-green-600 text-white hover:bg-green-700",
                spaceHeaderConfig.style === 'color' && contrastColors?.buttonPrimary,
                spaceHeaderConfig.style === 'pattern' && "bg-green-600 text-white hover:bg-green-700",
                (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "bg-white text-gray-900 hover:bg-white/90",
                spaceHeaderConfig.style === 'gradient' && "bg-white text-black hover:bg-white/90"
              )}>
                Add Post
              </button>
            )}

            {/* All Other Actions */}
            {spaceHeaderConfig.showActions && (
              <>
                {/* Join */}
                <button className={cx(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border backdrop-blur-sm",
                  spaceHeaderConfig.style === 'simple' && "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600",
                  spaceHeaderConfig.style === 'color' && contrastColors?.buttonSecondary,
                  spaceHeaderConfig.style === 'pattern' && "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "bg-white/15 text-white border-white/30 hover:bg-white/25",
                  spaceHeaderConfig.style === 'gradient' && "bg-white/10 text-white border-white/20 hover:bg-white/20"
                )}>
                  Joined
                </button>

                {/* Search */}
                <button className={cx(
                  "p-1.5 rounded-full transition-colors border",
                  spaceHeaderConfig.style === 'simple' && "border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-700",
                  spaceHeaderConfig.style === 'color' && contrastColors?.iconButton,
                  spaceHeaderConfig.style === 'pattern' && "border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-700",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "border-white/30 text-white/90 hover:text-white hover:bg-white/15",
                  spaceHeaderConfig.style === 'gradient' && "border-white/20 text-white/80 hover:text-white hover:bg-white/10"
                )}>
                  <SearchLg className="w-3 h-3" />
                </button>

                {/* Options */}
                <button className={cx(
                  "p-1.5 rounded-full transition-colors border",
                  spaceHeaderConfig.style === 'simple' && "border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-700",
                  spaceHeaderConfig.style === 'color' && contrastColors?.iconButton,
                  spaceHeaderConfig.style === 'pattern' && "border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-700",
                  (spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "border-white/30 text-white/90 hover:text-white hover:bg-white/15",
                  spaceHeaderConfig.style === 'gradient' && "border-white/20 text-white/80 hover:text-white hover:bg-white/10"
                )}>
                  <DotsHorizontal className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
          </div>
        )}
        </div>
      )}
    </div>
  );
}; 