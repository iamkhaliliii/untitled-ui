import { useState, useRef } from "react";
import { Rocket01, X, MessageChatCircle, Database01, Users01, CodeBrowser, Settings01, Palette, BarChartSquare02, Data, Plus, ArrowRight } from "@untitledui/icons";
import { ProgressWidget } from "./progress-widget";

export const FloatingProgressButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    const closePopover = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Buttons Container */}
            <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">
                {/* Progress Button - Left */}
                <button
                    ref={buttonRef}
                    onClick={togglePopover}
                    className="bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-3 group min-w-[160px]"
                    aria-label="View Progress"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Rocket01 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                            {/* Progress indicator */}
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-medium text-white">Your Journey</div>
                            <div className="text-xs text-gray-300">30% complete</div>
                        </div>
                    </div>
                </button>

                {/* Chat Button - Right */}
                <button
                    className="w-14 h-14 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                    aria-label="Chat Support"
                >
                    <MessageChatCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </button>
            </div>

            {/* Popover */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={closePopover}
                    />
                    
                    {/* Popover Content */}
                    <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-2 duration-200 max-w-sm">
                        <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                                <h3 className="text-sm font-semibold text-white">Setup Progress</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => window.location.href = '/admin2/onboarding'}
                                        className="text-xs text-violet-400 hover:text-violet-300 underline transition-colors font-medium"
                                    >
                                        Onboarding Hub
                                    </button>
                                    <button
                                        onClick={closePopover}
                                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Progress Widget */}
                            <div className="p-4">
                                <ProgressWidget />
                            </div>
                            
                            {/* Setup Steps */}
                            <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                                <div className="text-xs text-gray-400 mb-3">Setup tasks:</div>
                                <div className="max-h-64 overflow-y-auto scrollbar-thin space-y-2">
                                    {/* Recommended Next Step */}
                                    <button className="w-full text-left p-3 bg-violet-500/20 border border-violet-500/30 hover:bg-violet-500/30 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Database01 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-medium text-white">Create Spaces</span>
                                                    <div className="text-xs bg-violet-500/30 text-violet-300 px-1.5 py-0.5 rounded">Next</div>
                                                </div>
                                                <div className="text-xs text-gray-400">Organize your content structure</div>
                                            </div>
                                            <ArrowRight className="w-3 h-3 text-violet-400" />
                                        </div>
                                    </button>

                                    {/* Other Setup Tasks */}
                                    <button className="w-full text-left p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Users01 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-white">Invite teammates</span>
                                                <div className="text-xs text-gray-400 mt-1">Add your team members</div>
                                            </div>
                                            <ArrowRight className="w-3 h-3 text-gray-500" />
                                        </div>
                                    </button>

                                    <button className="w-full text-left p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Palette className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-white">Branding & Theme</span>
                                                <div className="text-xs text-gray-400 mt-1">Upload logo and set colors</div>
                                            </div>
                                            <ArrowRight className="w-3 h-3 text-gray-500" />
                                        </div>
                                    </button>

                                    <button className="w-full text-left p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <BarChartSquare02 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-white">Navigation Setup</span>
                                                <div className="text-xs text-gray-400 mt-1">Configure menus and structure</div>
                                            </div>
                                            <ArrowRight className="w-3 h-3 text-gray-500" />
                                        </div>
                                    </button>

                                    <button className="w-full text-left p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Data className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-white">Integrations</span>
                                                <div className="text-xs text-gray-400 mt-1">Connect external tools</div>
                                            </div>
                                            <ArrowRight className="w-3 h-3 text-gray-500" />
                                        </div>
                                    </button>

                                    <button className="w-full text-left p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Settings01 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-white">Analytics Setup</span>
                                                <div className="text-xs text-gray-400 mt-1">Track community engagement</div>
                                            </div>
                                            <ArrowRight className="w-3 h-3 text-gray-500" />
                                        </div>
                                    </button>

                                    {/* Completed Tasks */}
                                    <div className="pt-3 mt-3 border-t border-gray-700">
                                        <div className="text-xs text-gray-500 mb-2">Completed:</div>
                                        
                                        <div className="p-2 bg-gray-800/50 rounded-lg opacity-60">
                                            <div className="flex items-center gap-3">
                                                <Settings01 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <span className="text-sm font-medium text-white line-through">Site permissions & privacy</span>
                                                </div>
                                                <div className="w-3 h-3 bg-violet-500 rounded-full flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
