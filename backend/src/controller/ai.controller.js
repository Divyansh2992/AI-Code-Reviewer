const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).send("Prompt is required");
    }
    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        console.error("AI service error:", error);
        // include stack when available for easier local debugging
        if (error && error.stack) console.error(error.stack);
        res.status(500).json({ error: "Failed to get review. Please check the API key and try again." });
    }
};