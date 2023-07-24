import Joi from 'joi';

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().required(),
  password: Joi.string().required().min(9),
  passwordConfirmation: Joi.string().required().valid(Joi.ref('password')).messages({ 'any.only': 'password confirmation must match the password phrase' }),
});

const verifyUserSchema = Joi.object({
  userId: Joi.string().required(),
  verificationCode: Joi.string().required(),
});

const requestPasswordResetSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordQuerySchema = Joi.object({
  userId: Joi.string().required(),
  passwordResetCode: Joi.string().required(),
});

const resetPasswordBodySchema = Joi.object({
  password: Joi.string().required().min(9),
  passwordConfirmation: Joi.string().required().valid(Joi.ref('password')).messages({ 'any.only': 'password confirmation must match the password phrase' }),
});

export { createUserSchema, verifyUserSchema, requestPasswordResetSchema, resetPasswordQuerySchema, resetPasswordBodySchema };
