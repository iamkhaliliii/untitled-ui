import {
    MarkerPin01,
    Share07,
    DotsHorizontal,
    Calendar,
    Clock,
    Download01,
    ChevronDown,
    ChevronUp,
    VideoRecorder,
    Share04,
} from "@untitledui/icons";
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import EventMap from "@/components/base/map/event-map";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// RSVP States
type RSVPState = 'open' | 'closed' | 'completed';

interface RSVPStateConfig {
    label: string;
    color: 'primary' | 'secondary' | 'tertiary';
    disabled: boolean;
    description?: string;
}

const rsvpStateConfig: Record<RSVPState, RSVPStateConfig> = {
    open: {
        label: 'RSVP Now',
        color: 'primary',
        disabled: false,
        description: 'Registration is open'
    },
    closed: {
        label: 'RSVP Closed',
        color: 'secondary',
        disabled: true,
        description: 'Registration has closed'
    },
    completed: {
        label: 'Event Completed',
        color: 'tertiary',
        disabled: true,
        description: 'This event has finished'
    }
};

// Function to assign RSVP state - always open for event detail page
const getRandomRSVPState = (eventId: string): RSVPState => {
    // Always return 'open' for event detail page so users can RSVP
    return 'open';
};

// Collapsible About Event Component
const CollapsibleAboutEvent = ({ description }: { description: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Create a longer, more detailed description for demonstration
    const fullDescription = `${description}

Join us for an immersive experience that brings together industry leaders, innovative thinkers, and passionate professionals. This carefully curated event is designed to foster meaningful connections, share cutting-edge insights, and explore the latest trends shaping our industry.

Whether you're looking to expand your network, gain new perspectives, or simply enjoy engaging conversations with like-minded individuals, this event offers something valuable for everyone. Our speakers and participants represent diverse backgrounds and expertise levels, creating a rich environment for learning and collaboration.

Don't miss this opportunity to be part of a dynamic community that's driving positive change and innovation. Reserve your spot today and prepare for an inspiring and transformative experience.`;
    
    const shortText = fullDescription.length > 100 ? fullDescription.substring(0, 100) + "..." : fullDescription;
    const needsExpansion = fullDescription.length > 100;
    
    return (
        <div className="p-3">
            <div className="text-sm text-gray-500 mb-3">About Event</div>
            <div className="prose prose-gray max-w-none">
                <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                    {isExpanded ? fullDescription : shortText}
                </div>
            </div>
            {needsExpansion && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 transition-colors"
                >
                    <span>{isExpanded ? 'Show less' : 'See more'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            )}
        </div>
    );
};

// Custom scrollbar styles
const scrollbarStyles = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#d1d5db transparent',
} as React.CSSProperties;

