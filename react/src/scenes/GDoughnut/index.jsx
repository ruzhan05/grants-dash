import { Box } from "@mui/material";
import Header from "../../components/Header";
import GDoughnutChart from "../../components/GDoughnut";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useState } from "react";
const GDoughnut = () => {
    const [isSidebar, setIsSidebar] = useState(true)

    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Box m="20px">
                    <Header title="Doughnut" subtitle="From Grants Gov" />
                    <Box height="75vh">
                        <GDoughnutChart width="40%" height="40%" />
                    </Box>
                </Box>
            </main>
        </div>
    );
};

export default GDoughnut;
