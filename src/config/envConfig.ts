import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || ''; //admin
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || ''; //J5wGL8m3LvmbpK25
const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@backend-express-cluster.convkvu.mongodb.net/backend-template`;
const SERVER_PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

const ACCESS_TOKEN_PRIVATE_KEY: string = process.env.ACCESS_TOKEN_PRIVATE_KEY || '';
const ACCESS_TOKEN_PUBLIC_KEY: string = process.env.ACCESS_TOKEN_PUBLIC_KEY || '';
const REFRESH_TOKEN_PRIVATE_KEY: string = process.env.REFRESH_TOKEN_PRIVATE_KEY || '';
const REFRESH_TOKEN_PUBLIC_KEY: string = process.env.REFRESH_TOKEN_PUBLIC_KEY || '';

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  smtp: {
    host: 'smtp.ethereal.email',
    port: 587,
    sender: 'noreply@backend-template.com',
    user: 'wlv67bittlpcb6rv@ethereal.email',
    password: 'ZpawtzW1DjmmuTrNHD',
    secure: false,
  },
  ssh: {
    signPrivateKey: ACCESS_TOKEN_PRIVATE_KEY,
    signPublicKey: ACCESS_TOKEN_PUBLIC_KEY,
    refreshPrivateKey: REFRESH_TOKEN_PRIVATE_KEY,
    refreshPublicKey: REFRESH_TOKEN_PUBLIC_KEY,
  },
};
