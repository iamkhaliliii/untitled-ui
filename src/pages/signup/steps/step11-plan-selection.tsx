import { 
  ArrowLeft, 
  Users01, 
  Database01, 
  Globe01, 
  TrendUp01, 
  Star01, 
  Mail01, 
  Lock01, 
  Headphones01,
  CheckCircle,
  Zap,
  Shield01,
  Code01,
  Settings01,
  User01,
  CreditCard01
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { SignupFormData } from "../types";
import { getRecommendedPlan, joinWithAnd } from "../utils";
import { SAAS_TOOLS } from "../constants";

interface Step11PlanSelectionProps {
  formData: SignupFormData;
  billingPeriod: 'annual' | 'monthly';
  isLoading: boolean;
  onBack: () => void;
  onSetBillingPeriod: (period: 'annual' | 'monthly') => void;
  onSetSelectedPlan: (plan: string) => void;
  onSubmit: () => void;
}

export const Step11PlanSelection = ({ 
  formData, 
  billingPeriod,
  isLoading,
  onBack,
  onSetBillingPeriod,
  onSetSelectedPlan,
  onSubmit
}: Step11PlanSelectionProps) => {
  const recommendedPlanType = getRecommendedPlan(formData);
  
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$399",
      period: "/month",
      annualPrice: "$333",
      annualPeriod: "/month",
      annualTotal: "($4,000/year)",
      monthlyTotal: "($4,788/year)",
      members: "10,000",
      collaborators: "3",
      spaces: "100",
      storage: "1TB",
      description: "",
      features: [
        { icon: Users01, text: "Up to 10,000 members and 3 collaborators" },
        { icon: Database01, text: "100 spaces and 1TB storage" },
        { icon: Globe01, text: "Custom Domain" },
        { icon: TrendUp01, text: "Basic Analytics" },
        { icon: Star01, text: "Core apps: Q&A, Discussion, Events, Polls" },
        { icon: Mail01, text: "Private messaging & chat" },
        { icon: Lock01, text: "Social login" },
        { icon: Headphones01, text: "Chat & Email Support" }
      ],
      buttonText: "14-days trial",
      buttonStyle: "primary",
      recommended: recommendedPlanType === "starter"
    },
    {
      id: "growth", 
      name: "Growth",
      price: "$1,750",
      period: "/month",
      annualPrice: "$1,500",
      annualPeriod: "/month",
      annualTotal: "($18,000/year)",
      monthlyTotal: "($21,000/year)",
      members: "25,000",
      collaborators: "10",
      spaces: "200",
      storage: "3TB",
      description: "",
      features: [
        { icon: Users01, text: "Up to 25,000 members and 10 collaborators" },
        { icon: Database01, text: "200 spaces and 3TB storage" },
        { icon: CheckCircle, text: "Everything in Starter" },
        { icon: Zap, text: "Ask AI and Federated search" },
        { icon: Shield01, text: "Remove 'Powered by Bettermode'" },
        { icon: Mail01, text: "Sender email customization" },
        { icon: Code01, text: "API, Webhooks, and Sandbox Environment" },
        { icon: Settings01, text: "Activity Log" },
        { icon: Headphones01, text: "Onboarding and Migration Support" },
        { icon: Lock01, text: "OAuth2" }
      ],
      buttonText: "Request a demo",
      buttonStyle: "primary",
      recommended: recommendedPlanType === "growth"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Contact Us",
      period: "",
      annualPrice: null,
      annualPeriod: null,
      annualTotal: "",
      monthlyTotal: "Contact Us",
      members: "50,000",
      collaborators: "20",
      spaces: "500",
      storage: "5TB",
      description: "",
      features: [
        { icon: Users01, text: "Up to 50,000 members and 20 collaborators" },
        { icon: Database01, text: "500 spaces and 5TB storage" },
        { icon: CheckCircle, text: "Everything in Growth" },
        { icon: Settings01, text: "Audit log (90 days)" },
        { icon: Shield01, text: "SOC II, JWT, and SAML" },
        { icon: User01, text: "Customer Success Manager" },
        { icon: TrendUp01, text: "99.9% Uptime SLA" },
        { icon: CreditCard01, text: "Custom billing" },
        { icon: Lock01, text: "Security and legal review" }
      ],
      buttonText: "Talk to Sales",
      buttonStyle: "primary",
      recommended: recommendedPlanType === "enterprise"
    }
  ];

  const renderIntegrationLogos = (planId: string) => {
    const starterLogos = [
      "/logos/s/google-analytics-3.svg",
      "/logos/s/cookie-svgrepo-com.svg",
      "/logos/s/zapier.svg",
      "/logos/s/make.svg",
      "/logos/s/slack-new-logo.svg",
      "/logos/s/discord.svg",
      "/logos/s/mailchimp logo.svg"
    ];

    const growthEnterpriseLogos = [
      ...starterLogos,
      "/logos/s/google-tag-manager logo.svg",
      "/logos/s/Custom-Code-Snippet.svg",
      "/logos/s/Usercentrics_idibjbvDVZ_0.svg",
      "/logos/s/OneTrust.svg",
      "/logos/s/fullstory-logo.svg",
      "/logos/s/hotjar-icon logo.svg",
      "/logos/s/amplitude-icon logo.svg",
      "/logos/s/Mixpanel_Symbol_0.svg",
      "/logos/s/hubspot-1.svg",
      "/logos/s/zendesk-3.svg",
      "/logos/s/intercom-2.svg",
      "/logos/s/Jira logo.svg",
      "/logos/s/salesforce.svg"
    ];

    const logos = planId === "starter" ? starterLogos : growthEnterpriseLogos;

    return (
      <div className="flex flex-wrap gap-2 justify-start">
        {logos.map((logo, index) => (
          <img 
            key={index}
            src={logo} 
            alt="" 
            className={cx(
              "w-5 h-5 rounded",
              (logo.includes("cookie-svgrepo-com") || logo.includes("Custom-Code-Snippet")) && "logo-filter"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 w-full">
      
      {/* Left Side - Back Button + Recommendation Text */}
      <div className="flex flex-col gap-8">
        <div className="">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        
        <div className="text-left">
          {/* Advanced Recommendation Text with Typing Animation */}
          <div className="space-y-4">
            <TypingAnimation 
              startOnView={true}
              duration={45}
              className="text-xl text-primary leading-relaxed font-normal text-left"
            >
              {(() => {
                // Generate the complete text with formatting
                const name = formData.firstName;
                const role = formData.role ? `, in ${formData.role.replace(/-/g, ' ').split(' ').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ')}` : "";
                const company = formData.companyName.split(' ').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ');
                
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
                
                // Generate tool avatars (max 5 + "and more")
                const toolAvatars = formData.currentTools.slice(0, 5).map(toolId => {
                  const tool = SAAS_TOOLS.find(t => t.id === toolId);
                  return tool ? `[avatar:${tool.logo}:${tool.name}]` : '';
                }).filter(Boolean).join('');
                
                const moreText = formData.currentTools.length > 5 ? ' and more' : '';
                const toolsText = formData.currentTools.length > 0 ? `, using ${toolAvatars}${moreText}` : "";
                
                const recommendedPlan = getRecommendedPlan(formData);
                const planName = recommendedPlan.charAt(0).toUpperCase() + recommendedPlan.slice(1);
                
                const benefits = {
                  "enterprise": ["SAML SSO", "data residency", "dedicated support"],
                  "growth": ["advanced integrations", "analytics at scale", "priority support"], 
                  "starter": ["essential integrations", "quick setup", "predictable costs"]
                };
                const planBenefits = benefits[recommendedPlan.toLowerCase() as keyof typeof benefits] || benefits.starter;
                const benefitsText = joinWithAnd(planBenefits);
                
                return `**${name}**${role} at **${company}**.\n\nBased on what you shared about **${company}** — a **${companySize} ${industry}** company${toolsText} — the {{${planName}}} plan is the best fit.\n\nIt provides **${benefitsText}** so the organization can grow confidently.\n\n[[Mo Malayery]]\n((CEO at Bettermode))`;
              })()}
            </TypingAnimation>
            
            {/* Compact warning if selected plan doesn't match recommendation */}
            {formData.selectedPlan !== getRecommendedPlan(formData) && (
              <div className="mt-8">
                <div className="text-xs text-tertiary">
                  <p className="leading-relaxed">
                    {(() => {
                      const recommendedPlan = getRecommendedPlan(formData);
                      const selectedPlan = formData.selectedPlan;
                      
                      // Show "Why not [recommended plan]?" when user selects different plan
                      const planName = recommendedPlan.charAt(0).toUpperCase() + recommendedPlan.slice(1);
                      return `Why not ${planName}?`;
                    })()} {(() => {
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
                          return `It doesn't include ${features.join("/")}, CSM, and security/legal reviews.`;
                        }
                        return "Enterprise-grade controls like SAML/JWT/SLA/CSM aren't available on Growth.";
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
                        return `It doesn't include ${missing.join(", ")}.`;
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
                        return `It doesn't include ${missing.join(", ")}.`;
                      }
                      
                      if (recommendedPlan === "starter" && selectedPlan === "growth") {
                        return "You don't need Growth's Ask AI, unlimited APIs, and advanced features yet.";
                      }
                      
                      if (recommendedPlan === "starter" && selectedPlan === "enterprise") {
                        return "You don't need Enterprise's security controls, CSM, and $3K+/month premium.";
                      }
                      
                      return "optimal feature alignment for your current requirements.";
                    })()}
                  </p>
                  
                  <a 
                    href="https://bettermode.com/contact-sales" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-brand-secondary hover:text-brand-secondary_hover underline underline-offset-2 transition-colors mt-2 inline-block"
                  >
                    Talk to Sales
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Pricing Cards */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold text-primary">Choose your plan</h2>
          <div className="flex bg-secondary rounded-lg p-1 mx-auto sm:mx-0">
            <button
              onClick={() => onSetBillingPeriod('annual')}
              className={cx(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                billingPeriod === 'annual'
                  ? "bg-primary text-primary shadow-sm"
                  : "text-tertiary hover:text-primary"
              )}
            >
              Annually
            </button>
            <button
              onClick={() => onSetBillingPeriod('monthly')}
              className={cx(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                billingPeriod === 'monthly'
                  ? "bg-primary text-primary shadow-sm"
                  : "text-tertiary hover:text-primary"
              )}
            >
              Monthly
            </button>
          </div>
        </div>
        
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {(() => {
            const sortedPlans = [
              ...plans.filter(plan => plan.id === recommendedPlanType),
              ...plans.filter(plan => plan.id !== recommendedPlanType)
            ];
            return sortedPlans.map((plan, index) => (
              <div 
                key={plan.id}
                className={cx(
                  "relative p-3 sm:p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md flex flex-col",
                  formData.selectedPlan === plan.id
                    ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                    : plan.recommended
                    ? "border-brand-300 bg-brand-primary_alt hover:border-brand-400"
                    : "border-secondary hover:border-primary",
                  "min-h-[350px] sm:min-h-[400px]",
                  plan.id === "enterprise" && billingPeriod === 'monthly' && "opacity-20",
                  // Add divider after recommended card (first card)
                  index === 0 && sortedPlans.length > 1 && "xl:after:content-[''] xl:after:absolute xl:after:-right-2 xl:after:top-0 xl:after:bottom-0 xl:after:w-px xl:after:bg-secondary/30"
                )}
                onClick={() => onSetSelectedPlan(plan.id)}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-3 ">
                    <span className="bg-brand-solid text-white text-[0.8rem] font-medium px-3 py-1 rounded-md ">
                      Recommended based on your needs
                    </span>
                  </div>
                )}
                
                <div className="mb-3">
                  <div className="mb-2">
                    <h3 className="text-base font-semibold text-primary">{plan.name}</h3>
                  </div>
                  <div className=" min-h-[60px] flex flex-col justify-center">
                    {billingPeriod === 'annual' && plan.annualPrice && plan.price !== plan.annualPrice ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[0.9rem] font-bold line-through text-quaternary">{plan.price}</span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-1 py-0.5 rounded-md">
                            Save {Math.round(((parseFloat(plan.price.replace('$', '').replace(',', '')) - parseFloat(plan.annualPrice.replace('$', '').replace(',', ''))) / parseFloat(plan.price.replace('$', '').replace(',', ''))) * 100)}%
                          </span>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-primary">{plan.annualPrice}</span>
                          <span className="ml-1 text-tertiary">/m</span>
                          <span className="text-sm ml-2 text-quaternary">{plan.annualTotal}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center h-full">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-primary">{plan.price}</span>
                          {plan.price !== "Contact Us" && <span className="ml-1 text-tertiary">/m</span>}
                          {billingPeriod === 'monthly' && plan.monthlyTotal && plan.monthlyTotal !== "Not Available" && plan.monthlyTotal !== "Contact Us" && (
                            <span className="text-sm ml-2 text-quaternary">{plan.monthlyTotal}</span>
                          )}
                        </div>
                        {billingPeriod === 'monthly' && plan.monthlyTotal === "Not Available" && (
                          <div className="text-sm mt-1 font-medium text-primary">Only Annually</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1 mb-4 mt-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-tertiary">
                      <feature.icon className="w-3 h-3 mr-2 text-quaternary" />
                      {feature.text}
                    </div>
                  ))}
                </div>

                <div className="mb-4 mt-4">
                  <p className="text-xs mb-1 text-quaternary">Integrations</p>
                  {renderIntegrationLogos(plan.id)}
                </div>

                {/* Card Footer - Action Button */}
                <div className="mt-auto pt-4 border-t border-tertiary">
                  <Button
                    className="w-full"
                    color={plan.buttonStyle === "primary" ? "primary" : plan.buttonStyle === "secondary" ? "secondary" : "tertiary"}
                    size="sm"
                    onClick={() => {
                      onSetSelectedPlan(plan.id);
                      onSubmit();
                    }}
                    isLoading={isLoading && formData.selectedPlan === plan.id}
                  >
                    {plan.buttonText}
                  </Button>
                  
                  <a 
                    href="https://bettermode.com/pricing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center text-xs transition-colors mt-1.5 text-quaternary hover:text-tertiary"
                  >
                    See details →
                  </a>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
};
