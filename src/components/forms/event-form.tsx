import { useState } from "react";
import { Upload01, FolderCode, Globe05, Users01, MessageChatCircle, Heart } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { InputBase } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { cx } from "@/utils/cx";

interface EventFormProps {
    className?: string;
    onSubmit?: (data: any) => void;
    onCancel?: () => void;
    hideActions?: boolean;
}

const folderOptions = [
    { id: "myfolder", label: "MyFolder", icon: FolderCode },
    { id: "shared", label: "Shared", icon: Users01 },
    { id: "archive", label: "Archive", icon: Globe05 },
];

const visibilityOptions = [
    { id: "public", label: "Public", supportingText: "Anyone can view this event" },
    { id: "private", label: "Private", supportingText: "Only invited people can view" },
    { id: "team", label: "Team Only", supportingText: "Only team members can view" },
];

const whoCanPostOptions = [
    { id: "anyone", label: "Anyone", supportingText: "All attendees can post" },
    { id: "moderators", label: "Moderators Only", supportingText: "Only moderators can post" },
    { id: "organizers", label: "Organizers Only", supportingText: "Only event organizers can post" },
];

const whoCanReplyOptions = [
    { id: "anyone", label: "Anyone", supportingText: "All attendees can reply" },
    { id: "moderators", label: "Moderators Only", supportingText: "Only moderators can reply" },
    { id: "original-poster", label: "Original Poster", supportingText: "Only the original poster can reply" },
];

const whoCanReactOptions = [
    { id: "anyone", label: "Anyone", supportingText: "All attendees can react" },
    { id: "moderators", label: "Moderators Only", supportingText: "Only moderators can react" },
    { id: "no-reactions", label: "No Reactions", supportingText: "Reactions are disabled" },
];

const reactionTypeOptions = [
    { id: "emoji", label: "Emoji Reactions", supportingText: "👍 😊 ❤️ 😢 😡" },
    { id: "thumbs", label: "Thumbs Only", supportingText: "👍 👎" },
    { id: "hearts", label: "Hearts Only", supportingText: "❤️ 🧡 💛 💚 💙 💜" },
    { id: "custom", label: "Custom Reactions", supportingText: "Define your own reaction set" },
];

