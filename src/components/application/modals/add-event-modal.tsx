import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useListData } from 'react-stately';
import { Input, InputBase } from '@/components/base/input/input';
import { InputGroup } from '@/components/base/input/input-group';
import { TextArea } from '@/components/base/textarea/textarea';
import { Select } from '@/components/base/select/select';
import { NativeSelect } from '@/components/base/select/select-native';
import { MultiSelect } from '@/components/base/select/multi-select';
import { Toggle } from '@/components/base/toggle/toggle';
import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { FileTrigger } from '@/components/base/file-upload-trigger/file-upload-trigger';
import { Avatar } from '@/components/base/avatar/avatar';
import EventMap from '@/components/base/map/event-map';
import { X, Calendar, Clock, MarkerPin01, Users01, Image01, Tag01, SearchLg, Settings01, Globe01, ChevronDown, ChevronUp, HelpCircle, Zap } from '@untitledui/icons';

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
}

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
    locationType: 'physical' | 'virtual' | 'tbd';
    address: string;
    virtualUrl: string;
    coverImage: File | null;
    
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

export const AddEventModal = ({ isOpen, onClose }: AddEventModalProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [advancedExpanded, setAdvancedExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        virtualUrl: '',
        coverImage: null,
        
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
        inAppConfirmation: true,
        emailConfirmation: true,
        customEmailText: '',
        inAppReminder: true,
        emailReminder: true,
        customReminderText: '',
        
        // SEO & URL
        slug: '',
        metaTitle: '',
        metaDescription: '',
        hideFromSearch: false
    });

    const spaces = useMemo(() => [
        { id: '1', name: 'Main Space', value: 'main-space' },
        { id: '2', name: 'Tech Hub', value: 'tech-hub' },
        { id: '3', name: 'Design Studio', value: 'design-studio' }
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
        { id: 'virtual', label: 'Virtual Event', supportingText: 'Online event', icon: Globe01 },
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

    const handleNext = () => {
        if (currentStep === 1) {
            setCurrentStep(2);
        }
    };
    
    const handleBack = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (currentStep === 1) {
            handleNext();
            return;
        }
        
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const submissionData = {
                ...formData,
                hosts: selectedHosts.items.map(item => item.id)
            };
            console.log('Form Data:', submissionData);
            onClose();
        } catch (error) {
            console.error('Error creating event:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex min-h-dvh w-full items-center justify-center overflow-y-auto bg-overlay/70 px-4 pt-4 pb-[clamp(16px,8vh,64px)] outline-hidden backdrop-blur-[6px] sm:p-8">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl border border-gray-200">
                {/* Close Button */}
                <Button
                    size="sm"
                    color="tertiary"
                    iconLeading={X}
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 !p-1.5 !size-8"
                    aria-label="Close modal"
                />

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="flex flex-col h-[85vh]">
                    {/* Fixed Header */}
                    <header className="flex-shrink-0 px-6 py-5 pr-16 border-b border-gray-200 bg-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Create New Event
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {currentStep === 1 ? 'Fill in the basic event information' : 'Configure RSVP settings and notifications'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Step {currentStep} of 2</span>
                            </div>
                        </div>
                    </header>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <Input
                                    label="Event Title"
                                    placeholder="Enter event title"
                                    value={formData.title}
                                    onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                                />

                                <TextArea
                                    label="About Event"
                                    placeholder="Describe your event in detail..."
                                    value={formData.aboutEvent}
                                    onChange={(e) => setFormData(prev => ({ ...prev, aboutEvent: e.target.value }))}
                                    rows={3}
                                />

                                <Select
                                    label="Space"
                                    placeholder="Select space"
                                    selectedKey={formData.space}
                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, space: value as string }))}
                                >
                                    {spaces.map((space) => (
                                        <Select.Item key={space.id} id={space.value}>
                                            {space.name}
                                        </Select.Item>
                                    ))}
                                </Select>

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
                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, locationType: value as 'physical' | 'virtual' | 'tbd' }))}
                                    items={locationTypes}
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} supportingText={item.supportingText} icon={item.icon}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>

                                {/* Location Details */}
                                {formData.locationType === 'physical' && (
                                    <div className="relative pl-6 mt-2 space-y-4">
                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                        <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                        <Input
                                            label="Address"
                                            placeholder="Enter physical address"
                                            value={formData.address}
                                            onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
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

                                {formData.locationType === 'virtual' && (
                                    <div className="relative pl-6 mt-2">
                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                        <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                        <InputGroup 
                                            label="Virtual URL" 
                                            leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
                                        >
                                            <InputBase 
                                                placeholder="zoom.us/j/123456789"
                                                value={formData.virtualUrl}
                                                onChange={(value) => setFormData(prev => ({ ...prev, virtualUrl: value }))}
                                            />
                                        </InputGroup>
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
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                {/* RSVP Configuration Section */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-base font-medium text-gray-900 mb-4">RSVP Configuration</h3>
                                        
                                        <div className="space-y-4">
                                            {/* RSVP Opens */}
                                            <div>
                                                <Select
                                                    label="RSVP Opens"
                                                    placeholder="Select when RSVP opens"
                                                    placeholderIcon={Calendar}
                                                    selectedKey={formData.rsvpOpens}
                                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, rsvpOpens: value as 'immediately' | 'date' }))}
                                                    items={rsvpOpensOptions}
                                                >
                                                    {(item) => (
                                                        <Select.Item id={item.id} supportingText={item.supportingText} icon={item.icon}>
                                                            {item.label}
                                                        </Select.Item>
                                                    )}
                                                </Select>
                                                
                                                {formData.rsvpOpens === 'date' && (
                                                    <div className="relative pl-6 mt-3">
                                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                                        <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                                        <Input
                                                            type="datetime-local"
                                                            label="RSVP Opens Date & Time"
                                                            value={formData.rsvpOpensDate}
                                                            onChange={(value) => setFormData(prev => ({ ...prev, rsvpOpensDate: value }))}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* RSVP Closes */}
                                            <div>
                                                <Select
                                                    label="RSVP Closes"
                                                    placeholder="Select when RSVP closes"
                                                    placeholderIcon={Calendar}
                                                    selectedKey={formData.rsvpCloses}
                                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, rsvpCloses: value as 'capacity' | 'date' }))}
                                                    items={rsvpClosesOptions}
                                                >
                                                    {(item) => (
                                                        <Select.Item id={item.id} supportingText={item.supportingText} icon={item.icon}>
                                                            {item.label}
                                                        </Select.Item>
                                                    )}
                                                </Select>
                                                
                                                {formData.rsvpCloses === 'date' && (
                                                    <div className="relative pl-6 mt-3">
                                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                                        <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                                        <Input
                                                            type="datetime-local"
                                                            label="RSVP Closes Date & Time"
                                                            value={formData.rsvpClosesDate}
                                                            onChange={(value) => setFormData(prev => ({ ...prev, rsvpClosesDate: value }))}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Capacity - Only show when RSVP Closes is capacity */}
                                            {formData.rsvpCloses === 'capacity' && (
                                                <div className="relative pl-6 mt-3">
                                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                                    <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                                    <Input
                                                        type="number"
                                                        label="Capacity"
                                                        placeholder="Maximum number of attendees"
                                                        value={formData.capacity}
                                                        onChange={(value) => setFormData(prev => ({ ...prev, capacity: value }))}
                                                    />
                                                </div>
                                            )}
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
                                        <span className="text-sm font-medium text-gray-700">Advanced Options</span>
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

                                            {/* Participants */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Participants</h4>
                                                <div className="space-y-3">
                                                    <Toggle
                                                        slim
                                                        size="sm"
                                                        label="Invite from member list"
                                                        hint="Use saved member views and lists"
                                                        isSelected={formData.inviteFromMembers}
                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, inviteFromMembers: isSelected }))}
                                                    />
                                                    <TextArea
                                                        label="Enter Emails (Admins only)"
                                                        placeholder="email1@example.com, email2@example.com"
                                                        value={formData.inviteEmails}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, inviteEmails: e.target.value }))}
                                                        rows={3}
                                                        hint="Comma-separated email addresses"
                                                    />
                                                </div>
                                            </div>

                                            {/* Notifications */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Notifications</h4>
                                                <div className="space-y-2">
                                                    <Toggle
                                                        slim
                                                        size="sm"
                                                        label="In-App Confirmation"
                                                        hint="Send in-app notification when someone registers"
                                                        isSelected={formData.inAppConfirmation}
                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, inAppConfirmation: isSelected }))}
                                                    />
                                                    <Toggle
                                                        slim
                                                        size="sm"
                                                        label="Email Confirmation"
                                                        hint="Send email notification for registrations"
                                                        isSelected={formData.emailConfirmation}
                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, emailConfirmation: isSelected }))}
                                                    />
                                                    <div className={`overflow-hidden transition-all duration-200 ${formData.emailConfirmation ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                        <div className="relative pl-6 mt-2">
                                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                                            <TextArea
                                                                label="Customize email text"
                                                                placeholder="Thank you for registering for our event..."
                                                                value={formData.customEmailText}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, customEmailText: e.target.value }))}
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </div>
                                                    <Toggle
                                                        slim
                                                        size="sm"
                                                        label="In-App Reminder"
                                                        hint="Send reminder notifications before event"
                                                        isSelected={formData.inAppReminder}
                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, inAppReminder: isSelected }))}
                                                    />
                                                    <Toggle
                                                        slim
                                                        size="sm"
                                                        label="Email Reminder"
                                                        hint="Send email reminders before event"
                                                        isSelected={formData.emailReminder}
                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, emailReminder: isSelected }))}
                                                    />
                                                    <div className={`overflow-hidden transition-all duration-200 ${formData.emailReminder ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                        <div className="relative pl-6 mt-2">
                                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                                            <TextArea
                                                                label="Customize reminder text"
                                                                placeholder="Don't forget about our upcoming event..."
                                                                value={formData.customReminderText}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, customReminderText: e.target.value }))}
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* SEO & URL */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">SEO & URL</h4>
                                                <div className="space-y-3">
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
                                                    <Toggle
                                                        slim
                                                        size="sm"
                                                        label="Hide from Search"
                                                        hint="Prevent search engines from indexing this event"
                                                        isSelected={formData.hideFromSearch}
                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, hideFromSearch: isSelected }))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Fixed Footer */}
                    <footer className="flex-shrink-0 border-t border-gray-200 px-6 py-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <Button
                                    size="sm"
                                    color="tertiary"
                                    onClick={onClose}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                            </div>
                            <div className="flex items-center gap-3">
                                {currentStep === 2 && (
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        onClick={handleBack}
                                        type="button"
                                    >
                                        Back
                                    </Button>
                                )}
                                {currentStep === 1 ? (
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 text-white px-4 h-8 text-sm"
                                    >
                                        {isLoading ? 'Loading...' : 'Next'}
                                    </button>
                                ) : (
                                    <div className="relative" ref={dropdownRef}>
                                        <div className="flex items-center">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 text-white px-4 h-8 text-sm rounded-r-none"
                                            >
                                                {isLoading ? 'Creating...' : 'Create Event'}
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
                                )}
                            </div>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
};