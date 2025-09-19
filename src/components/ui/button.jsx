import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  const variants = {
    default: "bg-navy-600 text-white hover:bg-navy-700 border-navy-600 hover:border-navy-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-navy-300 bg-transparent text-navy-300 hover:bg-navy-600 hover:text-white",
    secondary: "bg-navy-800 text-navy-100 hover:bg-navy-700",
    ghost: "hover:bg-navy-800 hover:text-navy-100 text-navy-300",
    link: "text-navy-400 underline-offset-4 hover:underline",
    glow: "bg-gradient-to-r from-navy-600 to-purple-600 text-white hover:from-navy-500 hover:to-purple-500 shadow-lg hover:shadow-navy-500/25 glow-navy btn-glow"
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  }
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }