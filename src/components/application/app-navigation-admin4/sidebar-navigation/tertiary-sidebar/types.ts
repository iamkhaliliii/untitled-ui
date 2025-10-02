import React from "react";

export interface Widget {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  category: string;
  subcategory?: string;
  type: "Basic" | "Advanced" | "Premium";
  image: string;
  previewImage?: string;
  usageExample?: string;
  author?: string;
  badges?: Array<{
    type: "new" | "enterprise" | "beta" | "popular";
    icon: React.ElementType;
    color: string;
  }>;
}

export interface WidgetSubcategory {
  name: string;
  icon: React.ElementType;
  widgets: Widget[];
}

export interface WidgetCategory {
  name: string;
  subcategories?: WidgetSubcategory[];
  widgets?: Widget[];
}

export interface WidgetSelectionProps {
  onBack: () => void;
  onSelectWidget: (widget: Widget) => void;
} 