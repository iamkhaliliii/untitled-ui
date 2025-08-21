import { useState } from "react";
import { Upload01, FolderCheck, Plus } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";

interface FormToggles {
    inviteOnly: boolean;
    anyoneInvite: boolean;
    hideFromFeed: boolean;
    comments: boolean;
    reactions: boolean;
}

interface EventsGeneralSettingsProps {
    formToggles: FormToggles;
    setFormToggles: (callback: (prev: FormToggles) => FormToggles) => void;
    pageType?: 'events' | 'blog' | 'help' | 'posts';
}

export const EventsGeneralSettings = ({ formToggles, setFormToggles, pageType = 'events' }: EventsGeneralSettingsProps) => {
    const [slug, setSlug] = useState<string>("");

    return (
        <div className="space-y-6 p-4 pb-6">
            <div className="space-y-6 ">
                {/* Icon Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Icon</label>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-dashed border-secondary bg-secondary/20">
                            <Upload01 className="h-4 w-4 text-tertiary" />
                        </div>
                        <button className="flex-1 px-3 py-2 text-sm font-medium bg-secondary text-primary rounded-lg hover:bg-secondary/80 transition-colors">
                            Upload
                        </button>
                    </div>
                    <p className="text-xs text-tertiary">
                        SVG, PNG, JPG or GIF
                    </p>
                </div>

                {/* Name */}
                <div>
                    <Input
                        label="Name"
                        placeholder="Enter space name"
                    />
                </div>
                
                {/* Description */}
                <div>
                    <TextArea
                        label="Description"
                        placeholder="Describe your space..."
                        rows={3}
                    />
                </div>

                {/* Slug */}
                <div>
                    <Input
                        label="Slug"
                        placeholder="your-slug"
                        value={slug}
                        tooltip="This will be your space's URL"
                        onChange={(value) => setSlug(value)}
                    />
                    <p className="text-xs text-tertiary mt-1">
                        <span className="text-gray-500">bettermode.com/</span>   
                        <span className="font-semibold">{slug || "your-slug"}</span>
                    </p>
                </div>

                {/* Banner Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Banner</label>
                    <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-secondary bg-secondary/20 rounded-lg">
                        <div className="text-center">
                            <Upload01 className="h-6 w-6 text-tertiary mx-auto mb-2" />
                            <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors">
                                Upload Banner
                            </button>
                        </div>
                    </div>
                    <p className="text-xs text-tertiary">
                        SVG, PNG, JPG or GIF (recommended: 1200x300px)
                    </p>
                </div>
                
                {/* Collection */}
                <div>
                    <Select
                        label="Collection"
                        placeholder="Select folder"
                        items={[
                            { label: "Root", id: "Root", supportingText: "Root folder" },
                            { label: "My Folder", id: "my-folder", icon: FolderCheck },
                            { label: "New Folder", id: "new-folder", icon: Plus },
                        ]}
                    >
                        {(item) => (
                            <Select.Item id={item.id} icon={item.icon} supportingText={item.supportingText}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>
                </div>
            </div>
        </div>
    );
};