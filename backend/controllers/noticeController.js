import Notice from "../models/Notice.js";

export const createNotice =
  async (req, res) => {
    try {

      const {
        title,
        message,
      } = req.body;

      const fileUrl =
        req.file
          ? `/uploads/notices/${req.file.filename}`
          : "";

      const notice =
        await Notice.create({
          title,
          message,
          fileUrl,
          isNew: true,
        });

      res.status(201).json(
        notice
      );

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const getNotices =
  async (req, res) => {
    try {

      const notices =
        await Notice.findAll({
          order: [
            [
              "createdAt",
              "DESC",
            ],
          ],
        });

      res.json(
        notices
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  };

export const deleteNotice =
  async (req, res) => {
    try {

      const notice =
        await Notice.findByPk(
          req.params.id
        );

      if (!notice) {
        return res.status(404).json({
          message:
            "Notice Not Found",
        });
      }

      await notice.destroy();

      res.json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  };