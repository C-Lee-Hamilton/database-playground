import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type PageType = "main" | "signup" | "login";
type PageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<PageType>>;
  setTrigger:React.Dispatch<React.SetStateAction<boolean>>;
  trigger:boolean;
};

export default function LoggedinCard ({ setActivePage,setTrigger,trigger }: PageProps){
const loginPageNav=()=>{setActivePage("login");setTrigger(false);}
const colorStyle=`flex flex-1 m-auto h-[auto] shadow-lg border-2 max-w-sm
  ${trigger ?  "border-red-500 shadow-red-600" : "border-green-500 shadow-green-600"}` 
const buttonStyle=`w-full border-2  border-black cursor-pointer ${trigger ?"bg-red-400":"green-600"}`

return(
    <Card className={colorStyle}>
        <CardHeader>
            <CardTitle >Information</CardTitle>
        </CardHeader>
            <CardContent>
            Info Here
            </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button onClick={loginPageNav} variant="destructive" className={buttonStyle}>
            Log Out
            </Button>
        </CardFooter>
    </Card>
)


}
