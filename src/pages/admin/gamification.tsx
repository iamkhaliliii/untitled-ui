import {
    Trophy01,
    Star01,
    Award01,
    Gift01,
    Target01,
    BarChart03,
    MessageSquare01,
    Heart,
    Eye,
    Plus,
    Zap,
    Bell01,
    Users01,
    Shield01,
    AlertTriangle,
    Grid03,
    Settings01,
    TrendUp01,
    CurrencyDollarCircle,
    Package,
    ShoppingCart01,
    CheckDone01,
    Settings02,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { AdminLayout } from "@/components/layouts/admin-layout";

export const AdminGamificationPage = () => {
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

    return (
        <AdminLayout 
            title="Gamification"
            description="Configure rewards, points, badges and engagement systems"
            currentPath="/admin/setting/gamification"
            headerActions={headerActions}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="max-w-3xl flex flex-col space-y-5">
                {/* About This Project */}
                <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                    <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                        <h3 className="text-primary font-medium text-lg">About this project</h3>
                    </div>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                                <Trophy01 className="h-6 w-6 text-brand-secondary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-tertiary leading-relaxed">
                                    Gamification system allows you to engage users through points, badges, status levels, and rewards. 
                                    Create campaigns that trigger specific actions and drive user engagement across your platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What Can Be Earned */}
                <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                    <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                        <h3 className="text-primary font-medium text-lg">What can be earned</h3>
                    </div>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border border-secondary bg-primary p-4 hover:bg-primary_hover transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                                                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-50">
                                     <CurrencyDollarCircle className="h-4 w-4 text-yellow-600" />
                                 </div>
                                <h3 className="font-medium text-primary">Points</h3>
                            </div>
                            <p className="text-sm text-tertiary mb-3">
                                Simple for PLG, Advanced for Enterprise
                            </p>
                                                         <div className="flex gap-2">
                                 <Badge color="warning" size="sm">Simple</Badge>
                                 <Badge color="brand" size="sm">Advanced</Badge>
                             </div>
                        </div>

                        <div className="rounded-lg border border-secondary bg-primary p-4 hover:bg-primary_hover transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                                                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50">
                                     <Star01 className="h-4 w-4 text-purple-600" />
                                 </div>
                                <h3 className="font-medium text-primary">Status</h3>
                            </div>
                            <p className="text-sm text-tertiary mb-3">
                                User level progression system
                            </p>
                            <Badge color="purple" size="sm">Max 20 levels</Badge>
                        </div>

                        <div className="rounded-lg border border-secondary bg-primary p-4 hover:bg-primary_hover transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
                                    <Award01 className="h-4 w-4 text-green-600" />
                                </div>
                                <h3 className="font-medium text-primary">Badge</h3>
                            </div>
                            <p className="text-sm text-tertiary mb-3">
                                Achievement recognition system
                            </p>
                                                         <Badge color="success" size="sm">Max 100 badges</Badge>
                        </div>

                        <div className="rounded-lg border border-secondary bg-primary p-4 hover:bg-primary_hover transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                                    <Gift01 className="h-4 w-4 text-blue-600" />
                                </div>
                                <h3 className="font-medium text-primary">Reward</h3>
                            </div>
                            <p className="text-sm text-tertiary mb-3">
                                Tangible benefits and prizes
                            </p>
                            <Badge color="blue" size="sm">Max 100 rewards</Badge>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Point System */}
                <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                    <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                        <div className="flex items-center gap-3">
                            <Target01 className="h-5 w-5 text-brand-secondary" />
                            <h3 className="text-primary font-medium text-lg">Point System</h3>
                        </div>
                        <div className="text-tertiary mt-1">
                            <p>Actions contribute to points. Configure which user activities earn points and how many.</p>
                        </div>
                    </div>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            { action: "Visit", icon: Eye, points: "1-5", description: "Daily site visits" },
                            { action: "New Post", icon: Plus, points: "10-50", description: "Creating new content" },
                            { action: "New Reply", icon: MessageSquare01, points: "5-25", description: "Replying to posts" },
                            { action: "Received Reply", icon: MessageSquare01, points: "2-10", description: "Getting replies" },
                            { action: "Received Like", icon: Heart, points: "1-5", description: "Content being liked" },
                            { action: "Given Like", icon: Heart, points: "1-3", description: "Liking others content" },
                        ].map((item, index) => (
                            <div key={index} className="rounded-lg border border-secondary bg-secondary/20 p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <item.icon className="h-4 w-4 text-brand-secondary" />
                                    <span className="font-medium text-primary">{item.action}</span>
                                    <Badge color="brand" size="sm">{item.points} pts</Badge>
                                </div>
                                <p className="text-sm text-tertiary">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-blue-800 mb-1">External Actions</h4>
                                <p className="text-sm text-blue-600">
                                    Use API or Zapier integrations to add points for external activities and achievements.
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Campaigns */}
                <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                    <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                        <div className="flex items-center gap-3">
                            <BarChart03 className="h-5 w-5 text-brand-secondary" />
                            <h3 className="text-primary font-medium text-lg">Campaigns</h3>
                        </div>
                        <div className="text-tertiary mt-1">
                            <p>Create automated campaigns with triggers, conditions, and effects to reward specific behaviors.</p>
                        </div>
                    </div>
                    <div className="flex-1 px-4 py-5 sm:p-6">

                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="rounded-lg border border-secondary bg-secondary/20 p-4">
                            <div className="flex items-center gap-3 mb-3">
                                                                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
                                     <Plus className="h-4 w-4 text-green-600" />
                                 </div>
                                <h3 className="font-medium text-primary">Trigger</h3>
                            </div>
                            <p className="text-sm text-tertiary mb-3">
                                What action starts the campaign
                            </p>
                            <div className="space-y-1">
                                <div className="text-xs text-tertiary">• User signup</div>
                                <div className="text-xs text-tertiary">• First post</div>
                                <div className="text-xs text-tertiary">• Daily login</div>
                                <div className="text-xs text-tertiary">• Milestone reached</div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-secondary bg-secondary/20 p-4">
                            <div className="flex items-center gap-3 mb-3">
                                                                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50">
                                     <Settings02 className="h-4 w-4 text-orange-600" />
                                 </div>
                                <h3 className="font-medium text-primary">Condition</h3>
                            </div>
                            <p className="text-sm text-tertiary mb-3">
                                Requirements that must be met
                            </p>
                            <div className="space-y-1">
                                <div className="text-xs text-tertiary">• Time constraints</div>
                                <div className="text-xs text-tertiary">• User level</div>
                                <div className="text-xs text-tertiary">• Previous actions</div>
                                <div className="text-xs text-tertiary">• Custom rules</div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-secondary bg-secondary/20 p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50">
                                    <Gift01 className="h-4 w-4 text-purple-600" />
                                </div>
                                <h3 className="font-medium text-primary">Effect/Earn</h3>
                            </div>
                            <p className="text-sm text-tertiary mb-3">
                                What the user receives
                            </p>
                            <div className="space-y-1">
                                <div className="text-xs text-tertiary">• Points awarded</div>
                                <div className="text-xs text-tertiary">• Badge unlocked</div>
                                <div className="text-xs text-tertiary">• Status upgrade</div>
                                <div className="text-xs text-tertiary">• Reward granted</div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Rewards */}
                <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                    <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                        <div className="flex items-center gap-3">
                            <Package className="h-5 w-5 text-brand-secondary" />
                            <h3 className="text-primary font-medium text-lg">Rewards</h3>
                        </div>
                    </div>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                    
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-lg border border-secondary bg-secondary/20 p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
                                    <CheckDone01 className="h-4 w-4 text-green-600" />
                                </div>
                                <h3 className="font-medium text-primary">Assigned Rewards</h3>
                            </div>
                            <p className="text-sm text-tertiary mb-4">
                                Automatically assigned rewards that users can claim when earned.
                            </p>
                            <ul className="space-y-2 text-sm text-tertiary">
                                <li>• Achievement-based rewards</li>
                                <li>• Milestone completions</li>
                                <li>• Campaign rewards</li>
                                <li>• Time-limited bonuses</li>
                            </ul>
                        </div>

                        <div className="rounded-lg border border-secondary bg-secondary/20 p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                                    <ShoppingCart01 className="h-4 w-4 text-blue-600" />
                                </div>
                                <h3 className="font-medium text-primary">Reward Catalog</h3>
                            </div>
                            <p className="text-sm text-tertiary mb-4">
                                A marketplace where users can purchase or redeem rewards using their points.
                            </p>
                            <ul className="space-y-2 text-sm text-tertiary">
                                <li>• Point-based purchasing</li>
                                <li>• Exclusive items</li>
                                <li>• Limited-time offers</li>
                                <li>• Tiered availability</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Considerations */}
                <div className="border border-warning-200 flex flex-col text-warning-600 transition duration-200 justify-between bg-warning-50 shadow-sm sm:rounded-xl">
                    <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-warning-600" />
                            <h3 className="text-warning-800 font-medium text-lg">Considerations</h3>
                        </div>
                    </div>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                    
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                                                         <div className="flex items-start gap-3">
                                 <Shield01 className="h-5 w-5 text-warning-600 mt-0.5" />
                                 <div>
                                    <h4 className="font-medium text-warning-800 mb-1">Rate limits and fraud detection</h4>
                                    <p className="text-sm text-warning-600">
                                        Implement rate limiting to prevent abuse and fraud detection to maintain system integrity.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Grid03 className="h-5 w-5 text-warning-600 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-warning-800 mb-1">Impact on blocks/widgets</h4>
                                    <p className="text-sm text-warning-600">
                                        Consider how gamification elements will be displayed in existing UI components and widgets.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Bell01 className="h-5 w-5 text-warning-600 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-warning-800 mb-1">Notification integration</h4>
                                    <p className="text-sm text-warning-600">
                                        How notifications will be connected and can be part of campaign effects.
                                    </p>
                                </div>
                            </div>

                                                         <div className="flex items-start gap-3">
                                 <Settings02 className="h-5 w-5 text-warning-600 mt-0.5" />
                                 <div>
                                    <h4 className="font-medium text-warning-800 mb-1">Workflow impact</h4>
                                    <p className="text-sm text-warning-600">
                                        Evaluate how gamification will affect existing workflows and user journeys.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                    <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                        <h3 className="text-primary font-medium text-lg">Quick Actions</h3>
                    </div>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Button size="sm" color="primary" iconLeading={Plus} className="w-full">
                            Create Campaign
                        </Button>
                        <Button size="sm" color="secondary" iconLeading={Settings01} className="w-full">
                            Point Settings
                        </Button>
                        <Button size="sm" color="tertiary" iconLeading={Trophy01} className="w-full">
                            Manage Badges
                        </Button>
                        <Button size="sm" color="tertiary" iconLeading={TrendUp01} className="w-full">
                            View Reports
                        </Button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </AdminLayout>
    );
}; 