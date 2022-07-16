import React from "react";
// import {
//   makeStyles,
//   // styled,
// } from "@mui/styles";
import { styled } from "@mui/material";

import { useField } from "formik";
import { InputAdornment, TextField } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorSharpIcon from "@mui/icons-material/ErrorSharp";
// import {
//   ThemeProvider,
//   createMuiTheme,
//   makeStyles,
// } from "@material-ui/core/styles";

// const theme = createMuiTheme();
// const useStyles = makeStyles((theme) => ({
//   underline: {
//     "&&&:not($error):before": {
//       borderBottom: "1px solid #9b9b9b",
//     },
//     "&&not($error):after": {
//       borderBottom: "2px solid #6E2485",
//     },
//     "&&&:before": {
//       borderBottom: "1px solid #9b9b9b",
//     },
//     "&:after": {
//       borderBottom: "2px solid #6E2485",
//     },
//   },
//   error: {},
//   root: {
//     [theme.breakpoints.up("md")]: {
//       // padding: theme.spacing(8),
//       fontSize: "22px",
//       fontWeight: "300",
//     },
//     fontFamily: "Assistant",
//     fontSize: "18px",
//     fontWeight: "normal",
//     fontStretch: "normal",
//     fontStyle: "normal",
//     lineHeight: "normal",
//     letterSpacing: "normal",
//     color: "#1b3b36",
//     marginTop: 5,

//     "& .Mui-error": {
//       [theme.breakpoints.up("md")]: {
//         // padding: theme.spacing(8),
//         fontSize: "18px",
//         fontWeight: "300",
//         // color: 'red',
//       },

//       fontFamily: "Assistant",
//       // color: 'red',
//       fontSize: "16px",
//     },

//     //
//     // fontSize: '14px',

//     "& label.Mui-error": {
//       [theme.breakpoints.up("md")]: {
//         // padding: theme.spacing(8),
//         fontSize: "22px",
//         fontWeight: "300",
//         color: "#9b9b9b",
//       },

//       display: "inline-block",
//       fontFamily: "Assistant",
//       fontSize: "18px",
//       color: "#9b9b9b",
//     },

//     "& label": {
//       [theme.breakpoints.up("md")]: {
//         // padding: theme.spacing(8),
//         fontSize: "22px",
//         fontWeight: "300",
//       },

//       display: "inline-block",
//       fontFamily: "Assistant",
//       fontWeight: "normal",
//       fontSize: "18px",
//       color: "#9b9b9b",
//     },

//     "& label.Mui-focused": {
//       [theme.breakpoints.up("md")]: {
//         // padding: theme.spacing(8),
//         fontSize: "22px",
//         fontWeight: "300",
//       },

//       fontFamily: "Assistant",
//       fontSize: "18px",
//       color: "#6E2485",
//     },
//   },
//   // input: {
//   //   [theme.breakpoints.up('md')]: {
//   //     // padding: theme.spacing(8),
//   //     fontSize: '22px',
//   //   },

//   //   fontFamily: 'Assistant',
//   //   fontSize: '18px',
//   //   fontWeight: 'normal',
//   //   fontStretch: 'normal',
//   //   fontStyle: 'normal',
//   //   lineHeight: 'normal',
//   //   letterSpacing: 'normal',
//   //   color: '#1b3b36',

//   // marginBottom: 5
//   // },
// }));

