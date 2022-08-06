// handle user context throughout the app

import React, { useContext, createContext, useState, useEffect } from 'react'

export const authContext = createContext()

export function useAuth() {
  return useContext(authContext)
}

function AuthContextProvider({ children }) {
  // init the context values
  const [currentUser, setCurrentUser] = useState()

 useEffect(() => {
   const user = JSON.parse(localStorage.getItem("user"));

   if (user) {
     setCurrentUser(user);
   }
     console.log("currentUser use effect: ", currentUser); 

 }, []);
  console.log('------------ context update-----------------')
  console.log('currentUser: ', currentUser  ) 
 

  // int the values in order to pass them in the provider
  const value = {
    currentUser,
    setCurrentUser,
  }
  // return Auth Context Provider
  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthContextProvider
