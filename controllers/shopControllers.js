const Categories = require("../models/ShopSections");

exports.createCategrories = async (req, res) => {
  const newCollection = await Categories.create({
    title: "Samsung",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
  });

  res.json({
    data: newCollection,
    messgaeg: "Helloss",
  });
};

exports.getAllCategories = async (req, res) => {
  const allCat = await Categories.find();

  res.json({
    data: allCat,
    messgaeg: "success",
  });
};
