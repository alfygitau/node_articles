const express = require("express");
const {
  getAllArticles,
  createArticle,
  getSingleArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles");
const router = express.Router();

router.route("/").get(getAllArticles).post(createArticle);
router
  .route("/:id")
  .get(getSingleArticle)
  .patch(updateArticle)
  .delete(deleteArticle);

module.exports = router;
