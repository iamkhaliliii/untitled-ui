import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";

type EmailSettings = "all" | "essential" | "none";

export const AdminNotificationsPage = () => {
    const location = useLocation();
    
    const [emailSettings, setEmailSettings] = useState<EmailSettings>("all");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Update notification settings:", emailSettings);
    };

    return (
        <Admin4Layout 
            title="Notifications"
            description="Configure email notification settings"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="max-w-3xl flex-col space-y-5">

                    {/* Email Notification Settings */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Email notification settings</h3>
                                <div className="text-tertiary mt-1">
                                    <p>As an admin, you can control what type of emails would be sent to members. If you are planning to handle email notifications on your side, then you might want to disable outgoing emails from the community.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative" onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-5">
                                    <div className="space-y-1">
                                        <div className="relative space-y-3">
                                            {/* Option 1: All notification emails */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => setEmailSettings("all")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        emailSettings === "all"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        All notification emails
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Members would receive all notifications including community-wide and essential emails
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Option 2: Only essential notifications */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => setEmailSettings("essential")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        emailSettings === "essential"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Only essential notifications
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        Members will only receive essential emails such as invitations and password-reset and email digest (if enabled).
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Option 3: Turn off all notifications */}
                                            <div 
                                                className="relative group text-sm text-primary cursor-pointer transition duration-200 focus:outline-none focus-visible:ring flex items-start gap-2"
                                                onClick={() => setEmailSettings("none")}
                                            >
                                                <span 
                                                    className={`shrink-0 focus:outline-none focus-visible:ring rounded-full border flex items-center justify-center transition duration-200 after:content-[''] after:block after:rounded-full cursor-pointer h-5 w-5 after:w-2 after:h-2 mt-[1px] ${
                                                        emailSettings === "none"
                                                            ? "bg-brand-solid hover:bg-brand-solid_hover group-hover:bg-brand-solid_hover border-brand-solid hover:border-brand-solid_hover group-hover:border-brand-solid_hover after:bg-white"
                                                            : "bg-primary border-secondary hover:border-secondary-hovered group-hover:border-secondary-hovered"
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0 grow">
                                                    <div className="text-sm font-medium transition duration-200 text-primary">
                                                        Turn off all notifications
                                                    </div>
                                                    <div className="text-sm transition duration-200 text-tertiary mb-1">
                                                        No email from the community would be sent on behalf of the community
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

                    {/* Member Email Digest */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">
                                    <div className="flex items-center gap-1">
                                        Member email digest
                                        <Badge size="sm" color="success">
                                            New
                                        </Badge>
                                    </div>
                                </h3>
                                <div className="text-tertiary mt-1">
                                    <p>Allow members to receive daily or weekly email summaries tailored to their space subscriptions and notifications.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div>
                                <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-secondary/20 shadow-sm sm:rounded-xl">
                                    <div className="flex-1 px-4 py-5 sm:p-6">
                                        <div className="flex items-center gap-3 justify-between">
                                            <div className="relative shrink-0 rounded-full h-16 w-16">
                                                <img 
                                                    className="shrink-0 rounded-full h-16 w-16 object-cover object-center" 
                                                    src="https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfMW8xOEpleVYxWDJZOVkwV25ZOGw2aFRF00swBWChcE"
                                                    alt="Email Digest"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 flex-grow">
                                                <h3 className="text-lg font-medium text-primary">Email Digest</h3>
                                                <p className="text-tertiary text-sm">Email Digest</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button 
                                                    size="sm" 
                                                    color="primary"
                                                    href="/hub/manage/app-store/addons/prod_R8Ijz69LHau0vC"
                                                >
                                                    Settings
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* From Email */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="sm:flex sm:items-start sm:justify-between">
                                <div>
                                    <h3 className="font-medium text-lg text-primary">
                                        <div className="text-md">
                                            <span>From email:</span>{" "}
                                            <span className="font-normal text-tertiary">notifications@bettermode.com</span>
                                        </div>
                                    </h3>
                                    <div className="max-w-8xl text-tertiary mt-2">
                                        <p>By default, all emails will be sent from this address to your members</p>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-0 sm:ms-6 sm:flex-shrink-0 sm:flex sm:items-center">
                                    <Button type="button" size="sm" color="secondary">
                                        Change email
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};

