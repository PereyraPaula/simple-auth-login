import jwt from 'jsonwebtoken';

export const verifyAccessToken = (token) => {
  console.log('Verifying access token:', process.env.ACCESS_TOKEN_SECRET)
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded;
}

export const verifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  return decoded;
}

