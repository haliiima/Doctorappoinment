import { jwtVerify, SignJWT } from "jose"

// In a real app, this would be stored in an environment variable
const JWT_SECRET = new TextEncoder().encode("your-secret-key")

export async function signToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export async function getSession(request: Request) {
  const cookie = request.headers.get("cookie")
  if (!cookie) return null

  const cookies = cookie.split(";").reduce(
    (acc, curr) => {
      const [key, value] = curr.trim().split("=")
      acc[key] = value
      return acc
    },
    {} as Record<string, string>,
  )

  const token = cookies["auth-token"]
  if (!token) return null

  return verifyToken(token)
}

export function isAuthenticated(request: Request) {
  return getSession(request).then((session) => !!session)
}
