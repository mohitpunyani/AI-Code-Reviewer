const aiService = require('../services/ai.service');
module.exports.getReviewController = async (req, res, next) => {
    const {code} = req.body;
    if (!code) {
        return res.status(400).send("code is required");
    }

    try {
        const response = await aiService(code);
        res.json(response);
    } catch (error) {
        console.error("AI service error:", error);
        res.status(500).send("Internal Server Error");
    }
};
