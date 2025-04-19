import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Jennifer Adams",
      image: "/images/patient-1.jpg",
      rating: 5,
      text: "MediBook made finding a specialist so easy. I booked an appointment with a cardiologist within minutes and received excellent care. Highly recommended!",
    },
    {
      id: 2,
      name: "Robert Thompson",
      image: "/images/patient-2.jpg",
      rating: 5,
      text: "As a busy professional, I appreciate how simple it is to book appointments through MediBook. The reminders are helpful and the doctors are top-notch.",
    },
    {
      id: 3,
      name: "Maria Garcia",
      image: "/images/patient-3.jpg",
      rating: 4,
      text: "I've been using MediBook for my family's healthcare needs for over a year now. The platform is intuitive and has made managing appointments so much easier.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">What Our Patients Say</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Read testimonials from patients who have used our platform
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
