import Donation from "../models/Donation.js";
import generateReceipt from "../utils/generateReceipt.js";


/*
TOP 5 DONORS LEADERBOARD
*/
export const getLeaderboard =
  async (req, res) => {
    try {

      const donations =
        await Donation.findAll();

      const donorMap = {};

      donations.forEach(
        (donation) => {

          const name =
            donation.fullName;

          const amount =
            Number(
              donation.amount || 0
            );

          donorMap[name] =
            (donorMap[name] || 0) +
            amount;
        }
      );

      const leaderboard =
        Object.entries(
          donorMap
        )
          .map(
            ([name, amount]) => ({
              name,
              amount,
            })
          )
          .sort(
            (a, b) =>
              b.amount -
              a.amount
          )
          .slice(0, 5);

      res.json(
        leaderboard
      );

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };
/*
CREATE DONATION
*/
export const createDonation = async (
  req,
  res
) => {
  try {
    const {
      fullName,
      username,
      age,
      mobile,
      reason,
      amount,
      paymentMode,
    } = req.body;

    const receiptNumber =
      generateReceipt();

    const now = new Date();

    const donation =
      await Donation.create({
        fullName,
        username,
        age,
        mobile,
        reason,
        amount,

        paymentMode,

        receiptNumber,

        status: "Paid",

        donationDate:
          now.toLocaleDateString(),

        donationTime:
          now.toLocaleTimeString(),

        userId: req.user.id,
      });

    console.log(
      "NEW DONATION:",
      donation.toJSON()
    );

    res.status(201).json({
      success: true,

      receiptNumber,

      fullName,

      username,

      mobile,

      amount,

      reason,

      paymentMode,

      status: "Paid",

      donationDate:
        donation.donationDate,

      donationTime:
        donation.donationTime,

      donation,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


export const updateDonationStatus =
  async (req, res) => {
    try {
      const donation =
        await Donation.findByPk(
          req.params.id
        );

      if (!donation) {
        return res.status(404).json({
          message:
            "Donation Not Found",
        });
      }

      await donation.update({
        status:
          req.body.status,
      });

      res.json({
        success: true,
        message:
          "Status Updated",
      });

    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };
/*
GET MY DONATIONS
*/
export const getMyDonations =
  async (req, res) => {
    try {
      const donations =
        await Donation.findAll({
          where: {
            userId: req.user.id,
          },
          order: [
            ["createdAt", "DESC"],
          ],
        });

      res.json(donations);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

/*
GET ALL DONATIONS
*/
export const getAllDonations =
  async (req, res) => {
    try {
      const donations =
        await Donation.findAll({
          order: [
            ["createdAt", "DESC"],
          ],
        });

      res.json(donations);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

/*
DELETE DONATION
*/
export const deleteDonation =
  async (req, res) => {
    try {
      const donation =
        await Donation.findByPk(
          req.params.id
        );

      if (!donation) {
        return res.status(404).json({
          message:
            "Donation Not Found",
        });
      }

      await donation.destroy();

      res.json({
        success: true,
        message:
          "Donation Deleted Successfully",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

  