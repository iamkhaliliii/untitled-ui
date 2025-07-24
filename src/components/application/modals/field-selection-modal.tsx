import React, { useState } from "react";
import { X, ChevronRight, Briefcase01, Calendar, HelpCircle, Star01, BookOpen01, Edit03, MessageSquare01, LayoutAlt01, Check, Users01, Tag01, Clock, User01, Attachment01, Trophy01, Settings01, Target01, ThumbsUp, Award01, SearchLg, Building01, Image01, Grid01, Heart, Lock01, AtSign, File04, CurrencyDollarCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";

const contentTypeConfig = {
  "job-board": {
    title: "Job Board Space",
    icon: Briefcase01,
    color: "teal",
    iconBg: "bg-teal-100/60 dark:bg-teal-900/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    primaryFields: [
      { id: "title", label: "Job Title", icon: Edit03, required: true },
      { id: "company", label: "Company", icon: Building01, required: true },
      { id: "description", label: "Job Description", icon: File04, required: true },
      { id: "location", label: "Location", icon: Grid01, required: true },
      { id: "salary", label: "Salary Range", icon: CurrencyDollarCircle, required: true }
    ],
    optionalFields: [
      { id: "requirements", label: "Requirements", icon: Check },
      { id: "benefits", label: "Benefits", icon: Star01 },
      { id: "remote", label: "Remote Work", icon: Grid01 },
      { id: "experience", label: "Experience Level", icon: Award01 },
      { id: "employment_type", label: "Employment Type", icon: Target01 },
      { id: "categories", label: "Job Categories", icon: Tag01 },
      { id: "tags", label: "Tags", icon: Tag01 },
      { id: "application_deadline", label: "Application Deadline", icon: Clock }
    ]
  },
  "events": {
    title: "Events Space", 
    icon: Calendar,
    color: "emerald",
    iconBg: "bg-emerald-100/60 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    primaryFields: [
      { id: "title", label: "Event Title", icon: Edit03, required: true },
      { id: "description", label: "Event Description", icon: File04, required: true },
      { id: "cover_img", label: "Cover Image", icon: Image01, required: true },
      { id: "host", label: "Host", icon: User01, required: true },
      { id: "date", label: "Event Date", icon: Calendar, required: true },
      { id: "time", label: "Event Time", icon: Clock, required: true },
      { id: "location", label: "Location", icon: Grid01, required: true }
    ],
    optionalFields: [
      { id: "rsvp", label: "RSVP System", icon: Users01 },
      { id: "attachments", label: "File Attachments", icon: Attachment01 },
      { id: "categories", label: "Event Categories", icon: Tag01 },
      { id: "tags", label: "Tags", icon: Tag01 },
      { id: "capacity", label: "Event Capacity", icon: Users01 },
      { id: "registration_fee", label: "Registration Fee", icon: CurrencyDollarCircle },
      { id: "recurring", label: "Recurring Events", icon: Calendar }
    ]
  },
  "qa": {
    title: "Q&A Space",
    icon: HelpCircle,
    color: "violet", 
    iconBg: "bg-violet-100/60 dark:bg-violet-900/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    primaryFields: [
      { id: "question", label: "Question Title", icon: HelpCircle, required: true },
      { id: "description", label: "Question Details", icon: File04, required: true },
      { id: "author", label: "Author", icon: User01, required: true }
    ],
    optionalFields: [
      { id: "voting", label: "Voting System", icon: ThumbsUp },
      { id: "best_answer", label: "Best Answer Selection", icon: Trophy01 },
      { id: "categories", label: "Question Categories", icon: Tag01 },
      { id: "tags", label: "Tags", icon: Tag01 },
      { id: "attachments", label: "File Attachments", icon: Attachment01 },
      { id: "anonymous", label: "Anonymous Questions", icon: User01 },
      { id: "follow", label: "Follow Questions", icon: Heart },
      { id: "bounty", label: "Question Bounty", icon: Award01 }
    ]
  },
  "ideas": {
    title: "Ideas & Wishlist Space",
    icon: Star01,
    color: "amber",
    iconBg: "bg-amber-100/60 dark:bg-amber-900/20", 
    iconColor: "text-amber-600 dark:text-amber-400",
    primaryFields: [
      { id: "title", label: "Idea Title", icon: Star01, required: true },
      { id: "description", label: "Idea Description", icon: File04, required: true },
      { id: "author", label: "Author", icon: User01, required: true }
    ],
    optionalFields: [
      { id: "voting", label: "Voting System", icon: ThumbsUp },
      { id: "status", label: "Idea Status", icon: Target01 },
      { id: "categories", label: "Idea Categories", icon: Tag01 },
      { id: "tags", label: "Tags", icon: Tag01 },
      { id: "priority", label: "Priority Levels", icon: Trophy01 },
      { id: "roadmap", label: "Roadmap Integration", icon: Grid01 },
      { id: "comments", label: "Comments", icon: MessageSquare01 },
      { id: "attachments", label: "File Attachments", icon: Attachment01 }
    ]
  },
  "knowledge-base": {
    title: "Knowledge Base Space",
    icon: BookOpen01,
    color: "sky",
    iconBg: "bg-sky-100/60 dark:bg-sky-900/20",
    iconColor: "text-sky-600 dark:text-sky-400",
    primaryFields: [
      { id: "title", label: "Article Title", icon: BookOpen01, required: true },
      { id: "content", label: "Article Content", icon: File04, required: true },
      { id: "author", label: "Author", icon: User01, required: true }
    ],
    optionalFields: [
      { id: "categories", label: "Article Categories", icon: Tag01 },
      { id: "tags", label: "Tags", icon: Tag01 },
      { id: "attachments", label: "File Attachments", icon: Attachment01 },
      { id: "related_articles", label: "Related Articles", icon: BookOpen01 },
      { id: "rating", label: "Article Rating", icon: Star01 },
      { id: "comments", label: "Comments", icon: MessageSquare01 },
      { id: "table_of_contents", label: "Table of Contents", icon: Grid01 },
      { id: "search_keywords", label: "Search Keywords", icon: SearchLg }
    ]
  },
  "blog": {
    title: "Blog Space",
    icon: Edit03,
    color: "purple",
    iconBg: "bg-purple-100/60 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    primaryFields: [
      { id: "title", label: "Post Title", icon: Edit03, required: true },
      { id: "content", label: "Post Content", icon: File04, required: true },
      { id: "author", label: "Author", icon: User01, required: true },
      { id: "publish_date", label: "Publish Date", icon: Calendar, required: true }
    ],
    optionalFields: [
      { id: "featured_image", label: "Featured Image", icon: Image01 },
      { id: "excerpt", label: "Post Excerpt", icon: File04 },
      { id: "categories", label: "Post Categories", icon: Tag01 },
      { id: "tags", label: "Tags", icon: Tag01 },
      { id: "comments", label: "Comments", icon: MessageSquare01 },
      { id: "social_sharing", label: "Social Sharing", icon: Heart },
      { id: "reading_time", label: "Reading Time", icon: Clock },
      { id: "related_posts", label: "Related Posts", icon: Grid01 }
    ]
  },
  "discussions": {
    title: "Discussions Space",
    icon: MessageSquare01,
    color: "blue",
    iconBg: "bg-blue-100/60 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    primaryFields: [
      { id: "title", label: "Discussion Title", icon: MessageSquare01, required: true },
      { id: "content", label: "Discussion Content", icon: File04, required: true },
      { id: "author", label: "Author", icon: User01, required: true }
    ],
    optionalFields: [
      { id: "categories", label: "Discussion Categories", icon: Tag01 },
      { id: "tags", label: "Tags", icon: Tag01 },
      { id: "reactions", label: "Reactions", icon: Heart },
      { id: "polls", label: "Polls", icon: Target01 },
      { id: "pinned", label: "Pinned Discussions", icon: Trophy01 },
      { id: "locked", label: "Lock Discussions", icon: Lock01 },
      { id: "attachments", label: "File Attachments", icon: Attachment01 },
      { id: "mentions", label: "User Mentions", icon: AtSign }
    ]
  },
  "changelog": {
    title: "Changelog Space",
    icon: LayoutAlt01,
    color: "indigo",
    iconBg: "bg-indigo-100/60 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    primaryFields: [
      { id: "version", label: "Version Number", icon: Tag01, required: true },
      { id: "title", label: "Release Title", icon: Edit03, required: true },
      { id: "description", label: "Release Notes", icon: File04, required: true },
      { id: "date", label: "Release Date", icon: Calendar, required: true }
    ],
    optionalFields: [
      { id: "categories", label: "Change Categories", icon: Tag01 },
      { id: "tags", label: "Tags", icon: Tag01 },
      { id: "breaking_changes", label: "Breaking Changes", icon: Trophy01 },
      { id: "attachments", label: "File Attachments", icon: Attachment01 },
      { id: "contributors", label: "Contributors", icon: Users01 },
      { id: "related_issues", label: "Related Issues", icon: Grid01 },
      { id: "migration_guide", label: "Migration Guide", icon: BookOpen01 },
      { id: "changelog_type", label: "Change Type", icon: Target01 }
    ]
  }
};

