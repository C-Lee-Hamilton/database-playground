import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import FireCard from "./cards/FireCard"
import MongoCard from "./cards/MongoCard"
import LoggedinCard from "./cards/LoggedinCard"
import SignupCard from "./cards/SignupCard"

export function Content(){
 type PageType = "main" | "signup" | "login";

 const [activePage, setActivePage] = useState<PageType>("login");
 const [trigger,setTrigger]=useState<boolean>(false);

 const handleTabChange = (value: string) => {
  setTrigger(value === "fb");
 };
 
 const headerStyle = `h-[10vh] border-double border-10 text-slate-200 text-center ${
  trigger ?  "bg-red-800 border-yellow-600" : "bg-green-800 border-slate-500" 
}`;

  return(

    <div>
      <div id="header"className={headerStyle}></div>

      <div className="h-[80vh]  flex justify-center p-[10px] bg-slate-800  text-center">
        {activePage === "main" && <LoggedinCard setTrigger={setTrigger} trigger={trigger} setActivePage={setActivePage}/>}

        {activePage === "signup" && <SignupCard setTrigger={setTrigger} trigger={trigger} setActivePage={setActivePage}/>}

        {activePage === "login" &&
        <Tabs defaultValue="mdb" onValueChange={handleTabChange} className="flex flex-1 m-auto h-[auto] ">
          <TabsList className="  m-auto">
            <TabsTrigger value="fb">Firebase</TabsTrigger>
            <TabsTrigger value="mdb">MongoDB</TabsTrigger>
          </TabsList>
          <TabsContent value="fb" >
            <FireCard setActivePage={setActivePage}/>
          </TabsContent>
          <TabsContent value="mdb">
            <MongoCard setActivePage={setActivePage}/>
          </TabsContent>
        </Tabs>
        }
      </div>
      
      <div id="header"className={headerStyle}></div>
    </div>
    )
}