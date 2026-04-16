const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided. Use Bearer token.'
    });
  }

  const token = authHeader.split(' ')[1];   // Remove "Bearer " prefix

  try {
    // Verify the token with secret and options
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],   // Explicitly allow only secure algorithm
      // You can add more options like audience, issuer if needed
    });

    // Attach decoded user data to req object
    req.user = decoded;   // Contains: id, email, role, iat, exp, etc.

    next();   // Token is valid → proceed to the route
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.'
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Invalid token. Authentication failed.'
    });
  }
};

module.exports = authenticateJWT;