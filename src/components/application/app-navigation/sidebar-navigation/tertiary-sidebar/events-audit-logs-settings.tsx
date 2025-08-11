import React, { useState } from "react";
import { Download01, FilterFunnel01, SearchLg, Calendar, Users01, MessageCircle01, Heart, Plus, Minus, User02, Clock, ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Badge } from "@/components/base/badges/badges";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";

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
    const theme = useResolvedTheme();
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
            default: return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
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

        // Get background color for the circular icon based on type
        const getIconBgColor = (type: string) => {
            switch (type) {
                case 'reaction': return 'bg-orange-100';
                case 'wishlist': return 'bg-pink-100';
                case 'reply': return 'bg-blue-100';
                case 'member': return 'bg-green-100';
                default: return 'bg-gray-100';
            }
        };

        return (
            <div className="relative flex gap-4 pb-6">
                {/* Timeline line */}
                <div className="absolute left-4 top-6 bottom-0 w-px bg-gray-200"></div>
                
                {/* Icon */}
                <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${getIconBgColor(log.type)}`}>
                    <IconComponent className={`h-4 w-4 ${iconColor}`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm font-normal text-gray-900 leading-relaxed">
                        {log.action}
                    </p>
                    <span className="text-xs text-gray-500">{log.timeAgo}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4">
            {/* Simple Timeline Only */}
            <div className="space-y-2">
                {auditLogs.map((log) => (
                    <AuditLogItem key={log.id} log={log} />
                ))}
            </div>
        </div>
    );
}; 