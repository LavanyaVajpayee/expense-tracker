import { AuthContextType, UserType } from "@/types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "@/cofig/firebase";
import { doc,getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
//this creates a context object which allows us to share data between componenets without having to pass props
//it holds authentication related data and methods
 const AuthContext=createContext<AuthContextType | null>(null);//value can also be null, the (null) shows that the value in AuthContext type are initialized to null
                                    //the children can be rendered as anything that is allowed in react
export const AuthProvider: React.FC<{children:React.ReactNode}>=({//react function componenet
    children,
})=>{
    const[user,setUser]=useState<UserType|null>(null);
    const router=useRouter();
    //after registering we need to move to different pages/tabs
    //this listens to state changes in authentication
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,(firebaseUser)=>{
            if(firebaseUser){
                setUser({
                    uid:firebaseUser?.uid,
                    email:firebaseUser?.email,
                    name:firebaseUser?.displayName

                });
                updateUserData(firebaseUser.uid)
                router.replace("/(tabs)")//after logging the user should not be able to go back to the previous route
            }
            else{
                setUser(null)
                router.replace("/auth/welcome")
            }
        })
        //whenever user logs in/out or signs in/out
        return()=>unsub();
    },[])
    const login =async(email:string, password:string)=>{//login is a promise it returns an object
        try{//try-catch block to handle promise rejection
            await signInWithEmailAndPassword(auth,email,password);
            return{success:true};
        }
        catch(error:any){
            let msg=error.message;
            return {success:false,msg};
        }
    };
    const register =async(email:string, password:string,name:string)=>{//login is a promise it returns an object
        try{//try-catch block to handle promise rejection
            // auth — Your initialized Firebase Auth instance (holds config and connection to Firebase Auth service).
            let response=await createUserWithEmailAndPassword(auth,email, password)//auth passes the authentication service
            // doc() creates a reference to a document
            // fire store connects the app to the db
            // "users" is the collection name in firestore
            // .? is optional chaining it avoids error if the return value in null

            // setdoc() actually writes to the referenced doc
            // without await the code would move aheadbefore there is guarantee that the data is stored 
            await setDoc(doc(firestore,"users",response?.user?.uid),{
                name,
                email,
                uid:response?.user?.uid,
            });
            //make a document for the user doc function to set the database
            return{success:true};
        }
        catch(error:any){
            let msg=error.message;
            if(msg.includes("(auth/email-already-in-use)"))msg="Account already exits"
            return {success:false,msg};
        }
    };
    const updateUserData=async(uid:string)=>{
        try{
            const docRef=doc(firestore,"users",uid);//references to any particualr user with uid
            const docSnap=await getDoc(docRef);
            if(docSnap.exists()){
                const data=docSnap.data();
                const userData: UserType={
                    uid: data?.uid||null,
                    email:data?.email||null,
                    name:data?.name||null,
                    image:data?.image||null

                };
                setUser({...userData})
            }
        }catch(error:any){
            let msg=error.message;
            console.log("error: ",error)
        }
    };

    const contextVal:AuthContextType={
        user,
        setUser,
        login,
        register,
        updateUserData
    }
    return (
  <AuthContext.Provider value={contextVal}>
    {children}
  </AuthContext.Provider>
);

};
export const useAuth=():AuthContextType=>{
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be wrapped inside AuthProvider")
    }
    return context;
}