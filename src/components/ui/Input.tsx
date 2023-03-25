import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes, InputHTMLAttributes, forwardRef } from "react";

const inputVariants = cva(
  "placeholder:text-gray-c2 font-weight-400 focus-visible:outline-none text-base font-normal",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        underline: "bg-transparent border-b border-gray-c2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input
        className={twMerge(className, inputVariants({ variant }))}
        {...props}
      ></input>
    );
  }
);

Input.displayName = "Input";

export default Input;
