import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TradeContextProvider } from './contexts/TradeContexts';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TradeContextProvider>
    <App />
    </TradeContextProvider>
  </React.StrictMode>,
);
document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
document.getElementById("root").dir = "rtl";
document.dir = "rtl";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
