import { useState } from "react";
import {
    Trophy01,
    Star01,
    Eye,
    Plus,
    MessageSquare01,
    Heart,
    Zap,
    Target01,
    Calendar,
    Settings01,
    Edit03,
    PauseCircle,
    Play,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Toggle } from "@/components/base/toggle/toggle";
import { Badge } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { AdminLayout } from "@/components/layouts/admin-layout";

export const AdminGamificationPage = () => {
    const [gamificationEnabled, setGamificationEnabled] = useState(false);
    
    const [pointConfig, setPointConfig] = useState({
        visit: { enabled: true, points: 1 },
        newPost: { enabled: true, points: 10 },
        newReply: { enabled: true, points: 5 },
        receivedReply: { enabled: true, points: 2 },
        receivedLike: { enabled: true, points: 1 },
        givenLike: { enabled: true, points: 1 },
        externalActions: { enabled: true, points: 5 },
    });

    const headerActions = (
        <div className="flex items-center gap-2">
            <Button size="sm" color="tertiary">
                View Analytics
            </Button>
            <Button size="sm" iconLeading={Plus}>
                New Campaign
            </Button>
        </div>
    );

    const handlePointConfigToggle = (action: string, enabled: boolean) => {
        setPointConfig(prev => ({
            ...prev,
            [action]: { ...prev[action as keyof typeof prev], enabled }
        }));
    };

    const handlePointValueChange = (action: string, points: number) => {
        setPointConfig(prev => ({
            ...prev,
            [action]: { ...prev[action as keyof typeof prev], points }
        }));
    };

    return (
        <AdminLayout 
            title="Gamification"
            description="Configure rewards, points, badges and engagement systems"
            currentPath="/admin/setting/gamification"
            headerActions={headerActions}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="flex flex-col space-y-5 max-w-3xl">

                    {/* Gamification Enable/Disable */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Gamification System</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <Trophy01 className="h-5 w-5 text-brand-secondary" />
                                    <div>
                                        <p className="text-primary font-medium">Enable Gamification</p>
                                        <p className="text-tertiary text-sm">Turn on points, badges, and reward systems for your community</p>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <Toggle
                                        isSelected={gamificationEnabled}
                                        onChange={setGamificationEnabled}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Point Configuration */}
                    <div className={`border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl ${!gamificationEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div className="flex items-center gap-3">
                                <Star01 className="h-5 w-5 text-brand-secondary" />
                                <h3 className="text-primary font-medium text-lg">Point Configuration</h3>
                            </div>
                            <p className="text-tertiary text-sm mt-1">
                                Actions contribute to points. (Actions: Visit, New Post, New Reply, Received Reply, Received like, Given Like, External actions using API or Zapier can add points)
                            </p>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="space-y-6">
                                
                                {/* Visit */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Eye className="h-5 w-5 text-fg-quaternary" />
                                        <div>
                                            <p className="text-primary font-medium">Daily Visit</p>
                                            <p className="text-tertiary text-sm">Points for daily site visits</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {pointConfig.visit.enabled && (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={pointConfig.visit.points.toString()}
                                                    onChange={(value) => handlePointValueChange('visit', Number(value))}
                                                    className="w-20"
                                                    isDisabled={!gamificationEnabled}
                                                />
                                                <span className="text-tertiary text-sm">points</span>
                                            </div>
                                        )}
                                        <Toggle
                                            isSelected={pointConfig.visit.enabled}
                                            onChange={(enabled: boolean) => handlePointConfigToggle('visit', enabled)}
                                            isDisabled={!gamificationEnabled}
                                        />
                                    </div>
                                </div>

                                {/* New Post */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Plus className="h-5 w-5 text-fg-quaternary" />
                                        <div>
                                            <p className="text-primary font-medium">New Post</p>
                                            <p className="text-tertiary text-sm">Points for creating new posts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {pointConfig.newPost.enabled && (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={pointConfig.newPost.points.toString()}
                                                    onChange={(value) => handlePointValueChange('newPost', Number(value))}
                                                    className="w-20"
                                                    isDisabled={!gamificationEnabled}
                                                />
                                                <span className="text-tertiary text-sm">points</span>
                                            </div>
                                        )}
                                        <Toggle
                                            isSelected={pointConfig.newPost.enabled}
                                            onChange={(enabled: boolean) => handlePointConfigToggle('newPost', enabled)}
                                            isDisabled={!gamificationEnabled}
                                        />
                                    </div>
                                </div>

                                {/* New Reply */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare01 className="h-5 w-5 text-fg-quaternary" />
                                        <div>
                                            <p className="text-primary font-medium">New Reply</p>
                                            <p className="text-tertiary text-sm">Points for replying to posts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {pointConfig.newReply.enabled && (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={pointConfig.newReply.points.toString()}
                                                    onChange={(value) => handlePointValueChange('newReply', Number(value))}
                                                    className="w-20"
                                                    isDisabled={!gamificationEnabled}
                                                />
                                                <span className="text-tertiary text-sm">points</span>
                                            </div>
                                        )}
                                        <Toggle
                                            isSelected={pointConfig.newReply.enabled}
                                            onChange={(enabled: boolean) => handlePointConfigToggle('newReply', enabled)}
                                            isDisabled={!gamificationEnabled}
                                        />
                                    </div>
                                </div>

                                {/* Received Reply */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare01 className="h-5 w-5 text-fg-quaternary" />
                                        <div>
                                            <p className="text-primary font-medium">Received Reply</p>
                                            <p className="text-tertiary text-sm">Points when others reply to your posts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {pointConfig.receivedReply.enabled && (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={pointConfig.receivedReply.points.toString()}
                                                    onChange={(value) => handlePointValueChange('receivedReply', Number(value))}
                                                    className="w-20"
                                                    isDisabled={!gamificationEnabled}
                                                />
                                                <span className="text-tertiary text-sm">points</span>
                                            </div>
                                        )}
                                        <Toggle
                                            isSelected={pointConfig.receivedReply.enabled}
                                            onChange={(enabled: boolean) => handlePointConfigToggle('receivedReply', enabled)}
                                            isDisabled={!gamificationEnabled}
                                        />
                                    </div>
                                </div>

                                {/* Received Like */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Heart className="h-5 w-5 text-fg-quaternary" />
                                        <div>
                                            <p className="text-primary font-medium">Received Like</p>
                                            <p className="text-tertiary text-sm">Points when others like your content</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {pointConfig.receivedLike.enabled && (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={pointConfig.receivedLike.points.toString()}
                                                    onChange={(value) => handlePointValueChange('receivedLike', Number(value))}
                                                    className="w-20"
                                                    isDisabled={!gamificationEnabled}
                                                />
                                                <span className="text-tertiary text-sm">points</span>
                                            </div>
                                        )}
                                        <Toggle
                                            isSelected={pointConfig.receivedLike.enabled}
                                            onChange={(enabled: boolean) => handlePointConfigToggle('receivedLike', enabled)}
                                            isDisabled={!gamificationEnabled}
                                        />
                                    </div>
                                </div>

                                {/* Given Like */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Heart className="h-5 w-5 text-fg-quaternary" />
                                        <div>
                                            <p className="text-primary font-medium">Given Like</p>
                                            <p className="text-tertiary text-sm">Points for liking others' content</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {pointConfig.givenLike.enabled && (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={pointConfig.givenLike.points.toString()}
                                                    onChange={(value) => handlePointValueChange('givenLike', Number(value))}
                                                    className="w-20"
                                                    isDisabled={!gamificationEnabled}
                                                />
                                                <span className="text-tertiary text-sm">points</span>
                                            </div>
                                        )}
                                        <Toggle
                                            isSelected={pointConfig.givenLike.enabled}
                                            onChange={(enabled: boolean) => handlePointConfigToggle('givenLike', enabled)}
                                            isDisabled={!gamificationEnabled}
                                        />
                                    </div>
                                </div>

                                {/* External Actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Zap className="h-5 w-5 text-fg-quaternary" />
                                        <div>
                                            <p className="text-primary font-medium">External Actions</p>
                                            <p className="text-tertiary text-sm">Points via API or Zapier integrations</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {pointConfig.externalActions.enabled && (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={pointConfig.externalActions.points.toString()}
                                                    onChange={(value) => handlePointValueChange('externalActions', Number(value))}
                                                    className="w-20"
                                                    isDisabled={!gamificationEnabled}
                                                />
                                                <span className="text-tertiary text-sm">points</span>
                                            </div>
                                        )}
                                        <Toggle
                                            isSelected={pointConfig.externalActions.enabled}
                                            onChange={(enabled: boolean) => handlePointConfigToggle('externalActions', enabled)}
                                            isDisabled={!gamificationEnabled}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button size="sm" isDisabled={!gamificationEnabled}>
                                        Save Point Settings
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Campaigns */}
                    <div className={`border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl ${!gamificationEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <Target01 className="h-5 w-5 text-brand-secondary" />
                                        <h3 className="text-primary font-medium text-lg">Campaigns</h3>
                                    </div>
                                    <p className="text-tertiary text-sm mt-1">
                                        Create special campaigns to boost engagement during specific time periods
                                    </p>
                                </div>
                                <Button size="sm" iconLeading={Plus} isDisabled={!gamificationEnabled}>
                                    Create Campaign
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="space-y-4">
                                
                                {/* Campaign 1 - Active */}
                                <div className="rounded-lg border border-secondary bg-secondary/20 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-brand-secondary" />
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-medium text-primary">Double Points Weekend</h4>
                                                    <Badge color="success" size="sm">Live</Badge>
                                                </div>
                                                <p className="text-sm text-tertiary">All points doubled during weekends</p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-tertiary">
                                                    <span>• Duration: Friday 6PM - Monday 6AM</span>
                                                    <span>• Effect: 2x point multiplier</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ButtonGroup>
                                            <ButtonGroupItem id="edit" iconLeading={<Edit03 className="size-4" />} isDisabled={!gamificationEnabled}>
                                                Edit
                                            </ButtonGroupItem>
                                            <ButtonGroupItem id="pause" iconLeading={<PauseCircle className="size-4" />} isDisabled={!gamificationEnabled}>
                                                Pause
                                            </ButtonGroupItem>
                                        </ButtonGroup>
                                    </div>
                                </div>

                                {/* Campaign 2 - Upcoming */}
                                <div className="rounded-lg border border-secondary bg-secondary/20 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Star01 className="h-5 w-5 text-brand-secondary" />
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-medium text-primary">Monthly Challenge</h4>
                                                    <Badge color="gray" size="sm">Upcoming</Badge>
                                                </div>
                                                <p className="text-sm text-tertiary">Extra rewards for active participation</p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-tertiary">
                                                    <span>• Duration: Full month</span>
                                                    <span>• Effect: Bonus 50 points for 10+ posts</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ButtonGroup>
                                            <ButtonGroupItem id="edit" iconLeading={<Edit03 className="size-4" />} isDisabled={!gamificationEnabled}>
                                                Edit
                                            </ButtonGroupItem>
                                            <ButtonGroupItem id="start" iconLeading={<Play className="size-4" />} isDisabled={!gamificationEnabled}>
                                                Start
                                            </ButtonGroupItem>
                                        </ButtonGroup>
                                    </div>
                                </div>

                                {/* Campaign 3 - Paused */}
                                <div className="rounded-lg border border-secondary bg-secondary/20 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Target01 className="h-5 w-5 text-brand-secondary" />
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-medium text-primary">New Member Bonus</h4>
                                                    <Badge color="warning" size="sm">Paused</Badge>
                                                </div>
                                                <p className="text-sm text-tertiary">Extra points for first week activity</p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-tertiary">
                                                    <span>• Duration: First 7 days</span>
                                                    <span>• Effect: 3x points for new users</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ButtonGroup>
                                            <ButtonGroupItem id="edit" iconLeading={<Edit03 className="size-4" />} isDisabled={!gamificationEnabled}>
                                                Edit
                                            </ButtonGroupItem>
                                            <ButtonGroupItem id="resume" iconLeading={<Play className="size-4" />} isDisabled={!gamificationEnabled}>
                                                Resume
                                            </ButtonGroupItem>
                                        </ButtonGroup>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-6 p-4 rounded-lg border border-blue-200 bg-blue-50">
                                <div className="flex items-start gap-3">
                                    <Settings01 className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-blue-800 mb-1">Campaign Types</h4>
                                        <p className="text-sm text-blue-600">
                                            Create time-based multipliers, bonus point events, special challenges, or seasonal rewards to keep your community engaged.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}; 