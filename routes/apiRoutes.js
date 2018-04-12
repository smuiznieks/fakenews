const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../controllers/articleController");

router.post("/saved", articlesController.create);
router.get("/saved", articlesController.findAll);
router.delete("/saved/:id", articlesController.remove);

router.get("/articles", (req, res) => {
  axios
    .get("http://api.nytimes.com/svc/search/v2/articlesearch.json", { 
      params: {
        'api-key': '17251dea8f904c459eaa0b9497154bed',
        'q': req.query.q 
      }})
    .then( articles => {
      res.json(articles.data.response.docs)
    })
    .catch(err => res.status(422).json(err));
});

module.exports = router;
