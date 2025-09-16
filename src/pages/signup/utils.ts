import { SignupFormData } from "./types";

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

export const getRecommendedPlan = (formData: SignupFormData): string => {
  // Enterprise-grade features that require Enterprise plan
  const enterpriseFeatures = ["saml-sso", "jwt", "uptime-sla", "audit-log", "data-residency", "soc2", "gdpr-ccpa"];
  const hasEnterpriseFeatures = formData.enterpriseFeatures.some(feature => 
    enterpriseFeatures.includes(feature)
  );
  
  // Advanced tools that require at least Growth plan
  const advancedTools = [
    "amplitude", "fullstory", "salesforce", "intercom", "zendesk", "jira", 
    "google-tag-manager", "custom-code", "onetrust", "usercentric", "hotjar", "mixpanel"
  ];
  const hasAdvancedTools = formData.currentTools.some(tool => advancedTools.includes(tool));
  
  // Basic tools that work with Starter
  const basicTools = ["zapier", "mailchimp", "slack", "discord", "google-analytics", "cookie-consent", "make"];
  const hasOnlyBasicTools = formData.currentTools.length > 0 && 
    formData.currentTools.every(tool => basicTools.includes(tool));
  
  // Decision logic
  if (hasEnterpriseFeatures) {
    return "enterprise";
  } else if (hasAdvancedTools) {
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

export const generatePlanRecommendationText = (formData: SignupFormData, recommendedPlan: string) => {
  const name = formData.firstName;
  const role = formData.role;
  const company = formData.companyName;
  const companySize = formatCompanySize(formData.companySize);
  const industry = formatIndustry(formData.industry);
  const benefits = getBenefitsByPlan(recommendedPlan);
  
  // Role clause
  const roleClause = role ? `, in ${role}` : "";
  
  // Tools clause - get tool names and limit to 5
  const toolNames = formData.currentTools
    .slice(0, 5)
    .map(toolId => {
      // Import SAAS_TOOLS here would cause circular dependency, so we'll pass it as parameter
      return toolId; // We'll handle tool name mapping in the component
    });
  
  const toolsClause = toolNames.length > 0 ? ` using ${joinWithAnd(toolNames)}` : "";
  
  // Generate the text
  const lines = [
    `${name}${roleClause} at ${company}.`,
    `Based on what you shared about ${company} — a ${companySize} ${industry} company${toolsClause} — the **${recommendedPlan}** plan is the best fit.`,
    `It provides ${joinWithAnd(benefits)} so the organization can grow confidently.`,
    "",
    "— Mo, CEO at Bettermode"
  ];
  
  return lines.join('\n');
};
