import { useEffect,useContext,useState,createContext } from "react";
import type {ReactNode} from "react";
import {auth} from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type {User} from "firebase/auth";
interface AuthContextType{
    currentUser:User|null;
    userLoggedIn: boolean;
    loading: boolean;
}




const AuthContext = createContext<AuthContextType|null>(null);

export function useAuth():AuthContextType {
      const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
    
    
}

export function AuthProvider ({ children }: { children: ReactNode }){
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
async function initializeUser(user:User | null){
    if (user){
        setCurrentUser({...user});
        setUserLoggedIn(true);
    }else{setCurrentUser(null); setUserLoggedIn(false);}
    setLoading(false);
}
useEffect(()=>{
const unsubscribe=onAuthStateChanged(auth,(user)=>{void initializeUser(user);});
return unsubscribe;

},[])



const value :AuthContextType ={
    currentUser,
    userLoggedIn,
    loading
}


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}