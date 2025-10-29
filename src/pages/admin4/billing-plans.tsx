import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";
import { Check } from "@untitledui/icons";

type BillingPeriod = "monthly" | "yearly";

interface PlanFeature {
    text: string;
    isLink?: boolean;
    href?: string;
}

interface Plan {
    id: string;
    name: string;
    description: string;
    price: string | number;
    priceLabel: string;
    billingInfo: string;
    buttonText: string;
    buttonHref?: string;
    isCurrentPlan: boolean;
    features: PlanFeature[];
}

export const AdminBillingPlansPage = () => {
    const location = useLocation();
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("yearly");

    const plans: Plan[] = [
        {
            id: "pro",
            name: "Pro",
            description: "For startups, community leaders, niche forums, brands, businesses, and emerging organizations.",
            price: 49,
            priceLabel: "USD /mo",
            billingInfo: "Billed yearly",
            buttonText: "Contact us",
            buttonHref: "https://bettermode.com/contact-sales",
            isCurrentPlan: false,
            features: [
                { text: "Unlimited Posts & Messages" },
                { text: "Unlimited Members" },
                { text: "3 Staff Seats" },
                { text: "20 Spaces" },
                { text: "20 CMS Collection" },
                { text: "10k Email Credits Monthly" },
                { text: "See all features", isLink: true, href: "https://bettermode.com/pricing" },
            ]
        },
        {
            id: "enterprise",
            name: "Enterprise",
            description: "For medium to large businesses in regulated industries",
            price: "Custom",
            priceLabel: "",
            billingInfo: "Let's talk",
            buttonText: "Current plan",
            isCurrentPlan: true,
            features: [
                { text: "Guaranteed SLA" },
                { text: "Data Residency" },
                { text: "SOC Type 2" },
                { text: "Audit and Activity Log" },
                { text: "SAML and JWT SSO" },
                { text: "Custom Billing" },
                { text: "Enterprise Integrations" },
                { text: "Security and Legal Review" },
                { text: "Customer Success" },
                { text: "See all features", isLink: true, href: "https://bettermode.com/pricing" },
            ]
        }
    ];

    return (
        <Admin4Layout 
            title="Plans"
            description="Choose a plan and upgrade when you're ready"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="space-y-6">
                    
                    {/* Header */}
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold text-primary">Plans</h1>
                        <p className="text-md text-tertiary mt-2">
                            Choose a plan and upgrade when you're ready to unlock more features.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Billing Period Toggle */}
                        <div className="flex justify-center">
                            <div className="flex flex-col items-center bg-primary rounded-xl shadow-sm border border-secondary">
                                <div className="flex p-1.5 space-x-2">
                                    <div 
                                        className={`text-center rounded-lg cursor-pointer py-2 px-4 font-medium transition-colors ${
                                            billingPeriod === "monthly" 
                                                ? "bg-secondary text-primary" 
                                                : "text-tertiary hover:text-primary"
                                        }`}
                                        onClick={() => setBillingPeriod("monthly")}
                                    >
                                        Monthly
                                    </div>
                                    <div 
                                        className={`text-center rounded-lg cursor-pointer py-2 px-4 flex gap-2 font-medium transition-colors ${
                                            billingPeriod === "yearly" 
                                                ? "bg-secondary text-primary" 
                                                : "text-tertiary hover:text-primary"
                                        }`}
                                        onClick={() => setBillingPeriod("yearly")}
                                    >
                                        Yearly
                                        <Badge size="sm" color="success">
                                            Save 20%
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Plans Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {plans.map((plan) => (
                                <div 
                                    key={plan.id}
                                    className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl relative"
                                >
                                    {/* Plan Header */}
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-primary font-medium text-lg">{plan.name}</h3>
                                        <div className="text-tertiary h-8">
                                            <p>{plan.description}</p>
                                        </div>
                                    </div>

                                    {/* Plan Content */}
                                    <div className="flex-1 px-4 py-5 sm:p-6">
                                        <div className="flex flex-col space-y-5 h-full">
                                            {/* Price */}
                                            <div className="space-y-2">
                                                <div className="flex items-end gap-2 h-12">
                                                    <div className="text-4xl font-bold text-primary">
                                                        {plan.price}
                                                    </div>
                                                    {plan.priceLabel && (
                                                        <div className="text-tertiary">{plan.priceLabel}</div>
                                                    )}
                                                </div>
                                                <div className="text-tertiary font-medium h-8">
                                                    {plan.billingInfo}
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            {plan.buttonHref ? (
                                                <Button
                                                    size="lg"
                                                    color="primary"
                                                    href={plan.buttonHref}
                                                    className="w-full h-12 text-md"
                                                >
                                                    {plan.buttonText}
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="lg"
                                                    color="secondary"
                                                    className="w-full h-12 text-md"
                                                    isDisabled={plan.isCurrentPlan}
                                                >
                                                    {plan.buttonText}
                                                </Button>
                                            )}

                                            {/* What's Included */}
                                            <div>
                                                <div className="font-bold text-lg text-primary mt-2">
                                                    What's included
                                                </div>
                                            </div>

                                            {/* Features List */}
                                            <div className="flex-grow flex flex-col space-y-5 text-primary">
                                                {plan.features.map((feature, index) => (
                                                    <div key={index} className="flex gap-3">
                                                        <div className="bg-success-secondary rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                                                            <Check className="h-4 w-4 text-success-primary" />
                                                        </div>
                                                        <div>
                                                            {feature.isLink && feature.href ? (
                                                                <a 
                                                                    href={feature.href}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                                >
                                                                    {feature.text}
                                                                </a>
                                                            ) : (
                                                                feature.text
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};

