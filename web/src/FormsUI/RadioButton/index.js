import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
const styles = (theme) => ({
  radio: {
    "&$checked": {
      color: "#4B8DF8",
    },
  },
  checked: {},
});
const useStyles = makeStyles({
  root: {
    background: "green",
    borderRadius: 10,
    border: 0,
    color: "black",
    height: 48,
    padding: "0 30px",
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: "10px",
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    // "input:hover ~ &": {
    //   backgroundColor: "blue",
    // },
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function CustomizedRadios() {
  return (
    <FormControl component="fieldset" >
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup row
        defaultValue="female"
        aria-label="gender"
        name="customized-radios"
      >
        <FormControlLabel
          value="female"
          control={<StyledRadio />}
          label="Female"
        />
        <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
        <FormControlLabel
          value="other"
          control={<StyledRadio />}
          label="Other"
        />
      </RadioGroup>
    </FormControl>
  );
}

// import React from "react";
// import { Box, TextField, Button } from "@material-ui/core";
// import { useField, useFormikContext } from "formik";
// import {
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormHelperText,
// } from "@material-ui/core";

// const RadioButtonWrapper = ({ name, options, ...otherProps }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);

//   const handleChange = (evt) => {
//     const { value } = evt.target;
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

//   return (
//     <Box component="span" m={1}>
//       <FormControl {...configRadioBotton} style={{}}>
//         <FormLabel>{otherProps.label}</FormLabel>
//         <RadioGroup row {...field} {...otherProps} name={name}>
//           {Object.keys(options).map((item, pos) => (
//             <FormControlLabel
//               key={pos}
//               value={item}
//               control={<Radio role="radio"/>}
//               label={options[item]}
//             />
//           ))}
//         </RadioGroup>
//         <FormHelperText>{configRadioBotton.helperText}</FormHelperText>
//       </FormControl>
//     </Box>
//   );
// };
// export default RadioButtonWrapper;
