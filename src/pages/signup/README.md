# Signup Component Structure

This directory contains the refactored signup flow, broken down into smaller, more manageable components.

## Directory Structure

```
src/pages/signup/
├── README.md                    # This documentation
├── index.ts                     # Main exports
├── types.ts                     # TypeScript interfaces and types
├── constants.ts                 # Static data and constants
├── utils.ts                     # Utility functions and validation logic
├── steps/                       # Individual step components
│   ├── step1-email.tsx          # Email input step
│   ├── step2-verification.tsx   # Email verification step
│   ├── step3-basic-info.tsx     # Name input step
│   ├── step4-industry.tsx       # Industry selection step
│   ├── step5-role.tsx           # Role selection step
│   ├── step6-company.tsx        # Company name step
│   ├── step7-company-size.tsx   # Company size step
│   ├── step8-website.tsx        # Website URL step
│   ├── step9-integrations.tsx   # Integration selection step
│   ├── step10-enterprise.tsx    # Enterprise features step
│   └── step11-plan-selection.tsx # Plan selection step
└── sidebar/                     # Right sidebar content components
    ├── sidebar-content.tsx      # Main sidebar router
    ├── brand-showcase.tsx       # Brand logos and showcase
    ├── testimonial-content.tsx  # Customer testimonials
    ├── security-showcase.tsx    # Security and G2 awards
    └── plan-recommendation.tsx  # Plan recommendation content
```

## Key Benefits

1. **Maintainability**: Each step is now a separate component, making it easy to modify individual steps without affecting others.

2. **Reusability**: Components can be reused or easily moved to other parts of the application.

3. **Testability**: Each component can be tested in isolation.

4. **Code Organization**: Related functionality is grouped together logically.

5. **Performance**: Smaller components can be optimized individually.

## Usage

Import the main component:
```tsx
import { SignupPage } from '@/pages/signup';
```

Or import specific types/utilities:
```tsx
import { SignupFormData, validateStep } from '@/pages/signup';
```

## Original File

The original large `signup.tsx` file (2713 lines) has been backed up as `signup-original-backup.tsx` for reference.

## Component Props

Each step component follows a consistent prop pattern:
- `formData`: Current form state
- `errors`: Validation errors
- `onInputChange`: Handler for form field changes  
- `onNext`: Handler to advance to next step
- Additional step-specific props as needed

## State Management

All state is managed in the main `SignupPage` component and passed down to child components. This maintains a single source of truth while keeping components focused on presentation.
