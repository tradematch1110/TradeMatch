import * as React from 'react'
// import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Box } from '@material-ui/core'
import { Field, useField, useFormikContext } from 'formik'
// import {
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormHelperText,
// } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export default function ToggleButtonNotEmpty({ name, options, ...otherProps }) {
  // const [devices, setDevices] = React.useState(() => ['phone']);

  // const handleDevices = (event, newDevices) => {
  //   if (newDevices.length) {
  //     setDevices(newDevices);
  //   }
  // };

  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)

  const handleChange = (evt) => {
    const { value, name } = evt.target
    console.log(name, value)
    setFieldValue(name, value)
  }

  const configRadioBotton = {
    ...field,
    ...otherProps,
    variant: 'outlined',
    fullWidth: true,
    onClick: handleChange,
  }

  if (meta && meta.touched && meta.error) {
    configRadioBotton.error = true
    configRadioBotton.helpertext = meta.error
  }
  const StyledRadio = withStyles({
    selected: {
      color: '#ffffff',
      backgroundColor: '#93278f',
    },
    root: {
      backgroundColor: '#ffffff',
      border: 5,
      borderColor: '#93278f',
      borderStyle: 'solid',
      // borderRadius: 5,
      color: '#AAA',
      height: 30,
      // padding: '6px 20px',
      width: 100,
      // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      marginTop: 10,

      // '&:hover': {
      //   //you want this to be the same as the backgroundColor above
      //   backgroundColor: 'black',
      // },
    },

    // backgroundColor: "transparent",
  })(ToggleButton)

  return (
    <Box>
      <div {...configRadioBotton} >
        <p>{otherProps.label}</p>
        <Field
          component={ToggleButtonGroup}
          row
          // {...field}
          // {...otherProps}
          name={name}
          type="radio"
          
        >
          {Object.keys(options).map((item, pos) => (
            <StyledRadio
              exclusive
              label={options[item]}
              value={options[pos]}
              aria-label={options[item]}
              name={options[item]}
              selcted={options[item]}
              >
              {options[item]}
            </StyledRadio>
          ))}
        </Field>
        <p>{configRadioBotton.helperText}</p>
      </div>
    </Box>
  )}
    // <Stack direction="row" spacing={4}>
    //   <ToggleButtonGroup
    //     value={devices}
    //     exclusive
    //     onChange={handleDevices}
    //     aria-label="device"
    //   >
    //     <ToggleButton value="laptop" aria-label="laptop">
    //       <h1>yes</h1>
    //     </ToggleButton>
    //     <ToggleButton value="tv" aria-label="tv">
    //     <h1>no</h1>
    //     </ToggleButton>
    //   </ToggleButtonGroup>
    // </Stack>
//   )
// }

// {
  /* <FormControl {...configRadioBotton}>
<FormLabel>{otherProps.label}</FormLabel>
<ToggleButtonGroup sx={{margin: 0}} row {...field} {...otherProps} name={name}>
  {Object.keys(options).map((item, pos) => (
    <FormControlLabel
      key={pos}
      value={item}
      control={
        <StyledRadio
          exclusive
          label={options[item]}
          value={options[pos]}
          aria-label="left aligned"                  name={options[item]}
          onClick={handleChange}
        >
          {options[item]}
        </StyledRadio>
      }
    />
  ))}
</ToggleButtonGroup>
<FormHelperText>{configRadioBotton.helperText}</FormHelperText>
</FormControl> */
// }
