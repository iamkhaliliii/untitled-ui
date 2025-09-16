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
  TrendUp01,
  ChevronLeft,
  ChevronRight,
  InfoCircle
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { cx } from "@/utils/cx";

interface SignupFormData {
  email: string;
  authMethod: 'email' | 'google';
  verificationCode: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
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
const GROWTH_ENTERPRISE_TOOLS = [
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

const ENTERPRISE_FEATURES = [
  { id: "saml-sso", name: "SAML single sign-on", description: "Seamlessly enable enterprise-grade authentication and secure access.", icon: Lock01 },
  { id: "data-residency", name: "Data residency", description: "Control where your data resides, ensuring compliance with regional regulations.", icon: Globe01 },
  { id: "soc2", name: "SOC 2 (Type 2)", description: "Certifies our security policies and controls meet the highest industry standards.", icon: Shield01 },
  { id: "gdpr-ccpa", name: "GDPR & CCPA", description: "Your data privacy is safeguarded with full compliance with EU regulations.", icon: Lock01 },
  { id: "uptime-sla", name: "Uptime SLA", description: "We guarantee exceptional service reliability with a robust uptime commitment.", icon: Target01 },
  { id: "data-encryption", name: "Data Encryption", description: "Your data is always protected with industry-leading encryption in transit and at rest.", icon: Lock01 },
  { id: "jwt", name: "JWT", description: "Leverage secure, stateless authentication tokens for fast and reliable access control.", icon: Shield01 },
  { id: "audit-log", name: "Audit Log", description: "Monitor a detailed trail of user actions, ensuring transparency and security.", icon: Database01 }
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
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showIndustrySearch, setShowIndustrySearch] = useState(false);
  const [showRoleSearch, setShowRoleSearch] = useState(false);
  const [customRole, setCustomRole] = useState("");
  const [billingPeriod, setBillingPeriod] = useState<'annual' | 'monthly'>('annual');
  const [g2CarouselIndex, setG2CarouselIndex] = useState(0);
  const [selectedSecurityLevel, setSelectedSecurityLevel] = useState<'basic' | 'enterprise' | null>(null);
  
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    authMethod: 'email',
    verificationCode: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
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

  const handleResendCode = () => {
    // Simulate sending code
    setResendCooldown(30);
    const timer = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validateStep = (step: number): boolean => {
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
      // case 10: COMMENTED OUT - Expected user count step
      // if (!formData.expectedUserCount) newErrors.expectedUserCount = "Expected user count is required";
      // break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (skipValidation = false) => {
    if (skipValidation || validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 11));
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
      return "growth";
    } else {
      return "starter";
    }
  };

  const getStepTitle = () => {
    const titles = ["First, enter your email", "Check your email for a code", "What is your name?", "What industry are you in?", "Which best describes your role?", "What is your company's name?", `How many people work at ${formData.companyName || 'your company'}?`, `What is ${formData.companyName || 'your company'}'s website?`, "Communities are much more powerful with awesome integrations", /* "How many users do you expect?", */ "Enterprise features", ""];
    return titles[currentStep - 1];
  };

  const getStepDescription = () => {
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
      "Configure enterprise security and compliance features.",
      "",
      ""
    ];
    return descriptions[currentStep - 1];
  };

  // Step 1: Email/Auth method
  const renderStep1 = () => (
    <div className="flex flex-col gap-5">
      <Input
        type="email"
        placeholder="name@work-email.com"
        value={formData.email}
        onChange={handleInputChange('email')}
        isInvalid={!!errors.email}
        hint={errors.email}
        isRequired
      />
      
      {/* Continue Button - Always show in step 1 */}
      <Button
        className="w-full"
        iconTrailing={ArrowRight}
        onClick={() => handleNext()}
        size="md"
      >
        Continue
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-primary" />
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

  // Step 2: Email Verification
  const renderStep2 = () => {
    const handleCodeChange = (value: string) => {
      // Only allow alphanumeric characters and limit to 6
      const cleanValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
      handleInputChange('verificationCode')(cleanValue);
    };

    const renderCodeInputs = () => {
      const code = formData.verificationCode;
      const inputs = [];
      
      for (let i = 0; i < 6; i++) {
        inputs.push(
          <div key={i} className="relative">
            <input
              type="text"
              maxLength={1}
              value={code[i] || ''}
              onChange={(e) => {
                const newCode = code.split('');
                newCode[i] = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                const updatedCode = newCode.join('').slice(0, 6);
                handleInputChange('verificationCode')(updatedCode);
                
                // Auto-focus next input
                if (e.target.value && i < 5) {
                  const target = e.target as HTMLInputElement;
                  // Find all code inputs in the document
                  const allInputs = document.querySelectorAll('input[type="text"][maxlength="1"]');
                  const nextInput = allInputs[i + 1] as HTMLInputElement;
                  nextInput?.focus();
                }
              }}
              onKeyDown={(e) => {
                // Handle backspace
                if (e.key === 'Backspace' && !code[i] && i > 0) {
                  const target = e.target as HTMLInputElement;
                  // Find all code inputs in the document
                  const allInputs = document.querySelectorAll('input[type="text"][maxlength="1"]');
                  const prevInput = allInputs[i - 1] as HTMLInputElement;
                  prevInput?.focus();
                }
              }}
              className={cx(
                "w-12 h-12 sm:w-14 sm:h-14 text-center text-base sm:text-lg font-semibold border rounded-lg bg-primary text-primary",
                "focus:outline-none focus:ring-2 focus:ring-brand-solid focus:border-brand-solid",
                "placeholder:text-placeholder",
                errors.verificationCode ? "border-error-primary" : "border-primary"
              )}
            />
          </div>
        );
      }
      
      return inputs;
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
          <div className="flex gap-2 sm:gap-3">
            {renderCodeInputs().slice(0, 3)}
          </div>
          <span className="text-quaternary text-base sm:text-lg mx-1 sm:mx-2">-</span>
          <div className="flex gap-2 sm:gap-3">
            {renderCodeInputs().slice(3, 6)}
          </div>
        </div>
        
        {errors.verificationCode && (
          <p className="text-sm text-error-primary text-center">{errors.verificationCode}</p>
        )}

        <Button
          className="w-full"
          iconTrailing={ArrowRight}
          onClick={() => handleNext()}
          size="md"
          isDisabled={formData.verificationCode.length !== 6}
        >
          Next
        </Button>

        <div className="text-center space-y-3">
          <div className="text-sm text-tertiary">
            Didn't get the email?{" "}
            {resendCooldown > 0 ? (
              <span className="text-quaternary">Resend in {resendCooldown}s</span>
            ) : (
              <button 
                onClick={handleResendCode}
                className="text-brand-secondary hover:text-brand-secondary_hover font-medium"
              >
                Resend
              </button>
            )}
            {" "}or{" "}
            <button 
              onClick={() => setCurrentStep(1)}
              className="text-brand-secondary hover:text-brand-secondary_hover font-medium"
            >
              edit your email address
            </button>
          </div>
          
          <p className="text-sm text-tertiary">
            Can't find your code? Check your spam folder!
          </p>
        </div>
      </div>
    );
  };

  // Step 3: Basic Info
  const renderStep3 = () => (
    <div className="flex flex-col gap-5">
        <Input
          label="First name"
        placeholder=""
          value={formData.firstName}
          onChange={handleInputChange('firstName')}
          isInvalid={!!errors.firstName}
          hint={errors.firstName}
          isRequired
        />
      
        <Input
          label="Last name" 
        placeholder=""
          value={formData.lastName}
          onChange={handleInputChange('lastName')}
          isInvalid={!!errors.lastName}
          hint={errors.lastName}
          isRequired
        />

      <div className="flex justify-end">
        <Button
          iconTrailing={ArrowRight}
          onClick={() => handleNext()}
          size="sm"
          isDisabled={!formData.firstName.trim() || !formData.lastName.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 4: Industry Selection
  const renderStep4 = () => {
    const industries = [
      { id: "b2b-saas", name: "B2B SaaS" },
      { id: "software", name: "Computer Software" },
      { id: "technology", name: "Technology and Services" },
      { id: "ai", name: "AI" },
      { id: "medical-saas", name: "Medical SaaS" },
      { id: "martech", name: "MarTech" },
      { id: "adtech", name: "AdTech" },
      { id: "marketplace", name: "Online Marketplace" },
      { id: "edtech", name: "EdTech" },
      { id: "dev-tools", name: "Dev Tools" },
      { id: "other", name: "Other" }
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {industries.map(industry => (
            <button
              key={industry.id}
              onClick={() => {
                handleInputChange('industry')(industry.id);
                // If "Other" is selected, reset search state and just show the button
                if (industry.id === 'other') {
                  setShowIndustrySearch(false);
                } else {
                  // For all other selections, auto-advance to next step
                setTimeout(() => {
                  handleNext(true);
                }, 300);
                }
              }}
              className={cx(
                "p-3 sm:p-4 h-14 sm:h-16 rounded-lg border text-center transition-all hover:shadow-sm flex items-center justify-center",
                formData.industry === industry.id
                  ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                  : "border-secondary hover:border-primary"
              )}
            >
              <span className="text-xs sm:text-sm font-medium text-primary">{industry.name}</span>
            </button>
          ))}
        </div>

        {(!showIndustrySearch && formData.industry === 'other') ? (
          <button
            onClick={() => setShowIndustrySearch(true)}
            className="mx-auto text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover underline decoration-transparent hover:decoration-brand-secondary underline-offset-2 transition-all"
          >
            Can't find your industry? Search all industries here
          </button>
        ) : null}

        {showIndustrySearch ? (
          <div className="flex flex-col gap-3">
            <Select.ComboBox 
              label="Search industries" 
              placeholder="Type to search..." 
              items={[
                { label: "Accounting", id: "accounting" },
                { label: "Advertising & Marketing", id: "advertising" },
                { label: "Aerospace & Defense", id: "aerospace" },
                { label: "Agriculture", id: "agriculture" },
                { label: "Airlines/Aviation", id: "airlines" },
                { label: "Alternative Dispute Resolution", id: "adr" },
                { label: "Alternative Medicine", id: "alternative-medicine" },
                { label: "Animation", id: "animation" },
                { label: "Apparel & Fashion", id: "apparel" },
                { label: "Architecture & Planning", id: "architecture" },
                { label: "Arts & Crafts", id: "arts" },
                { label: "Automotive", id: "automotive" },
                { label: "Aviation & Aerospace", id: "aviation" },
                { label: "Banking", id: "banking" },
                { label: "Biotechnology", id: "biotechnology" },
                { label: "Broadcast Media", id: "broadcast" },
                { label: "Building Materials", id: "building-materials" },
                { label: "Business Supplies & Equipment", id: "business-supplies" },
                { label: "Capital Markets", id: "capital-markets" },
                { label: "Chemicals", id: "chemicals" },
                { label: "Civic & Social Organization", id: "civic" },
                { label: "Civil Engineering", id: "civil-engineering" },
                { label: "Commercial Real Estate", id: "commercial-real-estate" },
                { label: "Computer & Network Security", id: "cybersecurity" },
                { label: "Computer Games", id: "gaming" },
                { label: "Computer Hardware", id: "hardware" },
                { label: "Computer Networking", id: "networking" },
                { label: "Computer Software", id: "software" },
                { label: "Construction", id: "construction" },
                { label: "Consumer Electronics", id: "consumer-electronics" },
                { label: "Consumer Goods", id: "consumer-goods" },
                { label: "Consumer Services", id: "consumer-services" },
                { label: "Cosmetics", id: "cosmetics" },
                { label: "Dairy", id: "dairy" },
                { label: "Defense & Space", id: "defense" },
                { label: "Design", id: "design" },
                { label: "E-Learning", id: "elearning" },
                { label: "Education Management", id: "education" },
                { label: "Electrical/Electronic Manufacturing", id: "electronics" },
                { label: "Entertainment", id: "entertainment" },
                { label: "Environmental Services", id: "environmental" },
                { label: "Events Services", id: "events" },
                { label: "Executive Office", id: "executive" },
                { label: "Facilities Services", id: "facilities" },
                { label: "Farming", id: "farming" },
                { label: "Financial Services", id: "financial" },
                { label: "Fine Art", id: "fine-art" },
                { label: "Fishery", id: "fishery" },
                { label: "Food & Beverages", id: "food" },
                { label: "Food Production", id: "food-production" },
                { label: "Fund-Raising", id: "fundraising" },
                { label: "Furniture", id: "furniture" },
                { label: "Gambling & Casinos", id: "gambling" },
                { label: "Glass, Ceramics & Concrete", id: "glass" },
                { label: "Government Administration", id: "government" },
                { label: "Government Relations", id: "government-relations" },
                { label: "Graphic Design", id: "graphic-design" },
                { label: "Health, Wellness & Fitness", id: "health" },
                { label: "Healthcare", id: "healthcare" },
                { label: "Higher Education", id: "higher-education" },
                { label: "Hospital & Health Care", id: "hospital" },
                { label: "Hospitality", id: "hospitality" },
                { label: "Human Resources", id: "hr" },
                { label: "Import & Export", id: "import-export" },
                { label: "Individual & Family Services", id: "family-services" },
                { label: "Industrial Automation", id: "automation" },
                { label: "Information Services", id: "information-services" },
                { label: "Information Technology & Services", id: "technology" },
                { label: "Insurance", id: "insurance" },
                { label: "International Affairs", id: "international" },
                { label: "International Trade & Development", id: "trade" },
                { label: "Internet", id: "internet" },
                { label: "Investment Banking", id: "investment-banking" },
                { label: "Investment Management", id: "investment" },
                { label: "Judiciary", id: "judiciary" },
                { label: "Law Enforcement", id: "law-enforcement" },
                { label: "Law Practice", id: "law" },
                { label: "Legal Services", id: "legal" },
                { label: "Legislative Office", id: "legislative" },
                { label: "Leisure, Travel & Tourism", id: "travel" },
                { label: "Libraries", id: "libraries" },
                { label: "Logistics & Supply Chain", id: "logistics" },
                { label: "Luxury Goods & Jewelry", id: "luxury" },
                { label: "Machinery", id: "machinery" },
                { label: "Management Consulting", id: "consulting" },
                { label: "Maritime", id: "maritime" },
                { label: "Market Research", id: "market-research" },
                { label: "Marketing & Advertising", id: "marketing" },
                { label: "Mechanical or Industrial Engineering", id: "engineering" },
                { label: "Media Production", id: "media" },
                { label: "Medical Devices", id: "medical-devices" },
                { label: "Medical Practice", id: "medical" },
                { label: "Mental Health Care", id: "mental-health" },
                { label: "Military", id: "military" },
                { label: "Mining & Metals", id: "mining" },
                { label: "Motion Pictures & Film", id: "film" },
                { label: "Museums & Institutions", id: "museums" },
                { label: "Music", id: "music" },
                { label: "Nanotechnology", id: "nanotechnology" },
                { label: "Newspapers", id: "newspapers" },
                { label: "Non-Profit Organization Management", id: "nonprofit" },
                { label: "Oil & Energy", id: "oil-energy" },
                { label: "Online Media", id: "online-media" },
                { label: "Outsourcing/Offshoring", id: "outsourcing" },
                { label: "Package/Freight Delivery", id: "delivery" },
                { label: "Packaging & Containers", id: "packaging" },
                { label: "Paper & Forest Products", id: "paper" },
                { label: "Performing Arts", id: "performing-arts" },
                { label: "Pharmaceuticals", id: "pharmaceuticals" },
                { label: "Philanthropy", id: "philanthropy" },
                { label: "Photography", id: "photography" },
                { label: "Plastics", id: "plastics" },
                { label: "Political Organization", id: "political" },
                { label: "Primary/Secondary Education", id: "education-k12" },
                { label: "Printing", id: "printing" },
                { label: "Professional Training & Coaching", id: "training" },
                { label: "Program Development", id: "program-development" },
                { label: "Public Policy", id: "public-policy" },
                { label: "Public Relations & Communications", id: "pr" },
                { label: "Public Safety", id: "public-safety" },
                { label: "Publishing", id: "publishing" },
                { label: "Railroad Manufacture", id: "railroad" },
                { label: "Ranching", id: "ranching" },
                { label: "Real Estate", id: "real-estate" },
                { label: "Recreational Facilities & Services", id: "recreation" },
                { label: "Religious Institutions", id: "religious" },
                { label: "Renewables & Environment", id: "renewables" },
                { label: "Research", id: "research" },
                { label: "Restaurants", id: "restaurants" },
                { label: "Retail", id: "retail" },
                { label: "Security & Investigations", id: "security" },
                { label: "Semiconductors", id: "semiconductors" },
                { label: "Shipbuilding", id: "shipbuilding" },
                { label: "Sporting Goods", id: "sporting-goods" },
                { label: "Sports", id: "sports" },
                { label: "Staffing & Recruiting", id: "staffing" },
                { label: "Supermarkets", id: "supermarkets" },
                { label: "Telecommunications", id: "telecom" },
                { label: "Textiles", id: "textiles" },
                { label: "Think Tanks", id: "think-tanks" },
                { label: "Tobacco", id: "tobacco" },
                { label: "Translation & Localization", id: "translation" },
                { label: "Transportation/Trucking/Railroad", id: "transportation" },
                { label: "Utilities", id: "utilities" },
                { label: "Venture Capital & Private Equity", id: "venture-capital" },
                { label: "Veterinary", id: "veterinary" },
                { label: "Warehousing", id: "warehousing" },
                { label: "Wholesale", id: "wholesale" },
                { label: "Wine & Spirits", id: "wine" },
                { label: "Wireless", id: "wireless" },
                { label: "Writing & Editing", id: "writing" }
              ]}
              onSelectionChange={(value) => {
                if (value) {
                  handleInputChange('industry')(value as string);
                  setTimeout(() => {
                    handleNext(true);
                  }, 300);
                }
              }}
            >
              {(item) => (
                <Select.Item id={item.id} supportingText={item.supportingText}>
                  {item.label}
                </Select.Item>
              )}
            </Select.ComboBox>
          </div>
        ) : null}

        {errors.industry && (
          <p className="text-sm text-error-primary text-center">{errors.industry}</p>
        )}
      </div>
    );
  };

  // Step 5: Role Selection
  const renderStep5 = () => {
    const roles = [
      { id: "community-manager", name: "Community Manager" },
      { id: "customer-success", name: "Customer Success" },
      { id: "product-marketing", name: "Product Marketing" },
      { id: "customer-marketing", name: "Customer Marketing" },
      { id: "growth-marketing", name: "Growth Marketing" },
      { id: "revops", name: "RevOps" }
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => {
                handleInputChange('role')(role.id);
                // Auto-advance to next step after selection
                setTimeout(() => {
                  handleNext(true);
                }, 300);
              }}
              className={cx(
                "p-3 sm:p-4 rounded-lg border text-center transition-all hover:shadow-sm h-14 sm:h-16 flex items-center justify-center",
                formData.role === role.id
                  ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                  : "border-secondary hover:border-primary"
              )}
            >
              <span className="text-xs sm:text-sm font-medium text-primary">{role.name}</span>
            </button>
          ))}
        </div>

        {!showRoleSearch ? (
          <button
            onClick={() => setShowRoleSearch(true)}
            className="mx-auto text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover underline decoration-transparent hover:decoration-brand-secondary underline-offset-2 transition-all"
          >
            None of these describe my role
          </button>
        ) : (
          <div className="flex flex-col gap-3">
      <Input
              label="Describe your role"
              placeholder="Type your role..."
              value={customRole}
              onChange={setCustomRole}
              autoFocus
            />
            
            {customRole.trim() && (
              <div className="flex justify-end">
                <Button
                  iconTrailing={ArrowRight}
                  onClick={() => {
                    handleInputChange('role')(customRole);
                    setTimeout(() => {
                      handleNext(true);
                    }, 300);
                  }}
                  size="sm"
                >
                  Continue
                </Button>
              </div>
            )}
            </div>
        )}

        {errors.role && (
          <p className="text-sm text-error-primary text-center">{errors.role}</p>
        )}
    </div>
  );
  };

  // Step 6: Company Profile
  const renderStep6 = () => (
    <div className="flex flex-col gap-5">
      <Input
        label="Company name"
        placeholder=""
        value={formData.companyName}
        onChange={handleInputChange('companyName')}
        isInvalid={!!errors.companyName}
        hint={errors.companyName}
        isRequired
      />

      <div className="flex justify-end">
        <Button
          iconTrailing={ArrowRight}
          onClick={() => handleNext()}
          size="sm"
          isDisabled={!formData.companyName.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 7: Company Size Selection
  const renderStep7 = () => {
    const companySizes = [
      { id: "under-50", name: "Under 50" },
      { id: "50-200", name: "50 to 200" },
      { id: "200-500", name: "200 to 500" },
      { id: "over-500", name: "Over 500" }
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {companySizes.map(size => (
            <button
              key={size.id}
              onClick={() => {
                handleInputChange('companySize')(size.id);
                // Auto-advance to next step after selection
                setTimeout(() => {
                  handleNext(true);
                }, 300);
              }}
              className={cx(
                "p-3 sm:p-4 rounded-lg border text-center transition-all hover:shadow-sm h-14 sm:h-16 flex items-center justify-center",
                formData.companySize === size.id
                  ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                  : "border-secondary hover:border-primary"
              )}
            >
              <span className="text-xs sm:text-sm font-medium text-primary">{size.name}</span>
            </button>
          ))}
      </div>

        {errors.companySize && (
          <p className="text-sm text-error-primary text-center">{errors.companySize}</p>
        )}
    </div>
  );
  };

  // Step 8: Company Website
  const renderStep8 = () => (
    <div className="flex flex-col gap-5">
      <InputGroup 
        label={`${formData.companyName || 'Company'} website URL`}
        leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
      >
        <Input 
          placeholder="www.company-website.com" 
          value={formData.website}
          onChange={handleInputChange('website')}
        />
      </InputGroup>

      <div className="flex justify-end items-center gap-6">
        <button
          onClick={() => handleNext()}
          className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
        >
          Skip
        </button>
        
        <Button
          iconTrailing={ArrowRight}
          onClick={() => handleNext()}
          size="sm"
          isDisabled={!formData.website.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 9: Popular Integrations - Compact Design
  const renderStep9 = () => (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex justify-end mb-3">
          <button
            onClick={() => {
              const allToolIds = SAAS_TOOLS.map(tool => tool.id);
              const allSelected = allToolIds.every(id => formData.currentTools.includes(id));
              
              if (allSelected) {
                // Unselect all tools
                setFormData(prev => ({ ...prev, currentTools: [] }));
              } else {
                // Select all tools
                setFormData(prev => ({ ...prev, currentTools: allToolIds }));
              }
            }}
            className="text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover underline decoration-transparent hover:decoration-brand-secondary underline-offset-2 transition-all"
          >
            {SAAS_TOOLS.every(tool => formData.currentTools.includes(tool.id)) ? 'Unselect all' : 'Select all'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {SAAS_TOOLS.map(tool => (
            <div key={tool.id} className={cx(
              "flex items-center p-2 sm:p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
              formData.currentTools.includes(tool.id)
                ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                : "border-secondary hover:border-primary"
            )}
            onClick={() => handleArrayToggle('currentTools')(tool.id)}
            >
              {/* Logo - Left side */}
              {tool.logo && (
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">
                <img 
                  src={tool.logo} 
                  alt={tool.name}
                  className={cx(
                    "max-w-full max-h-full object-contain",
                    (tool.id === "cookie-consent" || tool.id === "custom-code") && "logo-filter"
                  )}
                />
              </div>
              )}
              
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-primary text-xs sm:text-sm truncate">{tool.name}</div>
              </div>
              
              {/* Info icon - Right side - Only for Growth/Enterprise tools */}
              {GROWTH_ENTERPRISE_TOOLS.includes(tool.id) && (
                <div className="flex-shrink-0 ml-2">
                  <InfoCircle className=" w-3 h-3 text-orange-500" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Helper note */}
        <div className="mt-3 bg-secondary/30 rounded-lg">
          <p className="text-xs text-tertiary text-left">
            <InfoCircle className="w-3 h-3 inline mr-1 text-orange-500" />
            These integrations are only available in Growth and Enterprise plans.
          </p>
        </div>
      </div>


      <div className="flex justify-end items-center gap-6">
        <button
          onClick={() => handleNext()}
          className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
        >
          No integrations needed for now
        </button>
        
        <Button
          iconTrailing={ArrowRight}
          onClick={() => handleNext()}
          size="sm"
          isDisabled={formData.currentTools.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 10: Expected Users - COMMENTED OUT
  /*
  const renderStep10 = () => {
    const userCounts = [
      { id: "under-10000", name: "Under 10,000" },
      { id: "10000-25000", name: "10,000 to 25,000" },
      { id: "25000-50000", name: "25,000 to 50,000" },
      { id: "over-50000", name: "Over 50,000" }
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {userCounts.map(count => (
            <button
              key={count.id}
              onClick={() => {
                handleInputChange('expectedUserCount')(count.id);
                // Auto-advance to next step after selection
                setTimeout(() => {
                  handleNext(true);
                }, 300);
              }}
              className={cx(
                "p-4 rounded-lg border text-center transition-all hover:shadow-sm",
                formData.expectedUserCount === count.id
                  ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                  : "border-secondary hover:border-primary"
              )}
            >
              <span className="text-sm font-medium text-primary">{count.name}</span>
            </button>
          ))}
        </div>

        {errors.expectedUserCount && (
          <p className="text-sm text-error-primary text-center">{errors.expectedUserCount}</p>
        )}
      </div>
    );
  };
  */

  // Step 11: Enterprise Features - 2 Column Design
  const renderStep11 = () => {
    const handleSecuritySelection = (level: 'basic' | 'enterprise') => {
      setSelectedSecurityLevel(level);
      
      if (level === 'basic') {
        // Clear enterprise features and set basic security
                setFormData(prev => ({ ...prev, enterpriseFeatures: [] }));
              } else {
        // Select all enterprise features
        const allFeatureIds = ENTERPRISE_FEATURES.map(feature => feature.id);
                setFormData(prev => ({ ...prev, enterpriseFeatures: allFeatureIds }));
              }
      
      // Auto-advance to next step after selection
      setTimeout(() => {
        handleNext(true);
      }, 300);
    };

    return (
      <div className="flex flex-col gap-6">
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card - Basic Security */}
          <div 
            className={cx(
              "p-6 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
              selectedSecurityLevel === 'basic'
                ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                : "border-secondary bg-secondary/10 hover:border-primary"
            )}
            onClick={() => handleSecuritySelection('basic')}
          >
            <h3 className="text-lg font-semibold text-primary mb-4">Basic Security Features</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lock01 className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-primary text-sm mb-1">Data Encryption</div>
                  <div className="text-xs text-tertiary">Your data is always protected with industry-leading encryption in transit and at rest.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield01 className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-primary text-sm mb-1">Basic Security Features</div>
                  <div className="text-xs text-tertiary">Standard security measures to protect your community and data.</div>
                </div>
              </div>
            </div>
        </div>
        
          {/* Right Card - Enterprise Features */}
          <div 
            className={cx(
              "p-6 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
              selectedSecurityLevel === 'enterprise'
                ? "border-brand-solid bg-brand-primary/50 shadow-sm"
                : "border-secondary bg-secondary/10 hover:border-primary"
            )}
            onClick={() => handleSecuritySelection('enterprise')}
          >
            <h3 className="text-lg font-semibold text-primary mb-4">Enterprise Features</h3>
            <div className="space-y-3">
              {ENTERPRISE_FEATURES.map(feature => (
                <div key={feature.id} className="flex items-start gap-3">
                  <feature.icon className="w-4 h-4 text-brand-secondary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-primary text-sm mb-1">{feature.name}</div>
                    <div className="text-xs text-tertiary">{feature.description}</div>
              </div>
            </div>
          ))}
      </div>

            {/* Enterprise Plan Note */}
            <div className="mt-4 pt-4 border-t border-secondary/50">
              <p className="text-xs text-tertiary">
                <InfoCircle className="w-3 h-3 inline mr-1 text-orange-500" />
                These features are only available in Enterprise plan.
              </p>
            </div>
          </div>
      </div>
    </div>
  );
  };

  // Step 12: Plan Selection - Full Width Layout
  const renderStep12 = () => {
    const recommendedPlanType = getRecommendedPlan();
    
    // Auto-select recommended plan if no plan is selected yet
    if (formData.selectedPlan === "pro" || !formData.selectedPlan) {
      setFormData(prev => ({ ...prev, selectedPlan: recommendedPlanType }));
    }
    
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

    return (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 w-full">
        
        {/* Left Side - Back Button + Recommendation Text */}
        <div className="flex flex-col gap-8">
      <div className="">
            <button 
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          
          <div className="text-left">
            {/* Personalized Recommendation Letter */}
            <div className="space-y-6">
      <div className="">
                <div className="text-xl text-primary leading-normal">
                  <div className="mb-2 space-y-0.5">
                    <p>Dear <span className="font-semibold">{formData.firstName} {formData.lastName}</span>,</p>
                    <p>
                      As <span className="font-semibold capitalize">{formData.role || 'your role'}</span> from{" "}
                      <span className="font-semibold">{formData.companyName || 'your company'}</span>
                    </p>
                  </div>
                   <div className="mb-1">
                     <p className="inline">
                       We will try to recommend the best plan to fit your needs in the{" "}
                       <span className="font-semibold capitalize">
                         {formData.industry ? 
                           formData.industry.replace('-', ' ') : 
                           'your selected industry'
                         }
                       </span>{" "}
                       industry and for a{" "}
                       <span className="font-semibold">
                         {formData.companySize ? 
                           (formData.companySize === "just-me" ? "solo" : 
                            formData.companySize.includes("-") ? formData.companySize + " people" : 
                            formData.companySize + " people") : 
                           'your company size'
                         }
                       </span>{" "}
                       company
                     </p>
                     {formData.currentTools.length > 0 && (
                       <span className="inline">
                         {" "}using{" "}
                         <span className="inline-flex items-center mx-1">
                           <span className="flex -space-x-1">
                             {formData.currentTools.slice(0, 5).map(toolId => {
                               const tool = SAAS_TOOLS.find(t => t.id === toolId);
                               return tool && tool.logo ? (
                                  <div key={toolId} className="w-6 h-6 bg-primary rounded-full border border-secondary flex items-center justify-center">
                                   <img 
                                     src={tool.logo} 
                                     alt={tool.name}
                                     className={cx(
                                       "w-4 h-4 object-contain",
                                       (tool.id === "cookie-consent" || tool.id === "custom-code") && "logo-filter"
                                     )}
                                   />
                                 </div>
                               ) : null;
                             })}
                             {formData.currentTools.length > 5 && (
                                <div className="w-6 h-6 bg-secondary rounded-full border border-secondary flex items-center justify-center">
                                  <span className="text-[9px] font-medium text-tertiary">
                                   +{formData.currentTools.length - 5}
                                 </span>
                               </div>
                             )}
                           </span>
                         </span>
                         {formData.expectedUserCount && ", and "}
                       </span>
                     )}
                     {formData.expectedUserCount && (
                       <span className="inline">
                         {!formData.currentTools.length && " "}expecting{" "}
                         <span className="font-semibold">
                           {(() => {
                             const count = formData.expectedUserCount;
                             if (count.startsWith('under-')) {
                               return count.replace('under-', 'under ').replace('10000', '10,000');
                             } else if (count.startsWith('over-')) {
                               return count.replace('over-', 'over ').replace('50000', '50,000');
                             } else {
                               return count.replace('-', ' to ').replace('10000', '10,000').replace('25000', '25,000').replace('50000', '50,000');
                             }
                           })()} users
                         </span>
                       </span>
                     )}
                     <span className="inline">.</span>
                   </div>
                   <p className="text-lg mt-8 font-semibold text-primary">
                     Our recommendation: <span className="text-brand-secondary capitalize">{getRecommendedPlan()}</span> Plan
                   </p>
                </div>
              </div>

              {/* Plan Recommendation Reasoning */}
              <div className="">
                <h3 className="text-sm font-semibold text-primary mb-3">
                  {formData.selectedPlan === getRecommendedPlan() 
                    ? `Why we recommend the ${getRecommendedPlan()} plan`
                    : `Why ${formData.selectedPlan} might not be ideal for you`
                  }
                </h3>
                <div className="text-sm text-tertiary leading-relaxed">
                  {(() => {
                    const recommendedPlan = getRecommendedPlan();
                    const selectedPlan = formData.selectedPlan;
                    const hasEnterpriseFeatures = formData.enterpriseFeatures.length > 0;
                    const isLargeCompany = ["201-500", "501-1000", "1000+"].includes(formData.companySize);
                    const expectedUsers = parseInt(formData.expectedUserCount?.split('-')?.[0] || '0');
                    
                    // If selected plan matches recommended plan
                    if (selectedPlan === recommendedPlan) {
                      if (recommendedPlan === "enterprise") {
                        const reasons = [];
                        if (hasEnterpriseFeatures) reasons.push("enterprise features selected");
                        if (isLargeCompany) reasons.push("large company size");
                        if (expectedUsers > 100) reasons.push(`${expectedUsers}+ expected users`);
                        
                        return `Based on your ${reasons.join(", ")}, the Enterprise plan offers the security, scalability, and dedicated support your organization needs.`;
                      } else if (recommendedPlan === "growth") {
                        return `With ${expectedUsers > 0 ? expectedUsers + "+ expected users" : "your expected user count"} and growth plans, the Growth plan provides the right balance of features and scalability.`;
                      } else {
                        return "The Starter plan is perfect for getting started with all essential community features while maintaining cost efficiency.";
                      }
                    }
                    
                    // If selected plan is different from recommended
                    const missingFeatures = [];
                    
                    if (recommendedPlan === "enterprise" && selectedPlan !== "enterprise") {
                      if (hasEnterpriseFeatures) missingFeatures.push("enterprise security features you selected");
                      if (isLargeCompany) missingFeatures.push("scalability for your company size");
                      if (expectedUsers > 100) missingFeatures.push("capacity for your expected user count");
                      
                      return `You'll be missing: ${missingFeatures.join(", ")}. Consider upgrading to Enterprise for better fit.`;
                    } else if (recommendedPlan === "growth" && selectedPlan === "starter") {
                      missingFeatures.push("advanced integrations", "API access");
                      if (expectedUsers > 20) missingFeatures.push("sufficient user capacity");
                      
                      return `You'll be missing: ${missingFeatures.join(", ")}. Consider upgrading to Growth for better scalability.`;
                    } else if (recommendedPlan === "starter" && selectedPlan !== "starter") {
                      return "You're selecting more features than needed based on your requirements. The Starter plan would be more cost-effective.";
                    }
                    
                    return "Your selection looks good!";
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Pricing Cards */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-semibold text-primary">Choose your plan</h2>
            <div className="flex bg-secondary rounded-lg p-1 mx-auto sm:mx-0">
              <button
                onClick={() => setBillingPeriod('annual')}
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
                onClick={() => setBillingPeriod('monthly')}
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
               const recommendedPlan = getRecommendedPlan();
               const sortedPlans = [
                 ...plans.filter(plan => plan.id === recommendedPlan),
                 ...plans.filter(plan => plan.id !== recommendedPlan)
               ];
               return sortedPlans.map((plan, index) => (
        <div className={cx(
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
          onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
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
              <div className="flex flex-wrap gap-2 justify-start">
                {plan.id === "starter" ? (
                  <>
                    <img src="/logos/s/google-analytics-3.svg" alt="Google Analytics" className="w-5 h-5 rounded" />
                    <img src="/logos/s/cookie-svgrepo-com.svg" alt="Cookie Consent Manager" className="w-5 h-5 rounded logo-filter" />
                    <img src="/logos/s/zapier.svg" alt="Zapier" className="w-5 h-5 rounded" />
                    <img src="/logos/s/make.svg" alt="Make.com" className="w-5 h-5 rounded" />
                    <img src="/logos/s/slack-new-logo.svg" alt="Slack" className="w-5 h-5 rounded" />
                    <img src="/logos/s/discord.svg" alt="Discord" className="w-5 h-5 rounded" />
                    <img src="/logos/s/mailchimp logo.svg" alt="Mailchimp" className="w-5 h-5 rounded" />
                  </>
                ) : plan.id === "growth" ? (
                  <>
                    <img src="/logos/s/google-analytics-3.svg" alt="Google Analytics" className="w-5 h-5 rounded" />
                    <img src="/logos/s/cookie-svgrepo-com.svg" alt="Cookie Consent Manager" className="w-5 h-5 rounded logo-filter" />
                    <img src="/logos/s/zapier.svg" alt="Zapier" className="w-5 h-5 rounded" />
                    <img src="/logos/s/make.svg" alt="Make.com" className="w-5 h-5 rounded" />
                    <img src="/logos/s/slack-new-logo.svg" alt="Slack" className="w-5 h-5 rounded" />
                    <img src="/logos/s/discord.svg" alt="Discord" className="w-5 h-5 rounded" />
                    <img src="/logos/s/mailchimp logo.svg" alt="Mailchimp" className="w-5 h-5 rounded" />
                    <img src="/logos/s/google-tag-manager logo.svg" alt="Google Tag Manager" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Custom-Code-Snippet.svg" alt="Custom Code Snippet" className="w-5 h-5 rounded logo-filter" />
                    <img src="/logos/s/Usercentrics_idibjbvDVZ_0.svg" alt="Usercentrics" className="w-5 h-5 rounded" />
                    <img src="/logos/s/OneTrust.svg" alt="OneTrust" className="w-5 h-5 rounded" />
                    <img src="/logos/s/fullstory-logo.svg" alt="Fullstory" className="w-5 h-5 rounded" />
                    <img src="/logos/s/hotjar-icon logo.svg" alt="Hotjar" className="w-5 h-5 rounded" />
                    <img src="/logos/s/amplitude-icon logo.svg" alt="Amplitude" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Mixpanel_Symbol_0.svg" alt="Mixpanel" className="w-5 h-5 rounded" />
                    <img src="/logos/s/hubspot-1.svg" alt="Hubspot" className="w-5 h-5 rounded" />
                    <img src="/logos/s/zendesk-3.svg" alt="Zendesk" className="w-5 h-5 rounded" />
                    <img src="/logos/s/intercom-2.svg" alt="Intercom" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Jira logo.svg" alt="Jira" className="w-5 h-5 rounded" />
                    <img src="/logos/s/salesforce.svg" alt="Salesforce" className="w-5 h-5 rounded" />
                  </>
                ) : (
                  <>
                    <img src="/logos/s/google-analytics-3.svg" alt="Google Analytics" className="w-5 h-5 rounded" />
                    <img src="/logos/s/cookie-svgrepo-com.svg" alt="Cookie Consent Manager" className="w-5 h-5 rounded logo-filter" />
                    <img src="/logos/s/zapier.svg" alt="Zapier" className="w-5 h-5 rounded" />
                    <img src="/logos/s/make.svg" alt="Make.com" className="w-5 h-5 rounded" />
                    <img src="/logos/s/slack-new-logo.svg" alt="Slack" className="w-5 h-5 rounded" />
                    <img src="/logos/s/discord.svg" alt="Discord" className="w-5 h-5 rounded" />
                    <img src="/logos/s/mailchimp logo.svg" alt="Mailchimp" className="w-5 h-5 rounded" />
                    <img src="/logos/s/google-tag-manager logo.svg" alt="Google Tag Manager" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Custom-Code-Snippet.svg" alt="Custom Code Snippet" className="w-5 h-5 rounded logo-filter" />
                    <img src="/logos/s/Usercentrics_idibjbvDVZ_0.svg" alt="Usercentrics" className="w-5 h-5 rounded" />
                    <img src="/logos/s/OneTrust.svg" alt="OneTrust" className="w-5 h-5 rounded" />
                    <img src="/logos/s/fullstory-logo.svg" alt="Fullstory" className="w-5 h-5 rounded" />
                    <img src="/logos/s/hotjar-icon logo.svg" alt="Hotjar" className="w-5 h-5 rounded" />
                    <img src="/logos/s/amplitude-icon logo.svg" alt="Amplitude" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Mixpanel_Symbol_0.svg" alt="Mixpanel" className="w-5 h-5 rounded" />
                    <img src="/logos/s/hubspot-1.svg" alt="Hubspot" className="w-5 h-5 rounded" />
                    <img src="/logos/s/zendesk-3.svg" alt="Zendesk" className="w-5 h-5 rounded" />
                    <img src="/logos/s/intercom-2.svg" alt="Intercom" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Jira logo.svg" alt="Jira" className="w-5 h-5 rounded" />
                    <img src="/logos/s/salesforce.svg" alt="Salesforce" className="w-5 h-5 rounded" />
                  </>
                )}
              </div>
            </div>

            {/* Card Footer - Action Button */}
            <div className="mt-auto pt-4 border-t border-tertiary">
              <Button
                className="w-full"
                color={plan.buttonStyle === "primary" ? "primary" : plan.buttonStyle === "secondary" ? "secondary" : "tertiary"}
                size="sm"
                onClick={() => {
                  setFormData(prev => ({ ...prev, selectedPlan: plan.id }));
                  handleSubmit();
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
                 ))
             })()}
          </div>
        </div>
      </div>
    );
  };

  // Dynamic right-side content
  const renderRightSideContent = () => {

    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-6  text-center max-w-md mx-auto">
            <div>
              {/* Title */}
              <div className="text-left flex flex-col gap-2 mb-6">
                <h2 className="text-4xl font-base text-primary ">
                  Why Leading Brands Choose{" "}
                  <span className="font-bold">Bettermode</span>
                </h2>
                <p className="text-[1.1rem]  text-tertiary">
                  Empower your enterprise with an all-in-one hub for communities, knowledge sharing, events, and more powered by Bettermode's scalable platform. designed to streamline collaboration, enhance customer engagement, and drive business growth across every touchpoint.
                </p>
                <h2 className="text-xl font-base mt-10 text-primary">
                The Community Platform Behind{" "}
                <span className="font-bold">Top Brands</span> <br />
                 
                </h2>
              </div>
              
              {/* Brand Logos Slider - 3 Horizontal Rows */}
              <div className="space-y-4">
                {/* First Row - Moving Left */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-infinite-scroll space-x-3">
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/hubspot.svg" alt="HubSpot" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/ibm.svg" alt="IBM" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/xano.svg" alt="Xano" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/CoachHub.svg" alt="CoachHub" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/lenovo.svg" alt="Lenovo" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                    
                    {/* Duplicate for seamless loop */}
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/hubspot.svg" alt="HubSpot" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/ibm.svg" alt="IBM" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/xano.svg" alt="Xano" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/CoachHub.svg" alt="CoachHub" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/lenovo.svg" alt="Lenovo" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                  </div>
                </div>

                {/* Second Row - Moving Right */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-infinite-scroll-reverse space-x-3">
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/intercom-1.svg" alt="Intercom" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/slack-2.svg" alt="Slack" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/zendesk-1.svg" alt="Zendesk" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/logitech.svg" alt="Logitech" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/viewsonic.svg" alt="ViewSonic" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                    
                    {/* Duplicate for seamless loop */}
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/intercom-1.svg" alt="Intercom" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/slack-2.svg" alt="Slack" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/zendesk-1.svg" alt="Zendesk" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/logitech.svg" alt="Logitech" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/viewsonic.svg" alt="ViewSonic" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                  </div>
                </div>

                {/* Third Row - Moving Left */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-infinite-scroll space-x-3">
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/yoto.svg" alt="Yoto" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/Ceros.svg" alt="Ceros" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/Flutterflow.svg" alt="FlutterFlow" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/preply.svg" alt="Preply" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/s/salesforce.svg" alt="Salesforce" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                    
                    {/* Duplicate for seamless loop */}
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/yoto.svg" alt="Yoto" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/Ceros.svg" alt="Ceros" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/Flutterflow.svg" alt="FlutterFlow" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/l_backup/preply.svg" alt="Preply" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                     <div className="w-24 h-16 bg-primary rounded-lg border border-secondary flex items-center justify-center px-3 flex-shrink-0 hover:border-primary transition-all">
                      <img src="/logos/s/salesforce.svg" alt="Salesforce" className="h-8 w-auto object-contain logo-filter-dark-only" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* HubSpot Logo at the top */}
              <div className="mb-6">
                <img 
                  src="/logos/hubspot.svg" 
                  alt="HubSpot" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 ">
                  Using Bettermode has been a game-changer for us. Its powerful capabilities and features have revolutionized the way we engage with our community, leading to more effective connections and experiences.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3 mb-6">
                <img 
                  src={TESTIMONIALS[0].avatar}
                  alt="Kyle Foster"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Kyle Foster")}&background=6366f1&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm">Kyle Foster</p>
                  <cite className="text-sm text-tertiary not-italic">Marketing Manager</cite>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* HubSpot Logo at the top */}
              <div className="mb-6">
                <img 
                  src="/logos/hubspot.svg" 
                  alt="HubSpot" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 ">
                  Using Bettermode has been a game-changer for us. Its powerful capabilities and features have revolutionized the way we engage with our community, leading to more effective connections and experiences.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3 mb-6">
                <img 
                  src={TESTIMONIALS[0].avatar}
                  alt="Kyle Foster"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Kyle Foster")}&background=6366f1&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm">Kyle Foster</p>
                  <cite className="text-sm text-tertiary not-italic">Marketing Manager</cite>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* HubSpot Logo at the top */}
              <div className="mb-6">
                <img 
                  src="/logos/hubspot.svg" 
                  alt="HubSpot" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 ">
                  Using Bettermode has been a game-changer for us. Its powerful capabilities and features have revolutionized the way we engage with our community, leading to more effective connections and experiences.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3 mb-6">
                <img 
                  src={TESTIMONIALS[0].avatar}
                  alt="Kyle Foster"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Kyle Foster")}&background=6366f1&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm">Kyle Foster</p>
                  <cite className="text-sm text-tertiary not-italic">Marketing Manager</cite>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* Xano Logo at the top */}
              <div className="mb-6">
                <img 
                  src="/logos/l_backup/xano.svg" 
                  alt="Xano" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 ">
                  Our experience with Bettermode has been fantastic—it's become an essential part of how we support and engage our users, and we're excited to see it evolve further with our community.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3 mb-6">
                <img 
                  src={TESTIMONIALS[1].avatar}
                  alt="Lizbeth Ramos"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Lizbeth Ramos")}&background=6366f1&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm">Lizbeth Ramos</p>
                  <cite className="text-sm text-tertiary not-italic">Developer Community Manager</cite>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* Xano Logo at the top */}
              <div className="mb-6">
                <img 
                  src="/logos/l_backup/xano.svg" 
                  alt="Xano" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 ">
                  Our experience with Bettermode has been fantastic—it's become an essential part of how we support and engage our users, and we're excited to see it evolve further with our community.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3 mb-6">
                <img 
                  src={TESTIMONIALS[1].avatar}
                  alt="Lizbeth Ramos"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Lizbeth Ramos")}&background=6366f1&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm">Lizbeth Ramos</p>
                  <cite className="text-sm text-tertiary not-italic">Developer Community Manager</cite>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* Xano Logo at the top */}
              <div className="mb-6">
                <img 
                  src="/logos/l_backup/xano.svg" 
                  alt="Xano" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 ">
                  Our experience with Bettermode has been fantastic—it's become an essential part of how we support and engage our users, and we're excited to see it evolve further with our community.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3 mb-6">
                <img 
                  src={TESTIMONIALS[1].avatar}
                  alt="Lizbeth Ramos"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Lizbeth Ramos")}&background=6366f1&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm">Lizbeth Ramos</p>
                  <cite className="text-sm text-tertiary not-italic">Developer Community Manager</cite>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* CoachHub Logo at the top */}
              <div className="mb-6">
                <img 
                  src="/logos/l_backup/CoachHub.svg" 
                  alt="CoachHub" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 ">
                  Bettermode was selected for its ease of use and for filling in almost all of our coaches' wishlist.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3 mb-6">
                <img 
                  src={TESTIMONIALS[3].avatar}
                  alt="Jennifer Serrat"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Jennifer Serrat")}&background=6366f1&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm">Jennifer Serrat</p>
                  <cite className="text-sm text-tertiary not-italic">Community Manager</cite>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* CoachHub Logo at the top */}
              <div className="mb-6">
                <img 
                  src="/logos/l_backup/CoachHub.svg" 
                  alt="CoachHub" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 ">
                  Bettermode was selected for its ease of use and for filling in almost all of our coaches' wishlist.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3 mb-6">
                <img 
                  src={TESTIMONIALS[3].avatar}
                  alt="Jennifer Serrat"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Jennifer Serrat")}&background=6366f1&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm">Jennifer Serrat</p>
                  <cite className="text-sm text-tertiary not-italic">Community Manager</cite>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star01 key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        );

      // case 10: COMMENTED OUT - Integration tools sidebar content
      // case 10:
      //   return (
      //     <div className="flex flex-col gap-8 px-8">
      //       <div className="text-left">
      //         <div className="text-left flex flex-col gap-2">
      //           <h2 className="text-3xl font-base text-primary">
      //             Works with the tools you already{" "}
      //             <span className="font-bold">trust</span>
      //           </h2>
      //           <p className="text-base text-tertiary mb-8">
      //             Use Bettermode as your standalone platform or embed it into your existing eco-system, website/application
      //           </p>
      //         </div>
      //         
      //         <div className="grid grid-cols-4 gap-6 mb-8">
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/salesforce.svg" alt="Salesforce" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/hubspot-1.svg" alt="HubSpot" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/slack-new-logo.svg" alt="Slack" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/microsoft-teams-1.svg" alt="Microsoft Teams" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/zapier.svg" alt="Zapier" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/stripe-4.svg" alt="Stripe" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/zendesk-3.svg" alt="Zendesk" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/intercom-2.svg" alt="Intercom" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/google-analytics-3.svg" alt="Google Analytics" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/mailchimp logo.svg" alt="MailChimp" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/make.svg" alt="Make" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //           <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      //             <img src="/logos/s/amplitude-icon logo.svg" alt="Amplitude" className="h-8 w-auto opacity-100 transition-opacity" />
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );

      case 10:
        return (
            <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* Title */}
              <div className="text-left flex flex-col gap-4">
                {/* Grow with confidence badge */}
                <div className="inline-flex w-fit">
                  <span className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full">
                    Grow with confidence
                  </span>
                </div>
                
                <h2 className="text-4xl font-base text-primary">
                  Enterprise-grade {" "}
                  
                  <span className="font-bold">security & compliance</span>
                </h2>
                <p className="text-xl text-tertiary mb-8 leading-relaxed">
                  Built from day one with a privacy-focused design and compliant approach to securing your data.
                </p>
              </div>
              
              {/* G2 Awards Logos - 3x2 Grid */}
              <div className="grid grid-cols-3 gap-x-0 gap-y-4 mt-4">
                <img 
                  src="/logos/G2/Ease of use -.svg" 
                  alt="G2 Ease of Use" 
                   className="h-32 w-32 border-2 border-secondary p-5 rounded-2xl bg-primary object-contain opacity-90 hover:opacity-100 transition-opacity mx-auto"
                />
                <img 
                  src="/logos/G2/G2 - ease of use bussines.svg" 
                  alt="G2 Ease of Use Business" 
                   className="h-32 w-32 border-2 border-secondary p-5 rounded-2xl bg-primary object-contain opacity-90 hover:opacity-100 transition-opacity mx-auto"
                />
                <img 
                  src="/logos/G2/G2 - high performer.svg" 
                  alt="G2 High Performer" 
                   className="h-32 w-32 border-2 border-secondary p-5 rounded-2xl bg-primary object-contain opacity-90 hover:opacity-100 transition-opacity mx-auto"
                />
                <img 
                  src="/logos/G2/G2 -leaders.svg" 
                  alt="G2 Leaders" 
                   className="h-32 w-32 border-2 border-secondary p-5 rounded-2xl bg-primary object-contain opacity-90 hover:opacity-100 transition-opacity mx-auto"
                />
                <img 
                  src="/logos/G2/G2 -support.svg" 
                  alt="G2 Support" 
                   className="h-32 w-32 border-2 border-secondary p-5 rounded-2xl bg-primary object-contain opacity-90 hover:opacity-100 transition-opacity mx-auto"
                />
                <img 
                  src="/logos/G2/G2 momentom leader.svg" 
                  alt="G2 Momentum Leader" 
                   className="h-32 w-32 border-2 border-secondary p-5 rounded-2xl bg-primary object-contain opacity-90 hover:opacity-100 transition-opacity mx-auto"
                />
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* Personalized Recommendation Letter */}
              <div className="space-y-6">
                <div className="">
                  <div className="text-2xl text-primary leading-normal">
                    <div className="mb-2 space-y-0.5">
                      <p>Dear <span className="font-semibold">{formData.firstName} {formData.lastName}</span>,</p>
                      <p>
                        As <span className="font-semibold capitalize">{formData.role || 'your role'}</span> from{" "}
                        <span className="font-semibold">{formData.companyName || 'your company'}</span>
                      </p>
                    </div>
                     <div className="mb-1">
                       <p className="inline">
                         We will try to recommend the best plan to fit your needs in the{" "}
                         <span className="font-semibold capitalize">
                           {formData.industry ? 
                             formData.industry.replace('-', ' ') : 
                             'your selected industry'
                           }
                         </span>{" "}
                         industry and for a{" "}
                         <span className="font-semibold">
                           {formData.companySize ? 
                             (formData.companySize === "just-me" ? "solo" : 
                              formData.companySize.includes("-") ? formData.companySize + " people" : 
                              formData.companySize + " people") : 
                             'your company size'
                           }
                         </span>{" "}
                         company
                       </p>
                       {formData.currentTools.length > 0 && (
                         <span className="inline">
                           {" "}using{" "}
                           <span className="inline-flex items-center mx-1">
                             <span className="flex -space-x-1">
                               {formData.currentTools.slice(0, 5).map(toolId => {
                                 const tool = SAAS_TOOLS.find(t => t.id === toolId);
                                 return tool && tool.logo ? (
                                    <div key={toolId} className="w-7 h-7 bg-primary rounded-full border border-secondary flex items-center justify-center">
                                     <img 
                                       src={tool.logo} 
                                       alt={tool.name}
                                       className={cx(
                                         "w-5 h-5 object-contain",
                                         (tool.id === "cookie-consent" || tool.id === "custom-code") && "logo-filter"
                                       )}
                                     />
                                   </div>
                                 ) : null;
                               })}
                               {formData.currentTools.length > 5 && (
                                  <div className="w-7 h-7 bg-secondary rounded-full border border-secondary flex items-center justify-center">
                                    <span className="text-[10px] font-medium text-tertiary">
                                     +{formData.currentTools.length - 5}
                                   </span>
                                 </div>
                               )}
                             </span>
                           </span>
                           {formData.expectedUserCount && ", and "}
                         </span>
                       )}
                       {formData.expectedUserCount && (
                         <span className="inline">
                           {!formData.currentTools.length && " "}expecting{" "}
                           <span className="font-semibold">
                             {(() => {
                               const count = formData.expectedUserCount;
                               if (count.startsWith('under-')) {
                                 return count.replace('under-', 'under ').replace('10000', '10,000');
                               } else if (count.startsWith('over-')) {
                                 return count.replace('over-', 'over ').replace('50000', '50,000');
                               } else {
                                 return count.replace('-', ' to ').replace('10000', '10,000').replace('25000', '25,000').replace('50000', '50,000');
                               }
                             })()} users
                           </span>
                         </span>
                       )}
                       <span className="inline">.</span>
                     </div>
                     <p className="text-lg mt-12 font-semibold text-primary">
                       Our recommendation: <span className="text-brand-secondary capitalize">{getRecommendedPlan()}</span> Plan
                     </p>
                  </div>
                </div>

                {/* Plan Recommendation Reasoning */}
                <div className={` ${
                  formData.selectedPlan === getRecommendedPlan() 
                    ? "" 
                    : ""
                }`}>
                  <h3 className="text-sm font-semibold text-primary mb-3">
                    {formData.selectedPlan === getRecommendedPlan() 
                      ? `Why we recommend the ${getRecommendedPlan()} plan`
                      : `Why ${formData.selectedPlan} might not be ideal for you`
                    }
                  </h3>
                  <div className="text-sm text-tertiary leading-relaxed">
                    {(() => {
                      const recommendedPlan = getRecommendedPlan();
                      const selectedPlan = formData.selectedPlan;
                      const hasEnterpriseFeatures = formData.enterpriseFeatures.length > 0;
                      const isLargeCompany = ["201-500", "501-1000", "1000+"].includes(formData.companySize);
                      const expectedUsers = parseInt(formData.expectedUserCount?.split('-')?.[0] || '0');
                      
                      // If selected plan matches recommended plan
                      if (selectedPlan === recommendedPlan) {
                        if (recommendedPlan === "enterprise") {
                          const reasons = [];
                          if (hasEnterpriseFeatures) reasons.push("enterprise features selected");
                          if (isLargeCompany) reasons.push("large company size");
                          if (expectedUsers > 100) reasons.push(`${expectedUsers}+ expected users`);
                          
                          return `Based on your ${reasons.join(", ")}, the Enterprise plan offers the security, scalability, and dedicated support your organization needs.`;
                        } else if (recommendedPlan === "growth") {
                          return `With ${expectedUsers > 0 ? expectedUsers + "+ expected users" : "your expected user count"} and growth plans, the Growth plan provides the right balance of features and scalability.`;
                        } else {
                          return "The Starter plan is perfect for getting started with all essential community features while maintaining cost efficiency.";
                        }
                      }
                      
                      // If selected plan is different from recommended
                      const missingFeatures = [];
                      
                      if (recommendedPlan === "enterprise" && selectedPlan !== "enterprise") {
                        if (hasEnterpriseFeatures) missingFeatures.push("enterprise security features you selected");
                        if (isLargeCompany) missingFeatures.push("scalability for your company size");
                        if (expectedUsers > 100) missingFeatures.push("capacity for your expected user count");
                        
                        return `You'll be missing: ${missingFeatures.join(", ")}. Consider upgrading to Enterprise for better fit.`;
                      } else if (recommendedPlan === "growth" && selectedPlan === "starter") {
                        missingFeatures.push("advanced integrations", "API access");
                        if (expectedUsers > 20) missingFeatures.push("sufficient user capacity");
                        
                        return `You'll be missing: ${missingFeatures.join(", ")}. Consider upgrading to Growth for better scalability.`;
                      } else if (recommendedPlan === "starter" && selectedPlan !== "starter") {
                        return "You're selecting more features than needed based on your requirements. The Starter plan would be more cost-effective.";
                      }
                      
                      return "Your selection looks good!";
                    })()}
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
      <section className={cx(
        "flex min-h-screen bg-primary lg:grid lg:grid-cols-1",
        currentStep === 11 ? "xl:grid-cols-1" : "xl:grid xl:grid-cols-[2fr_1fr]"
      )}>
        {/* Left Column - Form (2/3) - Scrollable */}
        <div className="flex w-full flex-col bg-primary xl:h-screen xl:overflow-hidden">
          {/* Header */}
          <header className="flex flex-col gap-4 px-4 py-4 sm:gap-6 sm:py-6 sm:px-6 md:px-8 lg:px-8 xl:px-8">
            {/* Logo */}
                  <div className="flex h-8 w-max items-center justify-start overflow-visible max-md:hidden">
                    <img 
                      src="/logo-bettermode.svg" 
                      alt="bettermode" 
                      className="h-6 w-auto logo-filter"
                    />
                  </div>
                  
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-center md:hidden">
                    <img 
                      src="/logo-bettermode.svg" 
                      alt="bettermode" 
                      className="h-8 w-auto logo-filter"
                    />
                  </div>

                  {/* Brand Progress */}
                  <div className="w-full bg-secondary rounded-full h-1">
                    <div 
                      className="h-full bg-brand-secondary rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep - 1) / 10) * 100}%` }}
                    />
                  </div>
          </header>

          <div className="flex-1 xl:overflow-y-auto xl:scrollbar-thin">
                <div className={cx(
              "flex justify-center items-start min-h-full py-6 sm:py-8 xl:py-8",
              currentStep === 11 ? "px-24" : "px-4 md:px-6 lg:px-8"
            )}>
                <div className={cx(
                  "flex w-full flex-col pb-6 sm:pb-8",
                  currentStep === 11 
                    ? "w-full" 
                    : currentStep >= 1 && currentStep <= 2
                    ? "max-w-sm sm:max-w-md"
                    : "max-w-lg sm:max-w-xl md:max-w-2xl gap-4 sm:gap-6 md:gap-8"
                )}>
                {/* Form Content */}
                <div className="flex flex-col gap-6">
                  {/* Step Content */}
                  <div className="flex flex-col gap-2">
                    {currentStep === 4 && (
                      <div className="">
                        <button 
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <p className="text-lg text-tertiary">Nice to meet you <span className="font-bold">{formData.firstName}</span>!</p>
                      </div>
                    )}
                    {currentStep === 5 && (
                      <div className="mb-1">
                        <button 
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      </div>
                    )}
                    {currentStep === 6 && (
                      <div className="mb-1">
                        <button 
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      </div>
                    )}
                    {currentStep === 7 && (
                      <div className="mb-1">
                        <button 
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      </div>
                    )}
                    {currentStep === 8 && (
                      <div className="mb-1">
                        <button 
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      </div>
                    )}
                    {currentStep === 9 && (
                      <div className="mb-1">
                        <button 
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      </div>
                    )}
                    {/* Step 10 back button - COMMENTED OUT 
                    {currentStep === 10 && (
                      <div className="mb-1">
                        <button 
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      </div>
                    )}
                    */}
                    {currentStep === 10 && (
                      <div className="mb-1">
                        <button 
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      </div>
                    )}
                    {currentStep !== 11 && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">{getStepTitle()}</h1>
                        <p className="text-md text-tertiary mt-2">{getStepDescription()}</p>
                      </div>
                        </div>
                      )}
                  </div>
                </div>

                {/* Mobile Stats - Show impressive numbers on mobile */}

                {/* Form Content */}
                {currentStep === 11 ? (
                  renderStep12()
                ) : (
                <div className="flex flex-col gap-6">
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}
                  {currentStep === 5 && renderStep5()}
                  {currentStep === 6 && renderStep6()}
                  {currentStep === 7 && renderStep7()}
                  {currentStep === 8 && renderStep8()}
                  {currentStep === 9 && renderStep9()}
                  {/* {currentStep === 10 && renderStep10()} */}
                  {currentStep === 10 && renderStep11()}
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
          <div className="xl:hidden p-4 border-t border-secondary">
            <div className="flex gap-3">
              {currentStep > 1 && currentStep !== 2 && currentStep !== 3 && currentStep !== 4 && currentStep !== 5 && currentStep !== 6 && currentStep !== 7 && currentStep !== 8 && currentStep !== 9 && currentStep !== 10 && currentStep !== 11 && (
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
              
              {false ? (
                <Button 
                  className={currentStep > 1 ? "flex-[4]" : "w-full"}
                  iconTrailing={ArrowRight}
                  onClick={() => handleNext()}
                  size="md"
                >
                  Continue
                </Button>
              ) : null}
            </div>
          </div>

        {currentStep !== 11 && (
        <div className="relative hidden w-full bg-tertiary xl:flex xl:flex-col xl:h-screen xl:overflow-hidden">
          <div className="flex flex-col justify-start mt-24 items-center h-full p-6 xl:p-8">
            {renderRightSideContent()}
          </div>
          
          {/* Fixed Company Logos at Bottom - Only show for testimonial steps */}
          {(currentStep >= 2 && currentStep <= 9) && (
            <div className="absolute bottom-8 left-6 right-6">
              <div className="grid grid-cols-4 gap-1 px-2">
                <img src="/logos/l_backup/CoachHub.svg" alt="CoachHub" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/Ceros.svg" alt="Ceros" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/Flutterflow.svg" alt="FlutterFlow" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/ibm.svg" alt="IBM" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/intercom-1.svg" alt="Intercom" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/lenovo.svg" alt="Lenovo" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/logitech.svg" alt="Logitech" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/preply.svg" alt="Preply" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/Property 1=SuperOps, color=color.svg" alt="SuperOps" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/Property 1=Variant10, color=color.svg" alt="Variant10" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/xano.svg" alt="Xano" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
                <img src="/logos/l_backup/yoto.svg" alt="Yoto" className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter" />
              </div>
            </div>
          )}
        </div>
        )}
      </section>
    </div>
  );
};