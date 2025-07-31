import {
    Calendar,
    MarkerPin01,
    Check,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import React from "react";
import { useNavigate } from "react-router";

// Custom scrollbar styles
const scrollbarStyles = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#d1d5db transparent',
} as React.CSSProperties;

const SiteEventDetailPage = () => {
    const navigate = useNavigate();

    // Mock event data - In real app, this would come from URL params and API
    const event = {
        id: "1",
        title: "Photography Masterclass: Capturing Life's Beautiful Moments",
        description: "Join us for an immersive photography workshop that will transform the way you see and capture the world around you.",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=faces",
        date: "Dec 15, 2024",
        time: "2:00 PM - 5:00 PM",
        location: "Creative Studio, Downtown",
        category: "Workshop",
        type: "in-person",
        attendees: 50,
        goingCount: 23,
        organizer: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b2c8e4ba?w=150&h=150&fit=crop&crop=faces"
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen">
            {/* Back Button */}
            <div className="p-4 bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto">
                    <Button 
                        size="sm" 
                        color="tertiary"
                        onClick={handleBack}
                    >
                        ← <span className="text-sm ml-2">Back to Events</span>
                    </Button>
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

            {/* Event Detail Content */}
            <div className="flex max-w-4xl mx-auto gap-4 py-6">
                <div className="flex w-full gap-6">
                {/* Left Column - Image + Basic Info */}
                                    <div className="w-3/9 relative flex flex-col min-h-0">
                    <div className="pb-4">
                        <div className="w-full h-full">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover rounded-3xl aspect-square"
                            />
                        </div>
                    </div>
                    
                    {/* Basic Event Info */}
                    <div 
                        className="space-y-6 flex-1 overflow-y-auto min-h-0 event-scrollbar" 
                        style={scrollbarStyles}
                    >
                        <div className="space-y-2">
                            {/* Event Title */}
                            <h1 className="text-2xl font-bold leading-tight text-gray-900">
                                {event.title}
                            </h1>
                            
                            {/* Host */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-5 h-5 rounded-full overflow-hidden">
                                    <img 
                                        src={event.organizer.avatar} 
                                        alt={event.organizer.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-sm">Hosted by {event.organizer.name}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
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

                            {/* Location */}
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                    <MarkerPin01 className="h-4 w-4 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900 text-sm flex items-center gap-1">
                                        {event.location}
                                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 7H7v10" />
                                        </svg>
                                    </div>
                                    <div className="text-xs text-gray-600">Event venue details</div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                        <div className="space-y-2 pt-6">
                            {/* Top Row - RSVP */}
                            <Button 
                                size="sm" 
                                color="primary" 
                                className="w-full justify-center text-xs"
                            >
                                RSVP Now
                            </Button>
                            
                            {/* Bottom Row - Going & Add to Calendar */}
                            <div className="flex gap-2">
                                <Button 
                                    size="sm" 
                                    color="tertiary" 
                                    iconLeading={Check} 
                                    className="flex-1 justify-center text-xs"
                                >
                                    Going ({event.goingCount})
                                </Button>
                                <Button 
                                    size="sm" 
                                    color="tertiary" 
                                    iconLeading={Calendar} 
                                    className="flex-1 justify-center text-xs"
                                >
                                    Add to Calendar
                                </Button>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                    {/* Action Buttons - Sticky Footer */}

                </div>

                {/* Right Column - Content Cards */}
                <div className="w-6/9 flex flex-col min-h-0">
                    <div 
                        className="flex-1 overflow-y-auto space-y-6 min-h-0 event-scrollbar px-4 py-2" 
                        style={scrollbarStyles}
                    >
                        {/* About Event Card */}
                        <div className="">
                            <div className="text-sm text-gray-500 mb-3 border-b border-gray-200 pb-1">About Event</div>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {event.description}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Join us for an immersive experience that brings together industry leaders, innovative thinkers, and passionate professionals. This carefully curated event is designed to foster meaningful connections, share cutting-edge insights, and explore the latest trends shaping our industry.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Whether you're looking to expand your network, gain new perspectives, or simply enjoy engaging conversations with like-minded individuals, this event offers something valuable for everyone. Our speakers and participants represent diverse backgrounds and expertise levels, creating a rich environment for learning and collaboration.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Don't miss this opportunity to be part of a dynamic community that's driving positive change and innovation. Reserve your spot today and prepare for an inspiring and transformative experience.
                                </p>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="">
                            <div className="text-sm text-gray-500 mb-3 border-b border-gray-200 pb-1">Location & Venue</div>
                            <div className="font-medium text-gray-900 mb-2">{event.location}</div>
                            <div className="text-gray-600">
                                {event.type === "online" ? "Virtual Event" : "In-person event with parking available"}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default SiteEventDetailPage;