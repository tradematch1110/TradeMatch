import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { authContext } from "../contexts/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
export default function SideBar() {
  // const ulStyle = {
  //     text-align: right;
  const { currentUser, setCurrentUser } = useContext(authContext);

  const handleLogout = () => {
    setCurrentUser("");
    localStorage.removeItem("user", {});
  };
  const handleLogin = () => {
    navigate("/login");
  };
  // };
  const navigate = useNavigate();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  React.useEffect(() => {}, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemIcon style={{ justifyContent: "right" }}>
            <CloseIcon
              onClick={toggleDrawer(anchor, false)}
              style={{ color: "#666A", marginRight:15, marginTop: 5, fontSize:28 }}
            />
          </ListItemIcon>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/create_product")}>
            <ListItemText
              primary={"העלת מוצר"}
              style={{ textAlign: "right" }}
            />
            <ListItemIcon style={{ justifyContent: "left" }}>
              <FileUploadIcon style={{ color: "#0EACCB" }} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>

      {currentUser && (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/myProduct")}>
              <ListItemText
                primary={"המוצרים שלי"}
                style={{ textAlign: "right" }}
              />
              <ListItemIcon style={{ justifyContent: "left" }}>
                <ShoppingBasketIcon style={{ color: "#B119DE" }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      )}
      {currentUser && (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/myProduct")}>
              <ListItemText
                primary={"המועדפים שלי"}
                style={{ textAlign: "right" }}
              />
              <ListItemIcon style={{ justifyContent: "left" }}>
                <FavoriteIcon style={{ color: "#ff4d4d" }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      )}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary={"אזור אישי"}
              style={{ textAlign: "right" }}
            />
            <ListItemIcon style={{ justifyContent: "left" }}>
              <AccountCircleIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            {currentUser && (
              <ListItemText
                primary={"התנתק"}
                style={{ textAlign: "right" }}
                onClick={handleLogout}
              />
            )}
            {!currentUser && (
              <ListItemText
                primary={"התחבר"}
                style={{ textAlign: "right" }}
                onClick={handleLogin}
              />
            )}
            <ListItemIcon style={{ justifyContent: "left" }}>
              <LogoutIcon style={{ color: "#AD3242" }} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/about_us")}>
            <ListItemText primary={"אודות"} style={{ textAlign: "right" }} />
            <ListItemIcon style={{ justifyContent: "left" }}>
              <InfoIcon style={{ color: "#0EACCB" }} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={"צור קשר"} style={{ textAlign: "right" }} />
            <ListItemIcon style={{ justifyContent: "left" }}>
              <ContactMailIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
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
