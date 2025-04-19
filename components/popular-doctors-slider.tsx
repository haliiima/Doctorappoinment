"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

export function PopularDoctorsSlider() {
  const doctors = [
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      reviews: 124,
      image: "/images/doctor-1.jpg",
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      rating: 4.8,
      reviews: 98,
      image: "/images/doctor-2.jpg",
    },
    {
      id: 4,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.9,
      reviews: 156,
      image: "/images/doctor-3.jpg",
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      specialty: "Dermatology",
      rating: 4.7,
      reviews: 87,
      image: "/images/doctor-4.jpg",
    },
    {
      id: 6,
      name: "Dr. Lisa Thompson",
      specialty: "Orthopedics",
      rating: 4.8,
      reviews: 112,
      image: "/images/doctor-5.jpg",
    },
    {
      id: 7,
      name: "Dr. Robert Garcia",
      specialty: "Ophthalmology",
      rating: 4.6,
      reviews: 76,
      image: "/images/doctor-6.jpg",
    },
    {
      id: 8,
      name: "Dr. Olivia Martinez",
      specialty: "Gynecology",
      rating: 4.9,
      reviews: 143,
      image: "/images/doctor-7.jpg",
    },
    {
      id: 9,
      name: "Dr. David Kim",
      specialty: "Psychiatry",
      rating: 4.8,
      reviews: 91,
      image: "/images/doctor-8.jpg",
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
    <section className="bg-muted py-16">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Popular Doctors</h2>
            <p className="mt-2 text-muted-foreground">Meet our highly rated and experienced medical professionals</p>
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
          {doctors.map((doctor) => (
            <div key={doctor.id} className="min-w-[280px] max-w-[280px] snap-start">
              <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-1 text-xl font-bold">{doctor.name}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{doctor.specialty}</p>
                  <div className="mb-4 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/doctors">View All Doctors</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
