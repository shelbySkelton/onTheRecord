import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { testMe } from '../axios-services/users';
import { getAdminProducts, getAllUsers 
//    removeProduct 
} from '../axios-services/admin'
import { useNavigate } from 'react-router-dom';




const Admin = ({ setIsLoggedIn, isLoggedIn, setUser, user, isAdmin, setIsAdmin }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [allUsers, setallUsers] = useState([])
    const [productsView, setProductsView] = useState(false);
    const [usersView, setUsersView] = useState(false);
    const [viewDescription, setViewDescription] = useState(false)

    const navigate = useNavigate();


    useEffect(() => {
        testMe()
            .then(user => {

                console.log("user: ", user)
                setUser(user);
                if (!(user === {})) {
                    setIsLoggedIn(true);
                }
                if (user.isAdmin) {
                    setIsAdmin(true)
                }
            })
    }, [])

    const showProducts = async (event) => {
        const products = await getAdminProducts();
        console.log("products: ", products);
        setAllProducts(products)
        setUsersView(false);
        setProductsView(true)
    }

    const showUsers = async (event) => {
        const users = await getAllUsers();
        console.log("users: ", users)
        setallUsers(users)
        setProductsView(false)
        setUsersView(true);
    }



    return (
        <div>
            <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}` : `You are not logged in`}</p>
            <p>{(isAdmin) ? `Welcome to the Admin Dashboard` : `Only Website Administrators should have access to this page`}</p>
            <div hidden={isAdmin ? false : true}>
                <button className='admin-view-button'
                    onClick={(showProducts)}>
                    View Products
                </button>
                <button className='admin-view-button'
                    onClick={showUsers} >
                    View Users
                </button>
{/* ***************** USERS VIEW *****************    */}

                <TableContainer component={Paper}
                    hidden={!usersView}>
                        <Table sx={{ minWidth: 900 }} aria-label="simple table" className='admin-product-container'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User ID</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Admin Status</TableCell>
                                    <TableCell>Orders</TableCell>
                                    <TableCell>Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                allUsers.map((user, idx) => {
                                    return(
                                       <TableBody>
                                        <TableRow key={idx}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.first_name}</TableCell>
                                            <TableCell>{user.last_name}</TableCell>
                                            <TableCell>{user.isAdmin ? 'Administrator' : 'User'}</TableCell>
                                            <TableCell>Input Link For Orders</TableCell>
                                            <TableCell><Link to={`/admin/edit-user/${user.id}`}><EditIcon /></Link></TableCell>
                                        </TableRow>

                                       </TableBody> 
                                    )
                                })
                            }
                        </Table>

                </TableContainer>
{/* ***************** PRODUCTS VIEW *****************    */}
                <TableContainer component={Paper}
                    hidden={!productsView}>
                    <button className='admin-view-button'
                        onClick={(evt) => navigate("/admin/add-product")}>
                        Add Product
                    </button>
                    <Table sx={{ minWidth: 900 }} aria-label="simple table" className='admin-product-container'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Img</TableCell>
                                <TableCell>Condition</TableCell>
                                <TableCell>Album</TableCell>
                                <TableCell>Artist</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell>View/Edit</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        {
                            allProducts.map((product, idx) => {
                                return (
                                    <TableBody key={idx}>
                                        <TableRow>
                                            <TableCell>{product.id}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>${product.price}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell><img src={product.img_url} alt="album-cover" width="80" height="80"></img></TableCell>
                                            <TableCell>{product.condition}</TableCell>
                                            <TableCell>{product.album_name}</TableCell>
                                            <TableCell>{product.artist}</TableCell>
                                            <TableCell>
                                                <TextSnippetIcon
                                                    onClick={(evt) => setViewDescription(!viewDescription)} />
                                                <p hidden={!viewDescription}>{product.description}</p></TableCell>
                                            <TableCell>{product.genre}</TableCell>
                                            <TableCell><Link to={`/admin/edit-product/${product.id}`}><EditIcon /></Link></TableCell>
                                            <TableCell>{product.status}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                )
                            })
                        }


                    </Table>
                </TableContainer>
            </div>



        </div>
    )
}

export default Admin;