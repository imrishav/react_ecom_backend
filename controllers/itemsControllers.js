const Items = require("../models/itemsModel");

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Items.find();
    res.status(200).json({
      status: "success",
      data: {
        items,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      error: error,
    });
  }
};

exports.createItems = async (req, res, next) => {
  try {
    const newItem = await Items.create(req.body);
    console.log(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      error: error,
    });
  }
};
