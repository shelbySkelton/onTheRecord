import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { testMe } from '../axios-services/users';
import { updateUser, getUserById, updateUserStatus } from '../axios-services/admin'
import { useNavigate } from 'react-router-dom';


const EditUser = ({ isLoggedIn, setIsLoggedIn, user, setUser, isAdmin, setIsAdmin }) => {

    const { userId } = useParams();
    const navigate = useNavigate();


    const [userDetails, setUserDetails] = useState({})
    const [adminRights, setAdminRights] = useState(false)

    useEffect(() => {
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
                }))

    }, [])

    return (
        <div id="edit-user-dash">
        <TableContainer
            component={Paper}
            hidden={!isAdmin}
        >
            <Button onClick={(evt) => navigate("/admin/")}>
                Back to Dashboard
            </Button>
            <Table
                sx={{ maxWidth: 900 }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>User Details</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>{userDetails.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>E-Mail</TableCell>
                        <TableCell>{userDetails.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>{userDetails.first_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Last Name</TableCell>
                        <TableCell>{userDetails.last_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{userDetails.isAdmin ? 'Administrator' : 'User'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Update Status <br></br>
                            <Select
                                id='update-status-select'
                                defaultValue={userDetails.isAdmin ? 'Administrator' : 'User'}
                                onChange={(evt) => setAdminRights(evt.target.value)}
                            >
                                <MenuItem value='true'>Administrator</MenuItem>
                                <MenuItem value='false'>User</MenuItem>
                            </Select>
                        </TableCell>
                        <TableCell>
                            <Button
                                id='update-user-button'
                                variant='contained'
                                onClick={(evt) => {
                                    updateUserStatus(userId, adminRights)
                                    getUserById(userId)
                                        .then(userDetails => {
                                            setUserDetails(userDetails)
                                        })
                                }}
                            >
                                Update Account Type
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )


}

export default EditUser;