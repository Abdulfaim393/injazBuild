"use client";
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveIcon from "@mui/icons-material/Remove";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import "../adminpage/adminhome.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminHome() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [topen, setTopen] = useState(false);
  const [eopen, setEopen] = useState(false);
  const [datas, setdatas] = useState({});

  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/dashBoard")
      .then((res) => {
        setdatas(res.data);
        console.log(datas, "datasdatasdatasdatasdatasdatasdatasdatas");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = () => {
    setTopen(!topen);
  };

  const eopenClick = () => {
    setEopen(!eopen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => router.push("/")}
          >
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => router.push("/adminpage/pages/admin_cars")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                fontSize: "12px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TimeToLeaveIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cars"
                sx={{ opacity: open ? 1 : 0, fontSize: "5px" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon sx={{ minWidth: "52px" }}>
                <SettingsIcon sx={{ marginLeft: "4px" }} />
              </ListItemIcon>
              <ListItemText primary="Car Settings" />
              {topen ? (
                <RemoveIcon sx={{ fontSize: "13px" }} />
              ) : (
                <AddIcon sx={{ fontSize: "13px" }} />
              )}
            </ListItemButton>
            <Collapse in={topen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4, fontSize: "5px" }}
                  onClick={() => router.push("/adminpage/pages/manage_catego")}
                >
                  <ListItemText
                    sx={{ fontSize: "5px" }}
                    primary="Manage Categories"
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => router.push("/adminpage/pages/car_brands")}
                >
                  <ListItemText primary="Car Brands" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => router.push("/adminpage/pages/car_models")}
                >
                  <ListItemText primary="Car Models" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => router.push("/adminpage/pages/car_features")}
                >
                  <ListItemText primary="Car Features" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() =>
                    router.push("/adminpage/pages/manage_services")
                  }
                >
                  <ListItemText primary="Manage Services" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() =>
                    router.push("/adminpage/pages/engine_capacities")
                  }
                >
                  <ListItemText primary="Engine Capacities" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => router.push("/adminpage/pages/required_docs")}
                >
                  <ListItemText primary="Required Documents" />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={eopenClick}>
              <ListItemIcon sx={{ minWidth: "52px" }}>
                <MailOutlineIcon sx={{ marginLeft: "4px" }} />
              </ListItemIcon>
              <ListItemText primary="Enquiries" />
              {eopen ? (
                <RemoveIcon sx={{ fontSize: "13px" }} />
              ) : (
                <AddIcon sx={{ fontSize: "13px" }} />
              )}
            </ListItemButton>
            <Collapse in={eopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => router.push("/adminpage/pages/car_enquiries")}
                >
                  <ListItemText primary="Car Enquiries" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() =>
                    router.push("/adminpage/pages/contact_enquiries")
                  }
                >
                  <ListItemText primary="Contact Enquiries" />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => router.push("/adminpage/pages/admin_location")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary="Locations"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => router.push("/adminpage/pages/admin_faqs")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary="FAQs" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/adminpage/pages/admin_cars")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/car-icon-png-25.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "#00800091",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalCars || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Cars
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/adminpage/pages/manage_catego")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/745197.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "#ff0000a1",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalCategoryes || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Categories
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/adminpage/pages/car_brands")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/745197.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "yellow",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalBrands || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Brands
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/adminpage/pages/car_enquiries")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/envelope-icon-14.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "#0000ff73",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalEnquiryes || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Enquiries
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() =>
                    router.push("/adminpage/pages/contact_enquiries")
                  }
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/earth.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "#0000ff73",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalContactInquires || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Contact Enquiries
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/adminpage/pages/admin_location")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/pin.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "yellow",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalLocation || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Locations
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </Box>
  );
}
