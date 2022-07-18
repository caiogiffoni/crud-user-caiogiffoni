import { Request, Response } from "express";
import {
  createUserService,
  DeleteUserService,
  getListUsersService,
  listOneUserService,
  UpdateUserService,
} from "../services/user.services";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  const newUser = await createUserService({ email, password, name, age });
  return res.status(201).json(newUser);
};

export const ListUsersController = async (req: Request, res: Response) => {
  const users = await getListUsersService();
  return res.status(200).json(users);
};

export const ListOneUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await listOneUserService(id);
  return res.status(200).json(user);
};

export const DeleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await DeleteUserService(id);
  return res.status(200).json({ message: "User deleted" });
};

export const UpdateUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const user = await UpdateUserService(id, body);
  return res.status(200).json({
    message: "User Updated",
    user: user,
  });
};
