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
    patchProduct,
    deactivateProduct
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
    const [editCategory, setEditCategory] = useState(false)
    const [quantity, setQuantity] = useState("")
    const [editQuantity, setEditQuantity] = useState(false)
    const [img_url, setImg_Url] = useState("")
    const [editImg_Url, setEditImg_Url] = useState(false)
    const [condition, setCondition] = useState("")
    const [editCondition, setEditCondition] = useState(false)
    const [album_name, setAlbum_Name] = useState("")
    const [editAlbum_Name, setEditAlbum_Name] = useState(false)
    const [artist, setArtist] = useState("")
    const [editArtist, setEditArtist] = useState(false)
    const [description, setDescription] = useState("")
    const [editDescription, setEditDescription] = useState(false)
    const [genre, setGenre] = useState("")
    const [editGenre, setEditGenre] = useState(false)
    const [status, setStatus] = useState('')
    const [editStatus, setEditStatus] = useState(false)
    const [viewDescription, setViewDescription] = useState(false)



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
        console.log("status: ", status)
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
    // const removeProduct = async (evt) => {
    //     const deletedProduct = await deactivateProduct(productId);
    //     console.log("product deleted:", deletedProduct)
    //     setProductDetails(deletedProduct)
    // }

    return (
        <TableContainer
            component={Paper}
            hidden={isAdmin ? false : true}
        >
            <p>Edit Product</p>
            <Button onClick={(evt)=> navigate("/admin/")}>
                Back to Dashboard
            </Button>
            <Table
                sx={{ minWidth: 900 }}
                aria-label="simple table"
                className="admin-product-container"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Spec</TableCell>
                        <TableCell>Current Details</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Product ID</TableCell>
                        <TableCell>{productDetails.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>
                            {productDetails.name}<br></br>
                        </TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditName(!editName)} />
                            <input
                                type="text"
                                hidden={!editName}
                                placeholder={productDetails.name}
                                onChange={(evt) => setName(evt.target.value)}>
                            </input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell>
                            ${productDetails.price}
                        </TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditPrice(!editPrice)} />
                            <input
                                type="text"
                                hidden={!editPrice}
                                placeholder={productDetails.price}
                                onChange={(evt) => setPrice(evt.target.value)}>
                            </input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>
                            {productDetails.category}
                        </TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditCategory(!editCategory)} />
                            <select
                                hidden={!editCategory}
                                name="Category"
                                onChange={(evt) => setCategory(evt.target.value)}
                                >
                                <option value="Record">Record</option>
                                <option value="Accessory">Accessory</option>
                            </select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Quantity</TableCell>
                        <TableCell>{productDetails.quantity}</TableCell>
                        <TableCell >
                            <EditIcon fontSize="small" onClick={(evt) => setEditQuantity(!editQuantity)} />
                            <input
                                hidden={!editQuantity}
                                placeholder={productDetails.quantity}
                                onChange={(evt) => setQuantity(evt.target.value)}
                                type="number"
                            >
                            </input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Img_Url</TableCell>
                        <TableCell>
                            <img src={productDetails.img_url} alt="album-cover" width="80" height="80"></img>
                        </TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditImg_Url(!editImg_Url)} />
                            <input
                                type="text"
                                hidden={!editImg_Url}
                                placeholder={productDetails.img_url}
                                onChange={(evt) => setImg_Url(evt.target.value)}>
                            </input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Condition</TableCell>
                        <TableCell>{productDetails.condition}</TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditCondition(!editCondition)} />
                            <br></br>
                            <select
                                hidden={!editCondition}
                                name="Condition"
                                onChange={(evt) => setCondition(evt.target.value)}
                                >
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Album Name</TableCell>
                        <TableCell>{productDetails.album_name}</TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditAlbum_Name(!editAlbum_Name)} />
                            <input
                                type="text"
                                hidden={!editAlbum_Name}
                                placeholder={productDetails.album_name}
                                onChange={(evt) => setAlbum_Name(evt.target.value)}>
                            </input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Artist</TableCell>
                        <TableCell>{productDetails.artist}</TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditArtist(!editArtist)} />
                            <input
                                type="text"
                                hidden={!editArtist}
                                placeholder={productDetails.artist}
                                onChange={(evt) => setArtist(evt.target.value)}>
                            </input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>
                            <TextSnippetIcon
                                onClick={(evt) => setViewDescription(!viewDescription)}
                            />
                            <p hidden={!viewDescription}>{productDetails.description}</p>
                        </TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditDescription(!editDescription)} />
                            <input
                                style={{ width: "370px", height: "200px " }}
                                type="text"
                                hidden={!editDescription}
                                placeholder={productDetails.description}
                                onChange={(evt) => setDescription(evt.target.value)}>
                            </input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Genre</TableCell>
                        <TableCell>{productDetails.genre}</TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditGenre(!editGenre)} />
                            <input
                                type="text"
                                hidden={!editGenre}
                                placeholder={productDetails.genre}
                                onChange={(evt) => setGenre(evt.target.value)}>
                            </input>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{productDetails.status}</TableCell>
                        <TableCell>
                            <EditIcon fontSize="small" onClick={(evt) => setEditStatus(!editStatus)} />
                            <br></br>
                            <select
                                hidden={!editStatus}
                                name="Status"
                                onChange={(evt) => setStatus(evt.target.value)}
                                >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <Button 
                            variant="contained"
                            onClick={submitEdits}
                        >Submit Changes
                       </Button>
                    </TableRow>
                </TableBody>

            </Table>
        </TableContainer >
    )
}

export default EditProduct;