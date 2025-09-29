export interface BrandData {
  id: string;
  name: string;
  domain: string;
  description?: string;
  longDescription?: string;
  logos?: {
    theme?: string;
    formats?: {
      src: string;
      format: string;
      width: number;
      height: number;
    }[];
    type: string;
  }[];
  colors?: {
    hex: string;
    type: string;
    brightness?: number;
  }[];
  fonts?: {
    name: string;
    type: string;
    origin?: string;
  }[];
  images?: {
    formats?: {
      src: string;
      format: string;
      width: number;
      height: number;
    }[];
    type: string;
  }[];
  links?: {
    name: string;
    url: string;
  }[];
  company?: {
    employees?: number;
    foundedYear?: number;
    location?: {
      city?: string;
      country?: string;
      state?: string;
    };
    industries?: {
      id: string;
      name: string;
      emoji?: string;
      score?: number;
      slug?: string;
    }[];
  };
}

const BRANDFETCH_API_KEY = 'L8GxvBuY6NYnAhtB6P7n41RRawtQuow2WzbxCV8o0q8=';
const BRANDFETCH_BASE_URL = 'https://api.brandfetch.io/v2/brands';

export const fetchBrandData = async (identifier: string): Promise<BrandData | null> => {
  try {
    const url = `${BRANDFETCH_BASE_URL}/${identifier}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BRANDFETCH_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Brandfetch API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching brand data:', error);
    return null;
  }
};

export const extractDomainFromEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
  const match = email.match(emailRegex);
  return match ? match[1] : null;
};

export const shouldFetchBrandData = (email: string): boolean => {
  const domain = extractDomainFromEmail(email);
  if (!domain) return false;
  
  // Skip common consumer email providers
  const consumerDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'aol.com',
    'protonmail.com',
    'yandex.com',
    'mail.com'
  ];
  
  return !consumerDomains.includes(domain.toLowerCase());
};

