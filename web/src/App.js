import React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import AuthContextProvider from "./contexts/AuthContext";
import Layout from "./components/Layout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
        <CssBaseline />
        <Router>
          <div>
            <Layout />
          </div>
        </Router>
    </AuthContextProvider>
  );
}

export default App;
