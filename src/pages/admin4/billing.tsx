import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    CreditCard01,
    CreditCard02,
    Receipt,
    Download01,
    Plus,
    SearchLg,
    Eye,
    Edit01,
    Trash01,
    ChevronDown,
    CheckCircle,
    AlertCircle,
    Calendar,
    Zap,
    TrendUp02,
    BarChart03,
    Database01,
    Users01,
    Package,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { MobileSpaceTabs } from "@/components/application/app-navigation-admin4/mobile-space-tabs";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";

// Sample subscription plans data
const subscriptionPlans = [
    {
        id: 1,
        name: "Starter",
        price: "$29",
        period: "month",
        status: "Available",
        features: [
            "Up to 100 members",
            "5GB storage",
            "Basic support",
            "Core features"
        ],
        isCurrentPlan: false
    },
    {
        id: 2,
        name: "Professional",
        price: "$99",
        period: "month",
        status: "Current",
        features: [
            "Up to 1,000 members",
            "50GB storage",
            "Priority support",
            "Advanced features",
            "Custom branding"
        ],
        isCurrentPlan: true
    },
    {
        id: 3,
        name: "Enterprise",
        price: "$299",
        period: "month",
        status: "Available",
        features: [
            "Unlimited members",
            "500GB storage",
            "24/7 dedicated support",
            "All features",
            "Custom branding",
            "API access",
            "SLA guarantee"
        ],
        isCurrentPlan: false
    }
];

// Sample invoices data
const sampleInvoices = [
    {
        id: 1,
        invoiceNumber: "INV-2024-001",
        date: "Jan 1, 2024",
        amount: "$99.00",
        status: "Paid",
        description: "Professional Plan - Monthly",
        dueDate: "Jan 1, 2024"
    },
    {
        id: 2,
        invoiceNumber: "INV-2023-012",
        date: "Dec 1, 2023",
        amount: "$99.00",
        status: "Paid",
        description: "Professional Plan - Monthly",
        dueDate: "Dec 1, 2023"
    },
    {
        id: 3,
        invoiceNumber: "INV-2023-011",
        date: "Nov 1, 2023",
        amount: "$99.00",
        status: "Paid",
        description: "Professional Plan - Monthly",
        dueDate: "Nov 1, 2023"
    },
    {
        id: 4,
        invoiceNumber: "INV-2023-010",
        date: "Oct 1, 2023",
        amount: "$99.00",
        status: "Paid",
        description: "Professional Plan - Monthly",
        dueDate: "Oct 1, 2023"
    }
];

// Sample service usage data
const serviceUsage = [
    {
        id: 1,
        service: "Members",
        current: 456,
        limit: 1000,
        unit: "users",
        icon: Users01,
        color: "blue"
    },
    {
        id: 2,
        service: "Storage",
        current: 23.5,
        limit: 50,
        unit: "GB",
        icon: Database01,
        color: "purple"
    },
    {
        id: 3,
        service: "Posts",
        current: 8234,
        limit: null, // unlimited
        unit: "posts",
        icon: Package,
        color: "green"
    },
    {
        id: 4,
        service: "API Calls",
        current: 45230,
        limit: 100000,
        unit: "calls",
        icon: Zap,
        color: "orange"
    }
];

