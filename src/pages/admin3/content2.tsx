import React, { useState } from "react";
import { useLocation } from "react-router";
import {
    Calendar,
    MessageChatCircle,
    Building05,
    Tag01,
    Settings01,
    Plus,
    SearchLg,
    Eye,
    Edit01,
    Trash01,
    CheckDone01,
    BarChartSquare02,
    Users01,
    Folder,
    File05,
    ChevronDown,
    DotsHorizontal,
    FilterLines,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { TreeView, type TreeNode } from "@/components/ui/tree-view";
import { Table } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";

// Sample posts data
const samplePosts = [
    {
        id: 1,
        title: "Native Events",
        author: {
            name: "Mo Malayeri",
            avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
        },
        space: "Roadmap",
        publishedAt: "08/06/2025",
        replies: 2,
        reactions: 5,
        status: "Published",
    },
    {
        id: 2,
        title: "Member groups",
        author: {
            name: "Alice Huff",
            avatar: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
        },
        space: "Wishlist",
        publishedAt: "08/06/2025",
        replies: 0,
        reactions: 1,
        status: "Draft",
    },
    {
        id: 3,
        title: "Image text in Content if an image",
        author: {
            name: "agudecar",
            avatar: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80"
        },
        space: "Ask the Community",
        publishedAt: "08/06/2025",
        replies: 0,
        reactions: 0,
        status: "Published",
    },
    {
        id: 4,
        title: "How to Create Polls in Bettermode",
        author: {
            name: "Dan Aaron Pena",
            avatar: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80"
        },
        space: "Content Management",
        publishedAt: "08/05/2025",
        replies: 0,
        reactions: 1,
        status: "Published",
    },
    {
        id: 5,
        title: "Introducing Polls 📊",
        author: {
            name: "Ali Shabani",
            avatar: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
        },
        space: "Product Updates",
        publishedAt: "08/05/2025",
        replies: 25,
        reactions: 24,
        status: "Draft",
    },
];

// Sample events data
const sampleEvents = [
    {
        id: 1,
        title: "Annual Tech Conference 2024",
        organizer: {
            name: "Sarah Johnson",
            avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
        },
        location: "San Francisco, CA",
        space: "Technology Events",
        eventDate: "15/08/2025",
        attendees: 250,
        capacity: 300,
        status: "Published",
    },
    {
        id: 2,
        title: "Product Launch Event",
        organizer: {
            name: "Mike Chen",
            avatar: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
        },
        location: "New York, NY",
        space: "Product Updates",
        eventDate: "22/08/2025",
        attendees: 150,
        capacity: 200,
        status: "Draft",
    },
    {
        id: 3,
        title: "Team Building Workshop",
        organizer: {
            name: "Emma Davis",
            avatar: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80"
        },
        location: "Online",
        space: "HR Events",
        eventDate: "10/09/2025",
        attendees: 75,
        capacity: 100,
        status: "Published",
    },
    {
        id: 4,
        title: "Quarterly Business Review",
        organizer: {
            name: "David Wilson",
            avatar: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80"
        },
        location: "Los Angeles, CA",
        space: "Business Events",
        eventDate: "05/09/2025",
        attendees: 100,
        capacity: 150,
        status: "Published",
    },
    {
        id: 5,
        title: "Developer Meetup",
        organizer: {
            name: "Lisa Park",
            avatar: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
        },
        location: "Austin, TX",
        space: "Developer Community",
        eventDate: "18/09/2025",
        attendees: 80,
        capacity: 120,
        status: "Draft",
    },
];

// Sample spaces data
const sampleSpaces = [
    {
        id: 1,
        title: "Technology Hub",
        description: "A space for all tech-related discussions and events",
        membersCount: 145,
        postsCount: 89,
        createdAt: "15/07/2025",
        isPrivate: false,
        status: "Active"
    },
    {
        id: 2,
        title: "Product Updates",
        description: "Latest product announcements and updates",
        membersCount: 230,
        postsCount: 156,
        createdAt: "10/07/2025",
        isPrivate: true,
        status: "Active"
    },
    {
        id: 3,
        title: "Community Feedback",
        description: "Share your feedback and suggestions",
        membersCount: 78,
        postsCount: 45,
        createdAt: "05/08/2025",
        isPrivate: false,
        status: "Draft"
    },
    {
        id: 4,
        title: "Developer Resources",
        description: "Tools, guides, and resources for developers",
        membersCount: 312,
        postsCount: 278,
        createdAt: "20/06/2025",
        isPrivate: true,
        status: "Active"
    },
    {
        id: 5,
        title: "General Discussion",
        description: "Open discussions about anything and everything",
        membersCount: 456,
        postsCount: 589,
        createdAt: "01/06/2025",
        isPrivate: false,
        status: "Active"
    },
];

// Sample tags data
const sampleTags = [
    {
        id: 1,
        title: "JavaScript",
        slug: "javascript",
        description: "All things JavaScript programming",
        status: "Active"
    },
    {
        id: 2,
        title: "React",
        slug: "react",
        description: "React framework discussions and tutorials",
        status: "Active"
    },
    {
        id: 3,
        title: "Design Systems",
        slug: "design-systems",
        description: "UI/UX design patterns and systems",
        status: "Draft"
    },
    {
        id: 4,
        title: "Product Management",
        slug: "product-management",
        description: "Product strategy and management topics",
        status: "Active"
    },
    {
        id: 5,
        title: "Career Advice",
        slug: "career-advice",
        description: "Professional development and career guidance",
        status: "Active"
    },
];

// Sample tree data structure
const contentTreeData: TreeNode[] = [
    {
        id: "contents",
        label: "Contents",
        icon: <Folder className="size-5 text-fg-quaternary" />,
        children: [
            {
                id: "events",
                label: "Events",
                icon: <Calendar className="size-5 text-fg-quaternary" />,
                showAddButton: true,
                children: [
                    {
                        id: "event1",
                        label: "Annual Conference 2024",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: true,
                    },
                    {
                        id: "event2",
                        label: "Product Launch Event",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: false,
                    },
                    {
                        id: "event3",
                        label: "Team Building Workshop",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: true,
                    },
                ],
            },
            {
                id: "discussion",
                label: "Discussion",
                icon: <MessageChatCircle className="size-5 text-fg-quaternary" />,
                showAddButton: true,
                children: [
                    {
                        id: "discussion1",
                        label: "General Discussion",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: true,
                    },
                    {
                        id: "discussion2",
                        label: "Feature Requests",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: true,
                    },
                    {
                        id: "discussion3",
                        label: "Bug Reports",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: false,
                    },
                ],
            },
        ],
    },
    {
        id: "spaces",
        label: "Spaces",
        icon: <Building05 className="size-5 text-fg-quaternary" />,
        showAddButton: true,
        children: [
            {
                id: "spaces-events",
                label: "Events",
                icon: <Calendar className="size-5 text-fg-quaternary" />,
                showAddButton: true,
                children: [
                    {
                        id: "space-event1",
                        label: "Marketing Events",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: true,
                    },
                    {
                        id: "space-event2",
                        label: "Engineering Events",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: false,
                    },
                ],
            },
            {
                id: "spaces-discussion",
                label: "Discussion",
                icon: <MessageChatCircle className="size-5 text-fg-quaternary" />,
                showAddButton: true,
                children: [
                    {
                        id: "space-discussion1",
                        label: "Team Discussions",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: true,
                    },
                    {
                        id: "space-discussion2",
                        label: "Project Updates",
                        icon: <File05 className="size-5 text-fg-quaternary" />,
                        showToggleButton: true,
                        toggleState: true,
                    },
                ],
            },
        ],
    },
    {
        id: "tag",
        label: "Tag",
        icon: <Tag01 className="size-5 text-fg-quaternary" />,
        showAddButton: true,
        children: [
            {
                id: "tag1",
                label: "Technology",
                icon: <File05 className="size-5 text-fg-quaternary" />,
                showToggleButton: true,
                toggleState: true,
            },
            {
                id: "tag2",
                label: "Business",
                icon: <File05 className="size-5 text-fg-quaternary" />,
                showToggleButton: true,
                toggleState: true,
            },
            {
                id: "tag3",
                label: "Design",
                icon: <File05 className="size-5 text-fg-quaternary" />,
                showToggleButton: true,
                toggleState: false,
            },
            {
                id: "tag4",
                label: "Marketing",
                icon: <File05 className="size-5 text-fg-quaternary" />,
                showToggleButton: true,
                toggleState: true,
            },
        ],
    },
    {
        id: "cms",
        label: "CMS",
        icon: <Settings01 className="size-5 text-fg-quaternary" />,
        showAddButton: true,
        children: [
            {
                id: "cms1",
                label: "Page Templates",
                icon: <File05 className="size-5 text-fg-quaternary" />,
                showToggleButton: true,
                toggleState: true,
            },
            {
                id: "cms2",
                label: "Content Blocks",
                icon: <File05 className="size-5 text-fg-quaternary" />,
                showToggleButton: true,
                toggleState: false,
            },
            {
                id: "cms3",
                label: "Media Library",
                icon: <File05 className="size-5 text-fg-quaternary" />,
                showToggleButton: true,
                toggleState: true,
            },
        ],
    },
];

export const AdminContent2Page = () => {
    const location = useLocation();
    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
    const [expandedNodes, setExpandedNodes] = useState<string[]>(['contents', 'spaces']);

    const handleNodeClick = (node: TreeNode) => {
        console.log("Node clicked:", node.label);
    };

    const handleNodeExpand = (nodeId: string, expanded: boolean) => {
        setExpandedNodes(prev => 
            expanded 
                ? [...prev, nodeId]
                : prev.filter(id => id !== nodeId)
        );
    };

    const handleToggleChange = (nodeId: string, isToggled: boolean) => {
        console.log(`Toggle changed for ${nodeId}:`, isToggled);
    };

    const handleSelectionChange = (selectedIds: string[]) => {
        setSelectedNodes(selectedIds);
    };

    // Check if we're on a specific content type page
    const isEventsPage = location.pathname === '/admin/content2/events';
    const isPostsPage = location.pathname === '/admin/content2/posts';
    const isSpacesPage = location.pathname === '/admin/content2/spaces';
    const isTagPage = location.pathname === '/admin/content2/tag';
    const isCmsPage = location.pathname === '/admin/content2/cms';
    
    // Show content management table for specific pages
    const showContentTable = isEventsPage || isPostsPage || isSpacesPage || isTagPage;

    const getPageTitle = () => {
        if (isEventsPage) return "Events";
        if (isPostsPage) return "Posts";
        if (isSpacesPage) return "Spaces";
        if (isTagPage) return "Tags";
        if (isCmsPage) return "CMS";
        return "Content 2";
    };

    const getPageDescription = () => {
        if (isEventsPage) return "Manage and organize all your event content";
        if (isPostsPage) return "Manage and organize all your posts and discussions";
        if (isSpacesPage) return "Manage and organize your spaces";
        if (isTagPage) return "Manage and organize your tags";
        if (isCmsPage) return "Manage your CMS content";
        return "Organize and manage your content structure with hierarchical organization";
    };

    if (showContentTable) {
        return (
            <AdminLayout 
                title={`Content - ${getPageTitle()}`}
                description={getPageDescription()}
                currentPath={location.pathname}
                hideHeader={true}
            >
                <div className="px-4 py-6 lg:px-6">
                    <div className="flex flex-col p-1 space-y-3 overflow-hidden">
                        {/* Header Section */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-primary whitespace-nowrap">{getPageTitle()}</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-80">
                                    <div className="relative">
                                        <SearchLg className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-fg-quaternary" />
                                        <Input
                                            placeholder="Search..."
                                            className="w-full pl-10"
                                        />
                                    </div>
                                </div>
                                <Button 
                                    color="secondary" 
                                    iconLeading={FilterLines}
                                    iconTrailing={ChevronDown}
                                >
                                    Fields
                                </Button>
                                <Button 
                                    color="primary"
                                    className="whitespace-nowrap"
                                >
                                    {isSpacesPage ? "Add space" : isTagPage ? "Add tag" : "Add post"}
                                </Button>
                            </div>
                        </div>

                        {/* Filter Section - Only show for Posts */}
                        {isPostsPage && (
                            <div className="flex flex-wrap gap-3 items-center">
                                <Button 
                                    color="secondary" 
                                    className="whitespace-nowrap"
                                >
                                    <span className="flex items-center gap-2">
                                        All post types
                                        <ChevronDown className="size-4" />
                                    </span>
                                </Button>
                                <Button 
                                    color="secondary" 
                                    className="whitespace-nowrap"
                                >
                                    <span className="flex items-center gap-2">
                                        Add filter
                                        <ChevronDown className="size-4" />
                                    </span>
                                </Button>
                            </div>
                        )}

                        {/* Stats and Actions */}
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-primary whitespace-nowrap">
                                {isEventsPage ? `${sampleEvents.length} events` : 
                                 isPostsPage ? `${samplePosts.length} posts` :
                                 isSpacesPage ? `${sampleSpaces.length} spaces` :
                                 isTagPage ? `${sampleTags.length} tags` : '0 items'}
                            </span>
                            {isPostsPage && (
                                <Button 
                                    color="secondary" 
                                    className="whitespace-nowrap"
                                >
                                    <span className="flex items-center gap-2">
                                        Actions
                                        <ChevronDown className="size-4" />
                                    </span>
                                </Button>
                            )}
                        </div>

                        {/* Table */}
                        <div className="border border-secondary rounded-xl bg-primary shadow-xs overflow-hidden">
                            <div className="relative overflow-x-auto">
                                <table className="min-w-full divide-y divide-secondary table-fixed">
                                    <thead className="bg-primary">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary whitespace-nowrap w-64">
                                                {isEventsPage ? "Event Title" : 
                                                 isSpacesPage ? "Space Name" :
                                                 isTagPage ? "Tag Name" : "Title"}
                                            </th>
                                            {!isSpacesPage && !isTagPage && (
                                                <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary whitespace-nowrap w-32">
                                                    <button className="flex items-center text-brand-secondary hover:text-brand-secondary_hover">
                                                        Status
                                                    </button>
                                                </th>
                                            )}
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary whitespace-nowrap w-48">
                                                {isEventsPage ? "Organizer" : 
                                                 isSpacesPage ? "Members count" :
                                                 isTagPage ? "Slug" : "Author"}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary whitespace-nowrap w-48">
                                                {isEventsPage ? "Location" : 
                                                 isSpacesPage ? "Posts count" :
                                                 isTagPage ? "Description" : "Space"}
                                            </th>
                                            {isEventsPage && (
                                                <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary whitespace-nowrap w-48">
                                                    <button className="flex items-center text-brand-secondary hover:text-brand-secondary_hover">
                                                        Spaces
                                                    </button>
                                                </th>
                                            )}
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary whitespace-nowrap w-32">
                                                <button className="flex items-center text-brand-secondary hover:text-brand-secondary_hover">
                                                    {isEventsPage ? "Event Date" : 
                                                     isSpacesPage ? "Created at" :
                                                     isTagPage ? "" : "Published at"}
                                                    <ChevronDown className="ml-1 w-4 h-4" />
                                                </button>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary whitespace-nowrap w-32">
                                                <button className="flex items-center text-brand-secondary hover:text-brand-secondary_hover">
                                                    {isEventsPage ? "Attendees" : 
                                                     isSpacesPage ? "Private" :
                                                     isTagPage ? "" : "Replies"}
                                                </button>
                                            </th>
                                            {!isSpacesPage && !isTagPage && (
                                                <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary whitespace-nowrap w-32">
                                                    <button className="flex items-center text-brand-secondary hover:text-brand-secondary_hover">
                                                        {isEventsPage ? "Capacity" : "Reactions"}
                                                    </button>
                                                </th>
                                            )}
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary whitespace-nowrap w-8 sticky right-0 bg-primary">
                                                &nbsp;
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary bg-primary">
                                        {(isEventsPage ? sampleEvents : 
                                          isPostsPage ? samplePosts :
                                          isSpacesPage ? sampleSpaces :
                                          isTagPage ? sampleTags : []).map((item) => (
                                            <tr key={item.id} className="hover:bg-secondary/20">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="overflow-hidden truncate w-64">
                                                        <button className="text-brand-secondary hover:text-brand-secondary_hover hover:underline text-left">
                                                            {item.title}
                                                        </button>
                                                    </div>
                                                </td>
                                                {!isSpacesPage && !isTagPage && (
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="overflow-hidden truncate w-32">
                                                            <Badge color={(item as any).status === 'Published' ? 'success' : 'warning'} size="sm">
                                                                {(item as any).status}
                                                            </Badge>
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="overflow-hidden truncate w-48">
                                                        {isSpacesPage ? (
                                                            <span className="text-sm text-primary">
                                                                {(item as any).membersCount}
                                                            </span>
                                                        ) : isTagPage ? (
                                                            <span className="text-sm text-tertiary font-mono">
                                                                {(item as any).slug}
                                                            </span>
                                                        ) : (
                                                            <div className="flex items-center gap-2 bg-secondary/40 text-tertiary px-2 py-1 rounded-md max-w-full">
                                                                <Avatar 
                                                                    src={isEventsPage ? (item as any).organizer.avatar : (item as any).author.avatar} 
                                                                    alt={isEventsPage ? (item as any).organizer.name : (item as any).author.name}
                                                                    size="sm"
                                                                    className="shrink-0"
                                                                />
                                                                <span className="min-w-0 truncate text-sm">
                                                                    {isEventsPage ? (item as any).organizer.name : (item as any).author.name}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="overflow-hidden truncate w-48">
                                                        {isTagPage ? (
                                                            <span className="text-sm text-tertiary">
                                                                {(item as any).description}
                                                            </span>
                                                        ) : (
                                                            <button className="text-brand-secondary hover:text-brand-secondary_hover">
                                                                <div className="truncate">
                                                                    {isEventsPage ? (item as any).location : 
                                                                     isSpacesPage ? (item as any).postsCount :
                                                                     (item as any).space}
                                                                </div>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                                {isEventsPage && (
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="overflow-hidden truncate w-48">
                                                            <button className="text-brand-secondary hover:text-brand-secondary_hover">
                                                                <div className="truncate">{(item as any).space}</div>
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}

                                                {!isTagPage && (
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="overflow-hidden truncate w-32">
                                                            <div title={isEventsPage ? (item as any).eventDate : 
                                                                       isSpacesPage ? (item as any).createdAt :
                                                                       (item as any).publishedAt}>
                                                                {isEventsPage ? (item as any).eventDate : 
                                                                 isSpacesPage ? (item as any).createdAt :
                                                                 (item as any).publishedAt}
                                                            </div>
                                                        </div>
                                                    </td>
                                                )}
                                                {!isTagPage && (
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="overflow-hidden truncate w-32">
                                                            {isEventsPage ? (item as any).attendees : 
                                                             isSpacesPage ? (
                                                                <Badge color={(item as any).isPrivate ? 'warning' : 'success'} size="sm">
                                                                    {(item as any).isPrivate ? 'Private' : 'Public'}
                                                                </Badge>
                                                             ) :
                                                             (item as any).replies}
                                                        </div>
                                                    </td>
                                                )}
                                                {!isSpacesPage && !isTagPage && (
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="overflow-hidden truncate w-32">
                                                            {isEventsPage ? (item as any).capacity : ((item as any).reactions || 0)}
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap sticky right-0 bg-primary">
                                                    <div className="w-8">
                                                        <ButtonUtility
                                                            size="sm"
                                                            color="tertiary"
                                                            icon={DotsHorizontal}
                                                            className="w-6 h-6 p-1"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    // Show empty state for CMS page
    if (isCmsPage) {
        return (
            <AdminLayout 
                title="Content - CMS"
                description="Content Management System configuration"
                currentPath={location.pathname}
                hideHeader={true}
            >
                <div className="px-4 py-6 lg:px-6">
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                        <div className="max-w-md mx-auto">
                            <div className="mb-6">
                                <Settings01 className="mx-auto size-16 text-fg-quaternary" />
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-3">
                                CMS Configuration
                            </h3>
                            <p className="text-md text-tertiary leading-relaxed">
                                No changes will be made for this scope. 
                            </p>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout 
            title="Content 2 Management"
            description="Manage content structure, events, discussions, spaces, tags and CMS"
            currentPath="/admin/content2"
            hideHeader={false}
        >
            <div className="px-4 py-6 lg:px-6">
                <div className="mx-auto max-w-7xl">
                    {/* Header Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-display-sm font-semibold text-primary">Content 2</h1>
                                <p className="mt-1 text-md text-tertiary">
                                    Organize and manage your content structure with hierarchical organization
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="relative">
                                        <SearchLg className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-fg-quaternary" />
                                        <Input
                                            placeholder="Search content..."
                                            className="w-80 pl-10"
                                        />
                                    </div>
                                </div>
                                <Button 
                                    color="primary" 
                                    iconLeading={<Plus className="size-5" />}
                                >
                                    Add Content
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary ring-inset">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Calendar className="size-8 text-brand-secondary" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-tertiary">Total Events</p>
                                    <p className="text-2xl font-semibold text-primary">24</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary ring-inset">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MessageChatCircle className="size-8 text-brand-secondary" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-tertiary">Discussions</p>
                                    <p className="text-2xl font-semibold text-primary">156</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary ring-inset">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Building05 className="size-8 text-brand-secondary" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-tertiary">Spaces</p>
                                    <p className="text-2xl font-semibold text-primary">8</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary ring-inset">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Tag01 className="size-8 text-brand-secondary" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-tertiary">Tags</p>
                                    <p className="text-2xl font-semibold text-primary">42</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tree View Section */}
                    <div className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset">
                        <div className="border-b border-secondary px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-primary">Content Structure</h2>
                                <div className="flex items-center gap-2">
                                    <Badge color="gray" size="sm">
                                        {selectedNodes.length} selected
                                    </Badge>
                                    <ButtonUtility 
                                        size="sm" 
                                        color="tertiary" 
                                        icon={Eye}
                                        tooltip="View selected"
                                    />
                                    <ButtonUtility 
                                        size="sm" 
                                        color="tertiary" 
                                        icon={Edit01}
                                        tooltip="Edit selected"
                                    />
                                    <ButtonUtility 
                                        size="sm" 
                                        color="tertiary" 
                                        icon={Trash01}
                                        tooltip="Delete selected"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <TreeView
                                data={contentTreeData}
                                onNodeClick={handleNodeClick}
                                onNodeExpand={handleNodeExpand}
                                onToggleChange={handleToggleChange}
                                onSelectionChange={handleSelectionChange}
                                selectedIds={selectedNodes}
                                expandedIds={expandedNodes}
                                multiSelect={true}
                                showLines={true}
                                showIcons={true}
                                animateExpand={true}
                                className="bg-transparent border-0 shadow-none"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-end gap-3">
                        <Button color="secondary">
                            Export Structure
                        </Button>
                        <Button color="primary">
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};