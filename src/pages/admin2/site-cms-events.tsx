import { AdminLayout } from "@/components/layouts/admin-layout";
import { useLocation } from "react-router";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";

export const SiteCmsEventsPage = () => {
    const location = useLocation();
    
    // Determine which content to show based on the current path
    const isSettingsTab = location.pathname.includes('/settings');
    const isCustomizeTab = location.pathname.includes('/customize');
    
    const renderSettingsContent = () => (
        <div className="h-full overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    {/* Form Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Form preview
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-6 space-y-6">
                        {/* Event Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter event title"
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* About Event */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                About Event
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Describe your event in detail..."
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Space Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Post in
                            </label>
                            <select disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed">
                                <option>Select space</option>
                                <option>Events</option>
                                <option>Announcements</option>
                                <option>General</option>
                            </select>
                        </div>

                        {/* Hosts */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hosts
                            </label>
                            <input
                                type="text"
                                placeholder="Search and select hosts..."
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date & Time
                                </label>
                                <div className="flex">
                                    <input
                                        type="datetime-local"
                                        disabled
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                    <select disabled className="px-3 py-2 border-l-0 border-gray-300 rounded-r-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed">
                                        <option>UTC</option>
                                        <option>EST</option>
                                        <option>PST</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Location Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location Type
                            </label>
                            <select disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed">
                                <option>Physical Location - In-person event</option>
                                <option>Virtual Event - Online event</option>
                                <option>To Be Determined - Location will be decided later</option>
                            </select>
                        </div>

                        {/* Location Details */}
                        <div className="relative pl-6 space-y-4">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter area/district"
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-sm text-gray-500 mt-1">This location will be shown to everyone</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter physical address"
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-sm text-gray-500 mt-1">Only shown after RSVP</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Additional details
                                </label>
                                <input
                                    type="text"
                                    placeholder="Room information, building details, etc."
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-sm text-gray-500 mt-1">Only shown after RSVP</p>
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cover Image
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 cursor-not-allowed">
                                <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">Upload image</p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                            </div>
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Capacity
                            </label>
                            <input
                                type="number"
                                placeholder="Maximum number of attendees"
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                disabled
                                className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    disabled
                                    className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-300 border border-transparent rounded-l-lg cursor-not-allowed"
                                >
                                    Create Event
                                </button>
                                <button
                                    type="button"
                                    disabled
                                    className="px-2 py-2 text-gray-400 bg-gray-300 border-l border-gray-400 rounded-r-lg cursor-not-allowed"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderCustomizeContent = () => (
        <div className="h-full">
            <BrowserMockup 
                url="/site/cms/events" 
                title="CMS Events"
            />
        </div>
    );
    
    return (
        <AdminLayout title="CMS Events"
        hideHeader={true}
         currentPath={location.pathname}>
            <div className="flex h-full">
                <div className="flex-1 p-6">
                    <div className="h-full flex flex-col">
                        
                        {/* Main content area */}
                        <div className="flex-1 bg-primary border border-secondary rounded-lg overflow-hidden">
                            {isSettingsTab ? renderSettingsContent() : isCustomizeTab ? renderCustomizeContent() : renderCustomizeContent()}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
