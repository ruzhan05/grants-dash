import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Bar = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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
          <Header title="Bar Chart" subtitle="Bar Chart NIH" />
          <Box height="75vh">
            <BarChart />
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Bar;
