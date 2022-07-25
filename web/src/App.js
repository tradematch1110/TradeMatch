import React, { useEffect } from "react";
import "./App.css";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import AuthContextProvider from "./contexts/AuthContext";
import Layout from "./components/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { TradeContextProvider } from "./contexts/TradeContexts";
// const cacheLtr = createCache({
//   key: "muiltr",
// });

// const cacheRtl = createCache({
//   key: "muirtl",
//   // prefixer is the only stylis plugin by default, so when
//   // overriding the plugins you need to include it explicitly
//   // if you want to retain the auto-prefixing behavior.
//   stylisPlugins: [prefixer, rtlPlugin],
// });

// const ltrTheme = createTheme({ direction: "ltr" });
// const rtlTheme = createTheme({ direction: "rtl" });

// const languages = [
//   {
//     code: "he",
//     name: "עיברית",
//     country_code: "isr",
//     dir: "rtl",
//   },
//   {
//     code: "en",
//     name: "English",
//     country_code: "us",
//     dir: "ltr",
//   },
// ];

function App() {
  const [isRtl, setIsRtl] = React.useState(false);

  // React.useLayoutEffect(() => {
  //   document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
  // }, [isRtl]);

  return (
    <AuthContextProvider>
      <TradeContextProvider>
        {/* <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}> */}
        <CssBaseline />
        <Router>
          <div>
            <Layout />
          </div>
        </Router>
        {/* </ThemeProvider>
      </CacheProvider> */}
      </TradeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
