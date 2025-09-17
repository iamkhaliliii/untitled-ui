export interface WizardFormData {
  // Step 1: Name your community
  communityName: string;
  description: string;
  
  // Step 2: Branding
  websiteUrl: string;
  logo: File | null;
  primaryColor: string;
  isManualBranding: boolean;
  
  // Step 3: Initial spaces selection
  selectedSpaces: string[];
}

export interface SpaceOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'discussion' | 'content' | 'collaboration' | 'support';
}
