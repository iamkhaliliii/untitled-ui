import { CheckCircle, Settings01, Rocket01, CheckDone01 } from "@untitledui/icons";

export const ProgressWidget = () => {
    return (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 w-full">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-medium text-white">Your Journey</h4>
                <span className="text-xs text-gray-400">3 more steps to complete setup</span>
            </div>
            
            <div className="relative mb-6">
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-violet-500 h-1.5 rounded-full" style={{width: '30%'}}></div>
                </div>
                
                <div className="absolute -top-1.5 left-0 right-0 flex justify-between">
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-violet-500 rounded-full"></div>
                        <span className="text-xs text-violet-300 font-medium mt-2">Initial</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-violet-500 rounded-full"></div>
                        <span className="text-xs text-violet-300 font-medium mt-2">Onboarded</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-violet-400 rounded-full"></div>
                        <span className="text-xs text-violet-300 font-medium mt-2">Setup</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                        <span className="text-xs text-gray-400 mt-2">Launch</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                        <span className="text-xs text-gray-400 mt-2">Growth</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
