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
  ChevronRight
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
  { id: "usercentric", name: "Usercentric", logo: "/logos/s/Usercentrics_idibjbvDVZ_0.svg" },
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

const ENTERPRISE_FEATURES = [
  { id: "saml-sso", name: "SAML single sign-on", description: "Seamlessly enable enterprise-grade authentication and secure access.", icon: Lock01 },
  { id: "data-residency", name: "Data residency", description: "Control where your data resides, ensuring compliance with regional regulations.", icon: Globe01 },
  { id: "soc2", name: "SOC 2 (Type 2)", description: "Certifies our security policies and controls meet the highest industry standards.", icon: Shield01 },
  { id: "gdpr-ccpa", name: "GDPR & CCPA", description: "Your data privacy is safeguarded with full compliance with EU regulations.", icon: Lock01 },
  { id: "uptime-sla", name: "Uptime SLA", description: "We guarantee exceptional service reliability with a robust uptime commitment.", icon: Target01 },
  { id: "custom-ssl", name: "Custom SSL", description: "Secure your connections with dedicated SSL certificates tailored to your needs.", icon: Shield01 },
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
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showIndustrySearch, setShowIndustrySearch] = useState(false);
  const [showRoleSearch, setShowRoleSearch] = useState(false);
  const [customRole, setCustomRole] = useState("");
  const [billingPeriod, setBillingPeriod] = useState<'annual' | 'monthly'>('annual');
  const [g2CarouselIndex, setG2CarouselIndex] = useState(0);
  
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
      case 10:
        if (!formData.expectedUserCount) newErrors.expectedUserCount = "Expected user count is required";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (skipValidation = false) => {
    if (skipValidation || validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 12));
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
    const titles = ["First, enter your email", "Check your email for a code", "What is your name?", "What industry are you in?", "Which best describes your role?", "What is your company's name?", `How many people work at ${formData.companyName || 'your company'}?`, `What is ${formData.companyName || 'your company'}'s website?`, "Communities are much more powerful with awesome integrations.", "How many users do you expect?", "Enterprise features", showAllPlans ? "Choose your plan" : "Recommended plan for you"];
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
      "Choose as many as you want, it helps us guide you to the right plan.",
      "",
      "Configure enterprise security and compliance features.",
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
                "w-14 h-14 text-center text-lg font-semibold border rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-brand-solid focus:border-brand-solid",
                errors.verificationCode ? "border-error-primary" : "border-gray-300"
              )}
            />
          </div>
        );
      }
      
      return inputs;
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center gap-3 w-full">
          <div className="flex gap-3">
            {renderCodeInputs().slice(0, 3)}
          </div>
          <span className="text-gray-400 text-lg mx-2">-</span>
          <div className="flex gap-3">
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
              <span className="text-gray-400">Resend in {resendCooldown}s</span>
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
      { id: "marketing", name: "Marketing and Advertising" },
      { id: "technology", name: "Technology and Services" },
      { id: "software", name: "Computer Software" },
      { id: "realestate", name: "Real Estate" },
      { id: "financial", name: "Financial Services" },
      { id: "health", name: "Health, Wellness and Fitness" },
      { id: "education", name: "Education" },
      { id: "consulting", name: "Consulting" },
      { id: "retail", name: "Retail" }
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {industries.map(industry => (
            <button
              key={industry.id}
              onClick={() => {
                handleInputChange('industry')(industry.id);
                // Auto-advance to next step after selection
                setTimeout(() => {
                  handleNext(true);
                }, 300);
              }}
              className={cx(
                "p-4 h-16 rounded-lg border text-center transition-all hover:shadow-sm flex items-center justify-center",
                formData.industry === industry.id
                  ? "border-brand-solid bg-brand-50 shadow-sm"
                  : "border-gray-300 hover:border-gray-400"
              )}
            >
              <span className="text-sm font-medium text-primary">{industry.name}</span>
            </button>
          ))}
        </div>

        {!showIndustrySearch ? (
          <button
            onClick={() => setShowIndustrySearch(true)}
            className="mx-auto text-sm font-medium text-purple-600 hover:text-purple-700 underline decoration-transparent hover:decoration-purple-600 underline-offset-2 transition-all"
          >
            Doesn't fit? Search all industries
          </button>
        ) : (
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
        )}

        {errors.industry && (
          <p className="text-sm text-error-primary text-center">{errors.industry}</p>
        )}
      </div>
    );
  };

  // Step 5: Role Selection
  const renderStep5 = () => {
    const roles = [
      { id: "owner", name: "Owner" },
      { id: "executive", name: "Executive Team" },
      { id: "manager", name: "Manager" },
      { id: "employee", name: "Employee" },
      { id: "student", name: "Student/Intern" },
      { id: "freelancer", name: "Freelancer" }
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                "p-4 rounded-lg border text-center transition-all hover:shadow-sm",
                formData.role === role.id
                  ? "border-brand-solid bg-brand-50 shadow-sm"
                  : "border-gray-300 hover:border-gray-400"
              )}
            >
              <span className="text-sm font-medium text-primary">{role.name}</span>
            </button>
          ))}
        </div>

        {!showRoleSearch ? (
          <button
            onClick={() => setShowRoleSearch(true)}
            className="mx-auto text-sm font-medium text-purple-600 hover:text-purple-700 underline decoration-transparent hover:decoration-purple-600 underline-offset-2 transition-all"
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
      { id: "just-me", name: "Just me" },
      { id: "2-5", name: "2 to 5" },
      { id: "6-10", name: "6 to 10" },
      { id: "11-25", name: "11 to 25" },
      { id: "26-50", name: "26 to 50" },
      { id: "51-200", name: "51 to 200" },
      { id: "201-1000", name: "201 to 1,000" },
      { id: "1001-10000", name: "1,001 to 10,000" },
      { id: "10000+", name: "10,001 or more" }
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                "p-4 rounded-lg border text-center transition-all hover:shadow-sm",
                formData.companySize === size.id
                  ? "border-brand-solid bg-brand-50 shadow-sm"
                  : "border-gray-300 hover:border-gray-400"
              )}
            >
              <span className="text-sm font-medium text-primary">{size.name}</span>
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
          placeholder="www.companywebsite.com" 
          value={formData.website}
          onChange={handleInputChange('website')}
        />
      </InputGroup>

      <div className="flex justify-end items-center gap-6">
        <button
          onClick={() => handleNext()}
          className="text-sm text-gray-600 hover:text-gray-800 underline decoration-transparent hover:decoration-gray-600 underline-offset-2 transition-all"
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
            className="text-sm font-medium text-purple-600 hover:text-purple-700 underline decoration-transparent hover:decoration-purple-600 underline-offset-2 transition-all"
          >
            {SAAS_TOOLS.every(tool => formData.currentTools.includes(tool.id)) ? 'Unselect all' : 'Select all'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
              {tool.logo && (
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">
                <img 
                  src={tool.logo} 
                  alt={tool.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              )}
              
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-primary text-sm truncate">{tool.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="flex justify-end items-center gap-6">
        <button
          onClick={() => handleNext()}
          className="text-sm text-gray-600 hover:text-gray-800 underline decoration-transparent hover:decoration-gray-600 underline-offset-2 transition-all"
        >
          Skip for now
        </button>
        
        <Button
          iconTrailing={ArrowRight}
          onClick={() => handleNext()}
          size="sm"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 10: Expected Users
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
                  ? "border-brand-solid bg-brand-50 shadow-sm"
                  : "border-gray-300 hover:border-gray-400"
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

  // Step 11: Enterprise Features - Compact Design
  const renderStep11 = () => (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex justify-end mb-3">
          <button
            onClick={() => {
              const allFeatureIds = ENTERPRISE_FEATURES.map(feature => feature.id);
              const allSelected = allFeatureIds.every(id => formData.enterpriseFeatures.includes(id));
              
              if (allSelected) {
                // Unselect all features
                setFormData(prev => ({ ...prev, enterpriseFeatures: [] }));
              } else {
                // Select all features
                setFormData(prev => ({ ...prev, enterpriseFeatures: allFeatureIds }));
              }
            }}
            className="text-sm font-medium text-purple-600 hover:text-purple-700 underline decoration-transparent hover:decoration-purple-600 underline-offset-2 transition-all"
          >
            {ENTERPRISE_FEATURES.every(feature => formData.enterpriseFeatures.includes(feature.id)) ? 'Unselect all' : 'Select all'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ENTERPRISE_FEATURES.map(feature => (
            <div key={feature.id} className={cx(
              "flex items-center p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5",
              formData.enterpriseFeatures.includes(feature.id)
                ? "border-brand-solid bg-brand-50 shadow-sm"
                : "border-secondary hover:border-gray-300"
            )}
            onClick={() => handleArrayToggle('enterpriseFeatures')(feature.id)}
            >
              <feature.icon className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-primary text-sm mb-1">{feature.name}</div>
                <div className="text-xs text-tertiary">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center gap-6">
        <button
          onClick={() => handleNext()}
          className="text-sm text-gray-600 hover:text-gray-800 underline decoration-transparent hover:decoration-gray-600 underline-offset-2 transition-all"
        >
          Skip
        </button>
        
        <Button
          iconTrailing={ArrowRight}
          onClick={() => handleNext()}
          size="sm"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 12: Plan Selection
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
          { icon: Shield01, text: "Remove Powered by Bettermode" },
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
        price: billingPeriod === 'annual' ? "$45,000" : "Contact Us",
        period: billingPeriod === 'annual' ? "/year" : "",
        annualPrice: null,
        annualPeriod: null,
        annualTotal: "",
        monthlyTotal: "Not Available",
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

    const displayPlans = showAllPlans ? plans : plans.filter(plan => plan.id === recommendedPlanType);

    return (
      <div className="">
        
        <div className={cx(
          "gap-4 w-full px-8",
          showAllPlans ? "grid grid-cols-1 lg:grid-cols-3" : "grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto"
        )}>
          {displayPlans.map(plan => (
          <div key={plan.id} className={cx(
            "relative p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md flex flex-col",
            formData.selectedPlan === plan.id
              ? "border-brand-solid bg-brand-50 shadow-sm"
              : plan.recommended
              ? "border-purple-300 bg-purple-50/30 hover:border-purple-400"
              : "border-gray-200 hover:border-gray-300",
            "min-h-[400px]",
            plan.id === "enterprise" && billingPeriod === 'monthly' && "opacity-20"
          )}
          onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-3 ">
                <span className="bg-black text-white text-[0.8rem] font-medium px-3 py-1 rounded-md ">
                  Recommended based on your needs
                </span>
              </div>
            )}
            
            <div className="mb-3">
              <div className="mb-2">
                <h3 className="text-base font-semibold text-gray-900">{plan.name}</h3>
              </div>
              <div className=" min-h-[60px] flex flex-col justify-center">
                {billingPeriod === 'annual' && plan.annualPrice && plan.price !== plan.annualPrice ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[0.9rem] font-bold text-gray-400 line-through">{plan.price}</span>
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-1 py-0.5 rounded-md">
                        Save {Math.round(((parseFloat(plan.price.replace('$', '').replace(',', '')) - parseFloat(plan.annualPrice.replace('$', '').replace(',', ''))) / parseFloat(plan.price.replace('$', '').replace(',', ''))) * 100)}%
                      </span>
                    </div>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">{plan.annualPrice}</span>
                        <span className="text-gray-600 ml-1">/m</span>
                        <span className="text-sm text-gray-500 ml-2">{plan.annualTotal}</span>
                      </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center h-full">
                    <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                 <span className="text-gray-600 ml-1">/m</span>
                 {billingPeriod === 'monthly' && plan.monthlyTotal && plan.monthlyTotal !== "Not Available" && (
                   <span className="text-sm text-gray-500 ml-2">{plan.monthlyTotal}</span>
                 )}
                    </div>
                    {billingPeriod === 'monthly' && plan.monthlyTotal === "Not Available" && (
                      <div className="text-sm text-black mt-1 font-medium">Only Annually</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1 mb-4 mt-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <feature.icon className="w-3 h-3 mr-2 text-gray-500" />
                  {feature.text}
                </div>
              ))}
            </div>

            <div className="mb-4 mt-4">
              <p className="text-xs text-gray-500 mb-1">Integrations</p>
              <div className="flex flex-wrap gap-2 justify-start">
                {plan.id === "starter" ? (
                  <>
                    <img src="/logos/s/google-analytics-3.svg" alt="Google Analytics" className="w-5 h-5 rounded" />
                    <img src="/logos/s/cookie-svgrepo-com.svg" alt="Cookie Consent Manager" className="w-5 h-5 rounded" />
                    <img src="/logos/s/zapier.svg" alt="Zapier" className="w-5 h-5 rounded" />
                    <img src="/logos/s/make.svg" alt="Make.com" className="w-5 h-5 rounded" />
                    <img src="/logos/s/slack-new-logo.svg" alt="Slack" className="w-5 h-5 rounded" />
                    <img src="/logos/s/discord.svg" alt="Discord" className="w-5 h-5 rounded" />
                    <img src="/logos/s/mailchimp logo.svg" alt="Mailchimp" className="w-5 h-5 rounded" />
                  </>
                ) : plan.id === "growth" ? (
                  <>
                    <img src="/logos/s/google-analytics-3.svg" alt="Google Analytics" className="w-5 h-5 rounded" />
                    <img src="/logos/s/cookie-svgrepo-com.svg" alt="Cookie Consent Manager" className="w-5 h-5 rounded" />
                    <img src="/logos/s/zapier.svg" alt="Zapier" className="w-5 h-5 rounded" />
                    <img src="/logos/s/make.svg" alt="Make.com" className="w-5 h-5 rounded" />
                    <img src="/logos/s/slack-new-logo.svg" alt="Slack" className="w-5 h-5 rounded" />
                    <img src="/logos/s/discord.svg" alt="Discord" className="w-5 h-5 rounded" />
                    <img src="/logos/s/mailchimp logo.svg" alt="Mailchimp" className="w-5 h-5 rounded" />
                    <img src="/logos/s/google-tag-manager logo.svg" alt="Google Tag Manager" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Custom-Code-Snippet.svg" alt="Custom Code Snippet" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Usercentrics_idibjbvDVZ_0.svg" alt="Usercentric" className="w-5 h-5 rounded" />
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
                    <img src="/logos/s/cookie-svgrepo-com.svg" alt="Cookie Consent Manager" className="w-5 h-5 rounded" />
                    <img src="/logos/s/zapier.svg" alt="Zapier" className="w-5 h-5 rounded" />
                    <img src="/logos/s/make.svg" alt="Make.com" className="w-5 h-5 rounded" />
                    <img src="/logos/s/slack-new-logo.svg" alt="Slack" className="w-5 h-5 rounded" />
                    <img src="/logos/s/discord.svg" alt="Discord" className="w-5 h-5 rounded" />
                    <img src="/logos/s/mailchimp logo.svg" alt="Mailchimp" className="w-5 h-5 rounded" />
                    <img src="/logos/s/google-tag-manager logo.svg" alt="Google Tag Manager" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Custom-Code-Snippet.svg" alt="Custom Code Snippet" className="w-5 h-5 rounded" />
                    <img src="/logos/s/Usercentrics_idibjbvDVZ_0.svg" alt="Usercentric" className="w-5 h-5 rounded" />
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
            <div className="mt-auto pt-4 border-t border-gray-100">
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
                className="block text-center text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1.5"
              >
                See details →
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
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              <div className="text-left flex flex-col gap-4">
              <h2 className=" text-2xl font-base text-primary mb-8 leading-relaxed">
                More than <span className="font-bold">4 million</span> people across <span className="font-bold">2,000 enterprise </span>
                <span className="font-bold">communities</span> are empowered by{" "}
                <div className="inline-flex items-end mt-1 ">
                  <img 
                    src="/logo-bettermode.svg" 
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

      case 2:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* HubSpot Logo at the top */}
              <div className="mb-8">
                <img 
                  src="/logos/hubspot.svg" 
                  alt="HubSpot" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 leading-relaxed">
                  Using Bettermode has been a game-changer for us. Its powerful capabilities and features have revolutionized the way we engage with our community, leading to more effective connections and experiences.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3">
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
          <div className="flex flex-col gap-6 text-center ">
            <div>
              {/* Title */}
              <div className="text-left flex flex-col gap-2 max-w-md mx-auto">
                <h2 className="text-3xl font-base text-primary">
                  Why Leading Brands Choose{" "}
                  <span className="font-bold">Bettermode</span>
                </h2>
                <p className="text-xl text-tertiary mb-6">
                  Empower your enterprise with an all-in-one hub for communities, knowledge sharing, events, and more.
                </p>
              </div>
              
              {/* Animated Image Slider - Single Row */}
              <div className="relative overflow-hidden">
                <div className="flex animate-infinite-scroll space-x-3">
                  {/* First set of images */}
                  <img src="/pic/95hMxryJzJLwIzpyQvtnfZqoog.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/Ci88GhZcPHBGHwo56ttsBK32A8.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/cM4QAxyw8qFYPzk1xc0MZXgtKHc.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/qIhdSSEYqJe7mwsNooYK73vvUy8.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/z4CBLhwG80urLcB09PG3eSA84E.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/bSro1RJlbMgQy3VFBrz4U5o8.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  
                  {/* Duplicate set for seamless infinite loop */}
                  <img src="/pic/95hMxryJzJLwIzpyQvtnfZqoog.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/Ci88GhZcPHBGHwo56ttsBK32A8.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/cM4QAxyw8qFYPzk1xc0MZXgtKHc.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/qIhdSSEYqJe7mwsNooYK73vvUy8.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/z4CBLhwG80urLcB09PG3eSA84E.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                  <img src="/pic/bSro1RJlbMgQy3VFBrz4U5o8.avif" alt="Brand showcase" className="h-90 w-auto object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* Xano Logo at the top */}
              <div className="mb-8">
                <img 
                  src="/logos/l_backup/xano.svg" 
                  alt="Xano" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 leading-relaxed">
                  Our experience with Bettermode has been fantastic—it's become an essential part of how we support and engage our users, and we're excited to see it evolve further with our community.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3">
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

      case 5:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* Title */}
              <div className="text-left flex flex-col gap-2">
                <h2 className="text-3xl font-base text-primary">
                  Works with the tools you already{" "}
                  <span className="font-bold">trust</span>
                </h2>
                <p className="text-base text-tertiary mb-8">
                  Use Bettermode as your standalone platform or embed it into your existing eco-system, website/application
                </p>
              </div>
              
              {/* Integration Logos Grid */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/salesforce.svg" alt="Salesforce" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/hubspot-1.svg" alt="HubSpot" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/slack-new-logo.svg" alt="Slack" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/microsoft-teams-1.svg" alt="Microsoft Teams" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/zapier.svg" alt="Zapier" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/stripe-4.svg" alt="Stripe" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/zendesk-3.svg" alt="Zendesk" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/intercom-2.svg" alt="Intercom" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/google-analytics-3.svg" alt="Google Analytics" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/mailchimp logo.svg" alt="MailChimp" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/make.svg" alt="Make" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src="/logos/s/amplitude-icon logo.svg" alt="Amplitude" className="h-8 w-auto opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col gap-8 px-8">
            <div className="text-left">
              {/* IBM Logo at the top */}
              <div className="mb-8">
                <img 
                  src="/logos/l_backup/ibm.svg" 
                  alt="IBM" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 leading-relaxed">
                  Bettermode's automated reputation system, robust content organization features, and balanced communication capabilities helped us drive engagement with a personalized approach.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3">
                <img 
                  src={TESTIMONIALS[2].avatar}
                  alt="Marlee Margolin"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Marlee Margolin")}&background=6366f1&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary text-sm">Marlee Margolin</p>
                  <cite className="text-sm text-tertiary not-italic">CSR Activation Manager</cite>
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
              {/* Title */}
              <div className="text-left flex flex-col gap-2">
                <h2 className="text-3xl font-base text-primary mb-8">
                  Built for businesses. Rated by{" "}
                  <span className="font-bold">experts</span>
                </h2>
              </div>
              
              {/* G2 Awards Carousel */}
              <div className="relative mt-20">
                <div className="flex items-center justify-center">
                  {/* Left Arrow */}
                  <button
                    onClick={() => setG2CarouselIndex(prev => prev === 0 ? 5 : prev - 1)}
                    className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>

                  {/* G2 Award Display */}
                  <div className="flex justify-center items-center h-80 w-full">
                    {(() => {
                      const g2Awards = [
                        { src: "/logos/G2/G2 - high performer.svg", alt: "G2 High Performer" },
                        { src: "/logos/G2/G2 -leaders.svg", alt: "G2 Leaders" },
                        { src: "/logos/G2/G2 momentom leader.svg", alt: "G2 Momentum Leader" },
                        { src: "/logos/G2/Ease of use -.svg", alt: "G2 Ease of Use" },
                        { src: "/logos/G2/G2 - ease of use bussines.svg", alt: "G2 Ease of Use Business" },
                        { src: "/logos/G2/G2 -support.svg", alt: "G2 Support" }
                      ];
                      const currentAward = g2Awards[g2CarouselIndex];
                      return (
                        <img 
                          src={currentAward.src} 
                          alt={currentAward.alt} 
                          className="h-72 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" 
                        />
                      );
                    })()}
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={() => setG2CarouselIndex(prev => prev === 5 ? 0 : prev + 1)}
                    className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Carousel Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <button
                      key={index}
                      onClick={() => setG2CarouselIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        g2CarouselIndex === index ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
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
              <div className="mb-8">
                <img 
                  src="/logos/l_backup/CoachHub.svg" 
                  alt="CoachHub" 
                  className="h-8 w-auto"
                />
              </div>
              
              {/* Testimonial Quote */}
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-2xl font-base text-primary mb-8 leading-relaxed">
                  Bettermode was selected for its ease of use and for filling in almost all of our coaches' wishlist.
                </h2>
              </div>
              
              {/* Author Info */}
              <div className="flex items-start gap-3">
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
              {/* Title */}
              <div className="text-left flex flex-col gap-4">
                {/* Professional services badge */}
                <div className="inline-flex w-fit">
                  <span className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full">
                    Professional services
                  </span>
                </div>
                
                <h2 className="text-4xl text-primary">
                  Let our experts take care of{" "}
                  <span className="font-bold">everything</span>
                </h2>
                <p className="text-2xl text-tertiary mb-8">
                  From strategy to grow, our dedicated team supports every step, ensuring your community thrives.
                </p>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="flex flex-col gap-6  text-center max-w-md mx-auto">
            <div>
              {/* Title */}
              <div className="text-left flex flex-col gap-2 mb-6">
                <h2 className="text-3xl font-base text-primary">
                  The Community Platform Behind{" "}
                  <span className="font-bold">Top Brands</span>
                </h2>
              </div>
              
              {/* Brand Logos Slider - 3 Horizontal Rows */}
              <div className="space-y-4">
                {/* First Row - Moving Left */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-infinite-scroll space-x-3">
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/hubspot.svg" alt="HubSpot" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/ibm.svg" alt="IBM" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/xano.svg" alt="Xano" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/CoachHub.svg" alt="CoachHub" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/lenovo.svg" alt="Lenovo" className="h-8 w-auto object-contain" />
                    </div>
                    
                    {/* Duplicate for seamless loop */}
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/hubspot.svg" alt="HubSpot" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/ibm.svg" alt="IBM" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/xano.svg" alt="Xano" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/CoachHub.svg" alt="CoachHub" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/lenovo.svg" alt="Lenovo" className="h-8 w-auto object-contain" />
                    </div>
                  </div>
                </div>

                {/* Second Row - Moving Right */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-infinite-scroll-reverse space-x-3">
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/intercom-1.svg" alt="Intercom" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/slack-2.svg" alt="Slack" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/zendesk-1.svg" alt="Zendesk" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/logitech.svg" alt="Logitech" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/viewsonic.svg" alt="ViewSonic" className="h-8 w-auto object-contain" />
                    </div>
                    
                    {/* Duplicate for seamless loop */}
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/intercom-1.svg" alt="Intercom" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/slack-2.svg" alt="Slack" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/zendesk-1.svg" alt="Zendesk" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/logitech.svg" alt="Logitech" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/viewsonic.svg" alt="ViewSonic" className="h-8 w-auto object-contain" />
                    </div>
                  </div>
                </div>

                {/* Third Row - Moving Left */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-infinite-scroll space-x-3">
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/yoto.svg" alt="Yoto" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/Ceros.svg" alt="Ceros" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/Flutterflow.svg" alt="FlutterFlow" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/preply.svg" alt="Preply" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/s/salesforce.svg" alt="Salesforce" className="h-8 w-auto object-contain" />
                    </div>
                    
                    {/* Duplicate for seamless loop */}
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/yoto.svg" alt="Yoto" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/Ceros.svg" alt="Ceros" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/Flutterflow.svg" alt="FlutterFlow" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/l_backup/preply.svg" alt="Preply" className="h-8 w-auto object-contain" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center px-3 flex-shrink-0 hover:shadow-md transition-shadow">
                      <img src="/logos/s/salesforce.svg" alt="Salesforce" className="h-8 w-auto object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 11:
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
            </div>
          </div>
        );

      case 12:
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
                                   <div key={toolId} className="w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center">
                                     <img 
                                       src={tool.logo} 
                                       alt={tool.name}
                                       className="w-5 h-5 object-contain"
                                     />
                                   </div>
                                 ) : null;
                               })}
                               {formData.currentTools.length > 5 && (
                                 <div className="w-7 h-7 bg-gray-100 rounded-full border border-gray-200 shadow-sm flex items-center justify-center">
                                   <span className="text-[10px] font-medium text-gray-600">
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
                       Our recommendation: <span className="text-purple-600 capitalize">{getRecommendedPlan()}</span> Plan
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
      <section className="flex min-h-screen bg-primary lg:grid lg:grid-cols-1 xl:grid xl:grid-cols-[2fr_1fr]">
        {/* Left Column - Form (2/3) - Scrollable */}
        <div className="flex w-full flex-col bg-primary xl:h-screen xl:overflow-hidden">
          {/* Header */}
          <header className="flex flex-col gap-6 px-4 py-6 sm:px-6 md:px-8 lg:px-8 xl:px-8">
            {/* Logo */}
                  <div className="flex h-8 w-max items-center justify-start overflow-visible max-md:hidden">
                    <img 
                      src="/logo-bettermode.svg" 
                      alt="bettermode" 
                      className="h-6 w-auto"
                    />
                  </div>
                  
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-center md:hidden">
                    <img 
                      src="/logo-bettermode.svg" 
                      alt="bettermode" 
                      className="h-8 w-auto"
                    />
                  </div>

                  {/* Purple Minimal Progress */}
                  <div className="w-full bg-purple-100 rounded-full h-0.5">
                    <div 
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 11) * 100}%` }}
                    />
                  </div>
          </header>

          <div className="flex-1 xl:overflow-y-auto xl:scrollbar-thin">
            <div className="flex justify-center items-center min-h-full px-4 py-8 sm:py-12 md:px-6 lg:px-8 xl:py-8">
              <div className={cx(
                "flex w-full flex-col gap-6 sm:gap-8 pb-8",
                currentStep === 12 
                  ? "max-w-7xl lg:max-w-7xl xl:max-w-6xl" 
                  : "max-w-3xl lg:max-w-3xl xl:max-w-2xl"
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
                    {currentStep === 11 && (
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
                    {currentStep === 12 && (
                      <div className="">
                        <button 
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-1"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">{getStepTitle()}</h1>
                      {currentStep === 12 && (
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => setBillingPeriod('annual')}
                            className={cx(
                              "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                              billingPeriod === 'annual'
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            )}
                          >
                            Annually
                          </button>
                          <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={cx(
                              "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                              billingPeriod === 'monthly'
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            )}
                          >
                            Monthly
                          </button>
                        </div>
                      )}
                    </div>
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
                  {currentStep === 8 && renderStep8()}
                  {currentStep === 9 && renderStep9()}
                  {currentStep === 10 && renderStep10()}
                  {currentStep === 11 && renderStep11()}
                  {currentStep === 12 && renderStep12()}

                  {/* Mobile testimonial - shows on small screens */}
                  {(currentStep === 7 || currentStep === 9) && (
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
              {currentStep > 1 && currentStep !== 2 && currentStep !== 3 && currentStep !== 4 && currentStep !== 5 && currentStep !== 6 && currentStep !== 7 && currentStep !== 8 && currentStep !== 9 && currentStep !== 10 && currentStep !== 11 && currentStep !== 12 && (
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

          {/* Desktop Footer */}

        </div>

        {/* Right Column - Dynamic Marketing Content (1/3) - Fixed */}
        <div className="relative hidden w-full bg-tertiary xl:flex xl:flex-col xl:h-screen xl:overflow-hidden">
          <div className="flex flex-col justify-center items-center h-full p-6 xl:p-8">
            {renderRightSideContent()}
          </div>
        </div>
      </section>
    </div>
  );
};