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
import { useState } from "react"
import { doCreateUserWithEmailAndPassword } from "@/firebase/auth"



type PageType = "main" | "signup" | "login";
type PageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<PageType>>;
  setTrigger:React.Dispatch<React.SetStateAction<boolean>>;
  trigger:boolean;
};

export default function SignupCard ({ setActivePage,setTrigger,trigger }: PageProps){

const [email,setEmail]=useState<string>('');
const [password,setPassword]=useState<string>('');

const onSubmitFire=async(e:React.MouseEvent<HTMLButtonElement>)=>{e.preventDefault();
    try{
    await doCreateUserWithEmailAndPassword({email,password});
    setActivePage("login");setTrigger(false);
    console.log("user created");} catch(err){
        console.error("Failed to create user:", err);
    }
}

const onSubmitMongo = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Mongo signup failed:", data.message);
    } else {
      console.log("Mongo user created:", data);
      setActivePage("login");
      setTrigger(false);
    }
  } catch (err) {
    console.error("Error hitting Mongo signup endpoint:", err);
  }
};

const emailUpdate=(e:React.ChangeEvent<HTMLInputElement>)=>(setEmail(e.target.value));
const pwUpdate=(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value);

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
                    value={email}
                    onChange={emailUpdate}
                    className="border-black border-2"
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                
                    </div>
                    <Input className="border-black border-2" id="password" value={password} onChange={pwUpdate}type="password" required />
                </div>
                </div>
            </form>
          </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button onClick={onSubmitFire} variant="outline" className="w-full bg-red-400 cursor-pointer">
                Create Firebase Account
            </Button>
            <Button onClick={onSubmitMongo} variant="destructive" className="w-full cursor-pointer">
                Create Mongo Account
            </Button>
        </CardFooter>
    </Card>
)


}
