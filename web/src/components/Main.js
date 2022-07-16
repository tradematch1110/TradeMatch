/*
              Main Component
    1. display the current page of the app
    2. handle routing
*/

import React from "react";
// import PrivateRoute from "../PrivateRoute";

// import NotFound from './../NotFound'
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Main = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </div>
  );
};

export default Main;
