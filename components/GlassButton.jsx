import React from "react";
import clsx from "clsx";

export default function GlassButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles =
    "rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30",
    secondary:
      "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
