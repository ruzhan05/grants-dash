import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import img1 from '../../images/utm8941.jpg'
import { jwtDecode } from "jwt-decode"

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: 'white',
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState('');
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.name);
      setAdmin(decodedToken.isAdmin);
    }
  }, [token]);

  return (
    <Box

      sx={{
        height: '160vh',
        //custom height of sidebar
        "& .pro-sidebar-inner": {
          background: `maroon !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 2px !important",

        },
        "& .pro-inner-item:hover": {
          color: "#fac60a !important",

        },
        "& .pro-menu-item.active": {
          color: "#fac60a !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>

                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../data/utm8941.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
                {/* <Logo className={{ width: "100px", height: "100px" }}></Logo> */}
                <img src={img1} alt="" height={70} />
              </Box>
              <Box textAlign="center">
                {/* <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                
                </Typography> */}
                <Typography variant="h5" color={colors.grey}>
                  {username}
                </Typography>
              </Box>
            </Box>
          )}
          <Box>
            {admin && (
              <>
                <Typography
                  variant="h6"
                  color='whitesmoke'
                  sx={{ m: "15px 0 5px 20px", textDecoration: 'underline #fac60a 5px solid', fontWeight: "bold" }}
                >
                  Admin
                </Typography>
                <Item
                  title="Create User"
                  to="/register"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="View User"
                  to="/users"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Scrape Data"
                  to="/scrapper"
                  icon={<ArrowCircleDownIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}


            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item

                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />



              <Typography
                variant="h6"
                color='whitesmoke'
                sx={{ m: "15px 0 5px 20px", textDecoration: 'underline #fac60a 5px solid', fontWeight: "bold" }}
              >
                Grants List
              </Typography>
              <Item
                title="NIH"
                to="/nihlist"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Grants Gov"
                to="/grantsgovlist"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />


              <Typography
                variant="h6"
                color='whitesmoke'
                sx={{ m: "15px 0 5px 20px", textDecoration: 'underline #fac60a 5px solid', fontWeight: "bold" }}
              >
                Grants Gov
              </Typography>
              <Item
                title="Bar Chart"
                to="/gbar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Doughnut Chart"
                to="/doughnut"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Pie Chart"
                to="/Gpie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Line Chart Grant Gov"
                to="/Gline"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color='whitesmoke'
                sx={{ m: "15px 0 5px 20px", textDecoration: 'underline #fac60a 5px solid', fontWeight: "bold" }}
              >
                NIH
              </Typography>
              <Item
                title="Bar Chart NIH"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Line Chart"
                to="/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              {/* <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            </Box>
          </Box>

        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