const CssTextField = styled(TextField)(({ theme }) => ({
  // underline: {
  //   "&&&:not($error):before": {
  //     borderBottom: "1px solid #555",
  //   },
  //   "&&not($error):after": {
  //     borderBottom: "1px solid #555",
  //   },
  //   "&&&:before": {
  //     borderBottom: "1px solid #555",
  //   },
  //   "&:after": {
  //     borderBottom: "1px solid #555",
  //   },
  // },

  "& .MuiTextField-root": {
    [theme.breakpoints.up("md")]: {
      // padding: theme.spacing(8),
      fontSize: "22px",
      fontWeight: "300",
    },
    fontFamily: "Assistant",
    fontSize: "18px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#1b3b36",
    marginTop: 50,
  },
  "& .Mui-error": {
    [theme.breakpoints.up("md")]: {
      // padding: theme.spacing(8),
      fontSize: "18px",
      fontWeight: "300",
      // color: 'red',
    },

    fontFamily: "Assistant",
    // color: 'red',
    fontSize: "16px",
  },

  //
  // fontSize: '14px',

  "& label.Mui-error": {
    [theme.breakpoints.up("md")]: {
      // padding: theme.spacing(8),
      fontSize: "22px",
      fontWeight: "300",
      color: "#9b9b9b",
    },

    display: "inline-block",
    fontFamily: "Assistant",
    fontSize: "18px",
    color: "#9b9b9b",
  },

  "& label": {
    [theme.breakpoints.up("md")]: {
      // padding: theme.spacing(8),
      fontSize: "22px",
      fontWeight: "300",
    },
    display: "inline-block",
    fontFamily: "Assistant",
    fontWeight: "normal",
    fontSize: "18px",
    color: "#9b9b9b",
  },

  "& label.Mui-focused": {
    [theme.breakpoints.up("md")]: {
      // padding: theme.spacing(8),
      fontSize: "22px",
      fontWeight: "300",
    },

    fontFamily: "Assistant",
    fontSize: "18px",
    color: "#6E2485",
  },

  // "& label.Mui-focused": {
  //   [theme.breakpoints.up("md")]: {
  //     // padding: theme.spacing(8),
  //     fontSize: "22px",
  //     fontWeight: "300",
  //   },
  //   fontFamily: "Assistant",
  //   fontSize: "18px",
  //   color: "#6E2485",
  // },

  // "& label": {
  //   [theme.breakpoints.up("md")]: {
  //     // padding: theme.spacing(8),
  //     fontSize: "22px",
  //     fontWeight: "300",
  //   },
  //   display: "inline-block",
  //   fontFamily: "Assistant",
  //   fontWeight: "normal",
  //   fontSize: "18px",
  //   color: "#9b9b9b",
  // },

  // "& .MuiInput-underline:after": {
  //   borderBottomColor: "green",
  // },
  // "& .MuiOutlinedInput-root": {
  //   "& fieldset": {
  //     borderColor: "green",
  //   },
  //   "&:hover fieldset": {
  //     borderColor: "green",
  //   },
  //   "&.Mui-focused fieldset": {
  //     borderColor: "green",
  //   },
  // },
}));

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);
  // const classes = useStyles();
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "standard",
  };
  // console.log(otherProps)
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <CssTextField
      // className={classes.root}
      
      type={otherProps.type}
      // focused={false}
      // onBlur={console.log("test ")}
      // onFocus={console.log("test ")}      // onBlur={() => this.onBlurField()}
      // InputLabelProps={{ shrink: true }}
      InputProps={{
        // classes,
        inputMode: "numeric",
        // inputMode: otherProps.inputMode,
        // className: classes.input,
        endAdornment:
          (!configTextfield.error && mata.touched && (
            <InputAdornment position="end">
              {/* <CheckCircleIcon
                sx={{
                  fill: "#82278f",
                  // '& input:valid + fieldset': {
                  //   fill: '#93278f',
                  //   borderWidth: 2,
                  // },
                }}
              /> */}
            </InputAdornment>
          )) ||
          (configTextfield.error && mata.touched && (
            <InputAdornment position="end">
              {/* <ErrorSharpIcon
                sx={{
                  fill: "#f44336",
                  // '& input:valid + fieldset': {
                  //   fill: '#93278f',
                  //   borderWidth: 2,
                  // },
                }}
              /> */}
            </InputAdornment>
          )),
      }}
      {...configTextfield}
    />
  );
};

export default TextfieldWrapper;
