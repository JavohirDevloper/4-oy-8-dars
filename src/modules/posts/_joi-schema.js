import Joi from "joi";

export const addPostSchema = {
  body: Joi.object({
    title: Joi.string().max(100).min(5).required(),
    content: Joi.string().max(1000).min(10).required(),
  }),
};

export const updatePostSchema = {
  body: Joi.object({
    title: Joi.string().max(100).min(5),
    content: Joi.string().max(1000).min(10),
  }),
};
