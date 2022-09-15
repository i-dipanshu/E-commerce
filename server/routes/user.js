import express from "express";
import { createNewUser, forgotPassword, loginUser, logoutUser, resetPassword } from "../controllers/user.js";

const router = express.Router();

// routes at 'api/v1/...'

// route to create a new user
router.post("/register", createNewUser);

// route to login 
router.post("/login", loginUser);

// route to logout a logged in user
router.get('/logout', logoutUser);

// route to forgot password
router.get('/password/forgot', forgotPassword);

// route to reset password
router.put('/password/reset/:token', resetPassword);

export default router;
