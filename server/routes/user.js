import express from "express";
import { createNewUser, loginUser } from "../controllers/user.js";

const router = express.Router();

// routes at 'api/v1/...'

router.post("/register", createNewUser);
router.post("/login", loginUser);

export default router;
