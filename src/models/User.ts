import { Document, Schema, model } from 'mongoose';
import { v4 as newId } from 'uuid';

export interface User {
  email: string;
  userName: string;
  password: string;
  verificationCode: string;
  passwordResetCode: string | null;
  verified: boolean;
}

export const privateFields = ['password', 'verificationCode', 'passwordResetCode', '__v', 'verified'];

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verificationCode: { type: String, required: true, default: () => newId() },
    passwordResetCode: { type: String, required: false, default: null },
    verified: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface UserModel extends User, Document {}
export default model<UserModel>('User', UserSchema);
