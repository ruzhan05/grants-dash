// import React, { useState, useEffect } from 'react';
// import { Box, TextField, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import Sidebar from "../global/Sidebar";
// import Topbar from "../global/Topbar";
// import axios from 'axios';

// const GrantsGov = () => {
//     const [isSidebar, setIsSidebar] = useState(true);
//     const theme = useTheme();
//     const [searchQuery, setSearchQuery] = useState("");
//     const [data, setData] = useState([]);
//     const colors = tokens(theme.palette.mode);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3002/api/gggrants');
//                 setData(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const columns = [
//         { field: "OpportunityId", headerName: "Grant_ID", flex: 2 },
//         { field: "Title", headerName: "Title", flex: 1 },
//         { field: "Department", headerName: "Department", flex: 1 },
//         { field: "PostedDate", headerName: "Release Date", flex: 1 },
//         { field: "ClosingDate", headerName: "Expiry Date", flex: 1 },
//         {
//             field: "OpportunityLink",
//             headerName: "Application Link",
//             flex: 2,
//             renderCell: (params) => (
//                 <a href={params.value} target="_blank" rel="noopener noreferrer">
//                     {params.value}
//                 </a>
//             ),
//         },
//     ];

//     const handleSearch = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     const filteredData = data.filter((row) => {
//         return (
//             row.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.OpportunityId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.Department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.PostedDate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.ClosingDate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.OpportunityLink?.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     });

//     return (
//         <div className="app">
//             <Sidebar isSidebar={isSidebar} />
//             <main className="content">
//                 <Topbar setIsSidebar={setIsSidebar} />
//                 <Box m="20px">
//                     <Header title="Grants Offered" subtitle="By Grants Gov" />
//                     <Box m="20px 0">
//                         <TextField
//                             label="Search"
//                             variant="outlined"
//                             fullWidth
//                             value={searchQuery}
//                             onChange={handleSearch}
//                         />
//                     </Box>
//                     <Box
//                         m="40px 0 0 0"
//                         height="75vh"
//                         sx={{
//                             "& .MuiDataGrid-root": {
//                                 border: "none",
//                             },
//                             "& .MuiDataGrid-cell": {
//                                 borderBottom: "none",
//                             },
//                             "& .MuiDataGrid-columnHeaders": {
//                                 borderTop: "2px solid",
//                                 backgroundColor: colors.blueAccent[700],
//                                 borderBottom: "2px solid",
//                             },
//                             "& .MuiDataGrid-virtualScroller": {
//                                 backgroundColor: colors.primary[400],
//                             },
//                             "& .MuiDataGrid-footerContainer": {
//                                 borderTop: "none",
//                                 backgroundColor: colors.blueAccent[700],
//                             },
//                             "& .MuiCheckbox-root": {
//                                 color: `${colors.greenAccent[200]} !important`,
//                             },
//                         }}
//                     >
//                         <DataGrid rows={filteredData} columns={columns} getRowId={(row) => row._id} />
//                     </Box>
//                 </Box>
//             </main>
//         </div>
//     );
// };

// export default GrantsGov;





//kaj kortese but ultapalta...r manually id boshai korte hocche...token nai




// import React, { useState, useEffect } from 'react';
// import { Box, TextField, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import Sidebar from "../global/Sidebar";
// import Topbar from "../global/Topbar";
// import axios from 'axios';

// const GrantsGov = () => {
//     const [isSidebar, setIsSidebar] = useState(true);
//     const theme = useTheme();
//     const [searchQuery, setSearchQuery] = useState("");
//     const [data, setData] = useState([]);
//     const [starredGrants, setStarredGrants] = useState([]);
//     const userId = "6682563898e8d16602517db8"; // Replace with the actual user ID
//     const colors = tokens(theme.palette.mode);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const grantsResponse = await axios.get('http://localhost:3002/api/gggrants');
//                 setData(grantsResponse.data);
//                 //not working
//                 const userResponse = await axios.get(`http://localhost:3002/api/users/${userId}`);

//                 setStarredGrants(userResponse.data.starredGrants);
//                 //until this

//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [userId]);

//     const handleStarClick = async (grantId) => {
//         try {
//             const response = await axios.post('http://localhost:3002/api/user/star-grant', {
//                 userId,
//                 grantId
//             });
//             setStarredGrants(response.data.starredGrants);
//         } catch (error) {
//             console.error('Error updating starred grants:', error);
//         }
//     };

