// server/routes/questionsRoutes.js
import express from 'express';
const router = express.Router();

// Sample questions API
router.get('/', (req, res) => {
    res.json({
        success: true,
        questions: [
            {
                id: 1,
                type: "mcq",
                question: "Sample Question?",
                options: ["A", "B", "C", "D"],
                correctAnswer: "A"
            }
        ]
    });
});

export default router;
