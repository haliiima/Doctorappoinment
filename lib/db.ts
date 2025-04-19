// This is a mock database for demonstration purposes
// In a real application, you would use a real database like MySQL

// User types
export type User = {
  id: number
  name: string
  email: string
  password: string
  role: "patient" | "doctor" | "admin"
}

export type Patient = User & {
  gender: string
  dateOfBirth: string
  phone: string
  image?: string
}

export type Doctor = User & {
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

export type Appointment = {
  id: number
  doctorId: number
  patientId: number
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  reason: string
}

// Mock data
const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "patient@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "patient",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    email: "doctor@example.com",
    password: "password123",
    role: "doctor",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  },
]

const patients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    email: "patient@example.com",
    password: "password123",
    role: "patient",
    gender: "male",
    dateOfBirth: "1990-01-01",
    phone: "123-456-7890",
    image: "/images/patient-1.jpg",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily@example.com",
    password: "password123",
    role: "patient",
    gender: "female",
    dateOfBirth: "1985-05-15",
    phone: "987-654-3210",
    image: "/images/patient-2.jpg",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    password: "password123",
    role: "patient",
    gender: "male",
    dateOfBirth: "1978-11-23",
    phone: "555-123-4567",
    image: "/images/patient-3.jpg",
  },
]

const doctors: Doctor[] = [
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    email: "doctor1@example.com",
    password: "password123",
    role: "doctor",
    specialty: "Cardiology",
    location: "New York Medical Center",
    rating: 4.9,
    reviews: 124,
    image: "/images/doctor-1.jpg",
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.",
    education: [
      "MD, Harvard Medical School",
      "Residency in Internal Medicine, Massachusetts General Hospital",
      "Fellowship in Cardiology, Cleveland Clinic",
    ],
    experience: [
      "Chief of Cardiology, New York Medical Center (2018-Present)",
      "Attending Physician, Boston Heart Institute (2012-2018)",
      "Research Fellow, American Heart Association (2010-2012)",
    ],
    availability: "Available Today",
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    email: "doctor2@example.com",
    password: "password123",
    role: "doctor",
    specialty: "Neurology",
    location: "Central Hospital",
    rating: 4.8,
    reviews: 98,
    image: "/images/doctor-2.jpg",
    bio: "Dr. Michael Chen is a neurologist specializing in stroke prevention and treatment. With his expertise in advanced neuroimaging techniques, he provides comprehensive care for patients with neurological disorders.",
    education: [
      "MD, Johns Hopkins University School of Medicine",
      "Residency in Neurology, UCSF Medical Center",
      "Fellowship in Vascular Neurology, Mayo Clinic",
    ],
    experience: [
      "Director of Stroke Center, Central Hospital (2016-Present)",
      "Assistant Professor of Neurology, Stanford University (2013-2016)",
      "Neurologist, San Francisco General Hospital (2010-2013)",
    ],
    availability: "Available Tomorrow",
  },
  {
    id: 4,
    name: "Dr. Emily Rodriguez",
    email: "doctor3@example.com",
    password: "password123",
    role: "doctor",
    specialty: "Pediatrics",
    location: "Children's Medical Center",
    rating: 4.9,
    reviews: 156,
    image: "/images/doctor-3.jpg",
    bio: "Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing exceptional care for children from birth through adolescence. She has a special interest in childhood development and preventive care.",
    education: [
      "MD, University of Pennsylvania School of Medicine",
      "Residency in Pediatrics, Children's Hospital of Philadelphia",
      "Fellowship in Developmental Pediatrics, Boston Children's Hospital",
    ],
    experience: [
      "Chief Pediatrician, Children's Medical Center (2017-Present)",
      "Pediatrician, New York-Presbyterian Hospital (2012-2017)",
      "Clinical Instructor, Columbia University (2010-2012)",
    ],
    availability: "Available Today",
  },
  {
    id: 5,
    name: "Dr. James Wilson",
    email: "doctor4@example.com",
    password: "password123",
    role: "doctor",
    specialty: "Dermatology",
    location: "Skin Care Clinic",
    rating: 4.7,
    reviews: 87,
    image: "/images/doctor-4.jpg",
    bio: "Dr. James Wilson is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. He is known for his expertise in treating complex skin conditions and performing minimally invasive cosmetic procedures.",
    education: [
      "MD, Yale School of Medicine",
      "Residency in Dermatology, NYU Langone Medical Center",
      "Fellowship in Mohs Surgery, Memorial Sloan Kettering Cancer Center",
    ],
    experience: [
      "Director of Cosmetic Dermatology, Skin Care Clinic (2015-Present)",
      "Dermatologist, Manhattan Dermatology Associates (2011-2015)",
      "Clinical Researcher, Dermatology Foundation (2009-2011)",
    ],
    availability: "Available in 2 days",
  },
  {
    id: 6,
    name: "Dr. Lisa Thompson",
    email: "doctor5@example.com",
    password: "password123",
    role: "doctor",
    specialty: "Orthopedics",
    location: "Sports Medicine Center",
    rating: 4.8,
    reviews: 112,
    image: "/images/doctor-5.jpg",
    bio: "Dr. Lisa Thompson is an orthopedic surgeon specializing in sports medicine and joint replacement. She has worked with professional athletes and is committed to helping patients regain mobility and improve their quality of life.",
    education: [
      "MD, Duke University School of Medicine",
      "Residency in Orthopedic Surgery, Hospital for Special Surgery",
      "Fellowship in Sports Medicine, Andrews Institute",
    ],
    experience: [
      "Head of Orthopedic Surgery, Sports Medicine Center (2016-Present)",
      "Team Physician, New York Professional Sports Teams (2013-Present)",
      "Orthopedic Surgeon, University Hospital (2010-2016)",
    ],
    availability: "Available Today",
  },
  {
    id: 7,
    name: "Dr. Robert Garcia",
    email: "doctor6@example.com",
    password: "password123",
    role: "doctor",
    specialty: "Ophthalmology",
    location: "Vision Care Center",
    rating: 4.6,
    reviews: 76,
    image: "/images/doctor-6.jpg",
    bio: "Dr. Robert Garcia is an ophthalmologist with expertise in cataract surgery, LASIK, and treatment of retinal diseases. He is dedicated to preserving and improving his patients' vision through the latest technological advancements.",
    education: [
      "MD, Columbia University College of Physicians and Surgeons",
      "Residency in Ophthalmology, Wills Eye Hospital",
      "Fellowship in Cornea and Refractive Surgery, Bascom Palmer Eye Institute",
    ],
    experience: [
      "Medical Director, Vision Care Center (2014-Present)",
      "Ophthalmologist, New York Eye and Ear Infirmary (2010-2014)",
      "Clinical Researcher, National Eye Institute (2008-2010)",
    ],
    availability: "Available Tomorrow",
  },
  {
    id: 8,
    name: "Dr. Olivia Martinez",
    email: "doctor7@example.com",
    password: "password123",
    role: "doctor",
    specialty: "Gynecology",
    location: "Women's Health Center",
    rating: 4.9,
    reviews: 143,
    image: "/images/doctor-7.jpg",
    bio: "Dr. Olivia Martinez is a board-certified gynecologist with a focus on women's reproductive health. She provides comprehensive care for women of all ages, from adolescence through menopause and beyond.",
    education: [
      "MD, Stanford University School of Medicine",
      "Residency in Obstetrics and Gynecology, UCLA Medical Center",
      "Fellowship in Minimally Invasive Gynecologic Surgery, Mayo Clinic",
    ],
    experience: [
      "Director of Women's Health, Women's Health Center (2017-Present)",
      "Gynecologist, Cedars-Sinai Medical Center (2013-2017)",
      "Clinical Instructor, UCLA School of Medicine (2011-2013)",
    ],
    availability: "Available Today",
  },
  {
    id: 9,
    name: "Dr. David Kim",
    email: "doctor8@example.com",
    password: "password123",
    role: "doctor",
    specialty: "Psychiatry",
    location: "Mental Health Institute",
    rating: 4.8,
    reviews: 91,
    image: "/images/doctor-8.jpg",
    bio: "Dr. David Kim is a psychiatrist specializing in mood disorders and anxiety. He takes a holistic approach to mental health, combining medication management with psychotherapy and lifestyle modifications.",
    education: [
      "MD, University of Chicago Pritzker School of Medicine",
      "Residency in Psychiatry, Massachusetts General Hospital",
      "Fellowship in Mood Disorders, Johns Hopkins Hospital",
    ],
    experience: [
      "Chief of Psychiatry, Mental Health Institute (2018-Present)",
      "Staff Psychiatrist, Boston Medical Center (2014-2018)",
      "Research Fellow, National Institute of Mental Health (2012-2014)",
    ],
    availability: "Available Tomorrow",
  },
]

