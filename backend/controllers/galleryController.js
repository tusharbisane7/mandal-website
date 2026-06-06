import Gallery from "../models/Gallery.js";

/*
GET ALL IMAGES
*/
export const getGalleryImages =
  async (req, res) => {
    try {
      const images =
        await Gallery.findAll({
          order: [
            ["createdAt", "DESC"],
          ],
        });

      res.json(images);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

/*
ADD IMAGE
*/
export const addGalleryImage =
  async (req, res) => {
    try {
      const {
        title,
        imageUrl,
      } = req.body;

      const image =
        await Gallery.create({
          title,
          imageUrl,
        });

      res.status(201).json({
        success: true,
        image,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

/*
DELETE IMAGE
*/
export const deleteGalleryImage =
  async (req, res) => {
    try {
      const image =
        await Gallery.findByPk(
          req.params.id
        );

      if (!image) {
        return res.status(404).json({
          message:
            "Image Not Found",
        });
      }

      await image.destroy();

      res.json({
        success: true,
        message:
          "Image Deleted Successfully",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };