import { Badge } from "@/components/base/badges/badges";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";

export const AdminBillingPage = () => {
    const location = useLocation();

    return (
        <Admin4Layout
            title="Subscription summary"
            description="Overview and adjust your plan details, add-on services, and billing preferences."
            currentPath={location.pathname}
            hideHeader={false}
            showAdvancedFeatures={false}
            headerActions={<></>}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="w-full flex flex-col max-w-full md:max-w-5xl self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5">
                    
                    <div className="flex flex-col space-y-5">
                        {/* Enterprise Plan Card */}
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                    <div>
                                    <h3 className="text-primary font-medium text-lg">
                                        <div className="flex gap-2 items-center">
                                            Enterprise plan
                                            <div className="flex flex-col">
                                                <Badge size="sm" color="gray">
                                                    Yearly
                                                </Badge>
                                            </div>
                                        </div>
                                    </h3>
                                    <div className="text-tertiary mt-1">
                                        <p>For medium to large businesses in regulated industries</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="relative py-0 -mx-6 mb-6">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-secondary"></div>
                                    </div>
                                </div>
                                <a 
                                    href="/hub/manage/billing/plans"
                                    className="text-brand-secondary hover:text-brand-secondary-hovered"
                                >
                                    Update plan
                                </a>
                                </div>
                            </div>

                        {/* Add-ons Card */}
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                    <h3 className="text-primary font-medium text-lg">Add-ons</h3>
                                    <div className="text-tertiary mt-1">
                                        <p>Enhance your subscription with additional features to increase capacity and unlock new functionalities.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="relative py-0 -mx-6 mb-6">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-secondary"></div>
                                    </div>
                                </div>
                                <a 
                                    href="/hub/manage/app-store/addons"
                                    className="text-brand-secondary hover:text-brand-secondary-hovered"
                                >
                                    Manage add-ons
                                </a>
                                        </div>
                                    </div>

                        {/* Billing Information Card */}
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                <div>
                                    <h3 className="text-primary font-medium text-lg">Billing information</h3>
                                    <div className="text-tertiary mt-1">
                                        <p>Manage your billing information.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="relative py-0 -mx-6 mb-6">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-secondary"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <a 
                                        href="#"
                                        className="text-brand-secondary hover:text-brand-secondary-hovered"
                                    >
                                        Invoice history
                                    </a>
                                    <a 
                                        href="#"
                                        className="text-brand-secondary hover:text-brand-secondary-hovered"
                                    >
                                        Update payment method
                                    </a>
                                    <a 
                                        href="#"
                                        className="text-brand-secondary hover:text-brand-secondary-hovered"
                                    >
                                        Update billing address
                                    </a>
                                    <a 
                                        href="#"
                                        className="text-brand-secondary hover:text-brand-secondary-hovered"
                                    >
                                        Cancel subscription
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Email */}
                    <div className="text-primary text-sm">
                        Have questions about billing? Email us at{" "}
                        <a 
                            href="mailto:billing@bettermode.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-secondary hover:text-brand-secondary-hovered"
                        >
                            billing@bettermode.com
                        </a>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};
