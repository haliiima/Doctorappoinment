import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { AuthForm } from "@/components/auth-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center">
              <Logo size="large" />
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Login to your MediBook account</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm type="login" />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
            <div className="flex justify-center gap-4">
              <Link href="/doctor-login" className="text-sm text-muted-foreground hover:text-primary">
                Doctor Login
              </Link>
              <Link href="/admin-login" className="text-sm text-muted-foreground hover:text-primary">
                Admin Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
