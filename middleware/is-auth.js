const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    // return res.status(401).json({ message: 'Not authenticated.', error: 'Not authenticated.' });
    const error = new Error('Not authenticated.');
    error.status = 401;
    next(error);
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // return res.status(500).json({ message: 'Token invalid.', error: 'Token invalid.' });
    error.message = 'Token invalid.';
    error.status = 500;
    next(error);
  }
  if (!decodedToken) {
    // return res.status(401).json({ message: 'Not authenticated.', error: 'Not authenticated.' });
    const error = new Error('Not authenticated.');
    error.status = 401;
    next(error);
  }
  req.userId = decodedToken.userId;
  req.role = decodedToken.role;
  return next();
};
