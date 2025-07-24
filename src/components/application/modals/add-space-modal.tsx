import React from "react";
import { X, ChevronRight, Briefcase01, Calendar, HelpCircle, Star01, BookOpen01, Edit03, MessageSquare01, LayoutAlt01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface ContentType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  hoverFrom: string;
  hoverTo: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  chevronBg: string;
  chevronColor: string;
  // Dark mode properties
  darkGradientFrom: string;
  darkGradientTo: string;
  darkHoverFrom: string;
  darkHoverTo: string;
  darkBorderColor: string;
  darkIconBg: string;
  darkIconColor: string;
  darkChevronBg: string;
  darkChevronColor: string;
}

const contentTypes: ContentType[] = [
  {
    id: "job-board",
    title: "Job Board",
    description: "Post and find job opportunities within the community.",
    icon: Briefcase01,
    color: "teal",
    gradientFrom: "from-teal-50/70",
    gradientTo: "to-teal-100/20",
    hoverFrom: "hover:from-teal-50/95",
    hoverTo: "hover:to-teal-100/60",
    borderColor: "border-teal-200/40",
    iconBg: "bg-cyan-100/50",
    iconColor: "text-cyan-500/70",
    chevronBg: "bg-teal-200/80",
    chevronColor: "text-teal-600",
    // Dark mode
    darkGradientFrom: "dark:from-teal-900/20",
    darkGradientTo: "dark:to-teal-800/5",
    darkHoverFrom: "dark:hover:from-teal-900/45",
    darkHoverTo: "dark:hover:to-teal-800/30",
    darkBorderColor: "dark:border-teal-800/30",
    darkIconBg: "dark:bg-cyan-900/20",
    darkIconColor: "dark:text-cyan-400/50",
    darkChevronBg: "dark:bg-teal-800/40",
    darkChevronColor: "dark:text-teal-400"
  },
  {
    id: "events",
    title: "Events",
    description: "Discover and RSVP to upcoming community events.",
    icon: Calendar,
    color: "emerald",
    gradientFrom: "from-emerald-50/60",
    gradientTo: "to-emerald-100/10",
    hoverFrom: "hover:from-emerald-50/95",
    hoverTo: "hover:to-emerald-100/50",
    borderColor: "border-emerald-200/30",
    iconBg: "bg-emerald-100/50",
    iconColor: "text-emerald-500/70",
    chevronBg: "bg-emerald-100/60",
    chevronColor: "text-emerald-600",
    // Dark mode
    darkGradientFrom: "dark:from-emerald-900/15",
    darkGradientTo: "dark:to-emerald-800/5",
    darkHoverFrom: "dark:hover:from-emerald-900/40",
    darkHoverTo: "dark:hover:to-emerald-800/25",
    darkBorderColor: "dark:border-emerald-800/20",
    darkIconBg: "dark:bg-emerald-900/20",
    darkIconColor: "dark:text-emerald-400/50",
    darkChevronBg: "dark:bg-emerald-800/30",
    darkChevronColor: "dark:text-emerald-400"
  },
  {
    id: "qa",
    title: "Q&A",
    description: "Ask questions and get answers from the community.",
    icon: HelpCircle,
    color: "violet",
    gradientFrom: "from-violet-50/60",
    gradientTo: "to-violet-100/10",
    hoverFrom: "hover:from-violet-50/95",
    hoverTo: "hover:to-violet-100/50",
    borderColor: "border-violet-200/30",
    iconBg: "bg-violet-100/50",
    iconColor: "text-violet-500/70",
    chevronBg: "bg-violet-100/60",
    chevronColor: "text-violet-600",
    // Dark mode
    darkGradientFrom: "dark:from-violet-900/15",
    darkGradientTo: "dark:to-violet-800/5",
    darkHoverFrom: "dark:hover:from-violet-900/40",
    darkHoverTo: "dark:hover:to-violet-800/25",
    darkBorderColor: "dark:border-violet-800/20",
    darkIconBg: "dark:bg-violet-900/20",
    darkIconColor: "dark:text-violet-400/50",
    darkChevronBg: "dark:bg-violet-800/30",
    darkChevronColor: "dark:text-violet-400"
  },
  {
    id: "ideas",
    title: "Ideas & Wishlist",
    description: "Share ideas and vote on features for the community or product.",
    icon: Star01,
    color: "amber",
    gradientFrom: "from-amber-50/60",
    gradientTo: "to-amber-100/10",
    hoverFrom: "hover:from-amber-50/95",
    hoverTo: "hover:to-amber-100/50",
    borderColor: "border-amber-200/30",
    iconBg: "bg-amber-100/50",
    iconColor: "text-amber-500/70",
    chevronBg: "bg-amber-100/60",
    chevronColor: "text-amber-600",
    // Dark mode
    darkGradientFrom: "dark:from-amber-900/15",
    darkGradientTo: "dark:to-amber-800/5",
    darkHoverFrom: "dark:hover:from-amber-900/40",
    darkHoverTo: "dark:hover:to-amber-800/25",
    darkBorderColor: "dark:border-amber-800/20",
    darkIconBg: "dark:bg-amber-900/20",
    darkIconColor: "dark:text-amber-400/50",
    darkChevronBg: "dark:bg-amber-800/30",
    darkChevronColor: "dark:text-amber-400"
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    description: "Find helpful articles and documentation.",
    icon: BookOpen01,
    color: "sky",
    gradientFrom: "from-sky-50/70",
    gradientTo: "to-sky-100/20",
    hoverFrom: "hover:from-sky-50/95",
    hoverTo: "hover:to-sky-100/60",
    borderColor: "border-sky-200/40",
    iconBg: "bg-rose-100/50",
    iconColor: "text-rose-500/70",
    chevronBg: "bg-sky-200/80",
    chevronColor: "text-sky-600",
    // Dark mode
    darkGradientFrom: "dark:from-sky-900/20",
    darkGradientTo: "dark:to-sky-800/5",
    darkHoverFrom: "dark:hover:from-sky-900/45",
    darkHoverTo: "dark:hover:to-sky-800/30",
    darkBorderColor: "dark:border-sky-800/30",
    darkIconBg: "dark:bg-rose-900/20",
    darkIconColor: "dark:text-rose-400/50",
    darkChevronBg: "dark:bg-sky-800/40",
    darkChevronColor: "dark:text-sky-400"
  },
  {
    id: "blog",
    title: "Blog",
    description: "Read and publish articles and blog posts.",
    icon: Edit03,
    color: "purple",
    gradientFrom: "from-purple-50/60",
    gradientTo: "to-purple-100/10",
    hoverFrom: "hover:from-purple-50/95",
    hoverTo: "hover:to-purple-100/50",
    borderColor: "border-purple-200/30",
    iconBg: "bg-purple-100/50",
    iconColor: "text-purple-500/70",
    chevronBg: "bg-purple-100/60",
    chevronColor: "text-purple-600",
    // Dark mode
    darkGradientFrom: "dark:from-purple-900/15",
    darkGradientTo: "dark:to-purple-800/5",
    darkHoverFrom: "dark:hover:from-purple-900/40",
    darkHoverTo: "dark:hover:to-purple-800/25",
    darkBorderColor: "dark:border-purple-800/20",
    darkIconBg: "dark:bg-purple-900/20",
    darkIconColor: "dark:text-purple-400/50",
    darkChevronBg: "dark:bg-purple-800/30",
    darkChevronColor: "dark:text-purple-400"
  },
  {
    id: "discussions",
    title: "Discussions",
    description: "Start or join conversations on various topics.",
    icon: MessageSquare01,
    color: "blue",
    gradientFrom: "from-blue-50/60",
    gradientTo: "to-blue-100/10",
    hoverFrom: "hover:from-blue-50/95",
    hoverTo: "hover:to-blue-100/50",
    borderColor: "border-blue-200/30",
    iconBg: "bg-blue-100/50",
    iconColor: "text-blue-500/70",
    chevronBg: "bg-blue-100/60",
    chevronColor: "text-blue-600",
    // Dark mode
    darkGradientFrom: "dark:from-blue-900/15",
    darkGradientTo: "dark:to-blue-800/5",
    darkHoverFrom: "dark:hover:from-blue-900/40",
    darkHoverTo: "dark:hover:to-blue-800/25",
    darkBorderColor: "dark:border-blue-800/20",
    darkIconBg: "dark:bg-blue-900/20",
    darkIconColor: "dark:text-blue-400/50",
    darkChevronBg: "dark:bg-blue-800/30",
    darkChevronColor: "dark:text-blue-400"
  },
  {
    id: "changelog",
    title: "Changelog",
    description: "Track updates and changes to the product or community.",
    icon: LayoutAlt01,
    color: "indigo",
    gradientFrom: "from-indigo-50/60",
    gradientTo: "to-indigo-100/10",
    hoverFrom: "hover:from-indigo-50/95",
    hoverTo: "hover:to-indigo-100/50",
    borderColor: "border-indigo-200/30",
    iconBg: "bg-indigo-100/50",
    iconColor: "text-indigo-500/70",
    chevronBg: "bg-indigo-100/60",
    chevronColor: "text-indigo-600",
    // Dark mode
    darkGradientFrom: "dark:from-indigo-900/15",
    darkGradientTo: "dark:to-indigo-800/5",
    darkHoverFrom: "dark:hover:from-indigo-900/40",
    darkHoverTo: "dark:hover:to-indigo-800/25",
    darkBorderColor: "dark:border-indigo-800/20",
    darkIconBg: "dark:bg-indigo-900/20",
    darkIconColor: "dark:text-indigo-400/50",
    darkChevronBg: "dark:bg-indigo-800/30",
    darkChevronColor: "dark:text-indigo-400"
  }
];

