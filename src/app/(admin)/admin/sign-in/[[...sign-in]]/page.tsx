import { SignIn } from "@clerk/nextjs"

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
      <SignIn />
    </div>
  )
}
