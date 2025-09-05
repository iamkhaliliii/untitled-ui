import { File02, Image01, PlayCircle, BarChart02, Calendar, MessageSquare01, Users01, SearchLg, ArrowLeft, Plus, Check, File01, File04, Globe01, Mail01, Phone, Map01, Star01, Menu01, Grid03, Lock01, Zap } from "@untitledui/icons";
import type { WidgetCategory } from "./types";

export const availableWidgets: WidgetCategory[] = [
  {
    name: "Trending Widgets",
    widgets: [
      { 
        id: "trending-1", 
        name: "Hero Title", 
        icon: File02, 
        description: "A powerful hero section title that captures attention and drives engagement",
        features: ["Large typography", "Gradient text support", "Animation ready", "Responsive design"],
        category: "Basic",
        type: "Basic",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fhero-section.webp&w=1920&q=75",
        previewImage: "/Presets.png",
        usageExample: "Perfect for landing pages and marketing sites",
        author: "@bettermode",
        badges: [
          { type: "new", icon: Zap, color: "bg-green-500" },
          { type: "popular", icon: Star01, color: "bg-yellow-500" }
        ]
      },
      { 
        id: "trending-2", 
        name: "CTA Button", 
        icon: Plus, 
        description: "High-converting call-to-action button with multiple styles and hover effects",
        features: ["Multiple variants", "Hover animations", "Icon support", "Loading states"],
        category: "Basic",
        type: "Basic",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fcta-section.webp&w=1920&q=75",
        previewImage: "/Presets2.png",
        usageExample: "Ideal for conversion-focused sections",
        author: "@bettermode"
      },
      { 
        id: "trending-3", 
        name: "Image Banner", 
        icon: Image01, 
        description: "Featured image banner with overlay text and call-to-action capabilities",
        features: ["Overlay text", "Multiple layouts", "Responsive images", "Lazy loading"],
        category: "Content",
        type: "Basic",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fimage-gallery.webp&w=1920&q=75",
        previewImage: "/Presets.png",
        usageExample: "Great for showcasing products or services",
        author: "@bettermode"
      },
      { 
        id: "trending-4", 
        name: "Video Hero", 
        icon: PlayCircle, 
        description: "Full-screen video hero section with autoplay and poster image support",
        features: ["Autoplay support", "Poster images", "Video controls", "Mobile optimized"],
        category: "Content",
        type: "Advanced",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fvideo-player.webp&w=1920&q=75",
        previewImage: "/Presets2.png",
        usageExample: "Perfect for product demos and storytelling",
        author: "@bettermode",
        badges: [
          { type: "enterprise", icon: Lock01, color: "bg-purple-500" }
        ]
      },
      { 
        id: "trending-5", 
        name: "Contact Form", 
        icon: Mail01, 
        description: "Professional contact form with validation and multiple field types",
        features: ["Form validation", "Multiple field types", "Spam protection", "Email integration"],
        category: "Advanced",
        type: "Advanced",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fcontact-form.webp&w=1920&q=75",
        previewImage: "/Presets.png",
        usageExample: "Essential for business websites and landing pages",
        author: "@bettermode"
      },
      { 
        id: "trending-6", 
        name: "Stats Chart", 
        icon: BarChart02, 
        description: "Interactive charts and graphs for displaying analytics and data",
        features: ["Multiple chart types", "Interactive tooltips", "Data animation", "Export options"],
        category: "Advanced",
        type: "Premium",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fanalytics-dashboard.webp&w=1920&q=75",
        previewImage: "/Presets2.png",
        usageExample: "Perfect for dashboards and data presentation",
        author: "@bettermode",
        badges: [
          { type: "enterprise", icon: Lock01, color: "bg-purple-500" },
          { type: "beta", icon: Zap, color: "bg-blue-500" }
        ]
      },
      { 
        id: "trending-7", 
        name: "Social Feed", 
        icon: Users01, 
        description: "Social media feed integration with live updates and engagement features",
        features: ["Live updates", "Multiple platforms", "Engagement tracking", "Moderation tools"],
        category: "Social",
        type: "Premium",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fsocial-feed.webp&w=1920&q=75",
        previewImage: "/Presets.png",
        usageExample: "Great for community building and social proof",
        author: "@bettermode"
      },
      { 
        id: "eventsList", 
        name: "Events List", 
        icon: Calendar, 
        description: "Display a customizable list of events with filtering and sorting options",
        features: ["Event filtering", "Multiple layouts", "RSVP integration", "Date sorting", "Custom styling", "Responsive design"],
        category: "Content",
        type: "Advanced",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fevents-list.webp&w=1920&q=75",
        previewImage: "/Presets.png",
        usageExample: "Perfect for displaying upcoming and past events in communities",
        author: "@bettermode",
        badges: [
          { type: "popular", icon: Star01, color: "bg-yellow-500" }
        ]
      },
      { 
        id: "singleEvent", 
        name: "Custom Events List", 
        icon: Calendar, 
        description: "Showcase a custom list of selected events with detailed information and RSVP functionality",
        features: ["Event details", "RSVP button", "Location map", "Host information", "Share options", "Custom selection"],
        category: "Content",
        type: "Advanced",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fsingle-event.webp&w=1920&q=75",
        previewImage: "/Presets2.png",
        usageExample: "Ideal for highlighting featured or important events with custom selection",
        author: "@bettermode",
        badges: [
          { type: "new", icon: Zap, color: "bg-green-500" }
        ]
      },
      { 
        id: "trending-8", 
        name: "Feature Cards", 
        icon: File01, 
        description: "Showcase features and benefits with elegant card layouts",
        features: ["Grid layouts", "Icon support", "Hover effects", "Link integration"],
        category: "Content",
        type: "Basic",
        image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Ffeature-cards.webp&w=1920&q=75",
        previewImage: "/Presets2.png",
        usageExample: "Ideal for feature pages and service listings",
        author: "@bettermode",
        badges: [
          { type: "new", icon: Zap, color: "bg-green-500" }
        ]
      },
    ]
  },
  {
    name: "Basic",
    subcategories: [
      {
        name: "Title",
        icon: File02,
        widgets: [
          { 
             id: "title-1", 
             name: "Title 1", 
             icon: File02, 
             description: "Large centered title with elegant typography",
             features: ["Centered alignment", "Large typography", "Customizable colors", "Responsive design"],
             category: "Basic",
             subcategory: "Title",
             type: "Basic",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Ftitle-section.webp&w=1920&q=75",
             previewImage: "/Presets2.png",
             usageExample: "Perfect for page headers and section titles",
             author: "@bettermode"
           },
           { 
             id: "title-2", 
             name: "Title 2", 
             icon: File02, 
             description: "Left aligned title with decorative underline",
             features: ["Left alignment", "Decorative underline", "Custom colors", "Animation support"],
             category: "Basic",
             subcategory: "Title",
             type: "Basic",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Ftitle-underline.webp&w=1920&q=75",
             previewImage: "/Presets.png",
             usageExample: "Great for blog posts and article headers",
             author: "@bettermode"
           },
           { 
             id: "title-3", 
             name: "Title 3", 
             icon: File02, 
             description: "Gradient background title with modern styling",
             features: ["Gradient background", "Modern styling", "Text effects", "Mobile responsive"],
             category: "Basic",
             subcategory: "Title",
             type: "Advanced",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fgradient-title.webp&w=1920&q=75",
             previewImage: "/Presets2.png",
             usageExample: "Perfect for modern landing pages",
             author: "@bettermode",
             badges: [
               { type: "enterprise", icon: Lock01, color: "bg-purple-500" }
             ]
           },
           { 
             id: "title-4", 
             name: "Title 4", 
             icon: File02, 
             description: "Title with accompanying icon for enhanced visual appeal",
             features: ["Icon integration", "Visual appeal", "Flexible positioning", "Color coordination"],
             category: "Basic",
             subcategory: "Title",
             type: "Basic",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Ftitle-icon.webp&w=1920&q=75",
             previewImage: "/Presets.png",
             usageExample: "Ideal for feature sections and categorized content",
             author: "@bettermode"
           },
           { 
             id: "title-5", 
             name: "Title 5", 
             icon: File02, 
             description: "Animated title with smooth entrance effects",
             features: ["Smooth animations", "Entrance effects", "Customizable timing", "Performance optimized"],
             category: "Basic",
             subcategory: "Title",
             type: "Advanced",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fanimated-title.webp&w=1920&q=75",
             previewImage: "/Presets2.png",
             usageExample: "Great for engaging user experiences",
             author: "@bettermode",
             badges: [
               { type: "new", icon: Zap, color: "bg-green-500" }
             ]
           },
        ]
      },
      {
        name: "Button",
        icon: Plus,
        widgets: [
          { 
             id: "button-1", 
             name: "Button 1", 
             icon: Plus, 
             description: "Primary solid button with strong visual presence",
             features: ["Solid background", "High contrast", "Hover states", "Focus indicators"],
             category: "Basic",
             subcategory: "Button",
             type: "Basic",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fprimary-button.webp&w=1920&q=75",
             previewImage: "/Presets.png",
             usageExample: "Perfect for primary actions and CTAs",
             author: "@bettermode",
             badges: [
               { type: "popular", icon: Star01, color: "bg-yellow-500" }
             ]
           },
           { 
             id: "button-2", 
             name: "Button 2", 
             icon: Plus, 
             description: "Outline button with subtle styling",
             features: ["Outline design", "Subtle styling", "Hover effects", "Accessibility compliant"],
             category: "Basic",
             subcategory: "Button",
             type: "Basic",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Foutline-button.webp&w=1920&q=75",
             previewImage: "/Presets2.png",
             usageExample: "Great for secondary actions",
             author: "@bettermode"
           },
           { 
             id: "button-3", 
             name: "Button 3", 
             icon: Plus, 
             description: "Gradient button with eye-catching design",
             features: ["Gradient background", "Eye-catching design", "Smooth transitions", "Modern aesthetics"],
             category: "Basic",
             subcategory: "Button",
             type: "Advanced",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fgradient-button.webp&w=1920&q=75",
             previewImage: "/Presets.png",
             usageExample: "Perfect for promotional sections",
             author: "@bettermode",
             badges: [
               { type: "new", icon: Zap, color: "bg-green-500" },
               { type: "beta", icon: Zap, color: "bg-blue-500" }
             ]
           },
           { 
             id: "button-4", 
             name: "Button 4", 
             icon: Plus, 
             description: "Icon button with minimal design",
             features: ["Icon integration", "Minimal design", "Compact size", "Flexible placement"],
             category: "Basic",
             subcategory: "Button",
             type: "Basic",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Ficon-button.webp&w=1920&q=75",
             previewImage: "/Presets2.png",
             usageExample: "Ideal for toolbars and compact interfaces"
           },
           { 
             id: "button-5", 
             name: "Button 5", 
             icon: Plus, 
             description: "Floating action button for quick access",
             features: ["Floating design", "Quick access", "Shadow effects", "Position fixed"],
             category: "Basic",
             subcategory: "Button",
             type: "Advanced",
             image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Ffab-button.webp&w=1920&q=75",
             previewImage: "/Presets.png",
             usageExample: "Great for mobile interfaces and quick actions"
           },
        ]
      },
      {
        name: "Logo",
        icon: Image01,
        widgets: [
          { 
            id: "logo-1", 
            name: "Logo 1", 
            icon: Image01, 
            description: "Centered logo with balanced spacing",
            features: ["Centered alignment", "Balanced spacing", "SVG support", "Retina ready"],
            category: "Basic",
            subcategory: "Logo",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Flogo-center.webp&w=1920&q=75",
            usageExample: "Perfect for headers and brand sections"
          },
          { 
            id: "logo-2", 
            name: "Logo 2", 
            icon: Image01, 
            description: "Left aligned logo for navigation bars",
            features: ["Left alignment", "Navigation ready", "Responsive sizing", "Multiple formats"],
            category: "Basic",
            subcategory: "Logo",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Flogo-left.webp&w=1920&q=75",
            usageExample: "Ideal for navigation bars and sidebars"
          },
          { 
            id: "logo-3", 
            name: "Logo 3", 
            icon: Image01, 
            description: "Logo with accompanying text branding",
            features: ["Text integration", "Brand consistency", "Typography pairing", "Flexible layout"],
            category: "Basic",
            subcategory: "Logo",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Flogo-text.webp&w=1920&q=75",
            usageExample: "Great for brand introduction sections"
          },
          { 
            id: "logo-4", 
            name: "Logo 4", 
            icon: Image01, 
            description: "Circular logo with modern presentation",
            features: ["Circular design", "Modern presentation", "Consistent sizing", "Profile ready"],
            category: "Basic",
            subcategory: "Logo",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Flogo-circle.webp&w=1920&q=75",
            usageExample: "Perfect for profile sections and avatars"
          },
          { 
            id: "logo-5", 
            name: "Logo 5", 
            icon: Image01, 
            description: "Logo with decorative background",
            features: ["Decorative background", "Enhanced visibility", "Custom styling", "Brand emphasis"],
            category: "Basic",
            subcategory: "Logo",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Flogo-background.webp&w=1920&q=75",
            usageExample: "Ideal for hero sections and brand showcases"
          },
        ]
      },
      {
        name: "Text Block",
        icon: File04,
        widgets: [
          { 
            id: "text-1", 
            name: "Text 1", 
            icon: File04, 
            description: "Simple paragraph with clean typography",
            features: ["Clean typography", "Readable spacing", "Responsive text", "Paragraph styling"],
            category: "Basic",
            subcategory: "Text Block",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Ftext-paragraph.webp&w=1920&q=75",
            usageExample: "Perfect for content sections and descriptions"
          },
          { 
            id: "text-2", 
            name: "Text 2", 
            icon: File04, 
            description: "Rich text editor with formatting options",
            features: ["Rich text editing", "Formatting options", "WYSIWYG interface", "HTML output"],
            category: "Basic",
            subcategory: "Text Block",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Frich-text.webp&w=1920&q=75",
            usageExample: "Great for blog posts and articles"
          },
          { 
            id: "text-3", 
            name: "Text 3", 
            icon: File04, 
            description: "Formatted text with highlighting and emphasis",
            features: ["Text highlighting", "Emphasis styling", "Custom formatting", "Visual hierarchy"],
            category: "Basic",
            subcategory: "Text Block",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fformatted-text.webp&w=1920&q=75",
            usageExample: "Ideal for important announcements"
          },
          { 
            id: "text-4", 
            name: "Text 4", 
            icon: File04, 
            description: "Quote block with elegant styling",
            features: ["Quote styling", "Elegant design", "Attribution support", "Responsive layout"],
            category: "Basic",
            subcategory: "Text Block",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fquote-block.webp&w=1920&q=75",
            usageExample: "Perfect for testimonials and quotes"
          },
          { 
            id: "text-5", 
            name: "Text 5", 
            icon: File04, 
            description: "Highlighted text with background emphasis",
            features: ["Background emphasis", "Highlighted text", "Color customization", "Attention grabbing"],
            category: "Basic",
            subcategory: "Text Block",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fhighlighted-text.webp&w=1920&q=75",
            usageExample: "Great for key points and highlights"
          },
        ]
      }
    ]
  },
  {
    name: "Content",
    subcategories: [
      {
        name: "Image",
        icon: Image01,
        widgets: [
          { 
            id: "image-1", 
            name: "Image 1", 
            icon: Image01, 
            description: "Single centered image with clean presentation",
            features: ["Centered alignment", "Clean presentation", "Responsive sizing", "Lazy loading"],
            category: "Content",
            subcategory: "Image",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fimage-single.webp&w=1920&q=75",
            usageExample: "Perfect for showcasing products or artwork"
          },
          { 
            id: "image-2", 
            name: "Image 2", 
            icon: Image01, 
            description: "Image with caption and description text",
            features: ["Caption support", "Description text", "Flexible layout", "SEO friendly"],
            category: "Content",
            subcategory: "Image",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fimage-caption.webp&w=1920&q=75",
            usageExample: "Great for blog posts and articles"
          },
          { 
            id: "image-3", 
            name: "Image 3", 
            icon: Image01, 
            description: "Full width image for maximum impact",
            features: ["Full width display", "Maximum impact", "Responsive design", "High resolution"],
            category: "Content",
            subcategory: "Image",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fimage-fullwidth.webp&w=1920&q=75",
            usageExample: "Ideal for hero sections and banners"
          },
          { 
            id: "image-4", 
            name: "Image 4", 
            icon: Image01, 
            description: "Rounded image with modern styling",
            features: ["Rounded corners", "Modern styling", "Customizable radius", "Elegant appearance"],
            category: "Content",
            subcategory: "Image",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fimage-rounded.webp&w=1920&q=75",
            usageExample: "Perfect for profile images and avatars"
          },
          { 
            id: "image-5", 
            name: "Image 5", 
            icon: Image01, 
            description: "Image with text overlay and call-to-action",
            features: ["Text overlay", "Call-to-action", "Gradient overlay", "Interactive elements"],
            category: "Content",
            subcategory: "Image",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fimage-overlay.webp&w=1920&q=75",
            usageExample: "Great for promotional content and CTAs"
          },
        ]
      },
      {
        name: "Video",
        icon: PlayCircle,
        widgets: [
          { 
            id: "video-1", 
            name: "Video 1", 
            icon: PlayCircle, 
            description: "Standard video player with controls",
            features: ["Video controls", "Standard player", "Multiple formats", "Responsive design"],
            category: "Content",
            subcategory: "Video",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fvideo-standard.webp&w=1920&q=75",
            usageExample: "Perfect for educational content and tutorials"
          },
          { 
            id: "video-2", 
            name: "Video 2", 
            icon: PlayCircle, 
            description: "Autoplay video with muted start",
            features: ["Autoplay functionality", "Muted start", "Loop support", "Mobile friendly"],
            category: "Content",
            subcategory: "Video",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fvideo-autoplay.webp&w=1920&q=75",
            usageExample: "Great for hero sections and demos"
          },
          { 
            id: "video-3", 
            name: "Video 3", 
            icon: PlayCircle, 
            description: "Video with custom controls and branding",
            features: ["Custom controls", "Brand integration", "Custom styling", "Enhanced UX"],
            category: "Content",
            subcategory: "Video",
            type: "Premium",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fvideo-custom.webp&w=1920&q=75",
            usageExample: "Ideal for branded video content"
          },
          { 
            id: "video-4", 
            name: "Video 4", 
            icon: PlayCircle, 
            description: "Background video with overlay content",
            features: ["Background video", "Overlay content", "Performance optimized", "Fallback image"],
            category: "Content",
            subcategory: "Video",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fvideo-background.webp&w=1920&q=75",
            usageExample: "Perfect for immersive hero sections"
          },
          { 
            id: "video-5", 
            name: "Video 5", 
            icon: PlayCircle, 
            description: "Video gallery with thumbnail navigation",
            features: ["Thumbnail navigation", "Multiple videos", "Playlist support", "Smooth transitions"],
            category: "Content",
            subcategory: "Video",
            type: "Premium",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fvideo-gallery.webp&w=1920&q=75",
            usageExample: "Great for showcasing multiple videos"
          },
        ]
      },
      {
        name: "Gallery",
        icon: Image01,
        widgets: [
          { 
            id: "gallery-1", 
            name: "Gallery 1", 
            icon: Image01, 
            description: "Grid gallery with uniform image sizes",
            features: ["Grid layout", "Uniform sizing", "Responsive design", "Hover effects"],
            category: "Content",
            subcategory: "Gallery",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fgallery-grid.webp&w=1920&q=75",
            usageExample: "Perfect for portfolios and product showcases"
          },
          { 
            id: "gallery-2", 
            name: "Gallery 2", 
            icon: Image01, 
            description: "Masonry gallery with dynamic layouts",
            features: ["Masonry layout", "Dynamic sizing", "Pinterest-style", "Infinite scroll"],
            category: "Content",
            subcategory: "Gallery",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fgallery-masonry.webp&w=1920&q=75",
            usageExample: "Great for creative portfolios"
          },
          { 
            id: "gallery-3", 
            name: "Gallery 3", 
            icon: Image01, 
            description: "Carousel gallery with navigation controls",
            features: ["Carousel navigation", "Touch support", "Auto-advance", "Indicator dots"],
            category: "Content",
            subcategory: "Gallery",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fgallery-carousel.webp&w=1920&q=75",
            usageExample: "Ideal for featured content and testimonials"
          },
          { 
            id: "gallery-4", 
            name: "Gallery 4", 
            icon: Image01, 
            description: "Lightbox gallery with zoom functionality",
            features: ["Lightbox view", "Zoom functionality", "Keyboard navigation", "Full-screen mode"],
            category: "Content",
            subcategory: "Gallery",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fgallery-lightbox.webp&w=1920&q=75",
            usageExample: "Perfect for detailed image viewing"
          },
          { 
            id: "gallery-5", 
            name: "Gallery 5", 
            icon: Image01, 
            description: "Thumbnail gallery with preview functionality",
            features: ["Thumbnail preview", "Quick navigation", "Smooth transitions", "Responsive grid"],
            category: "Content",
            subcategory: "Gallery",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fgallery-thumbnail.webp&w=1920&q=75",
            usageExample: "Great for product galleries and portfolios"
          },
        ]
      },
      {
        name: "Cards",
        icon: File01,
        widgets: [
          { 
            id: "card-1", 
            name: "Card 1", 
            icon: File01, 
            description: "Simple card with clean design",
            features: ["Clean design", "Minimal styling", "Flexible content", "Responsive layout"],
            category: "Content",
            subcategory: "Cards",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fcard-simple.webp&w=1920&q=75",
            usageExample: "Perfect for content organization"
          },
          { 
            id: "card-2", 
            name: "Card 2", 
            icon: File01, 
            description: "Image card with content overlay",
            features: ["Image integration", "Content overlay", "Hover effects", "Visual appeal"],
            category: "Content",
            subcategory: "Cards",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fcard-image.webp&w=1920&q=75",
            usageExample: "Great for blog posts and articles"
          },
          { 
            id: "card-3", 
            name: "Card 3", 
            icon: File01, 
            description: "Feature card with icon and description",
            features: ["Icon integration", "Feature description", "Structured layout", "Call-to-action"],
            category: "Content",
            subcategory: "Cards",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fcard-feature.webp&w=1920&q=75",
            usageExample: "Ideal for service listings and features"
          },
          { 
            id: "card-4", 
            name: "Card 4", 
            icon: File01, 
            description: "Pricing card with plans and features",
            features: ["Pricing display", "Feature lists", "Comparison support", "CTA integration"],
            category: "Content",
            subcategory: "Cards",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fcard-pricing.webp&w=1920&q=75",
            usageExample: "Perfect for pricing pages and subscriptions"
          },
          { 
            id: "card-5", 
            name: "Card 5", 
            icon: File01, 
            description: "Profile card with user information",
            features: ["User information", "Profile image", "Social links", "Contact details"],
            category: "Content",
            subcategory: "Cards",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fcard-profile.webp&w=1920&q=75",
            usageExample: "Great for team pages and user profiles"
          },
        ]
      }
    ]
  },
  {
    name: "Advanced",
    subcategories: [
      {
        name: "Chart",
        icon: BarChart02,
        widgets: [
          { 
            id: "chart-1", 
            name: "Chart 1", 
            icon: BarChart02, 
            description: "Interactive bar chart with data visualization",
            features: ["Interactive bars", "Data tooltips", "Responsive design", "Animation effects"],
            category: "Advanced",
            subcategory: "Chart",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fchart-bar.webp&w=1920&q=75",
            usageExample: "Perfect for analytics dashboards"
          },
          { 
            id: "chart-2", 
            name: "Chart 2", 
            icon: BarChart02, 
            description: "Line chart for trend analysis",
            features: ["Trend visualization", "Multiple datasets", "Zoom functionality", "Export options"],
            category: "Advanced",
            subcategory: "Chart",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fchart-line.webp&w=1920&q=75",
            usageExample: "Great for financial and performance data"
          },
          { 
            id: "chart-3", 
            name: "Chart 3", 
            icon: BarChart02, 
            description: "Pie chart for proportional data",
            features: ["Proportional display", "Interactive segments", "Legend support", "Custom colors"],
            category: "Advanced",
            subcategory: "Chart",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fchart-pie.webp&w=1920&q=75",
            usageExample: "Ideal for survey results and demographics"
          },
          { 
            id: "chart-4", 
            name: "Chart 4", 
            icon: BarChart02, 
            description: "Donut chart with center statistics",
            features: ["Center statistics", "Elegant design", "Hover interactions", "Responsive layout"],
            category: "Advanced",
            subcategory: "Chart",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fchart-donut.webp&w=1920&q=75",
            usageExample: "Perfect for KPI dashboards"
          },
          { 
            id: "chart-5", 
            name: "Chart 5", 
            icon: BarChart02, 
            description: "Area chart with gradient fills",
            features: ["Gradient fills", "Stacked data", "Smooth curves", "Time series support"],
            category: "Advanced",
            subcategory: "Chart",
            type: "Premium",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fchart-area.webp&w=1920&q=75",
            usageExample: "Great for cumulative data visualization"
          },
        ]
      },
      {
        name: "Form",
        icon: Mail01,
        widgets: [
          { 
            id: "form-1", 
            name: "Form 1", 
            icon: Mail01, 
            description: "Professional contact form with validation",
            features: ["Form validation", "Email integration", "Spam protection", "Success messages"],
            category: "Advanced",
            subcategory: "Form",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fform-contact.webp&w=1920&q=75",
            usageExample: "Essential for business websites"
          },
          { 
            id: "form-2", 
            name: "Form 2", 
            icon: Mail01, 
            description: "Newsletter signup with email marketing integration",
            features: ["Email marketing", "Subscriber management", "Double opt-in", "Analytics tracking"],
            category: "Advanced",
            subcategory: "Form",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fform-newsletter.webp&w=1920&q=75",
            usageExample: "Perfect for lead generation"
          },
          { 
            id: "form-3", 
            name: "Form 3", 
            icon: Mail01, 
            description: "Survey form with multiple question types",
            features: ["Multiple question types", "Conditional logic", "Progress tracking", "Data export"],
            category: "Advanced",
            subcategory: "Form",
            type: "Premium",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fform-survey.webp&w=1920&q=75",
            usageExample: "Great for research and feedback collection"
          },
          { 
            id: "form-4", 
            name: "Form 4", 
            icon: Mail01, 
            description: "User registration form with account creation",
            features: ["Account creation", "Password validation", "Email verification", "User profiles"],
            category: "Advanced",
            subcategory: "Form",
            type: "Premium",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fform-registration.webp&w=1920&q=75",
            usageExample: "Essential for user-based applications"
          },
          { 
            id: "form-5", 
            name: "Form 5", 
            icon: Mail01, 
            description: "Feedback form with rating system",
            features: ["Rating system", "Feedback collection", "Sentiment analysis", "Response tracking"],
            category: "Advanced",
            subcategory: "Form",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fform-feedback.webp&w=1920&q=75",
            usageExample: "Perfect for customer satisfaction surveys"
          },
        ]
      },
      {
        name: "Navigation",
        icon: Menu01,
        widgets: [
          { 
            id: "space-header", 
            name: "Space Header", 
            icon: Menu01, 
            description: "Customizable space header with logo, navigation, and user controls",
            features: ["Logo display", "Navigation menu", "User controls", "Search functionality", "Notification system", "Responsive design"],
            category: "Advanced",
            subcategory: "Navigation",
            type: "Premium",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fspace-header.webp&w=1920&q=75",
            previewImage: "/Presets.png",
            usageExample: "Perfect for main space navigation and branding",
            author: "@bettermode",
            badges: [
              { type: "new", icon: Zap, color: "bg-green-500" },
              { type: "popular", icon: Star01, color: "bg-yellow-500" }
            ]
          },
          { 
            id: "nav-1", 
            name: "Navigation 1", 
            icon: Menu01, 
            description: "Horizontal navigation menu with dropdowns",
            features: ["Horizontal layout", "Dropdown menus", "Responsive design", "Active states"],
            category: "Advanced",
            subcategory: "Navigation",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fnav-horizontal.webp&w=1920&q=75",
            usageExample: "Perfect for main site navigation"
          },
          { 
            id: "nav-2", 
            name: "Navigation 2", 
            icon: Menu01, 
            description: "Vertical sidebar navigation",
            features: ["Vertical layout", "Collapsible sections", "Icon support", "Nested menus"],
            category: "Advanced",
            subcategory: "Navigation",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fnav-vertical.webp&w=1920&q=75",
            usageExample: "Great for admin dashboards"
          },
          { 
            id: "nav-3", 
            name: "Navigation 3", 
            icon: Menu01, 
            description: "Dropdown navigation with mega menu",
            features: ["Mega menu", "Rich content", "Category organization", "Visual previews"],
            category: "Advanced",
            subcategory: "Navigation",
            type: "Premium",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fnav-dropdown.webp&w=1920&q=75",
            usageExample: "Ideal for e-commerce sites"
          },
          { 
            id: "nav-4", 
            name: "Navigation 4", 
            icon: Menu01, 
            description: "Breadcrumb navigation for page hierarchy",
            features: ["Page hierarchy", "SEO friendly", "Clickable paths", "Responsive design"],
            category: "Advanced",
            subcategory: "Navigation",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fnav-breadcrumb.webp&w=1920&q=75",
            usageExample: "Perfect for deep site structures"
          },
          { 
            id: "nav-5", 
            name: "Navigation 5", 
            icon: Menu01, 
            description: "Tab navigation for content switching",
            features: ["Content switching", "Smooth transitions", "Keyboard navigation", "Accessible design"],
            category: "Advanced",
            subcategory: "Navigation",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fnav-tabs.webp&w=1920&q=75",
            usageExample: "Great for organizing related content"
          },
        ]
      }
    ]
  },
  {
    name: "Social",
    subcategories: [
      {
        name: "Social Media",
        icon: Users01,
        widgets: [
          { 
            id: "social-1", 
            name: "Social 1", 
            icon: Users01, 
            description: "Live social media feed with real-time updates",
            features: ["Real-time updates", "Multiple platforms", "Engagement tracking", "Moderation tools"],
            category: "Social",
            subcategory: "Social Media",
            type: "Premium",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fsocial-feed.webp&w=1920&q=75",
            usageExample: "Perfect for community engagement"
          },
          { 
            id: "social-2", 
            name: "Social 2", 
            icon: Globe01, 
            description: "Social sharing buttons for content distribution",
            features: ["Share buttons", "Multiple platforms", "Custom styling", "Analytics tracking"],
            category: "Social",
            subcategory: "Social Media",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fsocial-share.webp&w=1920&q=75",
            usageExample: "Great for content marketing"
          },
          { 
            id: "social-3", 
            name: "Social 3", 
            icon: Star01, 
            description: "Customer reviews and ratings widget",
            features: ["Review collection", "Star ratings", "Verified reviews", "Response system"],
            category: "Social",
            subcategory: "Social Media",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fsocial-reviews.webp&w=1920&q=75",
            usageExample: "Essential for building trust"
          },
          { 
            id: "social-4", 
            name: "Social 4", 
            icon: MessageSquare01, 
            description: "Comments section with moderation",
            features: ["Comment system", "Moderation tools", "User authentication", "Spam filtering"],
            category: "Social",
            subcategory: "Social Media",
            type: "Advanced",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fsocial-comments.webp&w=1920&q=75",
            usageExample: "Perfect for blog posts and articles"
          },
          { 
            id: "social-5", 
            name: "Social 5", 
            icon: Users01, 
            description: "Social media icons with links",
            features: ["Social icons", "Custom links", "Hover effects", "Brand consistency"],
            category: "Social",
            subcategory: "Social Media",
            type: "Basic",
            image: "https://blocks.tremor.so/_next/image?url=%2Fthumbnails%2Fsocial-icons.webp&w=1920&q=75",
            usageExample: "Great for footer and contact sections"
          },
        ]
      }
    ]
  }
]; 