import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../../assets/BackgroundLogin";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from "@mui/icons-material/Home";
import Loading from "../Loader";
import {
  getToken,
  removeToken,
  getUserName,
  getUlb,
  getRoles,
  getName,
} from "../../utils/cookie";
import { ChatRounded, FileOpen, FileOpenOutlined, Verified } from "@mui/icons-material";
import { set } from "lodash";
import { fetchFamiliesDetSuccess } from "../../network/actions/familyDetailApi";
import { useDispatch } from "react-redux";
import { getImagePath } from "../../utils/CustomImagePath";
import { CircularProgress } from "@mui/material";
import CottageIcon from '@mui/icons-material/Cottage';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SummarizeIcon from '@mui/icons-material/Summarize';
const drawerWidth = 250;

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

function Layout(props) {
  const { window } = props;
  const { children } = props;
  const dispatch = useDispatch()

  const router = useRouter();

  const pathName = usePathname();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading1, setLoading] = useState(false);

  const [username, setUsername] = React.useState("");

  const [role, setRole] = useState("");

  let globalUserName = "";
  let globalName = "";
  let globalRole = "";

  useEffect(() => {
    if (getUserName()) {
      globalUserName = getUserName();
    }
    // if (getName()) {
    //   globalName = JSON.parse(getName());
    // }

    if (globalUserName) {
      setUsername(globalUserName);
    }
    if (getRoles()) {
      globalRole = getRoles()?.map(v => v)?.[0];
    }
    if (globalRole) {
      setRole(globalRole);
    }

    // const getUlbData = getUlb();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    removeToken();
    dispatch(fetchFamiliesDetSuccess({}))
    setTimeout(function () {
      router.push("/login");
    }, 1000);
  };

  const normal = [

    { text: "Survey Summary", route: "survey_summary", icon: <SummarizeIcon /> },
    { text: "Survey Consumer Summary", route: "survey_consumer_summary", icon: <FileOpen /> },

  ]
  const normal2 = [
    { text: "Dashboard", route: "dashboard", icon: <DashboardIcon /> },
    { text: "Survey Data", route: "survey-data", icon: <CottageIcon /> },
    // { text: "View Hotels Survey Data", route: "view_hotel_data", icon: <LocationCityIcon /> },


  ]

  const admin = [
    { text: "Dashboard", route: "dashboard", icon: <DashboardIcon /> },
    { text: "View Domestic Survey Data", route: "view_edit_data", icon: <CottageIcon /> },
    { text: "View Hotels Survey Data", route: "view_hotel_data", icon: <LocationCityIcon /> },
    { text: "Survey Summary", route: "survey_summary", icon: <SummarizeIcon /> },
    { text: "Survey Consumer Summary", route: "survey_consumer_summary", icon: <FileOpen /> },
    { text: "Analytics Dashboard", route: "analytics_dashboard", icon: <ChatRounded /> }

  ]

  const now = new Date();

  // Get the current hours
  const currentHour = now.getHours();

  const drawer = (
    <div style={{}}>
      <Toolbar>
        <Image src={getImagePath('/himachal_logoo.svg')} width={65} height={45} alt="Logo" />
        <Typography variant="h6" noWrap component="div" marginLeft={2}>
        Field Survey
                  {/* <br /> (Urban) */}
        </Typography>
      </Toolbar>

      <List style={{ marginTop: 20 }}>
        {/* {role == "Admin" && admin?.map((option, index) => (
          <ListItem
          key={option.text}
          disablePadding
          sx={{
            borderRight: pathName.startsWith("/" + option.route.toLowerCase())
            ? "4px solid #074465"
            : "0px solid #FFFFFF",
          }}
          className={
            pathName.startsWith("/" + option.route.toLowerCase())
            ? " text-[#074465] bg-[#f2f5f9] bg-white"
            : "text-slate-700"
          }
          onClick={() => router.push("/" + option.route)}
          >
            <ListItemButton>
              <ListItemIcon
                className={
                  pathName.startsWith("/" + option.route.toLowerCase())
                    ? "text-[#074465]"
                    : "text-slate-700"
                }
                style={{marginRight : "-15px"}}
              >
                {option.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#074465",
                  },
                }}
                primaryTypographyProps={{ fontSize: "14px" }}
                primary={option.text}
              />
            </ListItemButton>
          </ListItem>
        ))} */}
        { normal2?.map((option, index) => (

          <ListItem
            key={option.text}
            disablePadding
            sx={{
              borderRight: pathName.startsWith("/" + option.route.toLowerCase())
                ? "4px solid #074465"
                : "0px solid #FFFFFF",
            }}
            className={
              pathName.startsWith("/" + option.route.toLowerCase())
                ? " text-[#074465] bg-[#f2f5f9] bg-white"
                : "text-slate-700"
            }
            onClick={() => router.push("/" + option.route)}
          >
            <ListItemButton>
              <ListItemIcon
                className={
                  pathName.startsWith("/" + option.route.toLowerCase())
                    ? "text-[#074465]"
                    : "text-slate-700"
                }
                style={{ marginRight: "-15px" }}
              >
                {option.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#074465",
                  },
                }}
                primaryTypographyProps={{ fontSize: "14px" }}
                primary={option.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {/* {role != "Admin" && currentHour >= 19 && normal?.map((option, index) => (

          <ListItem
            key={option.text}
            disablePadding
            sx={{
              borderRight: pathName.startsWith("/" + option.route.toLowerCase())
                ? "4px solid #074465"
                : "0px solid #FFFFFF",
            }}
            className={
              pathName.startsWith("/" + option.route.toLowerCase())
                ? " text-[#074465] bg-[#f2f5f9] bg-white"
                : "text-slate-700"
            }
            onClick={() => router.push("/" + option.route)}
          >
            <ListItemButton>
              <ListItemIcon
                className={
                  pathName.startsWith("/" + option.route.toLowerCase())
                    ? "text-[#074465]"
                    : "text-slate-700"
                }
                style={{ marginRight: "-15px" }}
              >
                {option.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#074465",
                  },
                }}
                primaryTypographyProps={{ fontSize: "14px" }}
                primary={option.text}
              />
            </ListItemButton>
            </ListItem>
        ))} */}

      </List>

      <Divider />
    </div>
  );

  // Define function to get options based on user role
  function getOptionsForRole(role) {
    switch (role) {
      case "Admin":
        return [
          { text: "Dashboard", route: "dashboard" },
          { text: "Survey Summary", route: "survey_summary" },
          { text: "View/Edit Data", route: "view_edit_data" },
          { text: "Verified Family Data", route: "verified_family_data" },
          {
            text: "Not Verified Family Data",
            route: "non_verified_family_data",
          },
          { text: "View CSC Report",
           route: "csc-survey-report"
          },
        ];
      case "Surveyor":
        return [
          { text: "Dashboard", route: "dashboard" },
          // { text: "Survey Summary", route: "survey_summary" },
          { text: "View Domestic Survey Data", route: "view_edit_data" },
          { text: "View Hotels Survey Data", route: "view_hotel_data" }

        ];
      case "SuperAdmin":
        return [
          { text: "Dashboard", route: "dashboard" },
          // { text: "Survey Summary", route: "survey_summary" },
          { text: "View Data", route: "view_edit_data" }

        ];
      case "Verifying Authority":
        return [
          { text: "Dashboard", route: "dashboard" },
          { text: "Survey Summary", route: "survey_summary" },
          { text: "View/Edit Data", route: "view_edit_data" },
          { text: "Verified Family Data", route: "verified_family_data" },
          {
            text: "Not Verified Family Data",
            route: "non_verified_family_data",
          },
        ];
      case "Viewing Authority":
        return [
          { text: "Dashboard", route: "dashboard" },
          { text: "Survey Summary", route: "survey_summary" },
          { text: "View Data", route: "view_edit_data" },
          { text: "Verified Family Data", route: "verified_family_data" },
          {
            text: "Not Verified Family Data",
            route: "non_verified_family_data",
          },
        ];
        case "CSC Admin":
          return [
            { text: "Dashboard", route: "dashboard" },
            { text: "Survey Summary", route: "survey_summary" },
            { text: "View Data", route: "view_edit_data" },
            { text: "Verified Family Data", route: "verified_family_data" },
            {
              text: "Not Verified Family Data",
              route: "non_verified_family_data",
            },
            { text: "View CSC Report",
            route: "csc-survey-report"
           },

          ];
      default:
        return [];
    }
  }

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        enableColorOnDark={false}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#FFF",
          color: "#000",
        }}
      >
        <Toolbar elevation={0}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { md: "flex" } }}></Box>

          <Stack direction={"row"} spacing={2}>
            <Typography variant="h7" style={{ alignSelf: "center" }}>
              Welcome {username}
            </Typography>
            <Button color="inherit" onClick={handleMenuClick}>
              <AccountCircleIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
              {/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderWidth: 0,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          anchor="left"
          PaperProps={{
            style: {
              backgroundColor: "#FFFFFF", // Set your desired background color here
              // boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.2)',
              overflow: "hidden",
            },
          }}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderWidth: 0,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#f2f5f9",
          margin: 0,
          padding: 0,
          borderRadius: 5,
        }}
      >
        <Toolbar />

        {/* <React.Suspense fallback={<Loading />}>{children}</React.Suspense> */}

        <main className="flex-none transition-all">
          {/* {loading1 ? <Loader /> : children} */}
          {loading1 ? <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <CircularProgress />
          </Box> : children}

</main>
      </Box>
    </Box>
  );
}

export default Layout;
