import { Settings01, Globe01, ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { Link } from "react-router";

export const HomeScreen = () => {
    return (
        <div className="flex h-dvh flex-col">
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4">
                <div className="relative flex size-28 items-center justify-center">
                    <UntitledLogoMinimal className="size-10" />
                </div>

                <h1 className="max-w-3xl text-center text-display-sm font-semibold text-primary">
                    Welcome to Untitled UI
                </h1>

                <p className="mt-2 max-w-xl text-center text-lg text-tertiary">
                    Choose your destination to continue
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                    <div className="space-y-3">
                        <Link to="/admin3">
                            <div className="group p-8 border border-secondary rounded-lg bg-primary hover:bg-secondary transition-all duration-200 cursor-pointer hover:border-brand-solid">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-brand-solid/10 rounded-lg">
                                            <Settings01 className="size-6 text-brand-solid" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary">Admin Panel 3.0</h3>
                                    </div>
                                    <ArrowRight className="size-5 text-tertiary group-hover:text-brand-solid transition-colors" />
                                </div>
                                <p className="text-sm text-tertiary">
                                    Access the latest admin dashboard with advanced features and modern interface.
                                </p>
                            </div>
                        </Link>
                        
                        <Link to="/admin2">
                            <div className="group p-6 border border-secondary rounded-lg bg-primary hover:bg-secondary transition-all duration-200 cursor-pointer hover:border-brand-solid">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-gray-500/10 rounded-lg">
                                            <Settings01 className="size-4 text-gray-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-primary">Admin Panel 2.0</h3>
                                    </div>
                                    <ArrowRight className="size-4 text-tertiary group-hover:text-brand-solid transition-colors" />
                                </div>
                                <p className="text-xs text-tertiary">
                                    Legacy admin panel for specific operations and compatibility.
                                </p>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="space-y-3">
                        <Link to="/site">
                            <div className="group p-8 border border-secondary rounded-lg bg-primary hover:bg-secondary transition-all duration-200 cursor-pointer hover:border-brand-solid">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-brand-solid/10 rounded-lg">
                                            <Globe01 className="size-6 text-brand-solid" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary">Main Website</h3>
                                    </div>
                                    <ArrowRight className="size-5 text-tertiary group-hover:text-brand-solid transition-colors" />
                                </div>
                                <p className="text-sm text-tertiary">
                                    Explore the main website with services, features, about information and contact details.
                                </p>
                            </div>
                        </Link>
                        
                        <div className="flex gap-2">
                            <Link to="/site/feed" className="flex-1">
                                <div className="group p-4 border border-secondary rounded-lg bg-primary hover:bg-secondary transition-all duration-200 cursor-pointer hover:border-brand-solid">
                                    <p className="text-sm font-medium text-primary">Feed</p>
                                </div>
                            </Link>
                            <Link to="/site/event" className="flex-1">
                                <div className="group p-4 border border-secondary rounded-lg bg-primary hover:bg-secondary transition-all duration-200 cursor-pointer hover:border-brand-solid">
                                    <p className="text-sm font-medium text-primary">Events</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-tertiary">
                        Click on any option above to continue
                    </p>
                </div>
            </div>
        </div>
    );
};
