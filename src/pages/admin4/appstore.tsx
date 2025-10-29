import React from "react";
import { useLocation } from "react-router";
import { Plus, CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { cx } from "@/utils/cx";

interface AppIntegration {
    id: number;
    name: string;
    description: string;
    logo: string | null;
    initials?: string;
    installed: boolean;
}

interface Addon {
    id: number;
    name: string;
    description: string;
    logo: string | null;
    initials?: string;
    price?: string;
    installed: boolean;
}

// Sample apps & integrations data matching Bettermode
const appsIntegrations: AppIntegration[] = [
    {
        id: 1,
        name: "Google Tag Manager Integration",
        description: "Streamline and manage your website's scripts and tracking pixels easily, without editing code.",
        logo: "/logos/s/google-tag-manager logo.svg",
        installed: false,
    },
    {
        id: 2,
        name: "Cookie Consent Manager Integration",
        description: "Ensure user privacy with a simple tool to manage cookie consent and compliance.",
        logo: "/logos/s/cookie-svgrepo-com.svg",
        installed: true,
    },
    {
        id: 3,
        name: "Zapier Integration",
        description: "Connect your apps and automate workflows with ease, enhancing productivity across your toolset.",
        logo: "/logos/s/zapier.svg",
        installed: true,
    },
    {
        id: 4,
        name: "Google Analytics Integration",
        description: "Gain insights into your web traffic and measure your advertising ROI as well as track your Flash, video, and social networking sites and applications.",
        logo: "/logos/s/google-analytics-3.svg",
        installed: false,
    },
    {
        id: 5,
        name: "Hubspot Integration",
        description: "Sync customer data, track interactions, and nurture leads with integrated marketing and sales automation.",
        logo: "/logos/hubspot.svg",
        installed: false,
    },
    {
        id: 6,
        name: "Mixpanel Integration",
        description: "Analyze user behavior with in-depth data analytics to make informed decisions and improve engagement.",
        logo: "/logos/s/Mixpanel_Symbol_0.svg",
        installed: false,
    },
    {
        id: 7,
        name: "Salesforce Integration",
        description: "Integrate for a comprehensive view of your customers and manage relationships directly within Salesforce.",
        logo: "/logos/s/salesforce.svg",
        installed: true,
    },
    {
        id: 8,
        name: "Slack Integration",
        description: "Streamline communication by receiving notifications and messages directly within Slack.",
        logo: "/logos/s/slack-new-logo.svg",
        installed: false,
    },
    {
        id: 9,
        name: "Intercom Integration",
        description: "Engage and support your users with live chat, and use data to drive conversations that convert.",
        logo: "/logos/intercom-1.svg",
        installed: true,
    },
    {
        id: 10,
        name: "Mailchimp Integration",
        description: "Elevate your email marketing by syncing contact lists and targeting communications with Mailchimp.",
        logo: "/logos/s/mailchimp logo.svg",
        installed: false,
    },
    {
        id: 11,
        name: "Zendesk Integration",
        description: "Provide superior customer service by integrating your community with Zendesk's knowledge base and support tickets.",
        logo: "/logos/s/zendesk-3.svg",
        installed: false,
    },
    {
        id: 12,
        name: "Fullstory Integration",
        description: "Understand customer interactions with session replay, helping you optimize the user experience.",
        logo: "/logos/s/fullstory-logo.svg",
        installed: false,
    },
    {
        id: 13,
        name: "Hotjar Integration",
        description: "Get a visual understanding of user behavior with heatmaps, session recordings, and surveys.",
        logo: "/logos/s/hotjar-icon logo.svg",
        installed: false,
    },
    {
        id: 14,
        name: "Amplitude Integration",
        description: "Use detailed analytics to track user engagement and refine your product strategy.",
        logo: "/logos/s/amplitude-icon logo.svg",
        installed: false,
    },
    {
        id: 15,
        name: "Discord Integration",
        description: "Communicate in real-time and manage your community directly from Discord.",
        logo: "/logos/s/discord.svg",
        installed: false,
    },
    {
        id: 16,
        name: "Custom Code Snippet Integration",
        description: "Add custom scripts and features to your platform easily, enhancing functionality with your code.",
        logo: "/logos/s/Custom-Code-Snippet.svg",
        installed: false,
    },
    {
        id: 17,
        name: "Make.com Integration",
        description: "Make.com lets you connect Bettermode with thousands of apps to automate processes, boost efficiency, and save time—all without coding.",
        logo: "/logos/s/make.svg",
        installed: true,
    },
    {
        id: 18,
        name: "SEO Tools",
        description: "Analyze the posts in your community and improve your SEO",
        logo: null,
        initials: "ST",
        installed: false,
    },
    {
        id: 19,
        name: "Better Assistant",
        description: "Your community on autopilot!",
        logo: "https://global-production-us-east-1.imgix.net/5Qs4TV5Jo0rjqlGSvLSHS?fit=max&w=1000&auto=compress,format",
        installed: true,
    },
    {
        id: 20,
        name: "Sorena",
        description: "Sorena AI",
        logo: null,
        initials: "S",
        installed: true,
    },
    {
        id: 21,
        name: "deadpixel.ai",
        description: "deadpixel.ai",
        logo: null,
        initials: "d",
        installed: true,
    }
];

// Addons data
const addons: Addon[] = [
    {
        id: 1,
        name: "Ask AI",
        description: "Enhance user engagement with AI-powered answers to community questions, leveraging relevant posts and space data.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfZXFqeFRYZkRRQzBGY1I0ZVFOTlJuc2xC00Um5YxDFm",
        installed: true,
    },
    {
        id: 2,
        name: "Email Digest",
        description: "Engage members with automated weekly or daily email digest.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfMW8xOEpleVYxWDJZOVkwV25ZOGw2aFRF00swBWChcE",
        installed: true,
    },
    {
        id: 3,
        name: "Additional Staff Seats",
        description: "Boost team size with additional admin and moderator seats.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfMXJreGdMcVUzRlV6eTZkY0k4NEIxV0F300ztl8eOI1",
        price: "$120/yr",
        installed: true,
    },
    {
        id: 4,
        name: "Additional Spaces",
        description: "Add 10 spaces and pages to expand site capacity.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfS3gwNkI5dUN5bkVPbGdMR05nQVRuR09M007MyH4XQV",
        price: "$228/yr",
        installed: true,
    },
    {
        id: 5,
        name: "Additional Spaces 100-Pack",
        description: "Boost your site capacity with a 100-space add-on at a bulk rate.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfSzZUU3laR3JSWkFWWHFSa0c3OUM5Q1dH00Tcz4Tn3p",
        price: "$588/yr",
        installed: false,
    },
    {
        id: 6,
        name: "Email Credits",
        description: "Expand your outreach with 10,000 extra email credits monthly.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfNTkxMkJVQW9lZTJIQWMxN0JEM2l5bW1y004WBxUTlh",
        price: "$588/yr",
        installed: true,
    },
    {
        id: 7,
        name: "Email Credits – 100K Pack",
        description: "Expand your outreach with 100,000 extra email credits monthly.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfenpWVUR0UUpuVjRqdmNOcGVmRTZsRFNT00l5EPw36t",
        price: "$3,588/yr",
        installed: false,
    },
    {
        id: 8,
        name: "Translation Locale",
        description: "Enhance global reach with new language add-on.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfTmxFS01JQUlsSk94Z05yTzVOWXgzNUxn00yYiPXx7U",
        price: "$588/yr",
        installed: true,
    },
    {
        id: 9,
        name: "API / Webhook",
        description: "Integrate, automate, and customize with API and Webhook.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfaTBnTVJSS2tPRlNRb09WNXJqSm1NeUpq00ijuIboLN",
        price: "$2,388/yr",
        installed: true,
    },
    {
        id: 10,
        name: "Additional Storage",
        description: "Boost site capacity with 1TB extra storage for more content.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfcVViN1Njb3pQRVpUa3lYNjF0TXEwTmw100eeSlSKE1",
        price: "$1,188/yr",
        installed: true,
    },
    {
        id: 11,
        name: "CMS Upgrade",
        description: "Upgrade CMS with 5 additional collections for diverse content.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfek9DeUNpQktjSXFBRlpxT1JPcUY4dldD00PIn9McsE",
        price: "$1,188/yr",
        installed: true,
    },
    {
        id: 12,
        name: "Custom 'From' Email Address",
        description: "Personalize the sender's name and address of outgoing emails.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfWVRTRU01NFd3YTlmWUpLR0g0ZDJ1a0lk008zuYhn9B",
        price: "$588/yr",
        installed: true,
    },
    {
        id: 13,
        name: "OAuth 2.0 Single Sign-on",
        description: "Let users register or login to your site using their existing credentials.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfSTg2UGdveFA4aG9LUlp2U091bUpRZGxi00bXq7xHFK",
        price: "$2,388/yr",
        installed: true,
    },
    {
        id: 14,
        name: "JWT Single Sign-on",
        description: "Seamless, one-click signup and login using JWT SSO.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfalg4SGVxVElwcm42ZDU3aVNnUDBtM0hC00LmHoVA8H",
        installed: true,
    },
    {
        id: 15,
        name: "SAML Single Sign-on",
        description: "Streamline your team's access with SAML SSO.",
        logo: "https://files.stripe.com/links/MDB8YWNjdF8xREpNYllEN0NaNHlJTXBUfGZsX2xpdmVfZzJ3N0szajloZGZiRkVUdlcyNzVjc1pL00Sy9oyedW",
        installed: false,
    }
];

export const AdminAppStorePage = () => {
    const location = useLocation();
    const isAddonsPage = location.pathname.includes('/addons');
    
    const currentData = isAddonsPage ? addons : appsIntegrations;
    const pageTitle = isAddonsPage ? "Add-ons" : "Apps & Integrations";
    const pageDescription = isAddonsPage 
        ? "Enhance your community with premium add-ons." 
        : "Discover new apps and integrations to customize your community.";

    return (
        <Admin4Layout
            title={pageTitle}
            description={pageDescription}
            currentPath={location.pathname}
            hideHeader={false}
            headerActions={
                !isAddonsPage ? (
                    <Button
                        color="secondary"
                        size="md"
                        iconLeading={Plus}
                        onClick={() => window.open('https://developers.bettermode.com', '_blank')}
                    >
                        Build your own app
                    </Button>
                ) : <></>
            }
        >
            {/* Main Content Container */}
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-3 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5">
                <div className="w-full flex flex-col max-w-full md:max-w-5xl self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5">
                    {/* Apps/Addons Grid */}
                    <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {currentData.map((item) => (
                            <li key={item.id} className="col-span-1">
                                <a
                                    href="#"
                                    className="cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring block h-full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Handle navigation or modal open
                                    }}
                                >
                                    <div className="border border-border-secondary dark:border-gray-700 flex flex-col text-content-subdued dark:text-fg-quaternary transition duration-200 justify-between bg-surface dark:bg-bg-primary shadow-sm hover:shadow-md rounded-xl h-full hover:border-border-brand dark:hover:border-brand-600">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="flex flex-col space-y-5 min-h-[180px]">
                                                {/* Logo and Badge Row */}
                                                <div className="flex justify-between">
                                                    <div className="relative shrink-0 rounded-base h-[2.5rem] w-[2.5rem]">
                                                        {item.logo ? (
                                                            <img
                                                                className="shrink-0 rounded-base h-[2.5rem] w-[2.5rem] object-cover object-center"
                                                                height="40"
                                                                width="40"
                                                                src={item.logo}
                                                                alt={item.name}
                                                                onError={(e) => {
                                                                    // Fallback to initials if image fails
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.style.display = 'none';
                                                                    if (target.nextElementSibling) {
                                                                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                                                                    }
                                                                }}
                                                            />
                                                        ) : null}
                                                        {(item.initials || !item.logo) && (
                                                            <div 
                                                                className={cx(
                                                                    "shrink-0 rounded-avatar h-[2.5rem] w-[2.5rem] flex items-center justify-center",
                                                                    item.initials === "ST" && "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                                                                    item.initials === "S" && "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                                                                    item.initials === "d" && "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                                                                    !item.initials && item.logo && "hidden"
                                                                )}
                                                                style={!item.logo ? { display: 'flex' } : {}}
                                                            >
                                                                <span className="font-medium uppercase text-sm">
                                                                    {item.initials || item.name.substring(0, 2)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap justify-end gap-2">
                                                        {/* Price badge for addons */}
                                                        {isAddonsPage && (item as Addon).price && (
                                                            <div>
                                                                <Badge
                                                                    color="warning"
                                                                    size="md"
                                                                    className="inline-flex items-center gap-1"
                                                                >
                                                                    <span className="font-semibold">{(item as Addon).price}</span>
                                                                </Badge>
                                                            </div>
                                                        )}
                                                        {/* Installed/Added badge */}
                                                        {item.installed && (
                                                            <div>
                                                                <Badge
                                                                    color="success"
                                                                    size="md"
                                                                    className="inline-flex items-center gap-1"
                                                                >
                                                                    <CheckCircle className="size-4" />
                                                                    <span className="font-semibold">
                                                                        {isAddonsPage ? 'Added' : 'Installed'}
                                                                    </span>
                                                                </Badge>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                {/* Title and Description */}
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-medium text-content dark:text-fg-primary mb-1 line-clamp-2">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-content-muted dark:text-fg-quaternary text-sm leading-relaxed line-clamp-3">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Admin4Layout>
    );
};

