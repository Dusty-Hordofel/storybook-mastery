import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

//cva allow us to difine different style for our component.the first parameter is the default style of our button component.
// after we define diffents props or variants our button will accept
// compoundVariants to combine mutilple variants
//primary color is not supported by tailwind , we extends our tailwind config to support this

const buttonStyles = cva(
  [
    "w-full",
    "rounded-md",
    "font-semibold",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        solid: "",
        outline: "border-2",
        ghost: "transition-colors duration-300",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      colorscheme: {
        primary: "text-white",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        colorscheme: "primary",
        className: "bg-primary-500 hover:bg-primary-600",
      },
      {
        variant: "outline",
        colorscheme: "primary",
        className:
          "text-primary-600 border-primary-500 bg-transparent hover:bg-primary-100",
      },
      {
        variant: "ghost",
        colorscheme: "primary",
        className: "text-primary-600 bg-transparent hover:bg-primary-100",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      colorscheme: "primary",
    },
  }
);

// extend our button props by using VariantProps . our button will receive all props defined on buttonStyles
type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonStyles>;

// to potentially update the style of our button component

// this Button component great so actually we are missing like to make this component u Library proof we're actually missing one property which is the ref prop in order to have the ref prop which should be like be able to access here we have to use the forward ref function provided by react this forward ref function accept two type parameters the one is the props the the element that we are working on in this case an <HTMLButtonElement> and the second is the props that the component accept as input so this forward ref accept in input function  <ButtonProps>.

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, colorscheme, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size, colorscheme, className }))}
        {...props}
      />
    );
  }
);
