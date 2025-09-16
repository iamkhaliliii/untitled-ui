import { 
  Code01, 
  CreditCard01, 
  Heart, 
  ShoppingCart01, 
  GraduationHat01, 
  Briefcase01, 
  Building01,
  Lock01,
  Globe01,
  Shield01,
  Target01,
  Database01
} from "@untitledui/icons";
import { CompanySize, Industry, UseCase, SaasTool, EnterpriseFeature, Testimonial } from "./types";

export const COMPANY_SIZES: CompanySize[] = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" }
];

export const INDUSTRIES: Industry[] = [
  { value: "technology", label: "Technology & Software", icon: Code01 },
  { value: "financial", label: "Financial Services", icon: CreditCard01 },
  { value: "healthcare", label: "Healthcare & Life Sciences", icon: Heart },
  { value: "ecommerce", label: "E-commerce & Retail", icon: ShoppingCart01 },
  { value: "education", label: "Education", icon: GraduationHat01 },
  { value: "consulting", label: "Consulting & Services", icon: Briefcase01 },
  { value: "other", label: "Other", icon: Building01 }
];

export const USE_CASES: UseCase[] = [
  { value: "community-building", label: "Community Building", description: "Build customer communities" },
  { value: "customer-support", label: "Customer Support", description: "Better support & docs" },
  { value: "employee-engagement", label: "Employee Engagement", description: "Internal collaboration" },
  { value: "product-feedback", label: "Product Feedback", description: "Collect user feedback" },
  { value: "other", label: "Other", description: "Custom use case for your needs" }
];

export const SAAS_TOOLS: SaasTool[] = [
  { id: "google-analytics", name: "Google Analytics", logo: "/logos/s/google-analytics-3.svg" },
  { id: "cookie-consent", name: "Cookie Consent Manager", logo: "/logos/s/cookie-svgrepo-com.svg" },
  { id: "zapier", name: "Zapier", logo: "/logos/s/zapier.svg" },
  { id: "make", name: "Make.com", logo: "/logos/s/make.svg" },
  { id: "slack", name: "Slack", logo: "/logos/s/slack-new-logo.svg" },
  { id: "discord", name: "Discord", logo: "/logos/s/discord.svg" },
  { id: "mailchimp", name: "Mailchimp", logo: "/logos/s/mailchimp logo.svg" },
  { id: "google-tag-manager", name: "Google Tag Manager", logo: "/logos/s/google-tag-manager logo.svg" },
  { id: "custom-code", name: "Custom Code Snippet", logo: "/logos/s/Custom-Code-Snippet.svg" },
  { id: "usercentric", name: "Usercentrics", logo: "/logos/s/Usercentrics_idibjbvDVZ_0.svg" },
  { id: "onetrust", name: "OneTrust", logo: "/logos/s/OneTrust.svg" },
  { id: "fullstory", name: "Fullstory", logo: "/logos/s/fullstory-logo.svg" },
  { id: "hotjar", name: "Hotjar", logo: "/logos/s/hotjar-icon logo.svg" },
  { id: "amplitude", name: "Amplitude", logo: "/logos/s/amplitude-icon logo.svg" },
  { id: "mixpanel", name: "Mixpanel", logo: "/logos/s/Mixpanel_Symbol_0.svg" },
  { id: "hubspot", name: "Hubspot", logo: "/logos/s/hubspot-1.svg" },
  { id: "zendesk", name: "Zendesk", logo: "/logos/s/zendesk-3.svg" },
  { id: "intercom", name: "Intercom", logo: "/logos/s/intercom-2.svg" },
  { id: "jira", name: "Jira", logo: "/logos/s/Jira logo.svg" },
  { id: "salesforce", name: "Salesforce", logo: "/logos/s/salesforce.svg" }
];

// Tools that require Growth/Enterprise plans
export const GROWTH_ENTERPRISE_TOOLS = [
  "google-tag-manager",
  "custom-code", 
  "usercentric",
  "onetrust",
  "fullstory",
  "hotjar",
  "amplitude",
  "mixpanel",
  "hubspot",
  "zendesk",
  "intercom",
  "jira",
  "salesforce"
];

export const ENTERPRISE_FEATURES: EnterpriseFeature[] = [
  { id: "saml-sso", name: "SAML single sign-on", description: "Seamlessly enable enterprise-grade authentication and secure access.", icon: Lock01 },
  { id: "data-residency", name: "Data residency", description: "Control where your data resides, ensuring compliance with regional regulations.", icon: Globe01 },
  { id: "soc2", name: "SOC 2 (Type 2)", description: "Certifies our security policies and controls meet the highest industry standards.", icon: Shield01 },
  { id: "gdpr-ccpa", name: "GDPR & CCPA", description: "Your data privacy is safeguarded with full compliance with EU regulations.", icon: Lock01 },
  { id: "uptime-sla", name: "Uptime SLA", description: "We guarantee exceptional service reliability with a robust uptime commitment.", icon: Target01 },
  { id: "data-encryption", name: "Data Encryption", description: "Your data is always protected with industry-leading encryption in transit and at rest.", icon: Lock01 },
  { id: "jwt", name: "JWT", description: "Leverage secure, stateless authentication tokens for fast and reliable access control.", icon: Shield01 },
  { id: "audit-log", name: "Audit Log", description: "Monitor a detailed trail of user actions, ensuring transparency and security.", icon: Database01 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Using Bettermode has been a game-changer for us. Its powerful capabilities and features have revolutionized the way we engage with our community.",
    author: "Kyle Foster",
    title: "Marketing Manager",
    company: "HubSpot",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    quote: "Our experience with Bettermode has been fantastic—it's become an essential part of how we support and engage our users.",
    author: "Lizbeth Ramos", 
    title: "Developer Community Manager",
    company: "XANO",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    quote: "Bettermode's automated reputation system and robust content organization features helped us drive engagement with a personalized approach.",
    author: "Marlee Margolin",
    title: "CSR Activation Manager", 
    company: "IBM",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    quote: "Great platform for building communities.",
    author: "Alex Johnson",
    title: "Product Manager", 
    company: "Tech Corp",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  }
];
