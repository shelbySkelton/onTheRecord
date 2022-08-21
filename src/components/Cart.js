import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { getMyCart, addCartItem, deleteCartItem, getGuestCart, removeItemFromGuestCart, guestCart, setGuestCart } from "../axios-services/cart";



const Cart = ({ isLoggedIn, user }) => {
  const [myCart, setMyCart] = useState({});

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
    if (isLoggedIn){
      getMyCart().then((myCart) => {
      console.log(myCart);
      setMyCart(myCart);
      })
    } else {
      getGuestCart().then((myCart) => {
        setMyCart(myCart)
        console.log("guestcart: ", myCart)
      })
    };
    
  }, []);



  const handleDelete = async (event) => {
    const cartedItemId = event.target.id;

    if (isLoggedIn) {
    event.preventDefault();
    console.log("This is the cartedItemId in the frontend", cartedItemId);
    const deletedItem = await deleteCartItem(cartedItemId);
    getMyCart().then((myCart) => setMyCart(myCart));
    console.log(deletedItem);
    return deletedItem;
    } else {
      const itemIdx = event.target.dataset.idx
      event.preventDefault();
      console.log("itemidx: ", itemIdx)
      const remainingItems = await removeItemFromGuestCart(itemIdx)
      console.log("remainingItems: ", remainingItems)
      setMyCart(remainingItems)
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const { product_id, price, cart_id } = event.target.dataset;
    console.log(price);
    console.log(product_id, price, cart_id);
    const addedItem = await addCartItem({
      product_id: product_id,
      priceAtPurchase: price,
      cart_id: cart_id,
    });
    console.log(event)
    getMyCart().then((myCart) => setMyCart(myCart));
    return addedItem;
  };

  if (!myCart.items) {
    return <h1>0 items in your cart</h1>;
  } else {
    let priceArray = [];
    myCart.items.map((item) => priceArray.push(item.priceAtPurchase));
    console.log(priceArray);
    const initialValue = 0;
    const orderTotal = priceArray.reduce(
      (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
      initialValue
    );
    console.log("Order Total to fixed: ", orderTotal.toFixed(2));
    return (
      <div className="cart-container">
        <h1>{myCart.items.length} items in your cart</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 320 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <DeleteOutlinedIcon />
                </TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">
                  <AddIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myCart.items.map((item, idx) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <IconButton 
                      sx={{ cursor: "pointer" }}
                      aria-label="delete" 
                      size="medium" 
                      id={item.id} 
                      data-idx={idx}
                      onClick={(event) => { 
                        handleDelete(event); 
                      }}
                      >
                      <DeleteIcon fontSize="medium" />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.product_name}
                  </TableCell>
                  <TableCell align="right">${item.priceAtPurchase.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      sx={{ cursor: "pointer" }}
                      aria-label="add to shopping cart" 
                      size="inherit" 
                      data-product_id={item.product_id}
                      data-price={item.priceAtPurchase}
                      data-cart_id={myCart.id}
                      onClick={(event) => { handleAdd(event); }}  >
                      <AddShoppingCartIcon fontSize="medium" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Order Total
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "18px" }}>${orderTotal.toFixed(2)}</TableCell>
                <TableCell align="right">
                { myCart.items.length !== 0 ? <Button
          
          component={Link}
          to="/cart/checkout"
          variant="contained"
          color="primary"
        >
          Checkout
        </Button> : null }      
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
              
        
      </div>
    );
  }
};

export default Cart;
