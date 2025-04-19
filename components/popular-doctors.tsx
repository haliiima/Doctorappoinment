import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PopularDoctors() {
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
  ]

  return (
    <section className="bg-muted py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Popular Doctors</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Meet our highly rated and experienced medical professionals
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden transition-all hover:shadow-lg">
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
