import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  /* default */
  
    fontFamily: 'Assistant',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#1b3b36',
    marginTop: 3,

  .MuiInput-underline:before {
    border-bottom: 2px solid purple;
  }
  /* hover (double-ampersand needed for specificity reasons. */
  && .MuiInput-underline:hover:before {
    border-bottom: 2px solid purple;
  }
  /* focused */
  .MuiInput-underline:after {
    border-bottom: 2px solid purple;
  }
`;

export default StyledTextField;