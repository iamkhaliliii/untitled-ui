import React, { useState } from "react";
import { Download01, TrendUp01, TrendDown01, Eye, Users01, Calendar, MessageCircle01, Heart, BarChart03, PieChart01, ArrowUpRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";

interface AnalyticsCard {
    title: string;
    value: string;
    change: string;
    changeType: 'up' | 'down' | 'neutral';
    icon: React.ComponentType<any>;
    color: string;
}

interface EventsAnalyticsSettingsProps {}

export const EventsAnalyticsSettings = ({}: EventsAnalyticsSettingsProps) => {
    const [selectedPeriod, setSelectedPeriod] = useState('7d');

    const analyticsData: AnalyticsCard[] = [
        {
            title: "Total Views",
            value: "2,847",
            change: "+12.5%",
            changeType: 'up',
            icon: Eye,
            color: "text-blue-600"
        },
        {
            title: "Active Members",
            value: "245",
            change: "+5.2%",
            changeType: 'up',
            icon: Users01,
            color: "text-green-600"
        },
        {
            title: "Events Created",
            value: "18",
            change: "-2.1%",
            changeType: 'down',
            icon: Calendar,
            color: "text-purple-600"
        },
        {
            title: "Comments",
            value: "487",
            change: "+8.3%",
            changeType: 'up',
            icon: MessageCircle01,
            color: "text-orange-600"
        },
        {
            title: "Reactions",
            value: "1,234",
            change: "+15.7%",
            changeType: 'up',
            icon: Heart,
            color: "text-red-600"
        },
        {
            title: "Engagement Rate",
            value: "67.8%",
            change: "+3.4%",
            changeType: 'up',
            icon: TrendUp01,
            color: "text-indigo-600"
        }
    ];

    const exportData = () => {
        console.log("Exporting analytics data...");
        // Implement actual export functionality here
    };

    const AnalyticsCard = ({ data }: { data: AnalyticsCard }) => {
        const IconComponent = data.icon;
        const TrendIcon = data.changeType === 'up' ? TrendUp01 : TrendDown01;
        
        return (
            <div className="bg-primary border border-secondary rounded-lg p-3 sm:p-4 hover:border-brand-200 transition-colors">
                <div className="flex flex-col space-y-3">
                    {/* Header with icon and trend */}
                    <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg bg-secondary/20 flex-shrink-0`}>
                            <IconComponent className={`size-4 sm:size-5 ${data.color}`} />
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                            data.changeType === 'up' 
                                ? 'bg-success-50 text-success-700' 
                                : 'bg-error-50 text-error-700'
                        }`}>
                            <TrendIcon className="size-3" />
                            {data.change}
                        </div>
                    </div>
                    
                    {/* Title and Value */}
                    <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-medium text-tertiary leading-tight">{data.title}</p>
                        <p className="text-xl sm:text-2xl font-bold text-primary leading-tight">{data.value}</p>
                    </div>
                </div>
            </div>
        );
    };

    const ChartPlaceholder = ({ title, icon: Icon }: { title: string; icon: React.ComponentType<any> }) => (
        <div className="bg-primary border border-secondary rounded-lg p-6 hover:border-brand-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-primary">{title}</h3>
                <Icon className="size-5 text-tertiary" />
            </div>
            <div className="h-32 bg-secondary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                    <Icon className="size-8 text-tertiary mx-auto mb-2" />
                    <p className="text-sm text-tertiary">Chart visualization</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4 sm:space-y-6 p-3 sm:p-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-primary">Space Analytics</h2>
                    <p className="text-sm text-tertiary mt-1">Monitor your space performance and engagement</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge type="pill-color" color="brand" size="sm">
                        Last 7 days
                    </Badge>
                </div>
            </div>

            {/* Period Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-sm font-medium text-secondary flex-shrink-0">Period:</span>
                <div className="flex items-center bg-secondary/20 rounded-lg p-1 w-full sm:w-auto">
                    {[
                        { id: '7d', label: '7D' },
                        { id: '30d', label: '30D' },
                        { id: '90d', label: '90D' },
                        { id: '1y', label: '1Y' }
                    ].map((period) => (
                        <button
                            key={period.id}
                            onClick={() => setSelectedPeriod(period.id)}
                            className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                selectedPeriod === period.id
                                    ? 'bg-primary text-secondary shadow-sm'
                                    : 'text-tertiary hover:text-secondary'
                            }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Analytics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4">
                {analyticsData.map((data, index) => (
                    <AnalyticsCard key={index} data={data} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="space-y-4">
                <h3 className="text-sm sm:text-md font-semibold text-primary">Performance Charts</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    <ChartPlaceholder title="Engagement Over Time" icon={BarChart03} />
                    <ChartPlaceholder title="Content Distribution" icon={PieChart01} />
                </div>
            </div>

            {/* Quick Actions */}
            <div className="border border-secondary rounded-lg p-3 sm:p-4">
                <h3 className="text-sm font-semibold text-primary mb-3">Quick Actions</h3>
                <div className="flex flex-col gap-2 sm:gap-3">
                    <Button size="sm" color="secondary" iconLeading={Download01} className="w-full sm:w-auto">
                        Export Full Report
                    </Button>
                    <Button size="sm" color="secondary" iconLeading={Eye} className="w-full sm:w-auto">
                        View Detailed Analytics
                    </Button>
                    <Button size="sm" color="secondary" iconLeading={ArrowUpRight} className="w-full sm:w-auto">
                        Share Report
                    </Button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="border border-secondary rounded-lg p-3 sm:p-4">
                <h3 className="text-sm font-semibold text-primary mb-3">Recent Activity</h3>
                <div className="space-y-3">
                    {[
                        { action: "New event created", time: "2 hours ago", type: "event" },
                        { action: "Member joined space", time: "4 hours ago", type: "member" },
                        { action: "High engagement post", time: "6 hours ago", type: "engagement" },
                        { action: "Comment milestone reached", time: "1 day ago", type: "milestone" }
                    ].map((activity, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 py-2 border-b border-secondary last:border-b-0">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-2 h-2 rounded-full bg-brand-solid flex-shrink-0"></div>
                                <span className="text-sm text-secondary truncate">{activity.action}</span>
                            </div>
                            <span className="text-xs text-tertiary flex-shrink-0 ml-5 sm:ml-0">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}; 