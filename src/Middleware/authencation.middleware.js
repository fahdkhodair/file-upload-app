
import { asyncHandler } from "../utils/asynchandler.js";
import { verifyToken } from "../utils/token.js";
import UserModel from "../models/User.model.js";
export const authencation = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Token is missing"
        });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
    const user = await UserModel.findById(decoded.id);

if (!user) {
    return res.status(401).json({
        success: false,
        message: "User not found"
    });
}
    req.user = user;

    next();
});
