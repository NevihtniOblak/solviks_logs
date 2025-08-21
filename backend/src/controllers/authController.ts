import errorCatcher from "../utils/errorCatcher";
import { User } from "../models/UserModel";
import { JwtPayload } from "../utils/jwt";
import { NODE_ENV } from "../constants/env";
import { BAD_REQUEST, CONFLICT, CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import { assertAppError } from "../utils/assertAppError";
import { AppErrorCode } from "../types/AppErrorCode";
import { Request, Response } from "express";
import { signJwt } from "../utils/jwt";

export const register = errorCatcher(async (req: Request, res: Response) => {
    const { username, password, role } = req.body as {
        username: string;
        password: string;
        role?: "admin" | "user";
    };
    assertAppError(
        username != null && password != null,
        "Username and password are required",
        BAD_REQUEST,
        AppErrorCode.MISSING_REQUEST_DATA
    );

    const existingUser = await User.exists({ username });
    assertAppError(
        existingUser == null,
        "User with the same username already exists!",
        CONFLICT,
        AppErrorCode.DATABASE_CONFLICT
    );

    const user = new User({
        username,
        password,
        role: role || "user",
    });
    await user.save();

    const responseUser = {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
    };

    return res.status(CREATED).json(responseUser);
});

export const login = errorCatcher(async (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string; password: string };

    assertAppError(
        username != null && password != null,
        "Username and password are required",
        BAD_REQUEST,
        AppErrorCode.MISSING_REQUEST_DATA
    );

    const user = await User.findOne({ username });

    assertAppError(user != null, "User not found", NOT_FOUND, AppErrorCode.OBJECT_NOT_FOUND);

    const isMatch = await user.comparePassword(password);
    assertAppError(isMatch, "Invalid password for user", UNAUTHORIZED, AppErrorCode.INVALID_CREDENTIALS);

    const payload: JwtPayload = { id: user._id.toString(), role: user.role };
    const accessToken = signJwt(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 60 * 1000, // 30 min
    });

    const responseUser = { id: user._id, username: user.username, role: user.role };

    return res.status(OK).json(responseUser);
});

export const logout = errorCatcher(async (req: Request, res: Response) => {
    res.clearCookie("accessToken");

    return res.status(OK).json({ message: "Logout successful" });
});
