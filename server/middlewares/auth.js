import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    let token = req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id };
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default userAuth;
