import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, TreesIcon as Lungs, Pill, Stethoscope, Syringe } from "lucide-react"
import Link from "next/link"

export function Specialties() {
  const specialties = [
    {
      name: "Cardiology",
      description: "Heart and cardiovascular system specialists",
      icon: Heart,
      slug: "cardiology",
    },
    {
      name: "Neurology",
      description: "Brain, spinal cord and nervous system experts",
      icon: Brain,
      slug: "neurology",
    },
    {
      name: "Pulmonology",
      description: "Respiratory system and lung specialists",
      icon: Lungs,
      slug: "pulmonology",
    },
    {
      name: "General Medicine",
      description: "Primary care and general health practitioners",
      icon: Stethoscope,
      slug: "general-medicine",
    },
    {
      name: "Pediatrics",
      description: "Child and adolescent healthcare specialists",
      icon: Syringe,
      slug: "pediatrics",
    },
    {
      name: "Dermatology",
      description: "Skin, hair and nail health experts",
      icon: Pill,
      slug: "dermatology",
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Our Specialties</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            We offer a wide range of medical specialties to meet all your healthcare needs
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty) => (
            <Card key={specialty.slug} className="overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <specialty.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{specialty.name}</h3>
                <p className="mb-4 text-muted-foreground">{specialty.description}</p>
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/specialties/${specialty.slug}`}>View Doctors</Link>
                </Button>
              </CardContent>
            </Card>
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