const SiteEventDetailPage = () => {
    const navigate = useNavigate();
    const [rsvpStage, setRsvpStage] = useState<'initial' | 'processing' | 'confirmed'>('initial');

    // Mock event data - In real app, this would come from URL params and API
    const event = {
        id: "1",
        title: "Photography Masterclass: Capturing Life's Beautiful Moments",
        description: "Join us for an immersive photography workshop that will transform the way you see and capture the world around you.",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=faces",
        date: "Dec 15, 2024",
        time: "2:00 PM - 5:00 PM",
        location: "Creative Studio, Downtown",
        fullAddress: "250 West 54th Street, New York, NY 10019",
        category: "Workshop",
        type: "in-person",
        locationType: "hybrid",
        virtualUrls: ["https://zoom.us/j/123456789", "https://meet.google.com/abc-defg-hij"],
        attendees: 50,
        coordinates: {
            latitude: 40.7589,
            longitude: -73.9851
        },
        organizer: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b2c8e4ba?w=150&h=150&fit=crop&crop=faces"
        }
    };

    const handleAllEvents = () => {
        navigate('/site/event');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: event.description,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            // You could add a toast notification here
        }
    };

    const handleMore = () => {
        // You can add more options like: bookmark, report, etc.
        console.log('More options clicked');
    };

    // Get RSVP state for this event
    const rsvpState = getRandomRSVPState(event.id);
    const rsvpConfig = rsvpStateConfig[rsvpState];

    const handleRSVPClick = () => {
        if (rsvpState === 'open') {
            setRsvpStage('processing');
            
            // Simulate processing time
            setTimeout(() => {
                setRsvpStage('confirmed');
            }, 2500);
        }
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 p-4 bg-white border-b border-gray-200 shrink-0">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    {/* UntitledUI Logo */}
                    <div className="flex items-center">
                        <UntitledLogo />
                    </div>
                    
                    {/* Action Icons */}
                    <div className="flex items-center gap-1">
                        <Button 
                            size="sm" 
                            color="tertiary"
                            iconLeading={Calendar}
                            onClick={handleAllEvents}
                        >
                            All Events
                        </Button>
                        <ButtonUtility 
                            size="sm" 
                            color="tertiary"
                            icon={Share07}
                            tooltip="Share"
                            onClick={handleShare}
                        />
                        <ButtonUtility 
                            size="sm" 
                            color="tertiary"
                            icon={DotsHorizontal}
                            tooltip="More options"
                            onClick={handleMore}
                        />
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{
                __html: `
                .event-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .event-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .event-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 3px;
                }
                .event-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #9ca3af;
                }
                `
            }} />

            {/* Main Content Area */}
            <div className="flex flex-1 max-w-4xl mx-auto gap-6 max-lg:gap-4 py-6 max-lg:py-4 min-h-0 max-md:hidden">
                {/* Desktop & Tablet Layout */}
                {/* Left Column - Image + Basic Info */}
                <div className="w-3/8 max-lg:w-2/5 max-md:w-full rounded-3xl max-md:rounded-none p-4 max-lg:p-3 max-md:p-4 flex flex-col min-h-0">
                    <div className="flex flex-col h-full">
                        <div className="pb-4 max-lg:pb-3 max-md:pb-4 flex-shrink-0">
                            <div className="w-full aspect-square">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover rounded-3xl max-md:rounded-2xl"
                                />
                            </div>
                        </div>
                        
                        {/* Basic Event Info */}
                        <div 
                            className="px-1 max-lg:px-1 max-md:px-1 space-y-6 max-lg:space-y-4 max-md:space-y-3 flex-1 overflow-y-auto min-h-0 event-scrollbar" 
                            style={scrollbarStyles}
                        >
                            <div className="space-y-2">
                                {/* Event Title */}
                                <h1 className="text-2xl max-lg:text-xl max-md:text-lg font-bold leading-tight text-gray-900">
                                    {event.title}
                                </h1>
                                
                                {/* Host */}
                                <div className="flex items-center gap-2 text-gray-600">
                                    <div className="w-5 h-5 max-md:w-6 max-md:h-6 rounded-full overflow-hidden">
                                        <img 
                                            src={event.organizer.avatar} 
                                            alt={event.organizer.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm max-md:text-base">Hosted by {event.organizer.name}</span>
                                </div>
                            </div>
                            
                            {/* Date & Time and Location Cards - Only show before RSVP */}
                            {rsvpStage === 'initial' && (
                                <div className="space-y-3">
                                    {/* Date & Time Card */}
                                    <div className="flex items-center gap-2 max-md:gap-3">
                                        <div className="w-10 h-10 max-md:w-12 max-md:h-12 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                                            <div className="text-xs text-gray-500 leading-none">
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </div>
                                            <div className="text-xs max-md:text-sm font-semibold text-gray-900 leading-none">
                                                {new Date(event.date).getDate()}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-sm max-md:text-base">{event.date}</div>
                                            <div className="text-xs max-md:text-sm text-gray-600">{event.time}</div>
                                        </div>
                                    </div>

                                    {/* Location Card */}
                                    <div className="flex items-center gap-2 max-md:gap-3">
                                        <div className="w-10 h-10 max-md:w-12 max-md:h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                            {event.locationType === "virtual" ? (
                                                <VideoRecorder className="h-4 w-4 max-md:h-5 max-md:w-5 text-gray-500" />
                                            ) : event.locationType === "hybrid" ? (
                                                <div className="flex items-center -space-x-1">
                                                    <MarkerPin01 className="h-3.5 w-3.5 bg-white max-md:h-4 max-md:w-4 text-gray-500" />
                                                    <VideoRecorder className="h-3.5 w-3.5 bg-white max-md:h-4 max-md:w-4 text-gray-500" />
                                                </div>
                                            ) : (
                                                <MarkerPin01 className="h-4 w-4 max-md:h-5 max-md:w-5 text-gray-500" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-sm max-md:text-base flex items-center gap-1">
                                                {event.locationType === "virtual" ? "Virtual" : 
                                                 event.locationType === "hybrid" ? (
                                                    <span>{event.location} <span className="text-[0.7rem]">+ Virtual</span></span>
                                                 ) :
                                                 event.location}
                                            </div>
                                            <div className="text-xs max-md:text-sm text-gray-600">
                                                {event.locationType === "virtual"
                                                    ? "Event join link available after RSVP"
                                                    : event.locationType === "hybrid" 
                                                    ? "Details and links shown after RSVP"
                                                    : "Full details available after RSVP"
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Confirmation Message (when RSVP confirmed) */}
                            {rsvpStage === 'confirmed' && (
                                <div className="bg-success-50 border border-success-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-success-600" />
                                        <span className="text-sm font-medium text-success-700">You're All Set!</span>
                                    </div>
                                    <p className="text-xs text-success-600">Your RSVP has been confirmed. Event details will be sent to your email.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Action Buttons - Sticky Footer */}
                    <div className="px-0 pt-0 mt-4 max-lg:mt-3 max-md:mt-4 pb-2 border-t border-gray-200 flex-shrink-0">
                        <div className="pt-2">
                            {/* RSVP Section */}
                            <div className="rounded-xl p-4 max-lg:p-3 max-md:p-4">
                                {rsvpStage === 'processing' ? (
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-sm font-medium text-brand-600">Processing RSVP...</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Please wait while we confirm your attendance</p>
                                    </div>
                                ) : rsvpStage === 'confirmed' ? (
                                    <div className="text-center">
                                        <Button 
                                            size="sm" 
                                            color="secondary" 
                                            className="w-full"
                                            iconLeading={Download01}
                                        >
                                            Download ICS file
                                        </Button>
                                    </div>
                                ) : rsvpState === 'open' ? (
                                    <div className="text-center">
                                        <div className="mb-2">
                                            <h4 className="text-sm font-medium text-gray-900 mb-0.5">Ready to join?</h4>
                                            <p className="text-xs text-gray-600">Secure your spot at this event</p>
                                        </div>
                                        <Button 
                                            size="sm" 
                                            color="primary" 
                                            className="w-full"
                                            onClick={handleRSVPClick}
                                        >
                                            {rsvpConfig.label}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="mb-2">
                                            <h4 className="text-sm font-medium text-gray-900 mb-0.5">Event Status</h4>
                                            <p className="text-xs text-gray-600">{rsvpConfig.description}</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            className="w-full"
                                            disabled={true}
                                        >
                                            {rsvpConfig.label}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Right Column - Content Cards */}
                <div className="w-5/8 max-lg:w-3/5 max-md:w-full flex flex-col min-h-0">
                    <div 
                        className="flex-1 space-y-6 max-lg:space-y-4 max-md:space-y-4 min-h-0 event-scrollbar px-4 max-lg:px-3 max-md:px-4 py-2 max-md:py-4 overflow-y-auto" 
                        style={scrollbarStyles}
                    >
                        {rsvpStage === 'confirmed' ? (
                            /* After RSVP - New Structured Layout */
                            <>
                                {/* Success Message */}
                                <div className="p-3 max-md:p-3 pb-2">
                                    <h3 className="text-lg max-md:text-xl font-medium text-gray-900">Registration confirmed</h3>
                                </div>
                                
                                {/* Event Information Title */}
                                <div className="p-3 max-md:p-3 pb-0 pt-0">
                                    <div className="text-sm max-md:text-base text-gray-500 mb-3 max-md:mb-4">Event Information</div>
                                </div>
                                
                                {/* Event Data Cards */}
                                <div className="space-y-4 p-3 pt-0">
                                    {/* Event Title & Host Card */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-sm">{event.title}</div>
                                            <div className="text-xs text-gray-600">Hosted by {event.organizer.name}</div>
                                        </div>
                                    </div>

                                    {/* Date & Time Card */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                                            <div className="text-xs text-gray-500 leading-none">
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </div>
                                            <div className="text-xs font-semibold text-gray-900 leading-none">
                                                {new Date(event.date).getDate()}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-sm">{event.date}</div>
                                            <div className="text-xs text-gray-600">{event.time}</div>
                                        </div>
                                    </div>

                                    {/* Physical Location Card (for physical and hybrid) */}
                                    {(event.locationType === "physical" || event.locationType === "hybrid") && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                <MarkerPin01 className="h-4 w-4 text-gray-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 text-sm flex items-center gap-1">
                                                    {event.location}
                                                </div>
                                                <div className="text-xs text-gray-600">{event.fullAddress}</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Virtual Location Card (for virtual and hybrid) */}
                                    {(event.locationType === "virtual" || event.locationType === "hybrid") && (
                                        <div className="flex items-start gap-2">
                                            <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                <VideoRecorder className="h-4 w-4 text-gray-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 text-sm flex items-center gap-1">
                                                    Virtual links
                                                </div>
                                                <div className="text-xs text-gray-600 space-y-0">
                                                    {/* Zoom Link */}
                                                    <a 
                                                        href="https://zoom.us/j/123456789" 
                                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img 
                                                            src="https://zoom.us/favicon.ico" 
                                                            alt="Zoom" 
                                                            className="w-3 h-3"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzAwNzNFNiIvPgo8cGF0aCBkPSJNMyw0aDZWOEgzVjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                                            }}
                                                        />
                                                        <span className="text-xs">https://zoom.us/j/123456789</span>
                                                        <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                    
                                                    {/* Google Meet Link */}
                                                    <a 
                                                        href="https://meet.google.com/abc-defg-hij" 
                                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img 
                                                            src="https://meet.google.com/favicon.ico" 
                                                            alt="Google Meet" 
                                                            className="w-3 h-3"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNMyw0aDZWOEgzVjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                                            }}
                                                        />
                                                        <span className="text-xs">https://meet.google.com/abc-defg-hij</span>
                                                        <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                    
                                                    {/* YouTube Link */}
                                                    <a 
                                                        href="https://youtube.com/watch?v=dQw4w9WgXcQ" 
                                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img 
                                                            src="https://youtube.com/favicon.ico" 
                                                            alt="YouTube" 
                                                            className="w-3 h-3"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNNSw0VjhMOCw2TDUsNFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+';
                                                            }}
                                                        />
                                                        <span className="text-xs">https://youtube.com/watch?v=dQw4w9WgXcQ</span>
                                                        <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Interactive Map */}
                                {event.type !== "online" && event.coordinates && (
                                    <div className="px-3">
                                        <EventMap
                                            location={event.location}
                                            latitude={event.coordinates.latitude}
                                            longitude={event.coordinates.longitude}
                                        />
                                    </div>
                                )}

                                {/* Event Details Section */}
                                <div className="p-3">
                                    <div className="text-sm text-gray-500 mb-3">Event Details</div>
                                    <div className="space-y-3 text-sm text-gray-700">
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Free snacks and drinks will be provided throughout the event</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Networking opportunities with fellow photography enthusiasts and industry professionals</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Hands-on practice with professional equipment</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Expert guidance from award-winning photographers</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Please arrive 15 minutes early for check-in and setup</p>
                                        </div>
                                    </div>
                                </div>

                                {/* About Event Section (Collapsible) */}
                                <CollapsibleAboutEvent description={event.description} />
                            </>
                        ) : (
                            /* Before RSVP - Original Layout */
                            <>
                                {/* About Event Card */}
                                <div className="p-3">
                                    <div className="text-sm text-gray-500 mb-3">About Event</div>
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                                            {event.description}
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                                            Join us for an immersive experience that brings together industry leaders, innovative thinkers, and passionate professionals. This carefully curated event is designed to foster meaningful connections, share cutting-edge insights, and explore the latest trends shaping our industry.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                                            Whether you're looking to expand your network, gain new perspectives, or simply enjoy engaging conversations with like-minded individuals, this event offers something valuable for everyone. Our speakers and participants represent diverse backgrounds and expertise levels, creating a rich environment for learning and collaboration.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            Don't miss this opportunity to be part of a dynamic community that's driving positive change and innovation. Reserve your spot today and prepare for an inspiring and transformative experience.
                                        </p>
                                    </div>
                                </div>


                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile: Single Column Layout */}
            <div className="md:hidden flex flex-col h-full max-h-full overflow-hidden">
                {/* Mobile Content - Scrollable */}
                <div className="flex-1 overflow-y-auto event-scrollbar min-h-0" style={scrollbarStyles}>
                    {/* Mobile Image Section */}
                    <div className="p-4">
                        <div className="w-full aspect-square">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Mobile Event Info */}
                    <div className="px-4 pb-4">
                        <div className="space-y-3">
                            {/* Title & Host */}
                            <div className="space-y-2">
                                <h1 className="text-xl font-bold leading-tight text-gray-900">
                                    {event.title}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <div className="w-6 h-6 rounded-full overflow-hidden">
                                        <img 
                                            src={event.organizer.avatar} 
                                            alt={event.organizer.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-base">Hosted by {event.organizer.name}</span>
                                </div>
                            </div>

                            {/* Date & Time and Location Cards - Only show before RSVP */}
                            {rsvpStage === 'initial' && (
                                <div className="space-y-3">
                                    {/* Date & Time Card */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                                            <div className="text-xs text-gray-500 leading-none">
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900 leading-none">
                                                {new Date(event.date).getDate()}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-base">{event.date}</div>
                                            <div className="text-sm text-gray-600">{event.time}</div>
                                        </div>
                                    </div>

                                    {/* Location Card */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                            {event.locationType === "virtual" ? (
                                                <VideoRecorder className="h-5 w-5 text-gray-500" />
                                            ) : event.locationType === "hybrid" ? (
                                                <div className="flex items-center gap-1">
                                                    <MarkerPin01 className="h-4 w-4 text-gray-500" />
                                                    <VideoRecorder className="h-4 w-4 text-gray-500" />
                                                </div>
                                            ) : (
                                                <MarkerPin01 className="h-5 w-5 text-gray-500" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-base flex items-center gap-1">
                                                {event.locationType === "virtual" ? "Virtual" : 
                                                 event.locationType === "hybrid" ? (
                                                    <span>{event.location} <span className="text-[0.7rem]">+ Virtual</span></span>
                                                 ) :
                                                 event.location}
                                                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 7H7v10" />
                                                </svg>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {event.locationType === "virtual"
                                                    ? "Event join link available after RSVP"
                                                    : event.locationType === "hybrid" 
                                                    ? "Details and links shown after RSVP"
                                                    : "Full details available after RSVP"
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Confirmation Message (when RSVP confirmed) */}
                            {rsvpStage === 'confirmed' && (
                                <div className="bg-success-50 border border-success-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-success-600" />
                                        <span className="text-base font-medium text-success-700">You're All Set!</span>
                                    </div>
                                    <p className="text-sm text-success-600">Your RSVP has been confirmed. Event details will be sent to your email.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Content Sections */}
                    <div className="space-y-4 px-4 pb-4">
                        {rsvpStage === 'confirmed' ? (
                            /* After RSVP - Mobile Structured Layout */
                            <>
                                {/* Success Message */}
                                <div className="pb-2">
                                    <h3 className="text-xl font-medium text-gray-900">Registration confirmed</h3>
                                </div>
                                
                                {/* Event Information Title */}
                                <div className="pb-0">
                                    <div className="text-base text-gray-500 mb-4">Event Information</div>
                                </div>
                                
                                {/* Event Data Cards */}
                                <div className="space-y-4">
                                    {/* Event Title & Host Card */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                            <Calendar className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-base">{event.title}</div>
                                            <div className="text-sm text-gray-600">Hosted by {event.organizer.name}</div>
                                        </div>
                                    </div>

                                    {/* Date & Time Card */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                                            <div className="text-xs text-gray-500 leading-none">
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900 leading-none">
                                                {new Date(event.date).getDate()}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-base">{event.date}</div>
                                            <div className="text-sm text-gray-600">{event.time}</div>
                                        </div>
                                    </div>

                                    {/* Physical Location Card (for physical and hybrid) */}
                                    {(event.locationType === "physical" || event.locationType === "hybrid") && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                <MarkerPin01 className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 text-base flex items-center gap-1">
                                                    {event.location}
                                                </div>
                                                <div className="text-sm text-gray-600">{event.fullAddress}</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Virtual Location Card (for virtual and hybrid) */}
                                    {(event.locationType === "virtual" || event.locationType === "hybrid") && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                <VideoRecorder className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 text-base flex items-center gap-1">
                                                    Virtual links
                                                </div>
                                                <div className="text-sm text-gray-600 space-y-0">
                                                    {/* Zoom Link */}
                                                    <a 
                                                        href="https://zoom.us/j/123456789" 
                                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img 
                                                            src="https://zoom.us/favicon.ico" 
                                                            alt="Zoom" 
                                                            className="w-4 h-4"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzAwNzNFNiIvPgo8cGF0aCBkPSJNNCw2aDhWMTBINFY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
                                                            }}
                                                        />
                                                        <span className="text-sm">https://zoom.us/j/123456789</span>
                                                        <Share04 className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                    
                                                    {/* Google Meet Link */}
                                                    <a 
                                                        href="https://meet.google.com/abc-defg-hij" 
                                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img 
                                                            src="https://meet.google.com/favicon.ico" 
                                                            alt="Google Meet" 
                                                            className="w-4 h-4"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNNCw2aDhWMTBINFY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
                                                            }}
                                                        />
                                                        <span className="text-sm">https://meet.google.com/abc-defg-hij</span>
                                                        <Share04 className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                    
                                                    {/* YouTube Link */}
                                                    <a 
                                                        href="https://youtube.com/watch?v=dQw4w9WgXcQ" 
                                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img 
                                                            src="https://youtube.com/favicon.ico" 
                                                            alt="YouTube" 
                                                            className="w-4 h-4"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNNSw0VjhMOCw2TDUsNFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+';
                                                            }}
                                                        />
                                                        <span className="text-sm">https://youtube.com/watch?v=dQw4w9WgXcQ</span>
                                                        <Share04 className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Interactive Map */}
                                {event.type !== "online" && event.coordinates && (
                                    <div>
                                        <EventMap
                                            location={event.location}
                                            latitude={event.coordinates.latitude}
                                            longitude={event.coordinates.longitude}
                                        />
                                    </div>
                                )}

                                {/* Event Details Section */}
                                <div>
                                    <div className="text-base text-gray-500 mb-4">Event Details</div>
                                    <div className="space-y-3 text-sm text-gray-700">
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Free snacks and drinks will be provided throughout the event</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Networking opportunities with fellow photography enthusiasts and industry professionals</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Hands-on practice with professional equipment</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Expert guidance from award-winning photographers</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>Please arrive 15 minutes early for check-in and setup</p>
                                        </div>
                                    </div>
                                </div>

                                {/* About Event Section (Collapsible) */}
                                <CollapsibleAboutEvent description={event.description} />
                            </>
                        ) : (
                            /* Before RSVP - Mobile Original Layout */
                            <>
                                {/* About Event Card */}
                                <div>
                                    <div className="text-base text-gray-500 mb-4">About Event</div>
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-700 leading-relaxed text-base mb-4">
                                            {event.description}
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-base mb-4">
                                            Join us for an immersive experience that brings together industry leaders, innovative thinkers, and passionate professionals. This carefully curated event is designed to foster meaningful connections, share cutting-edge insights, and explore the latest trends shaping our industry.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-base mb-4">
                                            Whether you're looking to expand your network, gain new perspectives, or simply enjoy engaging conversations with like-minded individuals, this event offers something valuable for everyone. Our speakers and participants represent diverse backgrounds and expertise levels, creating a rich environment for learning and collaboration.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-base">
                                            Don't miss this opportunity to be part of a dynamic community that's driving positive change and innovation. Reserve your spot today and prepare for an inspiring and transformative experience.
                                        </p>
                                    </div>
                                </div>


                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Footer - Fixed to Bottom */}
                <div className="flex-shrink-0 border-t border-gray-200">
                    <div className="rounded-xl p-4">
                        {rsvpStage === 'processing' ? (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-base font-medium text-brand-600">Processing RSVP...</span>
                                </div>
                                <p className="text-sm text-gray-500">Please wait while we confirm your attendance</p>
                            </div>
                        ) : rsvpStage === 'confirmed' ? (
                            <div className="text-center">
                                <Button 
                                    size="md" 
                                    color="secondary" 
                                    className="w-full text-base py-3"
                                    iconLeading={Download01}
                                >
                                    Download ICS file
                                </Button>
                            </div>
                        ) : rsvpState === 'open' ? (
                            <div className="text-center">
                                <div className="mb-3">
                                    <h4 className="text-base font-medium text-gray-900 mb-1">Ready to join?</h4>
                                    <p className="text-sm text-gray-600">Secure your spot at this event</p>
                                </div>
                                <Button 
                                    size="md" 
                                    color="primary" 
                                    className="w-full text-base py-3"
                                    onClick={handleRSVPClick}
                                >
                                    {rsvpConfig.label}
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="mb-3">
                                    <h4 className="text-base font-medium text-gray-900 mb-1">Event Status</h4>
                                    <p className="text-sm text-gray-600">{rsvpConfig.description}</p>
                                </div>
                                <Button
                                    size="md"
                                    color="secondary"
                                    className="w-full text-base py-3"
                                    disabled={true}
                                >
                                    {rsvpConfig.label}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteEventDetailPage;