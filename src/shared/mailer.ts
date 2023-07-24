import { createTransport, getTestMessageUrl, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { getLogger } from 'log4js';
import { config } from '../config/envConfig';
import { EmailPayload } from '../models/Email';

const logger = getLogger();
const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
  ...config.smtp,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password,
  },
});

const getVerificationEmailPayload = (email: string, userId: string, verificationCode: string): EmailPayload => {
  return {
    recipient: email,
    subject: 'Please verify your account',
    text: `Please verify your account by clicking the following link: http://localhost:${config.server.port}/api/users/verify?userId=${userId}&verificationCode=${verificationCode}`,
  };
};

const sendEmail = async (payload: EmailPayload) => {
  transporter
    .sendMail({
      from: config.smtp.user,
      to: payload.recipient,
      subject: payload.subject,
      text: payload.text,
    })
    .then((info: SMTPTransport.SentMessageInfo) => {
      logger.info(`Preview URL: ${getTestMessageUrl(info)}`);
    });
};

export { getVerificationEmailPayload, sendEmail };