interface ContentTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (typeId: string) => void;
  title?: string;
  description?: string;
}

export const ContentTypeModal = ({ 
  isOpen, 
  onClose, 
  onSelectType, 
  title = "Choose a content type",
  description = "Select the type of content you want to create for your community."
}: ContentTypeModalProps) => {
  const handleCardClick = (typeId: string) => {
    onSelectType(typeId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex min-h-dvh w-full items-center justify-center overflow-y-auto bg-black/50 px-4 pt-4 pb-[clamp(16px,8vh,64px)] outline-hidden backdrop-blur-[6px] sm:p-8">
      <div className="relative w-full max-w-lg sm:max-w-[90vw] md:max-w-[1100px] p-0 overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-0 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 opacity-70 hover:opacity-100 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2 shadow-sm"
        >
          <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="sr-only">Close</span>
        </button>

        {/* Content */}
        <div className="space-y-6 p-10">
                     {/* Header */}
           <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6">
             <h2 className="tracking-tight text-2xl font-bold text-gray-900 dark:text-white">
               {title}
             </h2>
             <p className="text-sm text-gray-500 dark:text-gray-400">
               {description}
             </p>
           </div>

          {/* Content Type Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto scrollbar-thin">
            {contentTypes.map((contentType) => {
              const IconComponent = contentType.icon;
              
              return (
                <div key={contentType.id} className="opacity-100 transform-none">
                  <div
                    onClick={() => handleCardClick(contentType.id)}
                    className={cx(
                      "bg-gradient-to-br backdrop-blur-sm rounded-xl overflow-hidden border cursor-pointer group h-full flex flex-col transition-all duration-200",
                      contentType.gradientFrom,
                      contentType.gradientTo,
                      contentType.hoverFrom,
                      contentType.hoverTo,
                      contentType.darkGradientFrom,
                      contentType.darkGradientTo,
                      contentType.darkHoverFrom,
                      contentType.darkHoverTo,
                      contentType.borderColor,
                      contentType.darkBorderColor
                    )}
                  >
                    <div className="flex-1 flex flex-col min-h-[248px] relative">
                      {/* Header */}
                      <div className="flex px-5 pt-5 items-center">
                        <h3 className="text-[0.9rem] font-medium text-gray-900 dark:text-gray-100">
                          {contentType.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-[0.75rem] px-5 pb-0 text-gray-600 dark:text-gray-400">
                        {contentType.description}
                      </p>

                      {/* Mockup Preview */}
                      <div className="absolute bottom-0 right-0 w-52 h-40 rounded-t-lg border border-gray-100/70 dark:border-gray-800/30 bg-white/80 dark:bg-gray-900/80 p-3 overflow-hidden flex-1 flex shadow-[0_4px_20px_-4px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.18)]">
                        <div className="w-full">
                          <div className="flex flex-col h-full relative">
                            {/* Icon */}
                            <div className="absolute top-0 left-0">
                              <div className={cx("w-8 h-8 rounded-xl flex items-center justify-center", contentType.iconBg, contentType.darkIconBg)}>
                                <IconComponent className={cx("w-5 h-5", contentType.iconColor, contentType.darkIconColor)} />
                              </div>
                            </div>

                            {/* Mockup Content */}
                            <div className="pt-14 w-full space-y-4">
                              <div className="h-2 w-3/4 bg-gray-200/40 dark:bg-gray-700/20 rounded-full"></div>
                              
                              {/* Different mockup patterns based on content type */}
                              {contentType.id === 'job-board' && (
                                <div className="rounded border border-gray-100/50 dark:border-gray-800/20 p-3 space-y-2">
                                  <div className="flex justify-between items-center">
                                    <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-1/2"></div>
                                    <div className="h-4 w-16 rounded-full bg-gray-100/70 dark:bg-gray-800/20"></div>
                                  </div>
                                  <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-full"></div>
                                  <div className="flex gap-2">
                                    <div className="h-4 w-16 rounded-full bg-gray-100/70 dark:bg-gray-800/20"></div>
                                    <div className="h-4 w-16 rounded-full bg-gray-100/70 dark:bg-gray-800/20"></div>
                                  </div>
                                </div>
                              )}

                              {contentType.id === 'events' && (
                                <>
                                  <div className="grid grid-cols-7 gap-1 w-full">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                      <div key={i} className="aspect-square rounded bg-gray-100/70 dark:bg-gray-800/20"></div>
                                    ))}
                                  </div>
                                  <div className="h-1 w-1/2 mx-auto bg-gray-200/40 dark:bg-gray-700/20 rounded-full"></div>
                                </>
                              )}

                              {contentType.id === 'qa' && (
                                <>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-6 w-6 rounded-full bg-gray-100/70 dark:bg-gray-800/20 flex-shrink-0"></div>
                                    <div className="space-y-1.5 flex-1">
                                      <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-full"></div>
                                      <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-2/3"></div>
                                    </div>
                                  </div>
                                  <div className="pl-8 space-y-2">
                                    <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-5/6"></div>
                                    <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-4/6"></div>
                                  </div>
                                </>
                              )}

                              {contentType.id === 'ideas' && (
                                <div className="space-y-3">
                                  {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <div className="w-4 h-4 rounded-full bg-gray-100/70 dark:bg-gray-800/20 flex-shrink-0"></div>
                                      <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full flex-1"></div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {contentType.id === 'knowledge-base' && (
                                <div className="grid grid-cols-2 gap-2 w-full">
                                  {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-6 rounded bg-gray-100/70 dark:bg-gray-800/20"></div>
                                  ))}
                                </div>
                              )}

                              {contentType.id === 'blog' && (
                                <div className="space-y-3">
                                  <div className="aspect-video w-full rounded bg-gray-100/70 dark:bg-gray-800/20"></div>
                                  <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-full"></div>
                                  <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-2/3"></div>
                                </div>
                              )}

                              {contentType.id === 'discussions' && (
                                <>
                                  <div className="space-y-3">
                                    <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-full"></div>
                                    <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-2/3"></div>
                                  </div>
                                  <div className="h-px w-full bg-gray-100/50 dark:bg-gray-800/20"></div>
                                  <div className="pl-4 space-y-2">
                                    <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-4/5"></div>
                                    <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-3/5"></div>
                                  </div>
                                </>
                              )}

                              {contentType.id === 'changelog' && (
                                <div className="space-y-3">
                                  {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                      <div className={cx("flex-shrink-0 w-2 h-2 rounded-full mt-1.5", `bg-${contentType.color}-200/50`, `dark:bg-${contentType.color}-700/30`)}></div>
                                      <div className="flex-1 space-y-1">
                                        <div className="h-1.5 bg-gray-200/40 dark:bg-gray-700/20 rounded-full w-full"></div>
                                        <div className="h-1 bg-gray-200/30 dark:bg-gray-700/15 rounded-full w-2/3"></div>
                                      </div>
                                      <div className="flex-shrink-0 text-xs">
                                        <div className="w-12 h-3 bg-gray-100/50 dark:bg-gray-800/20 rounded"></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Chevron Icon */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className={cx("p-1.5 rounded-full", contentType.chevronBg, contentType.darkChevronBg)}>
                          <ChevronRight className={cx("h-4 w-4", contentType.chevronColor, contentType.darkChevronColor)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Keep the old name for backward compatibility
export const AddSpaceModal = ContentTypeModal; 