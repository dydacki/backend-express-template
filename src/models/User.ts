import { Document, Schema, model } from 'mongoose';

export interface User {
  userName: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
  },
);

export interface UserModel extends User, Document {}
export default model<UserModel>('User', UserSchema);
