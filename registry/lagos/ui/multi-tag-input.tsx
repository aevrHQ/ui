// ./registry/lagos/ui/multi-tag-input.tsx

/**
 * MultiTagInput Component
 *
 * A reusable multi-tag input component that allows users to add, edit, and remove tags
 * through an intuitive interface. Supports both controlled and uncontrolled usage patterns.
 *
 * @example
 * // Basic uncontrolled usage
 * <MultiTagInput placeholder="Add tags..." />
 *
 * @example
 * // Controlled usage with state management
 * const [tags, setTags] = useState<string[]>([]);
 * <MultiTagInput
 *   value={tags}
 *   onChange={setTags}
 *   maxTags={5}
 *   placeholder="Enter keywords..."
 * />
 *
 * @example
 * // Form integration with validation
 * <MultiTagInput
 *   label="Skills"
 *   description="Add your technical skills"
 *   value={formik.values.skills}
 *   onChange={(tags) => formik.setFieldValue('skills', tags)}
 *   error={formik.errors.skills}
 *   required
 *   maxTags={10}
 * />
 *
 * @example
 * // Different sizes and variants
 * <MultiTagInput size="sm" variant="default" />
 * <MultiTagInput size="lg" variant="error" />
 *
 * @example
 * // Disabled state
 * <MultiTagInput
 *   value={['React', 'TypeScript']}
 *   disabled
 *   label="Read-only tags"
 * />
 *
 * Features:
 * - Add tags by typing and pressing Enter or comma
 * - Remove tags by clicking the X button
 * - Edit tags by clicking on the tag text (edit-in-place)
 * - Drag and drop to reorder tags
 * - Duplicate prevention (case-sensitive)
 * - Configurable tag limits
 * - Form integration support
 * - Accessibility compliant
 * - Responsive design with proper wrapping
 * - CVA variants for consistent styling
 *
 * Keyboard Interactions:
 * - Enter/Comma: Create new tag from input or save edited tag
 * - Escape: Cancel editing mode
 * - Click tag text: Edit existing tag in-place
 * - Click X button: Remove tag
 * - Drag tag: Reorder tags by dragging and dropping
 * - Tab: Navigate away from component
 *
 * Accessibility:
 * - Proper ARIA labels for screen readers
 * - Keyboard navigation support
 * - Focus management
 * - Required field indicators
 */

"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CloseCircle } from "iconsax-react";
import { cn } from "@/lib/utils";

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
      disabled: {
        true: "opacity-50 cursor-not-allowed bg-gray-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
    },
  }
);

