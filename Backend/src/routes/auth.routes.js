import { Router } from "express";
const router = Router();
// Update the path to the correct location of auth.controller.js
import { loginUser, registerUser } from "../controllers/auth.controller.js";

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

export default router;