import { auth } from "./firebase";

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

interface AuthType{
    email:string;
   password:string;
}

export const doCreateUserWithEmailAndPassword = async ({email,password}:AuthType)=>{
    return createUserWithEmailAndPassword(auth,email,password);
}
export const doSignInWithEmailAndPassword=({email,password}:AuthType)=>{
    return signInWithEmailAndPassword(auth,email,password);
}
export const doSignInWithGoogle=async()=>{
const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth,provider);
return result;
}

export const doSignOut=()=>{
    return auth.signOut();
}


// export const doPasswordReset=({email}:AuthType)=>{
//     return sendPasswordResetEmail(auth,email);
// }
// export const doPasswordChange=({password}:AuthType)=>{
//     return updatePassword(auth.currentUser,password);
// }
// export const doSendVerificationEmail=()=>{
//     return sendEmailVerification(auth.currentUser,{
//         url:`${window.location.origin}/home`,
//     });
// }