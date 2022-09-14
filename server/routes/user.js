import express from "express";
import { createNewUser, loginUser, logoutUser } from "../controllers/user.js";

const router = express.Router();

// routes at 'api/v1/...'

// route to create a new user
router.post("/register", createNewUser);

// route to login 
router.post("/login", loginUser);

// route to logout a logged in user
router.get('/logout', logoutUser)

export default router;
