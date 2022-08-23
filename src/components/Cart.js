import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";


import { getMyCart, addCartItem, deleteCartItem, getGuestCart, removeItemFromGuestCart, addItemToGuestCart, setGuestCart } from "../axios-services/cart";




const Cart = ({ isLoggedIn, user, guestCart }) => {
  const [myCart, setMyCart] = useState({});

  useEffect(() => {

    if (isLoggedIn){
      getMyCart().then((myCart) => {
      setMyCart(myCart);
      })
    } else {
      getGuestCart().then((myCart) => {
        setMyCart(myCart)
      })
    };
    
  }, [guestCart]);



  const handleDelete = async (event) => {
    const cartedItemId = event.target.id;

    if (isLoggedIn) {
    event.preventDefault();
    const deletedItem = await deleteCartItem(cartedItemId);
    getMyCart().then((myCart) => setMyCart(myCart));
    return deletedItem;
    } else {
      event.preventDefault();

      const itemIdx = event.target.dataset.idx

      const remainingItems = await removeItemFromGuestCart(itemIdx)
      setMyCart(remainingItems)
      getGuestCart().then((myCart) => setMyCart(myCart))
      
    }
  };



  const handleAdd = async (event) => {
    event.preventDefault();

    const { product_id, price, cart_id, product_name } = event.target.dataset;
    if (isLoggedIn){
      const addedItem = await addCartItem({
        product_id: product_id,
        priceAtPurchase: price,
        cart_id: cart_id,
      });
      getMyCart().then((myCart) => setMyCart(myCart));
      return addedItem;
    } else {
      const guestCartItem = {
        product_id: Number(product_id),
        product_name: product_name,
        priceAtPurchase: Number(price),
      };
      const sessionCart = await addItemToGuestCart(guestCartItem);
      getGuestCart().then((myCart) => setMyCart(myCart))
    }

  };

  if (!myCart.items) {
    return (
      <h1>0 items in your cart</h1>
    ) 
  } else {
    let priceArray = [];
    myCart.items.map((item) => priceArray.push(item.priceAtPurchase));
    const initialValue = 0;
    const orderTotal = priceArray.reduce(
      (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
      initialValue
    );
    return (
      <div className="cart-container">
        <h1>{myCart.items.length} items in your cart</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 320 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <DeleteOutlinedIcon size="large" />
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
                  // key={item.id}
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Button 
                      key={idx}
                      sx={{ cursor: "pointer" }}
                      aria-label="delete" 
                      size="large" 
                      id={item.id} 
                      data-idx={idx}
                      onClick={handleDelete}
                      >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.product_name}
                  </TableCell>
                  <TableCell align="right">${item.priceAtPurchase}</TableCell>
                  <TableCell align="right">
                    <Button 
                      sx={{ cursor: "pointer" }}
                      key={idx}
                      aria-label="add" 
                      size="large"
                      data-idx={idx} 
                      data-product_id={item.product_id}
                      data-price={item.priceAtPurchase}
                      data-cart_id={myCart.id}
                      data-product_name={item.product_name}
                      onClick={(event) => {
                        handleAdd(event)
                      }} 
                      >
                      Add
                    </Button>

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
