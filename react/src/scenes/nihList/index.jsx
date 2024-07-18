// import React, { useState, useEffect } from 'react';
// import { Box, TextField, Checkbox, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import Sidebar from "../global/Sidebar";
// import Topbar from "../global/Topbar";
// import axios from 'axios';

// const NihList = ({ userId }) => {
//   const [isSidebar, setIsSidebar] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [rows, setRows] = useState([]);
//   const [starredGrants, setStarredGrants] = useState([]);
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   useEffect(() => {
//     // Fetch the grants and user's starred grants
//     const fetchData = async () => {
//       try {
//         const grantsResponse = await axios.get('http://localhost:3002/nihlist');
//         // const userResponse = await axios.get(`http://localhost:3002/api/users/${userId}`);
//         setRows(grantsResponse.data);
//         // setStarredGrants(userResponse.data.starredGrants);
//       } catch (error) {
//         console.error('Error fetching data', error);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const columns = [
//     {
//       field: "starred",
//       headerName: "Star",
//       flex: 0.5,
//       renderCell: (params) => (
//         <Checkbox
//           checked={starredGrants.includes(params.row._id)}
//           onChange={() => handleStarToggle(params.row._id)}
//         />
//       ),
//     },
//     { field: "title", headerName: "Title", flex: 2 },
//     { field: "releaseDate", headerName: "Release Date", flex: 1 },
//     { field: "organization", headerName: "Organization", flex: 1 },
//     { field: "expiryDate", headerName: "Expiry Date", flex: 1 },
//     { field: "docnum", headerName: "Document Number", flex: 1 },
//     {
//       field: "link",
//       headerName: "URL",
//       flex: 2,
//       renderCell: (params) => (
//         <a href={params.value} target="_blank" rel="noopener noreferrer">
//           {params.value}
//         </a>
//       ),
//     },
//   ];

//   const handleStarToggle = async (grantId) => {
//     try {
//       const response = await axios.post('http://localhost:3002/api/star', {
//         userId,
//         grantId,
//       });
//       setStarredGrants(response.data.starredGrants);
//     } catch (error) {
//       console.error('Error starring/un-starring grant', error);
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredData = rows.filter((row) => {
//     return (
//       row.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.releaseDate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.expiryDate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.docnum?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.link?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   return (
//     <div className="app">
//       <Sidebar isSidebar={isSidebar} />
//       <main className="content">
//         <Topbar setIsSidebar={setIsSidebar} />
//         <Box m="20px">
//           <Header title="Grants Offered" subtitle="By NIH" />
//           <Box m="20px 0">
//             <TextField
//               label="Search"
//               variant="outlined"
//               fullWidth
//               value={searchQuery}
//               onChange={handleSearch}
//             />
//           </Box>
//           <Box
//             m="40px 0 0 0"
//             height="75vh"
//             sx={{
//               "& .MuiDataGrid-root": {
//                 border: "none",
//               },
//               "& .MuiDataGrid-cell": {
//                 borderBottom: "none",
//               },
//               "& .MuiDataGrid-columnHeaders": {
//                 borderTop: "2px solid",
//                 backgroundColor: colors.blueAccent[700],
//                 borderBottom: "2px solid",
//               },
//               "& .MuiDataGrid-virtualScroller": {
//                 backgroundColor: colors.primary[400],
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 borderTop: "none",
//                 backgroundColor: colors.blueAccent[700],
//               },
//               "& .MuiCheckbox-root": {
//                 color: `${colors.greenAccent[200]} !important`,
//               },
//             }}
//           >
//             <DataGrid
//               rows={filteredData}
//               columns={columns}
//               getRowId={(row) => row._id}
//             />
//           </Box>
//         </Box>
//       </main>
//     </div>
//   );
// };

// export default NihList;













import React, { useState, useEffect } from 'react';
import { Box, TextField, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import axios from 'axios';

const NihList = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("title");
  const [data, setData] = useState([]);
  const [starredGrants, setStarredGrants] = useState([]);
  const userId = "6682563898e8d16602517db8"; // Replace with the actual user ID
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grantsResponse = await axios.get('http://localhost:3002/api/grants');
        setData(grantsResponse.data);

        const userResponse = await axios.get(`http://localhost:3002/api/users/${userId}`);
        setStarredGrants(userResponse.data.starredGrants);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleStarClick = async (grantId) => {
    try {
      const response = await axios.post('http://localhost:3002/api/user/star-grant', {
        userId,
        grantId
      });
      setStarredGrants(response.data.starredGrants);
    } catch (error) {
      console.error('Error updating starred grants:', error);
    }
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 2 },
    { field: "releaseDate", headerName: "Release Date", flex: 1 },
    { field: "organization", headerName: "Organization", flex: 1 },
    { field: "expiryDate", headerName: "Expiry Date", flex: 1 },
    { field: "docnum", headerName: "Document Number", flex: 1 },
    {
      field: "link",
      headerName: "Application Link",
      flex: 2,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: "Star",
      headerName: "Star",
      flex: 1,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={starredGrants.includes(params.id)}
          onChange={() => handleStarClick(params.id)}
        />
      ),
    },
  ];

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
  };

  const filteredData = data.filter((row) => {
    return row[filterType]?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header title="Grants Offered" subtitle="By NIH" />
          <Box m="20px 0">
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearch}
            />
          </Box>
          <Box m="20px 0">
            <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("title")}>Search by Title</Button>
            <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("docnum")}>Search by Grant ID</Button>
            <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("organization")}>Search by Department</Button>
            <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("releaseDate")}>Search by Release Date</Button>
            <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("expiryDate")}>Search by Expiry Date</Button>
          </Box>
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderTop: "2px solid",
                backgroundColor: colors.blueAccent[700],
                borderBottom: "2px solid",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid rows={filteredData} columns={columns} getRowId={(row) => row._id} />
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default NihList;
