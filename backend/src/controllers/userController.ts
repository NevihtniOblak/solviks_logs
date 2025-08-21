import errorCatcher from "../utils/errorCatcher";
import { User } from "../models/UserModel";
import { OK, NOT_FOUND } from "../constants/http";
import { AppErrorCode } from "../types/AppErrorCode";
import { assertAppError } from "../utils/assertAppError";
import { Request, Response } from "express";

export const getAllUsers = errorCatcher(async (req: Request, res: Response) => {
    const users = await User.find();
    return res.status(OK).json(users);
});

export const getUser = errorCatcher(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    assertAppError(user != null, "User not found", NOT_FOUND, AppErrorCode.OBJECT_NOT_FOUND);

    return res.status(OK).json(user);
});

export const deleteUser = errorCatcher(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    assertAppError(user != null, "User not found", NOT_FOUND, AppErrorCode.OBJECT_NOT_FOUND);

    return res.status(OK).json({ message: "User deleted successfully" });
});
