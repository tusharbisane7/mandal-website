import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";

const router =
  express.Router();

/*
PUBLIC
*/
router.get(
  "/",
  getGalleryImages
);

/*
ADMIN
*/
router.post(
  "/",
  authMiddleware,
  addGalleryImage
);

router.delete(
  "/:id",
  authMiddleware,
  deleteGalleryImage
);

export default router;