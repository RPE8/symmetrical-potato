import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva("text-gray-c2 dark:text-black-c2 bg-transparent", {
  variants: {
    variant: {
      outline: "border",
    },
    size: {
      sm: "text-sm px-2 py-1",
      md: "text-md px-3 py-2",
      lg: "text-lg px-4 py-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// ForwardRef is used for Radix UI
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  // spread `...props` for Radix UI
  ({ variant, size, children, onClick, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size })}
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }
        }}
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
