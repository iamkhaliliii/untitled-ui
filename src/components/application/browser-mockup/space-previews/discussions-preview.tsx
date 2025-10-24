import React from "react";
import { Users01, DotsHorizontal, MessageCircle01, Share04, Bookmark, ArrowRight, HelpCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const DiscussionsPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div className="space-preview-container">
      {renderSpaceHeader(
        'Community Discussions',
        'Join conversations and share your thoughts',
        <Users01 className="w-7 h-7 text-white" />,
        'bg-purple-600',
        theme
      )}
      <div className="space-y-2 sm:space-y-4 space-preview-grid">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className={cx(
            "w-full cursor-pointer rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow",
            theme === 'dark' ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-zinc-200"
          )}
          style={{ 
            animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`
          }}
        >
          <div className={cx("divide-y", theme === 'dark' ? "divide-zinc-800" : "divide-zinc-200")}>
            <div className="p-2 sm:p-6">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-2 sm:mb-4">
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  <img 
                    src={
                      i === 1 ? 'https://mighty.tools/mockmind-api/content/human/129.jpg'
                      : i === 2 ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                      : i === 3 ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                      : i === 4 ? 'https://images.unsplash.com/photo-1494790108755-2616c9ad0096?w=150&h=150&fit=crop&crop=face'
                      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                    }
                    alt="Author" 
                    className={cx("w-8 h-8 sm:w-12 sm:h-12 rounded-full ring-2 flex-shrink-0", theme === 'dark' ? "ring-zinc-800" : "ring-white")}
                    onError={(e) => {
                      const name = i === 1 ? 'Sarah Chen' 
                         : i === 2 ? 'Michael Johnson' 
                         : i === 3 ? 'Alex Rodriguez'
                         : i === 4 ? 'Emma Wilson'
                         : 'Jordan Kim';
                      e.currentTarget.outerHTML = `<div class="w-8 h-8 sm:w-12 sm:h-12 rounded-full ring-2 ${theme === 'dark' ? 'ring-zinc-800 bg-blue-600' : 'ring-white bg-blue-600'} flex items-center justify-center text-white font-semibold text-sm sm:text-lg">${name.charAt(0)}</div>`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 flex-wrap">
                      <h3 className={cx("text-sm sm:text-base font-semibold truncate", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>
                        {i === 1 ? 'Sarah Chen' 
                         : i === 2 ? 'Michael Johnson' 
                         : i === 3 ? 'Alex Rodriguez'
                         : i === 4 ? 'Emma Wilson'
                         : 'Jordan Kim'}
                      </h3>
                      <div className={cx(
                        "inline-flex items-center rounded-full border transition-colors text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 font-normal flex-shrink-0",
                        theme === 'dark' ? "bg-zinc-800 text-zinc-300 border-transparent" : "bg-zinc-100 text-zinc-600 border-transparent"
                      )}>
                        <span className="mr-0.5">{i === 1 ? '👋' : i === 2 ? '🎤' : i === 3 ? '🎧' : i === 4 ? '🎹' : '⭐'}</span>
                        {i === 1 ? 'New member' : i === 2 ? 'Vocalist' : i === 3 ? 'Expert' : i === 4 ? 'Producer' : 'Admin'}
                      </div>
                      <span className="text-sm sm:text-base">{i <= 2 ? '🥉' : i === 3 ? '🥈' : ''}</span>
                    </div>
                    <p className={cx("text-xs sm:text-sm truncate", theme === 'dark' ? "text-zinc-400" : "text-zinc-500")}>
                      {i === 1 ? '2h' : i === 2 ? '1d' : i === 3 ? '4h' : i === 4 ? '8h' : '5h'} ago<span className="hidden sm:inline"> • posted on {i === 1 ? 'discussion' : i === 2 ? 'tips' : i === 3 ? 'general' : i === 4 ? 'discussion' : 'wishlist'}</span>
                    </p>
                  </div>
                </div>
                <button type="button" className={cx("p-1 sm:p-2 rounded-full transition-colors flex-shrink-0", theme === 'dark' ? "hover:bg-zinc-800" : "hover:bg-zinc-100")}>
                  <DotsHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
                </button>
              </div>
              
              {/* Post Content */}
              <p className={cx("mb-2 sm:mb-4 text-xs sm:text-base line-clamp-3 sm:line-clamp-none", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>
                {i === 1 
                  ? "Just discovered this amazing playlist for coding sessions! The mix of lo-fi and ambient sounds really helps with focus. What do you all use for background music while working? 🎵"
                  : i === 2 
                  ? "Quick tip for all my fellow musicians: Always warm up your voice before recording sessions! Even just 5-10 minutes of vocal exercises can make a huge difference in your performance quality. Your vocal cords are muscles too! 🎵"
                  : i === 3
                  ? "PSA: Remember to take listening breaks every hour! Your ears will thank you later. I've been using the 60/60 rule - 60% volume for max 60 minutes, then a 10-minute break. Game changer for long mixing sessions! 🎧"
                  : i === 4
                  ? "Just finished mastering my latest track! The process took 3 weeks but I'm so happy with how it turned out. Sometimes patience really pays off in music production."
                  : "🎯 Help us shape the future of music! What features would you love to see in our platform? Your ideas matter and directly influence our roadmap. Vote for your favorites below! 🚀"
                }
              </p>
              
              {/* Embedded Content */}
              {i === 1 && (
                <div className="space-y-2 sm:space-y-4 mb-2 sm:mb-4">
                  <div className={cx(
                    "rounded-lg sm:rounded-2xl border p-2 sm:p-4",
                    theme === 'dark' ? "border-zinc-700 bg-zinc-800/30" : "border-zinc-200 bg-zinc-50/30"
                  )}>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className={cx(
                        "w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0",
                        theme === 'dark' ? "bg-zinc-700/50" : "bg-zinc-100"
                      )}>
                        <span className="text-base sm:text-xl">🎵</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className={cx("text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 truncate", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>
                          Focus Flow - Deep Work Playlist
                        </h5>
                        <p className={cx("text-[10px] sm:text-xs leading-relaxed line-clamp-1 sm:line-clamp-none", theme === 'dark' ? "text-zinc-400" : "text-zinc-600")}>
                          3 hours of carefully curated ambient and lo-fi tracks
                        </p>
                      </div>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              )}
              
              {i === 3 && (
                <div className="space-y-2 sm:space-y-4 mb-2 sm:mb-4">
                  <div className={cx("rounded-lg sm:rounded-2xl overflow-hidden", theme === 'dark' ? "bg-zinc-800/50" : "bg-zinc-100")}>
                    <div className={cx("grid grid-cols-3 h-32 sm:h-48 gap-px", theme === 'dark' ? "bg-zinc-700" : "bg-zinc-200")}>
                      <img 
                        src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop" 
                        alt="Studio" 
                        className="w-full h-full object-cover col-span-2"
                      />
                      <div className="grid grid-rows-2 gap-px">
                        <img 
                          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop" 
                          alt="Audio" 
                          className="w-full h-full object-cover"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop" 
                          alt="Speaker" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {i === 4 && (
                <div className="space-y-2 sm:space-y-4 mb-2 sm:mb-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div className={cx(
                      "aspect-video rounded-lg sm:rounded-xl overflow-hidden",
                      theme === 'dark' ? "bg-zinc-800" : "bg-zinc-100"
                    )}>
                      <div className={cx(
                        "w-full h-full flex items-center justify-center bg-gradient-to-br",
                        theme === 'dark' ? "from-zinc-800 to-zinc-900" : "from-blue-50 to-purple-50"
                      )}>
                        <div className="text-center">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                            <span className="text-lg sm:text-2xl">▶️</span>
                          </div>
                          <p className={cx("text-xs sm:text-sm font-medium", theme === 'dark' ? "text-zinc-300" : "text-zinc-700")}>
                            Music Production Tutorial
                          </p>
                          <p className={cx("text-[10px] sm:text-xs mt-0.5 sm:mt-1", theme === 'dark' ? "text-zinc-500" : "text-zinc-500")}>
                            Click to play video
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {i === 5 && (
                <div className="space-y-2 sm:space-y-4 mb-2 sm:mb-4">
                  <div className={cx(
                    "rounded-lg sm:rounded-2xl border overflow-hidden",
                    theme === 'dark' ? "border-zinc-700 bg-zinc-800/30" : "border-zinc-200 bg-zinc-50/30"
                  )}>
                    <div className="p-3 sm:p-5">
                      <div className="flex items-center justify-between mb-2 sm:mb-4">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <div className={cx(
                            "w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg flex items-center justify-center",
                            theme === 'dark' ? "bg-blue-900/30" : "bg-blue-100"
                          )}>
                            <HelpCircle className={cx("w-3 h-3 sm:w-4 sm:h-4", theme === 'dark' ? "text-blue-400" : "text-blue-600")} />
                          </div>
                          <h4 className={cx("text-xs sm:text-sm font-medium", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>Poll</h4>
                        </div>
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 sm:px-2.5 text-[10px] sm:text-xs font-semibold bg-blue-600 text-white">
                          Active
                        </span>
                      </div>
                      <h5 className={cx("text-sm sm:text-base font-medium mb-2 sm:mb-4", theme === 'dark' ? "text-zinc-200" : "text-zinc-800")}>
                        Which feature should we prioritize?
                      </h5>
                      <div className="space-y-1.5 sm:space-y-2">
                        {['AI recommendations', 'Collaboration tools', 'Analytics dashboard'].map((option, idx) => (
                          <button 
                            key={idx} 
                            type="button" 
                            className={cx(
                              "w-full text-left p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 relative overflow-hidden group",
                              theme === 'dark' 
                                ? "border-zinc-700 bg-zinc-800/50 hover:border-blue-600 hover:bg-blue-900/10" 
                                : "border-zinc-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                            )}
                          >
                            <div className="relative flex items-center justify-between">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className={cx(
                                  "w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center transition-all",
                                  theme === 'dark' ? "border-zinc-600" : "border-zinc-300"
                                )}></div>
                                <span className={cx("text-xs sm:text-sm font-medium", theme === 'dark' ? "text-zinc-300" : "text-zinc-700")}>
                                  {option}
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Post Actions */}
              <div className="mt-2 sm:mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button type="button" className={cx(
                      "flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm rounded-full transition-all",
                      theme === 'dark' ? "text-zinc-400 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-100"
                    )}>
                      <span className="text-sm sm:text-base">❤️</span>
                      <span className="text-[0.6rem] sm:text-[0.7rem] font-medium text-zinc-500">{i === 1 ? '42' : '156'}</span>
                    </button>
                    <button type="button" className={cx(
                      "flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm rounded-full transition-colors border",
                      theme === 'dark' 
                        ? "bg-blue-900/30 text-blue-400 border-blue-800" 
                        : "bg-blue-50 text-blue-600 border-blue-200"
                    )}>
                      <MessageCircle01 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-[0.6rem] sm:text-[0.7rem] font-medium">{i === 1 ? '18K' : '28'}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <button type="button" className={cx(
                      "p-1 sm:p-2 rounded-full transition-colors",
                      theme === 'dark' 
                        ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800" 
                        : "text-zinc-500 hover:text-zinc-600 hover:bg-zinc-100"
                    )}>
                      <Share04 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button type="button" className={cx(
                      "p-1 sm:p-2 rounded-full transition-colors",
                      i === 1 
                        ? (theme === 'dark' ? "text-blue-500 bg-blue-500/10" : "text-blue-500 bg-blue-50")
                        : (theme === 'dark' ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-600 hover:bg-zinc-100")
                    )}>
                      <Bookmark className={cx("w-3 h-3 sm:w-4 sm:h-4", i === 1 && "fill-current")} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};
