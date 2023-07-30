import Joi from 'joi';

const createSessionSchema = Joi.object({
  login: Joi.string().email().required(),
  password: Joi.string().min(8).required().messages({ 'any.only': 'invalid user or password' }),
});

export { createSessionSchema };
