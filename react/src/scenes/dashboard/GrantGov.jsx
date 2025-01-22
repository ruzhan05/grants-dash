import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import GDoughnutChart from "../../components/GDoughnut"
import GPieChart from "../../components/GPieChart"
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useState } from "react";
import PieChart from "../../components/PieChart";
import BarChartExpChart from "../../components/BarChartExpChart";
import GGBarChart from "../../components/GBarchart"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GGGrantsCount from "../../components/GGcount"
import GLineChart from "../../components/GLinechart";
const GrantsGovDashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isSidebar, setIsSidebar] = useState(true)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleButtonClickNIH = () => {
    navigate('/2');   // navigates to NIH Dashboard
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
            <Header title="DASHBOARD" subtitle="Welcome to Grants Gov dashboard" />

            <Box>
              <Button
                onClick={handleButtonClickNIH}
                sx={{
                  backgroundColor: "#fac60a",
                  border: '1px solid #fac60a',
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  '&:hover': {
                    backgroundColor: "darkmaroon",
                  },
                }}
              >
                NIH Dashboard
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
            

            {/* ROW 1 */}
            <Box
              gridColumn="span 6"
              gridRow="span 5"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >


              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <GPieChart />
              </Box>
            </Box>
            

            {/* ROW 2 */}
            <Box
              gridColumn="span 6"
              gridRow="span 5"
              backgroundColor={colors.primary[400]}
              p="30px"
            >

              <GDoughnutChart />

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
              </Typography>
              <Box height="250px" mt="-20px">
                {/* <BarChart isDashboard={true} /> */}

                < GGBarChart />
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
              </Typography>
              <Box height="250px" mt="-20px">
               
                <GLineChart />
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
                Grants from Grants Gov:

                <Typography color={colors.greenAccent[500]}>

                  <GGGrantsCount />
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </main>
    </div>

  );
};

export default GrantsGovDashboard;
