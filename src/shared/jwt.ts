import * as fs from 'fs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { getLogger } from 'log4js';
import { config } from '../config/envConfig';

const logger = getLogger();
const keys = {
  accessTokenPrivateKey: Buffer.from(config.ssh.signPrivateKey, 'base64').toString('ascii'),
  accessTokenPublicKey: Buffer.from(config.ssh.signPublicKey, 'base64').toString('ascii'),
  refreshTokenPrivateKey: Buffer.from(config.ssh.refreshPrivateKey, 'base64').toString('ascii'),
  refreshTokenPublicKey: Buffer.from(config.ssh.refreshPublicKey, 'base64').toString('ascii'),
};

const signJwt = (object: Object, tokenKey: string, options?: SignOptions | undefined): string => {
  const signOptions: SignOptions = {
    ...(options && options),
  };

  return jwt.sign(object, tokenKey, signOptions);
};

const verifyJwt = <T>(token: string, tokenKey: string): T | null => {
  try {
    const decoded = jwt.verify(token, tokenKey) as T;
    return decoded;
  } catch (error) {
    logger.error(JSON.stringify(error));
    return null;
  }
};

const signAccessToken = (object: Object, options?: SignOptions | undefined): string => {
  return signJwt(object, keys.accessTokenPrivateKey, options);
};

const signRefreshToken = (object: Object, options?: SignOptions | undefined): string => {
  return signJwt(object, keys.refreshTokenPrivateKey, options);
};

const verifyAccessToken = <T>(token: string): T | null => {
  return verifyJwt(token, keys.accessTokenPublicKey);
};

const verifyRefreshToken = <T>(token: string): T | null => {
  return verifyJwt(token, keys.refreshTokenPublicKey);
};

export { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
