import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState, useEffect } from 'react';
import { getProductById } from '../axios-services/products';
import { useParams } from 'react-router-dom';
import { testMe } from '../axios-services/users';
import { patchProduct, 
    // removeProduct 
} from '../axios-services/admin';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const EditProduct = ({ setIsLoggedIn, isLoggedIn, setUser, isAdmin, setIsAdmin }) => {
    //THERE HAS TO BE A BETTER WAY TO WRITE THIS I'M SORRY!!!!!

    const navigate = useNavigate();

    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState({})
    const [name, setName] = useState("")
    const [editName, setEditName] = useState(false)
    const [price, setPrice] = useState("")
    const [editPrice, setEditPrice] = useState(false)
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [editQuantity, setEditQuantity] = useState(false)
    const [img_url, setImg_Url] = useState("")
    const [editImg_Url, setEditImg_Url] = useState(false)
    const [condition, setCondition] = useState("")
    const [album_name, setAlbum_Name] = useState("")
    const [editAlbum_Name, setEditAlbum_Name] = useState(false)
    const [artist, setArtist] = useState("")
    const [editArtist, setEditArtist] = useState(false)
    const [description, setDescription] = useState("")
    const [editDescription, setEditDescription] = useState(false)
    const [genre, setGenre] = useState("")
    const [editGenre, setEditGenre] = useState(false)
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
            .then(getProductById(productId)
                .then(productDetails => {
                    setProductDetails(productDetails)
                }))

    }, [])


    const submitEdits = async (evt) => {
        const updatedProduct = await patchProduct(
            productId,
            name,
            price,
            category,
            quantity,
            img_url,
            condition,
            album_name,
            artist,
            description,
            genre,
            status)
        if (updatedProduct) {
            console.log("UpdatedProduct!!!: ", updatedProduct)
        await (getProductById(productId)
            .then(productDetails => {
                setProductDetails(productDetails)
            }))
        }
    }
    const deleteProduct = async (evt) => {
        const deletedProduct = await removeProduct(productId);
        if (deletedProduct) {
            console.log("product deleted!", deleteProduct)
        }
    }



    return (
        <TableContainer
            component={Paper}
            hidden={isAdmin ? false : true}>
            <p>Edit Product</p> 
            <Table
                sx={{ minWidth: 900 }}
                aria-label="simple table"
                className="admin-product-container">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name<EditIcon fontSize="small" onClick={(evt) => setEditName(!editName)} />
                        </TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Img</TableCell>
                        <TableCell>Condition</TableCell>
                        <TableCell>Album</TableCell>
                        <TableCell>Artist</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="admin-product-details">
                    <TableRow>
                        <TableCell>{productDetails.id}</TableCell>
                        <TableCell>
                            {productDetails.name}
                            <input
                                type="text"
                                hidden={!editName}
                                placeholder={productDetails.name}
                                onChange={(evt) => setName(evt.target.value)}>
                            </input>
                        </TableCell>
                        <TableCell>
                            ${productDetails.price}
                            <EditIcon fontSize="small" onClick={(evt) => setEditPrice(!editPrice)} />
                            <input
                                type="text"
                                hidden={!editPrice}
                                placeholder={productDetails.price}
                                onChange={(evt) => setPrice(evt.target.value)}>
                            </input>
                        </TableCell>
                        <TableCell>
                            <label>{productDetails.category}</label>
                            <br></br>
                            <select name="Category">
                                onChange={(evt) => setCategory(evt.target.value)}
                                <option value="Record">Record</option>
                                <option value="Accessory">Accessory</option>
                            </select>
                        </TableCell>
                        <TableCell>
                            {productDetails.quantity}
                            <EditIcon fontSize="small" onClick={(evt) => setEditQuantity(!editQuantity)} />
                            <input
                                type="text"
                                hidden={!editQuantity}
                                placeholder={productDetails.quantity}
                                onChange={(evt) => setQuantity(evt.target.value)}>
                            </input></TableCell>
                        <TableCell><img src={productDetails.img_url} alt="album-cover" width="80" height="80"></img>
                            <br></br><EditIcon fontSize="small" onClick={(evt) => setEditImg_Url(!editImg_Url)} />
                            <input
                                type="text"
                                hidden={!editImg_Url}
                                placeholder={productDetails.img_url}
                                onChange={(evt) => setImg_Url(evt.target.value)}>
                            </input>
                        </TableCell>
                        <TableCell>
                            <label>{productDetails.condition}</label>
                            <br></br>
                            <select name="Condition">
                                onChange={(evt) => setCondition(evt.target.value)}
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                        </TableCell>
                        <TableCell>
                            {productDetails.album_name}
                            <EditIcon fontSize="small" onClick={(evt) => setEditAlbum_Name(!editAlbum_Name)} />
                            <input
                                type="text"
                                hidden={!editAlbum_Name}
                                placeholder={productDetails.album_name}
                                onChange={(evt) => setAlbum_Name(evt.target.value)}>
                            </input>
                        </TableCell>
                        <TableCell>
                            {productDetails.artist}
                            <EditIcon fontSize="small" onClick={(evt) => setEditArtist(!editArtist)} />
                            <input
                                type="text"
                                hidden={!editArtist}
                                placeholder={productDetails.artist}
                                onChange={(evt) => setArtist(evt.target.value)}>
                            </input>
                        </TableCell>
                        <TableCell>
                            {productDetails.description}
                            <EditIcon fontSize="small" onClick={(evt) => setEditDescription(!editDescription)} />
                            <input
                                type="text"
                                hidden={!editDescription}
                                placeholder={productDetails.description}
                                onChange={(evt) => setDescription(evt.target.value)}>
                            </input>
                        </TableCell>
                        <TableCell>
                            {productDetails.genre}
                            <EditIcon fontSize="small" onClick={(evt) => setEditGenre(!editGenre)} />
                            <input
                                type="text"
                                hidden={!editGenre}
                                placeholder={productDetails.genre}
                                onChange={(evt) => setGenre(evt.target.value)}>
                            </input>
                        </TableCell>
                        <TableCell>
                            {productDetails.status}
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <button
                onClick={submitEdits}>Submit Changes</button>
            <button
                onClick={deleteProduct}>Deactivate Product</button>
        </TableContainer>
    )



}

export default EditProduct;