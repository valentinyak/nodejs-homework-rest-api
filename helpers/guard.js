const passport = require("passport");
require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const authorization = req.get("Authorization");

    if (!user || !authorization || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }

    const [, token] = authorization.split(" ");

    if (token !== user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
