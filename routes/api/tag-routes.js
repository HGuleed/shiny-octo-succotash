const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: [tag_name],
    include: [
      {
        model: Product,
        attributes: [id, product_name, price, stock],
      },
      {
        model: ProductTag,
        attributes: [id, product_id, tag_id],
      },
    ],
  })
    .then((dbProductTagData) => {
      res.json(dbProductTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  ProductTag.findOne({
    attributes: { id, product_id, tag_id },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: [id, product_name, price, stock],
      },
      {
        model: Tag,
        attributes: [id, tag_name],
      },
    ],
  })
    .then((dbIndProdTagData) => {
      if (!dbIndProdTagData) {
        res.status(404).json({ message: "No product tag found with this id" });
        return;
      }
      res.json(dbIndProdTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  ProductTag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductTagData) => {
      if (!dbProductTagData) {
        res.status(404).json({ message: "No product tag found with this id" });
        return;
      }
      res.json(dbProductTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