//     const columns = [
//         { field: "OpportunityId", headerName: "Grant_ID", flex: 2 },
//         { field: "Title", headerName: "Title", flex: 1 },
//         { field: "Department", headerName: "Department", flex: 1 },
//         { field: "PostedDate", headerName: "Release Date", flex: 1 },
//         { field: "ClosingDate", headerName: "Expiry Date", flex: 1 },
//         {
//             field: "OpportunityLink",
//             headerName: "Application Link",
//             flex: 2,
//             renderCell: (params) => (
//                 <a href={params.value} target="_blank" rel="noopener noreferrer">
//                     {params.value}
//                 </a>
//             ),
//         },
//         {
//             field: "Star",
//             headerName: "Star",
//             flex: 1,
//             renderCell: (params) => (
//                 <input
//                     type="checkbox"
//                     checked={starredGrants.includes(params.id)}
//                     onChange={() => handleStarClick(params.id)}
//                 />
//             ),
//         },
//     ];

//     const handleSearch = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     const filteredData = data.filter((row) => {
//         return (
//             row.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.OpportunityId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.Department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.PostedDate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.ClosingDate?.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     });

//     return (
//         <div className="app">
//             <Sidebar isSidebar={isSidebar} />
//             <main className="content">
//                 <Topbar setIsSidebar={setIsSidebar} />
//                 <Box m="20px">
//                     <Header title="Grants Offered" subtitle="By Grants Gov" />
//                     <Box m="20px 0">
//                         <TextField
//                             label="Search"
//                             variant="outlined"
//                             fullWidth
//                             value={searchQuery}
//                             onChange={handleSearch}
//                         />
//                     </Box>
//                     <Box
//                         m="40px 0 0 0"
//                         height="75vh"
//                         sx={{
//                             "& .MuiDataGrid-root": {
//                                 border: "none",
//                             },
//                             "& .MuiDataGrid-cell": {
//                                 borderBottom: "none",
//                             },
//                             "& .MuiDataGrid-columnHeaders": {
//                                 borderTop: "2px solid",
//                                 backgroundColor: colors.blueAccent[700],
//                                 borderBottom: "2px solid",
//                             },
//                             "& .MuiDataGrid-virtualScroller": {
//                                 backgroundColor: colors.primary[400],
//                             },
//                             "& .MuiDataGrid-footerContainer": {
//                                 borderTop: "none",
//                                 backgroundColor: colors.blueAccent[700],
//                             },
//                             "& .MuiCheckbox-root": {
//                                 color: `${colors.greenAccent[200]} !important`,
//                             },
//                         }}
//                     >
//                         <DataGrid rows={filteredData} columns={columns} getRowId={(row) => row._id} />
//                     </Box>
//                 </Box>
//             </main>
//         </div>
//     );
// };

// export default GrantsGov;



import React, { useState, useEffect } from 'react';
import { Box, TextField, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import axios from 'axios';

const GrantsGov = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("Title");
    const [data, setData] = useState([]);
    const [starredGrants, setStarredGrants] = useState([]);
    const userId = "6682563898e8d16602517db8"; // Replace with the actual user ID
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const grantsResponse = await axios.get('http://localhost:3002/api/gggrants');
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
        { field: "OpportunityId", headerName: "Grant_ID", flex: 2 },
        { field: "Title", headerName: "Title", flex: 1 },
        { field: "Department", headerName: "Department", flex: 1 },
        { field: "PostedDate", headerName: "Release Date", flex: 1 },
        { field: "ClosingDate", headerName: "Expiry Date", flex: 1 },
        {
            field: "OpportunityLink",
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
                    <Header title="Grants Offered" subtitle="By Grants Gov" />
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
                        <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("Title")}>Search by Title</Button>
                        <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("OpportunityId")}>Search by Grant ID</Button>
                        <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("Department")}>Search by Department</Button>
                        <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("PostedDate")}>Search by Release Date</Button>
                        <Button sx={{ backgroundColor: '#fac60a', margin: '20px', color: 'black' }} onClick={() => handleFilterTypeChange("ClosingDate")}>Search by Expiry Date</Button>
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

export default GrantsGov;
