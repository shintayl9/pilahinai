const express = require("express");

const router = express.Router();

// POST /feedback
router.post("/", (req, res) => {

   const { feedback, rating } =
      req.body;

   res.json({
      success: true,
      feedback,
      rating
   });

});

module.exports = router;