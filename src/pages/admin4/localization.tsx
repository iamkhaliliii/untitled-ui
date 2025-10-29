import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Toggle } from "@/components/base/toggle/toggle";
import { Badge } from "@/components/base/badges/badges";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { useLocation } from "react-router";

export const AdminLocalizationPage = () => {
    const location = useLocation();
    
    const [localizationSettings, setLocalizationSettings] = useState({
        defaultLanguage: "en-us",
        allowPostTranslation: true,
    });

    const availableLanguages = [
        { id: "en-us", flag: "🇺🇸", label: "English (US)" },
        { id: "fr-fr", flag: "🇫🇷", label: "Français (France)" },
        { id: "es-es", flag: "🇪🇸", label: "Español (España)" },
        { id: "de-de", flag: "🇩🇪", label: "Deutsch (Deutschland)" },
        { id: "pt-br", flag: "🇧🇷", label: "Português (Brasil)" },
        { id: "tr-tr", flag: "🇹🇷", label: "Türkçe" },
        { id: "zh-tw", flag: "🇹🇼", label: "繁體中文" },
        { id: "ko-kr", flag: "🇰🇷", label: "한국어" },
        { id: "ja-jp", flag: "🇯🇵", label: "日本語" },
        { id: "hi-in", flag: "🇮🇳", label: "हिंदी" },
        { id: "nl-nl", flag: "🇳🇱", label: "Nederlands" },
        { id: "pl-pl", flag: "🇵🇱", label: "Polski" },
        { id: "ro-ro", flag: "🇷🇴", label: "Română" },
        { id: "it-it", flag: "🇮🇹", label: "Italiano" },
        { id: "da-dk", flag: "🇩🇰", label: "Danish" },
        { id: "fi-fi", flag: "🇫🇮", label: "Finnish" },
        { id: "no-no", flag: "🇳🇴", label: "Norwegian" },
        { id: "sv-se", flag: "🇸🇪", label: "Swedish" },
        { id: "zh-cn", flag: "🇨🇳", label: "简体中文" },
        { id: "fr", flag: "🇫🇷", label: "Français" },
        { id: "es", flag: "🇪🇸", label: "Español" },
        { id: "de", flag: "🇩🇪", label: "Deutsch" },
        { id: "fr-ca", flag: "🇨🇦", label: "Français (Canada)" },
    ];

    const defaultLanguageOptions = [
        { id: "en-us", label: "🇺🇸 English (US)" },
        { id: "fr-fr", label: "🇫🇷 Français (France)" },
        { id: "es-es", label: "🇪🇸 Español (España)" },
        { id: "de-de", label: "🇩🇪 Deutsch (Deutschland)" },
    ];

    const handleToggleChange = (checked: boolean) => {
        setLocalizationSettings(prev => ({ ...prev, allowPostTranslation: checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Update localization settings:", localizationSettings);
    };

    return (
        <Admin4Layout 
            title="Localization"
            description="Configure language and translation settings"
            currentPath={location.pathname}
            hideHeader={true}
        >
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5 min-h-full relative">
                <div className="flex flex-col space-y-5 max-w-3xl">

                    {/* Community Language */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Community language</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <div className="flex flex-col space-y-5">
                                {/* Available Languages */}
                                <div className="space-y-1">
                                    <Label htmlFor="availableLocales">Available languages</Label>
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <div className="flex flex-wrap gap-2 p-3 border border-secondary rounded-lg bg-primary">
                                                {availableLanguages.map((lang) => (
                                                    <Badge
                                                        key={lang.id}
                                                        size="md"
                                                        color="gray"
                                                        className="flex items-center gap-2 px-2 py-1"
                                                    >
                                                        <span className="text-base">{lang.flag}</span>
                                                        <span className="text-sm">{lang.label}</span>
                                                        <button 
                                                            className="ml-1 hover:text-error transition-colors"
                                                            aria-label={`Remove ${lang.label}`}
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
                                            Defines the languages available for members and guests to choose from.
                                        </div>
                                    </div>
                                </div>

                                {/* Default Language */}
                                <div className="space-y-1">
                                    <Label htmlFor="locale">Default language</Label>
                                    <div className="space-y-2">
                                        <Select
                                            items={defaultLanguageOptions}
                                            selectedKey={localizationSettings.defaultLanguage}
                                            onSelectionChange={(key) => setLocalizationSettings(prev => ({ ...prev, defaultLanguage: key as string }))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <div className="text-sm text-tertiary">
                                            Defines the default language for new members and guests.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6 sm:flex sm:flex-row-reverse pt-0 sm:pt-0">
                            <Button type="button" size="sm" onClick={handleSubmit}>
                                Update
                            </Button>
                        </div>
                    </div>

                    {/* Content Translation */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">Content translation</h3>
                        </div>
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <form className="relative" onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Toggle
                                            label="Allow post translation"
                                            hint="Show &quot;See translation&quot; option under posts that are not in member's preferred language."
                                            isSelected={localizationSettings.allowPostTranslation}
                                            onChange={handleToggleChange}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </Admin4Layout>
    );
};

