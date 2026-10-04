import jwt from "jsonwebtoken";

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
};

export { verifyAccessToken, verifyRefreshToken };
