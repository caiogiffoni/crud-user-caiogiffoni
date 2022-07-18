import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/users";

const schemaValidation =
  (schema: SchemaOf<IUserRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body, { abortEarly: false });
      req.body = validated;
      next();
    } catch (error: any) {
      return res.status(400).json({
        error: error.errors.join(", "),
      });
    }
  };

export default schemaValidation;
