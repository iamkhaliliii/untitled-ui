import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Toggle } from "@/components/base/toggle/toggle";
import { Badge } from "@/components/base/badges/badges";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";

export const AdminSearchPage = () => {
    const location = useLocation();
    
    const [searchSettings, setSearchSettings] = useState({
        posts: true,
        spaces: true,
        members: false,
    });

    const [officialSpaces] = useState([
        { id: "1", name: "Getting Started", image: "https://tribe-s3-production.imgix.net/QGpJwXPWLBU8wRP5FvI3K?fit=max&w=200&auto=compress,format" },
        { id: "2", name: "Account & Billing", image: "https://tribe-s3-production.imgix.net/cSqraTD5g52o5KBzV4Xhn?fit=max&w=200&auto=compress,format" },
        { id: "3", name: "Content Management", image: "https://tribe-s3-production.imgix.net/Vuzh2BtenLuhUO5LK8w7F?fit=max&w=200&auto=compress,format" },
        { id: "4", name: "Member Management", image: "https://tribe-s3-production.imgix.net/7OeBEMQdwby78TE7nhxTd?fit=max&w=200&auto=compress,format" },
        { id: "5", name: "Appearance & Design", image: "https://tribe-s3-production.imgix.net/l4bMrEDDJ3truJllbYydq?fit=max&w=200&auto=compress,format" },
        { id: "6", name: "Reports & Analytics", image: "https://tribe-s3-production.imgix.net/aCCH7i6cNguc40WL6GvIP?fit=max&w=200&auto=compress,format" },
        { id: "7", name: "Apps & Integrations", image: "https://tribe-s3-production.imgix.net/4tmlxrMmzej01aV9moYiM?fit=max&w=200&auto=compress,format" },
        { id: "8", name: "API & Webhooks", image: "https://tribe-s3-production.imgix.net/OBcsDLGh5UVPFryKjycgV?fit=max&w=200&auto=compress,format" },
    ]);

    const handleToggleChange = (name: string, checked: boolean) => {
        setSearchSettings(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Update search settings:", searchSettings);
    };

    return (
        <Admin4Layout 
            title="Search"
            description="Configure search settings and sources"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="flex flex-col space-y-5 max-w-3xl">

                    {/* Search Sources */}
                    <form className="relative" onSubmit={handleSubmit}>
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                <div>
                                    <h3 className="text-primary font-medium text-lg">Search Sources</h3>
                                    <div className="text-tertiary mt-1">
                                        <p>
                                            <span>Admins have access to all sources. Select which content types should be available in search results for members.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Toggle
                                            label="Posts"
                                            isSelected={searchSettings.posts}
                                            onChange={(checked) => handleToggleChange("posts", checked)}
                                            size="sm"
                                            slim
                                            isDisabled={true}
                                        />
                                    </div>
                                    <div>
                                        <Toggle
                                            label="Spaces"
                                            isSelected={searchSettings.spaces}
                                            onChange={(checked) => handleToggleChange("spaces", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div>
                                        <Toggle
                                            label="Members"
                                            isSelected={searchSettings.members}
                                            onChange={(checked) => handleToggleChange("members", checked)}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-5 sm:p-6 sm:flex sm:flex-row-reverse pt-0 sm:pt-0">
                                <Button type="submit" size="sm" isDisabled={true}>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Official Resource Spaces */}
                    <form className="relative" onSubmit={handleSubmit}>
                        <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                            <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                <div>
                                    <h3 className="text-primary font-medium text-lg">Official Resource Spaces</h3>
                                    <div className="text-tertiary mt-1">
                                        <p>Select the spaces that contain official knowledge or verified content in your community.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-4 py-5 sm:p-6">
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <div className="mt-1 space-y-2">
                                            <div className="relative">
                                                <div className="flex flex-wrap gap-2 p-3 border border-secondary rounded-lg bg-primary">
                                                    {officialSpaces.map((space) => (
                                                        <Badge
                                                            key={space.id}
                                                            size="md"
                                                            color="gray"
                                                            className="flex items-center gap-2 px-2 py-1"
                                                        >
                                                            <img 
                                                                src={space.image} 
                                                                alt={space.name}
                                                                className="w-5 h-5 rounded object-cover"
                                                            />
                                                            <span className="text-sm">{space.name}</span>
                                                            <button 
                                                                className="ml-1 hover:text-error transition-colors"
                                                                aria-label={`Remove ${space.name}`}
                                                                type="button"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-sm text-tertiary">
                                                These spaces will be grouped separately from other posts in search results and prioritized when generating answers with the Ask AI feature (if enabled).
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-5 sm:p-6 sm:flex sm:flex-row-reverse pt-0 sm:pt-0">
                                <Button type="submit" size="sm" isDisabled={true}>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Ask AI Access */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">
                                    <div className="flex items-center gap-1">
                                        Ask AI access
                                        <Badge size="sm" color="success" className="ml-1">
                                            New
                                        </Badge>
                                    </div>
                                </h3>
                                <div className="text-tertiary mt-1">
                                    <p>
                                        Give members access to <span className="font-semibold">Ask AI</span> for smarter and more relevant search results. You can manage Ask AI access for your community by installing the add-on.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="flex flex-col gap-3">
                                <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-secondary/20 shadow-sm sm:rounded-xl">
                                    <div className="flex-1 px-4 py-5 sm:p-6">
                                        <div className="flex items-center gap-3 justify-between">
                                            <div className="relative shrink-0 rounded-lg h-16 w-16">
                                                <img 
                                                    className="shrink-0 rounded-lg h-16 w-16 object-cover object-center" 
                                                    src="https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfZXFqeFRYZkRRQzBGY1I0ZVFOTlJuc2xC00Um5YxDFm"
                                                    alt="Ask AI"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 flex-grow">
                                                <h3 className="text-lg font-medium text-primary">Ask AI</h3>
                                                <p className="text-tertiary text-sm"></p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button 
                                                    size="sm" 
                                                    color="primary"
                                                    href="/hub/manage/app-store/addons/prod_RnwrOIk4U81kO0"
                                                >
                                                    Settings
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Federated Search */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Federated Search</h3>
                                <div className="text-tertiary mt-1">
                                    <p>
                                        <span>
                                            Enhance community search by integrating both community content and external data sources.{" "}
                                            <a 
                                                href="https://developers.bettermode.com/docs/guide/apps/federated-search"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                            >
                                                Federated search
                                            </a>
                                            {" "}allows members to find relevant information across platforms by connecting a federated search URL in the developer portal whenever needed.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="flex justify-end">
                                <Button 
                                    size="sm" 
                                    color="secondary"
                                    href="https://developers.bettermode.com/docs/guide/apps/federated-search"
                                >
                                    Find out how
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};

