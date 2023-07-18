import { BadRequestError } from "../errors/index.js";
import Joi from "joi";
/**
 * @param {{ body, params, query }} param0
 * @param {{ body: Joi.Schema, params: Joi.Schema, query: Joi.Schema }} schema
 * @returns
 */

export const httpValidator = ({ body, params, query }, schema) => {
  if (body) {
    const { error } = schema.body.validate(body);
    if (error) throw new BadRequestError(error);
  }
  if (params) {
    const { error } = schema.body.validate(params);
    if (error) throw new BadRequestError(error);
  }
  if (query) {
    const { error } = schema.body.validate(query);
    if (error) throw new BadRequestError(error);
  }
};

export default httpValidator;
