import { RequestHandler } from "express";
import { Schema, ValidationResult } from "@hapi/joi";

enum ValidationType {
  body = "body",
  query = "query"
}

const createValidationMiddleware = (
  schema: Schema,
  type: ValidationType
): RequestHandler => (req, res, next) => {
  const validationResult: ValidationResult = schema.validate(req[type], {
    abortEarly: true
  });

  if (validationResult.error) {
    next({ message: "bad request", status: 400 });
  } else {
    next();
  }
};

export { ValidationType, createValidationMiddleware };
