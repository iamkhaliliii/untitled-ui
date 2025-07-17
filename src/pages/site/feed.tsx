import {
    Heart,
    MessageCircle01,
    Share04,
    Bookmark,
    TrendUp01,
    Users01,
    Eye,
    Plus,
    Settings01,
    SearchLg,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { SiteLayout } from "@/components/layouts/site-layout";

export const SiteFeedPage = () => {
    const headerActions = (
        <div className="flex items-center gap-2">
            <div className="relative">
                <Input
                    placeholder="Search posts..."
                    className="w-64"
                    icon={SearchLg}
                />
            </div>
            <ButtonUtility
                size="sm"
                color="tertiary"
                icon={Settings01}
                tooltip="Filter"
            />
            <Button size="sm" iconLeading={Plus}>
                New Post
            </Button>
        </div>
    );

    return (
        <SiteLayout 
            title="Feed"
            description="Discover what's happening"
            currentPath="/site/feed"
        >
            <div className="overflow-y-auto">
                <div className="py-6">
                {/* Feed Stats */}
                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                            <TrendUp01 className="h-5 w-5 text-brand-secondary" />
                        </div>
                            <div>
                                <p className="text-sm text-tertiary">Trending Posts</p>
                                <p className="text-lg font-semibold text-primary">24</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                                <Users01 className="h-5 w-5 text-brand-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-tertiary">Active Users</p>
                                <p className="text-lg font-semibold text-primary">1,234</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                                <Eye className="h-5 w-5 text-brand-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-tertiary">Total Views</p>
                                <p className="text-lg font-semibold text-primary">12.5K</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Feed */}
                <div className="space-y-6">
                    {[
                        {
                            id: 1,
                            author: {
                                name: "Sarah Wilson",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                                username: "@sarahw"
                            },
                            content: "Just launched our new product! So excited to share this journey with everyone. The team has been working incredibly hard to make this happen.",
                            image: null,
                            timestamp: "2 hours ago",
                            likes: 24,
                            comments: 8,
                            shares: 3,
                            tags: ["product", "launch", "startup"]
                        },
                        {
                            id: 2,
                            author: {
                                name: "Mike Johnson",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                                username: "@mikej"
                            },
                            content: "Great insights from today's conference. The future of web development is looking amazing! Here are my key takeaways from the event.",
                            image: "https://picsum.photos/600/300",
                            timestamp: "4 hours ago",
                            likes: 45,
                            comments: 12,
                            shares: 7,
                            tags: ["conference", "webdev", "insights"]
                        },
                        {
                            id: 3,
                            author: {
                                name: "Emily Chen",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                                username: "@emilyc"
                            },
                            content: "Working on some exciting new designs today. The creative process is always so inspiring and challenging at the same time.",
                            image: null,
                            timestamp: "6 hours ago",
                            likes: 18,
                            comments: 5,
                            shares: 2,
                            tags: ["design", "creative", "inspiration"]
                        },
                        {
                            id: 4,
                            author: {
                                name: "David Rodriguez",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                                username: "@davidr"
                            },
                            content: "Amazing team collaboration today! We solved a complex problem that we've been working on for weeks. Teamwork makes the dream work!",
                            image: "https://picsum.photos/600/250",
                            timestamp: "8 hours ago",
                            likes: 32,
                            comments: 15,
                            shares: 6,
                            tags: ["teamwork", "collaboration", "success"]
                        }
                    ].map((post) => (
                        <div key={post.id} className="rounded-xl border border-secondary bg-primary p-6">
                            {/* Post Header */}
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        size="md"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-primary">{post.author.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-tertiary">
                                            <span>{post.author.username}</span>
                                            <span>•</span>
                                            <span>{post.timestamp}</span>
                                        </div>
                                    </div>
                                </div>
                                <ButtonUtility
                                    size="sm"
                                    color="tertiary"
                                    icon={Bookmark}
                                    tooltip="Save Post"
                                />
                            </div>

                            {/* Post Content */}
                            <div className="mb-4">
                                <p className="text-secondary leading-relaxed">{post.content}</p>
                            </div>

                            {/* Post Image */}
                            {post.image && (
                                <div className="mb-4">
                                    <img
                                        src={post.image}
                                        alt="Post image"
                                        className="w-full rounded-lg"
                                    />
                                </div>
                            )}

                            {/* Post Tags */}
                            <div className="mb-4 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} color="gray" size="sm">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Post Actions */}
                            <div className="flex items-center justify-between border-t border-secondary pt-4">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 text-sm text-tertiary transition-colors hover:text-brand-secondary">
                                        <Heart className="h-4 w-4" />
                                        <span>{post.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-sm text-tertiary transition-colors hover:text-brand-secondary">
                                        <MessageCircle01 className="h-4 w-4" />
                                        <span>{post.comments}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-sm text-tertiary transition-colors hover:text-brand-secondary">
                                        <Share04 className="h-4 w-4" />
                                        <span>{post.shares}</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ButtonUtility
                                        size="sm"
                                        color="tertiary"
                                        icon={Heart}
                                        tooltip="Like"
                                    />
                                    <ButtonUtility
                                        size="sm"
                                        color="tertiary"
                                        icon={MessageCircle01}
                                        tooltip="Comment"
                                    />
                                    <ButtonUtility
                                        size="sm"
                                        color="tertiary"
                                        icon={Share04}
                                        tooltip="Share"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="mt-8 text-center">
                    <Button size="md" color="secondary">
                        Load More Posts
                    </Button>
                </div>
            </div>
            </div>
        </SiteLayout>
    );
}; 