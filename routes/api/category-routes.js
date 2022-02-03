const router = require("express").Router();
const { Category, Product } = require("../../models");
const { sequelize } = require("../../models/Category");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["product_name", "price"],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["product_name", "price"],
      },
    ],
  })
    .then((dbCategoryDataId) => {
      res.json(dbCategoryDataId);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((dbCategoryPost) => {
      res.json(dbCategoryPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: req.params.id,
  })
    .then((dbIndCategoryData) => {
      if (!dbIndCategoryData[0]) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbIndCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbIndCategoryData) => {
      if (!dbIndCategoryData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbIndCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
