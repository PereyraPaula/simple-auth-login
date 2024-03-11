import getTokenFromHeader from './getTokenFromHeader.js';
import { verifyAccessToken } from './verifyTokens.js'

function validateToken(header) {
  if (!getTokenFromHeader(header)) {
    throw new Error("Token not provided");
  }

  const [bearer, token] = header["authorization"].split(" ");

  if (bearer !== "Bearer") {
    throw new Error("Token format invalid");
  }

  return token;
}

const authenticateToken = (req, res, next) => {
  let token = null;

  try {
    token = validateToken(req.headers);
  } catch (error) {
    if (error.message === "Token not provided") {
      return res.status(401).json({ error: "Token not provided" });
    }
    if (error.message === "Token format invalid") {
      return res.status(401).json({ error: "Malformed token" });
    }
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = { ...decoded.user };
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid Token" });
  }
}

export default authenticateToken;