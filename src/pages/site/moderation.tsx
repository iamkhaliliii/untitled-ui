import React, { useState } from "react";
import { SiteAdminLayout } from "@/components/layouts/site-admin-layout";
import { 
    Edit05, 
    Calendar, 
    Shield01, 
    UserCheck01, 
    AlertCircle,
    FileShield02,
    Users01,
    X,
    CheckCircle,
    Eye,
    Trash01,
    MessageSquare01,
    ArrowLeft,
    Clock,
    Globe01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dropdown } from "@/components/base/dropdown/dropdown";

// Left Sidebar Navigation
const LeftSidebarContent = ({ currentSection, onSectionChange }: { currentSection: string; onSectionChange: (section: string) => void }) => {
    const sections = [
        { 
            title: "Content planning",
            items: [
                { id: "draft-posts", label: "Draft posts", count: 0, icon: Edit05 },
                { id: "scheduled-posts", label: "Scheduled posts", count: 0, icon: Calendar },
            ]
        },
        {
            title: "Content moderation",
            items: [
                { id: "pending-posts", label: "Pending posts", count: 4, icon: FileShield02 },
                { id: "reported-posts", label: "Reported posts", count: 0, icon: Shield01 },
            ]
        },
        {
            title: "Member moderation",
            items: [
                { id: "pending-members", label: "Pending members", count: 0, icon: UserCheck01 },
                { id: "reported-members", label: "Reported members", count: 0, icon: AlertCircle },
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {/* Back to Community Button */}
            <button 
                onClick={() => window.location.href = '/site/feed'}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-tertiary hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-primary border border-secondary dark:border-gray-700"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to community</span>
            </button>
            {sections.map((section, idx) => (
                <div key={idx}>
                    <h3 className="text-sm font-medium text-tertiary dark:text-gray-400 mb-3">{section.title}</h3>
                    <ul className="space-y-1">
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentSection === item.id;
                            return (
                                <li key={item.id}>
                                    <button 
                                        onClick={() => onSectionChange(item.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-gray-200 dark:bg-gray-800 text-primary"
                                                : "text-tertiary hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-primary"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </div>
                                        <Badge color={item.count > 0 ? "error" : "gray"} size="sm">{item.count}</Badge>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
};

// Right Sidebar Content
const RightSidebarContent = () => {
    return (
        <div className="space-y-6">
            {/* Summary Card */}
            <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-2">Summary</h3>
                <p className="text-sm text-secondary dark:text-gray-300 mb-4">Good morning,</p>
                <p className="text-sm text-tertiary dark:text-gray-400 mb-4">Nothing to moderate here.</p>
                <Button color="secondary" size="sm" iconLeading={Shield01} className="w-full">
                    Moderation settings
                </Button>
            </div>
        </div>
    );
};

// Sample pending posts data
const pendingPosts = [
    {
        id: 1,
        title: "Grow Your Taxi Business with Uber Clone App Solutions!",
        content: "Entrepreneurs, Here's Your Moment to Lead the Taxi Industry! The global taxi industry is valued at around USD 272.6 billion in 2025 and is projected to nearly double by 2032, growing at a steady CAGR of ~9%. This strong upward curve makes now the perfect time to supercharge your taxi business with a next-gen booking platform...",
        author: {
            name: "Elisa cruz",
            avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        },
        timestamp: "an hour ago",
        space: "Intros & Networking",
        tags: ["AppDevelopment", "taxibookingapp", "uberclone", "ubercloneapp"],
        flags: [
            { type: "spam", label: "OOPSpam detected spam" },
            { type: "age", label: "Author does not meet the minimum account age requirement" }
        ],
        status: "pending"
    },
    {
        id: 2,
        title: "Happy Potato",
        content: "Happy Potato",
        author: {
            name: "Louise Fulton",
            avatar: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        },
        timestamp: "2 hours ago",
        space: "Intros & Networking",
        tags: ["Security"],
        flags: [
            { type: "spam", label: "Akismet detected spam" },
            { type: "age", label: "Author does not meet the minimum account age requirement" }
        ],
        status: "pending",
        hasTranslation: true
    },
    {
        id: 3,
        title: "Looking for collaboration on open source project",
        content: "Hey everyone! I'm working on an open-source community management tool and looking for contributors. If you're interested in React, Node.js, or UI/UX design, let's connect!",
        author: {
            name: "Alex Thompson",
            avatar: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        },
        timestamp: "5 hours ago",
        space: "General Discussion",
        tags: ["opensource", "collaboration"],
        flags: [
            { type: "reported", label: "Reported by 2 members" }
        ],
        status: "pending"
    },
    {
        id: 4,
        title: "New to the community - Hello everyone!",
        content: "Hi! I'm excited to join this amazing community. I'm a software developer passionate about building great products. Looking forward to learning from all of you!",
        author: {
            name: "Sarah Mitchell",
            avatar: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
        },
        timestamp: "1 day ago",
        space: "Intros & Networking",
        tags: ["introduction", "newmember"],
        flags: [
            { type: "age", label: "Author does not meet the minimum account age requirement" }
        ],
        status: "pending"
    }
];

// Main Content
export default function SiteModerationPage() {
    const [currentSection, setCurrentSection] = useState("draft-posts");

    const renderContent = () => {
        // Show pending posts only for "pending-posts" section
        if (currentSection === "pending-posts") {
            return (
                <div className="space-y-6">
                    {pendingPosts.map((post) => (
                    <div 
                        key={post.id}
                        className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-sm"
                    >
                        {/* Warning Flags */}
                        <div className="space-y-2 mb-4">
                            {post.flags.map((flag, idx) => (
                                <div 
                                    key={idx}
                                    className="bg-secondary dark:bg-gray-800 rounded-lg px-4 py-3 text-sm text-secondary dark:text-gray-300"
                                >
                                    {flag.label}
                                </div>
                            ))}
                        </div>

                        {/* Author Info */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar 
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    size="md"
                                />
                                <div>
                                    <h3 className="font-semibold text-primary dark:text-gray-100">{post.author.name}</h3>
                                    <p className="text-sm text-tertiary dark:text-gray-400">
                                        {post.timestamp} · Posted in {post.space}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge color="gray" size="md" className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    Pending review
                                </Badge>
                                <Dropdown.Root>
                                    <Dropdown.DotsButton />
                                    <Dropdown.Popover>
                                        <Dropdown.Menu>
                                            <Dropdown.Item key="view" icon={Eye}>View details</Dropdown.Item>
                                            <Dropdown.Item key="edit" icon={Edit05}>Edit post</Dropdown.Item>
                                            <Dropdown.Separator />
                                            <Dropdown.Item key="delete" icon={Trash01} className="text-error-solid">Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown.Root>
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-primary dark:text-gray-100 mb-3">
                                {post.title}
                            </h2>
                            <p className="text-secondary dark:text-gray-300 line-clamp-3">
                                {post.content}
                            </p>
                            {post.content.length > 200 && (
                                <button className="text-success-600 dark:text-success-400 text-sm font-medium mt-2 hover:underline">
                                    See more
                                </button>
                            )}
                        </div>

                        {/* Translation Option */}
                        {post.hasTranslation && (
                            <button className="flex items-center gap-2 text-sm text-tertiary dark:text-gray-400 hover:text-primary dark:hover:text-gray-300 mb-4 transition-colors">
                                <Globe01 className="h-4 w-4" />
                                <span>See translation</span>
                            </button>
                        )}

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag, idx) => (
                                    <Badge key={idx} color="gray" size="md">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Button color="primary" size="md" className="flex-1">
                                Publish
                            </Button>
                            <Button color="secondary" size="md" className="flex-1">
                                Publish as hidden
                            </Button>
                            <Button color="tertiary" size="md" className="flex-1">
                                Remove
                            </Button>
                        </div>
                    </div>
                    ))}
                </div>
            );
        }

        // Default: Show "All is clear" for sections with 0 items
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-50 dark:bg-success-900/20 mb-4">
                            <CheckCircle className="h-10 w-10 text-success-600 dark:text-success-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-primary dark:text-gray-100 mb-2">
                        All is clear! 🎉
                    </h1>
                    <p className="text-lg text-tertiary dark:text-gray-400 max-w-md mx-auto">
                        There are no items pending moderation at this time.
                    </p>
                </div>
            </div>
        );
    };

    return (
        <SiteAdminLayout
            currentPath="/site/moderation"
            leftSidebarContent={<LeftSidebarContent currentSection={currentSection} onSectionChange={setCurrentSection} />}
            rightSidebarContent={<RightSidebarContent />}
        >
            {renderContent()}
        </SiteAdminLayout>
    );
}

