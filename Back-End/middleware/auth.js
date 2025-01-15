const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("token get", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      // Decode the token first to check its structure
      const decoded = jwt.decode(token);

      if (!decoded || !decoded.sub) {
        return res.status(401).json({ error: 'Invalid token structure' });
      }

      // Verify the JWT token from Supabase
      // Note: Supabase JWT secret is your project's JWT secret
      const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);

      if (!decodedToken) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Add the user ID to the request object
      // In Supabase, the user ID is in the 'sub' claim
      req.userId = decoded.sub;
      
      // Add role if needed (optional)
      // req.userRole = decoded.role;

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        error: process.env.NODE_ENV === 'development'
          ? `Invalid token: ${error.message}`
          : 'Invalid token'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      error: process.env.NODE_ENV === 'development'
        ? `Server error: ${error.message}`
        : 'Server error'
    });
  }
};

module.exports = authMiddleware;