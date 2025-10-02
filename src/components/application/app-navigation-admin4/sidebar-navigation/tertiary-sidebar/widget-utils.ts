import type { Widget, WidgetCategory } from "./types";

// Get category color based on category name
export const getCategoryColor = (categoryName: string) => {
  switch (categoryName) {
    case "Basic":
      return {
        accent: "bg-blue-500",
        hover: "hover:bg-blue-50/50",
        iconColor: "text-blue-600",
        textColor: "text-blue-700"
      };
    case "Content":
      return {
        accent: "bg-green-500",
        hover: "hover:bg-green-50/50",
        iconColor: "text-green-600",
        textColor: "text-green-700"
      };
    case "Advanced":
      return {
        accent: "bg-purple-500",
        hover: "hover:bg-purple-50/50",
        iconColor: "text-purple-600",
        textColor: "text-purple-700"
      };
    case "Social":
      return {
        accent: "bg-orange-500",
        hover: "hover:bg-orange-50/50",
        iconColor: "text-orange-600",
        textColor: "text-orange-700"
      };
    default:
      return {
        accent: "bg-gray-500",
        hover: "hover:bg-gray-50/50",
        iconColor: "text-gray-600",
        textColor: "text-gray-700"
      };
  }
};

// Get trending widget colors based on widget ID (maps to original category)
export const getTrendingColor = (widgetId: string) => {
  if (widgetId.includes("trending-1") || widgetId.includes("trending-2")) {
    // Hero Title, CTA Button - from Basic
    return getCategoryColor("Basic");
  } else if (widgetId.includes("trending-3") || widgetId.includes("trending-4") || widgetId.includes("trending-8")) {
    // Image Banner, Video Hero, Feature Cards - from Content
    return getCategoryColor("Content");
  } else if (widgetId.includes("trending-5") || widgetId.includes("trending-6")) {
    // Contact Form, Stats Chart - from Advanced
    return getCategoryColor("Advanced");
  } else if (widgetId.includes("trending-7")) {
    // Social Feed - from Social
    return getCategoryColor("Social");
  }
  // Default fallback
  return getCategoryColor("default");
};

// Filter widgets based on search term
export const filterWidgets = (widgets: WidgetCategory[], searchTerm: string): WidgetCategory[] => {
  return widgets.map(category => {
    if (category.subcategories) {
      // Handle categories with subcategories
      return {
        ...category,
        subcategories: category.subcategories.map(subcategory => ({
          ...subcategory,
          widgets: subcategory.widgets.filter(widget => 
            widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            widget.description?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        })).filter(subcategory => subcategory.widgets.length > 0)
      };
    } else if (category.widgets) {
      // Handle categories with direct widgets
      return {
        ...category,
        widgets: category.widgets.filter(widget => 
          widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          widget.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      };
    }
    return category;
  }).filter(category => 
    (category.subcategories && category.subcategories.length > 0) || 
    (category.widgets && category.widgets.length > 0)
  );
};

// Calculate popover position to avoid going off-screen
export const calculatePopoverPosition = (
  event: React.MouseEvent,
  popoverWidth: number = 400,
  popoverHeight: number = 340
) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const scrollableContainer = event.currentTarget.closest('.flex-1.overflow-y-auto');
  const containerRect = scrollableContainer?.getBoundingClientRect();
  
  if (!containerRect) return { x: 0, y: 0 };
  
  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate initial position (to the right of the widget card)
  let x = rect.right + 10;
  let y = rect.top - (containerRect.top - (scrollableContainer?.scrollTop || 0));
  
  // Check if popover goes off-screen horizontally
  if (x + popoverWidth > viewportWidth) {
    // Position to the left of the widget card
    x = rect.left - popoverWidth - 10;
  }
  
  // Ensure it doesn't go off-screen on the left
  if (x < 10) {
    x = 10;
  }
  
  // Check if popover goes off-screen vertically
  if (y + popoverHeight > viewportHeight) {
    // Position above the widget card
    y = rect.top - popoverHeight - 10;
  }
  
  // Ensure it doesn't go off-screen on the top
  if (y < 10) {
    y = 10;
  }
  
  return { x, y };
}; 