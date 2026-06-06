import Ticker from "../models/Ticker.js";

/*
GET TICKER
*/
export const getTicker =
  async (req, res) => {
    try {
      const ticker =
        await Ticker.findOne({
          order: [
            ["createdAt", "DESC"],
          ],
        });

      res.json({
        message:
          ticker?.message ||
          "🙏 Welcome to Baal Mitra Ganesh Utsav Mandal Mitra Mandal 🙏",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

/*
UPDATE TICKER
*/
export const updateTicker =
  async (req, res) => {
    try {
      const { message } =
        req.body;

      let ticker =
        await Ticker.findOne();

      if (!ticker) {
        ticker =
          await Ticker.create({
            message,
          });
      } else {
        ticker.message =
          message;

        await ticker.save();
      }

      res.json({
        success: true,
        message:
          "Ticker Updated Successfully",
        ticker,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };