import userModel from "../Models/userModel.js";

const generateImg = async (req, res) => {
    try {
        const userId = req.userId; // ✅ Now available from middleware

        // Check user credits
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.credits <= 0) {
            return res.status(403).json({ success: false, message: "Insufficient credits" });
        }

        // Deduct credit
        user.credits -= 1;
        await user.save();

        // 🖼️ Call your AI image generation logic here
        // const imageUrl = await aiService.generate(req.body.prompt);

        // For now, send dummy response
        res.status(200).json({
            success: true,
            message: "Image generated successfully",
            // imageUrl
        });

    } catch (error) {
        console.error("Image generation error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export default generateImg;
