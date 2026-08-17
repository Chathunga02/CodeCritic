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
  
  req.body = parsed.body;
  // Express 5 made req.query a read-only getter derived from req.url, so a
  // plain assignment throws. Overriding the property descriptor is the
  // documented workaround for substituting the parsed/validated query.
  Object.defineProperty(req, "query", {
    value: parsed.query,
    writable: true,
    enumerable: true,
    configurable: true,
  });
  req.params = parsed.params as Request["params"];

  next();
};
