import express from "express";

import authMiddleware
from "../middleware/authMiddleware.js";

import {
 getMessages
}
from "../controllers/chatController.js";

const router =
express.Router();

router.get(
 "/messages/:senderId/:receiverId",
 authMiddleware,
 getMessages
);

export default router;