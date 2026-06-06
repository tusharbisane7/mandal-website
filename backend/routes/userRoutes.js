import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

import {
  getProfile,
  updateProfile,
  getAllUsers,
  getMembers,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

/*
GET ALL USERS
*/
router.get(
  "/all",
  authMiddleware,
  getAllUsers
);

/*
GET MEMBERS
*/
router.get(
  "/members",
  authMiddleware,
  getMembers
);

/*
GET PROFILE
*/
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

/*
UPDATE PROFILE
*/
router.put(
  "/profile",
  authMiddleware,
  upload.single("profilePic"),
  updateProfile
);

/*
DELETE USER
*/
router.delete(
  "/:id",
  authMiddleware,
  deleteUser
);

export default router;