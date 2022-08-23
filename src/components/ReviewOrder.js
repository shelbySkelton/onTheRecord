import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { getMyCart, getGuestCart } from '../axios-services/cart';

const stuff = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];




export default function ReviewOrder({ isLoggedIn }) {

  const [myCart, setMyCart] = useState({});

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
    if (isLoggedIn){
      getMyCart().then((myCart) => {
      console.log(myCart);
      setMyCart(myCart);
      })
    }
    // else {
    //   getGuestCart().then((myCart) => {
    //     setMyCart(myCart)
    //     console.log("guestcart: ", myCart)
    //   })
    // };
    // }
  }, []);

  const { items } = myCart

  if (!items){
    return <div>No Items!</div>
  } else {
    
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

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {items.map(item => (
            <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={item.product_name} />
              <Typography variant="body2">{item.priceAtPurchase}</Typography>
            </ListItem>
          ))}
  
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {orderTotal}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping
            </Typography>
            <Typography gutterBottom>John Smith</Typography>
            <Typography gutterBottom>{addresses.join(', ')}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Payment details
            </Typography>
            <Grid container>
              {payments.map((payment) => (
                <React.Fragment key={payment.name}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
