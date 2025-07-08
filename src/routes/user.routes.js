import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router=Router()

router.route("/register").post(registerUser)
// -> go to user.controller.js
// This means when a client sends a POST request to /api/v1/users/register,
export default router

