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

export { sendEmail };
