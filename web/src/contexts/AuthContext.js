// handle user context throughout the app

import React, { useContext, createContext, useState, useEffect } from "react";
import { useLayoutEffect } from "react";
import { getUserFavouritesProducts } from "../services/api";

export const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

function AuthContextProvider({ children }) {
  // init the context values
  const [currentUser, setCurrentUser] = useState();
  const [favouritesProducts, setFavouritesProducts] = useState();
  const [userMessages, setUserMessages] = useState();


  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    //  console.log("currentUser use effect: ", currentUser);
  }, []);
  useEffect(() => {
    async function fetchData() {
      const res = await getUserFavouritesProducts(currentUser.uid);
      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);
          setFavouritesProducts(res.value);
          console.log(res.value);
          break;
        case 2:
          console.log(res.value);
          break;
        default:
      }
    }
    if (currentUser) fetchData();
  }, [currentUser]);

  console.log("------------ context update-----------------");

  console.log("currentUser: ", currentUser);
  console.log("favouritesProducts: ", favouritesProducts);

  // int the values in order to pass them in the provider
  const value = {
    currentUser,
    setCurrentUser,
    favouritesProducts,
    setFavouritesProducts,
  };
  // return Auth Context Provider
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthContextProvider;
