import {
  makeStyles,
} from "@material-ui/core/styles";


export const RegisterFormCss = makeStyles((theme) => ({
  formWrapper: {
    minWidth: "100%",
    marginTop: theme.spacing(2),
    padding: "0px",
    [theme.breakpoints.up("sm")]: {
      minWidth: "100%",
      marginTop: 0,
      padding: "0px",
    },
  },
  image: {
    paddingLeft: "5%",
    paddingRight: "5%",

    marginTop: 50,
    hight: 125,
  },
  logoMobile: {
    [theme.breakpoints.up("sm")]: {
      paddingTop: "32px",
      paddingBottom: "48px",
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      paddingBottom: "15px",
      // marginRight: '10px',
      // marginTop: '5px',
    },
  },
  text_16_center: {
    [theme.breakpoints.up("md")]: {
      // padding: theme.spacing(8),
      fontSize: "22px",
      // maxWidth: 800,
      marginBottom: "51px",
    },
    fontFamily: "Assistant",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#9b9b9b",
    marginTop: 60,
  },
  PinCodeRow: {
    [theme.breakpoints.up("md")]: {
      // padding: theme.spacing(8),
      // fontSize: '40px',
      // minWidth: '100%',
    },
    //  maxWidth: "100%",
    position: "flex",
  },

  btnWrapper: {
    [theme.breakpoints.up("md")]: {
      marginTop: "5%",
      marginBottom: "33px",
    },
    marginTop: "20px",
    marginBottom: "19px",
  },
  btnWrapperCoderow: {
    marginTop: "58px",
    // marginBottom: '60%',
  },
  stepperWrapper: {
    [theme.breakpoints.up("md")]: {
      width: "265px",
    },
    width: "262px",
    paddingLeft: 0,
    paddingRight: 0,
  },
  input: {
    [theme.breakpoints.up("md")]: {
      width: 361,
      marginTop: "2%",
    },

    width: "262px",
    marginTop: "2%",
  },
  title: {
    [theme.breakpoints.up("md")]: {
      fontSize: "44px",
      fontWeight: "bold",
      marginBottom: "2%",
      marginTop: "5%",
    },
    fontFamily: "Assistant",
    fontSize: "30px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#6e2485",
    height: "48px",
    marginTop: "9%",
    // marginTop: 36,

    margin: 0,
  },

  subInputLine: {
    [theme.breakpoints.up("md")]: {
      // padding: theme.spacing(8),
      fontFamily: "Assistant",
      fontSize: "16px",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "left",
      color: "#5E5E5F",
      marginTop: 1,
    },
    fontFamily: "Assistant",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#5E5E5F",
    marginTop: 1,
  },
  errorMassage: {
    fontFamily: "Assistant",
    fontSize: "22px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "red",
    height: "20px",
  },
}));

