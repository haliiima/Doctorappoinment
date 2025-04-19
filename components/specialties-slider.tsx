"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, TreesIcon as Lungs, Pill, Stethoscope, Syringe, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"

export function SpecialtiesSlider() {
  const specialties = [
    {
      name: "Cardiology",
      description: "Heart and cardiovascular system specialists",
      icon: Heart,
      slug: "cardiology",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-500",
    },
    {
      name: "Neurology",
      description: "Brain, spinal cord and nervous system experts",
      icon: Brain,
      slug: "neurology",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-500",
    },
    {
      name: "Pulmonology",
      description: "Respiratory system and lung specialists",
      icon: Lungs,
      slug: "pulmonology",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500",
    },
    {
      name: "General Medicine",
      description: "Primary care and general health practitioners",
      icon: Stethoscope,
      slug: "general-medicine",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-500",
    },
    {
      name: "Pediatrics",
      description: "Child and adolescent healthcare specialists",
      icon: Syringe,
      slug: "pediatrics",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "text-yellow-500",
    },
    {
      name: "Dermatology",
      description: "Skin, hair and nail health experts",
      icon: Pill,
      slug: "dermatology",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-500",
    },
  ]

  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const container = containerRef.current
      const cardWidth = container.querySelector("div")?.offsetWidth || 0
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })

      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }

  return (
    <section className="py-16 hero-pattern">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Specialties</h2>
            <p className="mt-2 text-muted-foreground">
              We offer a wide range of medical specialties to meet all your healthcare needs
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} disabled={scrollPosition <= 0}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {specialties.map((specialty) => (
            <div key={specialty.slug} className="min-w-[300px] max-w-[300px] snap-start">
              <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                <CardContent className="p-6">
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${specialty.bgColor}`}>
                    <specialty.icon className={`h-7 w-7 ${specialty.iconColor}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{specialty.name}</h3>
                  <p className="mb-4 text-muted-foreground">{specialty.description}</p>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/specialties/${specialty.slug}`}>View Doctors</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/specialties">View All Specialties</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
