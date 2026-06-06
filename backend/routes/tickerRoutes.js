import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getTicker,
  updateTicker,
} from "../controllers/tickerController.js";

const router =
  express.Router();

/*
PUBLIC
*/
router.get(
  "/",
  getTicker
);

/*
ADMIN
*/
router.post(
  "/",
  authMiddleware,
  updateTicker
);

export default router;