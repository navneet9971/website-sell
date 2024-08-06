import { SignUp } from "@clerk/clerk-react"

export default function SignUpPage() {
  return (
  <div className="flex items-center justify-center"> 
  <SignUp 
  path="/sign-up" 
   signInUrl="/sign-in"
  verifyEmailAddressUrl="/email-verification"
  continueSignUpUrl="/complete-sign-up"
  />
  </div>
 
)
}