const appointments: Appointment[] = [
  {
    id: 1,
    doctorId: 2,
    patientId: 1,
    date: "2023-06-15",
    time: "10:00 AM",
    status: "confirmed",
    reason: "Annual checkup",
  },
  {
    id: 2,
    doctorId: 3,
    patientId: 1,
    date: "2023-06-20",
    time: "2:30 PM",
    status: "pending",
    reason: "Headache consultation",
  },
]

// Database functions
export function getAllDoctors(): Doctor[] {
  return doctors
}

export function getDoctorById(id: number): Doctor | undefined {
  return doctors.find((doctor) => doctor.id === id)
}

export function getDoctorsBySpecialty(specialty: string): Doctor[] {
  return doctors.filter((doctor) => doctor.specialty.toLowerCase() === specialty.toLowerCase())
}

export function getUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email)
}

export function getPatientById(id: number): Patient | undefined {
  return patients.find((patient) => patient.id === id)
}

export function createUser(user: Omit<User, "id">): User {
  const newUser = {
    ...user,
    id: users.length + 1,
  }
  users.push(newUser)
  return newUser
}

export function getAppointmentsByPatientId(patientId: number): Appointment[] {
  return appointments.filter((appointment) => appointment.patientId === patientId)
}

export function getAppointmentsByDoctorId(doctorId: number): Appointment[] {
  return appointments.filter((appointment) => appointment.doctorId === doctorId)
}

export function createAppointment(appointment: Omit<Appointment, "id">): Appointment {
  const newAppointment = {
    ...appointment,
    id: appointments.length + 1,
  }
  appointments.push(newAppointment)
  return newAppointment
}

export function updateAppointmentStatus(id: number, status: Appointment["status"]): Appointment | null {
  const appointmentIndex = appointments.findIndex((appointment) => appointment.id === id)
  if (appointmentIndex === -1) return null

  appointments[appointmentIndex].status = status
  return appointments[appointmentIndex]
}
