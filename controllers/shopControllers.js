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
  const allCat = await Categories.find().populate("category");

  console.log(allCat);

  res.json({
    data: allCat,
    messgaeg: "success",
  });
};

exports.getCategoriesById = async (req, res) => {
  console.log(req.params);
  const cateogry = await Categories.findById(req.params.id).populate(
    "category"
  );
  res.json({
    data: cateogry,
    messgaeg: "success",
  });
};
