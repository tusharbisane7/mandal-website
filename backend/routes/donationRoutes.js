import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createDonation,
  getMyDonations,
  getAllDonations,
  deleteDonation,
  updateDonationStatus,
  getLeaderboard,
} from "../controllers/donationController.js";

const router = express.Router();

/*
UPDATE DONATION STATUS
*/
router.put(
  "/status/:id",
  authMiddleware,
  updateDonationStatus
);

/*
CREATE DONATION
*/
router.post(
  "/create",
  authMiddleware,
  createDonation
);

/*
MY DONATIONS
*/
router.get(
  "/my",
  authMiddleware,
  getMyDonations
);

/*
TOP DONORS LEADERBOARD
*/
router.get(
  "/leaderboard",
  getLeaderboard
);

/*
ALL DONATIONS
*/
router.get(
  "/all",
  getAllDonations
);

/*
DELETE DONATION
*/
router.delete(
  "/:id",
  authMiddleware,
  deleteDonation
);

export default router;