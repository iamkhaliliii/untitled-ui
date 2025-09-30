import { SignupFormData } from "./types";
import { BrandData } from "@/utils/brandfetch";
import { mapIndustryToBrandfetch } from "@/utils/industry-mapping";

export const validateStep = (step: number, formData: SignupFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};
  
  switch (step) {
    case 1:
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
      break;
    case 2:
      if (!formData.verificationCode.trim()) newErrors.verificationCode = "Verification code is required";
      if (formData.verificationCode.length !== 6) newErrors.verificationCode = "Code must be 6 characters";
      break;
    case 3:
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      break;
    case 4:
      if (!formData.industry) newErrors.industry = "Industry is required";
      break;
    case 5:
      if (!formData.role) newErrors.role = "Role is required";
      break;
    case 6:
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
      break;
    case 7:
      if (!formData.companySize) newErrors.companySize = "Company size is required";
      break;
  }
  
  return newErrors;
};

export const getRecommendedPlan = (formData: SignupFormData, brandData?: BrandData | null): string => {
  // Check if user selected any enterprise features
  const hasEnterpriseFeatures = formData.enterpriseFeatures.length > 0;
  
  // If enterprise features are selected, recommend enterprise plan
  if (hasEnterpriseFeatures) {
    return "enterprise";
  }
  
  // Define basic/starter tools (no enterprise label)
  const basicTools = [
    "google-analytics", 
    "cookie-consent", 
    "zapier", 
    "make", 
    "slack", 
    "discord",
    "mailchimp"
  ];
  
  // Define advanced tools (beyond starter capabilities)
  const advancedTools = [
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
  
  // Check if user selected any advanced integrations
  const hasAdvancedIntegrations = formData.currentTools.some(tool => advancedTools.includes(tool));
  
  // Check if user only selected basic tools
  const hasOnlyBasicTools = formData.currentTools.length > 0 && 
    formData.currentTools.every(tool => basicTools.includes(tool));
  
  // Decision logic based on integrations
  if (hasAdvancedIntegrations) {
    return "growth";
  } else if (hasOnlyBasicTools || formData.currentTools.length === 0) {
    return "starter";
  } else {
    return "starter"; // fallback
  }
};

export const getStepTitle = (currentStep: number, formData: SignupFormData): string => {
  const titles = [
    "First, enter your email", 
    "Check your email for a code", 
    "What is your name?", 
    "What industry are you in?", 
    "Which best describes your role?", 
    "What is your company's name?", 
    `How many people work at ${formData.companyName || 'your company'}?`, 
    `What is ${formData.companyName || 'your company'}'s website?`, 
    "Communities are much more powerful with awesome integrations", 
    "Looking for enterprise‑grade control and support?", 
    ""
  ];
  return titles[currentStep - 1] || "";
};

export const getStepDescription = (currentStep: number, formData: SignupFormData): string => {
  const descriptions = [
    "We need to use the email address you use at work.",
    `We've sent a 6-character code to ${formData.email}. The code expires shortly, so please enter it soon.`,
    "",
    "",
    "",
    "",
    "",
    "",
    "Choose as many as you want. It helps us guide you to the right plan.",
    "Get advanced security, enterprise controls, and a dedicated CSM. We'll tailor your plan in a quick call with our sales team.",
    "",
    ""
  ];
  return descriptions[currentStep - 1] || "";
};

export const formatUserCount = (count: string): string => {
  if (count.startsWith('under-')) {
    return count.replace('under-', 'under ').replace('10000', '10,000');
  } else if (count.startsWith('over-')) {
    return count.replace('over-', 'over ').replace('50000', '50,000');
  } else {
    return count.replace('-', ' to ').replace('10000', '10,000').replace('25000', '25,000').replace('50000', '50,000');
  }
};

export const formatCompanySize = (size: string): string => {
  const sizeMap: Record<string, string> = {
    "under-50": "under-50 person",
    "50-200": "50–200 person", 
    "200-500": "200–500 person",
    "over-500": "500+ person"
  };
  return sizeMap[size] || size;
};

export const formatIndustry = (industry: string): string => {
  const industryMap: Record<string, string> = {
    "b2b-saas": "B2B SaaS",
    "software": "software",
    "technology": "technology",
    "ai": "AI",
    "medical-saas": "medical SaaS",
    "martech": "MarTech",
    "adtech": "AdTech",
    "marketplace": "marketplace",
    "edtech": "EdTech",
    "dev-tools": "dev tools",
    "other": "technology"
  };
  return industryMap[industry] || industry.replace('-', ' ');
};

export const getBenefitsByPlan = (plan: string): string[] => {
  const benefits = {
    "enterprise": ["SAML SSO", "data residency", "dedicated support"],
    "growth": ["advanced integrations", "analytics at scale", "priority support"], 
    "starter": ["essential integrations", "quick setup", "predictable costs"]
  };
  return benefits[plan.toLowerCase() as keyof typeof benefits] || benefits.starter;
};

export const joinWithAnd = (items: string[]): string => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  
  const allButLast = items.slice(0, -1);
  const last = items[items.length - 1];
  return `${allButLast.join(", ")}, and ${last}`;
};

export const generatePlanRecommendationText = (formData: SignupFormData, recommendedPlan: string, brandData?: BrandData | null) => {
  const name = formData.firstName;
  
  // Use brand data if available, otherwise fall back to form data
  const company = brandData?.name || formData.companyName || "your company";
  
  // Get industry using simplified Step 4 terms
  let industry = "Technology and Services";
  
  if (formData.industry) {
    // Use the exact terms from Step 4
    const industryMap: Record<string, string> = {
      "B2B SaaS": "B2B SaaS",
      "Computer Software": "Computer Software", 
      "Technology and Services": "Technology and Services",
      "AI": "AI",
      "Medical SaaS": "Medical SaaS",
      "MarTech": "MarTech",
      "AdTech": "AdTech", 
      "Online Marketplace": "Online Marketplace",
      "EdTech": "EdTech",
      "Dev Tools": "Dev Tools"
    };
    
    industry = industryMap[formData.industry] || "Technology and Services";
  } else if (brandData?.company?.industries?.[0]?.name) {
    // Map brand data industry back to our simplified terms
    const brandIndustryName = brandData.company.industries[0].name.toLowerCase();
    
    if (brandIndustryName.includes('programming') || brandIndustryName.includes('developer') || brandIndustryName.includes('software')) {
      industry = "Computer Software";
    } else if (brandIndustryName.includes('artificial intelligence') || brandIndustryName.includes('machine learning')) {
      industry = "AI";
    } else if (brandIndustryName.includes('health') || brandIndustryName.includes('medical') || brandIndustryName.includes('medicine')) {
      industry = "Medical SaaS";
    } else if (brandIndustryName.includes('marketing') || brandIndustryName.includes('advertising')) {
      industry = "MarTech";
    } else if (brandIndustryName.includes('education') || brandIndustryName.includes('learning')) {
      industry = "EdTech";
    } else if (brandIndustryName.includes('marketplace') || brandIndustryName.includes('e-commerce') || brandIndustryName.includes('shopping')) {
      industry = "Online Marketplace";
    } else if (brandIndustryName.includes('computer') || brandIndustryName.includes('technology') || brandIndustryName.includes('electronics')) {
      industry = "Technology and Services";
    } else {
      industry = "B2B SaaS";
    }
  }
  
  // Estimate company size based on brand data
  const companySize = brandData?.company?.employees 
    ? brandData.company.employees.toString()
    : "50";
  
  // Generate integration icons text based on current tools - using exact SAAS_TOOLS data
  let integrationIconsText = "";
  if (formData.currentTools.length > 0) {
    // Use exact data from SAAS_TOOLS constants
    const saasTools: Record<string, { name: string; logo: string }> = {
      "google-analytics": { name: "Google Analytics", logo: "/logos/s/google-analytics-3.svg" },
      "cookie-consent": { name: "Cookie Consent Manager", logo: "/logos/s/cookie-svgrepo-com.svg" },
      "zapier": { name: "Zapier", logo: "/logos/s/zapier.svg" },
      "make": { name: "Make.com", logo: "/logos/s/make.svg" },
      "slack": { name: "Slack", logo: "/logos/s/slack-new-logo.svg" },
      "discord": { name: "Discord", logo: "/logos/s/discord.svg" },
      "mailchimp": { name: "Mailchimp", logo: "/logos/s/mailchimp%20logo.svg" },
      "google-tag-manager": { name: "Google Tag Manager", logo: "/logos/s/google-tag-manager%20logo.svg" },
      "custom-code": { name: "Custom Code Snippet", logo: "/logos/s/Custom-Code-Snippet.svg" },
      "usercentric": { name: "Usercentrics", logo: "/logos/s/Usercentrics_idibjbvDVZ_0.svg" },
      "onetrust": { name: "OneTrust", logo: "/logos/s/OneTrust.svg" },
      "fullstory": { name: "Fullstory", logo: "/logos/s/fullstory-logo.svg" },
      "hotjar": { name: "Hotjar", logo: "/logos/s/hotjar-icon%20logo.svg" },
      "amplitude": { name: "Amplitude", logo: "/logos/s/amplitude-icon%20logo.svg" },
      "mixpanel": { name: "Mixpanel", logo: "/logos/s/Mixpanel_Symbol_0.svg" },
      "hubspot": { name: "Hubspot", logo: "/logos/s/hubspot-1.svg" },
      "zendesk": { name: "Zendesk", logo: "/logos/s/zendesk-3.svg" },
      "intercom": { name: "Intercom", logo: "/logos/s/intercom-2.svg" },
      "jira": { name: "Jira", logo: "/logos/s/Jira%20logo.svg" },
      "salesforce": { name: "Salesforce", logo: "/logos/s/salesforce.svg" }
    };
    
    if (formData.currentTools.length === 1) {
      // 1 app: show icon + name
      const toolId = formData.currentTools[0];
      const tool = saasTools[toolId];
      if (tool) {
        integrationIconsText = `[avatar:${tool.logo}:${tool.name}] ${tool.name}`;
      } else {
        integrationIconsText = toolId;
      }
    } else if (formData.currentTools.length <= 5) {
      // 2-5 apps: show only icons
      const toolAvatars = formData.currentTools.map(toolId => {
        const tool = saasTools[toolId];
        return tool ? `[avatar:${tool.logo}:${tool.name}]` : '';
      }).filter(Boolean).join('');
      integrationIconsText = toolAvatars;
    } else {
      // More than 5 apps: show 5 icons + "and more"
      const toolAvatars = formData.currentTools.slice(0, 5).map(toolId => {
        const tool = saasTools[toolId];
        return tool ? `[avatar:${tool.logo}:${tool.name}]` : '';
      }).filter(Boolean).join('');
      integrationIconsText = `${toolAvatars} and more`;
    }
  } else {
    integrationIconsText = "your current tools";
  }
  
  // Plan-specific templates with original UI formatting and 2x larger first line
  const templates = {
    starter: `##**Ready to transform customer connections, ${name}?**\n\nYour **${industry.toLowerCase()}** company is perfectly positioned for community success. With **${company}**'s **${companySize}-person** team and ${integrationIconsText} already in place, the {{Starter}} plan accelerates your community launch.\n\nTurn customer interactions into lasting relationships while your organization builds momentum for bigger wins ahead.\n\n[[Mo Malayeri]]\n((CEO at Bettermode))`,
    
    growth: `##**Time to amplify your ${industry.toLowerCase()} leadership, ${name}.**\n\n**${company}** is ready to unlock serious community ROI. Your **${companySize}-person** team, combined with ${integrationIconsText}, positions you perfectly for the {{Growth}} plan's advanced capabilities.\n\nTransform scattered touchpoints into systematic advocacy that drives measurable revenue growth and competitive advantage.\n\n[[Mo Malayeri]]\n((CEO at Bettermode))`,
    
    enterprise: `##**Scale with enterprise confidence, ${name}.**\n\n**${company}** deserves community infrastructure that matches your ambitions. With your **${companySize}-person** organization using ${integrationIconsText}, the {{Enterprise}} plan delivers the security and scale you need.\n\nLead your **${industry.toLowerCase()}** with community strategies that enterprise customers trust and competitors can't match.\n\n[[Mo Malayeri]]\n((CEO at Bettermode))`
  };
  
  return templates[recommendedPlan.toLowerCase() as keyof typeof templates] || templates.starter;
};
