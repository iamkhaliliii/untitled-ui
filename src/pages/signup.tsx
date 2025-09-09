import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  ArrowRight, 
  ArrowLeft, 
  Building01, 
  Mail01, 
  Lock01, 
  User01,
  Globe01,
  Users01,
  CheckCircle,
  Star01,
  Shield01,
  Zap,
  Target01,
  CreditCard01,
  Eye,
  EyeOff,
  Briefcase01,
  Heart,
  Code01,
  Database01,
  ShoppingCart01,
  GraduationHat01,
  Settings01,
  Headphones01,
  TrendUp01
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { cx } from "@/utils/cx";

interface SignupFormData {
  email: string;
  authMethod: 'email' | 'google';
  password: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  companySize: string;
  industry: string;
  website: string;
  primaryUseCase: string;
  currentTools: string[];
  enterpriseFeatures: string[];
  expectedUserCount: string;
  selectedPlan: string;
}

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" }
];

const INDUSTRIES = [
  { value: "technology", label: "Technology & Software", icon: Code01 },
  { value: "financial", label: "Financial Services", icon: CreditCard01 },
  { value: "healthcare", label: "Healthcare & Life Sciences", icon: Heart },
  { value: "ecommerce", label: "E-commerce & Retail", icon: ShoppingCart01 },
  { value: "education", label: "Education", icon: GraduationHat01 },
  { value: "consulting", label: "Consulting & Services", icon: Briefcase01 },
  { value: "other", label: "Other", icon: Building01 }
];

const USE_CASES = [
  { value: "community-building", label: "Community Building", description: "Build customer communities" },
  { value: "customer-support", label: "Customer Support", description: "Better support & docs" },
  { value: "employee-engagement", label: "Employee Engagement", description: "Internal collaboration" },
  { value: "product-feedback", label: "Product Feedback", description: "Collect user feedback" },
  { value: "other", label: "Other", description: "Custom use case for your needs" }
];

const SAAS_TOOLS = [
  { id: "salesforce", name: "Salesforce", logo: "./src/logo/s/salesforce.svg" },
  { id: "hubspot", name: "HubSpot", logo: "./src/logo/s/hubspot-1.svg" },
  { id: "intercom", name: "Intercom", logo: "./src/logo/s/intercom-2.svg" },
  { id: "zendesk", name: "Zendesk", logo: "./src/logo/s/zendesk-3.svg" },
  { id: "slack", name: "Slack", logo: "./src/logo/s/slack-new-logo.svg" },
  { id: "teams", name: "MS Teams", logo: "./src/logo/s/microsoft-teams-1.svg" },
  { id: "analytics", name: "Google Analytics", logo: "./src/logo/s/google-analytics-3.svg" },
  { id: "stripe", name: "Stripe", logo: "./src/logo/s/stripe-4.svg" },
  { id: "tag-manager", name: "Google Tag Manager", logo: "./src/logo/s/google-tag-manager logo.svg" },
  { id: "zapier", name: "Zapier", logo: "./src/logo/s/zapier.svg" },
  { id: "jira", name: "Jira", logo: "./src/logo/s/Jira logo.svg" },
  { id: "make", name: "Make", logo: "./src/logo/s/make.svg" },
  { id: "hotjar", name: "Hotjar", logo: "./src/logo/s/hotjar-icon logo.svg" },
  { id: "amplitude", name: "Amplitude", logo: "./src/logo/s/amplitude-icon logo.svg" },
  { id: "mailchimp", name: "Mailchimp", logo: "./src/logo/s/mailchimp logo.svg" },
  { id: "mixpanel", name: "Mixpanel", logo: "./src/logo/s/Mixpanel_Symbol_0.svg" }
];

const ENTERPRISE_FEATURES = [
  { id: "sso", name: "Single Sign-On", description: "SAML, OAuth authentication" },
  { id: "security", name: "Advanced Security", description: "2FA, IP restrictions, audit logs" },
  { id: "branding", name: "Custom Branding", description: "White-label solution" },
  { id: "api", name: "API Access", description: "Full REST API access" },
  { id: "compliance", name: "Compliance", description: "SOC 2, GDPR, HIPAA" }
];

