import { useState, useEffect } from "react";
import { 
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
import { getRecommendedPlan, joinWithAnd, generatePlanRecommendationText } from "../utils";
import { SAAS_TOOLS } from "../constants";
import { BrandData } from "@/utils/brandfetch";

// Helper function to render formatted text (same logic as TypingAnimation)
const renderFormattedText = (text: string) => {
  const segments: Array<{text: string, type: string}> = [];
  let currentText = text;
  
  // Split by line breaks first
  const lines = currentText.split('\n');
  
  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      segments.push({ text: '', type: 'break' });
    }
    
    let remainingText = line;
    
    while (remainingText.length > 0) {
      // Check for ##** (large-bold)
      if (remainingText.startsWith('##**')) {
        const endIndex = remainingText.indexOf('**', 4);
        if (endIndex !== -1) {
          const content = remainingText.substring(4, endIndex);
          segments.push({ text: content, type: 'large-bold' });
          remainingText = remainingText.substring(endIndex + 2);
          continue;
        }
      }
      
      // Check for ** (bold)
      if (remainingText.startsWith('**')) {
        const endIndex = remainingText.indexOf('**', 2);
        if (endIndex !== -1) {
          const content = remainingText.substring(2, endIndex);
          segments.push({ text: content, type: 'bold' });
          remainingText = remainingText.substring(endIndex + 2);
          continue;
        }
      }
      
      // Check for {{ (brand)
      if (remainingText.startsWith('{{')) {
        const endIndex = remainingText.indexOf('}}');
        if (endIndex !== -1) {
          const content = remainingText.substring(2, endIndex);
          segments.push({ text: content, type: 'brand' });
          remainingText = remainingText.substring(endIndex + 2);
          continue;
        }
      }
      
      // Check for [[ (signature)
      if (remainingText.startsWith('[[')) {
        const endIndex = remainingText.indexOf(']]');
        if (endIndex !== -1) {
          const content = remainingText.substring(2, endIndex);
          segments.push({ text: content, type: 'signature' });
          remainingText = remainingText.substring(endIndex + 2);
          continue;
        }
      }
      
      // Check for (( (small)
      if (remainingText.startsWith('((')) {
        const endIndex = remainingText.indexOf('))');
        if (endIndex !== -1) {
          const content = remainingText.substring(2, endIndex);
          segments.push({ text: content, type: 'small' });
          remainingText = remainingText.substring(endIndex + 2);
          continue;
        }
      }
      
      // Find next special character or take the rest
      const nextSpecial = Math.min(
        ...[
          remainingText.indexOf('##**', 1),
          remainingText.indexOf('**', 1),
          remainingText.indexOf('{{', 1),
          remainingText.indexOf('[[', 1),
          remainingText.indexOf('((', 1)
        ].filter(i => i !== -1).concat([remainingText.length])
      );
      
      const plainText = remainingText.substring(0, nextSpecial);
      if (plainText) {
        segments.push({ text: plainText, type: 'normal' });
      }
      remainingText = remainingText.substring(nextSpecial);
    }
  });
  
  return segments.map((segment, index) => {
    switch (segment.type) {
      case 'break':
        return <br key={index} />;
      case 'bold':
        return <span key={index} className="font-semibold">{segment.text}</span>;
      case 'brand':
        return <span key={index} className="font-bold text-brand-secondary">{segment.text}</span>;
      case 'signature':
        return (
          <span 
            key={index} 
            className="text-3xl text-primary transform -rotate-1 inline-block" 
            style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              fontWeight: 700,
              letterSpacing: '-0.075em'
            }}
          >
            {segment.text}
          </span>
        );
      case 'small':
        return <span key={index} className="text-sm text-tertiary">{segment.text}</span>;
      case 'large-bold':
        return <span key={index} className="text-2xl font-bold">{segment.text}</span>;
      default:
        return <span key={index}>{segment.text}</span>;
    }
  });
};

