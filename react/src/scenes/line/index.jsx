import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChartExpChart from "../../components/BarChartExpChart";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Line = () => {
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
                    <Header title="Line Chart" subtitle="Line Chart NIH" />
                    <Box height="75vh">
                        <LineChartExpChart />
                    </Box>
                </Box>
            </main>
        </div>
    );
};

export default Line;
