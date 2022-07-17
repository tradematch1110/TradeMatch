import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
// import { useState } from "react";

const CheckboxWrapper = ({ name, legend, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [meta] = useField(name);
  // const [checkBoxValues, setCheckBoxValues] = useState([]);
  const arr = [];

  // console.log(options)
  const handleChange = (e, value) => {
    console.log("e.target.value: ", e.target.value);
    console.log("e.target.name: ", e.target.checked);
    console.log("value: ", value);
    console.log("arr before ", arr);
    setFieldValue(null);
    const find = arr.find((element) => element === e.target.value);
    if (find) {
      let index = arr.indexOf(value);
      arr.splice(index, 1);
      console.log("splice");
      setFieldValue(null);
      if (arr.length > 0) setFieldValue(name, arr);
    }
    if (!find) {
      arr.push(e.target.value);
      console.log("posh");
      setFieldValue(null);
      if (arr.length > 0) setFieldValue(name, arr);
    }
    console.log("arr after ", arr);
    // if (e.target && arr.length>0) setFieldValue(name, arr);
    // if (e.target && arr.length == 0) setFieldValue( );
    // console.log("arr after setField ", arr);
  };

  // const configCheckbox = {
  //   ...field,
  //   inputProps: options,
  //   onChange: handleChange(),
  // };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <Box m={2} borderColor="black">
      <FormControl {...configFormControl}>
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup>
          <div>
            {Object.keys(options).map((item, pos) => (
              <FormControlLabel
                value={item}
                control={
                  <Checkbox
                    // checked={options[item]}
                    // onChange={handleChange}
                    onChange={(e) => handleChange(e, options[item])}
                  />
                }
                label={options[item]}
                // value={field.checked}
                // checked={field.checked}
              />
            ))}
          </div>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default CheckboxWrapper;
