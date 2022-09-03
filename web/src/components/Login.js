import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { Formik, Form } from "formik";
// import CircularIndeterminate from "./common/Circular";
import { Grid, Hidden } from "@mui/material";
import Textfield from "./TextFeild/index1";
import Button from "./Button";
import { authContext } from "../contexts/AuthContext";
// import { useHistory, useLocation } from "react-router";
import { RegisterFormCss } from "./RegisterFormCss";
// import { Link } from "react-router-dom";
import MainLogo from "./../images/MainLogo";
import { FORM_LOGIN_VALIDATION } from "./../validationService/Yupvalidation";
import "../App.css";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const cacheLtr = createCache({
  key: "muiltr",
});

const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  // overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrTheme = createTheme({ direction: "ltr" });
const rtlTheme = createTheme({ direction: "rtl" });

// css style to the form
const useStyles = RegisterFormCss;
// Configure JSS

// initial the formik form values for the register form
const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

/// ---------------------------------- LoginFormM component-----------------------------
const Login = () => {
  const [isRtl, setIsRtl] = React.useState(true);
  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
    console.log(isRtl);
  }, [isRtl]);
  const navigate = useNavigate();
  const classes = useStyles();

  // initialize context

  //   useLayoutEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, []);

  // initialize validation

  // initialize form values
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { currentUser, setCurrentUser } = useContext(authContext);
  // route consts
  //   const history = useHistory();
  //   const location = useLocation();
  // DB function //////////////////////////////////////////////////////////////////

  // send User Info To DB
  // handle Submit - register form
  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    const res = await loginUser(values);
    console.log(res);
    switch (res.statusId) {
      case 1:
        setFormValues(values);
        setCurrentUser(res.value);
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.value));
        navigate("/");
        setLoading(false);
        break;
      case 2:
        setLoading(false);
        setCurrentUser(undefined);
        setError(res.value);
        setTimeout(() => {
          setError("");
        }, 5000);

        break;
      default:
    }
  };
  // handle Submit - code form

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
        <CssBaseline />
        <Grid
          container
          direction="row"
          maxwidth="xs"
          item
          justifyContent="center"
          className="formWrapper"
        >
          <Grid direction="column" container item xs={12} md={6}>
            <Grid direction="row" container justifyContent="center">
              {/* <Link to="/">
            <Hidden smDown>
              <MainLogo
                width={192}
                height={33}
                //   className={classes.logoMobile}
              />
            </Hidden>
            <Hidden smUp>
              <MainLogo
                width={145}
                height={25}
                //   className={classes.logoMobile}
              />
            </Hidden>
          </Link> */}
            </Grid>
            {/* {loading && !error} */}
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_LOGIN_VALIDATION}
              onSubmit={(values, onSubmitProps) => {
                handleSubmit(values, onSubmitProps);
              }}
            >
              <Form>
                <Grid container item xs={12}>
                  <Hidden smUp>
                    <Grid
                      dir="column"
                      container
                      item
                      xs={12}
                      md={6}
                      justifyContent="center"
                      className={classes.image}
                    ></Grid>
                  </Hidden>
                  <Grid container item xs={12} justifyContent="center">
                    <p className={classes.title} />
                  </Grid>
                  {error && (
                    <Grid
                      className="input"
                      item
                      xs={12}
                      justifyContent="center"
                    >
                      {/* <h1 className={classes.errorMessage}>{error}</h1>{" "} */}
                      <h1>{error}</h1>{" "}
                    </Grid>
                  )}
                  <Grid
                    direction="row"
                    container
                    justifyContent="center"
                    className="input"
                    item
                    xs={12}
                  >
                    <Grid item xs={12} className="input">
                      <Textfield name="email" label="מייל" />
                    </Grid>
                  </Grid>
                  <Grid
                    direction="row"
                    container
                    justifyContent="center"
                    className="input"
                    item
                    xs={12}
                  >
                    {/* <Gr> */}
                    <Grid item xs={12} className="input">
                      <Textfield
                        name="password"
                        label="סיסמה"
                        type="password"
                        // inputProps={{
                        //   inputMode: "tel",
                        //   pattern: "[0-9]*",
                        // }}
                      />
                    </Grid>{" "}
                  </Grid>

                  <Grid
                    //   className={classes.btnWrapper}
                    container
                    item
                    xs={12}
                    alignItems="center"
                    justifyContent="center"
                    // style={{ minHeight: '10vh' }}
                  >
                    <Button error={error}>נקסט</Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Login;
