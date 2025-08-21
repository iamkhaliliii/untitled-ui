import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router";
import { useListData } from 'react-stately';
import { ArrowLeft, Plus, Bell01, MessageChatCircle, Moon01, SearchLg, Zap, Edit03, FaceSmile, Image01, Paperclip, ChevronDown, Eye, EyeOff, X, Calendar, Clock, MarkerPin01, Users01, Tag01, Settings01, Globe01, Globe06, VideoRecorder, ChevronUp, HelpCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input, InputBase } from '@/components/base/input/input';
import { InputGroup } from '@/components/base/input/input-group';
import { Label } from '@/components/base/input/label';
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { NativeSelect } from '@/components/base/select/select-native';
import { MultiSelect } from '@/components/base/select/multi-select';
import { Toggle } from '@/components/base/toggle/toggle';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { Avatar } from '@/components/base/avatar/avatar';
import EventMap from '@/components/base/map/event-map';
import { UntitledLogo } from '@/components/foundations/logo/untitledui-logo';
import { NavItemButton } from '@/components/application/app-navigation/base-components/nav-item-button';

import { cx } from "@/utils/cx";

interface HostItem {
    label: string;
    id: string;
    supportingText: string;
    avatarUrl: string;
}

interface FormData {
    // Step 1: Event Details
    title: string;
    aboutEvent: string;
    space: string;
    dateFrom: string;
    dateTo: string;
    timezone: string;
    locationType: 'physical' | 'virtual' | 'hybrid' | 'tbd';
    address: string;
    area: string;
    virtualUrls: { url: string; id: string }[];
    coverImage: File | null;
    eventDetails: string;
    additionalDetails: string;
    
    // Step 2: RSVP Config
    rsvpOpens: 'immediately' | 'date';
    rsvpOpensDate: string;
    rsvpCloses: 'capacity' | 'date';
    rsvpClosesDate: string;
    capacity: string;
    hideAttendees: boolean;
    sendInAppNotification: boolean;
    sendEmailNotification: boolean;
    
    // Advanced Options
    // Privacy Settings
    hideAddress: boolean;
    
    // Participants
    participantsList: string[];
    inviteFromMembers: boolean;
    inviteEmails: string;
    
    // Notifications
    inAppConfirmation: boolean;
    emailConfirmation: boolean;
    customEmailText: string;
    inAppReminder: boolean;
    emailReminder: boolean;
    customReminderText: string;
    
    // SEO & URL
    slug: string;
    metaTitle: string;
    metaDescription: string;
    hideFromSearch: boolean;
}

