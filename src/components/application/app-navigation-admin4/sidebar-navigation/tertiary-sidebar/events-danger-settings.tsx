import { useState } from "react";
import { Trash01, AlertTriangle } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { cx } from "@/utils/cx";

interface EventsDangerSettingsProps {
    confirmationText?: string;
    onConfirmationTextChange?: (value: string) => void;
    spaceName?: string; // Dynamic space name
}

export const EventsDangerSettings = ({ 
    confirmationText: externalConfirmationText, 
    onConfirmationTextChange,
    spaceName: propSpaceName 
}: EventsDangerSettingsProps) => {
    const theme = useResolvedTheme();
    const [internalConfirmationText, setInternalConfirmationText] = useState("");
    
    // Use external state if provided, otherwise use internal state
    const confirmationText = externalConfirmationText !== undefined ? externalConfirmationText : internalConfirmationText;
    const setConfirmationText = onConfirmationTextChange || setInternalConfirmationText;
    
    const spaceName = propSpaceName || "Event"; // Use prop or default to "Event"

    return (
        <div className="space-y-6">
            {/* Delete Event Section */}
            <div className="space-y-6 pb-6">
                <div className="">
                    <div className="items-start gap-3">
                        <div className={cx(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            theme === 'dark' ? "bg-red-900/30" : "bg-error/10"
                        )}>
                            <AlertTriangle className={cx(
                                "h-5 w-5",
                                theme === 'dark' ? "text-red-400" : "text-error"
                            )} />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h4 className={cx(
                                    "text-lg font-semibold",
                                    theme === 'dark' ? "text-red-400" : "text-error"
                                )}>Delete {spaceName}</h4>
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