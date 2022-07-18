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
exports.UpdateUserService = exports.DeleteUserService = exports.listOneUserService = exports.getListUsersService = exports.createUserService = void 0;
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../errors/AppError");
const createUserService = ({ email, password, name, age, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const users = yield userRepository.find();
    if (users.find((u) => u.email === email))
        throw new AppError_1.AppError("Email already exists", 400);
    const user = userRepository.create({
        email,
        password: hashedPassword,
        name,
        age,
    });
    yield userRepository.save(user);
    // VAR AUX PARA RETORNAR SEM PASSWORD
    const returnedUser = {
        id: user.id,
        email,
        name,
        age,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
    return returnedUser;
});
exports.createUserService = createUserService;
const getListUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const users = yield userRepository.find();
    // MAP PARA RETORNAR SEM PASSWORD
    const noPWusers = users.map((user) => {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    });
    return noPWusers;
});
exports.getListUsersService = getListUsersService;
const listOneUserService = (idSearch) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const user = yield userRepository.findOneBy({ id: idSearch });
    if (!user)
        throw new AppError_1.AppError("User not found", 404);
    //VAR PARA RETORNAR SEM PASSWORD
    const returnedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        age: user.age,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
    return returnedUser;
});
exports.listOneUserService = listOneUserService;
const DeleteUserService = (idSearch) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const user = yield userRepository.findOneBy({ id: idSearch });
    if (!user)
        throw new AppError_1.AppError("User not found", 404);
    yield userRepository.remove(user);
    return true;
});
exports.DeleteUserService = DeleteUserService;
const UpdateUserService = (idSearch, body) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    let user = yield userRepository.findOneBy({ id: idSearch });
    if (!user)
        throw new AppError_1.AppError("User not found", 404);
    // DESCONSTRUÇÃO Q RECEBE DEAFULT O VALOR ORIGINAL DO USER
    const { email = user.email, password, name = user.name, age = user.age, } = body;
    const hashedPassword = password ? yield (0, bcryptjs_1.hash)(password, 10) : user.password;
    // VAR PARA SALVAR UPDATE
    const updatedUser = Object.assign(Object.assign({}, user), { email,
        hashedPassword,
        name,
        age, updated_at: new Date(Date.now()) });
    yield userRepository.save(updatedUser);
    // VAR PARA RETORNAR SEM PASSWORD
    const returnedUser = {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        age: updatedUser.age,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
    };
    return returnedUser;
});
exports.UpdateUserService = UpdateUserService;
