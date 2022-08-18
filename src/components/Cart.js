import React, { useState, useEffect } from "react";
import { getMyCart, addCartItem, deleteCartItem } from "../axios-services/cart";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from '@mui/icons-material/Add';


const Cart = ({ isLoggedIn, user }) => {
  const [myCart, setMyCart] = useState({});
  // const [myItems, setMyItems] = useState([])

  useEffect(() => {
    getMyCart().then((myCart) => {
      // console.log(myCart);
      setMyCart(myCart);
    });
  }, []);


  const { items } = myCart
 
 


  const handleDelete = async (event) => {
    event.preventDefault();
    const cartedItemId = event.target.id
    console.log("This is the cartedItemId in the frontend", cartedItemId);
    const deletedItem = await deleteCartItem(cartedItemId)
    getMyCart().then(myCart => setMyCart(myCart))
    console.log(deletedItem);
    return deletedItem;
  }

  const handleAdd = async (event) => {
    // const product_ud
    event.preventDefault();
    // console.log(event.target.dataset);
    const { product_id, price, cart_id } = event.target.dataset
    console.log(price)
    console.log(product_id, price, cart_id)
    const addedItem = await addCartItem({ 
      product_id: product_id, 
      priceAtPurchase: price, 
      cart_id: cart_id
    })
    getMyCart().then(myCart => setMyCart(myCart))
    return addedItem;
  }


  if (!items) {
    return <div>No items to display!</div>;
  } else {
    return (
      <div className="cart-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 320 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <DeleteOutlinedIcon />
                </TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right"><AddIcon /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ cursor: "pointer" }}>
                    <div id={item.id} onClick={handleDelete}>x</div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.product_name}
                  </TableCell>
                  <TableCell align="right">{item.priceAtPurchase}</TableCell>
                  <TableCell align="right" >
                    <div 
                    data-product_id={item.product_id}
                    data-price={item.priceAtPurchase}
                    data-cart_id={myCart.id}
                    onClick={handleAdd}
                      >+</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
};



export default Cart;
