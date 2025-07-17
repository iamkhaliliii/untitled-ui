import {
    Calendar,
    MarkerPin01,
    Clock,
    Users01,
    Heart,
    Share04,
    Plus,
    Settings01,
    SearchLg,
    Eye,
    Ticket01,
    Globe01,
    Star01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { SiteLayout } from "@/components/layouts/site-layout";

export const SiteEventPage = () => {
    const headerActions = (
        <div className="flex items-center gap-2">
            <div className="relative">
                <Input
                    placeholder="Search events..."
                    className="w-64"
                    icon={SearchLg}
                />
            </div>
            <Button size="sm" iconLeading={Plus}>
                Create Event
            </Button>
        </div>
    );

    return (
        <SiteLayout 
            title="Events"
            description="Discover and join amazing events"
            currentPath="/site/event"
            headerActions={headerActions}
            showBackButton={true}
        >
            <div className="overflow-y-auto">
                <div className="py-6">
                {/* Event Stats */}
                <div className="mb-8 grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                                <Calendar className="h-5 w-5 text-brand-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-tertiary">Total Events</p>
                                <p className="text-lg font-semibold text-primary">42</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                                <Users01 className="h-5 w-5 text-brand-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-tertiary">Attendees</p>
                                <p className="text-lg font-semibold text-primary">2,134</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                                <Ticket01 className="h-5 w-5 text-brand-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-tertiary">Tickets Sold</p>
                                <p className="text-lg font-semibold text-primary">1,856</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                                <Globe01 className="h-5 w-5 text-brand-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-tertiary">Online Events</p>
                                <p className="text-lg font-semibold text-primary">18</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="mb-8 flex items-center gap-2">
                    <Button size="sm" color="primary">All Events</Button>
                    <Button size="sm" color="secondary">This Week</Button>
                    <Button size="sm" color="secondary">This Month</Button>
                    <Button size="sm" color="secondary">Online</Button>
                    <Button size="sm" color="secondary">In-Person</Button>
                </div>

                {/* Events Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            id: 1,
                            title: "React Conference 2024",
                            description: "Join us for the biggest React conference of the year. Learn from industry experts and network with fellow developers.",
                            image: "https://picsum.photos/400/200",
                            date: "March 15, 2024",
                            time: "9:00 AM - 6:00 PM",
                            location: "San Francisco, CA",
                            price: "$299",
                            attendees: 150,
                            maxAttendees: 200,
                            type: "in-person",
                            category: "Technology",
                            organizer: {
                                name: "Tech Events Inc.",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            }
                        },
                        {
                            id: 2,
                            title: "Design Thinking Workshop",
                            description: "Hands-on workshop to master design thinking methodology. Perfect for designers and product managers.",
                            image: "https://picsum.photos/400/201",
                            date: "March 18, 2024",
                            time: "2:00 PM - 5:00 PM",
                            location: "Online",
                            price: "Free",
                            attendees: 89,
                            maxAttendees: 100,
                            type: "online",
                            category: "Design",
                            organizer: {
                                name: "Design Academy",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            }
                        },
                        {
                            id: 3,
                            title: "Startup Pitch Competition",
                            description: "Watch innovative startups pitch their ideas to a panel of expert judges. Great networking opportunity.",
                            image: "https://picsum.photos/400/202",
                            date: "March 22, 2024",
                            time: "7:00 PM - 10:00 PM",
                            location: "New York, NY",
                            price: "$50",
                            attendees: 75,
                            maxAttendees: 150,
                            type: "in-person",
                            category: "Business",
                            organizer: {
                                name: "Startup Hub",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            }
                        },
                        {
                            id: 4,
                            title: "AI & Machine Learning Summit",
                            description: "Explore the latest trends in AI and ML. Expert speakers from leading tech companies.",
                            image: "https://picsum.photos/400/203",
                            date: "March 25, 2024",
                            time: "10:00 AM - 4:00 PM",
                            location: "Online",
                            price: "$199",
                            attendees: 234,
                            maxAttendees: 500,
                            type: "online",
                            category: "Technology",
                            organizer: {
                                name: "AI Institute",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            }
                        },
                        {
                            id: 5,
                            title: "Photography Masterclass",
                            description: "Learn professional photography techniques from award-winning photographers.",
                            image: "https://picsum.photos/400/204",
                            date: "March 28, 2024",
                            time: "1:00 PM - 6:00 PM",
                            location: "Los Angeles, CA",
                            price: "$149",
                            attendees: 45,
                            maxAttendees: 80,
                            type: "in-person",
                            category: "Creative",
                            organizer: {
                                name: "Photo Pro",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            }
                        },
                        {
                            id: 6,
                            title: "Digital Marketing Bootcamp",
                            description: "Comprehensive bootcamp covering SEO, social media, and content marketing strategies.",
                            image: "https://picsum.photos/400/205",
                            date: "April 2, 2024",
                            time: "9:00 AM - 5:00 PM",
                            location: "Online",
                            price: "$249",
                            attendees: 156,
                            maxAttendees: 200,
                            type: "online",
                            category: "Marketing",
                            organizer: {
                                name: "Marketing Masters",
                                avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            }
                        }
                    ].map((event) => (
                        <div key={event.id} className="rounded-xl border border-secondary bg-primary overflow-hidden">
                            {/* Event Image */}
                            <div className="relative">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge 
                                        color={event.type === "online" ? "blue" : "success"} 
                                        size="sm"
                                    >
                                        {event.type === "online" ? "Online" : "In-Person"}
                                    </Badge>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Badge color="gray" size="sm">
                                        {event.category}
                                    </Badge>
                                </div>
                            </div>

                            {/* Event Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-primary mb-2">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-tertiary mb-4 line-clamp-2">
                                    {event.description}
                                </p>

                                {/* Event Details */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-secondary">
                                        <Calendar className="h-4 w-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-secondary">
                                        <Clock className="h-4 w-4" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-secondary">
                                        <MarkerPin01 className="h-4 w-4" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                {/* Organizer */}
                                <div className="flex items-center gap-2 mb-4">
                                    <Avatar
                                        src={event.organizer.avatar}
                                        alt={event.organizer.name}
                                        size="sm"
                                    />
                                    <span className="text-sm text-tertiary">
                                        by {event.organizer.name}
                                    </span>
                                </div>

                                {/* Attendees Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-tertiary">
                                            {event.attendees} / {event.maxAttendees} attendees
                                        </span>
                                        <span className="text-sm text-tertiary">
                                            {Math.round((event.attendees / event.maxAttendees) * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div 
                                            className="bg-brand-solid h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Price and Actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold text-primary">
                                            {event.price}
                                        </span>
                                        {event.price === "Free" && (
                                            <Badge color="success" size="sm">Free</Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ButtonUtility
                                            size="sm"
                                            color="tertiary"
                                            icon={Heart}
                                            tooltip="Save Event"
                                        />
                                        <ButtonUtility
                                            size="sm"
                                            color="tertiary"
                                            icon={Share04}
                                            tooltip="Share Event"
                                        />
                                        <Button size="sm" color="primary">
                                            Register
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="mt-8 text-center">
                    <Button size="md" color="secondary">
                        Load More Events
                    </Button>
                </div>
            </div>
        </div>
        </SiteLayout>
    );
}; 