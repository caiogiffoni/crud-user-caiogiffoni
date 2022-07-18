"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const handleAppError_middleware_1 = __importDefault(require("./middlewares/handleAppError.middleware"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", user_routes_1.default);
app.use(handleAppError_middleware_1.default);
exports.default = app;
