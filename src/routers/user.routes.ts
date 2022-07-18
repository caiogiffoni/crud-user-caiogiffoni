import Router from "express";
import {
  createUserController,
  DeleteUserController,
  ListOneUserController,
  ListUsersController,
  UpdateUserController,
} from "../controllers/user.controller";
import schemaValidation from "../middlewares/schemaValidation.middleware";
import userSchema from "../schemas/user.schemas";

const userRoutes = Router();

userRoutes.post("", schemaValidation(userSchema), createUserController);
userRoutes.get("", ListUsersController);
userRoutes.get("/:id", ListOneUserController);
userRoutes.patch("/:id", UpdateUserController);
userRoutes.delete("/:id", DeleteUserController);

export default userRoutes;
