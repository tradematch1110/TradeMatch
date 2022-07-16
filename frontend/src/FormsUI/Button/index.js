import React from "react";
import { Button, styled } from "@material-ui/core";
import {  useFormikContext } from "formik";

const ColorButton = styled(Button)(({ theme }) => ({

  width: 'auto',
  minWidth: "140px",
  height: '48px',
  display: "inline-block",
  paddingBottom: '10px',

  // minHeight: "48px",
  // margin: "22px 23px 36px 77px",
  // padding: "3px 25px 7px",
  borderRadius: '27.5px',
  fontFamily: 'Assistant',
  fontSize: '24px',
  fontWeight: '600',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: '1px',
  letterSpacing: 'normal',
  textAlign: 'center',
  alignItems: "center",
  color: '#6e2485',

  boxShadow: '0 0 6px 0 rgba(157, 96, 212, 0.5)',
  border: ' solid 3px transparent',
  backgroundImage:
    'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #93278f 32%, #49278f 102%)',
  backgroundOrigin: '0 0 0 0.2rem rgba(0,123,255,.5)',
  backgroundClip: 'content-box, border-box',
  boxShadow: '2px 1000px 1px #fff inset , 0 1px 8px 0 #d0d0d0',



  '&:hover': {
    backgroundColor: '#6E2485',
    color: '#fff',
  },
  // '&:active': {
  //   backgroundColor: '#6E2485',
  //   color: '#fff',
  // },
  // '&:focus': {
  //   backgroundColor: '#6E2485',
  //   color: '#fff',
  // },
error:{},
'&:disabled':{
    boxShadow: '0 0 6px 0 rgba(157, 96, 212, 0.5)',
    border: ' solid 3px transparent',
    backgroundImage:
      'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #bab7b7 32%, #bab7b7 102%)',
    backgroundOrigin: '0 0 0 0.2rem rgba(0,123,255,.5)',
    backgroundClip: 'content-box, border-box',
    boxShadow: '2px 1000px 1px #fff inset , 0 1px 8px 0 #d0d0d0',

}
}));
const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();
  // const [field, mata] = useField()

  // const [disabled, setDisabled] = useState(false);
  // console.log(otherProps)
  const handleSubmit = (e) => {
    submitForm();
    // .finaly(
    //   setDisabled(true)
    // );
  };

  const configButton = {
    variant: "contained",
    // color: "primary",
    fullWidth: true,
    disabled: !otherProps.dirty || (!otherProps.isValid && (otherProps.error==="" || !otherProps.error)),
    // disabled: (!otherProps.dirty||!otherProps.isValid),

    onClick: (e) => {
      handleSubmit(e);
    },
  };

  return (
    <>
      <ColorButton {...configButton}>{children}</ColorButton>
    </>
  );
};

export default ButtonWrapper;
