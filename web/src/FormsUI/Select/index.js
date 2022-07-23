import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const SelectWrapper = ({
  setSelectedMain,
  setSelectedMainReplaceable,
  name,
  options,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (value) => {
    setFieldValue(name, value);
    console.log("value: ", value, "name", name);
    if (setSelectedMain) setSelectedMain(value);

    // console.log(evt.target.name, evt.target.value);
    // setFieldValue(evt.target.name, evt.target.value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "standard",
    fullWidth: true,
    // onChange: handleChange
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem
            key={pos}
            value={item}
            // onClick={(e) => handleChange(options[item])}
            onClick={() =>
              handleChange(options[item] )
            }
            // onChange={(e) => handleChange(e)}
          >
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;


// {
//   Object.keys(options).map((item, pos) => {
//     return (
//       <MenuItem
//         key={pos}
//         value={item}
//         // onClick={(e) => handleChange(options[item])}
//         // onClick={(e) =>
//         //   handleChange({ value: options[item], name: options })
//         // }
//         // onChange={(e) => handleChange(e)}
//       >
//         {options[item]}
//       </MenuItem>
//     );
//   });
// }