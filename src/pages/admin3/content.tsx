import { useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { Eye, Edit03, Move, BarChart03, ClipboardCheck, EyeOff, Trash01, AlertTriangle, Settings01 } from "@untitledui/icons";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";

// Sample content data
const contentData = {
    items: [
        {
            id: "1",
            title: "Getting Started with React",
            description: "A comprehensive guide to building modern web applications",
            author: {
                name: "John Doe",
                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
            },
            status: "Published",
            space: "Tech Blog",
            posttype: "Article",
            tags: ["React", "JavaScript", "Tutorial"],
            publishedAt: "2024-01-15T10:30:00Z",
            replies: 24,
            reactions: 156,
            slug: "getting-started-react",
            locked: false,
            hidden: false
        },
        {
            id: "2", 
            title: "Advanced TypeScript Patterns",
            description: "Deep dive into advanced TypeScript concepts and patterns",
            author: {
                name: "Jane Smith",
                avatar: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80"
            },
            status: "Draft",
            space: "Development",
            posttype: "Tutorial",
            tags: ["TypeScript", "Advanced", "Patterns"],
            publishedAt: null,
            replies: 0,
            reactions: 0,
            slug: "advanced-typescript-patterns",
            locked: false,
            hidden: false
        },
        {
            id: "3",
            title: "UI Design Best Practices",
            description: "Essential principles for creating beautiful user interfaces",
            author: {
                name: "Sarah Wilson",
                avatar: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80"
            },
            status: "Scheduled",
            space: "Design Hub",
            posttype: "Guide",
            tags: ["UI", "Design", "Best Practices"],
            publishedAt: "2024-02-01T09:00:00Z",
            replies: 8,
            reactions: 89,
            slug: "ui-design-best-practices",
            locked: true,
            hidden: false
        },
        {
            id: "4",
            title: "Building Scalable APIs",
            description: "How to design and implement APIs that can handle growth",
            author: {
                name: "Mike Johnson",
                avatar: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
            },
            status: "Published",
            space: "Backend",
            posttype: "Technical",
            tags: ["API", "Scalability", "Backend"],
            publishedAt: "2024-01-20T14:15:00Z",
            replies: 42,
            reactions: 234,
            slug: "building-scalable-apis",
            locked: false,
            hidden: true
        },
        {
            id: "5",
            title: "Mobile-First Design Strategy",
            description: "Implementing effective mobile-first design approaches",
            author: {
                name: "Lisa Chen",
                avatar: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
            },
            status: "Published",
            space: "UX Research",
            posttype: "Case Study",
            tags: ["Mobile", "Design", "Strategy"],
            publishedAt: "2024-01-10T11:45:00Z",
            replies: 16,
            reactions: 127,
            slug: "mobile-first-design-strategy",
            locked: false,
            hidden: false
        }
    ]
};

const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", 
        day: "numeric"
    });
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "Published":
            return "success";
        case "Draft":
            return "gray";
        case "Scheduled":
            return "warning";
        default:
            return "gray";
    }
};

const ContentActionsDropdown = () => {
    return <TableRowActionsDropdown />;
};

export const AdminContentPage = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "publishedAt",
        direction: "descending",
    });

    const sortedItems = useMemo(() => {
        return contentData.items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Handle null values for publishedAt
            if (sortDescriptor.column === "publishedAt") {
                if (!first && !second) return 0;
                if (!first) return 1;
                if (!second) return -1;
                const firstDate = new Date(first as string).getTime();
                const secondDate = new Date(second as string).getTime();
                return sortDescriptor.direction === "descending" ? secondDate - firstDate : firstDate - secondDate;
            }

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? Number(second) - Number(first) : Number(first) - Number(second);
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor]);

    return (
        <AdminLayout 
            title="Content Management"
            description="Manage your posts, pages, media, and comments"
            currentPath="/admin/content"
        >
            <div className="p-4 ">
                <TableCard.Root>
                    <TableCard.Header
                        title="All Content"
                        description="Manage and organize all your content across different spaces and post types."
                        contentTrailing={
                            <div className="absolute top-5 right-4 md:right-6">
                                <ContentActionsDropdown />
                            </div>
                        }
                    />
                    <Table aria-label="Content management" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} className="min-w-[1400px]">
                        <Table.Header>
                            <Table.Head id="title" label="Title & Description" isRowHeader allowsSorting />
                            <Table.Head id="id" label="ID" allowsSorting className="w-20" />
                            <Table.Head id="author" label="Author" allowsSorting />
                            <Table.Head id="status" label="Status" allowsSorting />
                            <Table.Head id="space" label="Space" allowsSorting />
                            <Table.Head id="posttype" label="Post Type" allowsSorting />
                            <Table.Head id="tags" label="Tags" />
                            <Table.Head id="publishedAt" label="Published At" allowsSorting />
                            <Table.Head id="replies" label="Replies" allowsSorting className="w-20" />
                            <Table.Head id="reactions" label="Reactions" allowsSorting className="w-20" />
                            <Table.Head id="slug" label="Slug" className="min-w-40" />
                            <Table.Head id="locked" label="Locked" className="w-20" />
                            <Table.Head id="hidden" label="Hidden" className="w-20" />
                            <Table.Head id="actions" className="sticky right-0 bg-primary z-10 shadow-[-1px_0_0_0_theme(colors.border.secondary)]" />
                        </Table.Header>
                        <Table.Body items={sortedItems}>
                            {(item) => (
                                <Table.Row id={item.id}>
                                    <Table.Cell>
                                        <div className="min-w-60">
                                            <p className="text-sm font-medium text-primary line-clamp-1">{item.title}</p>
                                            <p className="text-sm text-tertiary line-clamp-2 mt-1">{item.description}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm font-mono text-tertiary">{item.id}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <Avatar src={item.author.avatar} alt={item.author.name} size="xs" />
                                            <span className="text-sm text-primary whitespace-nowrap">{item.author.name}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <BadgeWithDot size="sm" color={getStatusColor(item.status)}>
                                            {item.status}
                                        </BadgeWithDot>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-primary">{item.space}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-primary">{item.posttype}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-wrap gap-1 max-w-32">
                                            {item.tags.slice(0, 2).map((tag) => (
                                                <span 
                                                    key={tag}
                                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary_hover"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {item.tags.length > 2 && (
                                                <span className="text-xs text-tertiary">+{item.tags.length - 2}</span>
                                            )}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-primary whitespace-nowrap">{formatDate(item.publishedAt)}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-primary">{item.replies}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-primary">{item.reactions}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm font-mono text-tertiary">{item.slug}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className={`text-sm ${item.locked ? 'text-warning' : 'text-tertiary'}`}>
                                            {item.locked ? 'Yes' : 'No'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className={`text-sm ${item.hidden ? 'text-warning' : 'text-tertiary'}`}>
                                            {item.hidden ? 'Yes' : 'No'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell className="px-4 sticky right-0 bg-primary z-10 shadow-[-1px_0_0_0_theme(colors.border.secondary)]">
                                        <div className="flex items-center justify-end">
                                            <ContentActionsDropdown />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                    <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
                </TableCard.Root>
            </div>
        </AdminLayout>
    );
}; 