import express from "express";
import jsonResponse from "../lib/jsonResponse.js";
import User from "../schema/user.js"
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body

  if (username && password) {
    const user = await User.findOne({ username })

    if (user) {
      const correctPassword = await user.comparePassword(password, user.password);
      if (correctPassword) {
        const accessToken = user.createAccessToken();
        const refreshToken = await user.createRefreshToken();
        res.status(200).json(jsonResponse(200, { user, accessToken, refreshToken }));
      } else {
        res.status(404).json(
          jsonResponse(400, {
            error: "User or password incorrect."
          })
        )
      }
    } else {
      res.status(400).json(jsonResponse(400, { error: "User not found." }));
    }
  } else {
    res.status(404).json(
      jsonResponse(400, {
        error: "Fields are required."
      })
    )
  }
})

export default router;