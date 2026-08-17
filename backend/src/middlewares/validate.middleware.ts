import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { BadRequestError } from "../errors/BadRequestError.js";

export const validate = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    next(new BadRequestError(result.error.issues.map((issue) => issue.message).join(", ")));
    return;
  }

  const parsed = result.data as { body?: unknown; query?: unknown; params?: unknown };
  
  Object.defineProperty(req, 'body', { value: parsed.body, writable: true });
  Object.defineProperty(req, 'query', { value: parsed.query, writable: true });
  Object.defineProperty(req, 'params', { value: parsed.params, writable: true });

  next();
};
