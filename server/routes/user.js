import express from "express";
import { createNewUser, deleteUser, forgotPassword, getAllUsers, getUser, getUserDetails, loginUser, logoutUser, resetPassword, updatePassword, updateProfile, updateProfileAdmin } from "../controllers/user.js";

// middleware imports
import { isUserAuthenticated, isRole } from "../middlewares/auth.js";

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

// route to get user details
router.get('/me', isUserAuthenticated, getUserDetails);

// route to update user password
router.put('/password/update', isUserAuthenticated, updatePassword);

// route to update profile
router.put('/me/update', isUserAuthenticated, updateProfile);

/*-------------     admin routes        ----------------------*/

// route to get all users -- for admin
router.get('/admin/users', isUserAuthenticated, isRole("admin"), getAllUsers);

// route to get a user | update user details | delete a user | -- for admin
router.route('/admin/user/:id').get(isUserAuthenticated, isRole("admin"), getUser).put(isUserAuthenticated, isRole("admin"), updateProfileAdmin).delete(isUserAuthenticated, isRole("admin"), deleteUser);

export default router;
