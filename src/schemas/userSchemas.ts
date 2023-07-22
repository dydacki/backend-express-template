import Joi from 'joi';

const signInUserSchema = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().required(),
  password: Joi.string().required().min(9),
  passwordConfirmation: Joi.string().required().valid(Joi.ref('password')).messages({ 'any.only': 'password confirmation must match the password' }),
});

export { signInUserSchema };