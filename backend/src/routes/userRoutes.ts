import { Router } from "express";
import { getAllUsers, getUser, deleteUser } from "../controllers/userController";
import { authorize } from "../middleware/authorize";

const userRoutes = Router();

userRoutes.get("/", authorize("admin"), getAllUsers);
userRoutes.get("/:id", authorize("admin"), getUser);
userRoutes.delete("/:id", authorize("admin"), deleteUser);

export default userRoutes;
