"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Phone, Star, Mail, Award, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Doctor {
  id: number
  name: string
  specialty: string
  location: string
  rating: number
  reviews: number
  image: string
  bio: string
  education: string[]
  experience: string[]
  availability: string
}

export default function DoctorDetailPage({ params }: { params: { id: string } }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [reason, setReason] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch doctor")
        }
        const data = await response.json()
        setDoctor(data.doctor)
      } catch (error) {
        console.error("Error fetching doctor:", error)
        toast({
          title: "Error",
          description: "Failed to load doctor information",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDoctor()
  }, [params.id, toast])

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !reason) {
      toast({
        title: "Missing information",
        description: "Please select a date, time, and provide a reason for your visit",
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: Number(params.id),
          date: selectedDate,
          time: selectedTime,
          reason,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to book appointment")
      }

      toast({
        title: "Appointment booked",
        description: "Your appointment has been successfully booked",
      })

      router.push("/patient-dashboard")
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: "Booking failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container flex-1 py-8">
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-center">
              <div className="h-8 w-64 bg-muted rounded mb-4 mx-auto"></div>
              <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container flex-1 py-8">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Doctor not found</h1>
              <p className="text-muted-foreground">The doctor you are looking for does not exist</p>
              <Button className="mt-4" onClick={() => router.push("/doctors")}>
                Back to Doctors
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={doctor.image || "/placeholder.svg?height=400&width=400"}
                      alt={doctor.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">{doctor.name}</h1>
                    <p className="text-muted-foreground">{doctor.specialty}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>contact@medibook.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{doctor.availability}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">Biography</h2>
                      <p className="mb-6">{doctor.bio}</p>

                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Education
                      </h2>
                      <ul className="space-y-2 mb-6">
                        {doctor.education.map((edu, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>

                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        Experience
                      </h2>
                      <ul className="space-y-2 mb-6">
                        {doctor.experience.map((exp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>

                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Specializations
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "General Consultation",
                          "Preventive Care",
                          "Chronic Disease Management",
                          "Health Checkups",
                        ].map((spec, index) => (
                          <span key={index} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="schedule" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Select Date</label>
                          <input
                            type="date"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Available Time Slots</label>
                          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {availableTimes.map((time) => (
                              <button
                                key={time}
                                type="button"
                                className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                                  selectedTime === time
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-input hover:bg-accent hover:text-accent-foreground"
                                }`}
                                onClick={() => setSelectedTime(time)}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Reason for Visit</label>
                          <textarea
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            rows={3}
                            placeholder="Please describe your symptoms or reason for visit"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                          ></textarea>
                        </div>

                        <Button
                          className="w-full"
                          onClick={handleBookAppointment}
                          disabled={isBooking || !selectedDate || !selectedTime || !reason}
                        >
                          {isBooking ? "Booking..." : "Book Appointment"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Patient Reviews</h2>
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-bold">{doctor.rating}</span>
                          <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {[
                          {
                            name: "John D.",
                            date: "2 weeks ago",
                            rating: 5,
                            comment:
                              "Dr. Johnson was very thorough and took the time to explain everything. I felt very comfortable and well-cared for during my visit.",
                          },
                          {
                            name: "Sarah M.",
                            date: "1 month ago",
                            rating: 4,
                            comment:
                              "Great doctor who really listens to patients. The only downside was the wait time, but the quality of care made up for it.",
                          },
                          {
                            name: "Robert T.",
                            date: "2 months ago",
                            rating: 5,
                            comment:
                              "Excellent care and very knowledgeable. Dr. Johnson helped me understand my condition and provided effective treatment options.",
                          },
                        ].map((review, index) => (
                          <div key={index} className="border-b pb-4 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">{review.name}</div>
                              <div className="text-sm text-muted-foreground">{review.date}</div>
                            </div>
                            <div className="flex mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
