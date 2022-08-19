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


const UserAccount = ({ isLoggedIn, setIsLoggedIn, user, setUser, isAdmin, setIsAdmin }) => {





    

    return (
        <TableContainer
            component={Paper}
            hidden={!isAdmin}
        >

        </TableContainer>
    )

}

export default UserAccount;