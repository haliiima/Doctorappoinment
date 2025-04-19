"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { useMobile } from "@/hooks/use-mobile"
import { Menu, User, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {!isMobile ? (
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/doctors" className="text-sm font-medium">
              Find Doctors
            </Link>
            <Link href="/specialties" className="text-sm font-medium">
              Specialties
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium">
              Contact
            </Link>
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          {!isMobile ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/doctor-login">Doctor Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin-login">Admin Login</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm">Book Appointment</Button>
              <ModeToggle />
            </>
          ) : (
            <>
              <ModeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="container pb-4">
          <nav className="flex flex-col gap-2">
            <Link href="/" className="rounded-md px-3 py-2 hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/doctors" className="rounded-md px-3 py-2 hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
              Find Doctors
            </Link>
            <Link
              href="/specialties"
              className="rounded-md px-3 py-2 hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Specialties
            </Link>
            <Link href="/about" className="rounded-md px-3 py-2 hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className="rounded-md px-3 py-2 hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <div className="my-2 border-t" />
            <Link href="/login" className="rounded-md px-3 py-2 hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md px-3 py-2 hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              href="/doctor-login"
              className="rounded-md px-3 py-2 hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Doctor Login
            </Link>
            <Link
              href="/admin-login"
              className="rounded-md px-3 py-2 hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
            <Button className="mt-2" onClick={() => setIsMenuOpen(false)}>
              Book Appointment
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
