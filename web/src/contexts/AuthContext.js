// handle user context throughout the app

import React, { useContext, createContext, useState } from 'react'

export const authContext = createContext()

export function useAuth() {
  return useContext(authContext)
}

function AuthContextProvider({ children }) {
  // init the context values
  const [currentUserId, setCurrentUserId] = useState()
  const [currentUserName, setCurrentUserName] = useState()
  const [isLogged, setIsLogged] = useState();


  console.log('------------ context update-----------------')
  console.log('currentUserName: ' + currentUserName)
  console.log("currentUserId: " + currentUserId);
  console.log("isLogged: " + isLogged);


  // int the values in order to pass them in the provider
  const value = {
    currentUserId,
    setCurrentUserId,
    currentUserName,
    setCurrentUserName,
    isLogged,
    setIsLogged
  }
  // return Auth Context Provider
  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthContextProvider
