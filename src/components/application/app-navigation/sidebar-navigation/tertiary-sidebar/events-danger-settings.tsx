import { useState } from "react";
import { Trash01, AlertTriangle } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";

interface EventsDangerSettingsProps {
    // Add any props if needed
}

export const EventsDangerSettings = ({}: EventsDangerSettingsProps) => {
    const [confirmationText, setConfirmationText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    
    const spaceName = "Event"; // This would come from props or context in real implementation
    const isConfirmationValid = confirmationText === spaceName;

    const handleDelete = async () => {
        if (!isConfirmationValid) return;
        
        setIsDeleting(true);
        try {
            // Here you would make the API call to delete the event
            console.log("Deleting event...");
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Handle success (redirect, show success message, etc.)
            console.log("Event deleted successfully");
        } catch (error) {
            console.error("Error deleting event:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6 p-4">
            <div className="space-y-6 pb-6">
                {/* Delete Event Section */}
                <div className="">
                    <div className="items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error/10">
                            <AlertTriangle className="h-5 w-5 text-error" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold text-error">Delete Event</h4>
                                <p className="text-sm text-tertiary mt-1">
                                    You will lose posts, comments, and all content related to the space.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <Input
                                        label="Enter the name of the space to confirm"
                                    
                                        placeholder={spaceName}
                                        value={confirmationText}
                                        onChange={(value) => setConfirmationText(value)}
                                        className="bg-primary"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-tertiary">
                                        Type <span className="font-medium text-secondary">"{spaceName}"</span> to confirm
                                    </p>
                                    <Button
                                        size="sm"
                                        color="primary-destructive"
                                        iconLeading={Trash01}
                                        disabled={!isConfirmationValid || isDeleting}
                                        onClick={handleDelete}
                                        className="min-w-24"
                                    >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Warning */}
                <div className="rounded-lg border border-error/40 bg-error/5 p-2">
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error/10">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1">
                            <h5 className="text-sm font-medium text-red-500">Important Notice</h5>
                            <p className="text-xs text-tertiary mt-1">
                                This action cannot be undone. All data will be permanently deleted from our servers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 