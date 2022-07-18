"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = exports.DeleteUserController = exports.ListOneUserController = exports.ListUsersController = exports.createUserController = void 0;
const user_services_1 = require("../services/user.services");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, age } = req.body;
    const newUser = yield (0, user_services_1.createUserService)({ email, password, name, age });
    return res.status(201).json(newUser);
});
exports.createUserController = createUserController;
const ListUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_services_1.getListUsersService)();
    return res.status(200).json(users);
});
exports.ListUsersController = ListUsersController;
const ListOneUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield (0, user_services_1.listOneUserService)(id);
    return res.status(200).json(user);
});
exports.ListOneUserController = ListOneUserController;
const DeleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, user_services_1.DeleteUserService)(id);
    return res.status(200).json({ message: "User deleted" });
});
exports.DeleteUserController = DeleteUserController;
const UpdateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const user = yield (0, user_services_1.UpdateUserService)(id, body);
    return res.status(200).json({
        message: "User Updated",
        user: user,
    });
});
exports.UpdateUserController = UpdateUserController;
