import { Schema } from "@hapi/joi";
import { object, string, number } from "../../../core/joi";
import {
  createValidationMiddleware,
  ValidationType
} from "../../../core/validation-middleware";

const requestSchema: Schema = object({
  name: string().required(),
  value: number().required()
});

const thingPostValidationMiddleware = createValidationMiddleware(
  requestSchema,
  ValidationType.body
);

export { thingPostValidationMiddleware };
