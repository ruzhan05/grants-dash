import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/NIH.jsx";
import GrantsGovDashboard from "./scenes/dashboard/GrantGov.jsx";

import NihList from "./scenes/nihList";
import GrantsGov from "./scenes/grantsGov";
import Bar from "./scenes/bar";
import Line from "./scenes/line"
import Pie from "./scenes/pie";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Scrapper from "./components/Scrapper.jsx";

import GBar from "./scenes/GBar/index.jsx";
import GDoughnut from "./scenes/GDoughnut";
import GPie from "./scenes/gpie"
import GLine from "./scenes/Gline";
import UserList from "./components/usercreation/UserList.jsx";

function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      {/* // <ColorModeContext.Provider value={colorMode}> */}
      {/* // <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <div className="app">
        {/* <Sidebar isSidebar={isSidebar} /> */}
        <main className="content">
          {/* <Topbar setIsSidebar={setIsSidebar} /> */}
          <Routes>
            <Route path="/" element={<GrantsGovDashboard />} />
            <Route path="/2" element={< Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UserList />} />

            <Route path="/nihlist" element={<NihList />} />
            <Route path="/grantsgovlist" element={<GrantsGov />} />

            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/scrapper" element={<Scrapper />} />
            <Route path="/gbar" element={<GBar />} />
            <Route path="/doughnut" element={<GDoughnut />} />
            <Route path="/Gpie" element={<GPie />} />
            <Route path="/Gline" element={<GLine />} />

          </Routes>
        </main>
      </div>
    </>
    // </ThemeProvider> */}
    // </ColorModeContext.Provider> */}
  );
}

export default App;
