import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createExpense,
  getExpenses,
} from "../controllers/expenseController.js";

const router =
  express.Router();

router.post(
  "/create",
  authMiddleware,
  createExpense
);

router.get(
  "/all",
  authMiddleware,
  getExpenses
);

export default router;