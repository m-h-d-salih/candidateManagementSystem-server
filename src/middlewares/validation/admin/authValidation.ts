import Joi from 'joi';

export const adminRegitserValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export const adminLoginValidation=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })