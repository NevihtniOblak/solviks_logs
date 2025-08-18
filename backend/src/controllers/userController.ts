import errorCatcher from "../utils/errorCatcher";
import { User } from "../models/UserModel";
import { OK, NOT_FOUND } from "../constants/http";

export const getAllUsers = errorCatcher(async (req, res) => {
    const users = await User.find();
    return res.status(OK).json(users);
});

export const getUser = errorCatcher(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
        return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    return res.status(OK).json(user);
});

export const deleteUser = errorCatcher(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    return res.status(OK).send();
});
