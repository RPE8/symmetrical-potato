import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes, forwardRef } from "react";

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

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, intent, fullWidth = false, ...props }, ref) => {
    return (
      <input
        className={twMerge(className, inputVariants({ intent, fullWidth }))}
        {...props}
      ></input>
    );
  }
);

Input.displayName = "Input";

export default Input;
