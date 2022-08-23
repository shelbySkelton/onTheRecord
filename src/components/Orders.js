import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState, useEffect } from 'react';
import { getProductById } from '../axios-services/products';
import { useParams } from 'react-router-dom';
import { testMe } from '../axios-services/users';
import {
    getUsersOrders,
    updateOrderStatus
} from '../axios-services/admin';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Orders = ({ setIsLoggedIn, isLoggedIn, setUser, isAdmin, setIsAdmin }) => {

    const { userId } = useParams();
    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState('')

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
            })
            .then(getUsersOrders(userId)
                .then(orders => {
                    setOrders(orders)
                }))

    }, [])





    return (
        <div>
            {!isAdmin ? "You must be an Administrator to view this page" :

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {
                                        orders == [] ? `User ${userId} Orders` : `User ${userId} Has Not Placed Any Orders Yet`
                                    }
                                    
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            orders.map((order, idx) => {
                                let orderTotal = 0;
                                return (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Order #{order.id}</TableCell>
                                            <TableCell>Status: {order.order_status}</TableCell>
                                            <TableCell>
                                                <Select
                                                    defaultValue={order.order_status}
                                                    onChange={(event) => setStatus(event.target.value)}
                                                >
                                                    <MenuItem value="pending">Pending</MenuItem>
                                                    <MenuItem value="shipped">Shipped</MenuItem>
                                                    <MenuItem value="canceled">Canceled</MenuItem>
                                                    <MenuItem value="lost at sea">Lost At Sea</MenuItem>
                                                </Select>
                                                <Button
                                                    onClick={(evt) => {
                                                        updateOrderStatus(order.id, status);
                                                        getUsersOrders(userId)
                                                            .then(orders => {
                                                                setOrders(orders)
                                                            })
                                                    }}
                                                >Update</Button>
                                            </TableCell>
                                        </TableRow>

                                        {
                                            order.items.map((item, idx) => {
                                                orderTotal += item.priceAtPurchase
                                                return (
                                                    <TableRow key={idx}>
                                                        <TableCell>{item.id}</TableCell>
                                                        <TableCell>${item.priceAtPurchase}</TableCell>
                                                        <TableCell>{item.product_name}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                        <TableRow>
                                            <TableCell>Total: ${orderTotal.toFixed(2)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                )
                            })
                        }
                    </Table>
                </TableContainer>

            }


        </div>
    )



}

export default Orders;