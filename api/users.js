require('dotenv').config();
const express = require("express");

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const { getUserByEmail, getUser, createUser, getAllUsers } = require("../db/models/user");

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      res.send({
        message: `User with email ${email} is already taken.`,
        name: "UserExistsError",
        error: "error",
      });
    }

    if (password.length < 8) {
      res.send({
        message: "Password Too Short!",
        name: "PasswordLengthError",
        error: "PasswordLengthError",
      });
    }
    const user = await createUser(
      {email,
      password,
      first_name,
      last_name,}
    );
    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Thanks for signing up!",
      token,
      user,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUser({ email, password });

    if (user) {
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
      res.send({ user, message: "you're logged in!", token });

    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Email or password is incorrect'
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
