import {
    Zap,
    Users01,
    Heart,
    Plus,
    TrendUp01,
    Star01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { SiteLayout } from "@/components/layouts/site-layout";

export const SiteHomePage = () => {
    const headerActions = (
        <div className="flex items-center gap-2">
            <Button size="sm" iconLeading={Plus}>
                Get Started
                                            </Button>
        </div>
    );

    return (
        <SiteLayout 
            title="Welcome"
            description="Build something amazing today"
            currentPath="/site"
            headerActions={headerActions}
            showBackButton={true}
        >
            <div className="overflow-y-auto">
                <div className="py-6">
                    {/* Hero Section */}
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                            Welcome to Our Platform
                </h1>
                        <p className="mt-6 text-lg leading-8 text-secondary">
                            Build something amazing today. Join thousands of creators who are already using our platform to bring their ideas to life.
                </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" iconLeading={Plus}>
                                Get Started
                            </Button>
                            <Button size="lg" color="secondary">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    
                    {/* Features Section */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
                        <div className="rounded-lg border border-secondary bg-primary p-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-solid">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-medium text-primary">Lightning Fast</h3>
                                <p className="mt-2 text-sm text-secondary">
                                    Built with performance in mind. Experience blazing fast load times and smooth interactions.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg border border-secondary bg-primary p-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-solid">
                                <Users01 className="h-6 w-6 text-white" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-medium text-primary">Team Collaboration</h3>
                                <p className="mt-2 text-sm text-secondary">
                                    Work together seamlessly with real-time collaboration features and team management tools.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg border border-secondary bg-primary p-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-solid">
                                <Heart className="h-6 w-6 text-white" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-medium text-primary">Made with Love</h3>
                                <p className="mt-2 text-sm text-secondary">
                                    Every detail is crafted with care to provide you with the best possible experience.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Stats Section */}
                    <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="text-center">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <TrendUp01 className="h-5 w-5 text-brand-secondary" />
                                    <span className="text-3xl font-bold text-primary">10K+</span>
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-secondary">Active Users</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <Star01 className="h-5 w-5 text-brand-secondary" />
                                    <span className="text-3xl font-bold text-primary">99.9%</span>
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-secondary">Uptime</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <Users01 className="h-5 w-5 text-brand-secondary" />
                                    <span className="text-3xl font-bold text-primary">50+</span>
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-secondary">Countries</p>
                        </div>
                    </div>
                    
                    {/* CTA Section */}
                    <div className="rounded-xl border border-secondary bg-primary p-8 text-center">
                        <h2 className="text-2xl font-bold text-primary mb-4">
                            Ready to get started?
                        </h2>
                        <p className="text-secondary mb-6">
                            Join thousands of creators who are already using our platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" iconLeading={Plus}>
                                Start Free Trial
                            </Button>
                            <Button size="lg" color="secondary">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}; 