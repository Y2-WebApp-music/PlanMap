// import React, { createContext, useState } from "react";

// export const AuthContext = createContext(null);

// export const initialContextValue = {
//   id: "",
//   email: "kunguy.159@gmail.com",
//   userName: "Guy nut",
//   profileUrl: "avatar.jpg",
//   isAuthenticated: true,
// };

// const AuthProvider = ({ children }) => {
//   const [authContext, setAuthContext] = useState(initialContextValue);

//   return (
//     <AuthContext.Provider value={{ authContext, setAuthContext }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import { auth, provider } from '../DB/Firebase-Config.js'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const AuthContext = createContext()
export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
        })

        return () => unsubscribe();
    },[])

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const Auth =()=> {
    const navigate = useNavigate();
    const signInWithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            navigate("/mainpage");
        } catch(err){
            console.error(err)
        }
    }
    return (
        <button className="googleLogin" onClick={signInWithGoogle}> <img src="public/icons/icon-google.svg" alt="" /> Sign in with Google </button>
    )
}