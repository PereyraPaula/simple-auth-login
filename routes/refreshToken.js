import express from "express";
import getTokenFromHeader from "../auth/getTokenFromHeader.js";
import jsonResponse from "../lib/jsonResponse.js";
import Token from "../schema/token.js";
import { verifyRefreshToken } from "../auth/verifyTokens.js";
import { generateAccessToken } from "../auth/generateToken.js";
const router = express.Router();

router.post('/', async (req, res) => {
  const refreshToken = getTokenFromHeader(req.headers);

  if (refreshToken) {
    try {
      const found = await Token.findOne({ where: { token: refreshToken } });
      if (found) {
        const payload = verifyRefreshToken(found.token);
        if (payload) {
          const accessToken = generateAccessToken(payload.user);
          return res.status(200).send(jsonResponse(200, { accessToken }));
        } else {
          return handleError(res, 401, "Invalid refresh token");
        }
      }
      return handleError(res, 401, "Unauthorized");
    } catch (error) {
      return handleError(res, 500, error.message);
    }
  } else {
    return handleError(res, 401, "Missing refresh token");
  }
});

function handleError(res, statusCode, message) {
  return res.status(statusCode).send(jsonResponse(statusCode, { error: message }));
}

export default router;