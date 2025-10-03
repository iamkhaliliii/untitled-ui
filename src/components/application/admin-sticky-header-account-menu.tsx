import { 
    User01, 
    LogOut01, 
    Plus,
    Building05,
    Eye,
    CheckCircle,
    Monitor02,
    Settings01
} from "@untitledui/icons";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";

export const AdminStickyHeaderAccountMenu = () => {
    return (
        <>
           
            {/* Switch Community Section */}
            <div className="px-3 py-1.5 border-b border-secondary">
                <div className="space-y-2">
                    <div className="">
                    <label className="text-xs font-medium text-tertiary">
                        Switch Community
                    </label>
                    </div>
                    <div className="space-y-0.5">
                        <div className="relative flex items-center gap-1 p-1 rounded-md bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800">             
                            <AvatarLabelGroup
                                size="sm"
                                src="https://www.untitledui.com/images/logos/badge/light-logomark/elasticware.svg"
                                alt="Elasticware"
                                title="Elasticware"
                                subtitle="elasticware.io"
                            />
                            <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-brand-600 dark:text-brand-400" />
                        </div>

                        <div className="flex items-center gap-1 p-1 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors">
                            <AvatarLabelGroup
                                size="sm"
                                src="https://www.untitledui.com/images/logos/badge/light-logomark/flora-fauna.svg"
                                alt="Flora Fauna"
                                title="Flora Fauna"
                                subtitle="flora-fauna.io"
                            />
                        </div>
        
                        <div className="flex items-center gap-2 p-1 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors">
                            <div className="w-8 h-8 bg-gray-50 rounded-full border-1 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                                <Plus className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                            </div>
                            <div className="flex-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-300">Add new community</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <Dropdown.Menu>
                <Dropdown.Section>
                    <Dropdown.Item 
                        icon={Monitor02} 
                        label="View Community"
                        onAction={() => window.open('/site', '_blank')}
                    />
                    <Dropdown.Item 
                        icon={Settings01} 
                        label="Admin Panel"
                        onAction={() => window.location.reload()}
                    />
                </Dropdown.Section>
                <Dropdown.Separator />
                <Dropdown.Section>
                    <Dropdown.Item 
                        addon="⌥⇧Q" 
                        icon={LogOut01}
                        label="Sign out"
                        onAction={() => console.log("Sign out")}
                    />
                </Dropdown.Section>
            </Dropdown.Menu>
        </>
    );
};
