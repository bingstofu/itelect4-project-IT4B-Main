import * as React from "react";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`text-sm font-medium leading-none text-gray-700 dark:text-gray-300 ${className}`}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";