import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import usersController from "../controllers/user-controller.js";

const router = Router();

router
  .route("/")
  .get(authenticate, authorize("admin"), usersController.getAllUsers);

router
  .route("/:userId")
  .get(authenticate, authorize("admin"), usersController.getUserById)
  .patch(authenticate, authorize("admin"), usersController.updateUser);

router
  .route("/:userId/activate")
  .patch(
    authenticate,
    authorize("admin", "user"),
    usersController.activateUser,
  );

router
  .route("/:userId/deactivate")
  .patch(
    authenticate,
    authorize("admin", "user"),
    usersController.deactivateUser,
  );

export default router;
