const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  req.isAuth=false
  const token = req.header("authorization");
  if (!token) return next()
  try {
    const decoded = jwt.decode(token,process.env.JWT);
    if(!decoded) return next()
    switch (decoded.type)
    {
      case "admin": req.isAdmin=true; break;
      case "client": req.isClient=true; break;
      case "responsable": req.isResponsable=true; break;
    }
    req.user = decoded;
    req.isAuth=true
    next();
  } catch (ex) {
    return next()
  }
};