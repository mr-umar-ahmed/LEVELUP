const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization").replace("Bearer ", "");

    // Verify the token
    const decoded = jwt.verify(token, "your_secret_key"); // Replace with your secret key

    // Attach the user ID to the request object
    req.user = { id: decoded._id };

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = auth;