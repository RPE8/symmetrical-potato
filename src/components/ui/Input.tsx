import { HTMLAttributes, forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <input {...props} ref={ref}></input>;
});

Input.displayName = "Input";

export default Input;
