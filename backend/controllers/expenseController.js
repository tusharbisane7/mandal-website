import Expense from "../models/Expense.js";

export const createExpense =
  async (req, res) => {
    try {
      const expense =
        await Expense.create({
          ...req.body,
          addedBy:
            req.user.id,
        });

      res.status(201).json(
        expense
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const getExpenses =
  async (req, res) => {
    try {
      const expenses =
        await Expense.findAll();

      res.json(expenses);
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };