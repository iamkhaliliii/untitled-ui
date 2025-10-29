import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Toggle } from "@/components/base/toggle/toggle";
import { Badge } from "@/components/base/badges/badges";
import { Label } from "@/components/base/input/label";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";
import { Avatar } from "@/components/base/avatar/avatar";

export const AdminModerationPage = () => {
    const location = useLocation();
    
    const [moderationSettings, setModerationSettings] = useState({
        akismet: true,
        oopspam: true,
        keywordModeration: true,
        publishAfterApproval: true,
        includeProfanities: true,
        monitoredContents: false,
        accountAgeModeration: true,
        membersWatchlist: true,
        customBlacklist: "test,AppSumo,Circle.so,Mighty Networks,Vanilla Forums,Discourse,Circle,bug,lifetime",
        minimumHoursToPost: "72",
        minimumHoursToReply: "72",
    });

    const [watchlistMembers] = useState([
        { id: "1", name: "HackingFlix", image: "https://tribe-s3-production.imgix.net/AzmhHh4xHLWt0VgBFyBPJ?fit=max&w=500&auto=compress,format" },
        { id: "2", name: "chaima bondka", image: null, initials: "cb" },
        { id: "3", name: "Olaf Kaminski", image: "https://tribe-s3-production.imgix.net/9WTpJeWGrtb7glFrADlUC?fit=max&w=500&auto=compress,format" },
        { id: "4", name: "Xtmobile Iphone17", image: "https://tribe-s3-production.imgix.net/51mYxINloeUYn7zutzTPU?fit=max&w=500&auto=compress,format" },
        { id: "5", name: "New site", image: null, initials: "Ns" },
        { id: "6", name: "Jessica Bennet", image: "https://tribe-s3-production.imgix.net/AvACrpvOwm7u1rsXP3bma?fit=max&w=500&auto=compress,format" },
        { id: "7", name: "capsglobal digital", image: "https://lh3.googleusercontent.com/a/ACg8ocKhgXsFibA8NUTBfx9b_cozogxkoMojEgrA6LRLXeTxatcc-gs=s96-c" },
    ]);

    const timeOptions = [
        { id: "24", label: "1 day" },
        { id: "48", label: "2 days" },
        { id: "72", label: "3 days" },
        { id: "168", label: "7 days" },
    ];

    const handleToggleChange = (name: string, checked: boolean) => {
        setModerationSettings(prev => ({ ...prev, [name]: checked }));
    };

    const handleInputChange = (name: string, value: string) => {
        setModerationSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Update moderation settings:", moderationSettings);
    };

    return (
        <Admin4Layout 
            title="Moderation"
            description="Configure moderation and spam detection settings"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="max-w-3xl flex flex-col space-y-5">

                    {/* AI Spam Detector */}
                    <form className="relative" onSubmit={handleSubmit}>
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                <div>
                                    <h3 className="text-primary font-medium text-lg">
                                        <div className="flex gap-3">
                                            <p>AI spam detector</p>
                                            <div className="flex flex-col justify-center">
                                                <Badge size="sm" color="success">
                                                    Beta
                                                </Badge>
                                            </div>
                                        </div>
                                    </h3>
                                    <div className="text-tertiary mt-1">
                                        <p>Enable AI spam detector to automatically detect spam posts and comments.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Toggle
                                            label="Akismet"
                                            hint={
                                                <span>
                                                    Enable Akismet AI to automatically detect spam posts and comments. User's data including IP address, user agent, referrer, and site URL will be sent to{" "}
                                                    <a 
                                                        href="https://akismet.com/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-brand-secondary hover:text-brand-secondary-hovered underline font-bold"
                                                    >
                                                        Akismet
                                                    </a>
                                                    {" "}for spam checking.
                                                </span>
                                            }
                                            isSelected={moderationSettings.akismet}
                                            onChange={(checked) => handleToggleChange("akismet", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div>
                                        <Toggle
                                            label="OOPSpam"
                                            hint={
                                                <span>
                                                    Enable OOPSpam to automatically detect spam posts and comments. User's data including IP address, user agent, referrer, and site URL will be sent to{" "}
                                                    <a 
                                                        href="https://www.oopspam.com/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-brand-secondary hover:text-brand-secondary-hovered underline font-bold"
                                                    >
                                                        OOPSpam
                                                    </a>
                                                    {" "}for spam checking.
                                                </span>
                                            }
                                            isSelected={moderationSettings.oopspam}
                                            onChange={(checked) => handleToggleChange("oopspam", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-5 sm:p-6 sm:flex sm:flex-row-reverse pt-0 sm:pt-0">
                                <Button type="submit" size="sm" isDisabled={true}>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Moderation Alerts */}
                    <form className="relative" onSubmit={handleSubmit}>
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                <div>
                                    <h3 className="text-primary font-medium text-lg">Moderation alerts</h3>
                                    <div className="text-tertiary mt-1">
                                        <p>Moderation alerts flag certain keywords or phrases in posts or comments for review before they are published. Admins are notified to review content and take action if necessary. Admin-created content bypasses moderation.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Toggle
                                            label="Enable keyword moderation"
                                            isSelected={moderationSettings.keywordModeration}
                                            onChange={(checked) => handleToggleChange("keywordModeration", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div>
                                        <Toggle
                                            label="Publish after admin approval only"
                                            isSelected={moderationSettings.publishAfterApproval}
                                            onChange={(checked) => handleToggleChange("publishAfterApproval", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div>
                                        <Toggle
                                            label={
                                                <a 
                                                    href="https://github.com/web-mech/badwords/blob/master/lib/lang.json"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                >
                                                    Include common profanities
                                                </a>
                                            }
                                            isSelected={moderationSettings.includeProfanities}
                                            onChange={(checked) => handleToggleChange("includeProfanities", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="customBlacklist">Keywords</Label>
                                        <div className="space-y-2">
                                            <TextArea
                                                id="customBlacklist"
                                                name="customBlacklist"
                                                value={moderationSettings.customBlacklist}
                                                onChange={(e) => handleInputChange("customBlacklist", e.target.value)}
                                                rows={4}
                                            />
                                            <div className="text-sm text-tertiary">
                                                Enter keywords Separated by commas or new lines. (e.g. "badword1, badword2")
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" isDisabled={true}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Monitored Contents */}
                    <form className="relative" onSubmit={handleSubmit}>
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                <div>
                                    <h3 className="text-primary font-medium text-lg">Monitored contents</h3>
                                    <div className="text-tertiary mt-1">
                                        <p>Choose spaces and post types where all content will undergo a moderation check.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Toggle
                                            label="Enable monitored contents"
                                            isSelected={moderationSettings.monitoredContents}
                                            onChange={(checked) => handleToggleChange("monitoredContents", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div className={`relative ${!moderationSettings.monitoredContents ? 'opacity-50' : ''}`}>
                                        {!moderationSettings.monitoredContents && <div className="absolute inset-0 cursor-default z-50"></div>}
                                        <div>
                                            <Label>Select spaces</Label>
                                            <div className="mt-1 space-y-2">
                                                <div className="relative">
                                                    <div className="flex flex-wrap gap-2 p-3 border border-secondary rounded-lg bg-primary">
                                                        {/* Empty state or populated list would go here */}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-tertiary">
                                                    Send all posts to moderation in selected spaces.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`relative ${!moderationSettings.monitoredContents ? 'opacity-50' : ''}`}>
                                        {!moderationSettings.monitoredContents && <div className="absolute inset-0 cursor-default z-50"></div>}
                                        <div>
                                            <Label>Select CMS models</Label>
                                            <div className="mt-1 space-y-2">
                                                <div className="relative">
                                                    <div className="flex flex-wrap gap-2 p-3 border border-secondary rounded-lg bg-primary">
                                                        {/* Empty state or populated list would go here */}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-tertiary">
                                                    Send all posts created with selected CMS model to moderation.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-5 sm:p-6 sm:flex sm:flex-row-reverse pt-0 sm:pt-0">
                                <Button type="submit" size="sm" isDisabled={true}>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Account Age-Based Moderation */}
                    <form className="relative" onSubmit={handleSubmit}>
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                <div>
                                    <h3 className="text-primary font-medium text-lg">Account age-based moderation</h3>
                                    <div className="text-tertiary mt-1">
                                        <p>Set criteria based on account age to determine which posts and replies are automatically held for moderation. This helps monitor content from newer accounts.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Toggle
                                            label="Enable account age-based moderation"
                                            isSelected={moderationSettings.accountAgeModeration}
                                            onChange={(checked) => handleToggleChange("accountAgeModeration", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        <div className="flex-1">
                                            <div className="space-y-1">
                                                <Label htmlFor="minimumHoursToPost">New posts</Label>
                                                <div className="space-y-2">
                                                    <Select
                                                        items={timeOptions}
                                                        selectedKey={moderationSettings.minimumHoursToPost}
                                                        onSelectionChange={(key) => handleInputChange("minimumHoursToPost", key as string)}
                                                    >
                                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                    </Select>
                                                    <div className="text-sm text-tertiary">
                                                        Send all posts to moderation for accounts younger than this age.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="space-y-1">
                                                <Label htmlFor="minimumHoursToReply">New replies</Label>
                                                <div className="space-y-2">
                                                    <Select
                                                        items={timeOptions}
                                                        selectedKey={moderationSettings.minimumHoursToReply}
                                                        onSelectionChange={(key) => handleInputChange("minimumHoursToReply", key as string)}
                                                    >
                                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                    </Select>
                                                    <div className="text-sm text-tertiary">
                                                        Send all replies to moderation for accounts younger than this age.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-5 sm:p-6 sm:flex sm:flex-row-reverse pt-0 sm:pt-0">
                                <Button type="submit" size="sm" isDisabled={true}>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Members Watchlist */}
                    <form className="relative" onSubmit={handleSubmit}>
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                <div>
                                    <h3 className="text-primary font-medium text-lg">Members watchlist</h3>
                                    <div className="text-tertiary mt-1">
                                        <p>Select specific members to have all their content reviewed before it is made public.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="space-y-5">
                                    <div>
                                        <Toggle
                                            label="Enable members watchlist"
                                            isSelected={moderationSettings.membersWatchlist}
                                            onChange={(checked) => handleToggleChange("membersWatchlist", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div>
                                        <div className="mt-1 space-y-2">
                                            <div className="relative">
                                                <div className="flex flex-wrap gap-2 p-3 border border-secondary rounded-lg bg-primary">
                                                    {watchlistMembers.map((member) => (
                                                        <Badge
                                                            key={member.id}
                                                            size="md"
                                                            color="gray"
                                                            className="flex items-center gap-2 px-2 py-1"
                                                        >
                                                            {member.image ? (
                                                                <Avatar
                                                                    size="xs"
                                                                    src={member.image}
                                                                    alt={member.name}
                                                                />
                                                            ) : (
                                                                <div className="w-6 h-6 rounded-full bg-brand-solid/20 flex items-center justify-center">
                                                                    <span className="text-xs font-medium uppercase">{member.initials}</span>
                                                                </div>
                                                            )}
                                                            <span className="text-sm">{member.name}</span>
                                                            <button 
                                                                className="ml-1 hover:text-error transition-colors"
                                                                aria-label={`Remove ${member.name}`}
                                                                type="button"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" isDisabled={true}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </Admin4Layout>
    );
};

