import { IUserRequest, IUserReturnNoPasword } from "../interfaces/users";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { hash } from "bcryptjs";
import { AppError } from "../errors/AppError";

export const createUserService = async ({
  email,
  password,
  name,
  age,
}: IUserRequest): Promise<IUserReturnNoPasword> => {
  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await hash(password, 10);

  const users = await userRepository.find();

  if (users.find((u) => u.email === email))
    throw new AppError("Email already exists", 400);

  const user = userRepository.create({
    email,
    password: hashedPassword,
    name,
    age,
  });

  await userRepository.save(user);

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
};

export const getListUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

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
};

export const listOneUserService = async (idSearch: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: idSearch });

  if (!user) throw new AppError("User not found", 404);

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
};

export const DeleteUserService = async (idSearch: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: idSearch });

  if (!user) throw new AppError("User not found", 404);

  await userRepository.remove(user);

  return true;
};

export const UpdateUserService = async (
  idSearch: string,
  body: IUserRequest
) => {
  const userRepository = AppDataSource.getRepository(User);

  let user = await userRepository.findOneBy({ id: idSearch });

  if (!user) throw new AppError("User not found", 404);

  // DESCONSTRUÇÃO Q RECEBE DEAFULT O VALOR ORIGINAL DO USER
  const {
    email = user.email,
    password,
    name = user.name,
    age = user.age,
  } = body;

  const hashedPassword = password ? await hash(password, 10) : user.password;

  // VAR PARA SALVAR UPDATE
  const updatedUser = {
    ...user,
    email,
    hashedPassword,
    name,
    age,
    updated_at: new Date(Date.now()),
  };

  await userRepository.save(updatedUser);

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
};
