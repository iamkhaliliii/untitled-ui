import React from "react";
import { HelpCircle, DotsHorizontal, MessageCircle01, Eye } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const QuestionsPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div>
      {renderSpaceHeader(
        'Q&A Forum',
        'Ask questions and get answers from the community',
        <HelpCircle className="w-7 h-7 text-white" />,
        'bg-green-600',
        theme
      )}
      <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className={cx(
            "w-full cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-shadow",
            theme === 'dark' ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-zinc-200"
          )}
          style={{ 
            animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`
          }}
        >
          <div className={cx("divide-y", theme === 'dark' ? "divide-zinc-800" : "divide-zinc-200")}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1500648767791' : i === 2 ? '1519345182560' : i === 3 ? '1544005313' : '1535713875002'}-00dcc994a43e?w=150&h=150&fit=crop&crop=face`}
                    alt="Author" 
                    className={cx("w-12 h-12 rounded-full ring-2", theme === 'dark' ? "ring-zinc-800" : "ring-white")}
                    onError={(e) => {
                      const names = ['David', 'James', 'Chris', 'Ryan'];
                      e.currentTarget.outerHTML = `<div class="w-12 h-12 rounded-full ring-2 ${theme === 'dark' ? 'ring-zinc-800 bg-green-600' : 'ring-white bg-green-600'} flex items-center justify-center text-white font-semibold text-lg">${names[i-1].charAt(0)}</div>`;
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className={cx("text-base font-semibold", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>
                        {i === 1 ? 'David Smith' : i === 2 ? 'James Brown' : i === 3 ? 'Chris Evans' : 'Ryan Cooper'}
                      </h3>
                      <div className={cx(
                        "inline-flex items-center rounded-full border transition-colors text-xs px-2 py-0.5 font-normal",
                        theme === 'dark' ? "bg-zinc-800 text-zinc-300 border-transparent" : "bg-zinc-100 text-zinc-600 border-transparent"
                      )}>
                        <span className="mr-0.5">💭</span>Curious
                      </div>
                    </div>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-400" : "text-zinc-500")}>
                      {i}h ago<span> • asked in Q&A</span>
                    </p>
                  </div>
                </div>
                <button type="button" className={cx("p-2 rounded-full transition-colors", theme === 'dark' ? "hover:bg-zinc-800" : "hover:bg-zinc-100")}>
                  <DotsHorizontal className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              
              <h3 className={cx("text-lg font-bold mb-3", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>
                {i === 1 ? 'How to get started with React hooks?' 
                 : i === 2 ? 'What are the best practices for API design?' 
                 : i === 3 ? 'How to optimize database queries?'
                 : 'What tools do you recommend for team collaboration?'}
              </h3>
              
              <p className={cx("text-sm mb-4 line-clamp-2", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>
                {i === 1 
                  ? "I'm new to React and trying to understand hooks. What's the best way to learn useState and useEffect? Any recommended resources?"
                  : i === 2 
                  ? "Building a RESTful API and want to follow industry standards. What conventions should I follow for endpoints, versioning, and error handling?"
                  : i === 3
                  ? "My application is getting slow with large datasets. What are the most effective ways to optimize database performance?"
                  : "Our team is growing and we need better collaboration tools. What do you use for project management, communication, and code reviews?"
                }
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {i === 1 && (
                  <>
                    <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>React</span>
                    <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Hooks</span>
                  </>
                )}
                {i === 2 && (
                  <>
                    <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>API Design</span>
                    <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>REST</span>
                  </>
                )}
                {i === 3 && (
                  <>
                    <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Database</span>
                    <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Performance</span>
                  </>
                )}
                {i === 4 && (
                  <>
                    <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Collaboration</span>
                    <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Tools</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={cx(
                    "px-2.5 py-1 rounded-full text-xs font-semibold",
                    i === 1 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                  )}>
                    {i === 1 ? '✓ Answered' : '● Open'}
                  </span>
                  <div className={cx("flex items-center gap-1 text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                    <MessageCircle01 className="h-3.5 w-3.5" />
                    <span>{Math.floor(Math.random() * 15 + 3)} answers</span>
                  </div>
                  <div className={cx("flex items-center gap-1 text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                    <Eye className="h-3.5 w-3.5" />
                    <span>{Math.floor(Math.random() * 300 + 50)} views</span>
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
