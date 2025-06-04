import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Authorization: Bearer TOKEN

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
