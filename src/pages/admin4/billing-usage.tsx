import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";
import { Bar, CartesianGrid, Label, BarChart as RechartsBarChart, ResponsiveContainer, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { useBreakpoint } from "@/hooks/use-breakpoint";

interface ResourceCard {
    id: string;
    title: string;
    description: string;
    current: number | string;
    total: number | string;
    unit?: string;
    percentage: number;
    manageHref: string;
}

export const AdminBillingUsagePage = () => {
    const location = useLocation();
    const isDesktop = useBreakpoint("lg");

    // Request count data (last 7 days)
    const requestCountData = [
        { date: "Oct 23", value: 45000, yellow: 500 },
        { date: "Oct 24", value: 48000, yellow: 600 },
        { date: "Oct 25", value: 42000, yellow: 550 },
        { date: "Oct 26", value: 38000, yellow: 700 },
        { date: "Oct 27", value: 52000, yellow: 450 },
        { date: "Oct 28", value: 44000, yellow: 620 },
        { date: "Oct 29", value: 43000, yellow: 500 },
    ];

    // Request complexity data (last 7 days)
    const requestComplexityData = [
        { date: "Oct 23", value: 1500000, yellow: 850000 },
        { date: "Oct 24", value: 1600000, yellow: 780000 },
        { date: "Oct 25", value: 1450000, yellow: 920000 },
        { date: "Oct 26", value: 1320000, yellow: 1100000 },
        { date: "Oct 27", value: 1720000, yellow: 680000 },
        { date: "Oct 28", value: 1500000, yellow: 890000 },
        { date: "Oct 29", value: 1480000, yellow: 650000 },
    ];

    const resourceOverview: ResourceCard[] = [
        {
            id: "spaces",
            title: "Spaces",
            description: "The number of public, private, and hidden spaces allocated to your account.",
            current: 43,
            total: "unlimited",
            unit: "spaces",
            percentage: 10,
            manageHref: "/hub/manage/app-store/addons?category=spacesCapacity"
        },
        {
            id: "cms",
            title: "CMS models",
            description: "The number of CMS models allocated to your account.",
            current: 14,
            total: "unlimited",
            unit: "CMS models",
            percentage: 10,
            manageHref: "/hub/manage/app-store/addons?category=postTypesCapacity"
        },
        {
            id: "members",
            title: "Members",
            description: "The count of users with verified email addresses.",
            current: "21,853",
            total: "100,000",
            unit: "members",
            percentage: 21.853,
            manageHref: "/hub/manage/app-store/addons?category=membersCapacity"
        },
        {
            id: "seats",
            title: "Seats",
            description: "Track allocated admin and moderator seats.",
            current: 27,
            total: 100,
            unit: "seats",
            percentage: 27,
            manageHref: "/hub/manage/app-store/addons?category=seatsCapacity"
        },
        {
            id: "storage",
            title: "Storage",
            description: "Monitor utilized space for images, videos, and files.",
            current: "9.283",
            total: "unlimited",
            unit: "GB",
            percentage: 10,
            manageHref: "/hub/manage/app-store/addons?category=storageCapacity"
        },
        {
            id: "emails",
            title: "Monthly emails",
            description: "Transactional emails sent monthly for notifications, password resets, and more.",
            current: "53,552",
            total: "unlimited",
            unit: "emails",
            percentage: 10,
            manageHref: "/hub/manage/app-store/addons?category=monthlyEmailCapacity"
        },
        {
            id: "locales",
            title: "Translation locales",
            description: "The number of language options available for translation.",
            current: 23,
            total: 31,
            unit: "locales",
            percentage: 74.1935,
            manageHref: "/hub/manage/app-store/addons?category=translationLocaleCapacity"
        }
    ];

    return (
        <Admin4Layout 
            title="Resource Overview"
            description="Monitor resource allocation and utilization against your plan limits."
            currentPath={location.pathname}
            hideHeader={false}
            showAdvancedFeatures={false}
            headerActions={<></>}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="w-full flex flex-col max-w-full md:max-w-5xl self-center space-y-7 sm:space-y-8 md:space-y-9 lg:space-y-10">
                    
                    {/* Resource Overview Section */}
                    <div className="w-full flex flex-col max-w-full md:max-w-5xl self-center space-y-2 sm:space-y-2.5 lg:space-y-3">
                        {/* Resource Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {resourceOverview.map((resource) => (
                                <div 
                                    key={resource.id}
                                    className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl"
                                >
                                    {/* Card Header */}
                                    <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                        <div>
                                            <h3 className="text-primary font-medium text-lg">{resource.title}</h3>
                                            <div className="text-tertiary mt-1">
                                                <p className="text-sm text-tertiary">{resource.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Section */}
                                    <div className="flex-1 px-4 py-5 sm:p-6">
                                        <div className="h-full flex flex-col justify-end">
                                            <div className="mb-3 text-primary">
                                                <span className="font-bold">{resource.current}</span>
                                                {" "}of {resource.total} {resource.unit}
                                            </div>
                                            <div className="w-full bg-secondary rounded-full h-2">
                                                <div 
                                                    className="h-2 text-sm text-center rounded-full bg-brand-solid" 
                                                    style={{ width: `${Math.min(resource.percentage, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative py-0">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-secondary"></div>
                                        </div>
                                    </div>

                                    {/* Footer with Manage Link */}
                                    <div className="flex px-4 sm:px-6 py-3">
                                        <div className="flex w-full justify-end">
                                            <a 
                                                href={resource.manageHref}
                                                className="text-brand-secondary hover:text-brand-secondary-hovered"
                                            >
                                                Manage
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* API Usage Section */}
                    <div className="w-full flex flex-col max-w-full md:max-w-5xl self-center space-y-2 sm:space-y-2.5 lg:space-y-3">
                        {/* Header */}
                        <div className="min-w-0 break-words px-4 sm:px-0">
                            <div className="sm:flex sm:justify-between">
                                <div className="sm:w-0 sm:flex-1 space-y-2">
                                    <h3 className="font-medium text-lg text-primary">
                                        <h2 className="text-primary text-2xl font-semibold">API Usage</h2>
                                    </h3>
                                    <div className="text-sm text-tertiary">
                                        <p className="text-md text-primary">See how your API usage compares to your limits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* API Usage Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Request Count Card */}
                            <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-start bg-primary shadow-sm sm:rounded-xl">
                                <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                    <div>
                                        <h3 className="text-primary font-medium text-lg">Request count</h3>
                                        <div className="text-tertiary mt-1">
                                            <p className="text-sm text-tertiary">The number of API requests made to your site.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-5 sm:p-6 flex-none">
                                    <ResponsiveContainer width="100%" height={240} minHeight={180} maxHeight={240}>
                                        <RechartsBarChart
                                            data={requestCountData}
                                            className="text-tertiary [&_.recharts-text]:text-xs"
                                            margin={{
                                                left: -20,
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid 
                                                strokeDasharray="3 3" 
                                                stroke="#ccc" 
                                                vertical={false}
                                            />

                                            <XAxis
                                                dataKey="date"
                                                angle={45}
                                                textAnchor="start"
                                                fontSize="0.7rem"
                                                stroke="var(--bm-color-content-on-background-subdued)"
                                                tickLine={false}
                                            />

                                            <YAxis
                                                fontSize="0.7rem"
                                                stroke="var(--bm-color-content-on-background-subdued)"
                                                tickFormatter={(value) => {
                                                    if (value >= 1000) return `${value / 1000}K`;
                                                    return value;
                                                }}
                                            />

                                            <Tooltip
                                                content={<ChartTooltipContent />}
                                                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                                            />

                                            <ReferenceLine 
                                                y={500000} 
                                                stroke="var(--bm-color-action-destructive)" 
                                                strokeDasharray="3 3"
                                                label={{ 
                                                    value: "Limit (500,000)", 
                                                    position: "top",
                                                    fontSize: "0.8rem",
                                                    fill: "#808080"
                                                }}
                                            />

                                            <Bar
                                                dataKey="value"
                                                fill="#e35f59"
                                                name="Requests"
                                                radius={[0, 0, 0, 0]}
                                                maxBarSize={isDesktop ? 20 : 16}
                                            />

                                            <Bar
                                                dataKey="yellow"
                                                fill="#fcb92d"
                                                name="Cached"
                                                radius={[0, 0, 0, 0]}
                                                maxBarSize={isDesktop ? 20 : 16}
                                            />
                                        </RechartsBarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="relative py-0">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-secondary"></div>
                                    </div>
                                </div>
                                <div className="flex px-4 sm:px-6 py-3">
                                    <p className="text-sm text-primary">
                                        Visit{" "}
                                        <a 
                                            href="https://developers.bettermode.com/docs/guide/graphql/rate-limits"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-secondary hover:text-brand-secondary-hovered"
                                        >
                                            Developers' Guide
                                        </a>
                                        {" "}to know more about our rate limits policies.
                                    </p>
                                </div>
                            </div>

                            {/* Request Complexity Card */}
                            <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-start bg-primary shadow-sm sm:rounded-xl">
                                <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                    <div>
                                        <h3 className="text-primary font-medium text-lg">Request complexity</h3>
                                        <div className="text-tertiary mt-1">
                                            <p className="text-sm text-tertiary">The complexity of API requests made to your site</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-5 sm:p-6 flex-none">
                                    <ResponsiveContainer width="100%" height={240} minHeight={180} maxHeight={240}>
                                        <RechartsBarChart
                                            data={requestComplexityData}
                                            className="text-tertiary [&_.recharts-text]:text-xs"
                                            margin={{
                                                left: -20,
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid 
                                                strokeDasharray="3 3" 
                                                stroke="#ccc" 
                                                vertical={false}
                                            />

                                            <XAxis
                                                dataKey="date"
                                                angle={45}
                                                textAnchor="start"
                                                fontSize="0.7rem"
                                                stroke="var(--bm-color-content-on-background-subdued)"
                                                tickLine={false}
                                            />

                                            <YAxis
                                                fontSize="0.7rem"
                                                stroke="var(--bm-color-content-on-background-subdued)"
                                                tickFormatter={(value) => {
                                                    if (value >= 1000000) return `${value / 1000000}M`;
                                                    if (value >= 1000) return `${value / 1000}K`;
                                                    return value;
                                                }}
                                            />

                                            <Tooltip
                                                content={<ChartTooltipContent />}
                                                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                                            />

                                            <ReferenceLine 
                                                y={50000000} 
                                                stroke="var(--bm-color-action-destructive)" 
                                                strokeDasharray="3 3"
                                                label={{ 
                                                    value: "Limit (50,000,000)", 
                                                    position: "top",
                                                    fontSize: "0.8rem",
                                                    fill: "#808080"
                                                }}
                                            />

                                            <Bar
                                                dataKey="value"
                                                fill="#e35f59"
                                                name="Complexity"
                                                radius={[0, 0, 0, 0]}
                                                maxBarSize={isDesktop ? 20 : 16}
                                            />

                                            <Bar
                                                dataKey="yellow"
                                                fill="#fcb92d"
                                                name="Cached Complexity"
                                                radius={[0, 0, 0, 0]}
                                                maxBarSize={isDesktop ? 20 : 16}
                                            />
                                        </RechartsBarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="relative py-0">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-secondary"></div>
                                    </div>
                                </div>
                                <div className="flex px-4 sm:px-6 py-3">
                                    <p className="text-sm text-primary">
                                        Learn more about{" "}
                                        <a 
                                            href="https://developers.bettermode.com/docs/guide/graphql/rate-limits#graphql-complexity-calculation"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-secondary hover:text-brand-secondary-hovered"
                                        >
                                            GraphQL Complexity Calculation
                                        </a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};

