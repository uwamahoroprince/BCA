const asyncHander = require("../util/asyncHandler");
const ErrorHandler = require("../util/errorResponse");
const User = require("../model/user");

// USER LOGIN
exports.login = asyncHander(async (req, res, next) => {
  const { userName, password } = req.body;
  //validating userName and passcode (not empty)
  if (!userName || !userName) {
    return next(new ErrorHandler("please provide  username and password", 400));
  }
  //validationg if userName exist in database
  const user = await User.findOne({ userName }).select("+password");
  if (!user) {
    return next(new ErrorHandler("invalid credentials", 401));
  }
  //comparing enterd passcode with from databse
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("invalid credentials", 401));
  }
  //SENDING JWT INTO COOKIE
  sendTokenResponse(user, 200, res);
});
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJWT();
  const role = user.role;
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  //ENABLELING HTTPS ONLY IN PRODUCTION
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    role,
  });
};
