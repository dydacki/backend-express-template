import { randomBytes, createHmac } from 'crypto';

const secret = 'REST-API-SECRET-KEY';

export const random = (): string => {
  return randomBytes(128).toString('base64');
};

export const authentication = (password: string, salt: string): string => {
  return createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex');
};
