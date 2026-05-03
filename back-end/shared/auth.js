const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }
  try {
    let decodedToken;
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        data: "login again",
      });
    }
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET || "mySecretKey");
    } catch (err) {
      console.log(err);
      if (err) {
        return res.status(401).json({
          data: "login again",
        });
      }
    }

    if (!decodedToken) {
      if (!token) {
        return res.status(401).json({
          data: "login again",
        });
      }
    }

    req.userId = await decodedToken.userId;
    req.userMobile = await decodedToken.mobile;
    next();
  } catch (err) {
    return next(new Error(err, 401));
  }
};
