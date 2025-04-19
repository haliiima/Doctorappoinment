import { NextResponse } from "next/server"
import { getAllDoctors, getDoctorsBySpecialty } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const specialty = url.searchParams.get("specialty")

    const doctors = specialty ? getDoctorsBySpecialty(specialty) : getAllDoctors()

    return NextResponse.json({
      success: true,
      doctors,
    })
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch doctors" }, { status: 500 })
  }
}
