const express = require('express');
const { getReviewController } = require('../controller/ai.controller');
const router = express.Router();

router.post('/getReview', getReviewController)
module.exports = router;