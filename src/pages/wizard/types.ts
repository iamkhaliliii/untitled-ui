export interface WizardFormData {
  // Step 1: Migration check
  hasMigrationPreference: boolean | null;
  existingCommunityName?: string;
  
  // Step 2: Name your community
  communityName: string;
  description: string;
  
  // Step 3: Branding
  websiteUrl: string;
  logo: File | null;
  primaryColor: string;
  isManualBranding: boolean;
  
  // Step 4: Initial spaces selection
  selectedSpaces: string[];
}

export interface SpaceOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'discussion' | 'content' | 'collaboration' | 'support';
}
