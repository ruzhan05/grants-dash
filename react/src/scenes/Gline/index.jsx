import { Box } from "@mui/material";
import Header from "../../components/Header";
import GLineChart from "../../components/GLinechart";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const GLine = () => {
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
                    <Header title="Line Chart" subtitle="From Grants Gov" />
                    <Box height="75vh">
                        <GLineChart />
                    </Box>
                </Box>
            </main>
        </div>
    );
};

export default GLine;
