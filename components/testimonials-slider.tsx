"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function TestimonialsSlider() {
  const testimonials = [
    {
      id: 1,
      name: "Jennifer Adams",
      image: "/images/patient-1.jpg",
      rating: 5,
      text: "MediBook made finding a specialist so easy. I booked an appointment with a cardiologist within minutes and received excellent care. Highly recommended!",
      profession: "Teacher",
    },
    {
      id: 2,
      name: "Robert Thompson",
      image: "/images/patient-2.jpg",
      rating: 5,
      text: "As a busy professional, I appreciate how simple it is to book appointments through MediBook. The reminders are helpful and the doctors are top-notch.",
      profession: "Software Engineer",
    },
    {
      id: 3,
      name: "Maria Garcia",
      image: "/images/patient-3.jpg",
      rating: 4,
      text: "I've been using MediBook for my family's healthcare needs for over a year now. The platform is intuitive and has made managing appointments so much easier.",
      profession: "Marketing Manager",
    },
    {
      id: 4,
      name: "David Chen",
      image: "/images/patient-2.jpg",
      rating: 5,
      text: "The quality of doctors on MediBook is exceptional. I was able to find a specialist for my condition quickly and the booking process was seamless.",
      profession: "Accountant",
    },
    {
      id: 5,
      name: "Sarah Johnson",
      image: "/images/patient-1.jpg",
      rating: 5,
      text: "MediBook has transformed how I manage healthcare for my elderly parents. The interface is user-friendly and the customer support is outstanding.",
      profession: "Nurse",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPaused, testimonials.length])

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">What Our Patients Say</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Read testimonials from patients who have used our platform
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <Card className="overflow-hidden mx-auto max-w-4xl">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={100}
                          height={100}
                          className="rounded-full border-4 border-primary/20"
                        />
                      </div>
                      <div>
                        <div className="flex mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                        <div>
                          <h3 className="font-bold text-lg">{testimonial.name}</h3>
                          <p className="text-muted-foreground">{testimonial.profession}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-16 testimonial-gradient" />
          <div className="absolute left-0 top-0 bottom-0 w-16 testimonial-gradient rotate-180" />

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  activeIndex === index ? "bg-primary w-6" : "bg-primary/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
