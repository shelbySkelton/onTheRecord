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
import { getMyAccount, updateAccount, viewOrders } from '../axios-services/users'
import { Link } from 'react-router-dom';
import { maxWidth } from '@mui/system';


const UserAccount = ({ isLoggedIn, setIsLoggedIn, user, setUser, isAdmin, setIsAdmin, guestCart, setGuestCart }) => {

    const [myInfo, setMyInfo] = useState([])
    const [updates, setUpdates] = useState({
        email: myInfo.email,
        first_name: myInfo.first_name,
        last_name: myInfo.last_name
    })
    const [enableEdits, setEnableEdits] = useState({
        email: false,
        first_name: false,
        last_name: false
    })
    const [orders, setOrders] = useState([])
    let orderTotal = 0;

    useEffect(() => {

        getMyAccount(user.id)
            .then(myInfo => {
                setMyInfo(myInfo)
            })

    }, [])


    const submitEdits = async (evt) => {
        const { email, first_name, last_name } = updates;
        const updatedUser = await updateAccount(user.id, email, first_name, last_name)
        setMyInfo(updatedUser);
    }

    const ordersHandler = async (evt) => {
        const myOrders = await viewOrders(user.id)
        setOrders(myOrders)
    }



    return (

        <TableContainer
            component={Paper}
            id="user-dash"
        >
            <Table
                sx={{ minWidth: 900 }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>My Details</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>E-Mail</TableCell>
                        <TableCell>{myInfo.email}</TableCell>
                        <TableCell>
                            <EditIcon
                                onClick={(evt) => setEnableEdits({
                                    ...enableEdits, email: true
                                })
                                } /><br></br>
                            <input
                                type="text"
                                hidden={!enableEdits.email}
                                onChange={(evt) => setUpdates({
                                    ...updates, email: evt.target.value
                                })}
                            ></input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>{myInfo.first_name}</TableCell>
                        <TableCell>
                            <EditIcon
                                onClick={(evt) => setEnableEdits({
                                    ...enableEdits, first_name: true
                                })
                                } /><br></br>
                            <input
                                type="text"
                                hidden={!enableEdits.first_name}
                                onChange={(evt) => setUpdates({
                                    ...updates, first_name: evt.target.value
                                })}
                            ></input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Last Name</TableCell>
                        <TableCell>{myInfo.last_name}</TableCell>
                        <TableCell>
                            <EditIcon
                                onClick={(evt) => setEnableEdits({
                                    ...enableEdits, last_name: true
                                })
                                } /><br></br>
                            <input
                                type="text"
                                hidden={!enableEdits.last_name}
                                onChange={(evt) => setUpdates({
                                    ...updates, last_name: evt.target.value
                                })}
                            ></input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{myInfo.isAdmin ? 'Administrator' : 'Registered'}</TableCell>
                        <TableCell>
                            <Button
                                variant='contained'
                                sx={{ maxWidth: 50 }}
                                onClick={submitEdits}>Submit
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Button
                onClick={ordersHandler}
            >
                View Orders
            </Button>

            {orders.map((order, idx) => {
                return (
                    <Table>
                        <TableHead key={idx}>
                            <TableRow>
                                <TableCell>Order #{order.id}</TableCell>
                                <TableCell>Status: {order.order_status}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                order.items.map((item, idx) => {
                                    orderTotal += item.priceAtPurchase
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell>${item.priceAtPurchase}</TableCell>
                                            <TableCell>{item.product_name}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                            <TableRow>
                                <TableCell>Total: ${orderTotal.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                )
            })
            }


        </TableContainer>
    )

}

export default UserAccount;