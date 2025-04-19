import { Calendar, Search, ThumbsUp } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="bg-muted py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">Book your appointment in 3 simple steps</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Find a Doctor</h3>
            <p className="text-muted-foreground">
              Search for doctors by specialty, location, or availability to find the perfect match for your healthcare
              needs.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Book Appointment</h3>
            <p className="text-muted-foreground">
              Select a convenient time slot from the doctor's available schedule and book your appointment instantly.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ThumbsUp className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Get Care</h3>
            <p className="text-muted-foreground">
              Visit the doctor at the scheduled time, receive quality care, and manage your health effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
