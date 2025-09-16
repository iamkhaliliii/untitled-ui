import { cx } from "@/utils/cx";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { SignupFormData } from "../types";
import { getRecommendedPlan, generatePlanRecommendationText, joinWithAnd } from "../utils";
import { SAAS_TOOLS } from "../constants";

interface PlanRecommendationProps {
  formData: SignupFormData;
}

export const PlanRecommendation = ({ formData }: PlanRecommendationProps) => {
  const recommendedPlan = getRecommendedPlan(formData);
  
  // Get tool names for display
  const getToolNames = () => {
    return formData.currentTools
      .slice(0, 5)
      .map(toolId => {
        const tool = SAAS_TOOLS.find(t => t.id === toolId);
        return tool ? tool.name : toolId;
      });
  };

  const renderRecommendationText = () => {
    const toolNames = getToolNames();
    
    // Format company size
    const formatCompanySize = (size: string): string => {
      const sizeMap: Record<string, string> = {
        "under-50": "under-50 person",
        "50-200": "50–200 person", 
        "200-500": "200–500 person",
        "over-500": "500+ person"
      };
      return sizeMap[size] || size;
    };

    // Format industry
    const formatIndustry = (industry: string): string => {
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

    // Get benefits by plan
    const getBenefits = (plan: string): string[] => {
      const benefits = {
        "enterprise": ["SAML SSO", "data residency", "dedicated support"],
        "growth": ["advanced integrations", "analytics at scale", "priority support"], 
        "starter": ["essential integrations", "quick setup", "predictable costs"]
      };
      return benefits[plan.toLowerCase() as keyof typeof benefits] || benefits.starter;
    };

    const name = formData.firstName;
    const role = formData.role;
    const company = formData.companyName;
    const companySize = formatCompanySize(formData.companySize);
    const industry = formatIndustry(formData.industry);
    const benefits = getBenefits(recommendedPlan);
    
    const roleClause = role ? `, in ${role}` : "";
    
    return (
      <div className="space-y-4">
        <TypingAnimation 
          startOnView={true}
          duration={45}
          className="text-xl text-primary leading-relaxed font-normal text-left"
        >
          {(() => {
            // Generate tool avatars (max 5 + "and more")
            const toolAvatars = formData.currentTools.slice(0, 5).map(toolId => {
              const tool = SAAS_TOOLS.find(t => t.id === toolId);
              return tool ? `[avatar:${tool.logo}:${tool.name}]` : '';
            }).filter(Boolean).join('');
            
            const moreText = formData.currentTools.length > 5 ? ' and more' : '';
            const toolsText = formData.currentTools.length > 0 ? `, using ${toolAvatars}${moreText}` : "";
            
            const sizeMap: Record<string, string> = {
              "under-50": "under-50-person",
              "50-200": "50–200-person", 
              "200-500": "200–500-person",
              "over-500": "500+-person"
            };
            const companySize = sizeMap[formData.companySize] || formData.companySize;
            
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
            const industry = industryMap[formData.industry] || formData.industry?.replace('-', ' ') || 'technology';
            
            const planName = recommendedPlan.charAt(0).toUpperCase() + recommendedPlan.slice(1);
            
            return `**${name}**${roleClause} at **${company}**.\n\nBased on what you shared about **${company}** — a **${companySize} ${industry}** company${toolsText} — the {{${planName}}} plan is the best fit.\n\nIt provides **${joinWithAnd(benefits)}** so the organization can grow confidently.\n\n[[Mo Malayery]]\n((CEO at Bettermode))`;
          })()}
        </TypingAnimation>

        {/* Simple recommendation note */}
        {formData.selectedPlan !== recommendedPlan && (
          <div className="mt-8">
            <div className="text-xs text-tertiary">
              <p className="leading-relaxed">
                {(() => {
                  const recommendedPlan = getRecommendedPlan(formData);
                  const selectedPlan = formData.selectedPlan;
                  
                  // Show "Why not [recommended plan]?" when user selects different plan
                  const planName = recommendedPlan.charAt(0).toUpperCase() + recommendedPlan.slice(1);
                  return `Why not ${planName}?`;
                })()}{" "}{(() => {
                  const recommendedPlan = getRecommendedPlan(formData);
                  const selectedPlan = formData.selectedPlan;
                  
                  // Check specific enterprise features
                  const enterpriseFeatures = ["saml-sso", "jwt", "uptime-sla", "audit-log", "data-residency", "soc2", "gdpr-ccpa"];
                  const selectedEnterpriseFeatures = formData.enterpriseFeatures.filter(feature => 
                    enterpriseFeatures.includes(feature)
                  );
                  
                  // Check advanced tools
                  const advancedTools = [
                    "amplitude", "fullstory", "salesforce", "intercom", "zendesk", "jira", 
                    "google-tag-manager", "custom-code", "onetrust", "usercentric", "hotjar", "mixpanel"
                  ];
                  const selectedAdvancedTools = formData.currentTools.filter(tool => 
                    advancedTools.includes(tool)
                  );
                  
                  if (recommendedPlan === "enterprise" && selectedPlan === "growth") {
                    const features = [];
                    if (selectedEnterpriseFeatures.includes("saml-sso")) features.push("SAML");
                    if (selectedEnterpriseFeatures.includes("jwt")) features.push("JWT");
                    if (selectedEnterpriseFeatures.includes("uptime-sla")) features.push("SLA");
                    if (selectedEnterpriseFeatures.includes("audit-log")) features.push("audit logs");
                    if (selectedEnterpriseFeatures.includes("data-residency")) features.push("data residency");
                    
                    if (features.length > 0) {
                      return `Why not Enterprise? It doesn't include ${features.join("/")}, CSM, and security/legal reviews.`;
                    }
                    return "Why not Enterprise? Enterprise-grade controls like SAML/JWT/SLA/CSM aren't available on Growth.";
                  }
                  
                  if (recommendedPlan === "enterprise" && selectedPlan === "starter") {
                    const missing = [];
                    if (selectedAdvancedTools.length > 0) {
                      const toolNames = selectedAdvancedTools.slice(0, 3).map(tool => {
                        const toolMap: Record<string, string> = {
                          "amplitude": "Amplitude",
                          "fullstory": "Fullstory", 
                          "salesforce": "Salesforce",
                          "intercom": "Intercom",
                          "zendesk": "Zendesk",
                          "jira": "Jira",
                          "google-tag-manager": "GTM",
                          "custom-code": "Custom Code",
                          "onetrust": "OneTrust",
                          "usercentric": "Usercentrics",
                          "hotjar": "Hotjar",
                          "mixpanel": "Mixpanel"
                        };
                        return toolMap[tool] || tool;
                      });
                      missing.push(`${toolNames.join("/")} integrations`);
                    }
                    missing.push("Enterprise security", "CSM", "SLA", "security/legal reviews");
                    return `Why not Starter? It doesn't include ${missing.join(", ")}.`;
                  }
                  
                  if (recommendedPlan === "growth" && selectedPlan === "starter") {
                    const missing = [];
                    if (selectedAdvancedTools.length > 0) {
                      const toolNames = selectedAdvancedTools.slice(0, 3).map(tool => {
                        const toolMap: Record<string, string> = {
                          "amplitude": "Amplitude",
                          "fullstory": "Fullstory", 
                          "salesforce": "Salesforce",
                          "intercom": "Intercom",
                          "zendesk": "Zendesk",
                          "jira": "Jira",
                          "google-tag-manager": "GTM",
                          "hotjar": "Hotjar",
                          "mixpanel": "Mixpanel"
                        };
                        return toolMap[tool] || tool;
                      });
                      missing.push(`${toolNames.join("/")} integrations`);
                    }
                    missing.push("onboarding", "priority support", "advanced analytics");
                    return `💡 Why not Growth? It doesn't include ${missing.join(", ")}.`;
                  }
                  
                  if (recommendedPlan === "starter" && selectedPlan === "growth") {
                    return "💡 Why not Starter? You don't need Growth's Ask AI, unlimited APIs, and advanced features yet.";
                  }
                  
                  if (recommendedPlan === "starter" && selectedPlan === "enterprise") {
                    return "💡 Why not Starter? You don't need Enterprise's security controls, CSM, and $3K+/month premium.";
                  }
                  
                  return "💡 Consider our recommendation for optimal feature alignment.";
                })()}
              </p>
              <div className="mt-3">
                <a 
                  href="https://bettermode.com/contact-sales" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-orange-800 hover:text-orange-900 underline underline-offset-2 transition-colors"
                >
                  Talk to Sales
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 px-8">
      <div className="text-left">
        {/* Recommendation Text */}
        {renderRecommendationText()}
      </div>
    </div>
  );
};
