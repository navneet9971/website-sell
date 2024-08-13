import { Card, CardHeader, CardContent, CardFooter } from "../ui/Card"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea"

const UserProfilePage = ()  => {
  return (
    <div className="flex items-center justify-center mt-2 mb-3">
    <Card className="w-full max-w-3xl rounded">
      <CardHeader className="bg-muted/20 p-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <div className="text-muted-foreground">@johndoe</div>
          </div>
          <Button variant="outline" className="ml-auto">
            Change Photo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="username">Fullname</Label>
            <Input id="username" defaultValue="johndoe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" defaultValue="San Francisco" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" defaultValue="California" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="123 Main St, Anytown USA" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" defaultValue="1985-06-15" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="(555) 555-5555" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" defaultValue="@johndoe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" defaultValue="@johndoe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" defaultValue="linkedin.com/in/johndoe" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a little about yourself..."
            className="min-h-[100px]"
            defaultValue="I'm a software engineer with a passion for building beautiful and functional web applications. In my free time, I enjoy hiking, reading, and spending time with my family."
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-6">
        <Button variant="outline">Save Changes</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default UserProfilePage