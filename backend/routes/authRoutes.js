import express from "express";

import {
  register,
  login,
  checkUsername,
} from "../controllers/authController.js";

import upload from "../middleware/upload.js";

const router =
  express.Router();

/*
REGISTER
*/
router.post(
  "/register",
  upload.single(
    "profilePic"
  ),
  register
);

/*
LOGIN
*/
router.post(
  "/login",
  login
);

/*
CHECK USERNAME
*/
router.get(
  "/check-username/:username",
  checkUsername
);

export default router;