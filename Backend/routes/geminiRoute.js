import Router from "express";
import run from "../utils/geminiApi.js";
// import Router from "express";
// import run from "../utils/geminiApi.js";

const router = Router();

router.post('/prompt', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await run(prompt);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;