interface FieldSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onNext: (selectedFields: string[]) => void;
  contentType: string;
}

export const FieldSelectionModal = ({ 
  isOpen, 
  onClose, 
  onBack,
  onNext,
  contentType 
}: FieldSelectionModalProps) => {
  const [selectedOptionalFields, setSelectedOptionalFields] = useState<string[]>([]);

  if (!isOpen) return null;

  const config = contentTypeConfig[contentType as keyof typeof contentTypeConfig];
  if (!config) return null;

  const IconComponent = config.icon;

  const toggleOptionalField = (fieldId: string) => {
    setSelectedOptionalFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleNext = () => {
    onNext(selectedOptionalFields);
  };

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

        {/* Main Content */}
        <div className="flex flex-col md:flex-row h-[90vh]">
          {/* Left Side - Field Selection */}
          <div className="md:w-1/2 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="px-12 pt-8 pb-2">
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-16 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "66%" }}></div>
                  </div>
                  <span className="text-sm ml-2 text-gray-600 dark:text-gray-400">2/3</span>
                </div>
              </div>

              <h1 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-1">
                Customize {config.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Select features to turn on or off
              </p>
            </div>

            {/* Field Selection Content */}
            <div className="flex-1 items-center justify-center px-12 overflow-y-auto scrollbar-thin">
              <div className="space-y-6">
                {/* All Fields in Flexible Layout */}
                <div className="flex flex-wrap gap-2 justify-start items-start">
                  {/* Primary Fields */}
                  {config.primaryFields.map((field) => {
                    const IconComponent = field.icon;
                    return (
                      <div 
                        key={field.id}
                        className="flex items-center px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75 w-auto"
                      >
                        <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {field.label}
                        </span>
                      </div>
                    );
                  })}

                  {/* Optional Fields */}
                  {config.optionalFields.map((field) => {
                    const isSelected = selectedOptionalFields.includes(field.id);
                    const IconComponent = field.icon;
                    return (
                      <button
                        key={field.id}
                        onClick={() => toggleOptionalField(field.id)}
                        className={cx(
                          "flex items-center px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer w-auto",
                          isSelected
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                        )}
                      >
                        <IconComponent className={cx(
                          "w-4 h-4 mr-2 flex-shrink-0",
                          isSelected
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400"
                        )} />
                        <span className={cx(
                          "text-sm font-medium whitespace-nowrap",
                          isSelected
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300"
                        )}>
                          {field.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-end">
              <div className="flex gap-3">
                <Button
                  color="secondary"
                  size="sm"
                  onClick={onBack}
                >
                  Back
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  onClick={handleNext}
                  className="min-w-24"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="hidden md:block md:w-1/2 py-6 pl-12 bg-gradient-to-br from-gray-100/80 to-gray-100/50 dark:from-gray-900/80 dark:to-gray-900/80 relative">
            <div className="absolute -bottom-4 -right-8 w-[96%] h-[96%] bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden">
                {/* Preview Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center">
                  <div className={cx("p-2 rounded-lg mr-3", config.iconBg)}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Your Space
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Preview of selected fields
                    </p>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="p-5 h-[calc(100%-64px)]">

                  {/* Event Card Preview */}
                  {contentType === 'events' && (
                    <div className="bg-white dark:bg-gray-800 space-y-2">
                      {/* Cover Image - Always shown (primary) */}
                      <div className="aspect-[3/1] w-full bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                        <Image01 className="w-8 h-8 text-gray-400" />
                      </div>

                      {/* Event Title - Always shown (primary) */}
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          Community Tech Meetup
                        </h3>
                        
                        {/* Event Description - Always shown (primary) */}
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Join us for an exciting evening of tech talks and networking with fellow developers.
                        </p>

                        {/* Host - Always shown (primary) */}
                        <div className="flex items-center gap-2 text-sm">
                          <User01 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">Hosted by John Smith</span>
                        </div>
                      </div>

                      {/* Date & Time - Always shown (primary) */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">March 15, 2024</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">6:00 PM</span>
                        </div>
                      </div>

                      {/* Location - Always shown (primary) */}
                      <div className="flex items-center gap-1 text-sm">
                        <Grid01 className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">Tech Hub Conference Room</span>
                      </div>

                      {/* Optional Fields - Show based on selection */}
                      {selectedOptionalFields.includes('categories') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Tag01 className="w-4 h-4 text-gray-500" />
                          <div className="flex gap-1">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                              Technology
                            </span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs">
                              Networking
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedOptionalFields.includes('tags') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Tag01 className="w-4 h-4 text-gray-500" />
                          <div className="flex gap-1">
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                              #javascript
                            </span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                              #react
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedOptionalFields.includes('capacity') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Users01 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">50 people max</span>
                        </div>
                      )}

                      {selectedOptionalFields.includes('registration_fee') && (
                        <div className="flex items-center gap-1 text-sm">
                          <CurrencyDollarCircle className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">$25.00</span>
                        </div>
                      )}

                      {selectedOptionalFields.includes('rsvp') && (
                        <div className="pt-2">
                          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                            RSVP Now
                          </button>
                        </div>
                      )}

                      {selectedOptionalFields.includes('attachments') && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2 text-sm">
                            <Attachment01 className="w-4 h-4 text-gray-500" />
                            <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                              event-agenda.pdf
                            </span>
                          </div>
                        </div>
                      )}



                      {selectedOptionalFields.includes('recurring') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">Repeats monthly</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Job Board Preview */}
                  {contentType === 'job-board' && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3">
                      {/* Job Title - Always shown (primary) */}
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          Senior Frontend Developer
                        </h3>
                        
                        {/* Company - Always shown (primary) */}
                        <div className="flex items-center gap-1 text-sm">
                          <Building01 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">TechCorp Inc.</span>
                        </div>
                        
                        {/* Location - Always shown (primary) */}
                        <div className="flex items-center gap-1 text-sm">
                          <Grid01 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">San Francisco, CA</span>
                        </div>

                        {/* Salary - Always shown (primary) */}
                        <div className="flex items-center gap-1 text-sm">
                          <CurrencyDollarCircle className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">$120k - $160k</span>
                        </div>

                        {/* Job Description - Always shown (primary) */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
                          We're looking for a passionate frontend developer to join our team and build amazing user experiences.
                        </p>
                      </div>

                      {/* Optional Fields - Show based on selection */}
                      {selectedOptionalFields.includes('categories') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Tag01 className="w-4 h-4 text-gray-500" />
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                            Engineering
                          </span>
                        </div>
                      )}

                      {selectedOptionalFields.includes('tags') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Tag01 className="w-4 h-4 text-gray-500" />
                          <div className="flex gap-1">
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                              React
                            </span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                              TypeScript
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedOptionalFields.includes('employment_type') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Target01 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">Full-time</span>
                        </div>
                      )}

                      {selectedOptionalFields.includes('experience') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Award01 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">5+ years experience</span>
                        </div>
                      )}

                      {selectedOptionalFields.includes('remote') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Grid01 className="w-4 h-4 text-gray-500" />
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs">
                            Remote OK
                          </span>
                        </div>
                      )}

                      {selectedOptionalFields.includes('requirements') && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Requirements</h4>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• 5+ years React experience</li>
                            <li>• Strong TypeScript skills</li>
                          </ul>
                        </div>
                      )}

                      {selectedOptionalFields.includes('benefits') && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Benefits</h4>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Health insurance</li>
                            <li>• 401(k) matching</li>
                          </ul>
                        </div>
                      )}

                      {selectedOptionalFields.includes('application_deadline') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">Apply by March 30, 2024</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Other Content Types Preview */}
                  {!['events', 'job-board'].includes(contentType) && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3">
                      <div className="space-y-4">
                        {/* Primary Fields Preview */}
                        <div>
                          <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                            Required Fields
                          </h5>
                          <div className="space-y-2">
                            {config.primaryFields.map((field) => (
                              <div key={field.id} className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {field.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Optional Fields Preview */}
                        {selectedOptionalFields.length > 0 && (
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                              Optional Fields ({selectedOptionalFields.length})
                            </h5>
                            <div className="space-y-2">
                              {selectedOptionalFields.map((fieldId) => {
                                const field = config.optionalFields.find(f => f.id === fieldId);
                                return field ? (
                                  <div key={fieldId} className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                      {field.label}
                                    </span>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 