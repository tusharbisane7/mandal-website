import Event from "../models/Event.js";

export const createEvent = async (
  req,
  res
) => {
  try {
    const event =
      await Event.create(req.body);

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getEvents = async (
  req,
  res
) => {
  try {
    const events =
      await Event.findAll({
        order: [
          ["createdAt", "DESC"],
        ],
      });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteEvent =
  async (req, res) => {
    try {
      const event =
        await Event.findByPk(
          req.params.id
        );

      if (!event) {
        return res
          .status(404)
          .json({
            message:
              "Event Not Found",
          });
      }

      await event.destroy();

      res.json({
        message:
          "Event Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };