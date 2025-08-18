import { Router } from "express";
import { getAllUsers, getUser, deleteUser } from "../controllers/userController";
import { authorize } from "../middleware/authorize";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUser);
userRoutes.delete("/:id", authorize("admin"), deleteUser);

export default userRoutes;
