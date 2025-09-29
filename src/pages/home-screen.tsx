import { Settings01, Globe01, ArrowRight, UsersPlus, Zap, CheckCircle, Calendar, MessageSquare01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { NexusLogo } from "@/components/foundations/logo/nexus-logo";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { Link } from "react-router";

export const HomeScreen = () => {
    return (
        <div className="relative flex h-dvh flex-col overflow-hidden">
            {/* Background visuals */}
            <div className="pointer-events-none absolute inset-0">
                <BackgroundPattern pattern="grid-check" className="absolute -left-10 top-10 h-[520px] w-[520px] opacity-[0.06]" />
                <BackgroundPattern pattern="circle" className="absolute -right-12 -bottom-12 h-[480px] w-[480px] opacity-[0.06]" />
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-transparent" />
            </div>

            {/* Logo in top left corner */}
            <div className="absolute top-6 left-6 z-20">
                <NexusLogo className="h-12 w-auto" />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4">

                <div className="max-w-3xl text-center">
                    <h1 className="text-display-sm font-semibold tracking-tight text-primary">
                        Bettermode Prototype
                    </h1>
                    <p className="mt-3 text-lg text-tertiary">
                        Select your path and continue.
                    </p>
                </div>

                {/* Three-column navigation: Admin / Site / Signup */}
                <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Admin column */}
                    <div>
                        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Admin</div>
                        <div className="space-y-3">
                            <Link to="/admin3" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <Settings01 className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Admin 3.0</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="gray" size="sm">On Hold</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/admin2" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <Settings01 className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Admin 2.0</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="blue" size="sm">Under Design</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/admin2/site" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <Globe01 className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Site Section</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="success" size="sm">Ready for Dev</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/admin2/site/spaces/growth/events/customize" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <Settings01 className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Simple Customize Space</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="blue" size="sm">Under Design</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Site column */}
                    <div>
                        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Site</div>
                        <div className="space-y-3">
                            <Link to="/site" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/60">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-secondary/30 p-1.5">
                                                <Globe01 className="size-4 text-secondary" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Website</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="blue" size="sm">Under Design</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/site/event" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/60">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <Calendar className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Events Page</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="success" size="sm">Ready for Dev</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/site/event/1" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/60">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <Calendar className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Event Detail Page</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="success" size="sm">Ready for Dev</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/site/post-view" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/60">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <MessageSquare01 className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Embed Event</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="success" size="sm">Ready for Dev</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Get Started column */}
                    <div>
                        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Get Started</div>
                        <div className="space-y-3">
                            <Link to="/signup" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <UsersPlus className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Sign Up</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="orange" size="sm">Under Review</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/wizard" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <Zap className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Setup Wizard</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="orange" size="sm">Under Review</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/admin2/onboarding" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                                <CheckCircle className="size-4 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Onboarding</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge color="orange" size="sm">Under Review</Badge>
                                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};
