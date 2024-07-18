import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar"
const Pie = () => {
  const [isSidebar, setIsSidebar] = useState(true)
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px" >
          <Header title="Pie Chart" subtitle="From NIH Grants" />
          <Box height="75vh">
            <PieChart width="40%" height="40%" />
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Pie;
