import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { PopularDoctorsSlider } from "@/components/popular-doctors-slider"
import { SpecialtiesSlider } from "@/components/specialties-slider"
import { TestimonialsSlider } from "@/components/testimonials-slider"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <SpecialtiesSlider />
        <PopularDoctorsSlider />
        <TestimonialsSlider />
      </main>
      <Footer />
    </div>
  )
}
