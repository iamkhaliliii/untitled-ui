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
  { value: "product-feedback", label: "Product Feedback", description: "Collect user feedback" }
];

const SAAS_TOOLS = [
  { id: "salesforce", name: "Salesforce", category: "CRM", icon: "🏢" },
  { id: "hubspot", name: "HubSpot", category: "CRM", icon: "🎯" },
  { id: "intercom", name: "Intercom", category: "Support", icon: "💬" },
  { id: "zendesk", name: "Zendesk", category: "Support", icon: "🎧" },
  { id: "slack", name: "Slack", category: "Communication", icon: "💼" },
  { id: "teams", name: "MS Teams", category: "Communication", icon: "📹" },
  { id: "analytics", name: "Analytics", category: "Analytics", icon: "📊" },
  { id: "stripe", name: "Stripe", category: "Payments", icon: "💳" }
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
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
  },
  {
    quote: "Our experience with Bettermode has been fantastic—it's become an essential part of how we support and engage our users.",
    author: "Lizbeth Ramos", 
    title: "Developer Community Manager",
    company: "XANO",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
  },
  {
    quote: "Bettermode's automated reputation system and robust content organization features helped us drive engagement with a personalized approach.",
    author: "Marlee Margolin",
    title: "CSR Activation Manager", 
    company: "IBM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
  }
];

