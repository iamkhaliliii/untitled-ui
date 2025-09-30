import { SpaceOption } from "./types";

export const SPACE_OPTIONS: SpaceOption[] = [
  // Discussion
  {
    id: "general-discussion",
    name: "General Discussion",
    description: "Open discussions and conversations",
    icon: "💬",
    category: "discussion"
  },
  {
    id: "qa",
    name: "Q&A",
    description: "Questions and answers from the community",
    icon: "❓",
    category: "discussion"
  },
  {
    id: "feedback",
    name: "Feedback & Ideas",
    description: "Collect feedback and feature requests",
    icon: "💡",
    category: "discussion"
  },
  
  // Content
  {
    id: "announcements",
    name: "Announcements",
    description: "Important updates and news",
    icon: "📢",
    category: "content"
  },
  {
    id: "blog",
    name: "Blog",
    description: "Articles and long-form content",
    icon: "📝",
    category: "content"
  },
  {
    id: "events",
    name: "Events",
    description: "Community events and meetups",
    icon: "📅",
    category: "content"
  },
  
  // Collaboration
  {
    id: "projects",
    name: "Projects",
    description: "Collaborative projects and initiatives",
    icon: "🚀",
    category: "collaboration"
  },
  {
    id: "resources",
    name: "Resources",
    description: "Shared files and documentation",
    icon: "📚",
    category: "collaboration"
  },
  
  // Support
  {
    id: "help-support",
    name: "Help & Support",
    description: "Get help from the community",
    icon: "🆘",
    category: "support"
  },
  {
    id: "bug-reports",
    name: "Bug Reports",
    description: "Report issues and bugs",
    icon: "🐛",
    category: "support"
  }
];

export const STEP_TITLES = {
  1: "Ready to start?",
  2: "Branding", 
  3: "Activate your starting spaces"
};
