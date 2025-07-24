import React from 'react';
import { DotsHorizontal, Calendar, Users01, File04, SearchLg, User01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface SpaceHeaderWidgetProps {
  className?: string;
}

export const SpaceHeaderWidget: React.FC<SpaceHeaderWidgetProps> = ({ className }) => {
  const { spaceHeaderConfig } = useWidgetConfig();

  return (
    <div className={cx(
      "mb-4 rounded-lg overflow-hidden",
      spaceHeaderConfig.style === 'simple' && "",
      spaceHeaderConfig.style === 'color' && "px-4 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50",
      spaceHeaderConfig.style === 'gradient' && "px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white",
      spaceHeaderConfig.style === 'pattern' && "px-4 py-2.5 bg-white relative overflow-hidden",
      spaceHeaderConfig.style === 'image' && "px-4 py-2.5 bg-gray-900 text-white relative",
      spaceHeaderConfig.style === 'video' && "px-4 py-2.5 bg-gray-900 text-white relative",
      className
    )}>
      {/* Pattern Background */}
      {spaceHeaderConfig.style === 'pattern' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
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
                spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                  ? "bg-white/20 backdrop-blur-sm" 
                 : "bg-blue-600"
              )}>
                <div className={cx(
                  "w-6 h-6 rounded",
                  spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                    ? "bg-white" 
                    : "bg-white"
                )}></div>
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 items-center justify-center gap-1">
              <h1 className={cx(
                "text-lg font-bold leading-tight",
                spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                  ? "text-white" 
                  : "text-gray-900"
              )}>Events & Activities</h1>
              
              {/* Description */}
              {spaceHeaderConfig.showDescription && (
                <p className={cx(
                  "text-sm leading-relaxed",
                  spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                    ? "text-white/80" 
                    : "text-gray-600"
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
                <User01 className="w-3 h-3 text-gray-400" />
                <span className={cx(
                  "text-xs font-medium",
                  spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                    ? "text-white/80" 
                    : "text-gray-600"
                )}>4</span>
              </div>
              <div className="flex items-center gap-1">
                <File04 className="w-3 h-3 text-gray-400" />
                <span className={cx(
                  "text-xs font-medium",
                  spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                    ? "text-white/80" 
                    : "text-gray-600"
                )}>4</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className={cx(
                  "text-xs font-medium",
                  spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                    ? "text-white/80" 
                    : "text-gray-600"
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
                spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                  ? "bg-white text-black hover:bg-white/90" 
                  : "bg-green-600 text-white hover:bg-green-700"
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
                  spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                    ? "bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                )}>
                  Joined
                </button>

                {/* Search */}
                <button className={cx(
                  "p-1.5 rounded-full transition-colors border border-gray-300",
                  spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                    ? "text-white/80 hover:text-white hover:bg-white/10" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}>
                  <SearchLg className="w-3 h-3" />
                </button>

                {/* Options */}
                <button className={cx(
                  "p-1.5 rounded-full transition-colors border border-gray-300",
                  spaceHeaderConfig.style === 'gradient' || spaceHeaderConfig.style === 'image' || spaceHeaderConfig.style === 'video' 
                    ? "text-white/80 hover:text-white hover:bg-white/10" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
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