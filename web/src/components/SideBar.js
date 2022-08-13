import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
export default function SideBar() {
    // const ulStyle = { 
    //     text-align: right;

      
    
    // };
    const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  React.useEffect(() => {
  }, []);
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate("/create_product")}>
            <ListItemText primary={'העלת מוצר'} style={{textAlign: 'right'}}/>
              <ListItemIcon style={{justifyContent: "left"}}>
                <FileUploadIcon /> 
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
      
      </List>
      <List>
          <ListItem  disablePadding>
            <ListItemButton>
            <ListItemText primary={'אזור אישי'} style={{textAlign: 'right'}}/>
              <ListItemIcon style={{justifyContent: "left"}}>
                <AccountCircleIcon /> 
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
      
      </List>
      <List>
          <ListItem  disablePadding>
            <ListItemButton>
            <ListItemText primary={'התנתק'} style={{textAlign: 'right'}}/>
              <ListItemIcon style={{justifyContent: "left"}}>
                <LogoutIcon /> 
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
      
      </List>
      <Divider />
      
      <List>
          <ListItem  disablePadding>
            <ListItemButton>
            <ListItemText primary={'צור קשר'} style={{textAlign: 'right'}}/>
              <ListItemIcon style={{justifyContent: "left"}}>
                <ContactMailIcon /> 
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
      
      </List>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
           <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
