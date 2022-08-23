import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ReviewOrder from './ReviewOrder';
import { getMyCart, getGuestCart, checkOutCart, createUserCart } from '../axios-services/cart';



const steps = ['Shipping address', 'Payment details', 'Review your order'];



const theme = createTheme();

export default function Checkout({ isLoggedIn, guestCart, setGuestCart }) {

  const [activeStep, setActiveStep] = React.useState(0);

  const [myCart, setMyCart] = React.useState({})

  React.useEffect(() => {
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




  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <ReviewOrder 
           isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
          // user={user}
          // isAdmin={isAdmin}
          // guestCart={guestCart}
          // setGuestCart={setGuestCart}
              />;
      default:
        throw new Error('Unknown step');
    }
  }



  const items = myCart.items

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    const cart_id = event.target.id
    const completedOrder = await checkOutCart(cart_id)
    // const newCart = await 
    return completedOrder;


  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {myCart.id}! We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                  <br></br>
                    <button id={myCart.id} onClick={handleCheckout}>complete order</button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}