export const AdminContentEventsCreatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState<FormData>({
        // Step 1: Event Details
        title: '',
        aboutEvent: '',
        space: '',
        dateFrom: '',
        dateTo: '',
        timezone: 'UTC',
        locationType: 'physical',
        address: '',
        area: '',
        virtualUrls: [{ url: '', id: 'virtual-url-1' }],
        coverImage: null,
        eventDetails: '',
        additionalDetails: '',
        
        // Step 2: RSVP Config
        rsvpOpens: 'immediately',
        rsvpOpensDate: '',
        rsvpCloses: 'capacity',
        rsvpClosesDate: '',
        capacity: '',
        hideAttendees: false,
        sendInAppNotification: true,
        sendEmailNotification: true,
        
        // Advanced Options
        // Privacy Settings
        hideAddress: false,
        
        // Participants
        participantsList: [],
        inviteFromMembers: false,
        inviteEmails: '',
        
        // Notifications
        inAppConfirmation: false,
        emailConfirmation: false,
        customEmailText: '',
        inAppReminder: false,
        emailReminder: false,
        customReminderText: '',
        
        // SEO & URL
        slug: '',
        metaTitle: '',
        metaDescription: '',
        hideFromSearch: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [seoExpanded, setSeoExpanded] = useState(false);
    const [advancedExpanded, setAdvancedExpanded] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    // MultiSelect for hosts
    const selectedHosts = useListData<HostItem>({
        initialItems: [],
    });

    const spaces = useMemo(() => [
        { id: 'events', label: 'Events' },
        { id: 'announcements', label: 'Announcements' },
        { id: 'general', label: 'General' }
    ], []);

    const hosts = useMemo((): HostItem[] => [
        {
            label: 'John Doe',
            id: 'john-doe',
            supportingText: 'john@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=1',
        },
        {
            label: 'Jane Smith',
            id: 'jane-smith',
            supportingText: 'jane@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=2',
        },
        {
            label: 'Mike Johnson',
            id: 'mike-johnson',
            supportingText: 'mike@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=3',
        },
        {
            label: 'Sarah Wilson',
            id: 'sarah-wilson',
            supportingText: 'sarah@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=4',
        },
        {
            label: 'David Brown',
            id: 'david-brown',
            supportingText: 'david@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=5',
        }
    ], []);

    const locationTypes = useMemo(() => [
        { id: 'physical', label: 'Physical Location', supportingText: 'In-person event', icon: MarkerPin01 },
        { id: 'virtual', label: 'Virtual Event', supportingText: 'Online event', icon: VideoRecorder },
        { id: 'hybrid', label: 'Physical location and virtual', supportingText: 'Both in-person and online', icon: Globe06 },
        { id: 'tbd', label: 'To Be Determined', supportingText: 'Location will be decided later', icon: HelpCircle }
    ], []);
    
    const timezones = useMemo(() => [
        { value: 'UTC', label: 'UTC' },
        { value: 'EST', label: 'EST' },
        { value: 'PST', label: 'PST' },
        { value: 'CET', label: 'CET' },
        { value: 'JST', label: 'JST' },
        { value: 'AEST', label: 'AEST' }
    ], []);

    const rsvpOpensOptions = useMemo(() => [
        { id: 'immediately', label: 'When event is published', supportingText: 'RSVP opens as soon as event goes live', icon: Zap },
        { id: 'date', label: 'At specific date and time', supportingText: 'Choose when RSVP opens', icon: Calendar }
    ], []);

    const rsvpClosesOptions = useMemo(() => [
        { id: 'capacity', label: 'After max capacity is reached', supportingText: 'Closes when full', icon: Users01 },
        { id: 'date', label: 'At specific date and time', supportingText: 'Choose when RSVP closes', icon: Calendar }
    ], []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            console.log("Event data:", formData);
            // Here you would typically send the data to your API
            // await createEvent(formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Navigate back to events list - admin2 version
            navigate("/admin2/content2/events");
        } catch (error) {
            console.error("Error creating event:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/admin2/content2/events");
    };

    const handleFileSelect = (files: FileList | null) => {
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, coverImage: files[0] }));
        }
    };

    return (
        <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 bg-background min-h-screen transition duration-200 ms-[calc(env(safe-area-inset-left))] me-[calc(env(safe-area-inset-right))]">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 bg-primary border-b border-secondary">
                <div className="flex h-16 w-full items-center justify-center">
                    <div className="flex w-full max-w-container justify-between pr-3 pl-4 md:px-8">
                        <div className="flex flex-1 items-center gap-4">
                            <a
                                aria-label="Go to homepage"
                                href="/"
                                className="rounded-sm outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <UntitledLogo className="h-8" />
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden lg:block max-w-md w-full">
                                <Input 
                                    shortcut 
                                    size="sm" 
                                    aria-label="Search" 
                                    placeholder="Search or ask a question (⌘ + /)" 
                                    icon={SearchLg}
                                />
                            </div>

                            <div className="hidden lg:flex">
                                <Button size="sm" color="primary" iconLeading={Plus}>
                                    Create
                                </Button>
                            </div>

                            <div className="relative">
                                <NavItemButton 
                                    label="Notifications" 
                                    icon={Bell01}
                                    size="md"
                                />
                                <div className="absolute -top-1 -right-1 bg-error-solid text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                                    93
                                </div>
                            </div>

                            <div className="relative">
                                <NavItemButton 
                                    label="Messages" 
                                    icon={MessageChatCircle}
                                    size="md" 
                                />
                                <div className="absolute -top-1 -right-1 bg-error-solid text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                                    2
                                </div>
                            </div>

                            <div className="hidden lg:flex">
                                <NavItemButton 
                                    label="Toggle dark mode" 
                                    icon={Moon01}
                                    size="md"
                                />
                            </div>

                            <div className="hidden lg:flex">
                                <NavItemButton 
                                    label="Language" 
                                    icon={() => <span className="text-sm">🇺🇸</span>}
                                    size="md"
                                />
                            </div>

                            <Avatar 
                                size="md"
                                initials="A"
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 flex-1">
                <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 max-w-full self-center gap-3 sm:gap-3.5 md:gap-4 lg:gap-5 flex-1">
                    <main className="w-full flex flex-col col-span-1 md:col-span-6 lg:col-span-8 max-w-full justify-self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0">
                        <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5">
                            <div className="w-full flex flex-col max-w-full md:max-w-3xl self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-0 sm:py-0 md:py-0 lg:py-0 px-0 sm:px-0 md:px-0 lg:px-0">
                    
                    {/* Form Card */}
                    <div className="border border-gray-300 rounded-xl flex flex-col text-content-subdued transition duration-200 justify-between bg-surface">
                        
                        {/* Header */}
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-content font-medium text-heading-xs">
                                <div className="flex space-x-3 items-center">
                                    <Button 
                                        size="sm" 
                                        color="tertiary" 
                                        iconLeading={ArrowLeft}
                                        onClick={handleCancel}
                                        className="!p-2 !w-10 !h-10"
                                    >
                                    </Button>
                                    <span className="text-xl font-medium flex-1">Create a new event</span>
                                </div>
                            </h3>
                        </div>

                        {/* Form */}
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form onSubmit={handleSubmit} className="relative">
                                <div className="w-full flex flex-col max-w-full md:max-w-3xl self-center space-y-6">
                                    
                                    {/* New event Post in */}
                                    <Select
                                        label="New event Post in"
                                        placeholder="Select space"
                                        selectedKey={formData.space}
                                        onSelectionChange={(value) => setFormData(prev => ({ ...prev, space: value as string }))}
                                        items={spaces}
                                    >
                                        {(space) => (
                                            <Select.Item key={space.id} id={space.id}>
                                                {space.label}
                                            </Select.Item>
                                        )}
                                    </Select>

                                    {/* Event Title */}
                                    <Input
                                        label="Event Title"
                                        placeholder="Enter event title"
                                        value={formData.title}
                                        onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                                    />

                                    {/* About Event - Rich Text Editor */}
                                    <div>
                                        <Label>About Event</Label>
                                        <div className="mt-1 relative">
                                            <div
                                                contentEditable="true"
                                                className="tiptap ProseMirror w-full scroll-py-3 overflow-auto rounded-lg bg-primary text-md leading-[1.5] text-primary shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset placeholder:text-placeholder autofill:rounded-lg autofill:text-primary focus:ring-2 focus:ring-brand focus:outline-hidden resize-y p-4"
                                                style={{
                                                    minHeight: '200px'
                                                } as React.CSSProperties}
                                                tabIndex={0}
                                                spellCheck="false"
                                                translate="no"
                                                aria-label="Rich text editor for event description"
                                                onInput={(e) => {
                                                    const content = e.currentTarget.innerHTML;
                                                    setFormData(prev => ({ ...prev, aboutEvent: content }));
                                                }}
                                                onFocus={(e) => {
                                                    // Initialize with paragraph if empty
                                                    if (e.currentTarget.innerHTML.trim() === '') {
                                                        e.currentTarget.innerHTML = '<p><br></p>';
                                                        // Position cursor at the start
                                                        const range = document.createRange();
                                                        const sel = window.getSelection();
                                                        range.setStart(e.currentTarget.firstChild?.firstChild || e.currentTarget, 0);
                                                        range.collapse(true);
                                                        sel?.removeAllRanges();
                                                        sel?.addRange(range);
                                                    }
                                                }}
                                                onBlur={(e) => {
                                                    // Clean up empty content
                                                    const content = e.currentTarget.innerHTML.trim();
                                                    if (content === '<p><br></p>' || content === '<br>' || content === '' || content === '<p></p>') {
                                                        e.currentTarget.innerHTML = '';
                                                        setFormData(prev => ({ ...prev, aboutEvent: '' }));
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    // Handle basic formatting shortcuts
                                                    if (e.metaKey || e.ctrlKey) {
                                                        switch (e.key.toLowerCase()) {
                                                            case 'b':
                                                                e.preventDefault();
                                                                document.execCommand('bold');
                                                                break;
                                                            case 'i':
                                                                e.preventDefault();
                                                                document.execCommand('italic');
                                                                break;
                                                            case 'u':
                                                                e.preventDefault();
                                                                document.execCommand('underline');
                                                                break;
                                                        }
                                                    }
                                                }}
                                                dangerouslySetInnerHTML={{ 
                                                    __html: formData.aboutEvent || ''
                                                }}
                                                suppressContentEditableWarning={true}
                                            />
                                            
                                            {/* Show placeholder when empty */}
                                            {!formData.aboutEvent && (
                                                <div className="absolute top-4 left-4 pointer-events-none text-placeholder">
                                                    Describe your event in detail...
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hosts - MultiSelect */}
                                    <MultiSelect
                                        selectedItems={selectedHosts}
                                        label="Hosts"
                                        placeholder="Search and select hosts..."
                                        items={hosts}
                                    >
                                        {(item) => (
                                            <MultiSelect.Item 
                                                id={item.id} 
                                                supportingText={item.supportingText} 
                                                avatarUrl={item.avatarUrl}
                                            >
                                                {item.label}
                                            </MultiSelect.Item>
                                        )}
                                    </MultiSelect>

                                    {/* Date & Time - All in one row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input
                                            type="datetime-local"
                                            label="Start Date & Time"
                                            value={formData.dateFrom}
                                            onChange={(value) => setFormData(prev => ({ ...prev, dateFrom: value }))}
                                        />
                                        
                                        <InputGroup
                                            label="End Date & Time"
                                            trailingAddon={
                                                <NativeSelect
                                                    options={timezones}
                                                    value={formData.timezone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                                                />
                                            }
                                        >
                                            <InputBase
                                                type="datetime-local"
                                                value={formData.dateTo}
                                                onChange={(value) => setFormData(prev => ({ ...prev, dateTo: value }))}
                                            />
                                        </InputGroup>
                                    </div>

                                    {/* Location Type - Dropdown */}
                                    <Select
                                        label="Location Type"
                                        placeholder="Select location type"
                                        placeholderIcon={MarkerPin01}
                                        selectedKey={formData.locationType}
                                        onSelectionChange={(value) => setFormData(prev => ({ ...prev, locationType: value as 'physical' | 'virtual' | 'hybrid' | 'tbd' }))}
                                        items={locationTypes}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id} supportingText={item.supportingText} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>

                                    {/* Location Details */}
                                    {(formData.locationType === 'physical' || formData.locationType === 'hybrid') && (
                                        <div className="relative pl-6 mt-2 space-y-4">
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                            
                                            {/* Location - visible to everyone */}
                                            <Input
                                                label="Location"
                                                placeholder="Enter area/district"
                                                value={formData.area}
                                                onChange={(value) => setFormData(prev => ({ ...prev, area: value }))}
                                                hint="This location will be shown to everyone"
                                            />

                                            <Input
                                                label="Address"
                                                placeholder="Enter physical address"
                                                value={formData.address}
                                                onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                                                hint="Only shown after RSVP"
                                            />

                                            {/* Additional Details as children of Address */}
                                            <Input
                                                label="Additional details"
                                                placeholder="Room information, building details, etc."
                                                value={formData.additionalDetails}
                                                onChange={(value) => setFormData(prev => ({ ...prev, additionalDetails: value }))}
                                                hint="Only shown after RSVP"
                                            />
                                            
                                            {/* Map Preview */}
                                            {formData.address && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Location Preview
                                                    </label>
                                                    <EventMap 
                                                        location={formData.address}
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {(formData.locationType === 'virtual' || formData.locationType === 'hybrid') && (
                                        <div className="relative pl-6 mt-2 space-y-4">
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                            
                                            <div className="space-y-3">
                                                <label className="block text-sm font-medium text-gray-700">Virtual Event Links</label>
                                                {formData.virtualUrls.map((virtualUrl, index) => (
                                                    <div key={virtualUrl.id} className="flex items-start gap-2">
                                                        <div className="flex-1">
                                                            <InputGroup
                                                                leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
                                                            >
                                                                <InputBase 
                                                                    placeholder="zoom.us/j/123456789"
                                                                    value={virtualUrl.url}
                                                                    onChange={(value) => {
                                                                        const newUrls = [...formData.virtualUrls];
                                                                        newUrls[index] = { ...newUrls[index], url: value };
                                                                        setFormData(prev => ({ ...prev, virtualUrls: newUrls }));
                                                                    }}
                                                                />
                                                            </InputGroup>
                                                            <p className="mt-1 text-xs text-gray-500">Only shown after RSVP</p>
                                                        </div>
                                                        {formData.virtualUrls.length > 1 && index > 0 && (
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                color="tertiary"
                                                                iconLeading={X}
                                                                onClick={() => {
                                                                    const newUrls = formData.virtualUrls.filter((_, i) => i !== index);
                                                                    setFormData(prev => ({ ...prev, virtualUrls: newUrls }));
                                                                }}
                                                                className="!p-2 !w-8 !h-8 mt-1"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    color="tertiary"
                                                    iconLeading={Plus}
                                                    onClick={() => {
                                                        const newUrl = {
                                                            url: '',
                                                            id: `virtual-url-${Date.now()}`
                                                        };
                                                        setFormData(prev => ({ ...prev, virtualUrls: [...prev.virtualUrls, newUrl] }));
                                                    }}
                                                    className="w-fit"
                                                >
                                                    Add another link
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Cover Image */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cover Image
                                        </label>
                                        <FileTrigger
                                            acceptedFileTypes={["image/*"]}
                                            onSelect={(files) => setFormData(prev => ({ ...prev, coverImage: files?.[0] || null }))}
                                        >
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                                                <Image01 className="mx-auto h-10 w-10 text-gray-400" />
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Upload image
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG up to 10MB
                                                </p>
                                            </div>
                                        </FileTrigger>
                                    </div>

                                    {/* Event Details */}
                                    <div>
                                        <TextArea
                                            label="Event Details"
                                            placeholder="Additional event information, requirements, what to bring..."
                                            value={formData.eventDetails}
                                            onChange={(e) => setFormData(prev => ({ ...prev, eventDetails: e.target.value }))}
                                            hint="This information will be displayed after RSVP confirmation. You can include details, requirements, and proper copy here."
                                            rows={4}
                                        />
                                    </div>

                                    {/* Capacity */}
                                    <Input
                                        type="number"
                                        label="Capacity"
                                        placeholder="Maximum number of attendees"
                                        value={formData.capacity}
                                        onChange={(value) => setFormData(prev => ({ ...prev, capacity: value }))}
                                    />

                                    {/* SEO options - Collapsible */}
                                    <div className="border border-gray-200 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => setSeoExpanded(!seoExpanded)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                SEO options
                                                <EyeOff className="size-4 text-gray-400" />
                                            </span>
                                            {seoExpanded ? (
                                                <ChevronUp className="size-4 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="size-4 text-gray-400" />
                                            )}
                                        </button>
                                        
                                        <div className={`overflow-hidden transition-all duration-300 ${seoExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                                                <Input
                                                    label="URL Slug"
                                                    placeholder="event-slug"
                                                    value={formData.slug}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, slug: value }))}
                                                    hint="Custom URL for this event"
                                                />
                                                <Input
                                                    label="Meta Title"
                                                    placeholder="Amazing Event Title"
                                                    value={formData.metaTitle}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, metaTitle: value }))}
                                                    hint="Title for search engines and social media"
                                                />
                                                <TextArea
                                                    label="Meta Description"
                                                    placeholder="Join us for an amazing event that will..."
                                                    value={formData.metaDescription}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                                                    rows={3}
                                                    hint="Description for search engines and social media"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Advanced Options - Collapsible */}
                                    <div className="border border-gray-200 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => setAdvancedExpanded(!advancedExpanded)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                Advanced Options
                                                <EyeOff className="size-4 text-gray-400" />
                                            </span>
                                            {advancedExpanded ? (
                                                <ChevronUp className="size-4 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="size-4 text-gray-400" />
                                            )}
                                        </button>
                                        
                                        <div className={`overflow-hidden transition-all duration-300 ${advancedExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-4 pb-4 space-y-5 border-t border-gray-100">
                                                
                                                {/* Privacy Settings */}
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Privacy Settings</h4>
                                                    <div className="space-y-2">
                                                        <Toggle
                                                            slim
                                                            size="sm"
                                                            label="Hide Address from non-attendees"
                                                            hint="Only confirmed attendees can see address"
                                                            isSelected={formData.hideAddress}
                                                            onChange={(isSelected) => setFormData(prev => ({ ...prev, hideAddress: isSelected }))}
                                                        />
                                                        <Toggle
                                                            slim
                                                            size="sm"
                                                            label="Hide Attendees"
                                                            hint="Don't show who's attending this event"
                                                            isSelected={formData.hideAttendees}
                                                            onChange={(isSelected) => setFormData(prev => ({ ...prev, hideAttendees: isSelected }))}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Email Notifications */}
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Email Notifications</h4>
                                                    <div className="space-y-2">
                                                        <Toggle
                                                            slim
                                                            size="sm"
                                                            label="Email Confirmation"
                                                            hint="Send email notification for registrations"
                                                            isSelected={formData.emailConfirmation}
                                                            onChange={(isSelected) => setFormData(prev => ({ ...prev, emailConfirmation: isSelected }))}
                                                        />

                                                        <div className="space-y-1">
                                                            <Toggle
                                                                slim
                                                                size="sm"
                                                                label="Email Reminder"
                                                                isSelected={formData.emailReminder}
                                                                onChange={(isSelected) => setFormData(prev => ({ ...prev, emailReminder: isSelected }))}
                                                            />
                                                            <div className="text-xs text-gray-500 pl-6">
                                                                <p>• The event is deleted</p>
                                                                <p>• The event time or location has changed</p>
                                                                <p>• 1 hour before the event is due to start</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* In-App Notifications */}
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">In-App Notifications</h4>
                                                    <div className="space-y-2">
                                                        <Toggle
                                                            slim
                                                            size="sm"
                                                            label="In-App Config"
                                                            hint="Send in-app notification for registrations"
                                                            isSelected={formData.inAppConfirmation}
                                                            onChange={(isSelected) => setFormData(prev => ({ ...prev, inAppConfirmation: isSelected }))}
                                                        />

                                                        <div className="space-y-1">
                                                            <Toggle
                                                                slim
                                                                size="sm"
                                                                label="In-App Reminder"
                                                                isSelected={formData.inAppReminder}
                                                                onChange={(isSelected) => setFormData(prev => ({ ...prev, inAppReminder: isSelected }))}
                                                            />
                                                            <div className="text-xs text-gray-500 pl-6">
                                                                <p>• The event is deleted</p>
                                                                <p>• The event time or location has changed</p>
                                                                <p>• 1 hour before the event is due to start</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Button
                                                size="sm"
                                                color="tertiary"
                                                onClick={handleCancel}
                                                type="button"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="relative" ref={dropdownRef}>
                                                <div className="flex items-center">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 text-white px-4 h-8 text-sm rounded-r-none"
                                                    >
                                                        {isSubmitting ? 'Creating...' : 'Create Event'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                                        className="inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 text-white px-1.5 h-8 rounded-l-none border-l border-blue-500"
                                                    >
                                                        <ChevronUp className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                                    </button>
                                                </div>
                                                
                                                {dropdownOpen && (
                                                    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                                        <div className="py-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    console.log('Save Draft');
                                                                    setDropdownOpen(false);
                                                                }}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                            >
                                                                Save Draft
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    console.log('Schedule');
                                                                    setDropdownOpen(false);
                                                                }}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                            >
                                                                Schedule
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    console.log('Publish');
                                                                    setDropdownOpen(false);
                                                                }}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                            >
                                                                Publish
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                                </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
