import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/authController";
import authenticate from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const authRoutes = Router();

authRoutes.post("/register", authenticate, authorize("admin"), register);
authRoutes.post("/login", login);
//authRoutes.get("/refresh", refresh);
authRoutes.get("/logout", logout);

export default authRoutes;
