import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createEvent,
  getEvents,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createEvent
);

router.get(
  "/all",
  getEvents
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEvent
);

export default router;