import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useState } from "react";
import PieChart from "../../components/PieChart";
import BarChartExpChart from "../../components/BarChartExpChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GrantsCount from "../../components/NihCount"
const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isSidebar, setIsSidebar] = useState(true)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleButtonClickGG = () => {
    navigate('/');   // navigates to Grants Gov Dashboard
  };

  // used to autenticate if the user is logged in
  useEffect(() => {
    if (!token) {

      navigate("/login");
      alert("You need to login first")
    }
  }, [token, navigate]);

  return (

    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />

        <Box m="20px">

          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to NIH dashboard" />

            <Box>
              <Button
                onClick={handleButtonClickGG}
                sx={{
                  backgroundColor: "#fac60a",
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  '&:hover': {
                    backgroundColor: "darkmaroon",
                  },
                }}
              >
                Grants Gov Dashboard
              </Button>
            </Box>
          </Box>

          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >

            <Box
              gridColumn="span 6"
              gridRow="span 5"
              backgroundColor={colors.primary[400]}
              p="30px"
            >

              <PieChart />

            </Box>
            <Box
              gridColumn="span 6"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Grants Starting Time
              </Typography>
              <Box height="250px" mt="-20px" padding={'30px'}>
                {/* <BarChart isDashboard={true} /> */}
                <BarChart />
              </Box>
            </Box>
            <Box
              gridColumn="span 6"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Grant Deadlines
              </Typography>
              <Box height="250px" mt="-20px">
                {/* <BarChart isDashboard={true} /> */}
                <BarChartExpChart />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
            >
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ padding: "25px 25px 0 25px" }}
              >
                Grants from NIH:

                <Typography color={colors.greenAccent[500]}>

                  <GrantsCount />
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </main>
    </div>

  );
};

export default Dashboard;
