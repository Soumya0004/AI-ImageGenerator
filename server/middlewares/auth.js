import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
   
    let token = req.headers.token 
    // || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        // console.log("Token received:", token);

        // Decode and verify the token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("Decoded token:", tokenDecode);

        // Ensure that req.body exists before attaching userId
        if (!req.body) {
            req.body = {};  // Create the body if it doesn't exist
        }

        // If token has an id, proceed with the request
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;  // Attach userId to the request body for use in subsequent routes
            next();  // Pass control to the next middleware or route handler
        } else {
            // console.log("Token is not valid: Missing ID");
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }
    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default userAuth;
