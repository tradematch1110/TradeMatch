// Circular Indeterminate component
// block the screen and showing spinnig progrees icon (Spin component)

import Backdrop from '@material-ui/core/Backdrop'
import '../../App.css'

import { makeStyles } from '@material-ui/core/styles'
// import konektu_logo from "../../images/konektu_logo1.png";
import SvgComponent from './svg'
import SpinnerSVG from '../../images/global/SpinnerSVG'
import LogoLoaderSVG from '../../images/global/LogoLoaderSVG'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#eeea',
    // opacity: 0.7
    // color: '#ffffff'
  },
  // div: {

  // zIndex: 1,
  // background: "#fff",
  // opacity: 0.005,
  // },
}))

export default function CircularIndeterminate() {
  const classes = useStyles()
  return (
    <div>
      <Backdrop className={classes.backdrop} open>
        <SpinnerSVG className={'App-logo'} />
        {/* <LogoLoaderSVG></LogoLoaderSVG> */}
      </Backdrop>
    </div>
  )
}
