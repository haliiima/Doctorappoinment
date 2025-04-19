import { NextResponse } from "next/server"
import { getDoctorById } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const doctorId = Number.parseInt(params.id)
    const doctor = getDoctorById(doctorId)

    if (!doctor) {
      return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      doctor,
    })
  } catch (error) {
    console.error("Error fetching doctor:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch doctor" }, { status: 500 })
  }
}