const tagVariants = cva(
  "flex items-center bg-[#FFE9B9] border border-[#FFE9B9] text-black px-3 py-1 rounded-[8px] font-medium cursor-pointer",
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

/**
 * Props interface for the MultiTagInput component
 *
 * @interface MultiTagInputProps
 * @extends {Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">}
 * @extends {VariantProps<typeof multiTagInputVariants>}
 */
export interface MultiTagInputProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      "value" | "onChange"
    >,
    VariantProps<typeof multiTagInputVariants> {
  // Core functionality
  /**
   * Array of tag strings for controlled component usage
   * @example value={['React', 'TypeScript', 'JavaScript']}
   */
  value?: string[];

  /**
   * Callback function called when tags array changes
   * @param tags - Updated array of tag strings
   * @example onChange={(tags) => setTags(tags)}
   */
  onChange?: (tags: string[]) => void;

  // Configuration
  /**
   * Maximum number of tags allowed
   * @default 10
   * @example maxTags={5}
   */
  maxTags?: number;

  /**
   * Placeholder text for the input field
   * @default "Type and press Enter or comma to add tags..."
   * @example placeholder="Enter your skills..."
   */
  placeholder?: string;

  // Form integration
  /**
   * Name attribute for form integration
   * @example name="skills"
   */
  name?: string;

  /**
   * Whether the field is required (shows asterisk)
   * @default false
   * @example required={true}
   */
  required?: boolean;

  /**
   * Whether the component is disabled
   * @default false
   * @example disabled={isLoading}
   */
  disabled?: boolean;

  // Labels and descriptions
  /**
   * Label text displayed above the component
   * @example label="Technical Skills"
   */
  label?: string;

  /**
   * Description text displayed below the component
   * @example description="Add up to 10 skills"
   */
  description?: string;

  /**
   * Error message displayed in red below the component
   * @example error="At least 3 skills are required"
   */
  error?: string;
}

/**
 * Props interface for individual Tag components
 *
 * @interface TagProps
 * @extends {VariantProps<typeof tagVariants>}
 */
export interface TagProps extends VariantProps<typeof tagVariants> {
  /**
   * The text content of the tag
   * @example children="React"
   */
  children: string;

  /**
   * Callback function called when the remove button is clicked
   * @example onRemove={() => removeTag(index)}
   */
  onRemove: () => void;

  /**
   * Callback function called when the tag text is clicked for editing
   * @example onEdit={() => editTag(index)}
   */
  onEdit: () => void;

  /**
   * Additional CSS classes for custom styling
   * @example className="custom-tag-style"
   */
  className?: string;

  /**
   * Whether the tag is disabled (non-interactive)
   * @default false
   * @example disabled={true}
   */
  disabled?: boolean;

  /**
   * Index of the tag for drag and drop operations
   * @example index={0}
   */
  index?: number;

  /**
   * Callback function called when dragging starts
   * @example onDragStart={(index) => setDraggedIndex(index)}
   */
  onDragStart?: (index: number) => void;

  /**
   * Callback function called when dropping on this tag
   * @example onDrop={(draggedIndex, targetIndex) => reorderTags(draggedIndex, targetIndex)}
   */
  onDrop?: (draggedIndex: number, targetIndex: number) => void;

  /**
   * Whether this tag is currently being dragged
   * @default false
   */
  isDragging?: boolean;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      onRemove,
      onEdit,
      size,
      className,
      disabled,
      index = 0,
      onDragStart,
      onDrop,
      isDragging = false,
      ...props
    },
    ref
  ) => {
    const [dragOver, setDragOver] = React.useState(false);

    const handleDragStart = (e: React.DragEvent) => {
      if (disabled) return;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", index.toString());
      onDragStart?.(index);
    };

    const handleDragOver = (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOver(true);
    };

    const handleDragLeave = () => {
      setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      setDragOver(false);
      const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
      if (draggedIndex !== index) {
        onDrop?.(draggedIndex, index);
      }
    };

    return (
      <div
        ref={ref}
        draggable={!disabled}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          tagVariants({ size, className }),
          disabled && "opacity-50",
          isDragging && "opacity-50 scale-95",
          dragOver && "ring-2 ring-blue-300 ring-offset-1",
          !disabled && "cursor-move hover:shadow-md transition-all duration-200"
        )}
        {...props}
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onEdit();
          }}
          className={disabled ? "cursor-default" : "cursor-pointer"}
        >
          {children}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onRemove();
          }}
          disabled={disabled}
          className={cn(
            "ml-2 text-gray-500 rounded-full p-0.5 transition-all duration-200",
            disabled
              ? "cursor-not-allowed"
              : "hover:text-red-500 hover:bg-red-50 cursor-pointer"
          )}
          aria-label={`Remove ${children} tag`}
        >
          <CloseCircle color="red" variant="TwoTone" size={16} />
        </button>
      </div>
    );
  }
);

Tag.displayName = "Tag";

