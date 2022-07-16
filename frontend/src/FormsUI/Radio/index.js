import { Box, Typography } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  text_18_Label: {
    [theme.breakpoints.up('md')]: {
      // padding: theme.spacing(8),
      fontSize: '22px',
      fontWeight: '300',
      maxWidth: 500,

      // marginTop: 0,
    },
    fontFamily: 'Assistant',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#5e5e5f',
    maxWidth: 360,
    // margin: 2,
    '&.Mui-focused':{
      color: '#5e5e5f',

    },
    '&.MuiFormLabel-filled':{
      color: '#5e5e5f',

    }

  },

  text_18_option:{
    [theme.breakpoints.up('md')]: {
      // padding: theme.spacing(8),
      fontSize: '20px',
      fontWeight: '300',
      maxWidth: 400,
    },
    fontFamily: 'Assistant',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#5e5e5f',
    maxWidth: 360,
    // margin: 2,
    '&.Mui-focused':{
      color: '#5e5e5f',

    },
    '&.MuiFormLabel-filled':{
      color: '#5e5e5f',

    }

  },
  input: {
    // textAlign: "center",
    marginRight: '50px',
    marginLeft: '50px',
  },
  title: {
    [theme.breakpoints.up('md')]: {
      // padding: theme.spacing(8),
      fontSize: '40px',
      maxWidth: 800,
      marginTop: 0,
    },
    fontFamily: 'Assistant',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#5e5e5f',
    maxWidth: 360,
    // margin: 2,
  },


}))

const RadioWrapper = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)
  const classes = useStyles()


  const handleChange = (evt) => {
    const { value, name } = evt.target
    // if (name=="visitSpecialistDoc" && value == "Yes") {
    //   setButtonValue(true);
    // }
    // if (name == "visitSpecialistDoc" && value == "No") {
    //   setButtonValue(false);
    // }
    setFieldValue(name, value)
  }

  const configRadioBotton = {
    ...field,
    ...otherProps,
    variant: 'outlined',
    fullWidth: true,

    onChange: handleChange,
  }

  if (meta && meta.touched && meta.error) {
    configRadioBotton.error = true
    configRadioBotton.helpertext = meta.error
  }
  const StyledRadio = withStyles({
    checked: {
      '&$checked': {
        color: '#6e2485',
        '&:hover': {
          //you want this to be the same as the backgroundColor above
          backgroundColor: '#00ccff',
        },
      },
    },
    root: {
      border: 0,
      color: '#d0d0d0',
      flexDirection: 'row',
      // marginLeft: 40,

      // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

      '&:hover': {
        //you want this to be the same as the backgroundColor above
        backgroundColor: '#e6e6e6',
      },
    },

    // backgroundColor: "transparent",
  })(Radio)

  return (
    <Box component="span" >
        <FormControl className={classes.title} {...configRadioBotton}>
          <FormLabel className={classes.text_18_Label}>
            {otherProps.label}
          </FormLabel>
          {/* <FormLabel><Typography className={classes.h1}>{otherProps.label}</Typography></FormLabel> */}

          <RadioGroup
            // sx={{ display: 'inline-block',
            //  }}
            row={true}
            {...field}
            {...otherProps}
            name={name}
          >
            {Object.keys(options).map((item, pos) => (
              <FormControlLabel
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  justifyContent: '-moz-initial',
                  marginLeft:15,
                  width: 85,
                }}
                key={pos}
                value={item}
                label={
                  <Typography className={classes.text_18_option}>
                    {options[item]}
                  </Typography>
                }
                // label={options[item]}
                control={
                  <StyledRadio
                  // id={pos}
                  // icon={options[item]}
                  // checkedIcon={options[item]}
                  />
                }
              />
            ))}
          </RadioGroup>
          <FormHelperText>{configRadioBotton.helperText}</FormHelperText>
        </FormControl>
    </Box>
  )
}
export default RadioWrapper
// user-select: none;
// -webkit-tap-highlight-color: transparent;
// top: 0;
// right: 0;
// width: 100%;
// cursor: inherit;
// height: 100%;
// margin: 0;
// opacity: 0;
// padding: 0;
// z-index: 1;
// position: absolute;

// import React from "react";
// import { Box } from "@material-ui/core";
// import { useField, useFormikContext } from "formik";
// import {
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormHelperText,
// } from "@material-ui/core";
// import { withStyles } from "@material-ui/core/styles";

// const RadioWrapper = ({ name, options, ...otherProps }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);

//   const handleChange = (evt) => {
//     const {value, name}  = evt.target;
//     // if (name=="visitSpecialistDoc" && value == "Yes") {
//     //   setButtonValue(true);
//     // }
//     // if (name == "visitSpecialistDoc" && value == "No") {
//     //   setButtonValue(false);
//     // }
//     setFieldValue(name, value);
//   };

//   const configRadioBotton = {
//     ...field,
//     ...otherProps,
//     variant: "outlined",
//     fullWidth: true,
//     onChange: handleChange,
//   };

//   if (meta && meta.touched && meta.error) {
//     configRadioBotton.error = true;
//     configRadioBotton.helpertext = meta.error;
//   }
//   const StyledRadio = withStyles({
//     checked: {
//       "&$checked": {
//         color: "#ffffff",
//         background: "#93278f",
//         "&:hover": {
//           //you want this to be the same as the backgroundColor above
//           backgroundColor: "#49278f",
//         },
//       },
//     },
//     root: {

//       fontFamily: 'Assistant',
//       fontSize: '18px',
//       background: "#FFF",
//       borderRadius: 10,
//       border: 3,
//       color: "#AAAA",
//       height: 20,
//       // padding: "6px 20px",
//       width: 80,
//       display: 'inline-block',
//       //  width: 'auto',
//       // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//       marginTop: 10,
//       borderColor:"#93278f",
//       borderStyle: 'solid',
//       // marginLeft: 0,
//       "&:hover": {
//         //you want this to be the same as the backgroundColor above
//         backgroundColor: "#e6e6e6",
//       },
//     },

//     // backgroundColor: "transparent",
//   })(Radio);

//   return (
//     <Box component="span" m={2} >
//       <FormControl {...configRadioBotton}>
//         <FormLabel>{otherProps.label}</FormLabel>
//         <RadioGroup style={{display: 'flex', flexWrap: 'nowrap', justifyContent: '-moz-initial', margin: 0}}  row {...field} {...otherProps} name={name}>
//           {Object.keys(options).map((item, pos) => (
//             <FormControlLabel
//             style={{display: 'flex', flexWrap: 'nowrap', justifyContent: '-moz-initial', marginLeft: -3}}
//               key={pos}
//               value={item}
//               control={
//                 <StyledRadio
//                   label={options[item]}
//                   icon={options[item]}
//                   checkedIcon={options[item]}
//                 />
//               }
//             />
//           ))}
//         </RadioGroup>
//         <FormHelperText>{configRadioBotton.helperText}</FormHelperText>
//       </FormControl>
//     </Box>
//   );
// };
// export default RadioWrapper;
// user-select: none;
// -webkit-tap-highlight-color: transparent;
// top: 0;
// right: 0;
// width: 100%;
// cursor: inherit;
// height: 100%;
// margin: 0;
// opacity: 0;
// padding: 0;
// z-index: 1;
// position: absolute;
