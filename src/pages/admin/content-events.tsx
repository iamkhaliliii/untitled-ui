import { useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import { useNavigate } from "react-router";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { Ticket01, Edit03, Move, BarChart03, ClipboardCheck, Trash01, AlertTriangle, Calendar, Copy01, Plus } from "@untitledui/icons";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { EventDetailSlideout } from "@/components/application/slideout-menus/event-detail-slideout";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button } from "@/components/base/buttons/button";

// Sample events data
const eventsData = {
    items: [
        {
            id: "1",
            title: "React Conference 2024",
            description: "Annual conference featuring the latest React developments and best practices",
            organizer: {
                name: "Tech Events Co.",
                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
            },
            status: "Published",
            location: "San Francisco, CA",
            eventType: "Conference",
            tags: ["React", "Technology", "Networking"],
            eventDate: "2024-03-15T09:00:00Z",
            attendees: 156,
            capacity: 300,
            slug: "react-conference-2024",
            locked: false,
            hidden: false
        },
        {
            id: "2", 
            title: "TypeScript Workshop",
            description: "Hands-on workshop covering advanced TypeScript patterns and best practices",
            organizer: {
                name: "Jane Smith",
                avatar: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80"
            },
            status: "Draft",
            location: "Online",
            eventType: "Workshop",
            tags: ["TypeScript", "Advanced", "Hands-on"],
            eventDate: null,
            attendees: 0,
            capacity: 50,
            slug: "typescript-workshop",
            locked: false,
            hidden: false
        },
        {
            id: "3",
            title: "UI/UX Design Meetup",
            description: "Monthly meetup for designers to share insights and network",
            organizer: {
                name: "Sarah Wilson",
                avatar: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80"
            },
            status: "Scheduled",
            location: "New York, NY",
            eventType: "Meetup",
            tags: ["UI", "UX", "Design"],
            eventDate: "2024-02-20T18:00:00Z",
            attendees: 42,
            capacity: 80,
            slug: "ui-ux-design-meetup",
            locked: true,
            hidden: false
        },
        {
            id: "4",
            title: "API Development Bootcamp",
            description: "Intensive 3-day bootcamp on building scalable APIs",
            organizer: {
                name: "Mike Johnson",
                avatar: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
            },
            status: "Published",
            location: "Austin, TX",
            eventType: "Bootcamp",
            tags: ["API", "Backend", "Development"],
            eventDate: "2024-04-10T09:00:00Z",
            attendees: 89,
            capacity: 120,
            slug: "api-development-bootcamp",
            locked: false,
            hidden: true
        },
        {
            id: "5",
            title: "Mobile Development Summit",
            description: "Summit focusing on mobile app development trends and technologies",
            organizer: {
                name: "Lisa Chen",
                avatar: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
            },
            status: "Published",
            location: "Seattle, WA",
            eventType: "Summit",
            tags: ["Mobile", "iOS", "Android"],
            eventDate: "2024-05-25T08:30:00Z",
            attendees: 234,
            capacity: 400,
            slug: "mobile-development-summit",
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
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
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

const EventsActions = ({ onViewDetails }: { onViewDetails: () => void }) => (
    <div className="flex items-center gap-2">
        <button
            onClick={onViewDetails}
            className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 transition-colors"
            aria-label="View Details"
        >
            <Ticket01 className="size-4" />
        </button>
        
        <Dropdown.Root>
            <Dropdown.DotsButton />

            <Dropdown.Popover className="w-min">
                <Dropdown.Menu>
                    <Dropdown.Item icon={Edit03}>
                        <span className="pr-4">Edit</span>
                    </Dropdown.Item>
                    <Dropdown.Item icon={Copy01}>
                        <span className="pr-4">Copy link</span>
                    </Dropdown.Item>
                    <Dropdown.Item icon={Trash01}>
                        <span className="pr-4">Delete</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    </div>
);

export const AdminContentEventsPage = () => {
    const navigate = useNavigate();
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "eventDate",
        direction: "ascending",
    });
    const [selectedEvent, setSelectedEvent] = useState<typeof eventsData.items[0] | null>(null);
    const [isSlideoutOpen, setIsSlideoutOpen] = useState(false);

    const handleRowClick = (event: typeof eventsData.items[0]) => {
        setSelectedEvent(event);
        setIsSlideoutOpen(true);
    };

    const handleCloseSlideout = () => {
        setIsSlideoutOpen(false);
        setSelectedEvent(null);
    };

    const sortedItems = useMemo(() => {
        return eventsData.items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Handle null values for eventDate
            if (sortDescriptor.column === "eventDate") {
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
            title="Events Management"
            description="Manage your events, workshops, conferences, and meetups"
            currentPath="/admin/content/events"
        >
            <div className="p-4 ">
                <TableCard.Root>
                    <TableCard.Header
                        title="All Events"
                        description="Manage and organize all your events across different types and locations."
                        contentTrailing={
                            <div className="absolute top-5 right-4 md:right-6">
                                <Button 
                                    color="primary" 
                                    size="md" 
                                    iconLeading={Plus}
                                    onClick={() => navigate("/admin/content/events/create")}
                                >
                                    New Event
                                </Button>
                            </div>
                        }
                    />
                    <Table aria-label="Events management" selectionMode="multiple" selectionBehavior="toggle" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} className="min-w-[1400px]">
                        <Table.Header>
                            <Table.Head id="title" label="Event & Description" isRowHeader allowsSorting />
                            <Table.Head id="id" label="ID" allowsSorting className="w-20" />
                            <Table.Head id="organizer" label="Organizer" allowsSorting />
                            <Table.Head id="status" label="Status" allowsSorting />
                            <Table.Head id="location" label="Location" allowsSorting />
                            <Table.Head id="eventType" label="Event Type" allowsSorting />
                            <Table.Head id="tags" label="Tags" />
                            <Table.Head id="eventDate" label="Event Date" allowsSorting />
                            <Table.Head id="attendees" label="Attendees" allowsSorting className="w-20" />
                            <Table.Head id="capacity" label="Capacity" allowsSorting className="w-20" />
                            <Table.Head id="slug" label="Slug" className="min-w-40" />
                            <Table.Head id="locked" label="Locked" className="w-20" />
                            <Table.Head id="hidden" label="Hidden" className="w-20" />
                            <Table.Head id="actions" className="sticky right-0 bg-primary z-10 shadow-[-1px_0_0_0_theme(colors.border.secondary)]" />
                        </Table.Header>
                        <Table.Body items={sortedItems}>
                            {(item) => (
                                <Table.Row 
                                    id={item.id}
                                >
                                    <Table.Cell 
                                        
                                    >
                                        <div className="min-w-60">
                                            <p className="text-sm font-medium text-primary line-clamp-1">{item.title}</p>
                                            <p className="text-sm text-tertiary line-clamp-2 mt-1">{item.description}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <span className="text-sm font-mono text-tertiary">{item.id}</span>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <div className="flex items-center gap-2">
                                            <Avatar src={item.organizer.avatar} alt={item.organizer.name} size="xs" />
                                            <span className="text-sm text-primary whitespace-nowrap">{item.organizer.name}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <BadgeWithDot size="sm" color={getStatusColor(item.status)}>
                                            {item.status}
                                        </BadgeWithDot>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <span className="text-sm text-primary">{item.location}</span>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <span className="text-sm text-primary">{item.eventType}</span>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
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
                                    <Table.Cell 
                                        
                                    >
                                        <span className="text-sm text-primary whitespace-nowrap">{formatDate(item.eventDate)}</span>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <span className="text-sm text-primary">{item.attendees}</span>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <span className="text-sm text-primary">{item.capacity}</span>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <span className="text-sm font-mono text-tertiary">{item.slug}</span>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <span className={`text-sm ${item.locked ? 'text-warning' : 'text-tertiary'}`}>
                                            {item.locked ? 'Yes' : 'No'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell 
                                        
                                    >
                                        <span className={`text-sm ${item.hidden ? 'text-warning' : 'text-tertiary'}`}>
                                            {item.hidden ? 'Yes' : 'No'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell className="px-4 sticky right-0 bg-primary z-10 shadow-[-1px_0_0_0_theme(colors.border.secondary)]">
                                        <div className="flex items-center justify-end">
                                            <EventsActions onViewDetails={() => handleRowClick(item)} />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                    <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
                </TableCard.Root>
            </div>
            
            <EventDetailSlideout 
                isOpen={isSlideoutOpen}
                onClose={handleCloseSlideout}
                event={selectedEvent}
            />
        </AdminLayout>
    );
};