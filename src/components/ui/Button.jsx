import React from "react";

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary:
      "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400",
    outline:
      "border border-green-500 text-green-700 bg-white hover:bg-green-50 focus:ring-green-400",
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} rounded-full px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 