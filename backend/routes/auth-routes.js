import express from "express";
import { loginUser, logoutUser, signupUser, verifyEmail,forgotPassword, resetPassword,checkAuth,  } from "../controllers/auth-controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";



const router= express.Router();
router.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});

router.get('/check-auth',verifyToken,checkAuth);

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/verify-email',verifyEmail);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);



export default router;