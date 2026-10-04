import { Router } from "express";
import authController from "../controllers/auth-controller.js";
import authValidator from "../validators/auth-validator.js";
import validate from "../middlewares/validate.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/register",
  authValidator.registerUser,
  validate,
  authController.register,
);

router.post("/login", authValidator.loginUser, validate, authController.login);

router.post(
  "/logout",
  authValidator.logoutUser,
  validate,
  authController.logout,
);

router.post(
  "/refresh",
  authValidator.refreshUser,
  validate,
  authController.refresh,
);

// router.patch("/change-password", authController.changePassword);

router.get("/me", authenticate, authController.getMe);

export default router;
