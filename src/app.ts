// src/app.ts

import express from "express";
import "express-async-errors";
import handleAppErrorMiddeware from "./middlewares/handleAppError.middleware";
import userRoutes from "./routers/user.routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use(handleAppErrorMiddeware);

export default app;
