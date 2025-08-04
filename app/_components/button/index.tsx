import { cn } from "@/app/_utils";
import React, { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "success" | "warning" | "error";
};

const Button: React.FC<Props> = ({
  children,
  className,
  variant = "error",
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "bg-red-500 disabled:bg-red-300 rounded-full transition delay-150 duration-300 ease-in-outdelay-150 ease-in-out hover:cursor-pointer disabled:cursor-default  px-10 py-4 text-2xl md:text-3xl font-bold capitalize",
        variant == "success" && "bg-green-600 disabled:bg-green-400",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
