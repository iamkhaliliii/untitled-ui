import { useState } from "react";
import { Upload01, FolderCheck, Plus, Globe01, Lock01, EyeOff, Users01, UsersPlus, UsersCheck, FaceSmile, SwitchVertical01, Heart } from "@untitledui/icons";
import { Input, InputBase } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { InputGroup } from "@/components/base/input/input-group";

interface FormToggles {
    inviteOnly: boolean;
    anyoneInvite: boolean;
    comments: boolean;
    reactions: boolean;
}

interface EventsGeneralSettingsProps {
    formToggles: FormToggles;
    setFormToggles: (callback: (prev: FormToggles) => FormToggles) => void;
}

export const EventsGeneralSettings = ({ formToggles, setFormToggles }: EventsGeneralSettingsProps) => {
    return (
        <div className="space-y-6 p-4">
            <div className="space-y-6 pb-6">
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
                        placeholder="Enter event name"
                    />
                </div>
                
                {/* Description */}
                <div>
                    <TextArea
                        label="Description"
                        placeholder="Describe your event..."
                        rows={3}
                    />
                </div>

                {/* URL Slug */}
                <div>
                    <InputGroup isRequired label="URL Slug" leadingAddon={<InputGroup.Prefix>betterm.../</InputGroup.Prefix>}>
                        <InputBase placeholder="my-awesome-event" tooltip="This is a tooltip" />
                    </InputGroup>
                </div>
                
                {/* Folder */}
                <div>
                    <Select
                        label="Folder"
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

                {/* Visibility */}
                <div>
                    <Select
                        label="Visibility"
                        placeholder="Select visibility"
                        items={[
                            { label: "Public", id: "public", icon: Globe01 },
                            { label: "Private", id: "private", icon: Lock01 },
                            { label: "Private and hidden", id: "private-hidden", icon: EyeOff }
                        ]}
                    >
                        {(item) => (
                            <Select.Item id={item.id} icon={item.icon}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>
                </div>

                {/* Who can post */}
                <div>
                    <Select
                        label="Who can post"
                        placeholder="Select who can post"
                        items={[
                            { label: "All members", id: "all-members", icon: Users01 },
                            { label: "Space members, admins and moderators", id: "space-members", icon: UsersPlus },
                            { label: "Admins and moderators", id: "admins-moderators", icon: UsersCheck },
                        ]}
                    >
                        {(item) => (
                            <Select.Item id={item.id} icon={item.icon}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>
                </div>

                {/* Invite Only Toggle */}
                <div>
                    <Toggle
                        label="Invite Only"
                        hint="Only invited people can attend this event"
                        size="sm"
                        slim
                        isSelected={formToggles.inviteOnly}
                        onChange={(value) => setFormToggles(prev => ({ ...prev, inviteOnly: value }))}
                    />
                </div>

                {/* Anyone Invite Toggle */}
                <div>
                    <Toggle
                        label="Anyone can invite"
                        hint="Allow attendees to invite other people"
                        size="sm"
                        slim
                        isSelected={formToggles.anyoneInvite}
                        onChange={(value) => setFormToggles(prev => ({ ...prev, anyoneInvite: value }))}
                    />
                </div>

                {/* Comment Toggle */}
                <div>
                    <Toggle
                        label="Comments"
                        hint="Allow attendees to comment on the event"
                        size="sm"
                        slim
                        isSelected={formToggles.comments}
                        onChange={(value) => setFormToggles(prev => ({ ...prev, comments: value }))}
                    />
                </div>

                {/* Who Can Reply (conditional) - Only show when comments is enabled */}
                {formToggles.comments && (
                    <div className="ml-4 border-l-2 border-secondary pl-3">
                        <Select
                            label="Who can reply"
                            placeholder="Select who can reply"
                            items={[
                                { label: "All members", id: "all-members", icon: Users01 },
                                { label: "Space members, admins and moderators", id: "space-members", icon: UsersPlus },
                                { label: "Admins and moderators", id: "admins-moderators", icon: UsersCheck },
                            ]}
                        >
                            {(item) => (
                                <Select.Item id={item.id} icon={item.icon}>
                                    {item.label}
                                </Select.Item>
                            )}
                        </Select>
                    </div>
                )}

                {/* Reaction Toggle */}
                <div>
                    <Toggle
                        label="Reactions"
                        hint="Allow attendees to react to posts and comments"
                        size="sm"
                        slim
                        isSelected={formToggles.reactions}
                        onChange={(value) => setFormToggles(prev => ({ ...prev, reactions: value }))}
                    />
                </div>

                {/* Reaction settings (conditional) - Only show when reactions is enabled */}
                {formToggles.reactions && (
                    <div className="ml-4 space-y-4 border-l-2 border-secondary pl-3">
                        <Select
                            label="Who can react"
                            placeholder="Select who can react"
                            items={[
                                { label: "All members", id: "all-members", icon: Users01 },
                                { label: "Space members, admins and moderators", id: "space-members", icon: UsersPlus },
                                { label: "Admins and moderators", id: "admins-moderators", icon: UsersCheck },
                            ]}
                        >
                            {(item) => (
                                <Select.Item id={item.id} icon={item.icon}>
                                    {item.label}
                                </Select.Item>
                            )}
                        </Select>

                        <Select
                            label="Reaction type"
                            placeholder="Select reaction type"
                            items={[
                                { label: "Emojis", id: "emoji", icon: FaceSmile, supportingText: "Multiple reactions" },
                                { label: "Upvotes", id: "upvotes", icon: SwitchVertical01, supportingText: "Single reaction" },
                                { label: "Simple Like", id: "simple", icon: Heart, supportingText: "Single reaction" }
                            ]}
                        >
                            {(item) => (
                                <Select.Item id={item.id} icon={item.icon} supportingText={item.supportingText}>
                                    {item.label}
                                </Select.Item>
                            )}
                        </Select>
                    </div>
                )}
            </div>
        </div>
    );
}; 