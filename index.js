require('dotenv').config();
const { JWT_SECRET } = process.env
// This is the Web Server
const express = require('express');
const session = require('express-session')
const server = express();
const apiRouter = require('./api');


// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require('cors');
server.use(cors());

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
server.use(express.json());

server.use(
  session ({
    secret: `${JWT_SECRET}`,
    resave: false,
    saveUninitialized: false
  })
)

server.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next(); 
});

// server.get("/", (req, res) => {
//   console.log("req.session: ", req.session)
//   console.log("req.sessionID!!!!: ", req.sessionID)
// })


// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', apiRouter);

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// bring in the DB connection
const { client } = require('./db');

// connect to the server
const PORT = process.env.PORT || 4000;

// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }
});

// export server and handle for routes/*.test.js
module.exports = { server, handle };
