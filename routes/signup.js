import express from "express";
import jsonResponse from "../lib/jsonResponse.js";
const router = express.Router();
import User from "../schema/user.js"

router.post('/', async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json(jsonResponse(400, { error: "Fields are required." }));
  }

  try {
    const user = new User()
    const existingUser = await user.usernameExist(username)
    if (existingUser) {
      throw new Error("Username already exists.");
    }

    const createdUser = await User.create({ username, password, name });

    res.status(200).json(jsonResponse(200, { message: "User created successfully.", data: createdUser.toJSON() }));
  } catch (error) {
    console.error(error);
    res.status(500).json(jsonResponse(400, { error: error.message }));
  }
});


export default router;