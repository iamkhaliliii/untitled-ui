import { useState } from "react";
import { useLocation } from "react-router";
import { SiteLayout } from "@/components/layouts/site-layout";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { 
    MessageTextCircle01, 
    Pencil01, 
    BellPlus, 
    DotsHorizontal,
    Heart,
    MessageTextSquare01,
    Share06,
    ArrowNarrowUp,
    Bell01
} from "@untitledui/icons";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";

interface Post {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
        avatar?: string;
        initials?: string;
        badges?: string[];
    };
    postedIn: {
        name: string;
        href: string;
    };
    timestamp: string;
    stats: {
        upvotes: number;
        followers: number;
        replies: number;
    };
    hasMoreReplies?: number;
    replies?: Reply[];
}

interface Reply {
    id: string;
    author: {
        name: string;
        avatar?: string;
        initials?: string;
        badges?: string[];
    };
    content: string;
    timestamp: string;
    canExpand?: boolean;
}

export const SiteProfilePage = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<"posts" | "replies" | "spaces">("posts");

    const profileData = {
        name: "d.garg",
        avatar: null,
        initials: "d",
        coverImage: null,
        memberSince: "02/17/2025",
        lastSeen: "12 hours ago",
        email: "d.garg@castsoftware.com",
        emailVisible: false,
        lastSeenVisible: false,
    };

    const posts: Post[] = [
        {
            id: "3NsMSiNzutyU6yZ",
            title: "Display different contents based on client or a partner",
            content: "We want to standardize the experience for both partners and clients. Is it possible to display different contents based on who is logging (client or a partner)",
            author: {
                name: "d.garg",
                initials: "d",
            },
            postedIn: {
                name: "Ask the Community",
                href: "/hub/community/ask-for-help"
            },
            timestamp: "a day ago",
            stats: {
                upvotes: 2,
                followers: 2,
                replies: 2
            },
            hasMoreReplies: 1,
            replies: [
                {
                    id: "reply1",
                    author: {
                        name: "Dan Aaron Pena",
                        avatar: "https://tribe-s3-production.imgix.net/mv5x5OLXnZn7d4oYM7ubZ?fit=max&w=500&auto=compress,format",
                        badges: ["Expert"]
                    },
                    content: "Hi there, \n\nYou can't dynamically change content based on member type, but you can achieve the same goal by creating separate private spaces for each audience (for example, one for clients and another for partners). Then, assign members to the relevant spaces so they only see content meant for them.\n\nThis approach keeps the experience tailored while maintaining a single, organized community.",
                    timestamp: "a day ago",
                    canExpand: false,
                }
            ]
        }
    ];

    const tabs = [
        { id: "posts" as const, label: "Posts" },
        { id: "replies" as const, label: "Replies" },
        { id: "spaces" as const, label: "Spaces" },
    ];

    const AboutSidebar = () => (
        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                <h3 className="text-primary font-medium text-lg">About</h3>
            </div>
            <div className="flex-1 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <div className="font-medium text-tertiary">Member since</div>
                        <div className="mt-1 text-primary text-sm">{profileData.memberSince}</div>
                    </div>
                    <div>
                        <div className="font-medium text-tertiary flex gap-1 items-center">
                            <span>Last seen</span>
                            {profileData.lastSeenVisible && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                </svg>
                            )}
                        </div>
                        <div className="mt-1 text-primary text-sm">{profileData.lastSeen}</div>
                    </div>
                    <div>
                        <div className="font-medium text-tertiary flex gap-1 items-center">
                            <span>Email</span>
                            {profileData.emailVisible && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                </svg>
                            )}
                        </div>
                        <div className="mt-1 text-primary text-sm">
                            <a 
                                href={`mailto:${profileData.email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-tertiary hover:text-brand-secondary break-words"
                            >
                                {profileData.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SiteLayout
            currentPath={location.pathname}
            showRightSidebar={false}
        >
            <main className="w-full flex flex-col max-w-full">
                {/* Profile Header Card - Full Width */}
                <div className="w-full">
                    {/* Profile Header Card */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-t-xl">
                        <div>
                            {/* Cover Image */}
                            <div className="bg-primary sm:rounded-t-xl">
                                <div className="overflow-hidden -mx-[1px] sm:rounded-t-xl -mt-[1px]">
                                    <div className="group relative bg-primary">
                                        <div className="w-full overflow-hidden h-32 lg:h-48">
                                            {profileData.coverImage ? (
                                                <div className="w-full bg-cover bg-center" style={{ backgroundImage: `url(${profileData.coverImage})` }} />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-success-secondary/50 to-brand-secondary/30" />
                                            )}
                                        </div>
                                        <div className="absolute bottom-5 end-5">
                                            <Button 
                                                color="secondary" 
                                                size="sm"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            >
                                                Add cover image
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Avatar and Info */}
                            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-end sm:gap-5 mb-5">
                                    <div className="flex -mt-12 sm:-mt-16 relative">
                                        <div className="h-24 w-24 sm:h-32 sm:w-32 ms-4 sm:ms-0">
                                            <div className="hover:bg-secondary rounded-full relative">
                                                {profileData.avatar ? (
                                                    <Avatar 
                                                        size="2xl"
                                                        src={profileData.avatar}
                                                        alt={profileData.name}
                                                        className="ring-2 ring-primary"
                                                    />
                                                ) : (
                                                    <div className="w-32 h-32 rounded-full bg-brand-solid/20 flex items-center justify-center ring-2 ring-primary">
                                                        <span className="text-4xl font-medium uppercase text-brand-solid">
                                                            {profileData.initials}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-center rounded-full text-white bg-black bg-opacity-50 opacity-0 hover:opacity-90 absolute top-0 bottom-0 start-0 end-0 cursor-pointer">
                                                    Change
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name and Actions */}
                                    <div className="sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:pb-1 mt-5">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h1 className="font-medium text-2xl text-primary truncate max-w-full">
                                                    {profileData.name}
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-3 sm:mt-0">
                                            <Button size="md" color="primary" iconLeading={MessageTextCircle01}>
                                                Message
                                            </Button>
                                            <Button size="md" color="secondary" iconLeading={Pencil01}>
                                                Edit profile
                                            </Button>
                                            <Button size="md" color="secondary" className="!w-10 !px-0">
                                                <BellPlus className="w-5 h-5" />
                                            </Button>
                                            <Dropdown.Root>
                                                <Button size="md" color="secondary" className="!w-10 !px-0">
                                                    <DotsHorizontal className="w-5 h-5" />
                                                </Button>
                                                <Dropdown.Popover>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Report user</Dropdown.Item>
                                                        <Dropdown.Item>Block user</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown.Popover>
                                            </Dropdown.Root>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout: Tabs/Posts + About Sidebar */}
                <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-3.5 md:gap-4 lg:gap-5 py-3 sm:py-3.5 md:py-4 lg:py-5">
                    {/* Left Column: Tabs and Posts */}
                    <div className="col-span-1 md:col-span-4 space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5">
                        {/* Tabs */}
                    <div className="border border-secondary bg-primary shadow-sm sm:rounded-xl overflow-hidden">
                        <div className="flex border-b border-secondary">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cx(
                                        "flex-1 text-center py-4 px-4 text-sm font-medium transition-colors relative",
                                        activeTab === tab.id
                                            ? "text-primary bg-primary"
                                            : "text-tertiary bg-primary hover:bg-secondary hover:text-primary"
                                    )}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-solid" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                        {/* Posts Content */}
                        {activeTab === "posts" && (
                            <div className="space-y-5">
                                {posts.map((post) => (
                                <div key={post.id} className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                                    {/* Post Header */}
                                    <div className="flex-1 px-4 py-5 sm:p-6">
                                        <div className="flex flex-col space-y-4">
                                            {/* Author Info */}
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-4 min-w-0 grow">
                                                    <div className="shrink-0">
                                                        {post.author.avatar ? (
                                                            <Avatar size="lg" src={post.author.avatar} alt={post.author.name} />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-brand-solid/20 flex items-center justify-center">
                                                                <span className="text-md font-medium uppercase text-brand-solid">
                                                                    {post.author.initials}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 grow">
                                                        <div className="flex items-center flex-wrap gap-2">
                                                            <a href="#" className="font-medium text-primary hover:text-brand-secondary truncate">
                                                                {post.author.name}
                                                            </a>
                                                            {post.author.badges?.map((badge, idx) => (
                                                                <Badge key={idx} size="sm" color="success">
                                                                    {badge}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                        <div className="text-sm text-tertiary mt-0.5 flex gap-1">
                                                            <a href="#" className="hover:text-brand-secondary">
                                                                {post.timestamp}
                                                            </a>
                                                            <span>·</span>
                                                            <a href={post.postedIn.href} className="hover:text-brand-secondary truncate">
                                                                Posted in {post.postedIn.name}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Dropdown.Root>
                                                    <Button size="sm" color="tertiary" className="!w-10 !px-0">
                                                        <DotsHorizontal className="w-5 h-5" />
                                                    </Button>
                                                    <Dropdown.Popover>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>Edit</Dropdown.Item>
                                                            <Dropdown.Item>Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Popover>
                                                </Dropdown.Root>
                                            </div>

                                            {/* Post Content */}
                                            <div className="space-y-2">
                                                <a href="#" className="block">
                                                    <h2 className="font-medium text-lg text-primary line-clamp-3 hover:text-brand-secondary">
                                                        {post.title}
                                                    </h2>
                                                </a>
                                                <div className="text-primary">
                                                    <p className="text-sm">{post.content}</p>
                                                </div>
                                            </div>

                                            {/* Post Stats */}
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button className="flex items-center justify-center w-9 h-7 rounded-full border-2 border-secondary bg-secondary hover:bg-tertiary">
                                                        <ArrowNarrowUp className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-tertiary">{post.stats.upvotes}</span>
                                                </div>
                                                <div className="text-tertiary hidden sm:block">
                                                    {post.stats.followers} followers
                                                </div>
                                                <div className="text-tertiary">
                                                    <a href="#" className="hover:text-brand-secondary">
                                                        {post.stats.replies} replies
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex-1 px-4 py-0 sm:px-6 sm:py-1">
                                        <div className="flex gap-2">
                                            <Button size="md" color="secondary" className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <ArrowNarrowUp className="w-5 h-5" />
                                                    <span>Upvote</span>
                                                </div>
                                            </Button>
                                            <Button size="md" color="secondary" className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Bell01 className="w-5 h-5" />
                                                    <span>Follow</span>
                                                </div>
                                            </Button>
                                            <Button size="md" color="secondary" className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Share06 className="w-5 h-5" />
                                                    <span>Share</span>
                                                </div>
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Replies Section */}
                                    {post.replies && post.replies.length > 0 && (
                                        <div className="flex-1 py-5 sm:p-6 flex flex-col space-y-6 px-5">
                                            {post.replies.map((reply) => (
                                                <div key={reply.id} className="flex gap-3 sm:gap-4">
                                                    <div className="shrink-0">
                                                        {reply.author.avatar ? (
                                                            <Avatar size="lg" src={reply.author.avatar} alt={reply.author.name} />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-brand-solid/20 flex items-center justify-center">
                                                                <span className="text-md font-medium uppercase">
                                                                    {reply.author.initials}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 grow max-w-full">
                                                        <div className="flex justify-between gap-2">
                                                            <div className="flex gap-2 items-center flex-wrap">
                                                                <a href="#" className="font-medium text-primary hover:text-brand-secondary">
                                                                    {reply.author.name}
                                                                </a>
                                                                {reply.author.badges?.map((badge, idx) => (
                                                                    <Badge key={idx} size="sm" color="success">
                                                                        {badge}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-tertiary mt-0.5">
                                                            <a href="#" className="hover:text-brand-secondary">
                                                                {reply.timestamp}
                                                            </a>
                                                        </div>
                                                        <div className="mt-2">
                                                            <div className="text-primary">
                                                                <p className="text-sm whitespace-pre-line">{reply.content}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-5 text-sm mt-3">
                                                            <button className="text-tertiary hover:text-brand-secondary flex items-center font-medium">
                                                                <Heart className="w-4 h-4 mr-2" />
                                                                <span>Like</span>
                                                            </button>
                                                            <button className="text-tertiary hover:text-brand-secondary font-medium">
                                                                Reply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            {post.hasMoreReplies && post.hasMoreReplies > 0 && (
                                                <div className="flex items-center gap-3">
                                                    <a href="#" className="text-sm font-medium text-tertiary hover:text-brand-secondary flex items-center gap-1">
                                                        <MessageTextSquare01 className="w-4 h-4" />
                                                        <span>{post.hasMoreReplies} more reply</span>
                                                    </a>
                                                </div>
                                            )}

                                            {/* Reply Input */}
                                            <div className="flex gap-3 sm:gap-4">
                                                <div className="shrink-0">
                                                    <Avatar 
                                                        size="lg"
                                                        src="https://tribe-s3-production.imgix.net/wW0tqxnADIFFkhAOlM1Ab?fit=max&w=500&auto=compress,format"
                                                        alt="Current User"
                                                    />
                                                </div>
                                                <button className="flex-1 text-left px-3.5 py-2 bg-secondary hover:bg-tertiary rounded-lg text-sm text-tertiary font-normal">
                                                    What are your thoughts?
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "replies" && (
                            <div className="border border-secondary bg-primary shadow-sm sm:rounded-xl p-6 text-center">
                                <p className="text-tertiary">No replies yet</p>
                            </div>
                        )}

                        {activeTab === "spaces" && (
                            <div className="border border-secondary bg-primary shadow-sm sm:rounded-xl p-6 text-center">
                                <p className="text-tertiary">No spaces</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: About Sidebar */}
                    <div className="col-span-1 md:col-span-2">
                        <AboutSidebar />
                    </div>
                </div>
            </main>
        </SiteLayout>
    );
};

