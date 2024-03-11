import express from "express";
import getTokenFromHeader from "../auth/getTokenFromHeader.js";
import Token from "../schema/token.js";
import jsonResponse from "../lib/jsonResponse.js";
const router = express.Router();

router.delete('/', async (req, res) => {
  try {
    const refreshToken = getTokenFromHeader(req.headers);
    if (refreshToken) {
      const tobj = await Token.findOne({ where: { token: refreshToken } });
      if (tobj) {
        await Token.destroy({
          where: {
            token: tobj.token
          }
        });
        res.status(200).json(jsonResponse(200, { message: 'Token deleted successfully' }))
      } else {
        return handleError(res, 401, "Token not found");
      }
    } else {
      return handleError(res, 401, "Missing refresh token");
    }
  } catch (error) {
    return handleError(res, 500, error.message);
  }
})

function handleError(res, statusCode, message) {
  return res.status(statusCode).send(jsonResponse(statusCode, { error: message }));
}

export default router;