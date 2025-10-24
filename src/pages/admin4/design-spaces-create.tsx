import { useState, useEffect } from "react";
import {
    Globe01,
    Users01,
    FolderCode,
    Image01,
    Star01,
    ArrowLeft,
    Calendar,
    File01,
    File05,
    ChevronRight,
    SearchLg,
    X,
    InfoCircle,
    Loading01,
} from "@untitledui/icons";
import { DesignLayout } from "@/components/layouts/design-layout";
import { useLocation, useNavigate } from "react-router";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
import { MobileBrowserMockup } from "@/components/application/browser-mockup/mobile-browser-mockup";
import { NavItemBase } from "@/components/application/app-navigation/base-components/nav-item";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";
import { Select } from "@/components/base/select/select";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";

export const DesignSpacesCreatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // State for mobile mockup visibility
    const [showMobileMockup, setShowMobileMockup] = useState(false);
    
    const [formData, setFormData] = useState({
        communityName: "ACME Community",
        termsOfService: "",
        privacyPolicy: "",
        fileSizeLimit: "10",
        affiliateLink: "",
    });

    const [toggles, setToggles] = useState({
        isPublished: true,
        privateCommunity: false,
        inviteOnly: false,
        anyoneCanInvite: false,
        displayBadge: true,
        earnWithReferrals: false,
        keyboardShortcuts: true,
    });

    const [selectedSpaces] = useState([
        { id: "1", name: "Knowledge Base", image: "https://via.placeholder.com/24" },
        { id: "2", name: "Product Updates", image: "https://via.placeholder.com/24" },
        { id: "3", name: "Getting Started", image: "https://via.placeholder.com/24" },
        { id: "4", name: "Intros & Networking", image: "https://via.placeholder.com/24" },
        { id: "5", name: "Events", image: "https://via.placeholder.com/24" },
        { id: "6", name: "Ask the Community", image: "https://via.placeholder.com/24" },
    ]);

    const [selectedFileTypes] = useState([
        "image/*", "audio/*", "video/*", ".pdf", "application/json"
    ]);

    const handleInputChange = (name: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (name: string, checked: boolean) => {
        setToggles(prev => ({ ...prev, [name]: checked }));
    };
    
    // Get current admin version
    const getCurrentAdminVersion = () => {
        const path = location.pathname;
        if (path.includes('/admin4')) return 'admin4';
        return 'admin4';
    };
    
    const currentAdminVersion = getCurrentAdminVersion();
    
    // State for selected space type
    const [selectedSpaceType, setSelectedSpaceType] = useState<string | null>(null);
    
    // State for hover preview
    const [hoveredSpaceType, setHoveredSpaceType] = useState<string | null>(null);
    
    // State for loading
    const [isCreatingSpace, setIsCreatingSpace] = useState<boolean>(false);
    
    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // State for form data
    const [spaceName, setSpaceName] = useState("");
    const [spaceDescription, setSpaceDescription] = useState("");
    const [makePrivate, setMakePrivate] = useState(true); // Default to ON
    const [hideSpace, setHideSpace] = useState(true); // Default to ON
    const [selectedCollection, setSelectedCollection] = useState("");
    
    // Space types list
    const spaceTypes = [
        { id: "explore", label: "Explore", icon: Globe01 },
        { id: "guidelines", label: "Guidelines", icon: File01 },
        { id: "discussions", label: "Discussions", icon: Users01 },
        { id: "questions", label: "Questions", icon: Users01 },
        { id: "articles", label: "Articles", icon: File01 },
        { id: "events", label: "Events", icon: Calendar },
        { id: "changelogs", label: "Changelogs", icon: File01 },
        { id: "jobs", label: "Jobs", icon: FolderCode },
        { id: "wishlist", label: "Wishlist", icon: Star01 },
        { id: "podcast", label: "Podcast", icon: Image01 },
        { id: "blank", label: "Blank", icon: File05 },
    ];
    
    // Handle space type selection
    const handleSpaceTypeSelect = async (typeId: string) => {
        setSelectedSpaceType(typeId);
        setIsCreatingSpace(true);
        
        // Simulate a short delay for loading effect
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Navigate to customize page for the selected space type
        navigate(`/${currentAdminVersion}/design/spaces/${typeId}/customize`, {
            state: {
                from: 'space-creation',
                spaceType: typeId
            }
        });
    };
    
    // Handle use template button click
    const handleUseTemplate = () => {
        setIsModalOpen(true);
    };
    
    // Handle create space
    const handleCreateSpace = () => {
        console.log("Creating space with:", {
            spaceName,
            spaceDescription,
            makePrivate,
            hideSpace,
            selectedCollection,
            spaceType: selectedSpaceType
        });
        setIsModalOpen(false);
        // Redirect to the new space customize page
        navigate(`/${currentAdminVersion}/design/spaces/growth/events/customize`);
    };
    
    // Keyboard shortcut to toggle mobile mockup (M key)
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Check if 'M' or 'm' is pressed (not in an input field)
            if ((event.key === 'M' || event.key === 'm') && 
                event.target instanceof HTMLElement && 
                !['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
                setShowMobileMockup(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);
    
    // Render sidebar content
    const renderSidebarContent = () => {
        return (
            <>
                {/* Header Section */}
                <div className="px-4 lg:px-5">
                    {/* Back Button */}
                    <div className="mb-2">
                        <button
                            onClick={() => navigate(`/${currentAdminVersion}/design/page-customizer`)}
                            className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                        >
                            <ArrowLeft className="size-4 text-fg-quaternary" />
                        </button>
                    </div>
                    
                    {/* Title */}
                    <div className="mb-3">
                        <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">
                            Choose a space type
                        </h3>
                        <p className="text-sm text-tertiary mt-1">
                            Select the type of space you want to create
                        </p>
                    </div>
                </div>

                {/* Search Input */}
                <div className="mt-2 px-4 mb-4">
                    <Input 
                        size="sm" 
                        aria-label="Search space types" 
                        placeholder="Search space types" 
                        icon={SearchLg} 
                    />
                </div>

                {/* Space Types List */}
                <div className="mt-2 flex flex-col px-4">
                    <div className="flex flex-col gap-1">
                        {spaceTypes.map((type) => (
                            <div 
                                key={type.id}
                                onMouseEnter={() => !isCreatingSpace ? setHoveredSpaceType(type.label) : null}
                                onMouseLeave={() => setHoveredSpaceType(null)}
                            >
                                <NavItemBase 
                                    type="link" 
                                    href="#"
                                    icon={type.icon}
                                    current={selectedSpaceType === type.id}
                                    badge={
                                        isCreatingSpace && selectedSpaceType === type.id ? (
                                            <Loading01 size={16} className="text-brand-solid animate-spin" />
                                        ) : (
                                            <ChevronRight size={16} className="text-fg-quaternary" />
                                        )
                                    }
                                    onClick={(e: React.MouseEvent) => {
                                        if (!isCreatingSpace) {
                                            e.preventDefault();
                                            handleSpaceTypeSelect(type.id);
                                        }
                                    }}
                                >
                                    {type.label}
                                </NavItemBase>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Loading Message */}
                {isCreatingSpace && (
                    <div className="mt-4 px-4">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-brand-solid/10 border border-brand-solid/20">
                            <Loading01 size={16} className="text-brand-solid animate-spin flex-shrink-0" />
                            <p className="text-sm text-secondary">
                                Creating your space template...
                            </p>
                        </div>
                    </div>
                )}
            </>
        );
    };
    
    const sidebarContent = (
        <aside className="flex h-full max-w-full flex-col overflow-auto scrollbar-thin bg-primary pt-4 lg:pt-6">
            {renderSidebarContent()}
        </aside>
    );

    return (
        <DesignLayout 
            title=""
            description=""
            sidebarContent={sidebarContent}
        >
            <div className="p-4 relative">
                {/* Browser Mockup */}
                <div className={showMobileMockup ? "max-w-4xl" : "mx-auto"}>
                    <BrowserMockup previewType={hoveredSpaceType || undefined} />
                </div>
                
                {/* Mobile Browser Mockup - Toggle with 'M' key */}
                {showMobileMockup && (
                    <MobileBrowserMockup previewType={hoveredSpaceType || undefined} />
                )}
            </div>
            
            {/* Create Space Modal */}
            {isModalOpen && (
                <ModalOverlay isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                    <Modal>
                        <Dialog>
                            <div className="w-full max-w-xl bg-primary rounded-xl shadow-xl">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-secondary">
                                    <h2 className="text-lg font-semibold text-primary">Create New Space</h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-1 rounded-md hover:bg-secondary transition-colors"
                                    >
                                        <X className="size-5 text-tertiary" />
                                    </button>
                                </div>
                                
                                {/* Modal Body */}
                                <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                                    {/* Space Name */}
                                    <div>
                                        <Input
                                            label="Space name"
                                            placeholder="Enter space name"
                                            value={spaceName}
                                            onChange={(value) => setSpaceName(value)}
                                        />
                                    </div>
                                    
                                    {/* Description */}
                                    <div>
                                        <TextArea
                                            label="Description"
                                            placeholder="Describe your space..."
                                            rows={3}
                                            value={spaceDescription}
                                            onChange={(e) => setSpaceDescription(e.target.value)}
                                        />
                                    </div>
                                    
                                    {/* Make Private Toggle */}
                                    <div>
                                        <Toggle
                                            label="Make private"
                                            hint="Only members can see who's in the space and what they post."
                                            size="sm"
                                            slim
                                            isSelected={makePrivate}
                                            onChange={setMakePrivate}
                                        />
                                    </div>
                                    
                                    {/* Hide Space Toggle */}
                                    <div>
                                        <Toggle
                                            label="Hide space"
                                            hint="Hide this space from non-space members."
                                            size="sm"
                                            slim
                                            isSelected={hideSpace}
                                            onChange={setHideSpace}
                                        />
                                        
                                        {/* Info Alert */}
                                        <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30">
                                            <InfoCircle className="size-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                                                It's recommended to start your space as a hidden one and unhide it when it's ready.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Collection Select */}
                                    <div>
                                        <Select
                                            label="Collection"
                                            placeholder="Select a collection"
                                        >
                                            <option value="">None</option>
                                            <option value="growth">Growth</option>
                                            <option value="myfolder">MyFolder</option>
                                            <option value="myfolder3">MyFolder3</option>
                                        </Select>
                                    </div>
                                </div>
                                
                                {/* Modal Footer */}
                                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-secondary">
                                    <Button size="sm" color="secondary" onClick={() => setIsModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button size="sm" color="primary" onClick={handleCreateSpace}>
                                        Create Space
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            )}
        </DesignLayout>
    );
};

