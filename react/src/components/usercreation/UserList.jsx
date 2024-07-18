import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, useTheme, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from '../../theme';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Header from '../../components/Header';
import Sidebar from '../../scenes/global/Sidebar';
import Topbar from '../../scenes/global/Topbar';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isSidebar, setIsSidebar] = useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3002/users');
            setUsers(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/users/${id}`);
            fetchUsers(); // Refresh the user list after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const columns = [
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'password', headerName: 'Password', flex: 1 },
        {
            field: 'isAdmin',
            headerName: 'Admin',
            flex: 1,
            renderCell: (params) => (params.value ? 'Yes' : 'No')
        },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteUser(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Box m="20px">
                    <Header title="User List" subtitle="Managing the Users" />
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
                                backgroundColor: colors.blueAccent[700],
                                borderBottom: "none",
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
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `${colors.grey[100]} !important`,
                            },
                        }}
                    >
                        <DataGrid
                            rows={users}
                            columns={columns}
                            getRowId={(row) => row._id}
                        />
                    </Box>
                </Box>
            </main>
        </div>
    );
};

export default UserList;