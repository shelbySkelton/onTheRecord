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

import { getMyCart, addCartItem, deleteCartItem } from "../axios-services/cart";

const Cart = ({ isLoggedIn, user }) => {
  const [myCart, setMyCart] = useState({});

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
    // if (isLoggedIn){
    getMyCart().then((myCart) => {
      // console.log(myCart);
      setMyCart(myCart);
    });
    // }
  }, []);

  const { items } = myCart;

  const handleDelete = async (event) => {
    event.preventDefault();
    const cartedItemId = event.target.id;
    console.log("This is the cartedItemId in the frontend", cartedItemId);
    const deletedItem = await deleteCartItem(cartedItemId);
    getMyCart().then((myCart) => setMyCart(myCart));
    console.log(deletedItem);
    return deletedItem;
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
    getMyCart().then((myCart) => setMyCart(myCart));
    return addedItem;
  };

  let priceArray = []
  items.map(item=> priceArray.push(item.priceAtPurchase))
  console.log(priceArray);
  const initialValue = 0;
  const orderTotal = priceArray.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
  );
  console.log("Items: ", items)
  console.log("Order Total: ", orderTotal)

  if (!items) {
    return <div>No items to display!</div>;
  } else {
    return (
      <div className="cart-container">
        <h1>{items.length} items in your cart</h1>
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
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ cursor: "pointer" }}>
                    <div id={item.id} onClick={handleDelete}>
                      x
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.product_name}
                  </TableCell>
                  <TableCell align="right">{item.priceAtPurchase}</TableCell>
                  <TableCell align="right">
                    <div
                      data-product_id={item.product_id}
                      data-price={item.priceAtPurchase}
                      data-cart_id={myCart.id}
                      onClick={handleAdd}
                    >
                      +
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Order Total</TableCell>
                {/* <TableCell align='right'>{orderTotal}</TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button align="right" component={Link} to="/cart/checkout" variant="contained" color="primary">Checkout</Button>
      </div>
    );
  }
};

export default Cart;
