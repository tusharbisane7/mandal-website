import express from "express";

import {
  createNotice,
  getNotices,
  deleteNotice,
} from "../controllers/noticeController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import noticeUpload from "../middleware/noticeUpload.js";

const router =
  express.Router();

router.get(
  "/",
  getNotices
);

router.post(
  "/create",
  authMiddleware,
  noticeUpload.single(
    "file"
  ),
  createNotice
);

router.delete(
  "/:id",
  authMiddleware,
  deleteNotice
);

export default router;