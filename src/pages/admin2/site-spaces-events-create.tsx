import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Plus } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { EventForm } from "@/components/forms/event-form";

export const SiteSpacesEventsCreatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            console.log("Event data:", data);
            // Here you would typically send the data to your API
            // await createEvent(data);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Navigate back to events list
            navigate("/admin/site/spaces/myfolder/events");
        } catch (error) {
            console.error("Error creating event:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/admin/site/spaces/myfolder/events");
    };

    const headerActions = (
        <div className="flex items-center gap-2">
            <Button 
                size="sm" 
                color="secondary" 
                iconLeading={ArrowLeft}
                onClick={handleCancel}
            >
                Back to Events
            </Button>
        </div>
    );

    return (
        <AdminLayout 
            title="Create New Event"
            description="Set up a new event in your MyFolder workspace"
            currentPath={currentPath}
            headerActions={headerActions}
        >
            <div className="px-4 py-6 lg:px-6">
                <div className="mx-auto max-w-2xl">
                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-primary">Event Details</h2>
                            <p className="text-sm text-tertiary">
                                Configure your event settings and permissions
                            </p>
                        </div>

                        <EventForm 
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />

                        {isSubmitting && (
                            <div className="mt-4 flex items-center justify-center">
                                <div className="flex items-center gap-2 text-sm text-tertiary">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent"></div>
                                    Creating event...
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}; 