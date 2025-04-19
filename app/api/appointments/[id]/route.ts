import { NextResponse } from "next/server"
import { updateAppointmentStatus } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession(request)
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const appointmentId = Number.parseInt(params.id)
    const body = await request.json()
    const { status } = body

    const appointment = updateAppointmentStatus(appointmentId, status)
    if (!appointment) {
      return NextResponse.json({ success: false, message: "Appointment not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Appointment status updated",
      appointment,
    })
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json({ success: false, message: "Failed to update appointment" }, { status: 500 })
  }
}
