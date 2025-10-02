import { useState } from "react";
import { Shield01, Database01, Users01, UsersPlus, UsersCheck, X, ChevronDown, Trash01, InfoCircle, Package } from "@untitledui/icons";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

interface FormToggles {
    inviteOnly: boolean;
    anyoneInvite: boolean;
    hideFromFeed: boolean;
    comments: boolean;
    reactions: boolean;
}

interface EventsPermissionsSettingsProps {
    formToggles: FormToggles;
    setFormToggles: (callback: (prev: FormToggles) => FormToggles) => void;
    pageType?: 'events' | 'blog' | 'help' | 'posts';
}

export const EventsPermissionsSettings = ({ formToggles, setFormToggles, pageType = 'events' }: EventsPermissionsSettingsProps) => {
    const [showDisconnectModal, setShowDisconnectModal] = useState<boolean>(false);
    
    // Content Permissions card states
    const [contentPermissionsExpanded, setContentPermissionsExpanded] = useState({
        event: false,
        discussion: false,
        blog: false,
    });

    return (
        <div className="space-y-6 p-4 pb-6">
            {/* Space Permissions Section */}
            <div className="border border-secondary rounded-lg bg-primary p-2">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-secondary">
                    <Shield01 className="size-4 text-brand-secondary" />
                    <h5 className="text-xs font-semibold text-primary">Space Permissions</h5>
                </div>
                <div className="bg-secondary/20 rounded-lg p-3">
                    <div className="space-y-6">
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
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-secondary">
                    <Database01 className="size-4 text-brand-secondary" />
                    <h5 className="text-xs font-semibold text-primary">Content Permissions</h5>
                </div>
                <div className="bg-secondary/20 rounded-lg">
                    {pageType === 'events' && (
                        <div>
                            {/* Event Permission Card */}
                            <div className="bg-primary p-3">
                                <div className="flex items-center gap-2">
                                    <Package className="size-4 text-violet-400 bg-violet-100/20 p-[1px] rounded-md" />
                                    <span className="text-sm font-medium text-secondary">Event</span>
                                    <Badge size="sm" color="gray" className="ml-0">
                                        Beta
                                    </Badge>
                                </div>
                                
                                <div className="mt-4 pt-3 border-t border-secondary">
                                    <div className="text-xs mt-1 flex items-start gap-2">
                                        <InfoCircle className="size-3 mt-0.5 flex-shrink-0 text-tertiary" />
                                        <div className="leading-relaxed text-tertiary">
                                            The Event module is active for this space. In the Beta version, events can be created, managed, and displayed to members by admins and staff.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {pageType === 'blog' && (
                        <div>
                            {/* Discussion Permission Card */}
                            <div className="bg-primary p-3">
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

                            {/* Divider */}
                            <div className="border-t border-secondary"></div>
                            
                            {/* Blog Permission Card */}
                            <div className="bg-primary p-3">
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
                            
                            {/* Bottom message after all cards */}
                            <div className="text-xs px-3 mt-3 flex items-start gap-2">
                                <InfoCircle className="size-3 mt-0.5 flex-shrink-0 text-tertiary" />
                                <div className="leading-relaxed text-tertiary">
                                    Bettermode now supports only one CMS connection per space. This space was created before the change and still has multiple CMS connections. If you remove a CMS, you can't reconnect it, and at least one CMS must remain connected.
                                </div>
                            </div>
                        </div>
                    )}

                    {pageType === 'help' && (
                        <div className="text-center py-2 px-4">
                            <div className="w-12 h-12 mx-auto rounded-full bg-secondary/30 flex items-center justify-center">
                                <Database01 className="size-6 text-tertiary/60" />
                            </div>
                            <h4 className="text-sm font-medium text-secondary mb-1">Static space</h4>
                            <p className="text-xs text-tertiary max-w-xs mx-auto leading-relaxed">
                                This space is static and has no CMS or dynamic content modules. That's why content permissions are not shown here.
                            </p>
                        </div>
                    )}

                    {pageType === 'posts' && (
                        <div>
                            {/* Discussion Permission Card */}
                            <div className="bg-primary p-3">
                                <div className="flex items-center gap-2">
                                    <Database01 className="size-4 text-violet-400 bg-violet-100/20 p-[1px] rounded-md" />
                                    <span className="text-sm font-medium text-secondary">Discussion</span>
                                </div>
                                
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
                            </div>
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
                                        Are you sure you want to disconnect this CMS from the space? 
                                        Once removed, you won't be able to add it back, as Bettermode now supports only one CMS connection per space. 
                                        At least one CMS must remain connected.
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
