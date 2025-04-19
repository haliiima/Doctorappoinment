import { HeartPulse } from "lucide-react"
import Link from "next/link"

export function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "h-6 w-6",
    default: "h-8 w-8",
    large: "h-12 w-12",
  }

  const textClasses = {
    small: "text-lg",
    default: "text-xl",
    large: "text-2xl",
  }

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600 animate-pulse-slow" />
        <HeartPulse
          className={`absolute inset-0 m-auto text-primary-foreground ${size === "small" ? "h-4 w-4" : size === "large" ? "h-7 w-7" : "h-5 w-5"}`}
        />
      </div>
      <span className={`font-bold ${textClasses[size]}`}>
        <span className="text-primary">Medi</span>
        <span>Book</span>
      </span>
    </Link>
  )
}
