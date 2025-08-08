import { Settings01, Globe01, ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
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

            {/* Main content */}
            <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4">
                <div className="relative mb-6 flex size-28 items-center justify-center rounded-2xl border border-secondary/60 bg-primary/70 backdrop-blur-sm">
                    <UntitledLogoMinimal className="size-10 text-brand-solid" />
                </div>

                <div className="max-w-3xl text-center">
                    <h1 className="text-display-sm font-semibold tracking-tight text-primary">
                        Untitled UI — Admin & Site
                    </h1>
                    <p className="mt-3 text-lg text-tertiary">
                        Pick your destination to continue. Fast, clear, and delightful.
                    </p>
                </div>

                {/* Two-column navigation: Admin / Site */}
                <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Admin column */}
                    <div>
                        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Admin</div>
                        <div className="space-y-3">
                            <Link to="/admin3" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-2">
                                                <Settings01 className="size-5 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Admin 3.0</span>
                                        </div>
                                        <ArrowRight className="size-4 text-tertiary group-hover:text-brand-solid" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="/admin2" className="group">
                                <div className="rounded-lg border border-secondary bg-primary p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-2">
                                                <Settings01 className="size-5 text-brand-solid" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Admin 2.0</span>
                                        </div>
                                        <ArrowRight className="size-4 text-tertiary group-hover:text-brand-solid" />
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
                                <div className="rounded-lg border border-secondary bg-primary p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/60">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center justify-center rounded-md bg-secondary/30 p-2">
                                                <Globe01 className="size-5 text-secondary" />
                                            </span>
                                            <span className="text-sm font-medium text-primary">Website</span>
                                        </div>
                                        <ArrowRight className="size-4 text-tertiary group-hover:text-brand-solid" />
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
