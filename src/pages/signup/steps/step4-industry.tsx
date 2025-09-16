import { Select } from "@/components/base/select/select";
import { cx } from "@/utils/cx";
import { SignupFormData } from "../types";

interface Step4IndustryProps {
  formData: SignupFormData;
  errors: Record<string, string>;
  showIndustrySearch: boolean;
  onInputChange: (field: keyof SignupFormData) => (value: string) => void;
  onNext: (skipValidation?: boolean) => void;
  onShowIndustrySearch: (show: boolean) => void;
}

export const Step4Industry = ({ 
  formData, 
  errors, 
  showIndustrySearch,
  onInputChange, 
  onNext,
  onShowIndustrySearch
}: Step4IndustryProps) => {
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

  const allIndustries = [
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
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {industries.map(industry => (
          <button
            key={industry.id}
            onClick={() => {
              onInputChange('industry')(industry.id);
              // If "Other" is selected, reset search state and just show the button
              if (industry.id === 'other') {
                onShowIndustrySearch(false);
              } else {
                // For all other selections, auto-advance to next step
                setTimeout(() => {
                  onNext(true);
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
          onClick={() => onShowIndustrySearch(true)}
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
            items={allIndustries}
            onSelectionChange={(value) => {
              if (value) {
                onInputChange('industry')(value as string);
                setTimeout(() => {
                  onNext(true);
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
