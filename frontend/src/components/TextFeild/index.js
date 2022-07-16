import React from 'react'
import {
  InputAdornment,
  makeStyles,
  // styled,
  TextField,
} from '@material-ui/core'
import { useField } from 'formik'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorSharpIcon from '@mui/icons-material/ErrorSharp'

const useStyles = makeStyles((theme) => ({
  underline: {
    "&&&:not($error):before": {
      borderBottom: "1px solid #9b9b9b",
    },
    "&&not($error):after": {
      borderBottom: "2px solid #0EACCB",
    },
    "&&&:before": {
      borderBottom: "1px solid #9b9b9b",
    },
    "&:after": {
      borderBottom: "2px solid #0EACCB",
    },
  },
  error: {},
  root: {
    [theme.breakpoints.up("lg")]: {
      // padding: theme.spacing(8),
      fontSize: "18px",
      fontWeight: "300",
      marginTop: 0,
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "22px",
      fontWeight: "300",
      marginTop: 0,
    },

    fontFamily: "Assistant",
    fontSize: "18px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#1b3b36",
    marginTop: 5,

    "& .Mui-error": {
      [theme.breakpoints.up("lg")]: {
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
      [theme.breakpoints.up("lg")]: {
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
      [theme.breakpoints.up("lg")]: {
        // padding: theme.spacing(8),
        fontSize: "22px",
        fontWeight: "300",
      },

      display: "inline-block",
      fontFamily: "Assistant",
      fontWeight: "normal",
      fontSize: "18px",
      color: "#9b9b9b",
      //   textAlign: "right"
    },

    "& label.Mui-focused": {
      [theme.breakpoints.up("lg")]: {
        // padding: theme.spacing(8),
        fontSize: "22px",
        fontWeight: "300",
      },

      fontFamily: "Assistant",
      fontSize: "18px",
      color: "#0EACCB",
    },
  },
  // input: {
  //   [theme.breakpoints.up('lg')]: {
  //     // padding: theme.spacing(8),
  //     fontSize: '22px',
  //   },

  //   fontFamily: 'Assistant',
  //   fontSize: '18px',
  //   fontWeight: 'normal',
  //   fontStretch: 'normal',
  //   fontStyle: 'normal',
  //   lineHeight: 'normal',
  //   letterSpacing: 'normal',
  //   color: '#1b3b36',

  // marginBottom: 5
  // },
}));

// const CssTextField = styled(TextField)({
//   '& label.Mui-focused': {
//     fontFamily: 'Assistant',
//     fontSize: '14px',
//     color: '#0EACCB',
//   },
//   '& label': {
//     fontFamily: 'Assistant',
//     fontSize: '14px',
//     color: '#0EACCB',
//   },
//   '& .MuiInput-underline:after': {
//     borderBottomColor: 'green',
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: 'green',
//     },
//     '&:hover fieldset': {
//       borderColor: 'green',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: 'green',
//     },
//   },
// })

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name)
  const classes = useStyles()
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'standard',
  }
  // console.log(otherProps)
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true
    configTextfield.helperText = mata.error
  }

  return (
    <TextField
      className={classes.root}
      type={otherProps.type}
      // focused={false}

      // onBlur={console.log("test ")}
      // onFocus={console.log("test ")}      // onBlur={() => this.onBlurField()}
      // InputLabelProps={{ shrink: true }}
      InputProps={{
        classes,
        inputMode: "numeric",
        // inputMode: otherProps.inputMode,
        // className: classes.input,
        endAdornment:
          (!configTextfield.error && mata.touched && (
            <InputAdornment position="end">
              <CheckCircleIcon
                sx={{
                  fill: "#0EACCB",
                  // '& input:valid + fieldset': {
                  //   fill: '#93278f',
                  //   borderWidth: 2,
                  // },
                }}
              />
            </InputAdornment>
          )) ||
          (configTextfield.error && mata.touched && (
            <InputAdornment position="end">
              <ErrorSharpIcon
                sx={{
                  fill: "#f44336",
                  // '& input:valid + fieldset': {
                  //   fill: '#93278f',
                  //   borderWidth: 2,
                  // },
                }}
              />
            </InputAdornment>
          )),
      }}
      {...configTextfield}
    />
  );
}

export default TextfieldWrapper

// textField: {
//   // [theme.breakpoints.up('lg')]: {
//   //   // padding: theme.spacing(8),
//   //   fontSize: '40px',
//   //   maxWidth: 800,
//   //   marginTop: 0,
//   // },
// fontFamily: 'Assistant',
// fontSize: '18px',
// fontWeight: 'normal',
// fontStretch: 'normal',
// fontStyle: 'normal',
// lineHeight: 'normal',
// letterSpacing: 'normal',
// textAlign: 'center',
// color: '#1b3b36',
// marginTop: 3,

// '& .Mui-error': {
//   fontFamily: 'Assistant',
//   color: 'red',
//   // fontSize: '14px',

//   '&.MuiInput-underline-150:after': {
//     borderBottom: '2px solid red',
//   },
// },
// '& label': {
//   fontFamily: 'Assistant',
//   fontSize: '18px',
//   color: '#9b9b9b',
// },
// '& label.Mui-focused': {
//   fontFamily: 'Assistant',
//   fontSize: '14px',
//   color: '#0EACCB',
// },
// '&.MuiInput-underline-150:after': {
//   // right: 0,
//   // left: 0,
//   // bottom: 0,
//   // content: "",
//   // position: "absolute",
//   // transform: "scaleX(0)",
//   borderBottom: '2px solid #0EACCB',
//   // pointerEvents: "none",
//   '& fieldset': {
//     borderColor: 'red',
//   },
//   '&:hover fieldset': {
//     borderBottom: '2px solid #0EACCB',
//   },
//   '&.Mui-focused fieldset': {
//     borderBottom: '2px solid #0EACCB',
//   },
// },

// },
// input: {
//   fontFamily: 'Assistant',
//   fontSize: '18px',
//   fontWeight: 'normal',
//   fontStretch: 'normal',
//   fontStyle: 'normal',
//   lineHeight: 'normal',
//   letterSpacing: 'normal',
//   textAlign: 'center',
//   color: '#1b3b36',

// marginBottom: 5
// underline: {
// '&.Mui-focused ':{
//   borderBottom: '3px solid #0EACCB'}
// }
// '&.MuiInput-underline-150:after': {
//   // right: 0,
//   // left: 0,
//   // bottom: 0,
//   // content: "",
//   // position: "absolute",
//   // transform: "scaleX(0)",
//   borderBottom: '2px solid #0EACCB',
//   // pointerEvents: "none",
//   '& fieldset': {borderBottom: '2px solid #0EACCB'
//     borderColor: 'red',
//   },
//   '&:hover fieldset': {
//     borderBottom: '2px solid #0EACCB',
//   },
//   '&.Mui-focused fieldset': {
//     borderBottom: '2px solid #0EACCB',
//   },
// },

// },
