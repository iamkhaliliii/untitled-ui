export interface BrandInfo {
  name: string;
  logo: string;
  primaryColor: string;
  domain?: string;
}

export const BRAND_DATABASE: Record<string, BrandInfo> = {
  'google.com': {
    name: 'Google',
    logo: '/logos/s/google-analytics-3.svg',
    primaryColor: '#4285f4'
  },
  'microsoft.com': {
    name: 'Microsoft',
    logo: '/logos/s/microsoft-teams-1.svg',
    primaryColor: '#0078d4'
  },
  'slack.com': {
    name: 'Slack',
    logo: '/logos/s/slack-new-logo.svg',
    primaryColor: '#4a154b'
  },
  'hubspot.com': {
    name: 'HubSpot',
    logo: '/logos/s/hubspot-1.svg',
    primaryColor: '#ff7a59'
  },
  'intercom.com': {
    name: 'Intercom',
    logo: '/logos/s/intercom-2.svg',
    primaryColor: '#1f8ded'
  },
  'zendesk.com': {
    name: 'Zendesk',
    logo: '/logos/s/zendesk-3.svg',
    primaryColor: '#03363d'
  },
  'salesforce.com': {
    name: 'Salesforce',
    logo: '/logos/s/salesforce.svg',
    primaryColor: '#1798c1'
  },
  'stripe.com': {
    name: 'Stripe',
    logo: '/logos/s/stripe-4.svg',
    primaryColor: '#635bff'
  },
  'zapier.com': {
    name: 'Zapier',
    logo: '/logos/s/zapier.svg',
    primaryColor: '#ff4a00'
  },
  'mailchimp.com': {
    name: 'Mailchimp',
    logo: '/logos/s/mailchimp logo.svg',
    primaryColor: '#ffe01b'
  }
};

export const extractDomainFromUrl = (url: string): string => {
  try {
    // Add protocol if missing
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(urlWithProtocol);
    return urlObj.hostname.replace('www.', '');
  } catch {
    // If URL is invalid, try to extract domain manually
    const cleaned = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    const domain = cleaned.split('/')[0];
    return domain;
  }
};

export const detectBrandFromUrl = (url: string): BrandInfo | null => {
  if (!url.trim()) return null;
  
  const domain = extractDomainFromUrl(url);
  
  // Direct match
  if (BRAND_DATABASE[domain]) {
    return BRAND_DATABASE[domain];
  }
  
  // Check for subdomain matches
  for (const [brandDomain, brandInfo] of Object.entries(BRAND_DATABASE)) {
    if (domain.endsWith(brandDomain)) {
      return brandInfo;
    }
  }
  
  return null;
};
