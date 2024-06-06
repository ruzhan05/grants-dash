// default 


// import logo from './logo.svg';
// import './App.css';

// import React from 'react';
// import axios from 'axios';
// import Bar from '../src/scenes/bar';
// import PieChart from './components/PieChart';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />

//         <p>
//           <PieChart />
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


//web scrapping with button

// function App() {
//   const handleScrapeButtonClick = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/scrape');
//       console.log(response.data);
//       alert('Scraping completed successfully!');
//     } catch (error) {
//       console.error('Error occurred during scraping:', error);
//       alert('Error occurred during scraping. Check the console for more details.');
//     }
//   };

//   return (
//     <div>
//       <h1>Grants Scraper</h1>
//       <button onClick={handleScrapeButtonClick}>Start Scraping</button>
//     </div>
//   );
// }

// export default App;




import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";

import Bar from "./scenes/bar";

import Pie from "./scenes/pie";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";


function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/team" element={<Team />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
