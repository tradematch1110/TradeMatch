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
  h1: {
    [theme.breakpoints.up('md')]: {
      fontSize: '22px',
      color: '#666666',
      fontWeight: '300',
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
    paddingBottom: '20px',

    // maxWidth: 360,
    // margin: 2,
    '&.Mui-focused': {
      color: '#5e5e5f',
    },
    '&.MuiFormLabel-filled': {
      color: '#5e5e5f',
    },
  },

  buttonLabel: {
    [theme.breakpoints.up('md')]: {
      fontSize: '22px',
      fontWeight: '300',
    },
    fontFamily: 'Assistant',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#9b9b9b',
    // display: 'inline-block'
  },
  input: {
    // textAlign: "center",
    // marginRight: '50px',
    // marginLeft: '50px',
  },
  // div: {
  //   // textAlign: "center",
  //   margin: 4,
  //   borderTopRightRadius: 5,
  //   borderTopLeftRadius: 5,
  //   color: 'black',
  // },
}))

const RadioWrapper = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)
  const classes = useStyles()

  const handleChange = (evt) => {
    // const { value, name } = evt.target
    console.log(evt.target.name, evt.target.value)
    setFieldValue(evt.target.name, evt.target.value)
  }

  const configRadioBotton = {
    ...field,
    ...otherProps,
    variant: 'outlined',
    fullWidth: true,
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
      color: '#979797',
      flexDirection: 'row',
      '& svg': {
        width: '21px',
        height: '21px',
      },
      // marginLeft: 5,
      // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

      '&:hover': {
        //you want this to be the same as the backgroundColor above
        backgroundColor: '#e6e6e6',
      },
    },

    // backgroundColor: "transparent",
  })(Radio)

  return (
    <Box component="span">
      <FormControl {...configRadioBotton}>
        <FormLabel className={classes.h1}>{otherProps.label}</FormLabel>
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
                // display: '-webkit-inline-flex',

                // display: 'flex',
                // flexWrap: 'nowrap',
                // justifyItems:"-moz-initial",
                // paddingLeft: 10,
                // minWidth: "45%",
                display: '-webkit-inline-flex',
                flexWrap: 'nowrap',
                justifyItems: '-moz-initial',
                marginRight: '2%',
                // paddingLeft: 10,
                width: '42%',
              }}
              key={pos}
              value={item}
              label={
                // <Grid container justifyContent='space-around'>
                <Typography className={classes.buttonLabel}>
                  {' '}
                  {options[item]}
                </Typography>
                // </Grid>
              }
              // label={options[item]}
              control={
                <StyledRadio
                onClick={(e) => handleChange(e)}
                onMouseDownCapture={(e) => handleChange(e)}
                
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
