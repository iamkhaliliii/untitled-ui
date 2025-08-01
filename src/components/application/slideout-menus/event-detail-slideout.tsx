import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { X, Calendar, Clock, Bell01, Copy01, Trash01, Edit03, Plus } from "@untitledui/icons";
import { useAdmin } from "@/hooks/use-admin";

interface EventDetailSlideoutProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        id: string;
        title: string;
        description: string;
        organizer: {
            name: string;
            avatar: string;
        };
        status: string;
        location: string;
        eventType: string;
        tags: string[];
        eventDate: string | null;
        attendees: number;
        capacity: number;
        slug: string;
        locked: boolean;
        hidden: boolean;
    } | null;
}

const formatEventDate = (dateString: string | null) => {
    if (!dateString) return { day: "--", month: "---", fullDate: "Not scheduled", time: "Time TBD" };
    
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const fullDate = date.toLocaleDateString("en-US", { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
    });
    const time = date.toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit",
        hour12: true 
    });
    
    return { day, month, fullDate, time };
};

const mockAttendees = [
    { name: "Sienna Hewitt", avatar: "https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80" },
    { name: "Ammar Foley", avatar: "https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80" },
    { name: "Pippa Wilkinson", avatar: "https://www.untitledui.com/images/avatars/pippa-wilkinson?fm=webp&q=80" },
    { name: "Olly Schroeder", avatar: "https://www.untitledui.com/images/avatars/olly-schroeder?fm=webp&q=80" },
    { name: "Mathilde Lewis", avatar: "https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80" },
];

