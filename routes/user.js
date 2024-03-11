import express from "express";
import jsonResponse from "../lib/jsonResponse.js";
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(jsonResponse(200, req.user));
})

export default router;