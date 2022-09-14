export default (user, statusCode, res) => {
  // generating a JWT token
  const token = user.getJWTToken();

  // option for cookies
  const option = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100),
    httpOnly: true,
  };

  // response
  res.status(statusCode).cookie("token", token, option).json({ success: true, token, user });
};
