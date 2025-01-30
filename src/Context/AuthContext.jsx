
import { createContext , useContext, useState } from "react";
import { auth,db } from "../component/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
// import { getDisplayName } from "next/dist/shared/lib/utils";
const authContext = createContext()



export const AuthProvider =({children})=>{

    const [user, setUser] = useState()

    const signUp = async ( name, email, password) =>{
        console.log(name,email,password)
        try {
            const userCredentialls = await createUserWithEmailAndPassword(auth, email, password)
            const User = userCredentialls.user
            setUser(User.uid)
            console.log(user)
            const UserInDb = doc(db, 'User', User.uid)
            await setDoc(UserInDb,{
                "Name": name,
                "Email": email,
                "Balance":{
                    "amount": 0,
                    "LastUpdate": Date.now()
                }
            })
            console.log(UserInDb)
            
        } catch (error) {
            console.log(error)
            
        }

    }

    const LogIn = async (email, password) =>{
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            const User= userCredentials.user
            setUser(User)
        } catch (error) {
            console.log(error)
        }
    }

    const LogOut = async () =>{
        try{
            await signOut(auth)
            setUser(null)
        }catch(error){
            console.log(error)
        }
    }


    return(
        <authContext.Provider value={{user , signUp, LogIn,LogOut}}>
            {children}
        </authContext.Provider>
    )
}


export const useAuth = () => useContext(authContext)