interface Step11PlanSelectionProps {
  formData: SignupFormData;
  billingPeriod: 'annual' | 'monthly';
  isLoading: boolean;
  brandData?: BrandData | null;
  onSetBillingPeriod: (period: 'annual' | 'monthly') => void;
  onSetSelectedPlan: (plan: string) => void;
  onSubmit: () => void;
}

export const Step11PlanSelection = ({ 
  formData, 
  billingPeriod,
  isLoading,
  brandData,
  onSetBillingPeriod,
  onSetSelectedPlan,
  onSubmit
}: Step11PlanSelectionProps) => {

  const recommendedPlanType = getRecommendedPlan(formData, brandData);
  
  // Get community name from wizard data if available
  const getCommunityName = () => {
    try {
      const wizardData = sessionStorage.getItem('wizard-form-data');
      if (wizardData) {
        const parsedData = JSON.parse(wizardData);
        return parsedData.communityName || formData.firstName;
      }
    } catch (error) {
      console.error('Error parsing wizard data:', error);
    }
    return formData.firstName;
  };
  
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
      buttonText: "14-day trial",
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
              "w-4.5 h-4.5 rounded",
              (logo.includes("cookie-svgrepo-com") || logo.includes("Custom-Code-Snippet")) && "logo-filter"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 w-full">
      
      {/* Left Side - Recommendation Text */}
      <div className="flex flex-col gap-8">
        <div className="text-left mt-24">
          {/* Advanced Recommendation Text with Typing Animation */}
          <div className="space-y-4">
            <TypingAnimation 
              startOnView={true}
              duration={45}
              className="text-xl text-primary leading-relaxed font-normal text-left"
            >
              {generatePlanRecommendationText(formData, recommendedPlanType, brandData)}
            </TypingAnimation>
            
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
            // Display plans in natural order: Starter, Growth, Enterprise
            const orderedPlans = plans.sort((a, b) => {
              const order = { 'starter': 1, 'growth': 2, 'enterprise': 3 };
              return order[a.id as keyof typeof order] - order[b.id as keyof typeof order];
            });
            return orderedPlans.map((plan, index) => (
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
                  // Add divider after first card
                  index === 0 && orderedPlans.length > 1 && "xl:after:content-[''] xl:after:absolute xl:after:-right-2 xl:after:top-0 xl:after:bottom-0 xl:after:w-px xl:after:bg-secondary/30"
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
                  <div className="flex flex-col h-28">
                    <Button
                      className="w-full flex-shrink-0"
                      color={plan.buttonStyle === "primary" ? "primary" : plan.buttonStyle === "secondary" ? "secondary" : "tertiary"}
                      size="sm"
                      onClick={() => {
                        onSetSelectedPlan(plan.id);
                        // For trial buttons, log the community name for payment
                        if (plan.buttonText.includes("trial")) {
                          const communityName = getCommunityName();
                          console.log(`Starting ${plan.buttonText} for: ${communityName}`);
                          // You can add payment logic here that uses communityName instead of formData.firstName
                        }
                        onSubmit();
                      }}
                      isLoading={isLoading && formData.selectedPlan === plan.id}
                    >
                      {plan.buttonText}
                    </Button>
                    
                    {plan.id === "growth" ? (
                      <div className="flex flex-col flex-1 min-h-0">
                        <a 
                          href="https://bettermode.com/contact-sales" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-center text-sm font-medium transition-colors mt-3 text-brand-secondary hover:text-brand-secondary_hover flex-shrink-0"
                        >
                          Request a demo
                        </a>
                        <div className="mt-auto flex-shrink-0 space-y-3">
                          <div className="border-t border-tertiary/30"></div>
                          <a 
                            href="https://bettermode.com/pricing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block text-center text-xs transition-colors text-quaternary hover:text-tertiary"
                          >
                            See details →
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col flex-1 min-h-0">
                        <div className="mt-auto flex-shrink-0 space-y-3">
                          <div className="border-t border-tertiary/30 mt-3"></div>
                          <a 
                            href="https://bettermode.com/pricing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block text-center text-xs transition-colors text-quaternary hover:text-tertiary"
                          >
                            See details →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
};
