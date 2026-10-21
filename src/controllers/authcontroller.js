import UserModel from "../models/User.model.js";
import { asyncHandler, successHandler, errorHandler } from "../utils/asynchandler.js";
import { generateToken } from "../utils/token.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
export const register = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   if(!name || !email || !password) {
     const err = new Error("All fields are required");
    err.statusCode = 400;
    throw err;
   }
   const user = await UserModel.findOne({ email });
   if(user) {
     const err = new Error("User already exists");
    err.statusCode = 400;
    throw err;
   }
   const hashedPassword = await hashPassword(String(password));
   const newUser = await UserModel.create({ name, email, password: hashedPassword });
   successHandler(res, { user: newUser, message: "User registered successfully" }, 201);
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new errorHandler("All fields are required", 400);
    }

    const user = await UserModel.findOne({ email });

    // لو المستخدم مش موجود
    if (!user) {
        throw new errorHandler("User not found", 404);
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await comparePassword(
        String(password),
        user.password
    );

    if (!isPasswordValid) {
        throw new errorHandler("Invalid password", 401);
    }

    const accessToken = generateToken({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        expiresIn: process.env.accessTokenExpiration
    });

    const refreshToken = generateToken({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        expiresIn: process.env.refreshTokenExpiration
    });

    successHandler(
        res,
        {
            message: "User logged in successfully",
            accessToken,
            refreshToken
        },
        200
    );
});

export const logout = asyncHandler(async (req, res) => {
    const {refreshToken} = req.body;
    if(!refreshToken) {
        throw new errorHandler("Refresh token is required", 400);
    }
    successHandler(res, { message: "User logged out successfully" }, 200);
})