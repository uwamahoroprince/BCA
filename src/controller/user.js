const Users = require("../model/user");
const asyncHandler = require("../util/asyncHandler");
const ErrorResponce = require("../util/errorResponse");
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await Users.create(req.body);
  if (!user) {
    return next(new ErrorResponce("could not create new user", 400));
  }
  sendTokenResponse(user, 200, res);
});
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJWT();
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
  });
};
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await Users.find({});
  if (!users || users.length === 0) {
    return next(new ErrorResponce("could not get users", 400));
  }
  res.status(200).json({
    message: "found successfuly",
    data: users,
  });
});
