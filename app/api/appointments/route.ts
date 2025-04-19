import { NextResponse } from "next/server"
import { createAppointment, getAppointmentsByPatientId, getAppointmentsByDoctorId } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await getSession(request)
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const doctorId = url.searchParams.get("doctorId")
    const patientId = url.searchParams.get("patientId")

    let appointments = []
    if (doctorId) {
      appointments = getAppointmentsByDoctorId(Number.parseInt(doctorId))
    } else if (patientId) {
      appointments = getAppointmentsByPatientId(Number.parseInt(patientId))
    } else if (session.role === "doctor") {
      appointments = getAppointmentsByDoctorId(session.id as number)
    } else if (session.role === "patient") {
      appointments = getAppointmentsByPatientId(session.id as number)
    }

    return NextResponse.json({
      success: true,
      appointments,
    })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession(request)
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { doctorId, date, time, reason } = body

    // Create appointment
    const appointment = createAppointment({
      doctorId,
      patientId: session.id as number,
      date,
      time,
      status: "pending",
      reason,
    })

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    })
  } catch (error) {
    console.error("Error booking appointment:", error)
    return NextResponse.json({ success: false, message: "Failed to book appointment" }, { status: 500 })
  }
}
