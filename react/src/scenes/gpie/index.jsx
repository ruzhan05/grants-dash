import { Box } from "@mui/material";
import Header from "../../components/Header";
import GPieChart from "../../components/GPieChart";
import { useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
const GPie = () => {
    const [isSidebar, setIsSidebar] = useState(true)
    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Box m="20px" >
                    <Header title="Pie Chart" subtitle="From Grants Gov" />
                    <Box height="75vh">
                        <GPieChart width="40%" height="40%" />
                    </Box>
                </Box>
            </main>
        </div>
    );
};

export default GPie;
