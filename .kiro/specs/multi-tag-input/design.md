# Design Document

## Overview

The Multi-Tag Input component is a reusable form input that allows users to manage a collection of text tags through an intuitive interface. It follows the AEVR registry patterns with CVA variants, proper TypeScript interfaces, and consistent styling. The component supports keyboard interactions, visual feedback, and integrates seamlessly with form libraries like Formik.

## Architecture

### Component Structure

```
MultiTagInput/
├── Component (main container)
├── TagsDisplay (flex container for tags)
│   └── Tag (individual tag with remove button)
├── InputField (textarea for new tag input)
└── TagCounter (displays current/max count)
```

### State Management

- **Internal State**: Current tags array, input focus state, input value
- **External State**: Controlled via `value` and `onChange` props
- **Validation**: Tag limits, duplicate detection, empty tag prevention

## Components and Interfaces

### Main Component Interface

```typescript
export interface MultiTagInputProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  // Core functionality
  value?: string[];
  onChange?: (tags: string[]) => void;

  // Configuration
  maxTags?: number;
  placeholder?: string;

  // Styling and variants
  variant?: "default" | "error";
  size?: "sm" | "md" | "lg";

  // Form integration
  name?: string;
  required?: boolean;
  disabled?: boolean;

  // Labels and descriptions
  label?: string;
  description?: string;
  error?: string;
}
```

### Tag Interface

```typescript
interface TagProps {
  children: string;
  onRemove: () => void;
  onEdit: () => void;
  size?: "sm" | "md" | "lg";
}
```

### CVA Variants

```typescript
const multiTagInputVariants = cva(
  "border rounded-[16px] min-h-[100px] overflow-hidden relative transition-colors",
  {
    variants: {
      variant: {
        default: "border-neutral-200 focus-within:border-[#656565]",
        error: "border-red-500",
      },
      size: {
        sm: "min-h-[80px] text-sm",
        md: "min-h-[100px] text-base",
        lg: "min-h-[120px] text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const tagVariants = cva(
  "flex items-center bg-[#FFE9B9] border border-[#FFE9B9] text-black px-3 py-1 rounded-[8px] font-medium",
  {
    variants: {
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
```

## Data Models

### Tag Data Structure

```typescript
// Tags are stored as simple strings in an array
type TagsArray = string[];

// Internal state structure
interface MultiTagInputState {
  tags: string[];
  inputValue: string;
  isFocused: boolean;
}
```

### Event Handling

```typescript
// Keyboard events for tag creation
interface KeyboardEventHandler {
  key: "Enter" | "," | "Backspace";
  action: "createTag" | "deleteLastTag" | "ignore";
}

// Tag manipulation events
interface TagEvent {
  type: "add" | "remove" | "edit";
  tag: string;
  index?: number;
}
```

## Error Handling

### Validation Rules

1. **Empty Tags**: Trim input and reject empty strings
2. **Duplicate Tags**: Case-sensitive comparison, reject duplicates
3. **Tag Limit**: Prevent adding tags when maxTags is reached
4. **Input Sanitization**: Remove commas from tag text during creation

### Error States

```typescript
interface ValidationResult {
  isValid: boolean;
  error?: "empty" | "duplicate" | "limit_reached" | "invalid_characters";
}
```

### Error Display

- Visual feedback through border color changes
- Error message display below component
- Graceful handling of edge cases (no visual disruption)

## Testing Strategy

### Unit Tests

- Tag addition with Enter and comma keys
- Tag removal functionality
- Tag editing (click to edit)
- Duplicate tag prevention
- Tag limit enforcement
- Input validation and sanitization

### Integration Tests

- Form library integration (Formik, React Hook Form)
- Controlled vs uncontrolled component behavior
- Accessibility compliance (keyboard navigation, screen readers)

### Visual Tests

- Component rendering with different variants
- Responsive behavior with many tags
- Focus states and hover effects
- Error state styling

## Implementation Details

### Key Features

1. **Keyboard Interactions**

   - Enter/Comma: Create new tag
   - Backspace on empty input: Remove last tag
   - Tab: Navigate away from component

2. **Mouse Interactions**

   - Click tag text: Edit tag
   - Click X button: Remove tag
   - Click input area: Focus input

3. **Visual Feedback**

   - Focus states with border color changes
   - Hover effects on interactive elements
   - Tag count display
   - Error state styling

4. **Accessibility**
   - Proper ARIA labels
   - Keyboard navigation support
   - Screen reader compatibility
   - Focus management

### Registry Integration

- Component file: `registry/lagos/ui/multi-tag-input.tsx`
- JSON config: `public/r/multi-tag-input.json`
- Dependencies: `iconsax-react`, `class-variance-authority`
- Target path: `components/ui/aevr/multi-tag-input.tsx`

### Styling Approach

- Uses existing design tokens and patterns
- Consistent with other form components
- Responsive design with proper spacing
- Dark mode support through CSS variables

### Performance Considerations

- Efficient re-rendering with proper key props
- Debounced input handling for large tag lists
- Minimal DOM manipulation
- Optimized event handlers with useCallback
