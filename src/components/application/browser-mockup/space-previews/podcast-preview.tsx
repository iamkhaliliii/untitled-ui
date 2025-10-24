import React from "react";
import { Image01, ThumbsUp } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const PodcastPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div className="space-preview-container">
      {renderSpaceHeader(
        'Community Podcast',
        'Listen to engaging conversations and expert insights',
        <Image01 className="w-7 h-7 text-white" />,
        'bg-pink-600',
        theme
      )}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 space-preview-grid">
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className={cx(
            "group relative rounded-xl sm:rounded-2xl border overflow-hidden flex flex-col cursor-pointer transition-all duration-200",
            theme === 'dark' 
              ? "bg-gray-800 border-gray-700 hover:shadow-md hover:border-pink-500/50" 
              : "bg-white border-gray-300 hover:shadow-md hover:border-brand-200"
          )}
          style={{ 
            animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`
          }}
        >
          <div className="relative overflow-hidden aspect-square">
            <div className={cx(
              "w-full h-full bg-gradient-to-br flex items-center justify-center",
              i === 1 ? "from-pink-400 to-purple-500"
              : i === 2 ? "from-rose-400 to-pink-500"
              : i === 3 ? "from-fuchsia-400 to-purple-500"
              : "from-violet-400 to-indigo-500"
            )}>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2">
                  <span className="text-4xl">🎙️</span>
                </div>
                <div className="px-4">
                  <p className="text-white font-bold text-lg">EP {i}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-3 right-3">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-sm">
                {35 + i * 10} min
              </span>
            </div>
          </div>

          <div className="p-2 sm:p-4 flex flex-col flex-1">
            <div className="mb-1.5 sm:mb-2 flex items-center justify-between">
              <span className={cx("text-[10px] sm:text-xs font-semibold", theme === 'dark' ? "text-pink-400" : "text-pink-600")}>
                Episode {i}
              </span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <img 
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1472099645785' : i === 2 ? '1494790108755' : i === 3 ? '1507003211169' : '1438761681033'}-5658abf4ff4e?w=24&h=24&fit=crop&crop=face`}
                  alt="Host" 
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                  onError={(e) => {
                    const names = ['Emily', 'Mike', 'Alex', 'Sarah'];
                    e.currentTarget.outerHTML = `<div class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-pink-600 flex items-center justify-center text-white font-semibold text-[10px]">${names[i-1].charAt(0)}</div>`;
                  }}
                />
                <span className={cx("text-[10px] sm:text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
                  {i === 1 ? 'Emily' : i === 2 ? 'Mike' : i === 3 ? 'Alex' : 'Sarah'}
                </span>
              </div>
            </div>

            <h3 className={cx(
              "text-sm sm:text-base font-bold mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-brand-solid transition-colors",
              theme === 'dark' ? "text-gray-100" : "text-primary"
            )}>
              {i === 1 ? 'Building Thriving Online Communities' 
               : i === 2 ? 'The Future of Remote Work' 
               : i === 3 ? 'Design Thinking & Innovation'
               : 'Scaling Your Startup Successfully'}
            </h3>

            <p className={cx(
              "text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-1",
              theme === 'dark' ? "text-gray-400" : "text-secondary"
            )}>
              {i === 1 
                ? "Discover proven strategies for building engaged communities. Learn from experts about fostering connections and driving growth."
                : i === 2 
                ? "Explore the evolving landscape of remote work and how companies are adapting to distributed teams."
                : i === 3
                ? "Deep dive into design thinking methodology and how it drives innovation in modern organizations."
                : "Essential insights on scaling startups from seed to Series A and beyond. Practical advice from successful founders."
              }
            </p>

            <div className="flex items-center justify-between text-[10px] sm:text-xs">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={cx("flex items-center gap-0.5 sm:gap-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                  <span>▶️</span>
                  <span>{Math.floor(Math.random() * 1000 + 500)} plays</span>
                </div>
                <div className={cx("flex items-center gap-0.5 sm:gap-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                  <ThumbsUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>{Math.floor(Math.random() * 100 + 50)}</span>
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

