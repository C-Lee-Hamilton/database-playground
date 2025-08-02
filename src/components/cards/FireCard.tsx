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

import { doSignInWithEmailAndPassword,doSignInWithGoogle } from "@/firebase/auth";
// import { useAuth } from "@/contexts/authcontexts";

type PageType = "main" | "signup" | "login";
type PageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<PageType>>;
};

export default function FireCard ({ setActivePage }: PageProps){
// const {userLoggedIn}=useAuth();

const [email,setEmail]=useState<string>('');
const [password,setPassword]=useState<string>('');
const [isSigningIn,setIsSigningIn]=useState<boolean>(false);
// const [errorMessage,setErrorMessage] = useState<string>('');

const emailUpdate=(e:React.ChangeEvent<HTMLInputElement>)=>(setEmail(e.target.value));
const pwUpdate=(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value);

// const consoler=()=>console.log(email,password);
const onSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault()
  if(!isSigningIn){
    try{
    await doSignInWithEmailAndPassword({email,password})
    setIsSigningIn(true);
    setActivePage("main");
  console.log("isSigninginisTrue");}
    catch(err){console.log("failed to log in", err)}
    
  }
  
  
}
const onGoogleSignIn=(e:any)=>{
  e.preventDefault()
  if(!isSigningIn){
    try{   setIsSigningIn(true);
    doSignInWithGoogle();
  setActivePage("main");
  }
 catch(err){setIsSigningIn(false);console.log("failedgoogle",err)}
  }
}


// const mainPageNav=()=>{setActivePage("main");}
const signupNav=()=>{setActivePage("signup");}
return(
    <Card className="flex flex-1 m-auto h-[auto]  bg-slate-200 border-red-500 shadow-lg shadow-red-600 border-2 max-w-sm">
        <CardHeader>
            <CardTitle >Login to your <span className="text-red-500"> Firebase </span>account</CardTitle>
        </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={emailUpdate}
                      placeholder="m@example.com"
                      required
                      className="border-black border-2"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                  
                    </div>
                    <Input className="border-black border-2" id="password" type="password" onChange={pwUpdate} required />
                  </div>
                </div>
              </form>
          </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button  type="submit" onClick={onSubmit}className="w-full cursor-pointer">
              {/* onClick={mainPageNav} */}
                Login
            </Button>
            <Button variant="outline" onClick={onGoogleSignIn} className="w-full cursor-pointer">
                Login with Google
            </Button>
                <Button onClick={signupNav} variant="destructive" className="w-full bg-red-500 border-2 border-black cursor-pointer">
                Sign Up
            </Button>
        </CardFooter>
    </Card>
)


}
