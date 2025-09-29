import industriesData from '../../industries_full.json';

export interface IndustryItem {
  emoji: string;
  id: number;
  name: string;
  slug: string;
  urn: string;
  children?: IndustryItem[];
}

export interface MappedIndustry {
  main_industry: {
    id: number;
    name: string;
  };
  sub_industry?: {
    id: number;
    name: string;
  } | null;
}

export interface IndustryMapping {
  term: string;
  mapping_type?: string;
  mapped_industries?: MappedIndustry[];
  notes?: string;
}

// Predefined industry mappings
export const industryMappings: IndustryMapping[] = [
  {
    term: "B2B SaaS",
    mapping_type: "None",
    notes: "B2B SaaS is a business model that can apply to many industries, not a specific industry itself. It is a cross-cutting category."
  },
  {
    term: "Computer Software",
    mapped_industries: [
      {
        main_industry: {
          id: 28,
          name: "Computers Electronics and Technology"
        },
        sub_industry: {
          id: 37,
          name: "Programming and Developer Software"
        }
      }
    ]
  },
  {
    term: "Technology and Services",
    mapped_industries: [
      {
        main_industry: {
          id: 28,
          name: "Computers Electronics and Technology"
        },
        sub_industry: null
      }
    ]
  },
  {
    term: "AI",
    mapped_industries: [
      {
        main_industry: {
          id: 28,
          name: "Computers Electronics and Technology"
        },
        sub_industry: {
          id: 226,
          name: "Artificial Intelligence and Machine Learning"
        }
      }
    ]
  },
  {
    term: "Medical SaaS",
    mapped_industries: [
      {
        main_industry: {
          id: 77,
          name: "Health"
        },
        sub_industry: null
      },
      {
        main_industry: {
          id: 77,
          name: "Health"
        },
        sub_industry: {
          id: 87,
          name: "Medicine"
        }
      }
    ]
  },
  {
    term: "MarTech",
    mapped_industries: [
      {
        main_industry: {
          id: 10,
          name: "Business and Consumer Services"
        },
        sub_industry: {
          id: 13,
          name: "Marketing and Advertising"
        }
      }
    ]
  },
  {
    term: "AdTech",
    mapped_industries: [
      {
        main_industry: {
          id: 10,
          name: "Business and Consumer Services"
        },
        sub_industry: {
          id: 13,
          name: "Marketing and Advertising"
        }
      },
      {
        main_industry: {
          id: 28,
          name: "Computers Electronics and Technology"
        },
        sub_industry: {
          id: 29,
          name: "Advertising Networks"
        }
      }
    ]
  },
  {
    term: "Online Marketplace",
    mapped_industries: [
      {
        main_industry: {
          id: 42,
          name: "E-commerce and Shopping"
        },
        sub_industry: {
          id: 47,
          name: "Marketplace"
        }
      }
    ]
  },
  {
    term: "EdTech",
    mapped_industries: [
      {
        main_industry: {
          id: 152,
          name: "Science and Education"
        },
        sub_industry: {
          id: 158,
          name: "Education"
        }
      }
    ]
  },
  {
    term: "Dev Tools",
    mapped_industries: [
      {
        main_industry: {
          id: 28,
          name: "Computers Electronics and Technology"
        },
        sub_industry: {
          id: 37,
          name: "Programming and Developer Software"
        }
      }
    ]
  }
];

// Get all industries from the JSON file
export const getAllIndustries = (): IndustryItem[] => {
  return industriesData as IndustryItem[];
};

// Get all industries flattened (including sub-industries)
export const getFlattenedIndustries = () => {
  const industries = getAllIndustries();
  const flattened: Array<{
    id: string;
    label: string;
    emoji: string;
    mainIndustry: string;
    isSubIndustry: boolean;
  }> = [];

  industries.forEach(industry => {
    // Add main industry
    flattened.push({
      id: industry.id.toString(),
      label: industry.name,
      emoji: industry.emoji,
      mainIndustry: industry.name,
      isSubIndustry: false
    });

    // Add sub-industries
    if (industry.children && industry.children.length > 0) {
      industry.children.forEach(subIndustry => {
        flattened.push({
          id: subIndustry.id.toString(),
          label: subIndustry.name,
          emoji: subIndustry.emoji,
          mainIndustry: industry.name,
          isSubIndustry: true
        });
      });
    }
  });

  return flattened.sort((a, b) => a.label.localeCompare(b.label));
};

// Map selected industry to Brandfetch format
export const mapIndustryToBrandfetch = (selectedIndustry: string): MappedIndustry[] | null => {
  // First check if it's one of our predefined mappings
  const mapping = industryMappings.find(m => 
    m.term.toLowerCase() === selectedIndustry.toLowerCase() ||
    m.term.toLowerCase().replace(/\s+/g, '-') === selectedIndustry
  );

  if (mapping && mapping.mapped_industries) {
    return mapping.mapped_industries;
  }

  // If it's a direct industry ID from the JSON
  const industries = getAllIndustries();
  const industryId = parseInt(selectedIndustry);
  
  if (!isNaN(industryId)) {
    // Find in main industries
    const mainIndustry = industries.find(ind => ind.id === industryId);
    if (mainIndustry) {
      return [{
        main_industry: {
          id: mainIndustry.id,
          name: mainIndustry.name
        },
        sub_industry: null
      }];
    }

    // Find in sub-industries
    for (const industry of industries) {
      if (industry.children) {
        const subIndustry = industry.children.find(sub => sub.id === industryId);
        if (subIndustry) {
          return [{
            main_industry: {
              id: industry.id,
              name: industry.name
            },
            sub_industry: {
              id: subIndustry.id,
              name: subIndustry.name
            }
          }];
        }
      }
    }
  }

  return null;
};
