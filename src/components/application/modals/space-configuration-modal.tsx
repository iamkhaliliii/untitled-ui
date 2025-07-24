import React, { useState } from "react";
import { X, Briefcase01, Calendar, HelpCircle, Star01, BookOpen01, Edit03, MessageSquare01, LayoutAlt01, Image01, User01, Clock, Grid01, Tag01, Users01, CurrencyDollarCircle, Attachment01, Building01, Target01, Award01, ChevronDown, ChevronUp, Settings01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";

const contentTypeConfig = {
  "job-board": {
    title: "Job Board Space",
    icon: Briefcase01,
    color: "teal",
    iconBg: "bg-teal-100/60 dark:bg-teal-900/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    description: "Post and find job opportunities within the community.",
    primaryFields: [
      { id: "title", label: "Job Title", icon: Edit03, required: true },
      { id: "company", label: "Company", icon: Building01, required: true },
      { id: "description", label: "Job Description", icon: Edit03, required: true },
      { id: "location", label: "Location", icon: Grid01, required: true },
      { id: "salary", label: "Salary Range", icon: CurrencyDollarCircle, required: true }
    ],
    optionalFields: [
      { id: "requirements", label: "Requirements", icon: Edit03 },
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
    description: "Discover and RSVP to upcoming community events.",
    primaryFields: [
      { id: "title", label: "Event Title", icon: Edit03, required: true },
      { id: "description", label: "Event Description", icon: Edit03, required: true },
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
    description: "Ask questions and get answers from the community."
  },
  "ideas": {
    title: "Ideas & Wishlist Space",
    icon: Star01,
    color: "amber",
    iconBg: "bg-amber-100/60 dark:bg-amber-900/20", 
    iconColor: "text-amber-600 dark:text-amber-400",
    description: "Share ideas and vote on features for the community or product."
  },
  "knowledge-base": {
    title: "Knowledge Base Space",
    icon: BookOpen01,
    color: "sky",
    iconBg: "bg-sky-100/60 dark:bg-sky-900/20",
    iconColor: "text-sky-600 dark:text-sky-400", 
    description: "Find helpful articles and documentation."
  },
  "blog": {
    title: "Blog Space",
    icon: Edit03,
    color: "purple",
    iconBg: "bg-purple-100/60 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    description: "Read and publish articles and blog posts."
  },
  "discussions": {
    title: "Discussions Space",
    icon: MessageSquare01,
    color: "blue",
    iconBg: "bg-blue-100/60 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    description: "Start or join conversations on various topics."  
  },
  "changelog": {
    title: "Changelog Space",
    icon: LayoutAlt01,
    color: "indigo",
    iconBg: "bg-indigo-100/60 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    description: "Track updates and changes to the product or community."
  }
};

interface SpaceConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onCreateSpace: (spaceData: SpaceFormData) => void;
  contentType: string;
  selectedFields: string[];
}

interface SpaceFormData {
  name: string;
  slug: string;
  contentType: string;
}

export const SpaceConfigurationModal = ({ 
  isOpen, 
  onClose, 
  onBack,
  onCreateSpace,
  contentType,
  selectedFields
}: SpaceConfigurationModalProps) => {
  const [formData, setFormData] = useState<SpaceFormData>({
    name: "",
    slug: "",
    contentType
  });

  const [advancedSettings, setAdvancedSettings] = useState({
    folder: "",
    visibility: "",
    whoCanPost: "",
    inviteOnly: false,
    anyoneInvite: false,
    commentEnabled: false,
    whoCanReply: "",
    reactionEnabled: false,
    whoCanReact: "",
    reactionType: "",
  });

  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);

  const folderOptions = [
    { id: "myfolder", label: "MyFolder" },
    { id: "shared", label: "Shared" },
    { id: "archive", label: "Archive" },
  ];

  const visibilityOptions = [
    { id: "public", label: "Public", supportingText: "Anyone can view this event" },
    { id: "private", label: "Private", supportingText: "Only invited people can view" },
    { id: "team", label: "Team Only", supportingText: "Only team members can view" },
  ];

  const whoCanPostOptions = [
    { id: "anyone", label: "Anyone", supportingText: "All attendees can post" },
    { id: "moderators", label: "Moderators Only", supportingText: "Only moderators can post" },
    { id: "organizers", label: "Organizers Only", supportingText: "Only event organizers can post" },
  ];

  const whoCanReplyOptions = [
    { id: "anyone", label: "Anyone", supportingText: "All attendees can reply" },
    { id: "moderators", label: "Moderators Only", supportingText: "Only moderators can reply" },
    { id: "original-poster", label: "Original Poster", supportingText: "Only the original poster can reply" },
  ];

  const whoCanReactOptions = [
    { id: "anyone", label: "Anyone", supportingText: "All attendees can react" },
    { id: "moderators", label: "Moderators Only", supportingText: "Only moderators can react" },
    { id: "no-reactions", label: "No Reactions", supportingText: "Reactions are disabled" },
  ];

  const reactionTypeOptions = [
    { id: "emoji", label: "Emoji Reactions", supportingText: "👍 😊 ❤️ 😢 😡" },
    { id: "thumbs", label: "Thumbs Only", supportingText: "👍 👎" },
    { id: "hearts", label: "Hearts Only", supportingText: "❤️ 🧡 💛 💚 💙 💜" },
    { id: "custom", label: "Custom Reactions", supportingText: "Define your own reaction set" },
  ];

  if (!isOpen) return null;

  const config = contentTypeConfig[contentType as keyof typeof contentTypeConfig];
  if (!config) return null;

  const IconComponent = config.icon;

  const handleInputChange = (field: keyof SpaceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdvancedChange = (field: string) => (value: string) => {
    setAdvancedSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleChange = (field: string) => (value: boolean) => {
    setAdvancedSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateSpace = () => {
    onCreateSpace(formData);
    onClose();
  };

  const isFormValid = formData.name.trim() !== "" && formData.slug.trim() !== "";

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
          {/* Left Side - Form */}
          <div className="md:w-1/2 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="px-12 pt-8 pb-2">
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-16 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                  <span className="text-sm ml-2 text-gray-600 dark:text-gray-400">3/3</span>
                </div>
              </div>

              <h1 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-1">
                Name your space
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Choose a name and URL for your {config.title.toLowerCase()}
              </p>
            </div>

            {/* Form Content */}
            <div className="flex-1 items-center justify-center px-12 overflow-y-auto scrollbar-thin">
              <div className="space-y-5">
                <div className="space-y-4">
                  {/* Space Name */}
                  <div className="space-y-2">
                    <Label htmlFor="space-name">Space Name</Label>
                    <Input
                      id="space-name"
                      name="name"
                      placeholder="My Space"
                      value={formData.name}
                      onChange={(value) => handleInputChange("name", value)}
                      className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                  </div>

                  {/* Space Slug */}
                  <div className="space-y-2">
                    <Label htmlFor="space-slug">Space Slug</Label>
                    <div className="flex items-center mt-1">
                      <div className="px-3 h-10 flex items-center rounded-l-md border border-r-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                        bettermode.com/
                      </div>
                      <Input
                        id="space-slug"
                        name="slug"
                        placeholder="my-space"
                        value={formData.slug}
                        onChange={(value) => handleInputChange("slug", value)}
                        className="rounded-l-none flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  </div>

                  {/* Advanced Configuration Accordion */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setIsAdvancedExpanded(!isAdvancedExpanded)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Settings01 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">Advanced Configuration</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Folder, visibility, permissions and more</p>
                        </div>
                      </div>
                      {isAdvancedExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </button>

                    {isAdvancedExpanded && (
                      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                        {/* Folder */}
                        <Select
                          label="Folder"
                          placeholder="Select folder"
                          selectedKey={advancedSettings.folder}
                          onSelectionChange={(key) => setAdvancedSettings(prev => ({ ...prev, folder: key as string }))}
                          items={folderOptions}
                        >
                          {(item) => (
                            <Select.Item key={item.id} id={item.id}>
                              {item.label}
                            </Select.Item>
                          )}
                        </Select>

                        {/* Visibility */}
                        <Select
                          label="Visibility"
                          placeholder="Select visibility"
                          selectedKey={advancedSettings.visibility}
                          onSelectionChange={(key) => setAdvancedSettings(prev => ({ ...prev, visibility: key as string }))}
                          items={visibilityOptions}
                        >
                          {(item) => (
                            <Select.Item key={item.id} id={item.id}>
                              {item.label}
                            </Select.Item>
                          )}
                        </Select>

                        {/* Module Permissions */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">Module Permissions</h3>
                            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium">
                              Event
                            </span>
                          </div>

                          {/* Who Can Post */}
                          <Select
                            label="Who can post"
                            placeholder="Select who can post"
                            selectedKey={advancedSettings.whoCanPost}
                            onSelectionChange={(key) => setAdvancedSettings(prev => ({ ...prev, whoCanPost: key as string }))}
                            items={whoCanPostOptions}
                          >
                            {(item) => (
                              <Select.Item key={item.id} id={item.id}>
                                {item.label}
                              </Select.Item>
                            )}
                          </Select>

                          {/* Invite Only Toggle */}
                          <Toggle
                            label="Invite Only"
                            hint="Only invited people can attend this event"
                            isSelected={advancedSettings.inviteOnly}
                            onChange={handleToggleChange("inviteOnly")}
                          />

                          {/* Anyone Invite Toggle */}
                          <Toggle
                            label="Anyone can invite"
                            hint="Allow attendees to invite other people"
                            isSelected={advancedSettings.anyoneInvite}
                            onChange={handleToggleChange("anyoneInvite")}
                          />

                          {/* Comment Toggle */}
                          <Toggle
                            label="Comments"
                            hint="Allow attendees to comment on the event"
                            isSelected={advancedSettings.commentEnabled}
                            onChange={handleToggleChange("commentEnabled")}
                          />

                          {/* Conditional Comment Settings */}
                          {advancedSettings.commentEnabled && (
                            <div className="ml-4 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                              <Select
                                label="Who can reply"
                                placeholder="Select who can reply"
                                selectedKey={advancedSettings.whoCanReply}
                                onSelectionChange={(key) => setAdvancedSettings(prev => ({ ...prev, whoCanReply: key as string }))}
                                items={whoCanReplyOptions}
                              >
                                {(item) => (
                                  <Select.Item key={item.id} id={item.id}>
                                    {item.label}
                                  </Select.Item>
                                )}
                              </Select>
                            </div>
                          )}

                          {/* Reaction Toggle */}
                          <Toggle
                            label="Reactions"
                            hint="Allow attendees to react to posts and comments"
                            isSelected={advancedSettings.reactionEnabled}
                            onChange={handleToggleChange("reactionEnabled")}
                          />

                          {/* Conditional Reaction Settings */}
                          {advancedSettings.reactionEnabled && (
                            <div className="ml-4 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                              <Select
                                label="Who can react"
                                placeholder="Select who can react"
                                selectedKey={advancedSettings.whoCanReact}
                                onSelectionChange={(key) => setAdvancedSettings(prev => ({ ...prev, whoCanReact: key as string }))}
                                items={whoCanReactOptions}
                              >
                                {(item) => (
                                  <Select.Item key={item.id} id={item.id}>
                                    {item.label}
                                  </Select.Item>
                                )}
                              </Select>

                              <Select
                                label="Reaction type"
                                placeholder="Select reaction type"
                                selectedKey={advancedSettings.reactionType}
                                onSelectionChange={(key) => setAdvancedSettings(prev => ({ ...prev, reactionType: key as string }))}
                                items={reactionTypeOptions}
                              >
                                {(item) => (
                                  <Select.Item key={item.id} id={item.id}>
                                    {item.label}
                                  </Select.Item>
                                )}
                              </Select>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
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
                  onClick={handleCreateSpace}
                  isDisabled={!isFormValid}
                  className="min-w-24"
                >
                  Create Space
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
                      {formData.name || "Your Space"}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      bettermode.com/{formData.slug || "your-space"}
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
                      {selectedFields.includes('categories') && (
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

                      {selectedFields.includes('tags') && (
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

                      {selectedFields.includes('capacity') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Users01 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">50 people max</span>
                        </div>
                      )}

                      {selectedFields.includes('registration_fee') && (
                        <div className="flex items-center gap-1 text-sm">
                          <CurrencyDollarCircle className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">$25.00</span>
                        </div>
                      )}

                      {selectedFields.includes('rsvp') && (
                        <div className="pt-2">
                          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                            RSVP Now
                          </button>
                        </div>
                      )}

                      {selectedFields.includes('attachments') && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2 text-sm">
                            <Attachment01 className="w-4 h-4 text-gray-500" />
                            <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                              event-agenda.pdf
                            </span>
                          </div>
                        </div>
                      )}



                      {selectedFields.includes('recurring') && (
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
                      {selectedFields.includes('categories') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Tag01 className="w-4 h-4 text-gray-500" />
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                            Engineering
                          </span>
                        </div>
                      )}

                      {selectedFields.includes('tags') && (
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

                      {selectedFields.includes('employment_type') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Target01 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">Full-time</span>
                        </div>
                      )}

                      {selectedFields.includes('experience') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Award01 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">5+ years experience</span>
                        </div>
                      )}

                      {selectedFields.includes('remote') && (
                        <div className="flex items-center gap-1 text-sm">
                          <Grid01 className="w-4 h-4 text-gray-500" />
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs">
                            Remote OK
                          </span>
                        </div>
                      )}

                      {selectedFields.includes('requirements') && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Requirements</h4>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• 5+ years React experience</li>
                            <li>• Strong TypeScript skills</li>
                          </ul>
                        </div>
                      )}

                      {selectedFields.includes('benefits') && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Benefits</h4>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Health insurance</li>
                            <li>• 401(k) matching</li>
                          </ul>
                        </div>
                      )}

                      {selectedFields.includes('application_deadline') && (
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
                            {(config as any).primaryFields?.map((field: any) => (
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
                        {selectedFields.filter(fieldId => (config as any).optionalFields?.find((f: any) => f.id === fieldId)).length > 0 && (
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                              Optional Fields ({selectedFields.filter(fieldId => (config as any).optionalFields?.find((f: any) => f.id === fieldId)).length})
                            </h5>
                            <div className="space-y-2">
                              {selectedFields.map((fieldId) => {
                                const field = (config as any).optionalFields?.find((f: any) => f.id === fieldId);
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