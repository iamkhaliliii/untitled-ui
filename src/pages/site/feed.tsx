import {
    Heart,
    MessageCircle01,
    Share04,
    Bookmark,
    TrendUp01,
    Users01,
    Eye,
    Plus,
    Settings01,
    SearchLg,
    ArrowUp,
    ArrowDown,
    ChevronDown,
    HelpCircle,
    ArrowRight,
    Check,
    X,
    Clock,
    Calendar,
    DotsHorizontal,
    MusicNote01,
    VideoRecorder,
    MarkerPin01,
    FaceSmile,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { SiteLayout } from "@/components/layouts/site-layout";

const RightSidebarContent = () => (
    <>
        {/* Leaderboard */}
        <div>
            <h2 className="text-lg max-md:text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 max-md:mb-4">Leaderboard</h2>
            <div className="rounded-lg border text-card-foreground shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <div className="space-y-3 p-4 max-md:p-5">
                    <div className="flex gap-1 mb-4">
                        <button className="inline-flex items-center justify-center gap-0 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 dark:hover:bg-blue-700 dark:active:bg-blue-800 h-8 text-xs px-3 py-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                            All time
                        </button>
                        <button className="inline-flex items-center justify-center gap-0 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700 h-8 text-xs px-3 py-1 rounded-full text-zinc-500 hover:text-zinc-700">
                            Month
                        </button>
                        <button className="inline-flex items-center justify-center gap-0 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700 h-8 text-xs px-3 py-1 rounded-full text-zinc-500 hover:text-zinc-700">
                            Week
                        </button>
                    </div>
                    
                    {[
                        { rank: 1, name: "David Williams", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", score: 981 },
                        { rank: 2, name: "Emma Johnson", avatar: null, score: 562 },
                        { rank: 3, name: "Noah Reynolds", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", score: 485 },
                        { rank: 4, name: "Isabella Garcia", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", score: 370 },
                        { rank: 5, name: "Lisa White", avatar: null, score: 245 }
                    ].map((user) => (
                        <div key={user.rank} className="flex items-center gap-3">
                            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 w-4">{user.rank}</span>
                            {user.avatar ? (
                                <img className="aspect-square h-8 w-8 rounded-full" alt={user.name} src={user.avatar} />
                            ) : (
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm">
                                    {user.name.charAt(0)}
                                </span>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">{user.name}</p>
                            </div>
                            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{user.score}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Next Event */}
        <div>
            <h2 className="text-lg max-md:text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 max-md:mb-4">Next event</h2>
            <div className="border text-card-foreground bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                <div className="p-6 max-md:p-5">
                    <div className="space-y-4">
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">Today</span>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">6:30</div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400">PM</div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Let's talk about future of AI</h3>
                            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                <div className="w-5 h-5 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center">
                                                                                        <VideoRecorder className="w-3 h-3 text-white dark:text-zinc-900" />
                                </div>
                                <span>BetterHub</span>
                                <span className="text-zinc-400">•</span>
                                <div className="flex items-center gap-1">
                                    <Users01 className="w-3 h-3" />
                                    <span className="text-xs">247 attending</span>
                                </div>
                            </div>
                        </div>
                        
                                                                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                            <MarkerPin01 className="w-4 h-4" />
                                            <span>20 Grand Ave, San Francisco</span>
                                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">Starts in 2h 30m</div>
                            <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-full transition-colors font-medium">
                                View Event
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export const SiteFeedPage = () => {
    return (
        <SiteLayout 
            title="Feed"
            description="Discover what's happening"
            currentPath="/site/feed"
            showRightSidebar={true}
            rightSidebarContent={<RightSidebarContent />}
        >
            <div className="flex-1">
                <div className="flex gap-6 max-lg:gap-4 max-md:flex-col max-md:gap-0">
                    <div className="flex-1 space-y-8 max-lg:space-y-6 max-md:space-y-4">
                        {/* Pinned Posts */}
                        <div style={{ opacity: 1 }}>
                            <h2 className="text-lg max-md:text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 max-md:mb-4">Pinned posts</h2>
                            <div className="space-y-4 max-md:space-y-3">
                                <div style={{ opacity: 1, transform: "none" }}>
                                    <div className="w-full max-w-2xl max-md:max-w-none mx-auto cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow h-fit">
                                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                            <div className="p-6 max-lg:p-5 max-md:p-4">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-start gap-3">
                                                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Community Team" className="w-12 h-12 max-md:w-10 max-md:h-10 rounded-full ring-2 ring-white dark:ring-zinc-800" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <h3 className="text-base max-md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">Community Team</h3>
                                                                <div className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-normal">
                                                                    <span className="mr-0.5">⭐</span>Admin
                                                                </div>
                                                                <span className="text-base">📌</span>
                                                            </div>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Pinned<span> • posted on wishlist</span></p>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                        <DotsHorizontal className="w-5 h-5 text-zinc-400" />
                                                    </button>
                                                </div>
                                                
                                                <p className="text-zinc-600 dark:text-zinc-300 mb-4">🎯 Help us shape the future of music! What features would you love to see in our platform? Your ideas matter and directly influence our roadmap. Vote for your favorites below! 🚀</p>
                                                
                                                {/* Poll */}
                                                <div className="space-y-4 max-md:space-y-3">
                                                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-zinc-50/30 dark:bg-zinc-800/30">
                                                        <div className="p-5">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                                        <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                                    </div>
                                                                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Poll</h4>
                                                                </div>
                                                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 text-xs">Active</div>
                                                            </div>
                                                            <h5 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mb-4">Which feature should we prioritize next?</h5>
                                                            <div className="space-y-2.5">
                                                                {[
                                                                    "AI-powered music recommendations",
                                                                    "Real-time collaboration tools", 
                                                                    "Advanced analytics dashboard",
                                                                    "Native mobile application",
                                                                    "Enhanced playlist sharing"
                                                                ].map((option) => (
                                                                    <button key={option} type="button" className="w-full text-left p-3.5 rounded-xl border-2 transition-all duration-300 relative overflow-hidden group border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-zinc-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:shadow-sm">
                                                                        <div className="relative flex items-center justify-between">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all border-zinc-300 dark:border-zinc-600"></div>
                                                                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{option}</span>
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Post Actions */}
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1">
                                                                <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-all text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                                                                    <ArrowUp className="w-4 h-4" />
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">1429</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-all text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                                                                    <ArrowDown className="w-4 h-4" />
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">67</span>
                                                                </button>
                                                            </div>
                                                            <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                                                <MessageCircle01 className="w-4 h-4" />
                                                                <span className="text-[0.7rem] font-medium">234</span>
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button type="button" className="p-2 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                                <Share04 className="w-4 h-4" />
                                                            </button>
                                                            <button type="button" className="p-2 rounded-full transition-colors text-blue-500 bg-blue-50 dark:bg-blue-500/10">
                                                                <Bookmark className="w-4 h-4 fill-current" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feed Section */}
                        <div style={{ opacity: 1 }}>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg max-md:text-xl font-semibold text-zinc-900 dark:text-zinc-100">Feed</h2>
                                <button className="justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:bg-gray-200 focus-visible:ring-gray-500 dark:active:bg-gray-700 h-8 flex items-center gap-2 px-3 py-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg" type="button">
                                    <ArrowUp className="w-4 h-4" />
                                    <span className="capitalize">latest</span>
                                    <ChevronDown className="w-3 h-3 ml-1 opacity-60" />
                                </button>
                            </div>
                            
                            <div className="space-y-4 pb-8 max-md:pb-4">

                                {/* Post 1: Jordan Kim - Event Post */}
                                <div style={{ opacity: 1, transform: "none" }}>
                                    <a href="/site/post-view" className="w-full max-w-2xl max-md:max-w-none mx-auto cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow h-fit block">
                                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                            <div className="p-6 max-lg:p-5 max-md:p-4">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-start gap-3">
                                                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Jordan Kim" className="w-12 h-12 max-md:w-10 max-md:h-10 rounded-full ring-2 ring-white dark:ring-zinc-800" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <h3 className="text-base max-md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">Jordan Kim</h3>
                                                                <div className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-normal">
                                                                    <span className="mr-0.5">🎪</span>Event Host
                                                                </div>
                                                                <span className="text-base">🥉</span>
                                                            </div>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">8h ago<span> • posted on events</span></p>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                        <DotsHorizontal className="w-5 h-5 text-zinc-400" />
                                                    </button>
                                                </div>
                                                
                                                <p className="text-zinc-600 dark:text-zinc-300 mb-4">Join us for our Monthly Music Meetup! 🎵 We'll be showcasing new artists, discussing latest trends, and networking with fellow music enthusiasts. Free snacks and drinks provided!</p>
                                                
                                                {/* Event Card */}
                                                <div className="space-y-4 max-md:space-y-3">
                                                    <div className="rounded-2xl border overflow-hidden transition-all duration-300 border-zinc-200 dark:border-zinc-700 bg-zinc-50/30 dark:bg-zinc-800/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/70">
                                                        <div className="p-5 max-lg:p-4 max-md:p-4">
                                                            <div className="flex items-center mb-6 max-md:mb-4">
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                                    </div>
                                                                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Event</h4>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-4 max-md:flex-col max-md:gap-3">
                                                                <div className="flex-shrink-0 max-md:flex-shrink">
                                                                    <div className="w-32 max-lg:w-28 max-md:w-full aspect-square rounded-lg overflow-hidden">
                                                                        <img src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=200&h=200&fit=crop&crop=center" alt="Monthly Music Meetup - March 2024" className="w-full h-full object-cover" />
                                                                    </div>
                                                                </div>
                                                                <div className="w-px bg-zinc-100 dark:bg-zinc-700 my-1 max-md:hidden"></div>
                                                                <div className="flex-1 min-w-0 space-y-2 max-md:space-y-3">
                                                                    <div className="flex items-center gap-2 text-xs max-md:text-sm font-medium text-zinc-500 dark:text-zinc-400 max-md:flex-wrap">
                                                                        <div className="flex items-center gap-1">
                                                                            <Calendar className="w-3 h-3 max-md:w-4 max-md:h-4" />
                                                                            <span>Saturday, March 23rd</span>
                                                                        </div>
                                                                        <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-600 max-md:hidden"></div>
                                                                        <div className="flex items-center gap-1">
                                                                            <Clock className="w-3 h-3 max-md:w-4 max-md:h-4" />
                                                                            <span>2:00 PM - 5:00 PM</span>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="text-xl max-lg:text-lg max-md:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">Monthly Music Meetup - March 2024</h3>
                                                                    <div className="flex items-center gap-3 text-xs max-md:text-sm text-zinc-500 dark:text-zinc-400 max-md:flex-wrap">
                                                                        <div className="flex items-center gap-1">
                                                                            <MarkerPin01 className="w-3 h-3 max-md:w-4 max-md:h-4" />
                                                                            <span>Community Center + </span>
                                                                            <VideoRecorder className="w-3 h-3 max-md:w-4 max-md:h-4" />
                                                                            <span>Virtual</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-4">
                                                                       {/*  <div className="flex items-center">
                                                                            {[
                                                                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
                                                                                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
                                                                                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
                                                                                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face"
                                                                            ].map((avatar, index) => (
                                                                                <span key={index} className="inline-flex items-center -ml-2 first:ml-0" style={{ zIndex: 4 - index }}>
                                                                                    <span className="rounded-full inline-block overflow-hidden border-2 border-white dark:border-gray-900 duration-200" style={{ width: 24, height: 24 }}>
                                                                                        <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                                                                                    </span>
                                                                                </span>
                                                                            ))}
                                                                            <span className="inline-flex items-center -ml-2" style={{ zIndex: 0 }}>
                                                                                <span className="rounded-full overflow-hidden border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 duration-200 flex justify-center items-center text-gray-700 dark:text-gray-300 text-[0.625rem] leading-3 font-semibold" style={{ width: 24, height: 24 }}>
                                                                                    +2
                                                                                </span>
                                                                            </span>
                                                                        </div> */}
                                                                        <div className="flex items-center gap-2">
                                                                            <img className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-800" alt="Jordan Kim" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                                                                            <span className="text-xs text-zinc-500 dark:text-zinc-400">By Event Host</span>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* Event Action Button */}
                                                                    <div className="flex items-center justify-end max-md:justify-center pt-0">
                                                                        <Button 
                                                                            color="secondary" 
                                                                            size="sm" 
                                                                            className="max-md:w-full max-md:text-base max-md:py-3"
                                                                            iconTrailing={ArrowRight}
                                                                        >
                                                                            View Details & Register
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Post Actions */}
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center gap-1">
                                                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 border border-zinc-100 dark:border-zinc-700 text-sm rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                                                    <span className="text-base">🙏</span>
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">42</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 border border-zinc-100 dark:border-zinc-700 text-sm rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                                                    <span className="text-base">👏</span>
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">28</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 border border-zinc-100 dark:border-zinc-700 text-sm rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                                                    <span className="text-base">🔥</span>
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">15</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-1.5 py-1.5 text-sm rounded-full transition-colors text-zinc-400 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-zinc-100 dark:border-zinc-700">
                                                                    <FaceSmile className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                            <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                                                <MessageCircle01 className="w-4 h-4" />
                                                                <span className="text-[0.7rem] font-medium">23</span>
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button type="button" className="p-2 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                                <Share04 className="w-4 h-4" />
                                                            </button>
                                                            <button type="button" className="p-2 rounded-full transition-colors text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                <Bookmark className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                    {/* Post 2: Sarah Chen - Music Discussion with Playlist */}
                                <div style={{ opacity: 1, transform: "none" }}>
                                    <a href="/site/post-view" className="w-full max-w-2xl max-md:max-w-none mx-auto cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow h-fit block">
                                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                            <div className="p-6 max-lg:p-5 max-md:p-4">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-start gap-3">
                                                        <img src="https://mighty.tools/mockmind-api/content/human/129.jpg" alt="Sarah Chen" className="w-12 h-12 max-md:w-10 max-md:h-10 rounded-full ring-2 ring-white dark:ring-zinc-800" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <h3 className="text-base max-md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">Sarah Chen</h3>
                                                                <div className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-normal">
                                                                    <span className="mr-0.5">👋</span>New member
                                                                </div>
                                                                <span className="text-base">🥉</span>
                                                            </div>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">2h ago<span> • posted on discussion</span></p>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                        <DotsHorizontal className="w-5 h-5 text-zinc-400" />
                                                    </button>
                                                </div>
                                                
                                                <p className="text-zinc-600 dark:text-zinc-300 mb-4">Just discovered this amazing playlist for coding sessions! The mix of lo-fi and ambient sounds really helps with focus. What do you all use for background music while working? 🎵</p>
                                                
                                                {/* Playlist Card */}
                                                <div className="space-y-4 max-md:space-y-3">
                                                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-zinc-50/30 dark:bg-zinc-800/30 p-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-700/50 flex items-center justify-center flex-shrink-0">
                                                                <MusicNote01 className="w-5 h-5 text-blue-500" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h5 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">Focus Flow - Deep Work Playlist</h5>
                                                                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">3 hours of carefully curated ambient and lo-fi tracks</p>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Post Actions */}
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-all text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                <Heart className="w-4 h-4 text-zinc-500" />
                                                                <span className="text-[0.7rem] font-medium text-zinc-500">42</span>
                                                            </button>
                                                            <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                                                <MessageCircle01 className="w-4 h-4" />
                                                                <span className="text-[0.7rem] font-medium">18K</span>
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button type="button" className="p-2 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                                <Share04 className="w-4 h-4" />
                                                            </button>
                                                            <button type="button" className="p-2 rounded-full transition-colors text-blue-500 bg-blue-50 dark:bg-blue-500/10">
                                                                <Bookmark className="w-4 h-4 fill-current" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                    {/* Post 3: Alex Rodriguez - Image Post with Reactions */}
                                <div style={{ opacity: 1, transform: "none" }}>
                                    <a href="/site/post-view" className="w-full max-w-2xl max-md:max-w-none mx-auto cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow h-fit block">
                                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                            <div className="p-6 max-lg:p-5 max-md:p-4">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-start gap-3">
                                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Alex Rodriguez" className="w-12 h-12 max-md:w-10 max-md:h-10 rounded-full ring-2 ring-white dark:ring-zinc-800" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <h3 className="text-base max-md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">Alex Rodriguez</h3>
                                                                <div className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-normal">
                                                                    <span className="mr-0.5">🎧</span>Expert
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">4h ago<span> • posted on general</span></p>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                        <DotsHorizontal className="w-5 h-5 text-zinc-400" />
                                                    </button>
                                                </div>
                                                
                                                <p className="text-zinc-600 dark:text-zinc-300 mb-4">PSA: Remember to take listening breaks every hour! Your ears will thank you later. I've been using the 60/60 rule - 60% volume for max 60 minutes, then a 10-minute break. Game changer for long mixing sessions! 🎧</p>
                                                
                                                {/* Image Grid */}
                                                <div className="space-y-4 max-md:space-y-3">
                                                    <div className="rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800/50">
                                                        <div className="grid grid-cols-3 h-64 gap-px bg-zinc-200 dark:bg-zinc-700">
                                                            <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop" alt="Professional studio headphones on mixing desk" className="w-full h-full object-cover col-span-2" />
                                                            <div className="grid grid-rows-2 gap-px">
                                                                <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop" alt="Audio mixing console with sliders" className="w-full h-full object-cover" />
                                                                <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop" alt="Studio monitor speakers setup" className="w-full h-full object-cover" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Post Actions with Emoji Reactions */}
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center gap-1">
                                                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 border border-zinc-100 dark:border-zinc-700 text-sm rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                                                    <span className="text-base">🙏</span>
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">119K</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 border border-zinc-100 dark:border-zinc-700 text-sm rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                                                    <span className="text-base">👏</span>
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">87K</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 border border-zinc-100 dark:border-zinc-700 text-sm rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                                                    <span className="text-base">🔥</span>
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">87K</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-1.5 py-1.5 text-sm rounded-full transition-colors text-zinc-400 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-zinc-100 dark:border-zinc-700">
                                                                    <FaceSmile className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                            <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                                                <MessageCircle01 className="w-4 h-4" />
                                                                <span className="text-[0.7rem] font-medium">23K</span>
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button type="button" className="p-2 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                                <Share04 className="w-4 h-4" />
                                                            </button>
                                                            <button type="button" className="p-2 rounded-full transition-colors text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                <Bookmark className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>


                                    {/* Post 4: Emma Wilson - Video Post */}
                                <div style={{ opacity: 1, transform: "none" }}>
                                    <a href="/site/post-view" className="w-full max-w-2xl max-md:max-w-none mx-auto cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow h-fit block">
                                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                            <div className="p-6 max-lg:p-5 max-md:p-4">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-start gap-3">
                                                        <img src="https://images.unsplash.com/photo-1494790108755-2616b612b7cf?w=150&h=150&fit=crop&crop=face" alt="Emma Wilson" className="w-12 h-12 max-md:w-10 max-md:h-10 rounded-full ring-2 ring-white dark:ring-zinc-800" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <h3 className="text-base max-md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">Emma Wilson</h3>
                                                                <div className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-normal">
                                                                    <span className="mr-0.5">🎹</span>Producer
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">1d ago<span> • posted on discussion</span></p>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                        <DotsHorizontal className="w-5 h-5 text-zinc-400" />
                                                    </button>
                                                </div>
                                                
                                                <p className="text-zinc-600 dark:text-zinc-300 mb-4">Just finished mastering my latest track! The process took 3 weeks but I'm so happy with how it turned out. Sometimes patience really pays off in music production.</p>
                                                
                                                {/* Video Card */}
                                                <div className="space-y-4 max-md:space-y-3">
                                                    <div className="space-y-3">
                                                        <div className="aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900">
                                                                <div className="text-center">
                                                                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                        <VideoRecorder className="w-8 h-8 text-white" />
                                                                    </div>
                                                                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Music Production: The Art of Mastering</p>
                                                                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Click to play video</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-1">
                                                            <h5 className="text-base font-medium text-zinc-900 dark:text-zinc-100 mb-1">Music Production: The Art of Mastering</h5>
                                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">A deep dive into the mastering process that brings your tracks to life. Learn the techniques and patience required for professional results.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Post Actions with Emoji Reactions */}
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center gap-1">
                                                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 border border-zinc-100 dark:border-zinc-700 text-sm rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                                                    <span className="text-base">🙏</span>
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">91K</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 border border-zinc-100 dark:border-zinc-700 text-sm rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                                                    <span className="text-base">👏</span>
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">45K</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 border border-zinc-100 dark:border-zinc-700 text-sm rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                                                    <span className="text-base">🔥</span>
                                                                    <span className="text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">67K</span>
                                                                </button>
                                                                <button type="button" className="flex items-center gap-1 px-1.5 py-1.5 text-sm rounded-full transition-colors text-zinc-400 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-zinc-100 dark:border-zinc-700">
                                                                    <FaceSmile className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                            <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                                                <MessageCircle01 className="w-4 h-4" />
                                                                <span className="text-[0.7rem] font-medium">25K</span>
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button type="button" className="p-2 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                                <Share04 className="w-4 h-4" />
                                                            </button>
                                                            <button type="button" className="p-2 rounded-full transition-colors text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                <Bookmark className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                    {/* Post 5: Simple Text Post */}
                                <div style={{ opacity: 1, transform: "none" }}>
                                    <a href="/site/post-view" className="w-full max-w-2xl max-md:max-w-none mx-auto cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow h-fit block">
                                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                            <div className="p-6 max-lg:p-5 max-md:p-4">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-start gap-3">
                                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Michael Johnson" className="w-12 h-12 max-md:w-10 max-md:h-10 rounded-full ring-2 ring-white dark:ring-zinc-800" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <h3 className="text-base max-md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">Michael Johnson</h3>
                                                                <div className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-normal">
                                                                    <span className="mr-0.5">🎤</span>Vocalist
                                                                </div>
                                                                <span className="text-base">🥈</span>
                                                            </div>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">1d ago<span> • posted on tips</span></p>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                        <DotsHorizontal className="w-5 h-5 text-zinc-400" />
                                                    </button>
                                                </div>
                                                
                                                <p className="text-zinc-600 dark:text-zinc-300 mb-4">Quick tip for all my fellow musicians: Always warm up your voice before recording sessions! Even just 5-10 minutes of vocal exercises can make a huge difference in your performance quality. Your vocal cords are muscles too! 🎵</p>
                                                
                                                {/* Post Actions */}
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-all text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                <Heart className="w-4 h-4 text-zinc-500" />
                                                                <span className="text-[0.7rem] font-medium text-zinc-500">156</span>
                                                            </button>
                                                            <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                                                <MessageCircle01 className="w-4 h-4" />
                                                                <span className="text-[0.7rem] font-medium">28</span>
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button type="button" className="p-2 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                                                <Share04 className="w-4 h-4" />
                                                            </button>
                                                            <button type="button" className="p-2 rounded-full transition-colors text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                <Bookmark className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            </div>

                            {/* Mobile: Sidebar Content */}
                            <div className="md:hidden space-y-6 mt-6">
                                <RightSidebarContent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}; 