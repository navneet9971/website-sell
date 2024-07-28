import { SignUp } from "@clerk/nextjs";

export default function signUp() {
  return (
    <div className="w-full flex items-center justify-center mb-8">
      <SignUp />
      </div>
  )
}