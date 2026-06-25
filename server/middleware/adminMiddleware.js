const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admins can perform this action",
      });
    }

    next();

  } catch (error) {
    res.status(500).json({
      message: "Authorization error",
      error: error.message,
    });
  }
};

module.exports = adminMiddleware;