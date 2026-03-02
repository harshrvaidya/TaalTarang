const adminAuth = (req, res, next) => {
    console.log('req.user:', req.user)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
  };
  
  module.exports = adminAuth;