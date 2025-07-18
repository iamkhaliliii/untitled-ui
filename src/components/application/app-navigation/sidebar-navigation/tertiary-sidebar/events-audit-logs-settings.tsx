import React, { useState } from "react";
import { Download01, FilterFunnel01, SearchLg, Calendar, Users01, MessageCircle01, Heart, Plus, Minus, User02, Clock, ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Badge } from "@/components/base/badges/badges";

interface AuditLogEntry {
    id: string;
    action: string;
    user: string;
    target?: string;
    type: 'wishlist' | 'reply' | 'reaction' | 'member' | 'general';
    timestamp: string;
    timeAgo: string;
}

interface EventsAuditLogsSettingsProps {}

export const EventsAuditLogsSettings = ({}: EventsAuditLogsSettingsProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedTimeRange, setSelectedTimeRange] = useState('today');

    const auditLogs: AuditLogEntry[] = [
        {
            id: '1',
            action: 'added TEST TEST to Wishlist',
            user: 'Someone',
            target: 'TEST TEST',
            type: 'wishlist',
            timestamp: '2024-01-15T10:51:00Z',
            timeAgo: '9 minutes ago'
        },
        {
            id: '2',
            action: 'added 77bb7org to Wishlist',
            user: 'Someone',
            target: '77bb7org',
            type: 'wishlist',
            timestamp: '2024-01-15T10:48:00Z',
            timeAgo: '12 minutes ago'
        },
        {
            id: '3',
            action: 'added kbetart to Wishlist',
            user: 'Someone',
            target: 'kbetart',
            type: 'wishlist',
            timestamp: '2024-01-15T10:40:00Z',
            timeAgo: '20 minutes ago'
        },
        {
            id: '4',
            action: 'replied to Add to Calendar Field and Button Standard on Event CMS',
            user: 'Dan Aaron Pena',
            target: 'Add to Calendar Field and Button Standard on Event CMS',
            type: 'reply',
            timestamp: '2024-01-15T10:22:00Z',
            timeAgo: '38 minutes ago'
        },
        {
            id: '5',
            action: 'added reaction to Add to Calendar Field and Button Standard on Event CMS',
            user: 'Edwin White Chacon',
            target: 'Add to Calendar Field and Button Standard on Event CMS',
            type: 'reaction',
            timestamp: '2024-01-15T10:20:00Z',
            timeAgo: '40 minutes ago'
        },
        {
            id: '6',
            action: 'added Edwin White Chacon to Wishlist',
            user: 'Someone',
            target: 'Edwin White Chacon',
            type: 'wishlist',
            timestamp: '2024-01-15T10:16:00Z',
            timeAgo: '44 minutes ago'
        },
        {
            id: '7',
            action: 'added reaction to infinite scroll feature',
            user: 'Diamante - The Italian Lifestyle',
            target: 'infinite scroll feature',
            type: 'reaction',
            timestamp: '2024-01-15T09:00:00Z',
            timeAgo: 'an hour ago'
        },
        {
            id: '8',
            action: 'added reaction to A members profile should not be visible to logged out visitors.',
            user: 'Diamante - The Italian Lifestyle',
            target: 'A members profile should not be visible to logged out visitors.',
            type: 'reaction',
            timestamp: '2024-01-15T09:00:00Z',
            timeAgo: 'an hour ago'
        },
        {
            id: '9',
            action: 'removed reaction from A members profile should not be visible to logged out visitors.',
            user: 'Diamante - The Italian Lifestyle',
            target: 'A members profile should not be visible to logged out visitors.',
            type: 'reaction',
            timestamp: '2024-01-15T09:00:00Z',
            timeAgo: 'an hour ago'
        }
    ];

    const filterOptions = [
        { id: 'all', label: 'All Activities', icon: Clock },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'reply', label: 'Replies', icon: MessageCircle01 },
        { id: 'reaction', label: 'Reactions', icon: Heart },
        { id: 'member', label: 'Members', icon: Users01 }
    ];

    const timeRangeOptions = [
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' },
        { id: 'all', label: 'All Time' }
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'wishlist': return Heart;
            case 'reply': return MessageCircle01;
            case 'reaction': return Heart;
            case 'member': return Users01;
            default: return Clock;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'wishlist': return 'text-red-600';
            case 'reply': return 'text-blue-600';
            case 'reaction': return 'text-orange-600';
            case 'member': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'wishlist': return 'error';
            case 'reply': return 'blue';
            case 'reaction': return 'warning';
            case 'member': return 'success';
            default: return 'gray';
        }
    };

    const filteredLogs = auditLogs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedFilter === 'all' || log.type === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    const exportLogs = () => {
        console.log("Exporting audit logs...");
        // Implement actual export functionality here
    };

    const AuditLogItem = ({ log }: { log: AuditLogEntry }) => {
        const IconComponent = getActivityIcon(log.type);
        const iconColor = getActivityColor(log.type);
        const badgeColor = getBadgeColor(log.type);

        return (
            <div className="relative flex gap-4 pb-6">
                {/* Timeline line */}
                <div className="absolute left-4 top-8 h-full w-px bg-secondary"></div>
                
                {/* Icon */}
                <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary border-2 border-secondary`}>
                    <IconComponent className={`h-4 w-4 ${iconColor}`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-primary">{log.user}</span>
                                <Badge type="pill-color" color={badgeColor as any} size="sm">
                                    {log.type}
                                </Badge>
                            </div>
                            <p className="text-sm text-secondary leading-relaxed">
                                {log.action}
                            </p>
                        </div>
                        <span className="text-xs text-tertiary flex-shrink-0 mt-1">{log.timeAgo}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4 sm:space-y-6 p-3 sm:p-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-primary">Audit Logs</h2>
                    <p className="text-sm text-tertiary mt-1">Track all activities and changes in your space</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <ButtonUtility
                        size="sm"
                        color="secondary"
                        icon={Download01}
                        tooltip="Export Audit Logs"
                        onClick={exportLogs}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="space-y-3">
                {/* Search */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <Input
                            placeholder="Search activities, users, or targets..."
                            value={searchTerm}
                            onChange={setSearchTerm}
                            icon={SearchLg}
                        />
                    </div>
                </div>

                {/* Filter and Time Range */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <Select
                            items={filterOptions}
                            selectedKey={selectedFilter}
                            onSelectionChange={(key) => setSelectedFilter(key as string)}
                            placeholder="Filter by activity type"
                        >
                            {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                        </Select>
                    </div>
                    <div className="flex-1">
                        <Select
                            items={timeRangeOptions}
                            selectedKey={selectedTimeRange}
                            onSelectionChange={(key) => setSelectedTimeRange(key as string)}
                            placeholder="Select time range"
                        >
                            {(item) => <Select.Item id={item.id} label={item.label} />}
                        </Select>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-primary border border-secondary rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-primary">9</p>
                    <p className="text-xs text-tertiary">Total Activities</p>
                </div>
                <div className="bg-primary border border-secondary rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-primary">5</p>
                    <p className="text-xs text-tertiary">Unique Users</p>
                </div>
                <div className="bg-primary border border-secondary rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-primary">3</p>
                    <p className="text-xs text-tertiary">Wishlists</p>
                </div>
                <div className="bg-primary border border-secondary rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-primary">4</p>
                    <p className="text-xs text-tertiary">Reactions</p>
                </div>
            </div>

            {/* Timeline */}
            <div className="border border-secondary rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-primary">Activity Timeline</h3>
                    <Badge type="pill-color" color="brand" size="sm">
                        {filteredLogs.length} activities
                    </Badge>
                </div>

                {filteredLogs.length > 0 ? (
                    <div className="space-y-2">
                        {filteredLogs.map((log) => (
                            <AuditLogItem key={log.id} log={log} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-tertiary mx-auto mb-3" />
                        <p className="text-sm text-secondary">No activities found</p>
                        <p className="text-xs text-tertiary">Try adjusting your filters</p>
                    </div>
                )}
            </div>

            {/* Load More */}
            {filteredLogs.length > 0 && (
                <div className="text-center">
                    <Button size="sm" color="secondary" iconLeading={ChevronDown}>
                        Load More Activities
                    </Button>
                </div>
            )}
        </div>
    );
}; 