
import React from "react";
import { Field, useField } from "formik";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
function CheckboxGroup(props) {
  const { legend, label, name, options, ...rest } = props;
  const [meta] = useField(name);


  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }
  return (
    <Box m={2} borderColor="black">
      <FormLabel {...configFormControl} component="legend">
        {legend}
      </FormLabel>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <FormControl key={option.key}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={option.value}
                        {...field}
                        {...rest.input}
                        value={option.value}
                      />
                    }
                    label={option.value}
                  />
                </FormGroup>
              </FormControl>
            );
          });
        }}
      </Field>
    </Box>
  );
}
export default CheckboxGroup;

//   <React.Fragment key={option.key}>
//     <input
//       type="checkbox"
//       id={option.value}
//       {...field}
//       {...rest}
//       value={option.value}
//       checked={field.value.includes(option.value)}
//     />
//     <label htmlFor={option.value}>{option.key}</label>
//   </React.Fragment>;
