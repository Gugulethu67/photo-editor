// components/GlassButton.jsx
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
    "rounded-2xl backdrop-blur-md bg-purple-500/30 border border-white/20 text-white shadow-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-200",
    secondary: "bg-purple-500/20 hover:bg-purple-500/30 text-purple-200",
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
