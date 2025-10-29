import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Toggle } from "@/components/base/toggle/toggle";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";

type WhoCanContact = "Anyone" | "Staff";
type WhoCanCreateGroups = "Anyone" | "Staff";

export const AdminMessagingPage = () => {
    const location = useLocation();
    
    const [messagingSettings, setMessagingSettings] = useState({
        messagingEnabled: true,
        whoCanMembersContact: "Anyone" as WhoCanContact,
        whoCanCreateGroups: "Staff" as WhoCanCreateGroups,
    });

    const handleToggleChange = (checked: boolean) => {
        setMessagingSettings(prev => ({ ...prev, messagingEnabled: checked }));
    };

    const handleContactChange = (value: WhoCanContact) => {
        setMessagingSettings(prev => ({ ...prev, whoCanMembersContact: value }));
    };

    const handleGroupsChange = (value: WhoCanCreateGroups) => {
        setMessagingSettings(prev => ({ ...prev, whoCanCreateGroups: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Update messaging settings:", messagingSettings);
    };

    return (
        <Admin4Layout 
            title="Messaging"
            description="Configure messaging and chat settings"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="max-w-3xl space-y-5">

                    {/* Messaging */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Messaging</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative space-y-5" onSubmit={handleSubmit}>
                                <div className="space-y-3">
                                    <div>
                                        <Toggle
                                            label="Allow private or group messaging within your community."
                                            isSelected={messagingSettings.messagingEnabled}
                                            onChange={handleToggleChange}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" size="sm" isDisabled={true}>
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sending and receiving messages */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Sending and receiving messages</h3>
                                <div className="text-tertiary mt-1">
                                    <p>Choose whether members can message each other or only communicate with admins and moderators.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative" onSubmit={handleSubmit}>
                                <div className="space-y-5">
                                    <div className="space-y-1">
                                        <div className="relative space-y-3">
                                            {/* Option 1: Members can message each other */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handleContactChange("Anyone")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        messagingSettings.whoCanMembersContact === "Anyone"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Members can message each other
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        All members can send and receive messages from each other.
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Option 2: Members can only message admins */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handleContactChange("Staff")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        messagingSettings.whoCanMembersContact === "Staff"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Members can only message admins and moderators
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        <p>
                                                            Messaging between members is disabled.<br />
                                                            Members and admins/moderators can message each other.<br />
                                                            Admins and moderators can message each other.
                                                        </p>
                                                    </div>
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
                            </form>
                        </div>
                    </div>

                    {/* Creating group chats */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Creating group chats</h3>
                                <div className="text-tertiary mt-1">
                                    <p>Define who can start group chats in your community.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative" onSubmit={handleSubmit}>
                                <div className="space-y-5">
                                    <div className="space-y-1">
                                        <div className="relative space-y-3">
                                            {/* Option 1: Members can create group chats */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handleGroupsChange("Anyone")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        messagingSettings.whoCanCreateGroups === "Anyone"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Members can create group chats
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Any member can start a group chat.
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Option 2: Members can't create group chats */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => handleGroupsChange("Staff")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        messagingSettings.whoCanCreateGroups === "Staff"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Members can't create group chats
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Group chat creation is restricted to admins and moderators.
                                                    </div>
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
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};

