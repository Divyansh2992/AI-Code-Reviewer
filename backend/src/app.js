const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://ai-code-reviewer-ebon.vercel.app", "http://localhost:5173", "http://localhost:5174"]
}));

app.use("/ai", (aiRoutes));

module.exports = app;