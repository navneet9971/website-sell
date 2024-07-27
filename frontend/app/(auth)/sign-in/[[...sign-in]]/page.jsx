import { AnimatedGridPatter } from "@/components/ui/GridPattern";
import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";

export default function signIn() {
  return (

    <div className="w-full flex items-center justify-center">
    <SignIn />
    <AnimatedGridPatter
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "w-full h-screen [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </div>
  )
}