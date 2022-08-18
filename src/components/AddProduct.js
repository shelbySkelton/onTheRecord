import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { testMe } from '../axios-services/users'
import { createProduct } from '../axios-services/admin';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';



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


    const createHandler = async (evt) => {

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
        console.log("newProduct: ", newProduct)
    }

    return (
        <div hidden={isAdmin ? false : true}>Add a Product
            <Box
                components="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        label="Name"
                        defaultValue="Product"
                        onChange={(evt) => setName(evt.target.value)}
                    />
                    <TextField
                        required
                        label="Price"
                        defaultValue="0.00"
                        onChange={(evt) => setPrice(evt.target.value)}
                    /><br></br>
                    <Box sx={{ minWidth: 250 }}>
                        <Select
                            label="Category"
                            required
                            defaultValue="Record"
                            onChange={(evt) => setCategory(evt.target.value)}
                        >
                            <MenuItem value="Record">Record</MenuItem>
                            <MenuItem value="Accessory">Accessory</MenuItem>
                        </Select>
                    </Box>
                    <TextField
                        label="Quantity"
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
                        defaultValue="http://"
                        onChange={(evt) => setImg_Url(evt.target.value)}
                    />
                    <br></br>
                    <Box sx={{ minWidth: 150 }}>
                        <Select
                            label="Condition"
                            defaultValue="New"
                            required
                            onChange={(evt) => setCondition(evt.target.value)}
                        >
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem value="Used">Used</MenuItem>
                        </Select>
                    </Box>
                    <TextField
                        label="Album Name"
                        defaultValue="Album"
                        onChange={(evt) => setAlbum_Name(evt.target.value)}
                    />
                    <TextField
                        label="Artist"
                        defaultValue="Artist"
                        onChange={(evt) => setArtist(evt.target.value)}
                    />
                    <TextField
                        label="Description"
                        defaultValue="Describe the item/record"
                        required
                        multiline
                        maxRows={8}
                        onChange={(evt) => setDescription(evt.target.value)}
                    />
                    <TextField
                        label="Genre"
                        defaultValue="Genre"
                        onChange={(evt) => setGenre(evt.target.value)}
                    />
                    <Box sx={{ minWidth: 150 }}>
                        <Select
                            label="Status"
                            defaultValue="Active"
                            required
                            onChange={(evt) => setStatus(evt.target.value)}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </Box>
                    <Button variant="contained"
                        onClick={createHandler}>Create Product</Button>



                </div>
            </Box>


        </div>
    )
}

export default AddProduct;