import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";
import { AlertCircle, LinkExternal01 } from "@untitledui/icons";

export const AdminSEOSettingsPage = () => {
    const location = useLocation();
    
    const [seoSettings, setSeoSettings] = useState({
        title: "Bettermode Hub - Join thousands of community builders",
        description: "Bettermode's hub is where community builders learn about community building and our platform, connect with community pros, and get access to events, resources, and more.",
        ogImage: "https://tribe-s3-production.imgix.net/ZxIn93d0MzXeaEp9a5hb8?fit=max&w=1000&auto=compress,format",
        hideFromSearch: false,
    });

    const handleInputChange = (name: string, value: string) => {
        setSeoSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (checked: boolean) => {
        setSeoSettings(prev => ({ ...prev, hideFromSearch: checked }));
    };

    const handleClearImage = () => {
        setSeoSettings(prev => ({ ...prev, ogImage: "" }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Update SEO settings:", seoSettings);
    };

    return (
        <Admin4Layout 
            title="SEO Settings"
            description="Configure search engine optimization settings"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="max-w-3xl space-y-5">

                    {/* Search Engine Optimization */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Search engine optimization</h3>
                                <div className="text-tertiary mt-1">
                                    <p>Enhance visibility by customizing SEO settings, including meta titles, descriptions, and Open Graph image for better search and social media presence.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative" onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-5">
                                    
                                    {/* Info Banner */}
                                    <div className="relative flex flex-col sm:flex-row gap-3 p-4 shadow-sm border bg-warning-secondary/50 dark:bg-yellow-900/20 border-warning-tertiary dark:border-yellow-700/50 rounded-lg">
                                        <div className="shrink-0">
                                            <AlertCircle className="w-5 h-5 text-warning-primary dark:text-yellow-500" />
                                        </div>
                                        <div className="min-w-0 grow space-y-1">
                                            <div className="text-sm text-primary">
                                                <div className="flex flex-col gap-2">
                                                    <div>
                                                        The SEO details set here will apply to the{" "}
                                                        <a 
                                                            href="/hub/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-brand-secondary hover:text-brand-secondary-hovered inline-flex items-center gap-1"
                                                        >
                                                            <span>community's homepage</span>
                                                            <LinkExternal01 className="w-3 h-3" />
                                                        </a>
                                                        {" "}and serve as the default SEO settings for all spaces.
                                                    </div>
                                                    <div>
                                                        If a space has custom SEO settings, those will override the defaults for that specific space. The homepage will always use the network's SEO settings, even if a space is set as the homepage.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Meta Title */}
                                    <div className="space-y-1">
                                        <Label htmlFor="title">Meta title</Label>
                                        <div className="space-y-2">
                                            <Input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={seoSettings.title}
                                                onChange={(value) => handleInputChange("title", value)}
                                                placeholder="Customize the meta title for this site. If left blank, the community name will be used by default"
                                            />
                                            <div className="text-sm text-tertiary">
                                                <div className="grid grid-cols-6 text-tertiary">
                                                    <span className="col-span-5">Keep your title concise and under 30 characters for best search engine visibility.</span>
                                                    <span className={`font-bold col-span-1 flex justify-end ${seoSettings.title.length > 60 ? 'text-error-primary' : 'text-warning-primary'}`}>
                                                        Length: {seoSettings.title.length}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Meta Description */}
                                    <div className="space-y-1">
                                        <Label htmlFor="description">Meta description</Label>
                                        <div className="space-y-2">
                                            <TextArea
                                                id="description"
                                                name="description"
                                                value={seoSettings.description}
                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                                placeholder="Add a meta description for your site to improve SEO and search visibility."
                                                rows={4}
                                            />
                                            <div className="text-sm text-tertiary">
                                                <div className="grid grid-cols-6 text-tertiary">
                                                    <span className="col-span-5">Write a description of 155 - 160 characters to give search engines a clear summary of your content.</span>
                                                    <span className={`font-bold col-span-1 flex justify-end ${seoSettings.description.length > 160 ? 'text-error-primary' : 'text-warning-primary'}`}>
                                                        Length: {seoSettings.description.length}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Open Graph Image */}
                                    <div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center justify-between">
                                                <Label>Open Graph Image</Label>
                                                <div className="text-sm font-normal ml-auto">
                                                    <button 
                                                        type="button"
                                                        onClick={handleClearImage}
                                                        className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                    >
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                            <div 
                                                className="text-center border border-secondary relative max-w-full flex h-48 bg-cover sm:rounded-lg cursor-pointer" 
                                                style={{ backgroundImage: seoSettings.ogImage ? `url("${seoSettings.ogImage}")` : 'none' }}
                                            >
                                                <div className="absolute top-0 bottom-0 start-0 end-0 flex justify-center items-center">
                                                    <div>
                                                        <div className="bg-black/70 rounded-lg px-4 py-3">
                                                            <div className="mb-3 text-white flex justify-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                                                    <polyline points="21 15 16 10 5 21"/>
                                                                </svg>
                                                            </div>
                                                            <button 
                                                                type="button"
                                                                className="text-brand-secondary hover:text-brand-secondary-hovered underline"
                                                            >
                                                                Select an image
                                                            </button>
                                                            <div className="text-gray-300 text-sm mt-1">PNG, JPG, and GIF up to 10MB</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-tertiary mt-2">
                                            Choose a banner image for SEO cards and social media previews (1200 x 630 px recommended).
                                        </div>
                                    </div>

                                    {/* Hide from Search Results */}
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <Toggle
                                                label="Hide from search results"
                                                hint="Enable this option to prevent search engines from indexing your site and its pages. Keep in mind, enabling this will also disable the sitemap for your site."
                                                isSelected={seoSettings.hideFromSearch}
                                                onChange={handleToggleChange}
                                                size="sm"
                                                slim
                                            />
                                        </div>
                                    </div>

                                    {/* Sitemap */}
                                    <div className="flex flex-col gap-2">
                                        <Label>Sitemap</Label>
                                        <div className="text-sm text-tertiary space-y-2">
                                            <p>Sitemaps guide search engines to index your site effectively. Your sitemap is auto-generated unless your site is private.</p>
                                            <p>
                                                <a 
                                                    href="/hub/sitemap.xml"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-brand-secondary hover:text-brand-secondary-hovered underline inline-flex gap-1 items-center"
                                                >
                                                    View sitemap.xml
                                                    <LinkExternal01 className="w-4 h-4" />
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" isDisabled={true}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <div>
                                <h3 className="text-primary font-medium text-lg">Preview</h3>
                                <div className="text-tertiary mt-1">
                                    <p>Here is how your community link will look like when shared on social media.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="border border-secondary dark:border-gray-700 rounded-lg bg-primary w-full cursor-default">
                                {/* OG Image Preview */}
                                {seoSettings.ogImage && (
                                    <div 
                                        className="aspect-[1200/630] bg-cover bg-center rounded-t-lg" 
                                        style={{ backgroundImage: `url("${seoSettings.ogImage}")` }}
                                    />
                                )}
                                
                                {/* Content Preview */}
                                <div className="p-4">
                                    <h2 className="text-lg font-bold truncate text-primary">
                                        {seoSettings.title || "Bettermode Hub - Join thousands of community builders"}
                                    </h2>
                                    <p className="text-sm mt-2 line-clamp-2 text-tertiary">
                                        {seoSettings.description || "Bettermode's hub is where community builders learn about community building and our platform, connect with community pros, and get access to events, resources, and more."}
                                    </p>
                                    <span className="text-xs text-tertiary mt-2 block truncate">
                                        bettermode.tribeplatform.com
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};

