export interface SignupFormData {
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

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
}

export interface SaasTool {
  id: string;
  name: string;
  logo: string;
}

export interface EnterpriseFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Industry {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface CompanySize {
  value: string;
  label: string;
}

export interface UseCase {
  value: string;
  label: string;
  description: string;
}
