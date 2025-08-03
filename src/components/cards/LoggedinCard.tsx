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

const doSignOutMongo=()=>{
  {
  try {
    localStorage.removeItem("mongoToken");
    console.log("Mongo logout successful");
  } catch (err) {
    console.error("Mongo logout failed:", err);
  }
}
}

const loginPageNav = () => {
  try {
    if (trigger) {
      doSignOut(); 
    } else {
      doSignOutMongo(); 
    }
    setActivePage("login");
    setTrigger(false);
    console.log("logged out");
  } catch (err) {
    console.log("failed", err);
  }
};
const colorStyle=`flex flex-1 m-auto h-[auto] shadow-lg border-2 max-w-sm
  ${trigger ?  "border-red-500 shadow-red-600" : "border-green-500 shadow-green-600"}` 
const buttonStyle=`w-full border-2  border-black cursor-pointer ${trigger ?"bg-red-400":"green-600"}`

const [animal,setAnimal]=useState<string>("");
const [fetchedAnimal,setFetchedAnimal]=useState<string>("");
const [fetched,setFetched]=useState<boolean>(false);
const {currentUser}=useAuth();

const animalUpdate=(e:React.ChangeEvent<HTMLInputElement>)=>(setAnimal(e.target.value));

const submitAnimalFire = async () => {
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

const getAnimalFire = async () => {
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

const getAnimalMongo = async () => {
  try {
    const token = localStorage.getItem("mongoToken");
    if (!token) throw new Error("No token found.");

    const response = await fetch("http://localhost:3001/api/users/animal", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch animal:", data.message);
    } else {
      setFetchedAnimal(data.animal);
      setFetched(true);
      console.log("Mongo animal fetched:", data.animal);
    }
  } catch (err) {
    console.error("Mongo error fetching animal:", err);
  }
};
const submitAnimalMongo = async () => {
  try {
    const token = localStorage.getItem("mongoToken");
    if (!token) throw new Error("No token found.");

    const response = await fetch("http://localhost:3001/api/users/animal", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ animal }),
    });

    const text = await response.text(); 
    console.log("Raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonError) {
      console.error("JSON parse failed. Server returned non-JSON:", text);
      return;
    }

    if (response.ok) {
      console.log("Animal updated:", data);
    } else {
      console.error("Failed to update animal:", data.message || data);
    }
  } catch (err) {
    console.error("Mongo error submitting animal:", err);
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
                    <Button  type="submit" onClick={trigger ? submitAnimalFire:submitAnimalMongo}className="w-full cursor-pointer">
              
                Submit Favorite Animal
            </Button>
            {fetched ? (<>Your favorite animal is {fetchedAnimal}</>):(<></>)}
           
            </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={trigger ? getAnimalFire : getAnimalMongo} variant="outline" className={buttonStyle}>
            Fetch Favorite Animal
            </Button>
            <Button onClick={loginPageNav} variant="destructive" className={buttonStyle}>
            Log Out
            </Button>
        </CardFooter>
    </Card>
)


}
