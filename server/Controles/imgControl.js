import userModel from "../models/user.model.js";
import FormData from "form-data";
import axios from "axios";

const generateImg = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId; // ✅ from token

    if (!prompt) {
      return res.json({ success: false, message: "Missing prompt" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "Insufficient Credits",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt.trim());

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImg = `data:image/png;base64,${base64Image}`;

    // Deduct credit
    const newBalance = user.creditBalance - 1;
    await userModel.findByIdAndUpdate(user._id, { creditBalance: newBalance });

    res.json({
      success: true,
      message: "Image Generated Successfully",
      creditBalance: newBalance,
      image: resultImg,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.json({ success: false, message: error.message || "Something went wrong" });
  }
};

export default generateImg;
