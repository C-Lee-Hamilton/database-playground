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

type PageType = "main" | "signup" | "login";
type PageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<PageType>>;
};

export default function MongoCard ({ setActivePage }: PageProps){
const [email,setEmail]=useState<string>('');
const [password,setPassword]=useState<string>('');


const emailUpdate=(e:React.ChangeEvent<HTMLInputElement>)=>(setEmail(e.target.value));
const pwUpdate=(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value);

const mainPageNav=()=>{setActivePage("main");}
const signupNav=()=>{setActivePage("signup");}


const onLoginMongo = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Mongo login failed:", data.message);
    } else {
      console.log("Mongo user logged in:", data);
      // Optionally: Save the token somewhere (localStorage, context, etc)
      localStorage.setItem("mongoToken", data.token);
      mainPageNav(); // boom, takes you to the main UI
    }
  } catch (err) {
    console.error("Error hitting Mongo login endpoint:", err);
  }
};








return(

    
    <Card className="flex flex-1 m-auto h-[auto]  bg-slate-200 border-green-500 shadow-lg shadow-green-600 border-2 max-w-sm">
        <CardHeader>
            <CardTitle >Login to your <span className="text-green-700"> MongoDB </span> account</CardTitle>
        </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            value={email}
                            onChange={emailUpdate}
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
                        <Input value={password} onChange={pwUpdate} className="border-black border-2" id="password" type="password" required />
                        </div>
                    </div>
                </form>
            </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button onClick={onLoginMongo} type="submit" className="w-full cursor-pointer">
            Login
            </Button>
          
            <Button onClick={signupNav} variant="destructive" className="w-full border-2 border-black cursor-pointer">
            Sign Up
            </Button>
        </CardFooter>
    </Card>
)


}

