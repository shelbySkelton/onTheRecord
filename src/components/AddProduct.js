import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { testMe } from '../axios-services/users'
import { createProduct } from '../axios-services/admin';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';





const AddProduct = ({ setIsLoggedIn, isLoggedIn, user, setUser, isAdmin, setIsAdmin }) => {

    const [productDetails, setProductDetails] = useState({})
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [img_url, setImg_Url] = useState("")
    const [condition, setCondition] = useState("")
    const [album_name, setAlbum_Name] = useState("")
    const [artist, setArtist] = useState("")
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState("")
    const [status, setStatus] = useState("")

    const navigate = useNavigate();





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
    }, [])


    const createHandler = async (evt) => {
        console.log(
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
            status
        )
        const newProduct = await createProduct(
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
        navigate(`/products/${newProduct.id}`)
    }

    return (
        <div hidden={isAdmin ? false : true} 
            id="product-add-container"
             >
            <h1>Add a Product</h1>
            <Box
                id='add-product-box'
                components="form"
                sx={{
                    '& .MuiTextField-root': {
                        m: 1,
                        width: '25ch',
                        backgroundColor: 'white',
                    }
                }}
                noValidate
                autoComplete="off"
            >
                <div>

                    <TextField
                        required
                        label="Name"
                        placeholder="Product"
                        onChange={(evt) => setName(evt.target.value)}
                    />
                    <TextField
                        required
                        label="Price"
                        placeholder="0.00"
                        onChange={(evt) => setPrice(evt.target.value)}
                    /><br></br>
                    <Box sx={{ minWidth: 250 }}>
                    <InputLabel id="Category">Category</InputLabel>
                        <Select
                            sx={{
                                backgroundColor: 'white'
                            }}
                            labelId="Category"
                            label="Category"
                            required
                            onChange={(evt) => setCategory(evt.target.value)}
                        >
                            <MenuItem value="Record">Record</MenuItem>
                            <MenuItem value="Accessory">Accessory</MenuItem>
                        </Select>
                    </Box>
                    <TextField
                        label="Quantity"
                        min="0"
                        required
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(evt) => setQuantity(evt.target.value)}
                    />
                    <TextField
                        required
                        label="Img Url"
                        placeholder="http://"
                        onChange={(evt) => setImg_Url(evt.target.value)}
                    />
                    <br></br>
                    {/* <Box sx={{ minWidth: 150 }}> */}
                    <InputLabel id="condition-select">Condition</InputLabel>
                    <Select
                        sx={{
                            backgroundColor: 'white'
                        }}
                        labelId="condition-select"
                        label="Condition"
                        required
                        onChange={(evt) => setCondition(evt.target.value)}
                    >
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Used">Used</MenuItem>
                    </Select>
                    {/* </Box> */}
                    <TextField
                        label="Album Name"
                        placeholder="Album"
                        onChange={(evt) => setAlbum_Name(evt.target.value)}
                    />
                    <TextField
                        label="Artist"
                        placeholder="Artist"
                        onChange={(evt) => setArtist(evt.target.value)}
                    />
                    <TextField
                        label="Description"
                        placeholder="Describe the item/record"
                        required
                        multiline
                        maxRows={8}
                        onChange={(evt) => setDescription(evt.target.value)}
                    />
                    <TextField
                        label="Genre"
                        placeholder="Genre"
                        onChange={(evt) => setGenre(evt.target.value)}
                    />
                    {/* <Box sx={{ minWidth: 150 }}> */}
                    <InputLabel id="status-select">Status</InputLabel>
                    <Select
                        label="Status"
                        labelId='status-select'
                        sx={{
                            backgroundColor: 'white'
                        }}
                        required
                        onChange={(evt) => setStatus(evt.target.value)}
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    <br></br>
                    <Button
                        id="test-button"
                        variant="contained"
                        onClick={createHandler}>Create Product</Button>
                    {/* </Box> */}

                </div>
            </Box>
        </div>
    )
}

export default AddProduct;