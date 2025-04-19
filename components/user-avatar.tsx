import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface UserAvatarProps {
  src?: string
  name: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function UserAvatar({ src, name, size = "md" }: UserAvatarProps) {
  // Get initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  }

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={src || "/placeholder.svg"} alt={name} />
      <AvatarFallback className="bg-primary/10 text-primary">
        {src ? <User className="h-4 w-4" /> : initials}
      </AvatarFallback>
    </Avatar>
  )
}
