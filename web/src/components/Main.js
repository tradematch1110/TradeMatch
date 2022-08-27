/*
              Main Component
    1. display the current page of the app
    2. handle routing
*/

import React, {useContext} from "react";
// import NotFound from './../NotFound'
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateProduct from './CreateProduct';
import UserMassages from './UserMassages';
import Product from "./Product";
import { authContext } from "./../contexts/AuthContext";
import MyProducts from './MyProducts';
import UpdateProduct from './UpdateProduct';
import AboutUs from './AboutUs';

const Main = () => {
const {currentUser} = useContext(authContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/about_us" element={<AboutUs />}></Route>
        <Route
          path="/create_product"
          element={
            currentUser ? (
              <CreateProduct product={null} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/user_massages"
          element={currentUser ? <UserMassages /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/product"
          element={currentUser ? <Product /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/myProduct"
          element={currentUser ? <MyProducts /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/updateProduct"
          element={
            currentUser ? <UpdateProduct /> : <Navigate to="/updateProduct" />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default Main;
