import { useState } from "react";
import { Upload01, FolderCheck, Plus, Globe01, Lock01, Eye, EyeOff, Users01, UsersPlus, UsersCheck, FaceSmile, SwitchVertical01, Heart, Shield01, Database01, Rss01, Home01, Link01, UserPlus01, X, Settings01, Trash01, ChevronDown, MessageSquare01, Package, Edit03, InfoCircle } from "@untitledui/icons";
import { Input, InputBase } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { InputGroup } from "@/components/base/input/input-group";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

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
}

export const EventsGeneralSettings = ({ formToggles, setFormToggles }: EventsGeneralSettingsProps) => {
    const [visibility, setVisibility] = useState<string>("public");
    const [privateMessage, setPrivateMessage] = useState<string>("");
    const [privateAction, setPrivateAction] = useState<string>("request-to-join");
    const [customUrl, setCustomUrl] = useState<string>("");
    const [slug, setSlug] = useState<string>("");
    const [showDisconnectModal, setShowDisconnectModal] = useState<boolean>(false);
    
    // Content Permissions card states
    const [contentPermissionsExpanded, setContentPermissionsExpanded] = useState({
        event: false,
        discussion: false,
        blog: false,
    });
    const [showContentPermissions, setShowContentPermissions] = useState(true);

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




               {/* Hide from Feed Toggle */}
               {/*  <div>
                    <Toggle
                        label="Hide from feed"
                        hint="Hide posts from this space in the community feed"
                        size="sm"
                        slim
                        isSelected={formToggles.hideFromFeed}
                        onChange={(value) => setFormToggles(prev => ({ ...prev, hideFromFeed: value }))}
                    />
                </div>  */}
            </div>



            {/* Space Permissions Section */}
            <div className="border border-secondary rounded-lg bg-primary p-2">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-secondary">
                    <Shield01 className="size-4 text-brand-secondary" />
                    <h5 className="text-xs font-semibold text-primary">Space Permissions</h5>
                </div>
                <div className="bg-secondary/20 rounded-lg p-3">
                    <div className="space-y-6">
                        {/* Visibility */}
                        <div>
                            <Select
                                label="Visibility"
                                placeholder="Select visibility"
                                onSelectionChange={(selected) => setVisibility(String(selected))}
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

                        {/* Private Visibility Settings */}
                        {visibility === "private" && (
                            <div className="ml-4 space-y-4 border-l-2 border-secondary pl-3">
                                {/* Private Message */}
                                <div>
                                    <label className="text-sm font-medium text-secondary mb-2 block">
                                        Message for visitors who cannot access
                                    </label>
                                    <TextArea
                                        placeholder="Enter a message explaining why this content is private and what visitors can do..."
                                        value={privateMessage}
                                        onChange={(e) => setPrivateMessage(e.target.value)}
                                        rows={4}
                                    />
                                    <p className="text-xs text-tertiary mt-1">
                                        This message will be shown to visitors who don't have access to this private space.
                                    </p>
                                </div>

                                {/* Private Action */}
                                <div>
                                    <Select
                                        label="Button to show visitors"
                                        placeholder="Select button type"
                                        onSelectionChange={(selected) => setPrivateAction(String(selected))}
                                        items={[
                                            { label: "Show 'Request to Join' button", id: "request-to-join", icon: UserPlus01 },
                                            { label: "Show 'Go to Home' button", id: "go-to-home", icon: Home01 },
                                            { label: "Show 'Visit Link' button", id: "custom-url", icon: Link01 }
                                        ]}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                    <p className="text-xs text-tertiary mt-1">
                                        Choose what button visitors will see when they try to access this private content.
                                    </p>
                                </div>

                                {/* Custom URL Field (conditional) */}
                                {privateAction === "custom-url" && (
                                    <div className="ml-4">
                                        <Input
                                            label="Link URL for 'Visit Link' button"
                                            placeholder="https://example.com/contact"
                                            value={customUrl}
                                            onChange={(value) => setCustomUrl(value)}
                                        />
                                        <p className="text-xs text-tertiary mt-1">
                                            When visitors click the 'Visit Link' button, they will be redirected to this URL.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Make private Toggle */}
                        <div>
                            <Toggle
                                label="Make private"
                                size="sm"
                                slim
                                isSelected={formToggles.anyoneInvite}
                                onChange={(value) => setFormToggles(prev => ({ ...prev, anyoneInvite: value }))}
                            />
                        </div>

                        {/* Invite Only Toggle */}
                        <div>
                            <Toggle
                                label="Make invite-only"
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
                                size="sm"
                                slim
                                isSelected={formToggles.anyoneInvite}
                                onChange={(value) => setFormToggles(prev => ({ ...prev, anyoneInvite: value }))}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Permissions Section */}
            <div className="border border-secondary rounded-lg bg-primary p-2">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-secondary">
                    <div className="flex items-center gap-2">
                        <Database01 className="size-4 text-brand-secondary" />
                        <h5 className="text-xs font-semibold text-primary">Content Permissions</h5>
                    </div>
                    <button
                        onClick={() => setShowContentPermissions(!showContentPermissions)}
                        className="p-1 rounded-md hover:bg-secondary/60 transition-colors text-tertiary hover:text-secondary"
                        title={showContentPermissions ? "Hide permissions" : "Show permissions"}
                    >
                        {showContentPermissions ? (
                            <Eye className="size-4" />
                        ) : (
                            <EyeOff className="size-4" />
                        )}
                    </button>
                </div>
                <div className="bg-secondary/20 rounded-lg p-3">
                    {showContentPermissions ? (
                        <div className="space-y-3">
                        {/* Event Permission Card */}
                        <div className="border border-secondary rounded-lg bg-primary p-3">
                            <div 
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => setContentPermissionsExpanded(prev => ({ ...prev, event: !prev.event }))}
                            >
                                <div className="flex items-center gap-2">
                                    <Package className="size-4 text-violet-400 bg-violet-100/20 p-[1px] rounded-md" />
                                    <span className="text-sm font-medium text-secondary">Event</span>
                                    <Badge size="sm" color="gray" className="ml-1">
                                        Beta
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                    <ChevronDown className={`size-4 transform transition-transform ${contentPermissionsExpanded.event ? 'rotate-180' : ''} text-tertiary`} />
                                </div>
                            </div>
                            
                            {contentPermissionsExpanded.event && (
                                <div className="mt-4 pt-3 border-t border-secondary">
                                    <div className="text-xs mt-4 flex items-start gap-2">
                                        <InfoCircle className="size-3 mt-0.5 flex-shrink-0 text-tertiary" />
                                        <div className="leading-relaxed text-tertiary">
                                            The event module is active for this space. Events can be created, 
                                            managed, and displayed to members based on your space permissions.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Discussion Permission Card */}
                        <div className="border border-secondary rounded-lg bg-primary p-3">
                            <div 
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => setContentPermissionsExpanded(prev => ({ ...prev, discussion: !prev.discussion }))}
                            >
                                <div className="flex items-center gap-2">
                                    <Database01 className="size-4 text-violet-400 bg-violet-100/20 p-[1px] rounded-md" />
                                    <span className="text-sm font-medium text-secondary">Discussion</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDisconnectModal(true);
                                        }}
                                        className="p-1 rounded-md hover:bg-secondary/60 transition-colors text-tertiary hover:text-error"
                                        title="Disconnect CMS"
                                    >
                                        <Trash01 className="size-4" />
                                    </button>
                                    <ChevronDown className={`size-4 transform transition-transform ${contentPermissionsExpanded.discussion ? 'rotate-180' : ''} text-tertiary`} />
                                </div>
                            </div>
                            
                            {contentPermissionsExpanded.discussion && (
                                <div className="mt-4 pt-3 border-t border-secondary space-y-4">
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
                                    
                                    <Select
                                        label="Who can comment"
                                        placeholder="Select who can comment"
                                        items={[
                                            { label: "All members", id: "all-members", icon: Users01 },
                                            { label: "Space members, Admins and Moderators", id: "space-members", icon: UsersPlus },
                                            { label: "Admins and moderators", id: "admins-moderators", icon: UsersCheck },
                                            { label: "Nobody", id: "nobody", icon: X },
                                        ]}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                    
                                    <Select
                                        label="Who can react"
                                        placeholder="Select who can react"
                                        items={[
                                            { label: "All members", id: "all-members", icon: Users01 },
                                            { label: "Space members, Admins and Moderators", id: "space-members", icon: UsersPlus },
                                            { label: "Admins and moderators", id: "admins-moderators", icon: UsersCheck },
                                            { label: "Nobody", id: "nobody", icon: X },
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
                        </div>

                        {/* Blog Permission Card */}
                        <div className="border border-secondary rounded-lg bg-primary p-3">
                            <div 
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => setContentPermissionsExpanded(prev => ({ ...prev, blog: !prev.blog }))}
                            >
                                <div className="flex items-center gap-2">
                                    <Database01 className="size-4 text-violet-400 bg-violet-100/20 p-[1px] rounded-md" />
                                    <span className="text-sm font-medium text-secondary">Blog</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDisconnectModal(true);
                                        }}
                                        className="p-1 rounded-md hover:bg-secondary/60 transition-colors text-tertiary hover:text-error"
                                        title="Disconnect CMS"
                                    >
                                        <Trash01 className="size-4" />
                                    </button>
                                    <ChevronDown className={`size-4 transform transition-transform ${contentPermissionsExpanded.blog ? 'rotate-180' : ''} text-tertiary`} />
                                </div>
                            </div>
                            
                            {contentPermissionsExpanded.blog && (
                                <div className="mt-4 pt-3 border-t border-secondary space-y-4">
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
                                    
                                    <Select
                                        label="Who can comment"
                                        placeholder="Select who can comment"
                                        items={[
                                            { label: "All members", id: "all-members", icon: Users01 },
                                            { label: "Space members, Admins and Moderators", id: "space-members", icon: UsersPlus },
                                            { label: "Admins and moderators", id: "admins-moderators", icon: UsersCheck },
                                            { label: "Nobody", id: "nobody", icon: X },
                                        ]}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                    
                                    <Select
                                        label="Who can react"
                                        placeholder="Select who can react"
                                        items={[
                                            { label: "All members", id: "all-members", icon: Users01 },
                                            { label: "Space members, Admins and Moderators", id: "space-members", icon: UsersPlus },
                                            { label: "Admins and moderators", id: "admins-moderators", icon: UsersCheck },
                                            { label: "Nobody", id: "nobody", icon: X },
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
                        </div>
                        </div>
                    ) : (
                        <div className="text-center py-2">
                            <div className="w-12 h-12 mx-auto rounded-full bg-secondary/30 flex items-center justify-center">
                                <Database01 className="size-6 text-tertiary/60" />
                            </div>
                            <h4 className="text-sm font-medium text-secondary mb-1">Static space</h4>
                            <p className="text-xs text-tertiary max-w-xs mx-auto leading-relaxed">
                                This space has no dynamic content modules or CMS connections. 
                                It serves static content only.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Disconnect CMS Modal */}
            {showDisconnectModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-primary border border-secondary rounded-lg shadow-lg max-w-md w-full mx-4">
                        <div className="p-6">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                                        <Trash01 className="w-5 h-5 text-error" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-primary mb-2">
                                        Disconnect CMS
                                    </h3>
                                    <p className="text-sm text-secondary mb-4">
                                        Are you sure you want to disconnect the CMS from this space? 
                                        Bettermode no longer supports spaces with multiple CMS connections. 
                                        Once disconnected, you won't be able to reconnect the CMS to this space.
                                    </p>
                                    <div className="flex gap-3 justify-end">
                                        <Button
                                            size="sm"
                                            color="tertiary"
                                            onClick={() => setShowDisconnectModal(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="primary-destructive"
                                            onClick={() => {
                                                // Handle disconnect logic here
                                                console.log("CMS disconnected");
                                                setShowDisconnectModal(false);
                                            }}
                                        >
                                            Disconnect
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 