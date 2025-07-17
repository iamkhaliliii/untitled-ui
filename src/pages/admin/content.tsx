import {
    Archive,
    CheckDone01,
    Edit01,
    Grid03,
    Inbox01,
    Package,
    Plus,
    Rows01,
    SearchLg,
    Trash01,
    Eye,
    MessageCircle01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { AdminLayout } from "@/components/layouts/admin-layout";

export const AdminContentPage = () => {
    const headerActions = (
        <div className="flex items-center gap-2">
            <div className="relative">
                <Input
                    placeholder="Search content..."
                    className="w-64"
                    icon={SearchLg}
                />
            </div>
            <Button size="sm" iconLeading={Plus}>
                New Content
            </Button>
        </div>
    );

    return (
        <AdminLayout 
            title="Content Management"
            description="Manage your posts, pages, media, and comments"
            currentPath="/admin/content"
            headerActions={headerActions}
        >
            <div className="px-4 py-6 lg:px-6">
                {/* Stats Cards */}
                <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-tertiary">Total Posts</p>
                                <p className="text-2xl font-semibold text-primary">1,247</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                                <Package className="h-6 w-6 text-brand-secondary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <Badge color="success" size="sm">+12%</Badge>
                            <span className="text-sm text-tertiary">vs last month</span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-tertiary">Pages</p>
                                <p className="text-2xl font-semibold text-primary">89</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                                <Grid03 className="h-6 w-6 text-brand-secondary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <Badge color="success" size="sm">+3</Badge>
                            <span className="text-sm text-tertiary">new this week</span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-tertiary">Media Files</p>
                                <p className="text-2xl font-semibold text-primary">3,456</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                                <Archive className="h-6 w-6 text-brand-secondary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <Badge color="warning" size="sm">2.3GB</Badge>
                            <span className="text-sm text-tertiary">total size</span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-tertiary">Comments</p>
                                <p className="text-2xl font-semibold text-primary">567</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                                <Inbox01 className="h-6 w-6 text-brand-secondary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <BadgeWithDot color="warning" size="sm">15</BadgeWithDot>
                            <span className="text-sm text-tertiary">pending approval</span>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Posts */}
                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-primary">Recent Posts</h2>
                            <Button size="sm" color="tertiary" iconLeading={Plus}>
                                New Post
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {[
                                {
                                    title: "Getting Started with Content Management",
                                    status: "published",
                                    author: "John Doe",
                                    date: "2 hours ago",
                                    views: "1.2k",
                                    comments: 12,
                                },
                                {
                                    title: "Best Practices for SEO Optimization",
                                    status: "draft",
                                    author: "Jane Smith",
                                    date: "1 day ago",
                                    views: "890",
                                    comments: 8,
                                },
                                {
                                    title: "How to Create Engaging Content",
                                    status: "published",
                                    author: "Mike Johnson",
                                    date: "3 days ago",
                                    views: "2.1k",
                                    comments: 24,
                                },
                                {
                                    title: "Content Strategy for 2024",
                                    status: "scheduled",
                                    author: "Sarah Wilson",
                                    date: "Next week",
                                    views: "0",
                                    comments: 0,
                                },
                            ].map((post, index) => (
                                <div key={index} className="rounded-lg border border-secondary p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-primary line-clamp-1">
                                                {post.title}
                                            </h3>
                                            <div className="mt-2 flex items-center gap-3 text-sm text-tertiary">
                                                <span>by {post.author}</span>
                                                <span>•</span>
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="mt-2 flex items-center gap-4 text-sm text-tertiary">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-4 w-4" />
                                                    <span>{post.views}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MessageCircle01 className="h-4 w-4" />
                                                    <span>{post.comments}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                color={
                                                    post.status === "published"
                                                        ? "success"
                                                        : post.status === "draft"
                                                        ? "warning"
                                                        : "blue"
                                                }
                                                size="sm"
                                            >
                                                {post.status}
                                            </Badge>
                                            <ButtonUtility
                                                size="sm"
                                                color="tertiary"
                                                icon={Edit01}
                                                tooltip="Edit"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories & Comments */}
                    <div className="space-y-6">
                        {/* Categories */}
                        <div className="rounded-xl border border-secondary bg-primary p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-primary">Categories</h2>
                                <Button size="sm" color="tertiary" iconLeading={Plus}>
                                    Add Category
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: "Technology", posts: 45, color: "blue" },
                                    { name: "Business", posts: 32, color: "green" },
                                    { name: "Design", posts: 28, color: "purple" },
                                    { name: "Marketing", posts: 19, color: "orange" },
                                    { name: "Development", posts: 15, color: "red" },
                                ].map((category, index) => (
                                    <div key={index} className="flex items-center justify-between rounded-lg border border-secondary p-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-3 w-3 rounded-full bg-${category.color}-500`} />
                                            <span className="font-medium text-primary">{category.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="gray" size="sm">
                                                {category.posts} posts
                                            </Badge>
                                            <ButtonUtility
                                                size="sm"
                                                color="tertiary"
                                                icon={Edit01}
                                                tooltip="Edit"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Comments */}
                        <div className="rounded-xl border border-secondary bg-primary p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-primary">Recent Comments</h2>
                                <BadgeWithDot color="warning" size="sm">
                                    15 pending
                                </BadgeWithDot>
                            </div>
                            <div className="space-y-4">
                                {[
                                    {
                                        author: "Alex Thompson",
                                        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                                        comment: "Great article! Very informative and well-written.",
                                        post: "Getting Started with Content Management",
                                        time: "2 hours ago",
                                        status: "approved",
                                    },
                                    {
                                        author: "Maria Garcia",
                                        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                                        comment: "I have a question about the implementation details...",
                                        post: "Best Practices for SEO Optimization",
                                        time: "5 hours ago",
                                        status: "pending",
                                    },
                                    {
                                        author: "David Chen",
                                        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                                        comment: "Thanks for sharing this! Exactly what I needed.",
                                        post: "How to Create Engaging Content",
                                        time: "1 day ago",
                                        status: "approved",
                                    },
                                ].map((comment, index) => (
                                    <div key={index} className="rounded-lg border border-secondary p-4">
                                        <div className="flex items-start gap-3">
                                            <Avatar
                                                src={comment.avatar}
                                                alt={comment.author}
                                                size="sm"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-primary">{comment.author}</span>
                                                    <Badge
                                                        color={comment.status === "approved" ? "success" : "warning"}
                                                        size="sm"
                                                    >
                                                        {comment.status}
                                                    </Badge>
                                                </div>
                                                <p className="mt-1 text-sm text-secondary line-clamp-2">
                                                    {comment.comment}
                                                </p>
                                                <div className="mt-2 flex items-center gap-2 text-xs text-tertiary">
                                                    <span>on "{comment.post}"</span>
                                                    <span>•</span>
                                                    <span>{comment.time}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ButtonUtility
                                                    size="sm"
                                                    color="tertiary"
                                                    icon={CheckDone01}
                                                    tooltip="Approve"
                                                />
                                                <ButtonUtility
                                                    size="sm"
                                                    color="tertiary"
                                                    icon={Trash01}
                                                    tooltip="Delete"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 rounded-xl border border-secondary bg-primary p-6">
                    <h2 className="mb-6 text-lg font-semibold text-primary">Quick Actions</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Button size="sm" color="primary" iconLeading={Plus} className="w-full">
                            Create New Post
                        </Button>
                        <Button size="sm" color="secondary" iconLeading={Grid03} className="w-full">
                            Create New Page
                        </Button>
                        <Button size="sm" color="tertiary" iconLeading={Archive} className="w-full">
                            Upload Media
                        </Button>
                        <Button size="sm" color="tertiary" iconLeading={Rows01} className="w-full">
                            Manage Categories
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}; 