export const SignupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
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
    selectedPlan: ""
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
        if (!formData.primaryUseCase) newErrors.primaryUseCase = "Primary use case is required";
        break;
      case 5:
        if (!formData.expectedUserCount) newErrors.expectedUserCount = "Expected user count is required";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
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
    const titles = ["Get started", "Basic information", "Company profile", "Current tools", "Enterprise features", "Choose your plan"];
    return titles[currentStep - 1];
  };

  const getStepDescription = () => {
    const descriptions = [
      "Create your account to begin building your community.",
      "Tell us about yourself to personalize your experience.",
      "Help us understand your company and goals.",
      "Select tools you use for seamless integration.",
      "Configure enterprise security and compliance features.",
      `Based on your profile, we recommend the ${getRecommendedPlan()} plan.`
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
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
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

      <div>
        <Label isRequired>Primary use case</Label>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              <div className="pointer-events-none flex-1">
                <div className="font-medium text-primary text-sm">{useCase.label}</div>
                <div className="text-xs text-tertiary">{useCase.description}</div>
              </div>
              {formData.primaryUseCase === useCase.value && (
                <CheckCircle className="w-4 h-4 text-green-500 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
        {errors.primaryUseCase && (
          <p className="mt-2 text-sm text-error-primary">{errors.primaryUseCase}</p>
        )}
      </div>
    </div>
  );

  // Step 4: Popular Integrations - Compact Design
  const renderStep4 = () => (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Select your current tools</Label>
        <p className="text-sm text-tertiary mb-4">We'll prioritize these integrations</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-3">
          {SAAS_TOOLS.map(tool => (
            <div key={tool.id} className={cx(
              "flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
              formData.currentTools.includes(tool.id)
                ? "border-brand-solid bg-brand-50 shadow-sm"
                : "border-secondary hover:border-gray-300"
            )}
            onClick={() => handleArrayToggle('currentTools')(tool.id)}
            >
              <div className="text-2xl mb-2">{tool.icon}</div>
              <div className="text-center">
                <div className="font-medium text-primary text-sm mb-1">{tool.name}</div>
                <div className="text-xs text-tertiary">{tool.category}</div>
              </div>
              {formData.currentTools.includes(tool.id) && (
                <CheckCircle className="w-4 h-4 text-green-500 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 5: Enterprise Features - Compact Design
  const renderStep5 = () => (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Enterprise features needed</Label>
        <p className="text-sm text-tertiary mb-4">Select any enterprise requirements</p>
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

  // Step 6: Plan Selection
  const renderStep6 = () => {
    const recommendedPlan = getRecommendedPlan();
    
    const plans = [
      {
        id: "starter",
        name: "Starter",
        price: "$29",
        period: "/month",
        description: "Perfect for small teams",
        features: ["Up to 50 members", "Basic integrations", "Standard support"],
        recommended: recommendedPlan === "starter"
      },
      {
        id: "professional", 
        name: "Professional",
        price: "$99",
        period: "/month",
        description: "For growing companies",
        features: ["Up to 500 members", "Advanced integrations", "Priority support"],
        recommended: recommendedPlan === "professional"
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large organizations",
        features: ["Unlimited members", "All integrations", "Dedicated CSM"],
        recommended: recommendedPlan === "enterprise"
      }
    ];

    return (
      <div className="flex flex-col gap-3">
        {plans.map(plan => (
          <div key={plan.id} className={cx(
            "flex items-start p-4 rounded-lg border-2 cursor-pointer transition-colors",
            plan.recommended 
              ? "border-brand-solid bg-brand-50" 
              : formData.selectedPlan === plan.id
              ? "border-brand-solid bg-brand-50"
              : "border-secondary hover:border-gray-300"
          )}
          onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
          >
            <input
              type="radio"
              name="selectedPlan"
              value={plan.id}
              checked={formData.selectedPlan === plan.id}
              onChange={(e) => setFormData(prev => ({ ...prev, selectedPlan: e.target.value }))}
              className="mt-1 mr-3 pointer-events-none"
            />
            <div className="flex-1 pointer-events-none">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-primary">{plan.name}</div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">{plan.price}</span>
                  <span className="text-tertiary text-sm">{plan.period}</span>
                </div>
              </div>
              <p className="text-sm text-tertiary mb-3">{plan.description}</p>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-xs text-tertiary">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.recommended && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Recommended
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Dynamic right-side content
  const renderRightSideContent = () => {

    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-6 h-full">
            <div className="text-center">
              <h2 className="text-sm font-bold text-primary mb-6 leading-relaxed">
                More than <span className="text-xl font-extrabold">4 million</span> people across <span className="text-xl font-extrabold">2,000</span> enterprise communities are empowered by <span className="text-brand-solid">Bettermode</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-primary">4,000,000+</div>
                  <div className="text-sm text-tertiary font-medium">People</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-primary">2,000+</div>
                  <div className="text-sm text-tertiary font-medium">Enterprise communities</div>
                </div>
              </div>

              <div className="flex justify-center items-center mb-6">
                <div className="flex -space-x-2">
                  {TESTIMONIALS.slice(0, 3).map((t, i) => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={t.avatar} alt="" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">•••</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm flex-1">
              <h3 className="font-semibold text-primary mb-4">Why choose our platform?</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-secondary">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Setup in under 5 minutes
                </li>
                <li className="flex items-center text-sm text-secondary">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  50+ pre-built integrations
                </li>
                <li className="flex items-center text-sm text-secondary">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Enterprise-grade security
                </li>
              </ul>
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
                    <Building01 className="w-8 h-8 text-brand-solid mr-2" />
                    <span className="text-xl font-bold text-primary">CommunityOS</span>
                  </div>
                  
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-center md:hidden">
                    <Building01 className="w-10 h-10 text-brand-solid" />
                  </div>

                  {/* Progress Steps */}
                  <div className="flex items-center justify-center xl:justify-start overflow-x-auto">
                    <div className="flex items-center min-w-max">
                      {[1, 2, 3, 4, 5, 6].map((step) => (
                        <div key={step} className="flex items-center">
                          <div className={cx(
                            "flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium transition-all",
                            step < currentStep ? "bg-green-100 text-green-700" : 
                            step === currentStep ? "bg-brand-solid text-white shadow-lg" : 
                            "bg-gray-100 text-gray-400"
                          )}>
                            {step < currentStep ? <CheckCircle className="w-3.5 h-3.5" /> : step}
                          </div>
                          {step < 6 && (
                            <div className={cx(
                              "w-6 h-0.5 mx-1.5 transition-all",
                              step < currentStep ? "bg-green-200" : "bg-gray-200"
                            )} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex flex-col gap-2">
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

                  {/* Navigation */}
                  <div className="flex flex-col gap-4">
                    {currentStep < 6 ? (
                      <Button 
                        className="w-full"
                        iconTrailing={ArrowRight}
                        onClick={handleNext}
                        size="md"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        isLoading={isLoading}
                        onClick={handleSubmit}
                        iconTrailing={CheckCircle}
                        size="md"
                      >
                        {formData.selectedPlan === "enterprise" ? "Contact Sales" : "Create Account"}
                      </Button>
                    )}

                    {currentStep > 1 && (
                      <Button 
                        className="w-full"
                        color="secondary" 
                        iconLeading={ArrowLeft}
                        onClick={handleBack}
                        size="md"
                      >
                        Back
                      </Button>
                    )}
                  </div>

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
          
          {/* Footer */}
          <footer className="hidden xl:block p-8 pt-4">
            <p className="text-sm text-tertiary">© CommunityOS 2024</p>
          </footer>
        </div>

        {/* Right Column - Dynamic Marketing Content (1/3) - Fixed */}
        <div className="relative hidden w-full bg-tertiary xl:flex xl:flex-col xl:h-screen xl:overflow-hidden">
          <div className="flex flex-col gap-6 p-6 xl:p-8 h-full">
            {renderRightSideContent()}
            
            {/* Bottom trust signals */}
            <div className="mt-auto">
              <div className="flex items-center gap-4 text-xs text-tertiary">
                <div className="flex items-center">
                  <Shield01 className="w-3 h-3 mr-1 text-green-400" />
                  SOC 2
                </div>
                <div className="flex items-center">
                  <Shield01 className="w-3 h-3 mr-1 text-green-400" />
                  GDPR
                </div>
                <div className="flex items-center">
                  <Shield01 className="w-3 h-3 mr-1 text-green-400" />
                  99.9% Uptime
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};