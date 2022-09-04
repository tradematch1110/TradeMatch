import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { Button, Hidden } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import MainLogo from "../svg/MainLogo";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(5),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawer, setIsDrawer] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { currentUser, setCurrentUser } = React.useContext(authContext);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setCurrentUser("");
    localStorage.removeItem("user", {});
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#0EACCB" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            // sx={{ mr: 2 }}
          >
            <SideBar />
          </IconButton>
          <MainLogo width={30} height={30} style={{ marginRight: 5 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: {
                // xs: "none",
                sm: "block",
                marginRight: 5,
                textDecoration: "none",
                color: "white",
                fontFamily: "ruby",
                fontWeight: 700,
                fontSize: 28,
              },
            }}
          >
            TradeMatch
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { sm: "flex" } }}>
            {currentUser && (
              <Hidden smDown>
                <div style={{ marginTop: 5, marginLeft: 15 }}>
                  <Button
                    component={Link}
                    to={"/create_product"}
                    endIcon={
                      <AddCircleIcon
                        style={{
                          fontWeight: 700,
                          transform: "translate(-15px, 1px)",
                        }}
                      />
                    }
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: 35,
                      width: 150,
                      background: "#FFFFFF",
                      color: "#0EACCB",
                      fontSize: 18,
                      fontWeight: 700,
                      borderRadius: 25,
                      border: 0,
                      textAlign: "center",
                    }}
                  >
                    העלה מוצר
                  </Button>
                </div>
              </Hidden>
            )}
            {currentUser && (
              <Hidden smDown>
                <FavoriteIcon
                  onClick={() => navigate("/favouritesProducts")}
                  style={{
                    color: "#ff4d4d",
                    marginTop: 10,
                    marginLeft: 10,
                    fontSize: 25,
                    cursor: "pointer",
                  }}
                />
              </Hidden>
            )}
            {currentUser && (
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => navigate("/user_messages")}
              >
                <Badge
                  badgeContent={currentUser && currentUser.messages.length}
                  color="error"
                >
                  <MailIcon />
                </Badge>
              </IconButton>
            )}
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* userAbbreviations: props.user.firstName.charAt(0) + "." +
              props.user.lastName.charAt(0), */}
              {currentUser && (
                <Avatar
                  sx={{
                    height: 25,
                    width: 25,
                    bgcolor: "#009900",
                    // marginLeft: 2,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  aria-label="recipe"
                >
                  {currentUser &&
                    currentUser.firstName.charAt(0) +
                      "." +
                      currentUser.lastName.charAt(0)}
                </Avatar>
              )}
              {!currentUser && (
                <Avatar
                  onClick={handleLogin}
                  sx={{
                    height: 25,
                    width: 25,
                    bgcolor: "#66666",
                    // marginLeft: 2,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  aria-label="recipe"
                ></Avatar>
              )}
            </IconButton>
            {!currentUser && (
              <Typography
                variant="h6"
                component={Link}
                to="/login"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    marginRight: 5,
                    textDecoration: "none",
                    color: "white",
                    marginTop: 5,
                  },
                  pointer: "cursor",
                }}
              >
                התחבר |
              </Typography>
            )}
            {!currentUser && (
              <Typography
                variant="h6"
                component={Link}
                to="/register"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    marginRight: 10,
                    textDecoration: "none",
                    color: "white",
                    marginTop: 5,
                  },
                }}
              >
                הרשם
              </Typography>
            )}
            {currentUser && (
              <Typography
                component={Button}
                variant="h6"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    marginRight: 5,
                    textDecoration: "none",
                    color: "white",
                  },
                }}
              >
                {currentUser.firstName}
              </Typography>
            )}
            {currentUser && (
              <Typography
                component={Button}
                variant="h6"
                onClick={handleLogout}
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    marginRight: 10,
                    textDecoration: "none",
                    color: "white",
                  },
                }}
              >
                התנתק
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