export const EventForm = ({ className, onSubmit, onCancel, hideActions = false }: EventFormProps) => {
    const [formData, setFormData] = useState({
        icon: null as File | null,
        coverImage: null as File | null,
        name: "",
        description: "",
        host: "",
        urlSlug: "",
        folder: "",
        visibility: "",
        whoCanPost: "",
        inviteOnly: false,
        anyoneInvite: false,
        commentEnabled: false,
        whoCanReply: "",
        reactionEnabled: false,
        whoCanReact: "",
        reactionType: "",
    });

    const handleFileSelect = (files: FileList | null) => {
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, icon: files[0] }));
        }
    };

    const handleCoverImageSelect = (files: FileList | null) => {
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, coverImage: files[0] }));
        }
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleToggleChange = (field: string) => (value: boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={cx("space-y-4", className)}>
            {/* Icon Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Icon</label>
                <FileTrigger
                    acceptedFileTypes={["image/*"]}
                    onSelect={handleFileSelect}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-secondary bg-secondary/20">
                            {formData.icon ? (
                                <img
                                    src={URL.createObjectURL(formData.icon)}
                                    alt="Event icon"
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            ) : (
                                <Upload01 className="h-6 w-6 text-tertiary" />
                            )}
                        </div>
                        <Button size="sm" color="secondary" iconLeading={Upload01} className="w-full">
                            {formData.icon ? "Change Icon" : "Upload Icon"}
                        </Button>
                        <p className="text-xs text-tertiary text-center">
                            SVG, PNG, JPG or GIF (max. 512x512px)
                        </p>
                    </div>
                </FileTrigger>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Cover Image <span className="text-destructive">*</span></label>
                <FileTrigger
                    acceptedFileTypes={["image/*"]}
                    onSelect={handleCoverImageSelect}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-secondary bg-secondary/20">
                            {formData.coverImage ? (
                                <img
                                    src={URL.createObjectURL(formData.coverImage)}
                                    alt="Cover image"
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <Upload01 className="h-8 w-8 text-tertiary" />
                                    <p className="text-sm text-tertiary">Upload cover image</p>
                                </div>
                            )}
                        </div>
                        <Button size="sm" color="secondary" iconLeading={Upload01} className="w-full">
                            {formData.coverImage ? "Change Cover Image" : "Upload Cover Image"}
                        </Button>
                        <p className="text-xs text-tertiary text-center">
                            SVG, PNG, JPG or GIF (recommended: 1200x600px)
                        </p>
                    </div>
                </FileTrigger>
            </div>

            {/* Name */}
            <Input
                label="Event Name"
                placeholder="Enter event name"
                isRequired
                value={formData.name}
                onChange={handleInputChange("name")}
            />

            {/* Host */}
            <Input
                label="Host"
                placeholder="Enter host name"
                isRequired
                value={formData.host}
                onChange={handleInputChange("host")}
            />

            {/* Description */}
            <TextArea
                label="Description"
                placeholder="Describe your event..."
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description")(e.target.value)}
            />

            {/* URL Slug */}
            <InputGroup
                label="URL Slug"
                hint="This will be used to create the event URL"
                leadingAddon={<InputGroup.Prefix>https://event.com/</InputGroup.Prefix>}
            >
                <InputBase
                    placeholder="my-awesome-event"
                    value={formData.urlSlug}
                    onChange={handleInputChange("urlSlug")}
                />
            </InputGroup>

            {/* Folder */}
            <Select
                label="Folder"
                placeholder="Select folder"
                selectedKey={formData.folder}
                onSelectionChange={(key) => setFormData(prev => ({ ...prev, folder: key as string }))}
                items={folderOptions}
            >
                {(item) => (
                    <Select.Item key={item.id} id={item.id}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>

            {/* Visibility */}
            <Select
                label="Visibility"
                placeholder="Select visibility"
                selectedKey={formData.visibility}
                onSelectionChange={(key) => setFormData(prev => ({ ...prev, visibility: key as string }))}
                items={visibilityOptions}
            >
                {(item) => (
                    <Select.Item key={item.id} id={item.id}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>

            {/* Who Can Post */}
            <Select
                label="Who can post"
                placeholder="Select who can post"
                selectedKey={formData.whoCanPost}
                onSelectionChange={(key) => setFormData(prev => ({ ...prev, whoCanPost: key as string }))}
                items={whoCanPostOptions}
            >
                {(item) => (
                    <Select.Item key={item.id} id={item.id}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>

            {/* Invite Only Toggle */}
            <Toggle
                label="Invite Only"
                hint="Only invited people can attend this event"
                isSelected={formData.inviteOnly}
                onChange={handleToggleChange("inviteOnly")}
            />

            {/* Anyone Invite Toggle */}
            <Toggle
                label="Anyone can invite"
                hint="Allow attendees to invite other people"
                isSelected={formData.anyoneInvite}
                onChange={handleToggleChange("anyoneInvite")}
            />

            {/* Comment Toggle */}
            <Toggle
                label="Comments"
                hint="Allow attendees to comment on the event"
                isSelected={formData.commentEnabled}
                onChange={handleToggleChange("commentEnabled")}
            />

            {/* Conditional Comment Settings */}
            {formData.commentEnabled && (
                <div className="ml-4 space-y-4 border-l-2 border-secondary pl-3">
                    <Select
                        label="Who can reply"
                        placeholder="Select who can reply"
                        selectedKey={formData.whoCanReply}
                        onSelectionChange={(key) => setFormData(prev => ({ ...prev, whoCanReply: key as string }))}
                        items={whoCanReplyOptions}
                    >
                        {(item) => (
                            <Select.Item key={item.id} id={item.id}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>
                </div>
            )}

            {/* Reaction Toggle */}
            <Toggle
                label="Reactions"
                hint="Allow attendees to react to posts and comments"
                isSelected={formData.reactionEnabled}
                onChange={handleToggleChange("reactionEnabled")}
            />

            {/* Conditional Reaction Settings */}
            {formData.reactionEnabled && (
                <div className="ml-4 space-y-4 border-l-2 border-secondary pl-3">
                    <Select
                        label="Who can react"
                        placeholder="Select who can react"
                        selectedKey={formData.whoCanReact}
                        onSelectionChange={(key) => setFormData(prev => ({ ...prev, whoCanReact: key as string }))}
                        items={whoCanReactOptions}
                    >
                        {(item) => (
                            <Select.Item key={item.id} id={item.id}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>

                    <Select
                        label="Reaction type"
                        placeholder="Select reaction type"
                        selectedKey={formData.reactionType}
                        onSelectionChange={(key) => setFormData(prev => ({ ...prev, reactionType: key as string }))}
                        items={reactionTypeOptions}
                    >
                        {(item) => (
                            <Select.Item key={item.id} id={item.id}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>
                </div>
            )}

            {/* Form Actions */}
            {!hideActions && (
                <div className="flex justify-end gap-3 pt-6 border-t border-secondary">
                    <Button color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Create Event
                    </Button>
                </div>
            )}
        </form>
    );
}; 