const TESTIMONIALS = [
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

export const SignupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAllPlans, setShowAllPlans] = useState(false);
  
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    authMethod: 'email',
    password: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    companyName: "",
    companySize: "",
    industry: "",
    website: "",
    primaryUseCase: "",
    currentTools: [],
    enterpriseFeatures: [],
    expectedUserCount: "",
    selectedPlan: "pro"
  });

  const handleInputChange = (field: keyof SignupFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleArrayToggle = (field: 'currentTools' | 'enterpriseFeatures') => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
        break;
      case 2:
        if (formData.authMethod === 'email' && !formData.password) newErrors.password = "Password is required";
        if (formData.authMethod === 'email' && formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
        break;
      case 3:
        if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
        if (!formData.companySize) newErrors.companySize = "Company size is required";
        if (!formData.industry) newErrors.industry = "Industry is required";
        break;
      case 4:
        if (!formData.primaryUseCase) newErrors.primaryUseCase = "Primary use case is required";
        break;
      case 6:
        if (!formData.expectedUserCount) newErrors.expectedUserCount = "Expected user count is required";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Signup data:', formData);
      navigate('/admin3');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendedPlan = () => {
    const hasEnterpriseFeatures = formData.enterpriseFeatures.length > 0;
    const isLargeCompany = ["201-500", "501-1000", "1000+"].includes(formData.companySize);
    const expectedUsers = parseInt(formData.expectedUserCount.split('-')[0] || '0');
    
    if (hasEnterpriseFeatures || isLargeCompany || expectedUsers > 100) {
      return "enterprise";
    } else if (expectedUsers > 20) {
      return "professional";
    } else {
      return "starter";
    }
  };

  const getStepTitle = () => {
    const titles = ["Get started", "Basic information", "Company profile", "Primary use case", "Current tools", "Enterprise features", showAllPlans ? "Choose your plan" : "Recommended plan for you"];
    return titles[currentStep - 1];
  };

  const getStepDescription = () => {
    const descriptions = [
      "Create your account to begin building your community.",
      "Tell us about yourself to personalize your experience.",
      "Help us understand your company details.",
      "What's your main goal for building a community?",
      "Select tools you use for seamless integration.",
      "Configure enterprise security and compliance features.",
      ""
    ];
    return descriptions[currentStep - 1];
  };

  // Step 1: Email/Auth method
  const renderStep1 = () => (
    <div className="flex flex-col gap-5">
      <Input
        label="Work email"
        type="email"
        placeholder="john@company.com"
        value={formData.email}
        onChange={handleInputChange('email')}
        isInvalid={!!errors.email}
        hint={errors.email}
        isRequired
      />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-primary text-tertiary">or</span>
        </div>
      </div>

      <Button
        className="w-full"
        color="secondary"
        size="md"
        onClick={() => setFormData(prev => ({ ...prev, authMethod: 'google' }))}
        iconLeading={({ className }) => (
          <svg className={cx(className, "w-5 h-5")} viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
      >
        Continue with Google
      </Button>
    </div>
  );

  // Step 2: Basic Info
  const renderStep2 = () => (
    <div className="flex flex-col gap-5">
      {formData.authMethod === 'email' && (
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleInputChange('password')}
          isInvalid={!!errors.password}
          hint={errors.password || "Must be at least 8 characters"}
          isRequired
        />
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First name"
          placeholder="John"
          value={formData.firstName}
          onChange={handleInputChange('firstName')}
          isInvalid={!!errors.firstName}
          hint={errors.firstName}
          isRequired
        />
        <Input
          label="Last name" 
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleInputChange('lastName')}
          isInvalid={!!errors.lastName}
          hint={errors.lastName}
          isRequired
        />
      </div>

      <Input
        label="Job title"
        placeholder="CEO, CTO, Product Manager..."
        value={formData.jobTitle}
        onChange={handleInputChange('jobTitle')}
        isInvalid={!!errors.jobTitle}
        hint={errors.jobTitle}
        isRequired
      />
    </div>
  );

  // Step 3: Company Profile
  const renderStep3 = () => (
    <div className="flex flex-col gap-5">
      <Input
        label="Company name"
        placeholder="Acme Inc."
        value={formData.companyName}
        onChange={handleInputChange('companyName')}
        isInvalid={!!errors.companyName}
        hint={errors.companyName}
        isRequired
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Company size"
          placeholder="Select size"
          selectedKey={formData.companySize}
          onSelectionChange={(value) => handleInputChange('companySize')(value as string)}
          isInvalid={!!errors.companySize}
          hint={errors.companySize}
          isRequired
        >
          {COMPANY_SIZES.map(size => (
            <Select.Item key={size.value} id={size.value}>
              {size.label}
            </Select.Item>
          ))}
        </Select>

        <Select
          label="Industry"
          placeholder="Select industry"
          selectedKey={formData.industry}
          onSelectionChange={(value) => handleInputChange('industry')(value as string)}
          isInvalid={!!errors.industry}
          hint={errors.industry}
          isRequired
        >
          {INDUSTRIES.map(industry => (
            <Select.Item key={industry.value} id={industry.value}>
              {industry.label}
            </Select.Item>
          ))}
        </Select>
      </div>

      <Input
        label="Company website"
        placeholder="https://yourcompany.com"
        value={formData.website}
        onChange={handleInputChange('website')}
        hint="Optional"
      />
    </div>
  );

  // Step 4: Primary Use Case
  const renderStep4 = () => (
    <div className="flex flex-col gap-5">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {USE_CASES.map(useCase => (
            <div key={useCase.value} className={cx(
              "flex items-center p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm",
              formData.primaryUseCase === useCase.value 
                ? "border-brand-solid bg-brand-50 shadow-sm" 
                : "border-secondary hover:border-gray-300"
            )}
            onClick={() => handleInputChange('primaryUseCase')(useCase.value)}
            >
              <input
                type="radio"
                name="primaryUseCase"
                value={useCase.value}
                checked={formData.primaryUseCase === useCase.value}
                onChange={(e) => handleInputChange('primaryUseCase')(e.target.value)}
                className="mr-3 pointer-events-none"
              />
              <div className="pointer-events-none flex-1 min-w-0">
                <div className="font-medium text-primary text-sm mb-1 truncate">{useCase.label}</div>
                <div className="text-xs text-tertiary truncate">{useCase.description}</div>
              </div>
            </div>
          ))}
        </div>
        {errors.primaryUseCase && (
          <p className="mt-2 text-sm text-error-primary">{errors.primaryUseCase}</p>
        )}
      </div>
    </div>
  );

  // Step 5: Popular Integrations - Compact Design
  const renderStep5 = () => (
    <div className="flex flex-col gap-5">
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SAAS_TOOLS.map(tool => (
            <div key={tool.id} className={cx(
              "flex items-center p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
              formData.currentTools.includes(tool.id)
                ? "border-brand-solid bg-brand-50 shadow-sm"
                : "border-secondary hover:border-gray-300"
            )}
            onClick={() => handleArrayToggle('currentTools')(tool.id)}
            >
              {/* Logo - Left side */}
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">
                <img 
                  src={tool.logo} 
                  alt={tool.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              {/* Text content - Right side */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-primary text-sm truncate">{tool.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 6: Enterprise Features - Compact Design
  const renderStep6 = () => (
    <div className="flex flex-col gap-5">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ENTERPRISE_FEATURES.map(feature => (
            <div key={feature.id} className={cx(
              "flex items-center p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
              formData.enterpriseFeatures.includes(feature.id)
                ? "border-brand-solid bg-brand-50 shadow-sm"
                : "border-secondary hover:border-gray-300"
            )}
            onClick={() => handleArrayToggle('enterpriseFeatures')(feature.id)}
            >
              <Shield01 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-primary text-sm mb-1">{feature.name}</div>
                <div className="text-xs text-tertiary">{feature.description}</div>
              </div>
              {formData.enterpriseFeatures.includes(feature.id) && (
                <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Select
        label="Expected users"
        placeholder="Select user count"
        selectedKey={formData.expectedUserCount}
        onSelectionChange={(value) => handleInputChange('expectedUserCount')(value as string)}
        isInvalid={!!errors.expectedUserCount}
        hint={errors.expectedUserCount}
        isRequired
      >
        <Select.Item id="1-20">1-20 users</Select.Item>
        <Select.Item id="21-50">21-50 users</Select.Item>
        <Select.Item id="51-100">51-100 users</Select.Item>
        <Select.Item id="101-500">101-500 users</Select.Item>
        <Select.Item id="500+">500+ users</Select.Item>
      </Select>
    </div>
  );

  // Step 7: Plan Selection
  const renderStep7 = () => {
    const recommendedPlanType = getRecommendedPlan();
    
    const plans = [
      {
        id: "starter",
        name: "Starter",
        price: "$0",
        period: "/month",
        description: "Ideal for hobbyists and individuals exploring web app creation.",
        features: [
          { icon: Globe01, text: "Bettermode.io Domain" },
          { icon: Star01, text: "Bettermode Badge" },
          { icon: Users01, text: "100 Members" },
          { icon: Building01, text: "20 Spaces" }
        ],
        buttonText: "Start for free",
        buttonStyle: "secondary",
        recommended: recommendedPlanType === "starter"
      },
      {
        id: "pro", 
        name: "Pro",
        price: "$49",
        period: "/month",
        description: "Designed for creators and startups scaling their products.",
        features: [
          { icon: Users01, text: "Unlimited Members" },
          { icon: Globe01, text: "Custom Domain" },
          { icon: Headphones01, text: "Priority support" },
          { icon: TrendUp01, text: "Advanced Analytics" },
          { icon: Zap, text: "Scale with add-ons" }
        ],
        buttonText: "Try free for 14 days",
        buttonStyle: "primary",
        recommended: recommendedPlanType === "professional"
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Tailored for excellence in scalability, security, and support.",
        features: [
          { icon: CheckCircle, text: "Guaranteed SLA" },
          { icon: Globe01, text: "Data Residency" },
          { icon: Shield01, text: "SOC 2 (Type 2)" },
          { icon: Lock01, text: "Advanced security & controls" },
          { icon: User01, text: "Dedicated account support" }
        ],
        buttonText: "Book a Demo",
        buttonStyle: "dark",
        recommended: recommendedPlanType === "enterprise"
      }
    ];

    const displayPlans = showAllPlans ? plans : plans.filter(plan => plan.id === recommendedPlanType);

    return (
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className={cx(
          "gap-4 max-w-5xl mx-auto px-8",
          showAllPlans ? "grid grid-cols-1 lg:grid-cols-3" : "flex justify-center"
        )}>
          {displayPlans.map(plan => (
          <div key={plan.id} className={cx(
            "relative p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg flex flex-col",
            formData.selectedPlan === plan.id && plan.recommended
              ? "border-purple-300 bg-gradient-to-b from-purple-100/50 to-white"
              : formData.selectedPlan === plan.id
              ? "border-brand-300 bg-brand-25"
              : plan.recommended
              ? "border-gray-200 bg-gradient-to-b from-purple-50/40 to-white hover:border-gray-300"
              : "border-gray-200 hover:border-gray-300",
            !showAllPlans && "max-w-md"
          )}
          onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
          >
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                {plan.recommended && (
                  <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-md">
                    Recommended
                  </span>
                )}
              </div>
              <div className="mb-3">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-1">{plan.period}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
            </div>

            <div className="space-y-2 mb-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <feature.icon className="w-4 h-4 mr-3 text-gray-600" />
                  {feature.text}
                </div>
              ))}
            </div>

            {plan.id === "pro" && (
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Integrations</p>
                <div className="flex space-x-2">
                  <img src="./src/logo/s/zapier.svg" alt="Zapier" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/slack-new-logo.svg" alt="Slack" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/google-analytics-3.svg" alt="Analytics" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/Jira logo.svg" alt="Jira" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/hotjar-icon logo.svg" alt="Hotjar" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/mailchimp logo.svg" alt="MailChimp" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/make.svg" alt="Make" className="w-6 h-6 rounded" />
                </div>
              </div>
            )}

            {plan.id === "enterprise" && (
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Integrations</p>
                <div className="flex space-x-2">
                  <img src="./src/logo/s/salesforce.svg" alt="Salesforce" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/hubspot-1.svg" alt="HubSpot" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/zendesk-3.svg" alt="Zendesk" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/amplitude-icon logo.svg" alt="Amplitude" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/Mixpanel_Symbol_0.svg" alt="Mixpanel" className="w-6 h-6 rounded" />
                  <img src="./src/logo/s/microsoft-teams-1.svg" alt="Microsoft Teams" className="w-6 h-6 rounded" />
                </div>
              </div>
            )}

            {/* Card Footer - See more link */}
            <div className="mt-auto pt-3 border-t border-gray-200">
              <a 
                href="https://bettermode.com/pricing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-brand-secondary hover:text-brand-secondary_hover underline decoration-transparent hover:decoration-current underline-offset-2 transition-colors"
              >
                See more details →
              </a>
            </div>
            </div>
          ))}
          
          {!showAllPlans && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAllPlans(true)}
                className="text-sm text-brand-secondary hover:text-brand-secondary_hover underline decoration-transparent hover:decoration-current underline-offset-2 transition-colors"
              >
                Other plans →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Dynamic right-side content
  const renderRightSideContent = () => {

    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-8 h-full mt-16 px-8">
            <div className="text-left">
              <div className="text-left flex flex-col gap-4">
              <h2 className=" text-2xl font-base text-primary mb-8 leading-relaxed">
                More than <span className="font-bold">4 million</span> people across <span className="font-bold">2,000 enterprise </span>
                <span className="font-bold">communities</span> are empowered by{" "}
                <div className="inline-flex items-end mt-1 ">
                  <img 
                    src="./src/logo/Logo Final.svg" 
                    alt="bettermode" 
                    className="h-7 w-auto ml-1"
                  />
                </div>
              </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-left">
                  <div className="text-3xl font-bold text-primary mb-2">4,000,000<span className="text-2xl">+</span></div>
                  <div className="text-sm text-tertiary font-medium">People</div>
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-primary mb-2">2,000<span className="text-2xl">+</span></div>
                  <div className="text-sm text-tertiary font-medium">Enterprise communities</div>
                </div>
              </div>

              <div className="flex justify-left items-center">
                <div className="flex -space-x-3">
                  {TESTIMONIALS.slice(0, 4).map((t, i) => (
                    <img key={i} className="w-10 h-10 rounded-full border-3 border-white shadow-sm" src={t.avatar} alt="" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-3 border-white bg-black flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-bold">•••</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <figure className="flex flex-col gap-6">
            <blockquote>
              <p className="text-lg font-medium text-primary leading-relaxed">
                {TESTIMONIALS[0].quote}
              </p>
            </blockquote>
            <figcaption className="flex items-start gap-3">
              <img 
                src={TESTIMONIALS[0].avatar}
                alt={TESTIMONIALS[0].author}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(TESTIMONIALS[0].author)}&background=6366f1&color=fff`;
                }}
              />
              <div className="flex-1">
                <p className="font-semibold text-primary text-sm">— {TESTIMONIALS[0].author}</p>
                <cite className="text-sm text-tertiary not-italic">{TESTIMONIALS[0].title}</cite>
                <cite className="text-sm font-medium text-secondary not-italic">{TESTIMONIALS[0].company}</cite>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </figcaption>
          </figure>
        );
    }
  };

  return (
    <div className="bg-primary antialiased">
      <section className="flex min-h-screen bg-primary lg:grid lg:grid-cols-1 xl:grid xl:grid-cols-[2fr_1fr]">
        {/* Left Column - Form (2/3) - Scrollable */}
        <div className="flex w-full flex-col bg-primary xl:h-screen xl:overflow-hidden">
          <div className="flex-1 xl:overflow-y-auto xl:scrollbar-thin">
            <div className="flex justify-center px-4 py-8 sm:py-12 md:px-6 lg:px-8 xl:py-16">
              <div className="flex w-full flex-col gap-6 sm:gap-8 max-w-xl lg:max-w-2xl xl:max-w-lg pb-8">
                {/* Logo and Step Indicator */}
                <div className="flex flex-col gap-6">
                  <div className="flex h-8 w-max items-center justify-start overflow-visible max-md:hidden">
                    <img 
                      src="./src/logo/Logo Final.svg" 
                      alt="bettermode" 
                      className="h-6 w-auto"
                    />
                  </div>
                  
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-center md:hidden">
                    <img 
                      src="./src/logo/Logo Final.svg" 
                      alt="bettermode" 
                      className="h-8 w-auto"
                    />
                  </div>

                  {/* Purple Minimal Progress */}
                  <div className="w-full bg-purple-100 rounded-full h-0.5">
                    <div 
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep - 1) / 6) * 100}%` }}
                    />
                  </div>

                  {/* Step Content */}
                  <div className="flex flex-col gap-2 mt-10">
                    <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">{getStepTitle()}</h1>
                    <p className="text-md text-tertiary">{getStepDescription()}</p>
                  </div>
                </div>

                {/* Mobile Stats - Show impressive numbers on mobile */}
                {currentStep === 1 && (
                  <div className="xl:hidden bg-gradient-to-r from-brand-50 to-purple-50 rounded-lg p-6 border border-brand-200">
                    <div className="text-center">
                      <h3 className="text-sm font-bold text-primary mb-4 leading-relaxed">
                        More than <span className="text-lg font-extrabold text-brand-solid">4 million</span> people across <span className="text-lg font-extrabold text-brand-solid">2,000</span> enterprise communities
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-extrabold text-primary">4,000,000+</div>
                          <div className="text-xs text-tertiary font-medium">People</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-extrabold text-primary">2,000+</div>
                          <div className="text-xs text-tertiary font-medium">Communities</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Content */}
                <div className="flex flex-col gap-6">
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}
                  {currentStep === 5 && renderStep5()}
                  {currentStep === 6 && renderStep6()}
                  {currentStep === 7 && renderStep7()}

                  {/* Mobile testimonial - shows on small screens */}
                  {(currentStep === 3 || currentStep === 5) && (
                    <div className="xl:hidden bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-start gap-3">
                        <img 
                          src={TESTIMONIALS[1].avatar}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 italic mb-2">
                            "{TESTIMONIALS[1].quote.substring(0, 120)}..."
                          </p>
                          <div className="flex items-center justify-between">
                            <cite className="text-xs text-gray-600 not-italic">
                              — {TESTIMONIALS[1].author}
                            </cite>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star01 key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}


                  {/* Sign in link */}
                  {currentStep === 1 && (
                    <div className="flex justify-center gap-1 text-center">
                      <span className="text-sm text-tertiary">Already have an account?</span>
                      <button 
                        onClick={() => navigate('/login')}
                        className="text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover"
                      >
                        Sign in
                      </button>
                    </div>
                  )}

                  {/* Terms and Privacy */}
                  {currentStep === 1 && (
                    <p className="text-xs text-tertiary text-center">
                      By creating an account, you agree to our{" "}
                      <a href="/terms" className="text-brand-secondary hover:text-brand-secondary_hover">Terms</a>
                      {" "}and{" "}
                      <a href="/privacy" className="text-brand-secondary hover:text-brand-secondary_hover">Privacy Policy</a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="xl:hidden p-4 border-t border-gray-200">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button 
                  className="flex-1"
                  color="secondary" 
                  iconLeading={ArrowLeft}
                  onClick={handleBack}
                  size="md"
                >
                  Back
                </Button>
              )}
              
              {currentStep < 7 ? (
                <Button 
                  className={currentStep > 1 ? "flex-[4]" : "w-full"}
                  iconTrailing={ArrowRight}
                  onClick={handleNext}
                  size="md"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  className={currentStep > 1 ? "flex-[4]" : "w-full"}
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  size="md"
                >
                  {formData.selectedPlan === "starter" 
                    ? "Create Account" 
                    : formData.selectedPlan === "pro" 
                    ? "Try free for 14 days"
                    : formData.selectedPlan === "enterprise" 
                    ? "Book Demo" 
                    : "Try free for 14 days"}
                </Button>
              )}
            </div>
          </div>

          {/* Desktop Footer */}
          <footer className="hidden xl:flex xl:items-center xl:justify-between p-8 pt-4">
            <p className="text-sm text-tertiary">© Bettermode 2025</p>
            
            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button 
                  className="flex-1"
                  color="secondary" 
                  iconLeading={ArrowLeft}
                  onClick={handleBack}
                  size="md"
                >
                  Back
                </Button>
              )}
              
              {currentStep < 7 ? (
                <Button 
                  className={currentStep > 1 ? "flex-[4]" : "w-full"}
                  iconTrailing={ArrowRight}
                  onClick={handleNext}
                  size="md"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  className={currentStep > 1 ? "flex-[4]" : "w-full"}
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  size="md"
                >
                  {formData.selectedPlan === "starter" 
                    ? "Create Account" 
                    : formData.selectedPlan === "pro" 
                    ? "Try free for 14 days"
                    : formData.selectedPlan === "enterprise" 
                    ? "Book Demo" 
                    : "Try free for 14 days"}
                </Button>
              )}
            </div>
          </footer>
        </div>

        {/* Right Column - Dynamic Marketing Content (1/3) - Fixed */}
        <div className="relative hidden w-full bg-tertiary xl:flex xl:flex-col xl:h-screen xl:overflow-hidden">
          <div className="flex flex-col gap-6 p-6 xl:p-8 h-full">
            {renderRightSideContent()}
            
            {/* Bottom trust signals */}
            <div className="mt-auto">
              <div className="flex items-end gap-4 overflow-x-auto">
                <img src="./src/logo/G2/G2 - high performer.svg" alt="G2 High Performer" className="h-14 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all flex-shrink-0" />
                <div className="flex flex-col items-center flex-shrink-0">
                  <Shield01 className="w-8 h-8 text-gray-400 grayscale opacity-60 hover:opacity-100 transition-all mb-1" />
                  <span className="text-xs text-tertiary font-medium">SOC 2</span>
                </div>
                <img src="./src/logo/G2/Ease of use -.svg" alt="G2 Ease of Use" className="h-14 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all flex-shrink-0" />
                <img src="./src/logo/G2/G2 -leaders.svg" alt="G2 Leaders" className="h-14 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all flex-shrink-0" />
                <div className="flex flex-col items-center flex-shrink-0">
                  <Shield01 className="w-8 h-8 text-gray-400 grayscale opacity-60 hover:opacity-100 transition-all mb-1" />
                  <span className="text-xs text-tertiary font-medium">GDPR</span>
                </div>
                <img src="./src/logo/G2/G2 momentom leader.svg" alt="G2 Momentum Leader" className="h-14 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all flex-shrink-0" />
                <img src="./src/logo/G2/G2 -support.svg" alt="G2 Support" className="h-14 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};