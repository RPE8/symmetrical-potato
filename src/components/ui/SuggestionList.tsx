import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

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
  "text-gray-c4 hover:bg-gray-c2 cursor-pointer my-2",
  {
    variants: {
      active: {
        true: "",
      },
      loading: {
        true: "animate-pulse bg-gray-c2 h-5 rounded-md",
      },
    },
    defaultVariants: {
      active: true,
      loading: false,
    },
  }
);

export type Suggestion = {
  name: string;
  id: string;
};

interface SuggestionListProps<T extends { id: string; name: string }>
  extends HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof suggestionListVariants> {
  fullWidth?: boolean;
  suggestions?: T[];
  onSuggestionClick?: (suggestion: T) => void;
  isLoading?: boolean;
}

// ForwardRef is used for Radix UI
const SuggestionList = forwardRef<
  HTMLUListElement,
  SuggestionListProps<Suggestion>
>(
  (
    // spread `...props` for Radix UI
    { suggestions, fullWidth = false, onSuggestionClick, isLoading, ...props },
    ref
  ) => {
    // If suggeston is not an Array, it mean, that they don't need to be displayed
    if (!Array.isArray(suggestions)) {
      return null;
    }
    return (
      <ul
        ref={ref}
        className={twMerge(
          suggestionListVariants({
            fullWidth,
          })
        )}
        {...props}
      >
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className={twMerge(
                suggestionItemVariants({ loading: isLoading })
              )}
              onMouseDown={() => {
                if (onSuggestionClick) {
                  onSuggestionClick(suggestion);
                }
              }}
            >
              {suggestion.name}
            </li>
          ))
        ) : (
          // Displays 3 loading items if suggestion is loading
          <>
            <div
              className={twMerge(
                suggestionItemVariants({ loading: isLoading })
              )}
            ></div>
            <div
              className={twMerge(
                suggestionItemVariants({ loading: isLoading })
              )}
            ></div>
            <div
              className={twMerge(
                suggestionItemVariants({ loading: isLoading })
              )}
            ></div>
          </>
        )}
      </ul>
    );
  }
);

SuggestionList.displayName = "SuggestionList";
export default SuggestionList;
