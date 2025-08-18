import errorCatcher from "../utils/errorCatcher";
import { User } from "../models/UserModel";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "../constants/env";
import { CONFLICT, CREATED, OK, UNAUTHORIZED } from "../constants/http";

export const register = errorCatcher(async (req, res) => {
    const { username, password, role } = req.body as {
        username: string;
        password: string;
        role?: "admin" | "user";
    };

    const existingUser = await User.exists({ username });
    if (existingUser) {
        return res.status(CONFLICT).json({ message: "User with the same username already exists!" });
    }

    const user = new User({
        username,
        password,
        role: role || "user",
    });
    await user.save();

    return res.status(CREATED).json({ message: "User registered successfully" });
});

export const login = errorCatcher(async (req, res) => {
    const { username, password } = req.body as { username: string; password: string };

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(UNAUTHORIZED).json({ message: "User with that username does not exist" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(UNAUTHORIZED).json({ message: "Invalid password for user" });
    }

    const payload: JwtPayload = { id: user._id.toString(), role: user.role };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 min
    });

    return res.status(OK).json({
        message: "Login successful",
        user: {
            id: user._id,
            username: user.username,
            role: user.role,
        },
    });
});

export const refresh = async (req: Request, res: Response) => {
    // TODO: refresh token
};

export const logout = errorCatcher(async (req, res) => {
    res.clearCookie("accessToken");

    return res.status(OK).json({ message: "Logout successful" });
});
