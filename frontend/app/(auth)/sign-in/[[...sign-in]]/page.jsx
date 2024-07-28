import { SignIn } from "@clerk/nextjs";

export default function signIn() {
  return (

    <div className="w-full flex items-center justify-center">
    <SignIn />
    </div>
  )
}