import * as Joi from 'joi';

export const validationSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  breed: Joi.string().required(),
});
