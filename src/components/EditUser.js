import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { testMe } from '../axios-services/users';
import { updateUser, getUserById } from '../axios-services/admin'
import { useNavigate } from 'react-router-dom';


const EditUser = ({ isLoggedIn, setIsLoggedIn, user, setUser, isAdmin, setIsAdmin }) => {

    const { userId } = useParams();
    const navigate = useNavigate();


    const [ userDetails, setUserDetails ] = useState({})

    useEffect(() => {
        console.log("userId: ", userId)
        testMe()
            .then(user => {
                setUser(user);
                if (!(user === {})) {
                    setIsLoggedIn(true);
                }
                if (user.isAdmin) {
                    setIsAdmin(true)
                }
                }).then(getUserById(userId)
                    .then(userDetails => {
                    setUserDetails(userDetails)
                    console.log("userdetails: ", userDetails)
                    }))

    }, [])

    return (
        <TableContainer
            component={Paper}
            hidden={!isAdmin}
        >
            <p>Edit User</p>
            <Button onClick={(evt)=> navigate("/admin/")}>
                Back to Dashboard
            </Button>
            <Table
                sx={{ minWidth: 900 }}
                aria-label="simple table"
            >
            <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>User Details</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>{userDetails.id}</TableCell>
                    <TableCell></TableCell>             
                </TableRow>
                <TableRow>
                    <TableCell>E-Mail</TableCell>
                    <TableCell>{userDetails.email}</TableCell>
                    <TableCell></TableCell>             
                </TableRow>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>{userDetails.first_name}</TableCell>
                    <TableCell></TableCell>             
                </TableRow>
                <TableRow>
                    <TableCell>Last Name</TableCell>
                    <TableCell>{userDetails.last_name}</TableCell>
                    <TableCell></TableCell>             
                </TableRow>
                <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>{userDetails.isAdmin ? 'Administrator' : 'User'}</TableCell>
                    <TableCell></TableCell>             
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
    )


}

export default EditUser;