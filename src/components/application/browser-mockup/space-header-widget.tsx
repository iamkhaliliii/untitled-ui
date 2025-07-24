import React from 'react';
import { DotsHorizontal, Calendar, Users01, File04, SearchLg, User01 } from "@untitledui/icons";
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

  return (
    <div className={cx(
      "mb-4 rounded-lg overflow-hidden",
      spaceHeaderConfig.style === 'simple' && cx(
        "",
        theme === 'dark' ? "" : ""
      ),
      spaceHeaderConfig.style === 'color' && cx(
        "px-6 py-6",
        theme === 'dark' ? "bg-gradient-to-r from-gray-800 to-gray-700" : "bg-gradient-to-r from-blue-50 to-purple-50"
      ),
      spaceHeaderConfig.style === 'gradient' && "px-6 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white",
      spaceHeaderConfig.style === 'pattern' && cx(
        "px-6 py-6 relative overflow-hidden",
        theme === 'dark' ? "bg-gray-800" : "bg-white"
      ),
      spaceHeaderConfig.style === 'image' && "px-6 py-6 bg-gray-900 text-white relative",
      spaceHeaderConfig.style === 'video' && "px-6 py-6 bg-gray-900 text-white relative",
      className
    )}>
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

      {/* Image Background */}
      {spaceHeaderConfig.style === 'image' && (
        <>
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=400&fit=crop&crop=center&auto=format&q=80" 
              alt="Space Header Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
        </>
      )}

      {/* Video Background */}
      {spaceHeaderConfig.style === 'video' && (
        <>
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-r from-blue-900 to-purple-900"></div>
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
        </>
      )}

      <div className="relative flex items-center justify-between">
        {/* Left side - Title, Description, Avatars */}
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            {/* Icon */}
            {spaceHeaderConfig.showIcon && (
              <div className={cx(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                spaceHeaderConfig.style === 'simple' && "bg-blue-600",
                spaceHeaderConfig.style === 'color' && "bg-blue-600",
                spaceHeaderConfig.style === 'pattern' && "bg-blue-600",
                (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') 
                  && "bg-white/20 backdrop-blur-sm"
              )}>
                <div className="w-6 h-6 rounded bg-white"></div>
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 items-center justify-center">
              <h1 className={cx(
                "text-[0.85rem] font-bold leading-tight",
                (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && (
                  theme === 'dark' ? "text-gray-100" : "text-gray-900"
                ),
                (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white"
              )}>Events & Activities</h1>
              
              {/* Description */}
              {spaceHeaderConfig.showDescription && (
                <p className={cx(
                  "text-[0.7rem] leading-relaxed",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && (
                    theme === 'dark' ? "text-gray-300" : "text-gray-600"
                  ),
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/80"
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

        {/* Right side - Stats and Actions */}
        <div className="flex flex-col items-end gap-2 ml-4">
          {/* Stats */}
          {spaceHeaderConfig.showStats && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User01 className={cx(
                  "w-3 h-3",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "text-gray-400",
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/60"
                )} />
                <span className={cx(
                  "text-xs font-medium",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "text-gray-300",
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/80"
                )}>4</span>
              </div>
              <div className="flex items-center gap-1">
                <File04 className={cx(
                  "w-3 h-3",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "text-gray-400",
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/60"
                )} />
                <span className={cx(
                  "text-xs font-medium",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "text-gray-300",
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/80"
                )}>4</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className={cx(
                  "w-3 h-3",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "text-gray-400",
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/60"
                )} />
                <span className={cx(
                  "text-xs font-medium",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "text-gray-300",
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "text-white/80"
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
                (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "bg-green-600 text-white hover:bg-green-700",
                (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "bg-white text-black hover:bg-white/90"
              )}>
                Add Post
              </button>
            )}

            {/* All Other Actions */}
            {spaceHeaderConfig.showActions && (
              <>
                {/* Join */}
                <button className={cx(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600",
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
                )}>
                  Joined
                </button>

                {/* Search */}
                <button className={cx(
                  "p-1.5 rounded-full transition-colors border",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-700",
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "border-white/20 text-white/80 hover:text-white hover:bg-white/10"
                )}>
                  <SearchLg className="w-3 h-3" />
                </button>

                {/* Options */}
                <button className={cx(
                  "p-1.5 rounded-full transition-colors border",
                  (spaceHeaderConfig.style === 'simple' || spaceHeaderConfig.style === 'color' || spaceHeaderConfig.style === 'pattern') && "border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-700",
                  (spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video') && "border-white/20 text-white/80 hover:text-white hover:bg-white/10"
                )}>
                  <DotsHorizontal className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 