/**
 * MultiTagInput Component
 *
 * A comprehensive multi-tag input component with full form integration support.
 *
 * @example
 * // 1. Basic Uncontrolled Usage
 * function BasicExample() {
 *   return (
 *     <MultiTagInput
 *       placeholder="Add your interests..."
 *       maxTags={5}
 *     />
 *   );
 * }
 *
 * @example
 * // 2. Controlled Usage with State
 * function ControlledExample() {
 *   const [tags, setTags] = useState<string[]>(['React', 'TypeScript']);
 *
 *   return (
 *     <MultiTagInput
 *       value={tags}
 *       onChange={setTags}
 *       label="Technical Skills"
 *       description="Add your programming skills"
 *       maxTags={10}
 *       required
 *     />
 *   );
 * }
 *
 * @example
 * // 3. Form Integration with Formik
 * function FormikExample() {
 *   const formik = useFormik({
 *     initialValues: { skills: [] },
 *     validationSchema: Yup.object({
 *       skills: Yup.array().min(1, 'At least one skill is required')
 *     }),
 *     onSubmit: (values) => console.log(values)
 *   });
 *
 *   return (
 *     <form onSubmit={formik.handleSubmit}>
 *       <MultiTagInput
 *         name="skills"
 *         label="Skills"
 *         value={formik.values.skills}
 *         onChange={(tags) => formik.setFieldValue('skills', tags)}
 *         error={formik.touched.skills && formik.errors.skills}
 *         required
 *       />
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * }
 *
 * @example
 * // 4. React Hook Form Integration
 * function ReactHookFormExample() {
 *   const { control, handleSubmit } = useForm({
 *     defaultValues: { tags: [] }
 *   });
 *
 *   return (
 *     <form onSubmit={handleSubmit(console.log)}>
 *       <Controller
 *         name="tags"
 *         control={control}
 *         render={({ field, fieldState }) => (
 *           <MultiTagInput
 *             {...field}
 *             label="Categories"
 *             error={fieldState.error?.message}
 *             maxTags={8}
 *           />
 *         )}
 *       />
 *     </form>
 *   );
 * }
 *
 * @example
 * // 5. Different Sizes and Variants
 * function VariantsExample() {
 *   return (
 *     <div className="space-y-4">
 *       <MultiTagInput size="sm" label="Small Size" />
 *       <MultiTagInput size="md" label="Medium Size (default)" />
 *       <MultiTagInput size="lg" label="Large Size" />
 *       <MultiTagInput variant="error" label="Error State" />
 *       <MultiTagInput disabled label="Disabled State" value={['Read-only']} />
 *     </div>
 *   );
 * }
 *
 * @example
 * // 6. Advanced Usage with Custom Validation
 * function AdvancedExample() {
 *   const [tags, setTags] = useState<string[]>([]);
 *   const [error, setError] = useState<string>('');
 *
 *   const handleTagsChange = (newTags: string[]) => {
 *     setTags(newTags);
 *
 *     // Custom validation
 *     if (newTags.length < 2) {
 *       setError('Please add at least 2 tags');
 *     } else if (newTags.some(tag => tag.length < 3)) {
 *       setError('Each tag must be at least 3 characters long');
 *     } else {
 *       setError('');
 *     }
 *   };
 *
 *   return (
 *     <MultiTagInput
 *       value={tags}
 *       onChange={handleTagsChange}
 *       label="Project Tags"
 *       description="Add descriptive tags for your project. Drag to reorder, click to edit."
 *       error={error}
 *       maxTags={15}
 *       placeholder="e.g., web-development, react, typescript..."
 *     />
 *   );
 * }
 *
 * @example
 * // 7. Drag and Drop with Edit-in-Place Demo
 * function DragDropExample() {
 *   const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'Next.js', 'Tailwind']);
 *
 *   return (
 *     <MultiTagInput
 *       value={tags}
 *       onChange={setTags}
 *       label="Skills (Drag to Reorder)"
 *       description="Click any tag to edit it in-place, or drag to reorder"
 *       placeholder="Add more skills..."
 *     />
 *   );
 * }
 */
