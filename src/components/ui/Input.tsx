import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { Suggestion } from "@/components/ui/SuggestionList";
import SuggestionList from "@/components/ui/SuggestionList";
import {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";

const divVariants = cva("relative", {
  variants: {
    fullWidth: {
      true: "w-full",
    },
  },
});

const inputVariants = cva(
  "placeholder:text-gray-c2 dark:placeholder:text-black-c2 font-weight-400 focus-visible:outline-none text-base font-normal bg-transparent",
  {
    variants: {
      intent: {
        primary: "text-gray-c3 dark:text-black-c3",
        secondary: "text-gray-c3 dark:text-black-c3",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  suggestions?: Suggestion[];
  onSuggestionClick?: (suggestion: Suggestion) => void;
  isLoading?: boolean;
}

// ForwardRef is used for Radix UI
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    // spread `...props` for Radix UI
    {
      className,
      intent,
      fullWidth,
      suggestions,
      onSuggestionClick,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // cva return boolean | null. Which is not compatible with boolean | undefined
    fullWidth = fullWidth || undefined;

    // ref is for Radix UI
    // inputRef for iternal use
    const setRefs = (node: HTMLInputElement) => {
      if (!node) return;
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Setting suggestion to Array means that they shoudl be displayed, but there might be no suggestions
    // If suggestions is not an Array, it means that they shouldn't be displayed
    const isDisplaySuggestions =
      Array.isArray(suggestions) &&
      (isLoading || suggestions.length > 0) &&
      isFocused;

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    useEffect(() => {
      if (isFocused) {
        inputRef.current?.focus();
      } else {
        inputRef.current?.blur();
      }
    }, [isFocused]);

    return (
      <div className={twMerge(divVariants({ fullWidth }))}>
        <input
          ref={setRefs}
          className={twMerge(className, inputVariants({ intent, fullWidth }))}
          onFocus={handleFocus}
          onBlur={handleBlur}
          //   remove browser autocomplete
          autoComplete="off"
          {...props}
        />
        {isDisplaySuggestions && (
          <SuggestionList
            fullWidth={fullWidth}
            isLoading={isLoading}
            suggestions={suggestions}
            onSuggestionClick={onSuggestionClick}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
