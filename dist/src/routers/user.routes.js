"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const schemaValidation_middleware_1 = __importDefault(require("../middlewares/schemaValidation.middleware"));
const user_schemas_1 = __importDefault(require("../schemas/user.schemas"));
const userRoutes = (0, express_1.default)();
userRoutes.post("", (0, schemaValidation_middleware_1.default)(user_schemas_1.default), user_controller_1.createUserController);
userRoutes.get("", user_controller_1.ListUsersController);
userRoutes.get("/:id", user_controller_1.ListOneUserController);
userRoutes.patch("/:id", user_controller_1.UpdateUserController);
userRoutes.delete("/:id", user_controller_1.DeleteUserController);
exports.default = userRoutes;
