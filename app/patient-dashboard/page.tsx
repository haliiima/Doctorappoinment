"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/components/user-avatar"
import { Calendar, Clock, FileText, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Appointment {
  id: number
  doctorId: number
  patientId: number
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  reason: string
  doctorName?: string
  doctorImage?: string
  doctorSpecialty?: string
}

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<{ name: string; email: string; image?: string } | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      // In a real app, this would fetch the user data from an API
      // For now, we'll use mock data
      setUserData({
        name: "John Doe",
        email: "patient@example.com",
        image: "/images/patient-1.jpg",
      })
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments")
        if (!response.ok) {
          if (response.status === 401) {
            // Not authenticated
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch appointments")
        }
        const data = await response.json()

        // Enhance appointments with doctor info
        const enhancedAppointments = data.appointments.map((app: Appointment) => {
          // In a real app, you would fetch this from the API
          const doctorInfo = {
            2: { name: "Dr. Sarah Johnson", image: "/images/doctor-1.jpg", specialty: "Cardiology" },
            3: { name: "Dr. Michael Chen", image: "/images/doctor-2.jpg", specialty: "Neurology" },
            4: { name: "Dr. Emily Rodriguez", image: "/images/doctor-3.jpg", specialty: "Pediatrics" },
          }[app.doctorId]

          return {
            ...app,
            doctorName: doctorInfo?.name || "Unknown Doctor",
            doctorImage: doctorInfo?.image,
            doctorSpecialty: doctorInfo?.specialty,
          }
        })

        setAppointments(enhancedAppointments)
      } catch (error) {
        console.error("Error fetching appointments:", error)
        toast({
          title: "Error",
          description: "Failed to load appointments",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
    fetchAppointments()
  }, [router, toast])

  const cancelAppointment = async (id: number) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      })

      if (!response.ok) {
        throw new Error("Failed to cancel appointment")
      }

      // Update local state
      setAppointments((prev) => prev.map((app) => (app.id === id ? { ...app, status: "cancelled" as const } : app)))

      toast({
        title: "Appointment cancelled",
        description: "Your appointment has been successfully cancelled",
      })
    } catch (error) {
      console.error("Error cancelling appointment:", error)
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <UserAvatar src={userData?.image} name={userData?.name || ""} size="xl" />
              <div>
                <h1 className="text-3xl font-bold">{userData?.name || "Patient"}</h1>
                <p className="text-muted-foreground">{userData?.email || ""}</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/doctors">Book New Appointment</Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                <CardDescription>
                  {appointments.filter((app) => app.status !== "cancelled" && app.status !== "completed").length}{" "}
                  appointments scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/doctors">Book New Appointment</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Medical Records</CardTitle>
                <CardDescription>Access your health documents</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Records
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="upcoming">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="mt-4">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse text-center">
                      <div className="h-6 w-32 bg-muted rounded mb-4 mx-auto"></div>
                      <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
                    </div>
                  </div>
                ) : appointments.filter((app) => app.status !== "cancelled" && app.status !== "completed").length >
                  0 ? (
                  <div className="space-y-4">
                    {appointments
                      .filter((app) => app.status !== "cancelled" && app.status !== "completed")
                      .map((appointment) => (
                        <Card key={appointment.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <UserAvatar
                                  src={appointment.doctorImage}
                                  name={appointment.doctorName || "Doctor"}
                                  size="lg"
                                />
                                <div className="space-y-1">
                                  <h3 className="font-medium">{appointment.doctorName}</h3>
                                  <p className="text-sm text-muted-foreground">{appointment.doctorSpecialty}</p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    <span>{appointment.reason}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                    appointment.status,
                                  )}`}
                                >
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                                {appointment.status !== "cancelled" && (
                                  <Button variant="outline" size="sm" onClick={() => cancelAppointment(appointment.id)}>
                                    Cancel
                                  </Button>
                                )}
                                <Button size="sm">View Details</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <Calendar className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No upcoming appointments</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any upcoming appointments scheduled
                      </p>
                      <Button className="mt-4" asChild>
                        <Link href="/doctors">Book an Appointment</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="past" className="mt-4">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse text-center">
                      <div className="h-6 w-32 bg-muted rounded mb-4 mx-auto"></div>
                      <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
                    </div>
                  </div>
                ) : appointments.filter((app) => app.status === "completed").length > 0 ? (
                  <div className="space-y-4">
                    {appointments
                      .filter((app) => app.status === "completed")
                      .map((appointment) => (
                        <Card key={appointment.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <UserAvatar
                                  src={appointment.doctorImage}
                                  name={appointment.doctorName || "Doctor"}
                                  size="lg"
                                />
                                <div className="space-y-1">
                                  <h3 className="font-medium">{appointment.doctorName}</h3>
                                  <p className="text-sm text-muted-foreground">{appointment.doctorSpecialty}</p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    <span>{appointment.reason}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                    appointment.status,
                                  )}`}
                                >
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                                <Button size="sm">View Details</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <User className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No past appointments</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any past appointments to display
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="cancelled" className="mt-4">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse text-center">
                      <div className="h-6 w-32 bg-muted rounded mb-4 mx-auto"></div>
                      <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
                    </div>
                  </div>
                ) : appointments.filter((app) => app.status === "cancelled").length > 0 ? (
                  <div className="space-y-4">
                    {appointments
                      .filter((app) => app.status === "cancelled")
                      .map((appointment) => (
                        <Card key={appointment.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <UserAvatar
                                  src={appointment.doctorImage}
                                  name={appointment.doctorName || "Doctor"}
                                  size="lg"
                                />
                                <div className="space-y-1">
                                  <h3 className="font-medium">{appointment.doctorName}</h3>
                                  <p className="text-sm text-muted-foreground">{appointment.doctorSpecialty}</p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    <span>{appointment.reason}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                    appointment.status,
                                  )}`}
                                >
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                                <Button size="sm">Reschedule</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <Calendar className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No cancelled appointments</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any cancelled appointments to display
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
