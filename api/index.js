require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { getUserById } = require('../db/models/user')

const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  console.log("req.sessionID: ")
  console.log(req.sessionID)
  console.log("this is req: ")
  console.log(req.headers)
  console.log("This is req.session: ", req.session)
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth){
      next();
  } else if (auth.startsWith(prefix)){
      const token = auth.slice(prefix.length);

      try {
          const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
              req.user = await getUserById(id);
              console.log("This is req.user", req.user)
              next();
          }
      } catch ({ name, message }) {
          next({ name, message });
      }
  } else {
      next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${ prefix }`
      });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user){
      console.log("User is set:", req.user)
  }
  next();
})

// place your routers here
const productsRouter = require('./products')
apiRouter.use('/products', productsRouter)

const usersRouter = require('./users')
apiRouter.use('/users', usersRouter)


const reviewsRouter = require('./reviews')
apiRouter.use('/reviews', reviewsRouter)
const adminRouter = require('./admin')
apiRouter.use('/admin', adminRouter)

const cartRouter = require('./cart')
apiRouter.use('/cart', cartRouter)


module.exports = apiRouter;
