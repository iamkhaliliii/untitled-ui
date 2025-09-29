// Local storage based navigation data management

export interface NavigationItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  status: string;
  statusColor: "gray" | "blue" | "success" | "orange";
}

export interface NavigationData {
  admin: NavigationItem[];
  site: NavigationItem[];
  getStarted: NavigationItem[];
}

const STORAGE_KEY = 'navigation-data';

// Save navigation data to localStorage
export const saveNavigationData = async (data: NavigationData): Promise<void> => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    localStorage.setItem(STORAGE_KEY, jsonString);
    
    // Also save to sessionStorage as backup
    sessionStorage.setItem(STORAGE_KEY, jsonString);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Navigation data saved to localStorage');
  } catch (error) {
    console.error('Failed to save navigation data:', error);
    throw error;
  }
};

// Load navigation data from localStorage
export const loadNavigationData = async (): Promise<NavigationData | null> => {
  try {
    // Try localStorage first
    let stored = localStorage.getItem(STORAGE_KEY);
    
    // Fallback to sessionStorage
    if (!stored) {
      stored = sessionStorage.getItem(STORAGE_KEY);
    }
    
    if (stored) {
      const data = JSON.parse(stored);
      console.log('Navigation data loaded from localStorage');
      return data;
    }
    
    return null; // No stored data found
  } catch (error) {
    console.error('Failed to load navigation data:', error);
    return null;
  }
};

// Clear stored navigation data
export const clearNavigationData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  console.log('Navigation data cleared from storage');
};

// Check if there's stored data
export const hasStoredData = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null || sessionStorage.getItem(STORAGE_KEY) !== null;
};