const MultiTagInput = React.forwardRef<HTMLTextAreaElement, MultiTagInputProps>(
  (
    {
      className,
      variant,
      size,
      value = [],
      onChange,
      maxTags = 10,
      placeholder = "Type and press Enter or comma to add tags...",
      label,
      description,
      error,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const [internalTags, setInternalTags] = React.useState<string[]>([]);
    const [inputValue, setInputValue] = React.useState("");
    const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
    const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Use controlled value if provided, otherwise use internal state
    const isControlled = onChange !== undefined;
    const tags = React.useMemo(() => {
      return isControlled ? value || [] : internalTags;
    }, [isControlled, value, internalTags]);

    // Sync internal state with controlled value when it changes
    React.useEffect(() => {
      if (isControlled && value !== undefined) {
        setInternalTags(value);
      }
    }, [value, isControlled]);

    const updateTags = React.useCallback(
      (newTags: string[]) => {
        if (isControlled) {
          onChange?.(newTags);
        } else {
          setInternalTags(newTags);
        }
      },
      [isControlled, onChange]
    );

    const removeTag = React.useCallback(
      (index: number) => {
        if (disabled) return;
        const newTags = tags.filter((_, i) => i !== index);
        updateTags(newTags);
      },
      [tags, updateTags, disabled]
    );

    const editTag = React.useCallback(
      (index: number) => {
        if (disabled) return;
        const tagToEdit = tags[index];
        setEditingIndex(index);
        setInputValue(tagToEdit);

        // Focus the input field when editing a tag
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
          }
        }, 0);
      },
      [tags, disabled]
    );

    const reorderTags = React.useCallback(
      (draggedIndex: number, targetIndex: number) => {
        if (disabled) return;
        const newTags = [...tags];
        const [draggedTag] = newTags.splice(draggedIndex, 1);
        newTags.splice(targetIndex, 0, draggedTag);
        updateTags(newTags);
        setDraggedIndex(null);
      },
      [tags, updateTags, disabled]
    );

    const handleTagInput = React.useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (disabled) return;

        if (e.key === "Enter" || e.key === ",") {
          e.preventDefault();

          // Trim whitespace and check for empty tags
          const trimmedValue = inputValue.trim();
          if (!trimmedValue) {
            return;
          }

          // If we're editing a tag, update it in place
          if (editingIndex !== null) {
            // Check for duplicate tags (excluding the current editing tag)
            const otherTags = tags.filter((_, i) => i !== editingIndex);
            if (otherTags.includes(trimmedValue)) {
              setInputValue("");
              setEditingIndex(null);
              return;
            }

            const newTags = [...tags];
            newTags[editingIndex] = trimmedValue;
            updateTags(newTags);
            setInputValue("");
            setEditingIndex(null);
            return;
          }

          // Check for duplicate tags (case-sensitive comparison)
          if (tags.includes(trimmedValue)) {
            setInputValue("");
            return;
          }

          // Enforce tag limit
          if (tags.length >= maxTags) {
            return;
          }

          // Add the new tag
          const newTags = [...tags, trimmedValue];
          updateTags(newTags);
          setInputValue("");
        }

        // Cancel editing on Escape
        if (e.key === "Escape" && editingIndex !== null) {
          setInputValue("");
          setEditingIndex(null);
        }
      },
      [inputValue, tags, maxTags, updateTags, disabled, editingIndex]
    );

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={cn(
            multiTagInputVariants({
              variant: error ? "error" : variant,
              size,
              disabled,
              className,
            })
          )}
        >
          {/* Tags Display */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 pb-0">
              {tags.map((tag, index) => (
                <Tag
                  key={`${tag}-${index}`}
                  size={size}
                  disabled={disabled}
                  index={index}
                  isDragging={draggedIndex === index}
                  onRemove={() => removeTag(index)}
                  onEdit={() => editTag(index)}
                  onDragStart={setDraggedIndex}
                  onDrop={reorderTags}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          )}

          {/* Input Field */}
          <textarea
            ref={(node) => {
              textareaRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            value={inputValue}
            onChange={(e) => !disabled && setInputValue(e.target.value)}
            onKeyDown={handleTagInput}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full p-3 bg-transparent border-none outline-none resize-none disabled:cursor-not-allowed"
            rows={1}
            {...props}
          />
        </div>

        {/* Tag Counter */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {tags.length}/{maxTags} tags
          </span>
          {description && !error && <span>{description}</span>}
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

MultiTagInput.displayName = "MultiTagInput";

export { MultiTagInput, multiTagInputVariants, tagVariants, Tag };
