import Joi from 'joi';

const createSessionSchema = Joi.object({
  userName: Joi.string().required(),
  valid: Joi.boolean().required().default(true),
});

export { createSessionSchema };
