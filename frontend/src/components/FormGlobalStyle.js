import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

export const FormGlobalStyle = makeStyles((theme) => ({
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
  input: {
    [theme.breakpoints.up("md")]: {
      width: 361,
      marginTop: "2%",
    },
    background: "#66666",
    width: "262px",
    marginTop: "2%",
  },
  imageDesktop: {
    // marginTop: '99px',
    // marginBottom: '56px',
    maxWidth: "597px",
    maxHeight: "578px",
    display: "inline-block",
    // [theme.breakpoints.down('lg')]: {
    //   padding: '5%',

    // },
  },
  imageDesktopWraper: {
    [theme.breakpoints.down("lg")]: {
      padding: "15%",
    },
    // paddingLeft: '10%',
    // paddingRight: '10%',
    // paddingTop: '15%',
    //  padding: '15%',

    // marginTop: '117px',
    // marginBottom: '25%',
    // paddingLeft: '20%',
    // paddingRight: '95px',
    // paddingTop: '70px',
    // display: 'inline-block',
    // borderLeft: 'solid 2px #979797',
  },
}));
