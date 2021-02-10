const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const Auth = require('../models/auth');
/* eslint-disable camelcase */
const saltRounds = 10;
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '2 days',
};

exports.signInWithEmailAndPassword = async (req, res, next) => {
  const {
    data: { email, password },
  } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Not Found', error: 'Login failed' });
    }
    const hash = await user.password;
    bcrypt.compare(password, hash, function(err, result) {
      if (result !== true) {
        return res.status(400).json({ message: 'Login failed', error: 'Login failed' });
      }
    });
    const access_token = jwt.sign({ id: user._id, id: user._id, role: 'admin' }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    const response = {
      user,
      access_token,
    };
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong', error });
  }
};

exports.signInWithToken = async (req, res, next) => {
  const {
    data: { access_token },
  } = req.body;
  try {
    const { id: _id } = jwt.verify(access_token, jwtConfig.secret);
    const user = await Auth.findById(_id);
    if (!user) {
      return res.status(400).json({ message: 'Login failed', error: 'Login failed' });
    }
    const accessToken = jwt.sign({ id: user._id, userId: user._id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = {
      user,
      access_token: accessToken,
    };
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid access token detected', error });
  }
};

exports.createUser = async (req, res, next) => {
  const { displayName, password, email } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'The email is already in use', error: 'The email is already in use' });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new Auth({
      from: 'custom-db',
      email,
      password: hashPassword,
      role: 'admin',
      data: {
        displayName,
        photoURL: '',
        settings: {},
        shortcuts: [],
      },
    });
    await newUser.save();
    const access_token = await jwt.sign({ id: user._id, userId: newUser._id, role: 'admin' }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = {
      user: newUser,
      access_token,
    };
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong', error });
  }
};

exports.updateUserData = async (req, res, next) => {
  const {
    user: { _id, data },
  } = req.body;
  try {
    const user = await Auth.findByIdAndUpdate({ _id }, { data });

    return res.status(201).json({
      message: 'Updated successfully!',
      result: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong', error });
  }
};