export const EventDetailSlideout = ({ isOpen, onClose, event }: EventDetailSlideoutProps) => {
    const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe'>('yes');
    const { isAdmin, adminHeaderVisible, adminHeaderCollapsed } = useAdmin();

    // Handle escape key and body scroll lock
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when slideout is open
            document.body.style.overflow = 'hidden';
            
            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        } else {
            // Delay restoring body scroll to allow exit animation to complete
            const timer = setTimeout(() => {
                document.body.style.overflow = 'unset';
            }, 300); // Match the animation duration
            
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen, onClose]);

    if (!event) return null;

    const { day, month, fullDate, time } = formatEventDate(event.eventDate);

    // Calculate dynamic positioning based on admin header state
    const getHeaderHeight = () => {
        if (isAdmin && adminHeaderVisible) {
            return adminHeaderCollapsed ? 12 : 48; // 12px collapsed, 48px full
        }
        return 0; // No admin header
    };

    const headerHeight = getHeaderHeight();
    const topPosition = headerHeight;
    const availableHeight = `calc(100vh - ${headerHeight}px)`;

    return (
        <AnimatePresence 
            mode="wait"
            onExitComplete={() => {
                // Ensure body scroll is restored after exit animation
                document.body.style.overflow = 'unset';
            }}
        >
            {isOpen && (
                <motion.div 
                    key="event-slideout-overlay"
                    className="fixed flex w-full items-center justify-end bg-overlay/70 pl-6 outline-hidden ease-linear md:pl-10 z-50"
                    style={{
                        top: `${topPosition}px`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: availableHeight
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={onClose}
                >
                    <motion.div 
                        key="event-slideout-panel"
                        className="inset-y-0 right-0 h-full w-full max-w-100 shadow-xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ 
                            duration: 0.3, 
                            ease: [0.4, 0.0, 0.2, 1] // Custom easing for smooth slide
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                <section className="relative flex size-full flex-col items-start overflow-y-auto bg-primary ring-1 ring-secondary_alt outline-hidden gap-0">
                    {/* Header */}
                    <header className="z-1 relative flex w-full flex-col items-start gap-3 px-4 pt-5 md:px-6">
                        <div className="flex h-max w-16 flex-col overflow-hidden rounded-lg border border-secondary">
                            <span className="z-0 bg-secondary px-[7px] pt-[3px] pb-0.5 text-center">
                                <p className="text-xs font-semibold text-quaternary">{month}</p>
                            </span>
                            <span className="px-[7px] pt-px pb-[2px] text-center">
                                <p className="text-lg font-bold text-brand-secondary">{day}</p>
                            </span>
                        </div>
                        <h1 className="text-md font-semibold text-primary md:text-lg">{event.title}</h1>
                        <button
                            className="flex cursor-pointer items-center justify-center rounded-lg p-2 transition duration-100 ease-linear focus:outline-hidden size-10 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 outline-focus-ring absolute top-3 right-3 shrink-0"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <X className="shrink-0 transition-inherit-all size-5" />
                        </button>
                    </header>

                    {/* Main Content */}
                    <div role="main" className="flex size-full flex-col gap-6 overflow-y-auto overscroll-auto px-4 py-6 md:px-6">
                        {/* Details Section */}
                        <div className="flex flex-col gap-4">
                            <section className="flex w-full justify-between">
                                <p className="text-sm font-semibold text-primary">Details</p>
                                <span className="-mt-2 -mb-1 flex gap-0.5">
                                    <button className="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover" aria-label="Copy link">
                                        <Copy01 className="size-4" />
                                    </button>
                                    <button className="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover" aria-label="Delete">
                                        <Trash01 className="size-4" />
                                    </button>
                                    <button className="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover" aria-label="Edit">
                                        <Edit03 className="size-4" />
                                    </button>
                                </span>
                            </section>
                            <section className="flex flex-col gap-2">
                                <span className="flex items-center gap-2">
                                    <Calendar className="text-fg-quaternary size-5" />
                                    <p className="text-sm text-tertiary">{fullDate}</p>
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="text-fg-quaternary size-5" />
                                    <p className="text-sm text-tertiary">{time} - {time}</p>
                                </span>
                                <span className="flex items-center gap-2">
                                    <Bell01 className="text-fg-quaternary size-5" />
                                    <p className="text-sm text-tertiary">10 min before</p>
                                </span>
                            </section>
                        </div>

                        {/* Organizer Section */}
                        <section className="flex flex-col gap-4">
                            <p className="text-sm font-semibold text-primary">Organizer</p>
                            <figure className="group flex min-w-0 flex-1 items-center gap-2">
                                <Avatar src={event.organizer.avatar} alt={event.organizer.name} size="md" />
                                <figcaption className="min-w-0 flex-1">
                                    <p className="text-primary text-sm font-semibold">{event.organizer.name}</p>
                                    <p className="truncate text-tertiary text-sm">{event.organizer.name.toLowerCase().replace(' ', '')}@company.com</p>
                                </figcaption>
                            </figure>
                        </section>

                        {/* Attendees Section */}
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-semibold text-primary">Attendees</p>
                            <div className="flex flex-col gap-3">
                                <section className="flex gap-2">
                                    <section className="flex flex-row -space-x-3">
                                        {mockAttendees.slice(0, 5).map((attendee, index) => (
                                            <Avatar
                                                key={index}
                                                src={attendee.avatar}
                                                alt={attendee.name}
                                                size="md"
                                                className="ring-[1.5px] ring-bg-primary"
                                            />
                                        ))}
                                        <div className="relative inline-flex shrink-0 items-center justify-center rounded-full bg-avatar-bg outline-avatar-contrast-border size-10 outline-1 -outline-offset-1 ring-[1.5px] ring-bg-primary">
                                            <span className="text-quaternary text-xs font-semibold">+5</span>
                                        </div>
                                    </section>
                                    <button className="outline-hidden flex cursor-pointer items-center justify-center rounded-full border border-dashed border-primary bg-primary text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 disabled:border-gray-200 disabled:bg-secondary disabled:text-gray-200 size-10" aria-label="Add user">
                                        <Plus className="text-current transition-inherit-all size-5" />
                                    </button>
                                </section>
                                <section className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-primary">{event.attendees} guests</p>
                                    <span className="h-[13px] border-l border-primary"></span>
                                    <p className="text-sm text-tertiary">{Math.floor(event.attendees * 0.8)} yes</p>
                                    <span className="h-[13px] border-l border-primary"></span>
                                    <p className="text-sm text-tertiary">{event.attendees - Math.floor(event.attendees * 0.8)} awaiting</p>
                                </section>
                            </div>
                        </div>

                        {/* About Section */}
                        <section className="flex flex-col gap-3">
                            <p className="text-sm font-semibold text-primary">About this event</p>
                            <div className="text-sm text-tertiary">
                                <p>{event.description}</p>
                                <br />
                                <p>Event Type: {event.eventType}</p>
                                <br />
                                <p>Location: {event.location}</p>
                                <br />
                                <p>Tags: {event.tags.join(', ')}</p>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <footer className="p-4 shadow-[inset_0px_1px_0px_0px] shadow-border-secondary md:px-6 flex w-full items-center gap-4">
                        <p className="w-full text-sm font-medium text-secondary">Going?</p>
                        <div className="relative z-0 inline-flex w-max -space-x-px rounded-lg shadow-xs" role="radiogroup">
                            {(['yes', 'no', 'maybe'] as const).map((option) => (
                                <button
                                    key={option}
                                    className={`group/button-group inline-flex h-max cursor-pointer items-center font-semibold whitespace-nowrap shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed gap-1.5 px-4 py-2.5 text-sm first:rounded-l-lg last:rounded-r-lg ${
                                        rsvpStatus === option
                                            ? 'bg-active text-secondary_hover'
                                            : 'bg-primary text-secondary hover:bg-primary_hover hover:text-secondary_hover'
                                    }`}
                                    onClick={() => setRsvpStatus(option)}
                                    role="radio"
                                    aria-checked={rsvpStatus === option}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                    </footer>
                </section>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};