export const AdminBillingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isDesktop = useBreakpoint("lg");

    // Check if we're on a specific billing page
    const isSummaryPage = location.pathname === '/admin4/billing' || location.pathname === '/admin4/billing/';
    const isPlansPage = location.pathname === '/admin4/billing/plans';
    const isUsagePage = location.pathname === '/admin4/billing/usage';

    const getPageTitle = () => {
        if (isSummaryPage) return "Summary";
        if (isPlansPage) return "Subscription Plans";
        if (isUsagePage) return "Service Usage";
        return "Billing";
    };

    const getPageDescription = () => {
        if (isSummaryPage) return "View billing summary and payment history";
        if (isPlansPage) return "Manage your subscription plans";
        if (isUsagePage) return "Monitor your service usage and limits";
        return "Manage your billing and subscriptions";
    };

    // Determine current page type for tabs
    const getCurrentPageType = () => {
        if (location.pathname.includes("/plans")) return "plans";
        if (location.pathname.includes("/usage")) return "usage";
        return "summary"; // default
    };

    const currentPageType = getCurrentPageType();

    // Define tabs for billing pages
    const billingTabs = [
        { id: "summary", label: "Summary", path: "" },
        { id: "plans", label: "Subscription plans", path: "/plans" },
        { id: "usage", label: "Service usage", path: "/usage" },
    ];

    // Get base path
    const getBasePath = () => {
        return "/admin4/billing";
    };

    // Render header actions
    const renderHeaderActions = () => (
        <div className="flex items-center gap-2">
            {isSummaryPage && (
                <Button
                    color="secondary"
                    size="sm"
                    className="text-xs px-3 py-1.5"
                    iconLeading={Plus}
                >
                    Add Payment Method
                </Button>
            )}
        </div>
    );

    return (
        <Admin4Layout
            title={`Billing - ${getPageTitle()}`}
            description={getPageDescription()}
            currentPath={location.pathname}
            hideHeader={true}
            headerActions={renderHeaderActions()}
            mobileTabSelector={
                <MobileSpaceTabs
                    basePath={getBasePath()}
                    tabs={billingTabs}
                    currentTab={currentPageType}
                    headerActions={renderHeaderActions()}
                />
            }
        >
            <div className="px-4 py-6 lg:px-6">
                <div className="flex flex-col lg:p-1 space-y-6 lg:overflow-hidden">
                    {/* Summary Page */}
                    {isSummaryPage && (
                        <>
                            {/* Current Plan Card */}
                            <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Current Plan</h3>
                                            <Badge color="brand" size="sm">Active</Badge>
                                        </div>
                                        <p className="text-3xl font-bold text-primary dark:text-gray-100">Professional</p>
                                        <p className="text-sm text-tertiary dark:text-gray-400 mt-1">$99.00 / month</p>
                                        <p className="text-sm text-tertiary dark:text-gray-400 mt-2">Next billing date: February 1, 2024</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button color="secondary" size="sm" onClick={() => navigate('/admin4/billing/plans')}>
                                            Change Plan
                                        </Button>
                                        <Button color="tertiary" size="sm" iconLeading={Edit01}>
                                            Manage
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Card */}
                            <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Payment Method</h3>
                                    <Button color="tertiary" size="sm" iconLeading={Plus}>
                                        Add Method
                                    </Button>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-secondary/20 dark:bg-gray-800/50 rounded-lg">
                                    <CreditCard01 className="size-10 text-brand-secondary" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-primary dark:text-gray-100">Visa ending in 4242</p>
                                        <p className="text-sm text-tertiary dark:text-gray-400">Expires 12/2025</p>
                                    </div>
                                    <Badge color="success" size="sm">Default</Badge>
                                </div>
                            </div>

                            {/* Billing History */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Billing History</h3>
                                    <div className="relative w-64">
                                        <SearchLg className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-fg-quaternary dark:text-gray-500" />
                                        <Input
                                            placeholder="Search invoices..."
                                            className="w-full pl-10"
                                            size="sm"
                                        />
                                    </div>
                                </div>

                                <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 shadow-xs overflow-hidden">
                                    <div className="relative overflow-x-auto">
                                        <table className="min-w-full divide-y divide-secondary dark:divide-gray-700">
                                            <thead className="bg-secondary/20 dark:bg-gray-800/50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Invoice
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Description
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Date
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Amount
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-8">
                                                        &nbsp;
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-secondary dark:divide-gray-700 bg-primary dark:bg-gray-900">
                                                {sampleInvoices.map((invoice) => (
                                                    <tr key={invoice.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="text-sm font-medium text-primary dark:text-gray-100">{invoice.invoiceNumber}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="text-sm text-secondary dark:text-gray-300">{invoice.description}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="text-sm text-secondary dark:text-gray-300">{invoice.date}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="text-sm font-medium text-primary dark:text-gray-100">{invoice.amount}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <Badge color="success" size="sm">
                                                                {invoice.status}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <Button
                                                                color="tertiary"
                                                                size="sm"
                                                                iconLeading={Download01}
                                                                className="!p-2"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Subscription Plans Page */}
                    {isPlansPage && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {subscriptionPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`rounded-xl p-6 border-2 ${
                                        plan.isCurrentPlan
                                            ? 'border-brand-solid bg-brand-solid/5 dark:bg-brand-solid/10'
                                            : 'border-secondary dark:border-gray-700 bg-primary dark:bg-gray-900'
                                    } transition-all hover:shadow-lg`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-primary dark:text-gray-100 mb-1">{plan.name}</h3>
                                            {plan.isCurrentPlan && (
                                                <Badge color="brand" size="sm">Current Plan</Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-primary dark:text-gray-100">{plan.price}</span>
                                            <span className="text-sm text-tertiary dark:text-gray-400">/ {plan.period}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle className="size-5 text-success-solid dark:text-green-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-secondary dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        color={plan.isCurrentPlan ? "secondary" : "primary"}
                                        className="w-full"
                                        disabled={plan.isCurrentPlan}
                                    >
                                        {plan.isCurrentPlan ? "Current Plan" : "Upgrade"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Service Usage Page */}
                    {isUsagePage && (
                        <div className="space-y-6">
                            {/* Usage Overview Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {serviceUsage.map((service) => {
                                    const Icon = service.icon;
                                    const percentage = service.limit ? (service.current / service.limit) * 100 : 0;
                                    const isUnlimited = service.limit === null;
                                    const getIconColor = () => {
                                        switch(service.color) {
                                            case 'blue': return 'text-blue-600 dark:text-blue-400';
                                            case 'green': return 'text-green-600 dark:text-green-400';
                                            case 'purple': return 'text-purple-600 dark:text-purple-400';
                                            case 'orange': return 'text-orange-600 dark:text-orange-400';
                                            default: return 'text-brand-secondary';
                                        }
                                    };

                                    return (
                                        <div
                                            key={service.id}
                                            className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <Icon className={`size-8 ${getIconColor()}`} />
                                                {percentage > 80 && !isUnlimited && (
                                                    <AlertCircle className="size-5 text-warning-solid" />
                                                )}
                                            </div>

                                            <h3 className="text-sm font-medium text-tertiary dark:text-gray-400 mb-1">
                                                {service.service}
                                            </h3>

                                            <div className="flex items-baseline gap-1 mb-3">
                                                <span className="text-2xl font-bold text-primary dark:text-gray-100">
                                                    {service.current.toLocaleString()}
                                                </span>
                                                {!isUnlimited && (
                                                    <span className="text-sm text-tertiary dark:text-gray-400">
                                                        / {service.limit?.toLocaleString()} {service.unit}
                                                    </span>
                                                )}
                                                {isUnlimited && (
                                                    <span className="text-sm text-tertiary dark:text-gray-400">{service.unit}</span>
                                                )}
                                            </div>

                                            {!isUnlimited && (
                                                <ProgressBar
                                                    labelPosition="top-floating"
                                                    min={0}
                                                    max={service.limit || 100}
                                                    value={service.current}
                                                />
                                            )}
                                            {isUnlimited && (
                                                <Badge color="success" size="sm">Unlimited</Badge>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Detailed Usage Table */}
                            <div>
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Usage Details</h3>

                                <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 shadow-xs overflow-hidden">
                                    <div className="relative overflow-x-auto">
                                        <table className="min-w-full divide-y divide-secondary dark:divide-gray-700">
                                            <thead className="bg-secondary/20 dark:bg-gray-800/50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Service
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Current Usage
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Limit
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Usage
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-secondary dark:divide-gray-700 bg-primary dark:bg-gray-900">
                                                {serviceUsage.map((service) => {
                                                    const Icon = service.icon;
                                                    const percentage = service.limit ? (service.current / service.limit) * 100 : 0;
                                                    const isUnlimited = service.limit === null;

                                                    return (
                                                        <tr key={service.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center gap-3">
                                                                    <Icon className="size-5 text-brand-secondary" />
                                                                    <span className="text-sm font-medium text-primary dark:text-gray-100">
                                                                        {service.service}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="text-sm text-secondary dark:text-gray-300">
                                                                    {service.current.toLocaleString()} {service.unit}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="text-sm text-secondary dark:text-gray-300">
                                                                    {isUnlimited ? 'Unlimited' : `${service.limit?.toLocaleString()} ${service.unit}`}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {!isUnlimited && (
                                                                    <div className="w-32">
                                                                        <ProgressBar
                                                                            labelPosition="top-floating"
                                                                            min={0}
                                                                            max={service.limit || 100}
                                                                            value={service.current}
                                                                        />
                                                                    </div>
                                                                )}
                                                                {isUnlimited && (
                                                                    <span className="text-sm text-tertiary dark:text-gray-400">-</span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {isUnlimited ? (
                                                                    <Badge color="success" size="sm">Unlimited</Badge>
                                                                ) : percentage > 80 ? (
                                                                    <Badge color="warning" size="sm">High Usage</Badge>
                                                                ) : (
                                                                    <Badge color="success" size="sm">Normal</Badge>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Admin4Layout>
    );
};

