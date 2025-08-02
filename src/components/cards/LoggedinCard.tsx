import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { doSignOut } from "@/firebase/auth";
import { Input
 } from "../ui/input";

import { doc, setDoc,getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "@/contexts/authcontexts";

type PageType = "main" | "signup" | "login";
type PageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<PageType>>;
  setTrigger:React.Dispatch<React.SetStateAction<boolean>>;
  trigger:boolean;
};

export default function LoggedinCard ({ setActivePage,setTrigger,trigger }: PageProps){
const loginPageNav=()=>{try{doSignOut();setActivePage("login");setTrigger(false);console.log("logged out");}catch(err){console.log("failed",err)}}
const colorStyle=`flex flex-1 m-auto h-[auto] shadow-lg border-2 max-w-sm
  ${trigger ?  "border-red-500 shadow-red-600" : "border-green-500 shadow-green-600"}` 
const buttonStyle=`w-full border-2  border-black cursor-pointer ${trigger ?"bg-red-400":"green-600"}`

const [animal,setAnimal]=useState<string>("");
const [fetchedAnimal,setFetchedAnimal]=useState<string>("");
const [fetched,setFetched]=useState<boolean>(false);
const {currentUser}=useAuth();
const animalUpdate=(e:React.ChangeEvent<HTMLInputElement>)=>(setAnimal(e.target.value));
// const submitAnimal=()=>{console.log(animal);}

  const submitAnimal = async () => {
    if (!currentUser) return;

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        favoriteAnimal: animal,
      }, { merge: true });

      console.log("Animal saved.");
    } catch (err) {
      console.error("Error saving animal:", err);
    }
  };

  
const getAnimal = async () => {
  if (!currentUser) return;

  try {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFetchedAnimal(docSnap.data().favoriteAnimal);
      setFetched(true);
      console.log("Fetched favorite animal:", docSnap.data().favoriteAnimal);
    } else {
      console.log("No favorite animal found.");
    }
  } catch (err) {
    console.error("Error fetching animal:", err);
  }
};

return(
    <Card className={colorStyle}>
        <CardHeader>
            <CardTitle >Information</CardTitle>
        </CardHeader>
            <CardContent>
             <Input
                      id="text"
                      type="text"
                      value={animal}
                      onChange={animalUpdate}
                      placeholder="m@example.com"
                      required
                      className="border-black border-2"
                    />  
                    <Button  type="submit" onClick={submitAnimal}className="w-full cursor-pointer">
              
                Submit Favorite Animal
            </Button>
            {fetched ? (<>Your favorite animal is {fetchedAnimal}</>):(<></>)}
           
            </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={getAnimal} variant="outline" className={buttonStyle}>
            Fetch Favorite Animal
            </Button>
            <Button onClick={loginPageNav} variant="destructive" className={buttonStyle}>
            Log Out
            </Button>
        </CardFooter>
    </Card>
)


}
