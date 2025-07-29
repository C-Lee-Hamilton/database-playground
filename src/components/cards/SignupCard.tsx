import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PageType = "main" | "signup" | "login";
type PageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<PageType>>;
  setTrigger:React.Dispatch<React.SetStateAction<boolean>>;
  trigger:boolean;
};

export default function SignupCard ({ setActivePage,setTrigger,trigger }: PageProps){
const loginPageNav=()=>{setActivePage("login");setTrigger(false);}

 const headerStyle = `flex flex-1 m-auto h-[auto]  bg-slate-200 shadow-lg border-2 max-w-sm ${
  trigger ?  "border-red-500 shadow-red-600" : "border-green-500 shadow-green-600" 
}`;

return(

    <Card className={headerStyle}>
        <CardHeader>
            <CardTitle >Create Logins for <span className="text-red-500">MongoDB</span> <span className="text-green-800"> or</span><span className="text-red-500"> Firebase</span> account
            </CardTitle>
        </CardHeader>
        <CardContent>
            <form>
                <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="border-black border-2"
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                
                    </div>
                    <Input className="border-black border-2" id="password" type="password" required />
                </div>
                </div>
            </form>
          </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button onClick={loginPageNav} variant="outline" className="w-full bg-red-400 cursor-pointer">
                Create Firebase Account
            </Button>
            <Button onClick={loginPageNav} variant="destructive" className="w-full cursor-pointer">
                Create Mongo Account
            </Button>
        </CardFooter>
    </Card>
)


}
