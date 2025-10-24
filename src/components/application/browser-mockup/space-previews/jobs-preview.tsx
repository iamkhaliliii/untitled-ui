import React from "react";
import { FolderCode, Bookmark } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const JobsPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div>
      {renderSpaceHeader(
        'Job Board',
        'Find your next opportunity or post a job opening',
        <FolderCode className="w-7 h-7 text-white" />,
        'bg-cyan-600',
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
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={cx(
                  "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                  i === 1 ? "bg-blue-600"
                  : i === 2 ? "bg-purple-600"
                  : i === 3 ? "bg-emerald-600"
                  : "bg-orange-600"
                )}>
                  <span className="text-2xl font-bold text-white">
                    {i === 1 ? 'T' : i === 2 ? 'D' : i === 3 ? 'S' : 'P'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className={cx("text-lg font-bold mb-1", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>
                    {i === 1 ? 'Senior Frontend Developer' 
                     : i === 2 ? 'Product Designer' 
                     : i === 3 ? 'Full-Stack Engineer'
                     : 'Marketing Manager'}
                  </h3>
                  <p className={cx("text-sm", theme === 'dark' ? "text-zinc-400" : "text-zinc-600")}>
                    {i === 1 ? 'TechCorp' : i === 2 ? 'Design Studio' : i === 3 ? 'StartupXYZ' : 'Growth Co'} • Remote • Full-time
                  </p>
                </div>
              </div>
              <Bookmark className={cx("h-5 w-5 cursor-pointer", theme === 'dark' ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")} />
            </div>
            
            <p className={cx("text-sm mb-4 line-clamp-2", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>
              {i === 1 
                ? "We're looking for an experienced frontend developer to join our growing team. You'll work on building scalable web applications using React and TypeScript."
                : i === 2 
                ? "Join our design team to create beautiful, user-friendly interfaces. You'll collaborate with product managers and engineers to deliver exceptional experiences."
                : i === 3
                ? "Seeking a versatile full-stack engineer to build features across our entire stack. Experience with Node.js, React, and databases required."
                : "Lead our marketing initiatives and drive growth. You'll develop strategies, manage campaigns, and analyze performance metrics."
              }
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {i === 1 && (
                <>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>React</span>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>TypeScript</span>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>CSS</span>
                </>
              )}
              {i === 2 && (
                <>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Figma</span>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>UI/UX</span>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Prototyping</span>
                </>
              )}
              {i === 3 && (
                <>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Node.js</span>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>MongoDB</span>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>AWS</span>
                </>
              )}
              {i === 4 && (
                <>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>SEO</span>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Analytics</span>
                  <span className={cx("px-2 py-0.5 text-xs font-medium rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>Growth</span>
                </>
              )}
            </div>
            
            <div className={cx(
              "pt-4 border-t flex items-center justify-between",
              theme === 'dark' ? "border-zinc-800" : "border-zinc-200"
            )}>
              <div className="flex items-center gap-4">
                <span className={cx(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold",
                  theme === 'dark' ? "bg-cyan-900/30 text-cyan-300" : "bg-cyan-100 text-cyan-700"
                )}>
                  ${Math.floor(Math.random() * 50 + 80)}k - ${Math.floor(Math.random() * 50 + 120)}k
                </span>
                <span className={cx("text-xs", theme === 'dark' ? "text-gray-500" : "text-gray-400")}>
                  Posted {i} days ago
                </span>
              </div>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Apply Now →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

