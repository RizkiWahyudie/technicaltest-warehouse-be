const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
      
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: You do not have permission'
        });
      }
      next();
    };
  };
  
  const adminOnly = checkRole(['Admin']);
  const staffOnly = checkRole(['Admin', 'Staff']);
  
  module.exports = { adminOnly, staffOnly };