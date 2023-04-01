import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva("", {
  variants: {
    variant: {
      outline: "border bg-transparent text-gray-c2",
      default: "bg-transparent text-gray-c2",
    },
    size: {
      sm: "text-sm px-2 py-1",
      md: "text-md px-3 py-2",
      lg: "text-lg px-4 py-3",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  // spread props for Radix UI
  ({ variant, size, children, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
