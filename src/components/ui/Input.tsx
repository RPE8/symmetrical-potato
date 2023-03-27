import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes, forwardRef, useState, useRef } from "react";

const suggestionListVariants = cva(
  "px-4 py-2 bg-gray-c1 absolute border border-c3 border-t-0",
  {
    variants: {
      fullWidth: {
        true: "w-full",
      },
    },
  }
);

const suggestionItemVariants = cva(
  "text-gray-c4 hover:bg-gray-c2 cursor-pointer",
  {
    variants: {
      active: {
        true: "",
      },
    },
    defaultVariants: {
      active: true,
    },
  }
);

const divVariants = cva("relative", {
  variants: {
    fullWidth: {
      true: "w-full",
    },
  },
});

const inputVariants = cva(
  "placeholder:text-gray-c2 font-weight-400 focus-visible:outline-none text-base font-normal bg-transparent",
  {
    variants: {
      intent: {
        primary: "text-gray-c4",
        secondary: "text-gray-c3",
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

type Suggestion = {
  name: string;
  id: string;
};

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  suggestions?: Suggestion[];
  onSuggestionClick?: (suggestion: Suggestion) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      intent,
      fullWidth = false,
      suggestions,
      onSuggestionClick,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setRefs = (node: HTMLInputElement) => {
      if (!node) return;
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleSuggestionClick = () => {};

    return (
      <div className={twMerge(divVariants({ fullWidth }))}>
        <input
          ref={setRefs}
          className={twMerge(className, inputVariants({ intent, fullWidth }))}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
        />
        {suggestions && isFocused && (
          <ul
            className={twMerge(
              suggestionListVariants({
                fullWidth,
              })
            )}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className={twMerge(suggestionItemVariants({}))}
                onMouseDown={() => {
                  console.log("clikced");
                  if (onSuggestionClick) {
                    onSuggestionClick(suggestion);
                  }
                }}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
