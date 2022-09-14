const asyncWrapper = require("../middleware/asyncWrapper");
const Article = require("../models/Article");

// get all articles
const getAllArticles = asyncWrapper(async (req, res) => {
  const articles = await Article.find({});
  res.status(200).json({ success: true, articles, total: articles.length });
});

// create article
const createArticle = asyncWrapper(async (req, res) => {
  const article = await Article.create(req.body);
  res.status(200).json({ article });
});

// get a single article
const getSingleArticle = asyncWrapper(async (req, res) => {
  const { id: articleId } = req.params;
  const article = await Article.findOne({ _id: articleId });
  if (!article) {
    return res.status(404).json({ success: false, error: "article not found" });
  }
  res.status(200).json({ article });
});

// delete article
const deleteArticle = asyncWrapper(async (req, res) => {
  const { id: articleId } = req.params;
  const article = await Article.findOneAndDelete({ _id: articleId });
  if (!article) {
    return res
      .status(404)
      .json({ message: `article with id ${articleId} not found` });
  }
  res.status(200).json({ message: `article with id ${articleId} deleted` });
});

// update Article
const updateArticle = asyncWrapper(async (req, res) => {
  const { id: articleId } = req.params;
  const article = await Article.findOneAndUpdate({ _id: articleId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!article) {
    return res
      .status(404)
      .json({ message: `article with id ${articleId} not found` });
  }
  res.status(200).json({ message: `article with id ${articleId} updated` });
});

module.exports = {
  getAllArticles,
  createArticle,
  getSingleArticle,
  updateArticle,
  deleteArticle,
};
