const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "token required" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "you are forbidden" });
  }
};

module.exports = { auth };
