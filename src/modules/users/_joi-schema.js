import Joi from "joi";

export const registerUserSchema = {
  body: Joi.object({
    first_name: Joi.string().max(30).min(5).required(),
    last_name: Joi.string().max(30).min(5).required(),
    username: Joi.string().max(30).min(3).required(),
    password: Joi.string().min(4).required(),
  }),
};

export const updateUserSchema = {
  body: Joi.object({
    first_name: Joi.string().max(30).min(5),
    last_name: Joi.string().max(30).min(5),
    username: Joi.string().max(30).min(3),
    password: Joi.string().min(4),
  }),
};
